// Reporte diario de Umami para indomitocafe.com.
// Uso: node tools/umami-diario.mjs            → día de ayer (hora de Buenos Aires)
//      node tools/umami-diario.mjs 2026-09-27 → un día puntual
// La API key se lee de v3/.secrets/umami-key (fuera de git). No se imprime nunca.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const KEY_FILE = path.join(ROOT, ".secrets", "umami-key");
const C = JSON.parse(fs.readFileSync(path.join(ROOT, "content.json"), "utf8"));
const SITE = C.site.umami?.id;
const API = "https://api.umami.is/v1";

if (!fs.existsSync(KEY_FILE)) { console.error(`Falta la API key en ${KEY_FILE}`); process.exit(2); }
const KEY = fs.readFileSync(KEY_FILE, "utf8").trim();

// Día en Buenos Aires (UTC-3, sin horario de verano)
const TZ_OFFSET_MS = 3 * 3600 * 1000;
const arg = process.argv[2];
const day = arg || new Date(Date.now() - TZ_OFFSET_MS - 86400000).toISOString().slice(0, 10);
const startAt = Date.parse(`${day}T00:00:00Z`) + TZ_OFFSET_MS;
const endAt = startAt + 86400000 - 1;
const prevStart = startAt - 7 * 86400000, prevEnd = endAt - 7 * 86400000;

async function get(p, params = {}) {
  const q = new URLSearchParams({ startAt, endAt, timezone: "America/Argentina/Buenos_Aires", ...params });
  const r = await fetch(`${API}/websites/${SITE}/${p}?${q}`, { headers: { Authorization: `Bearer ${KEY}`, Accept: "application/json" } });
  if (!r.ok) throw new Error(`${p} ${params.type || ""}: HTTP ${r.status}`);
  return r.json();
}
const val = (v) => (v && typeof v === "object" ? v.value ?? 0 : v ?? 0);
const top = (rows, n = 8) => (Array.isArray(rows) ? rows : []).slice(0, n).map((r) => `- ${r.x || "(directo / sin dato)"} · ${r.y}`).join("\n") || "- sin datos";

const [stats, week, refs, channels, countries, cities, pages, events, utm] = await Promise.all([
  get("stats"),
  get("stats", { startAt: prevStart, endAt: prevEnd }),
  get("metrics", { type: "referrer" }),
  get("metrics", { type: "channel" }).catch(() => []),
  get("metrics", { type: "country" }),
  get("metrics", { type: "city" }).catch(() => []),
  get("metrics", { type: "url" }).catch(() => get("metrics", { type: "path" })),
  get("metrics", { type: "event" }).catch(() => []),
  get("metrics", { type: "query" }).catch(() => []),
]);

const v = val(stats.visitors), pv = val(stats.pageviews), vw = val(week.visitors);
const delta = vw ? `${v >= vw ? "+" : ""}${Math.round(((v - vw) / vw) * 100)}% vs. mismo día semana pasada (${vw})` : "sin dato de la semana pasada";

console.log(`# Indómito · métricas del ${day}

**${v} visitantes · ${pv} páginas vistas** — ${delta}

## Cómo llegaron (canal)
${top(channels)}

## De dónde vinieron (sitio de origen)
${top(refs)}

## Desde dónde (país)
${top(countries, 5)}

## Ciudad
${top(cities, 5)}

## Qué miraron
${top(pages)}

## Qué hicieron (eventos)
${top(events)}

## Parámetros de campaña (utm)
${top(utm, 5)}
`);
