// Indómito V3 — generador estático sin dependencias, en español e inglés.
// Uso: node build.mjs  →  dist/ (sitio real: / en español, /en/ en inglés) + preview/index.html (vista navegable)
// Contenido: content.json (español, fuente de verdad) + content.en.json (capa de textos en inglés).
// Textos fijos de las páginas: src/i18n.mjs.
import fs from "node:fs";
import path from "node:path";
import { archivoPieces, ARCHIVO_JS } from "./src/archivo.mjs";
import { ROUTES, T } from "./src/i18n.mjs";

const LANGS = ["es", "en"];
const CES = JSON.parse(fs.readFileSync("content.json", "utf8"));
const CEN_LAYER = fs.existsSync("content.en.json") ? JSON.parse(fs.readFileSync("content.en.json", "utf8")) : {};
const S = CES.site;
const CSS = fs.readFileSync("src/styles.css", "utf8");
const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap">`;

// La capa en inglés solo pisa textos: objetos por clave, arrays por posición. Claves "_" se ignoran.
const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);
function overlay(base, layer) {
  if (Array.isArray(base) && Array.isArray(layer)) {
    const out = base.map((b, i) => (i < layer.length ? overlay(b, layer[i]) : b));
    for (let i = base.length; i < layer.length; i++) out.push(layer[i]);
    return out;
  }
  if (isObj(base) && isObj(layer)) {
    const out = { ...base };
    for (const [k, v] of Object.entries(layer)) if (!k.startsWith("_")) out[k] = k in base ? overlay(base[k], v) : v;
    return out;
  }
  return layer === undefined ? base : layer;
}
const CONTENT = { es: CES, en: overlay(CES, CEN_LAYER) };

const slug = (t) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const trk = (ev, origen) => ` data-umami-event="${ev}" data-umami-event-origen="${origen}"`;
const wa = (t) => `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(t)}`;
const ig = (h) => `https://www.instagram.com/${h}`;
const other = (lang) => (lang === "es" ? "en" : "es");

function ctx(mode, lang) {
  const preview = mode === "preview";
  const linkIn = (l, r) => (preview ? "#" + (ROUTES[l][r].hash || "inicio") : ROUTES[l][r].path);
  return {
    preview, lang,
    link: (r) => linkIn(lang, r),
    altLink: (r) => linkIn(other(lang), r),
    src: (f) => (preview ? "img/" + f : "/img/" + f),
  };
}

const WORDMARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="70 -878 4238 883" aria-hidden="true" focusable="false"><path fill="currentColor" d="M70 0H159V-700H70Z M738 -700V-125L386 -700H299V0H378V-551L730 0H817V-700Z M1221 -701 957 -700V0H1221C1407 0 1475 -48 1475 -228V-473C1475 -653 1407 -702 1221 -701ZM1386 -228C1386 -118 1367 -63 1221 -63H1046V-638H1221C1367 -638 1386 -583 1386 -473Z M1803 -746H1882L2012 -878H1911ZM1854 5C2040 5 2113 -43 2113 -223V-475C2113 -655 2040 -703 1854 -703C1668 -703 1595 -655 1595 -475V-223C1595 -43 1668 5 1854 5ZM1854 -58C1708 -58 1684 -113 1684 -223V-475C1684 -585 1708 -640 1854 -640C2000 -640 2024 -585 2024 -475V-223C2024 -113 2000 -58 1854 -58Z M2797 -700 2569 -134 2338 -700H2243V0H2318V-530L2527 0H2595L2808 -541V0H2893V-700Z M3033 0H3122V-700H3033Z M3720 -700H3202V-634H3416V0H3505V-634H3720Z M4049 5C4235 5 4308 -43 4308 -223V-475C4308 -655 4235 -703 4049 -703C3863 -703 3790 -655 3790 -475V-223C3790 -43 3863 5 4049 5ZM4049 -58C3903 -58 3879 -113 3879 -223V-475C3879 -585 3903 -640 4049 -640C4195 -640 4219 -585 4219 -475V-223C4219 -113 4195 -58 4049 -58Z"/></svg>`;
const NAV = ["living", "carta", "sistema", "encuentros", "archivo", "origen"];

// ---------- sitio por idioma ----------
function makeSite(lang) {
  const C = CONTENT[lang];
  const t = T[lang];
  const AS = archivoPieces({ S, lang });
  const es = lang === "es";
  // Frases de firma: quedan en español también en la versión en inglés.
  const firma = (s) => `<p class="lema"${es ? "" : ' lang="es"'}>${esc(s)}</p>`;
  const idioma = (s) => (s ? `<p class="k mute idioma">${esc(s)}</p>` : "");

  const fig = (x, name, alt, cls = "r32", eager = false) => `
