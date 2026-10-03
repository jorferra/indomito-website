// Indómito V3 — Worker: sirve el sitio estático y recibe las postulaciones (§26 del HANDOFF).
// POST /api/postulacion → valida, verifica Turnstile y escribe en Airtable (tabla Postulantes).
// Todo lo demás lo sirve env.ASSETS (dist/).
//
// Variables (wrangler.jsonc → vars): AIRTABLE_BASE, AIRTABLE_TABLE.
// Secrets (npx wrangler secret put …): AIRTABLE_TOKEN, TURNSTILE_SECRET.

const ORIGINS = ["https://www.indomitocafe.com", "https://indomitocafe.com"];
const MAX = { nombre: 120, email: 200, whatsapp: 40, instagram: 80, motivo: 2000, convocatoria: 60, origen: 300 };

const json = (status, body) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } });

const clean = (v, n) => String(v ?? "").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").trim().slice(0, n);

async function turnstileOk(env, token, ip) {
  if (!env.TURNSTILE_SECRET) return true; // sin secret configurado (desarrollo): queda solo el honeypot
  if (!token) return false;
  const body = new FormData();
  body.append("secret", env.TURNSTILE_SECRET);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);
  const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
  const d = await r.json().catch(() => ({}));
  return d.success === true;
}

async function postulacion(request, env) {
  const origin = request.headers.get("Origin");
  if (origin && !ORIGINS.includes(origin) && !origin.startsWith("http://localhost")) return json(403, { ok: false, error: "origin" });

  let d;
  try { d = await request.json(); } catch { return json(400, { ok: false, error: "json" }); }

  // Honeypot: un bot que completa el campo oculto recibe "ok" y no se guarda nada.
  if (clean(d.web, 200)) return json(200, { ok: true });

  const f = {
    nombre: clean(d.nombre, MAX.nombre),
    email: clean(d.email, MAX.email).toLowerCase(),
    whatsapp: clean(d.whatsapp, MAX.whatsapp),
    instagram: clean(d.instagram, MAX.instagram).replace(/^@/, ""),
    motivo: clean(d.motivo, MAX.motivo),
    convocatoria: clean(d.convocatoria, MAX.convocatoria) || "lista-espera",
    origen: clean(d.origen, MAX.origen),
    idioma: d.idioma === "en" ? "en" : "es",
  };
  if (!f.nombre) return json(422, { ok: false, error: "nombre" });
  if (!f.email && !f.whatsapp) return json(422, { ok: false, error: "contacto" });
  if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) return json(422, { ok: false, error: "email" });
  if (d.consent !== true) return json(422, { ok: false, error: "consent" });
  if (!/^[a-z0-9-]+$/.test(f.convocatoria)) return json(422, { ok: false, error: "convocatoria" });

  if (!(await turnstileOk(env, clean(d.token, 4096), request.headers.get("CF-Connecting-IP")))) return json(403, { ok: false, error: "turnstile" });

  if (!env.AIRTABLE_TOKEN || !env.AIRTABLE_BASE) return json(503, { ok: false, error: "config" });

  const fields = {
    Nombre: f.nombre,
    "Convocatoria Id": f.convocatoria,
    Estado: f.convocatoria === "lista-espera" ? "lista de espera" : "postulado",
    Idioma: f.idioma,
    Consentimiento: true,
    Recibido: new Date().toISOString(),
    Origen: f.origen,
  };
  if (f.email) fields.Email = f.email;
  if (f.whatsapp) fields.WhatsApp = f.whatsapp;
  if (f.instagram) fields.Instagram = f.instagram;
  if (f.motivo) fields.Motivo = f.motivo;

  const url = `https://api.airtable.com/v0/${env.AIRTABLE_BASE}/${encodeURIComponent(env.AIRTABLE_TABLE || "Postulantes")}`;
  const r = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${env.AIRTABLE_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ records: [{ fields }], typecast: true }),
  });
  if (!r.ok) {
    console.error("airtable", r.status, await r.text().catch(() => ""));
    return json(502, { ok: false, error: "guardado" });
  }
  return json(200, { ok: true });
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/postulacion") {
      if (request.method !== "POST") return json(405, { ok: false, error: "method" });
      try { return await postulacion(request, env); }
      catch (e) { console.error(e); return json(500, { ok: false, error: "interno" }); }
    }
    if (pathname.startsWith("/api/")) return json(404, { ok: false, error: "not_found" });
    return env.ASSETS.fetch(request);
  },
};
