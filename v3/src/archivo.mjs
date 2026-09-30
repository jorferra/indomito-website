// Archivo Sonoro: normaliza el export del Diario Sensorial y genera sus páginas.
// Entrada: src/archivo/archive.json (export de music_usage.sqlite3). Imágenes: src/archivo/img/.
import fs from "node:fs";

const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const AÑO_MINIMO = 1920; // antes de esto, el dato es de composición, no del disco

const slugify = (t) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function loadArchivo(file = "src/archivo/archive.json") {
  const raw = JSON.parse(fs.readFileSync(file, "utf8"));
  const revisar = [];
  const used = new Set();
  const entries = raw.items.map((it) => {
    // fecha: editorial exacta; si falta, mes de uso (used_at) marcado como aproximado
    const ed = (it.editorial_date || "").replace(/_[A-Z]+$/, "");
    const [y, m, d] = (ed || it.used_at.slice(0, 10)).split("-").map(Number);
    const exacta = Boolean(ed);
    const fechaLabel = exacta ? `${d} ${MESES[m - 1]} ${y}` : `${MESES[m - 1]} ${y}`;
    const orden = ed ? `${ed}T12:00` : it.used_at;
    // año del disco: descartar imposibles y contradicciones con la nota
    let año = /^\d{4}$/.test(it.release_year || "") ? Number(it.release_year) : null;
    if (año && año < AÑO_MINIMO) { revisar.push(`${it.artist} — ${it.track}: año ${año} parece de composición`); año = null; }
    const notaAño = (it.cover_note || "").match(/\((?:[^,()]+,\s*)?(\d{4})\)/);
    if (año && notaAño && Number(notaAño[1]) !== año) { revisar.push(`${it.artist} — ${it.track}: año ${año} y la nota dice ${notaAño[1]}`); año = null; }
    // nota: solo si dice algo
    const nota = /una entrada del archivo sonoro/i.test(it.cover_note || "") ? "" : (it.cover_note || "").trim();
    let slug = slugify(`${it.artist}-${it.track}`); while (used.has(slug)) slug += "-2"; used.add(slug);
    const base = (p) => (p ? p.split("/").pop().replace(/\.[a-z]+$/, "") : "");
    const coverStem = base(it.cover_path);
    const cover = it.cover_path?.endsWith(".svg") ? { svg: `cover-${coverStem}.svg` } : coverStem ? { s: `cover-${coverStem}-400.webp`, l: `cover-${coverStem}-800.webp` } : null;
    const slide = it.slide_path ? `diario-${it.slide_path.split("/").pop().replace(/\.[a-z]+$/, "")}.webp` : "";
    return {
      slug, fecha: { y, m, d }, artista: it.artist, tema: it.track, disco: it.album || "", año, fechaLabel, exacta, orden,
      nota, cover, coverTipo: it.cover_kind, coverLabel: it.cover_label || "", slide,
    };
  });
  // correcciones verificadas a mano: ganan sobre el export y sacan la entrada de "revisar"
  const fixFile = file.replace(/archive\.json$/, "correcciones.json");
  const fixes = fs.existsSync(fixFile) ? JSON.parse(fs.readFileSync(fixFile, "utf8")) : {};
  const fixed = entries.map((e) => {
    const f = fixes[e.slug]; if (!f) return e;
    const tag = `${e.artista} — ${e.tema}:`;
    for (let i = revisar.length - 1; i >= 0; i--) if (revisar[i].startsWith(tag)) revisar.splice(i, 1);
    return { ...e, ...(f.año ? { año: f.año } : {}), ...(f.disco ? { disco: f.disco } : {}), ...(f.nota ? { nota: f.nota } : {}) };
  }).sort((a, b) => b.orden.localeCompare(a.orden));
  return { entries: fixed, revisar };
}