<figure class="fig ${cls}">
  <img src="${x.src(name + "-1600.webp")}" srcset="${x.src(name + "-800.webp")} 800w, ${x.src(name + "-1600.webp")} 1600w" sizes="(max-width:860px) 100vw, 60vw" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">
</figure>`;

  const pill = (estado) => {
    const cls = { preparacion: "hollow", agotado: "off", archivo: "off", lista: "hollow" }[estado] || "";
    return `<span class="pill ${cls}">${t.pill[estado] || estado}</span>`;
  };

  // alt: href de la misma página en el otro idioma
  const header = (x, cur, alt) => `
<header class="hd"><div class="wrap bar">
  <a class="brand" href="${x.link("home")}" aria-label="${t.homeLabel}"><img class="mark-d" src="${x.src("disco.png")}" alt="" width="26" height="35"><img class="mark-l" src="${x.src("disco-light.png")}" alt="" width="26" height="35"><span class="wm-sm">${WORDMARK}</span></a>
  <div class="hd-r">
    <nav class="nav" aria-label="${t.navAria}">${NAV.map((r) => `<a href="${x.link(r)}"${r === cur ? ' aria-current="page"' : ""}>${t.nav[r]}</a>`).join("")}</nav>
    <a class="lang" href="${alt || x.altLink(cur || "home")}" hreflang="${other(lang)}" lang="${other(lang)}" aria-label="${t.other.label}"${trk("idioma", other(lang))}>${t.other.code}</a>
    <details class="mob"><summary>${t.menu}</summary><nav class="sheet" aria-label="${t.navAriaMob}">${NAV.map((r) => `<a href="${x.link(r)}">${t.nav[r]}</a>`).join("")}</nav></details>
  </div>
</div></header>`;

  const footer = (x) => `
<footer class="ft"><div class="wrap grid">
  <div><p><strong>${S.name}</strong></p><p class="mute">${S.zona}</p><p class="mute">${t.footer.reply}</p></div>
  <div>
    <p><a href="${ig(S.instagram)}" rel="noopener"${trk("instagram", "footer")}>Instagram · @${S.instagram}</a></p>
    <p><a href="${wa(t.footer.waHello)}" rel="noopener"${trk("whatsapp", "footer")}>WhatsApp · ${S.whatsappLabel}</a></p>
    <p class="ft-tienda"><a href="${x.link("tienda")}">${t.footer.tienda}</a> <span class="mute">· ${esc(C.tienda.estadoLabel)}</span></p>
  </div>
  <div><p class="k mute">© ${S.year} ${S.name}</p><p><a class="mute" href="${x.link("terminos")}">${t.footer.terms}</a></p></div>
</div></footer>`;

  const menuItems = (items) => items.map((i) => `
<div class="it${C.carta.mostrarPrecios ? "" : " np"}"><span>${esc(i.nombre)}</span>${C.carta.mostrarPrecios ? `<span class="lead-dots" aria-hidden="true"></span><span class="pr">${t.price(i.precio)}</span>` : ""}${i.receta ? `<span class="rc">${esc(i.receta)}</span>` : ""}${i.nota ? `<span class="dt">${esc(i.nota)}</span>` : ""}</div>`).join("");

  // destacados: se buscan por nombre en español y se toman en la misma posición del idioma actual
  const destacados = CES.carta.destacados.map((n) => {
    for (const [ci, c] of CES.carta.categorias.entries()) { const ii = c.items.findIndex((i) => i.nombre === n); if (ii > -1) return C.carta.categorias[ci].items[ii]; }
    return null;
  }).filter(Boolean);

  const encCard = (x, e) => {
    const cta = e.cta ? `<a class="cta" href="${e.cta.href || wa(e.cta.wa)}" rel="noopener"${trk(e.cta.href ? "postulacion" : "lista", e.id)}>${e.cta.label}</a>` : "";
    const more = e.pagina ? `<a class="cta" href="${x.link(e.id)}">${t.verEdicion}</a>` : "";
    return `
<article class="card">
  <p class="code">${esc(e.codigo)}</p>
  <div class="body">
    <h3>${esc(e.titulo)}</h3>${e.subtitulo ? `<p class="sub">${esc(e.subtitulo)}</p>` : ""}
    <p class="meta">${esc(e.fecha.replace(/^Laboratorio Sensorial · /, ""))}${e.nota ? " · " + esc(e.nota) : ""}</p>
    <p>${esc(e.bajada)}</p>
  </div>
  <div class="side">${e.estado === "archivo" ? "" : pill(e.estado)}${more}${cta}</div>