const TX = {
  es: {
    meses: MESES, kicker: "Diario Sensorial", h1: "Archivo Sonoro", lead: "Las escuchas del Diario Sensorial, una por publicación.",
    buscar: "Buscar", ph: "Artista, tema o disco", decAria: "Año del disco", todas: "Todas", azar: "Una escucha al azar →",
    one: "escucha", many: "escuchas", vacio: "No hay escuchas para esa búsqueda.",
    nota: "Década según el año del disco. Las fechas sin día corresponden al mes en que se usó el tema.",
    explorar: "Explorar el archivo →", mesUso: "mes de uso", disco: "Disco", año: "Año", diario: "Diario",
    fotoArtista: "Foto del artista", altFoto: "Foto de ", altTapa: "Tapa de ", original: "Publicación original",
    placa: "Placa del Diario Sensorial: ", seguir: "Seguí por acá", mismo: "Mismo artista", discoDe: "Disco de ",
    title: "Archivo Sonoro — Indómito", suffix: " · Archivo Sonoro — Indómito",
    desc: (n) => `Las escuchas del Diario Sensorial de Indómito: ${n} temas con su disco, año y fecha de publicación.`,
    descE: (e, f) => `${e.artista}, "${e.tema}"${e.disco ? ` (${e.disco}${e.año ? `, ${e.año}` : ""})` : ""}. Escucha del Diario Sensorial de Indómito, ${f}.`,
    base: "/archivo-sonoro/", hash: "archivo-sonoro", pre: "as-", idp: "",
  },
  en: {
    meses: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    kicker: "Diario Sensorial", h1: "Sound Archive", lead: "Every track from Diario Sensorial, one per post.",
    buscar: "Search", ph: "Artist, track or album", decAria: "Record year", todas: "All", azar: "A random listen →",
    one: "listen", many: "listens", vacio: "Nothing matches that search.",
    nota: "Decades follow the record's release year. Dates without a day show the month the track was used.",
    explorar: "Browse the archive →", mesUso: "month used", disco: "Album", año: "Year", diario: "Posted",
    fotoArtista: "Artist photo", altFoto: "Photo of ", altTapa: "Cover of ", original: "Original post, in Spanish",
    placa: "Diario Sensorial card: ", seguir: "Keep listening", mismo: "Same artist", discoDe: "Record from ",
    title: "Sound Archive — Indómito", suffix: " · Sound Archive — Indómito",
    desc: (n) => `Every track from Indómito's Diario Sensorial: ${n} listens with album, year and post date.`,
    descE: (e, f) => `${e.artista}, "${e.tema}"${e.disco ? ` (${e.disco}${e.año ? `, ${e.año}` : ""})` : ""}. A listen from Indómito's Diario Sensorial, ${f}.`,
    base: "/en/sound-archive/", hash: "en-sound-archive", pre: "en-as-", idp: "en-",
  },
};

let NOTAS_EN = {};
try { NOTAS_EN = JSON.parse(fs.readFileSync("src/archivo/notas-en.json", "utf8")); } catch {}