</article>`;
  };

  const aviso = (x) => {
    const e = C.encuentros.find((y) => y.estado === "convocatoria");
    if (!e) return "";
    return `<div class="aviso"><div class="wrap aviso-in">${pill(e.estado)}<a class="aviso-t" href="${x.link(e.id)}">${esc(e.nombreCompleto || e.titulo)}</a><a class="cta" href="${e.cta.href}" rel="noopener"${trk("postulacion", "aviso-home")}>${e.cta.label}</a></div></div>`;
  };

  const P = {};

  P.home = {
    title: t.home.title, desc: t.home.desc,
    body: (x) => {
      const h = t.home;
      const ls02 = C.encuentros.find((e) => e.id === "ls02");
      return `
${aviso(x)}
<section class="wrap hero">
  <div class="intro">
    <p class="k">${h.kicker}</p>
    <h1 class="wm"><span class="sr">Indómito</span>${WORDMARK}</h1>
    <p class="lead">${h.lead}</p>
    <div class="row"><a class="cta" href="${x.link("encuentros")}">${h.ctaEnc}</a><a class="cta" href="${x.link("sistema")}">${h.ctaSis}</a></div>
  </div>
</section>

<div class="wrap">
<section class="door">
  <p class="k">${h.livK}</p>
  <div class="body">
    <h2>Living</h2>
    <p>${h.livP}</p>
    <a class="cta" href="${x.link("living")}">${h.livCta}</a>
  </div>
</section>

<section class="door">
  <p class="k">${h.carK} · ${esc(C.carta.vigencia)}</p>
  <div class="body">
    <h2>${h.carH}</h2>
    <p>${h.carP}</p>
    <div class="menu mini">${menuItems(destacados.map((i) => ({ ...i, receta: "", nota: "" })))}</div>
    <p class="mute" style="margin-top:18px;font-size:var(--fs-sm)">${esc(C.carta.pie)}</p>
    <a class="cta" href="${x.link("carta")}">${h.carCta}</a>
  </div>
</section>

<section class="door">
  <p class="k">${h.sisK}</p>
  <div class="body">
    <h2>Sistema Portátil</h2>
    <p>${h.sisP}</p>
    <a class="cta" href="${x.link("sistema")}${x.preview ? "" : "#consulta"}">${h.sisCta}</a>
  </div>
</section>

<section class="door">
  <p class="k">${h.encK}</p>
  <div class="body">
    <h2>${h.encH}</h2>
    <p>${h.encP}</p>
    <div class="stack state">
      <p class="row" style="gap:12px">${pill(ls02.estado)} <span>${esc(ls02.nombreCompleto)}</span></p>
      <p class="row" style="gap:12px">${pill("preparacion")} <span>${h.encLiving}</span></p>
    </div>
    <a class="cta" href="${x.link("encuentros")}">${h.encCta}</a>
  </div>
</section>
${AS.homeBlock(x)}
</div>`;
    },
  };

  P.living = {
    title: t.living.title, desc: t.living.desc,
    body: (x) => {
      const L = C.living, l = t.living;
      const prox = L.estado === "sin-fecha"
        ? `<h3 style="margin-bottom:10px">${l.proxH}</h3><p>${l.sinFecha}</p><a class="cta" style="margin-top:20px" href="${wa(l.waLista)}" rel="noopener"${trk("lista", "living")}>${l.anotarme}</a>`
        : `<h3 style="margin-bottom:10px">${l.proxH}</h3><p class="big">${esc(L.proxima.dia)}</p><p class="mute">Caballito Norte · ${esc(L.proxima.horario)}</p><p class="mute">${esc(L.proxima.cupo)}</p><a class="cta" style="margin-top:20px" href="${wa(l.waReserva + L.proxima.dia)}" rel="noopener">${l.reservar}</a>`;
      return `
<div class="wrap">
  <header class="ph intro"><p class="k">${l.kicker}</p><h1>Living</h1><p class="lead">${l.lead}</p>${idioma(l.idioma)}</header>
  <section class="sec split">
    <div><h2 class="k">${l.queK}</h2></div>
    <p class="big" style="max-width:34ch">${l.que}</p>
  </section>
  <section class="sec split">
    <div><h2 class="k">${l.comoK}</h2></div>
    <ol class="steps">${l.steps.map((s) => `<li>${s}</li>`).join("")}</ol>
  </section>
  <section class="sec split">
    <div>${pill(L.estado === "sin-fecha" ? "preparacion" : "proximo")}</div>
    <div>${prox}</div>
  </section>
  <section class="sec">
    <h2 class="k">${l.archK}</h2>
    <p class="big" style="margin-bottom:32px">${l.archBig}</p>
    ${L.archivo.map((a) => `
    <article class="split" style="padding-block:8px 24px">
      <div></div>
      <div class="stack">
        <p class="k mute">${esc(a.serie)}</p><h3>${esc(a.titulo)}</h3><p>${esc(a.nota)}</p>
        <div class="menu"><div class="it"><span>${l.cafe}</span><span class="lead-dots"></span><span>${esc(a.cafe)}</span></div><div class="it"><span>${l.disco}</span><span class="lead-dots"></span><span>${esc(a.musica)}</span></div></div>
      </div>
    </article>`).join("")}
  </section>
  <section class="sec">${firma(L.frase)}</section>
</div>`;
    },
  };

  P.carta = {
    title: t.carta.title, desc: t.carta.desc(C.carta.vigencia),
    body: (x) => `
<div class="wrap">
  <header class="ph intro"><p class="k">${t.carta.kicker} · ${esc(C.carta.vigencia)}</p><h1>${t.carta.h1}</h1><p class="lead">${t.carta.lead}</p><p class="mute" style="margin-top:14px;font-size:var(--fs-meta)">${esc(C.carta.notas[0])}</p>${x.preview ? "" : `<nav class="cat-index" aria-label="${t.carta.catAria}">${C.carta.categorias.map((c) => `<a href="#${slug(c.nombre)}">${esc(c.nombre)}</a>`).join("")}</nav>`}</header>
  <div class="bleed">${fig(x, "carta-granos", t.carta.alt, "r219", true)}</div>
  <div class="cats">
    ${C.carta.categorias.map((c) => `<section class="cat" id="${x.preview ? "" : slug(c.nombre)}"><h2>${esc(c.nombre)}</h2>${c.meta ? `<p class="cmeta">${esc(c.meta)}</p>` : ""}<div class="menu">${menuItems(c.items)}</div></section>`).join("")}
  </div>
  <p class="k" style="display:block;padding-block:32px 8px;border-top:1px solid var(--line)">${esc(C.carta.pie)}</p>
  <div class="notes">${C.carta.notas.slice(1).map((n) => `<p>${esc(n)}</p>`).join("")}</div>
</div>`,
  };

  P.sistema = {
    title: t.sistema.title, desc: t.sistema.desc,
    ld: { "@context": "https://schema.org", "@type": "Service", name: "Sistema Portátil", serviceType: t.sistema.title.split(" — ")[0], description: t.sistema.desc, provider: { "@type": "CafeOrCoffeeShop", name: S.name, url: S.url + "/", telephone: "+" + S.whatsapp }, areaServed: ["Ciudad Autónoma de Buenos Aires", "Gran Buenos Aires"], image: S.url + "/img/sistema-barra-1600.webp" },
    body: (x) => {
      const s = t.sistema, f = s.f, p = es ? "" : "en-";
      return `
<div class="wrap">
  <header class="ph intro"><p class="k">${s.kicker}</p><h1>Sistema Portátil</h1><p class="lead">${s.lead}</p></header>
  <div class="bleed">${fig(x, "sistema-barra", s.alt, "r32", true)}</div>
  <section class="sec">
    <p class="big">${s.big}</p>
  </section>
  <section class="sec">
    <h2 class="k">${s.sysK}</h2>
    <dl class="ficha">${s.ficha.map(([a, b]) => `<dt>${a}</dt><dd>${b}</dd>`).join("")}</dl>
  </section>
  <section class="sec split">
    <div class="stack"><h2 class="k">${s.ocK}</h2><p class="big">${s.ocBig}</p></div>
    <div class="stack"><p style="font-size:var(--fs-bl)">${s.ocList}</p><p class="mute">${s.ocZona}</p></div>
  </section>
  <section class="sec" id="consulta">
    <h2 class="k">${s.formK}</h2>
    <p class="big" style="margin-bottom:32px">${s.formBig}</p>
    <form class="form" data-sp data-t="${esc(JSON.stringify({ ...s.waMsg, via: s.via }))}" novalidate>
      <label>${f.nombre}<input name="nombre" autocomplete="name" required aria-describedby="${p}sp-err"><span id="${p}sp-err" class="err" hidden>${f.err}</span></label>
      <label>${f.wa}<input name="whatsapp" inputmode="tel" autocomplete="tel"></label>
      <label>${f.fecha}<input name="fecha" placeholder="${f.fechaPh}"></label>
      <label>${f.tipo}<select name="tipo">${f.tipos.map((o) => `<option>${o}</option>`).join("")}</select></label>
      <label>${f.personas}<input name="personas" inputmode="numeric"></label>
      <label>${f.zona}<input name="zona" placeholder="${f.zonaPh}"></label>
      <label class="full">${f.msg}<textarea name="mensaje"></textarea></label>
      <button type="submit">${f.enviar}</button>
    </form>
    <div class="done" hidden>
      <p><strong>${s.done1}</strong></p>
      <p>${s.done2}</p>
      <a class="cta"${trk("consulta-sistema", "formulario")} href="${wa(t.footer.waHello)}" rel="noopener">${s.doneCta}</a>
    </div>
  </section>