export function archivoPieces({ S, lang = "es" }) {
  const t = TX[lang];
  const { entries: base, revisar } = loadArchivo();
  const sinNotaEn = [];
  const entries = base.map((e) => {
    const { y, m, d } = e.fecha;
    const fechaLabel = e.exacta ? (lang === "en" ? `${t.meses[m - 1]} ${d}, ${y}` : `${d} ${t.meses[m - 1]} ${y}`) : `${t.meses[m - 1]} ${y}`;
    let nota = e.nota;
    if (lang === "en") { nota = e.nota ? NOTAS_EN[e.slug] || "" : ""; if (e.nota && !nota) sinNotaEn.push(`${e.artista} — ${e.tema} (${e.slug})`); }
    return { ...e, fechaLabel, nota };
  });
  const decadas = [...new Set(entries.filter((e) => e.año).map((e) => Math.floor(e.año / 10) * 10))].sort((a, b) => a - b);
  const pathOf = (e) => `${t.base}${e.slug}/`;
  const href = (x, e) => (x.preview ? `#${t.pre}${e.slug}` : pathOf(e));
  const idxHref = (x) => (x.preview ? `#${t.hash}` : t.base);
  const img = (x, f) => (x.preview ? `archivo/${f}` : `/img/archivo/${f}`);
  const meta = (e) => [e.disco, e.año].filter(Boolean).join(" · ");

  const coverTag = (x, e, size = "s", eager = false) => {
    if (!e.cover) return `<div class="as-cover as-type" aria-hidden="true">${esc(e.artista)}</div>`;
    const alt = e.coverTipo === "artist" ? `${t.altFoto}${e.coverLabel || e.artista}` : `${t.altTapa}${e.disco || e.tema}`;
    const f = e.cover.svg || (size === "l" ? e.cover.l : e.cover.s);
    return `<img class="as-cover" src="${img(x, f)}" alt="${esc(alt)}" width="400" height="400"${eager ? "" : ' loading="lazy"'} decoding="async">`;
  };

  const card = (x, e) => `
<li class="as-card" data-decada="${e.año ? Math.floor(e.año / 10) * 10 : ""}" data-q="${esc(`${e.artista} ${e.tema} ${e.disco} ${e.año || ""}`.toLowerCase())}">
  <a href="${href(x, e)}">${coverTag(x, e)}
    <p class="k">${esc(e.fechaLabel)}</p>
    <p class="as-art">${esc(e.artista)}</p>
    <p class="as-tema">${esc(e.tema)}</p>
    <p class="as-meta">${esc(meta(e))}</p>
  </a>
</li>`;

  const homeBlock = (x) => `
<section class="door">
  <p class="k">${t.kicker}</p>
  <div class="body">
    <h2>${t.h1}</h2>
    <p>${t.lead}</p>
    <ul class="as-mini">${entries.slice(0, 3).map((e) => `<li><a href="${href(x, e)}">${coverTag(x, e)}<span><b>${esc(e.artista)}</b>${esc(e.tema)}</span></a></li>`).join("")}</ul>
    <a class="cta" href="${idxHref(x)}">${t.explorar}</a>
  </div>
</section>`;

  const indexPage = {
    title: t.title,
    desc: t.desc(entries.length),
    body: (x) => `
<div class="wrap" data-as-root>
  <header class="ph intro"><p class="k">${t.kicker}</p><h1>${t.h1}</h1><p class="lead">${t.lead}</p></header>
  <div class="as-tools" data-as-tools>
    <label class="as-search" for="${t.idp}as-q"><span class="k">${t.buscar}</span><input id="${t.idp}as-q" data-as-q type="search" placeholder="${t.ph}" autocomplete="off"></label>
    <div class="as-dec" role="group" aria-label="${t.decAria}">
      <button type="button" class="as-chip" data-dec="" aria-pressed="true">${t.todas}</button>
      ${decadas.map((d) => `<button type="button" class="as-chip" data-dec="${d}" aria-pressed="false">${String(d).slice(2)}s</button>`).join("")}
    </div>
    <button type="button" class="cta as-rand" data-as-rand>${t.azar}</button>
    <p class="as-count k" aria-live="polite" data-as-count data-one="${t.one}" data-many="${t.many}">${entries.length} ${t.many}</p>
  </div>
  <ul class="as-grid" data-as-grid>${entries.map((e) => card(x, e)).join("")}</ul>
  <p class="as-empty" data-as-empty hidden>${t.vacio}</p>
  <p class="notes">${t.nota}</p>
</div>`,
  };

  const related = (e) => {
    const same = entries.filter((o) => o.slug !== e.slug && o.artista === e.artista).map((o) => [o, t.mismo]);
    const near = entries.filter((o) => o.slug !== e.slug && o.artista !== e.artista && e.año && o.año && Math.abs(o.año - e.año) <= 3)
      .sort((a, b) => Math.abs(a.año - e.año) - Math.abs(b.año - e.año)).map((o) => [o, `${t.discoDe}${o.año}`]);
    return [...same, ...near].slice(0, 3);
  };

  const entryPage = (e) => ({
    title: `${e.tema} — ${e.artista}${t.suffix}`,
    desc: e.nota || t.descE(e, e.fechaLabel),
    path: pathOf(e),
    ld: { "@context": "https://schema.org", "@type": "MusicRecording", name: e.tema, byArtist: { "@type": "MusicGroup", name: e.artista }, ...(e.disco ? { inAlbum: { "@type": "MusicAlbum", name: e.disco } } : {}), url: `${S.url}${pathOf(e)}` },
    body: (x) => {
      const rel = related(e);
      return `
<div class="wrap">
  <header class="ph intro"><p class="k"><a href="${idxHref(x)}">${t.h1}</a> · ${esc(e.exacta ? e.fechaLabel : `${e.fechaLabel} (${t.mesUso})`)}</p><h1>${esc(e.tema)}</h1><p class="lead">${esc(e.artista)}</p></header>
  <section class="sec as-detail">
    <div>${coverTag(x, e, "l", true)}${e.coverTipo === "artist" ? `<p class="k mute" style="margin-top:10px">${t.fotoArtista}</p>` : ""}</div>
    <div class="stack">
      <dl class="ficha">
        ${e.disco ? `<dt>${t.disco}</dt><dd>${esc(e.disco)}</dd>` : ""}
        ${e.año ? `<dt>${t.año}</dt><dd>${e.año}</dd>` : ""}
        <dt>${t.diario}</dt><dd>${esc(e.fechaLabel)}${e.exacta ? "" : ` · ${t.mesUso}`}</dd>
      </dl>
      ${e.nota ? `<p class="prose">${esc(e.nota)}</p>` : ""}
    </div>
  </section>
  ${e.slide ? `<section class="sec"><h2 class="k">${t.original}</h2><figure class="fig as-slide"><a href="${img(x, e.slide)}" target="_blank" rel="noopener"><img src="${img(x, e.slide)}" alt="${esc(t.placa + e.artista + ", " + e.tema)}." loading="lazy" decoding="async"${lang === "en" ? ' lang="es"' : ""}></a></figure></section>` : ""}
  ${rel.length ? `<section class="sec"><h2 class="k">${t.seguir}</h2><ul class="as-grid as-rel">${rel.map(([o, why]) => `<li class="as-card"><a href="${href(x, o)}">${coverTag(x, o)}<p class="k">${esc(why)}</p><p class="as-art">${esc(o.artista)}</p><p class="as-tema">${esc(o.tema)}</p></a></li>`).join("")}</ul></section>` : ""}
</div>`;
    },
  });

  return { entries, revisar, sinNotaEn, homeBlock, indexPage, entryPage, pathOf, hashOf: (e) => t.pre + e.slug };
}

// Un solo script para las dos lenguas: cada índice se maneja dentro de su propio [data-as-root].
export const ARCHIVO_JS = `
(function(){document.querySelectorAll('[data-as-root]').forEach(function(root){var t=root.querySelector('[data-as-tools]');if(!t)return;
var q=root.querySelector('[data-as-q]'),grid=root.querySelector('[data-as-grid]'),cards=[].slice.call(grid.children),count=root.querySelector('[data-as-count]'),empty=root.querySelector('[data-as-empty]'),dec='';
function apply(){var s=(q.value||'').trim().toLowerCase(),n=0;cards.forEach(function(c){var ok=(!dec||c.dataset.decada===dec)&&(!s||c.dataset.q.indexOf(s)>-1);c.hidden=!ok;if(ok)n++});count.textContent=n+' '+(n===1?count.dataset.one:count.dataset.many);empty.hidden=n>0}
q.addEventListener('input',apply);
t.querySelectorAll('.as-chip').forEach(function(b){b.addEventListener('click',function(){dec=b.dataset.dec;t.querySelectorAll('.as-chip').forEach(function(o){o.setAttribute('aria-pressed',String(o===b))});apply()})});
t.querySelector('[data-as-rand]').addEventListener('click',function(){var v=cards.filter(function(c){return !c.hidden});if(!v.length)return;var a=v[Math.floor(Math.random()*v.length)].querySelector('a');var go=function(){location.href=a.getAttribute('href')};if(window.umami){Promise.race([umami.track('escucha-al-azar'),new Promise(function(r){setTimeout(r,600)})]).then(go,go)}else{go()}});});})();`;