</div>
<a class="wa-fijo" href="${wa(s.waMsg.intro)}" data-wa-via="${esc(s.via)}" rel="noopener"${trk("whatsapp", "sistema-fijo")}>${s.fijo}</a>`;
    },
  };

  P.encuentros = {
    title: t.encuentros.title, desc: t.encuentros.desc,
    body: (x) => {
      const n = t.encuentros;
      // Agrupado por serie y en orden: LS01 → LS02 → LS03; Living del archivo a la próxima apertura.
      const ls = C.encuentros.filter((e) => e.ls).sort((a, b) => a.codigo.localeCompare(b.codigo));
      const liv = C.encuentros.filter((e) => !e.ls).sort((a, b) => (b.estado === "archivo") - (a.estado === "archivo"));
      return `
<div class="wrap">
  <header class="ph intro"><p class="k">${n.kicker}</p><h1>${n.h1}</h1><p class="lead">${n.lead}</p>${idioma(n.idioma)}</header>
  <section style="padding-bottom:24px"><h2 class="k" style="margin-bottom:18px">Laboratorio Sensorial</h2><div class="list">${ls.map((e) => encCard(x, e)).join("")}</div></section>
  <section class="sec"><h2 class="k">Living</h2><div class="list">${liv.map((e) => encCard(x, e)).join("")}</div></section>
</div>`;
    },
  };

  P.ls02 = {
    title: t.ls02.title, desc: t.ls02.desc,
    body: (x) => {
      const e = C.encuentros.find((y) => y.id === "ls02");
      const L = C.ls02, l = t.ls02;
      return `
<div class="wrap">
  <header class="ph intro"><p class="k"><a href="${x.link("encuentros")}">${l.kicker}</a> · Laboratorio Sensorial</p><h1>${esc(e.titulo)}</h1><p class="lead">${esc(e.subtitulo)}. ${l.formula}</p>${idioma(l.idioma)}</header>
  <section class="sec split">
    <div class="stack">${pill(e.estado)}<p class="k mute">${esc(e.fecha.replace("Laboratorio Sensorial · ", ""))}</p></div>
    <div class="stack"><p class="big">${esc(L.lead2)}</p><p class="mute">${esc(L.fechaNota)}</p><a class="cta" href="${e.cta.href}" rel="noopener"${trk("postulacion", "pagina-edicion")}>${e.cta.label}</a></div>
  </section>
  <section class="sec split">
    <div><h2 class="k">${l.edicionK}</h2></div>
    <div class="stack prose">${L.descripcion.map((p) => `<p>${esc(p)}</p>`).join("")}</div>
  </section>
  <section class="sec"><h2 class="k">${l.estK}</h2><div class="stations">${L.estaciones.map((s, i) => `<div><b>${String(i + 1).padStart(2, "0")}</b><span>${s}</span></div>`).join("")}</div></section>
  <section class="sec split">
    <div><h2 class="k">${l.formatoK}</h2></div>
    <ol class="steps">${L.formato.map((f) => `<li>${esc(f)}</li>`).join("")}</ol>
  </section>
  <section class="sec split">
    <div><h2 class="k">${l.creditosK}</h2></div>
    <div class="credits">${L.creditos.map((c) => `<div><p class="mute" style="font-size:var(--fs-meta)">${esc(c.rol)}</p><p style="font-size:var(--fs-bl);font-weight:600">${esc(c.nombre)}</p></div>`).join("")}<p class="mute" style="font-size:var(--fs-meta)"><a class="cta" href="${ig(S.instagramLS)}" rel="noopener">@${S.instagramLS} ${l.igLS}</a></p></div>
  </section>
</div>`;
    },
  };

  P.tienda = {
    title: t.tienda.title, desc: t.tienda.desc,
    body: (x) => `
<div class="wrap">
  <header class="ph intro"><p class="k">${t.tienda.kicker}</p><h1>${t.tienda.h1}</h1><p class="lead">${t.tienda.lead}</p></header>
  <section class="sec split">
    <div class="stack">${pill("lista")}<p class="k mute">${esc(C.tienda.estadoLabel)}</p></div>
    <div class="stack"><p class="big">${t.tienda.big}</p><a class="cta" href="${wa(t.tienda.wa)}" rel="noopener"${trk("lista", "tienda")}>${t.tienda.cta}</a></div>
  </section>
</div>`,
  };

  P.origen = {
    title: t.origen.title, desc: t.origen.desc,
    body: (x) => `
<div class="wrap">
  <header class="ph intro"><p class="k">${t.origen.kicker}</p><h1>${t.origen.h1}</h1><p class="lead">${t.origen.lead}</p></header>
  <div class="bleed">${fig(x, "origen-mano", t.origen.alt, "r32", true)}</div>
  <section class="sec split">
    <div></div>
    <div class="stack" style="font-size:var(--fs-lead);line-height:1.55;max-width:40ch">${t.origen.p.map((p) => `<p>${p}</p>`).join("")}</div>
  </section>
  <section class="sec">${firma("Un café no se toma. Se habita.")}</section>
</div>`,
  };

  P.terminos = {
    title: t.terminos.title, desc: t.terminos.desc,
    body: (x) => `
<div class="wrap">
  <header class="ph"><p class="k">${t.terminos.kicker}</p><h1 style="font-size:var(--fs-h2)">${t.terminos.h1}</h1></header>
  <section class="sec stack" style="max-width:64ch">${t.terminos.p.map((p) => `<p>${p}</p>`).join("")}</section>
</div>`,
  };

  P.archivo = AS.indexPage;

  const P404 = {
    title: t.p404.title, desc: t.p404.desc,
    body: (x) => `
<div class="wrap"><header class="ph"><p class="k">${t.p404.kicker}</p><h1>${t.p404.h1}</h1><p class="lead">${t.p404.lead}</p><div class="row" style="margin-top:28px"><a class="cta" href="${x.link("home")}">${t.p404.home}</a><a class="cta" href="${x.link("carta")}">${t.p404.carta}</a></div></header></div>`,
  };

  return { lang, t, C, P, P404, AS, header, footer };
}

const SITES = Object.fromEntries(LANGS.map((l) => [l, makeSite(l)]));

// ---------- scripts ----------
// Formulario de Sistema Portátil: sirve para los dos idiomas; los rótulos del mensaje vienen en data-t.
const GADS = S.googleAds && S.googleAds.id ? S.googleAds : null;
const FORM_JS = `
var ADS=(function(){var k='ind-ads',q=location.search,on=/[?&](gclid|gbraid|wbraid)=|[?&]utm_source=google(&|$)/.test(q);try{if(on)sessionStorage.setItem(k,'1');else on=sessionStorage.getItem(k)==='1'}catch(e){}return function(){return on}})();
var CONV=function(){};
${GADS ? `(function(){var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${GADS.id}';document.head.appendChild(s);window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config','${GADS.id}');var L=${JSON.stringify(GADS.labels || {})};CONV=function(k){if(L[k])gtag('event','conversion',{send_to:'${GADS.id}/'+L[k]})}})();` : ""}
(function(){document.querySelectorAll('a[data-wa-via]').forEach(function(a){if(ADS())a.href=a.href+encodeURIComponent('\\n'+a.dataset.waVia);a.addEventListener('click',function(){CONV('whatsapp')})})})();
(function(){document.querySelectorAll('form[data-sp]').forEach(function(f){var L=JSON.parse(f.dataset.t||'{}');f.addEventListener('submit',function(e){e.preventDefault();
var v=function(n){var el=f.elements[n];return el?String(el.value).trim():''};
var nombre=v('nombre');var er=f.querySelector('.err');if(!nombre){er.hidden=false;f.elements.nombre.focus();return}er.hidden=true;
var t=L.intro+'\\n'+L.nombre+': '+nombre+(v('whatsapp')?'\\n'+L.wa+': '+v('whatsapp'):'')+(v('fecha')?'\\n'+L.fecha+': '+v('fecha'):'')+'\\n'+L.tipo+': '+v('tipo')+(v('personas')?'\\n'+L.personas+': '+v('personas'):'')+(v('zona')?'\\n'+L.zona+': '+v('zona'):'')+(v('mensaje')?'\\n'+v('mensaje'):'')+(ADS()?'\\n'+L.via:'');
var d=f.nextElementSibling,a=d.querySelector('a');a.href='https://wa.me/${S.whatsapp}?text='+encodeURIComponent(t);
f.hidden=true;d.hidden=false;a.focus();CONV('form');var go=function(){if(window.top===window.self){window.location.href=a.href}};if(window.umami){Promise.race([umami.track('consulta-sistema',{tipo:v('tipo'),personas:v('personas'),idioma:document.documentElement.lang||'',fuente:ADS()?'google-ads':''}),new Promise(function(r){setTimeout(r,600)})]).then(go,go)}else{go()}})});})();
(function(){document.querySelectorAll('.mob .sheet a').forEach(function(a){a.addEventListener('click',function(){var d=a.closest('details');if(d)d.open=false})})})();`;

// ---------- salida ----------
const head = (site, k, pg, alts) => {
  const { t } = site;
  const url = S.url + pg.path;
  const ld = k === "home" && site.lang === "es" ? `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "CafeOrCoffeeShop", name: S.name, url: S.url + "/", image: S.url + "/img/og.jpg", telephone: "+" + S.whatsapp, address: { "@type": "PostalAddress", addressLocality: "Caballito", addressRegion: "CABA", addressCountry: "AR" }, areaServed: "Buenos Aires", servesCuisine: "Café de especialidad", sameAs: [ig(S.instagram)] })}</script>` : "";
  const hreflang = alts ? `<link rel="alternate" hreflang="es-AR" href="${S.url}${alts.es}"><link rel="alternate" hreflang="en" href="${S.url}${alts.en}"><link rel="alternate" hreflang="x-default" href="${S.url}${alts.es}">` : "";
  return `<!doctype html>
<html lang="${t.htmlLang}" data-theme="light">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(pg.title)}</title>
<meta name="description" content="${esc(pg.desc)}">
${k === "404" ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url}">`}
${hreflang}
<meta property="og:type" content="website"><meta property="og:locale" content="${t.ogLocale}"><meta property="og:locale:alternate" content="${T[other(site.lang)].ogLocale}"><meta property="og:site_name" content="${S.name}">
<meta property="og:title" content="${esc(pg.title)}"><meta property="og:description" content="${esc(pg.desc)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${S.url}/img/og.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="color-scheme" content="light"><meta name="theme-color" content="#ffffff">
<link rel="icon" href="/img/favicon.png" type="image/png"><link rel="apple-touch-icon" href="/img/apple-touch-icon.png">
${FONTS}
<link rel="stylesheet" href="/styles.css">
${S.umami ? `<script defer src="${S.umami.src}" data-website-id="${S.umami.id}"></script>` : ""}
${k === "home" && S.gscVerification ? `<meta name="google-site-verification" content="${S.gscVerification}">` : ""}
${ld}${pg.ld ? `<script type="application/ld+json">${JSON.stringify(pg.ld)}</script>` : ""}
</head>
<body>`;
};

function buildDist() {
  fs.rmSync("dist", { recursive: true, force: true });
  const write = (p, html) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, html); };
  const page = (site, x, k, pg, cur, alts, altHref) => `${head(site, k, pg, alts)}\n${site.header(x, cur, altHref)}\n<main>${pg.body(x)}</main>\n${site.footer(x)}\n<script src="/site.js" defer></script>\n</body>\n</html>\n`;
  const urls = [];
  for (const lang of LANGS) {
    const site = SITES[lang], x = ctx("dist", lang), o = SITES[other(lang)];
    for (const k of Object.keys(ROUTES[lang])) {
      const pg = { ...site.P[k], path: ROUTES[lang][k].path };
      const alts = { es: ROUTES.es[k].path, en: ROUTES.en[k].path };
      write(path.join("dist", pg.path, "index.html"), page(site, x, k, pg, k, alts));
      urls.push(pg.path);
    }
    site.AS.entries.forEach((e, i) => {
      const pg = site.AS.entryPage(e);
      const alts = { es: SITES.es.AS.pathOf(e), en: SITES.en.AS.pathOf(e) };
      write(path.join("dist", pg.path, "index.html"), page(site, x, "archivo-entry", pg, "archivo", alts, o.AS.pathOf(e)));
      urls.push(pg.path);
    });
    const p404 = { ...site.P404, path: lang === "es" ? "/404" : "/en/404" };
    write(path.join("dist", lang === "es" ? "" : "en", "404.html"), `${head(site, "404", p404)}\n${site.header(x, "", x.altLink("home"))}\n<main>${site.P404.body(x)}</main>\n${site.footer(x)}\n</body>\n</html>\n`);
  }
  write("dist/styles.css", CSS);
  write("dist/site.js", FORM_JS + ARCHIVO_JS);
  fs.cpSync("src/img", "dist/img", { recursive: true });
  fs.cpSync("src/archivo/img", "dist/img/archivo", { recursive: true });
  // archivos que van tal cual a la raíz del sitio (verificación de Search Console, etc.)
  if (fs.existsSync("src/root")) fs.cpSync("src/root", "dist", { recursive: true });
  // Cabeceras de seguridad (Cloudflare las aplica a todos los archivos estáticos)
  // Dominios de Google Ads: solo entran a la CSP cuando site.googleAds.id está cargado (guía oficial de CSP de Google Tag)
  const G = GADS ? {
    script: "https://www.googletagmanager.com https://www.googleadservices.com https://www.google.com https://googleads.g.doubleclick.net",
    connect: "https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com https://www.google.com https://www.google.com.ar https://ad.doubleclick.net",
    img: "https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com https://www.google.com https://www.google.com.ar",
  } : null;
  write("dist/_headers", [
    "/*",
    "  Strict-Transport-Security: max-age=31536000; includeSubDomains",
    "  X-Content-Type-Options: nosniff",
    "  X-Frame-Options: DENY",
    "  Referrer-Policy: strict-origin-when-cross-origin",
    "  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()",
    `  Content-Security-Policy: default-src 'self'; script-src 'self' https://cloud.umami.is https://static.cloudflareinsights.com${G ? " " + G.script : ""}; connect-src 'self' https://cloudflareinsights.com https://cloud.umami.is https://gateway.umami.is https://api-gateway.umami.dev${G ? " " + G.connect : ""}; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:${G ? " " + G.img : ""};${G ? " frame-src https://www.googletagmanager.com;" : ""} frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'`,
    "",
  ].join("\n"));
  write("dist/robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${S.url}/sitemap.xml\n`);
  write("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${S.url}${u}</loc></url>`).join("\n")}\n</urlset>\n`);
  write("dist/_redirects", [
    "# URLs del sitio en Framer → V3",
    "/eventos /encuentros/ 301",
    "/objetos /tienda/ 301",
    "/club /encuentros/ 301",
    "/club/tg1 /living/ 301",
    "/club/playlists /origen/ 301",
    "/terms /terminos/ 301",
    "# /news, /page-3, /old-home-2, /tcvxp y /index.php/* quedan en 404 a propósito: son restos de template y de un sitio anterior.",
    "",
  ].join("\n"));
  return urls.length;
}

function buildPreview() {
  const titles = {};
  const blocks = [];
  for (const lang of LANGS) {
    const site = SITES[lang], x = ctx("preview", lang), o = SITES[other(lang)];
    for (const [k, r] of Object.entries(ROUTES[lang])) {
      const id = r.hash || "inicio";
      titles[id] = site.P[k].title;
      blocks.push(`<div data-page="${id}" lang="${site.t.htmlLang}"${id === "inicio" ? "" : " hidden"}>\n${site.header(x, k)}\n<main>${site.P[k].body(x)}</main>\n${site.footer(x)}\n</div>`);
    }
    for (const e of site.AS.entries) {
      const id = site.AS.hashOf(e);
      titles[id] = site.AS.entryPage(e).title;
      blocks.push(`<div data-page="${id}" lang="${site.t.htmlLang}" hidden>\n${site.header(x, "archivo", "#" + o.AS.hashOf(e))}\n<main>${site.AS.entryPage(e).body(x)}</main>\n${site.footer(x)}\n</div>`);
    }
  }
  const ROUTER_JS = `
(function(){var titles=${JSON.stringify(titles)};
function go(){var h=(location.hash||'#inicio').slice(1)||'inicio';var pages=document.querySelectorAll('[data-page]');var hit=false;
pages.forEach(function(p){var on=p.getAttribute('data-page')===h;p.hidden=!on;if(on)hit=true});
if(!hit){document.querySelector('[data-page="inicio"]').hidden=false;h='inicio'}
document.title=titles[h]||titles.inicio;window.scrollTo(0,0);
document.querySelectorAll('.mob').forEach(function(d){d.open=false});}
window.addEventListener('hashchange',go);go();})();`;
  const html = `<title>Indómito V3</title>
${FONTS}
<style>
${CSS}
</style>
${blocks.join("\n")}
<script>document.documentElement.setAttribute("data-theme","light");${FORM_JS}${ARCHIVO_JS}${ROUTER_JS}</script>
`;
  fs.mkdirSync("preview", { recursive: true });
  fs.writeFileSync("preview/index.html", html);
}

// Chequeo: la capa en inglés no puede tener más ítems que el español en la carta ni en encuentros (se desalinearían).
const warn = [];
CEN_LAYER.carta?.categorias?.forEach((c, i) => { if ((c.items?.length || 0) !== (CES.carta.categorias[i]?.items.length || 0)) warn.push(`Carta EN: la categoría ${i + 1} tiene ${c.items?.length} ítems y en español ${CES.carta.categorias[i]?.items.length}.`); });
if ((CEN_LAYER.encuentros?.length || 0) !== CES.encuentros.length) warn.push(`Encuentros EN: ${CEN_LAYER.encuentros?.length || 0} traducidos, ${CES.encuentros.length} en español.`);

const n = buildDist();
buildPreview();
const AS = SITES.es.AS;
if (AS.revisar.length) console.log("Archivo Sonoro, datos a revisar:\n  - " + AS.revisar.join("\n  - "));
if (SITES.en.AS.sinNotaEn.length) console.log("Archivo Sonoro, notas sin traducir al inglés (src/archivo/notas-en.json):\n  - " + SITES.en.AS.sinNotaEn.join("\n  - "));
if (warn.length) console.log("Traducción, a revisar:\n  - " + warn.join("\n  - "));
console.log(`OK · dist/ (${n} páginas, es + en) y preview/index.html`);
