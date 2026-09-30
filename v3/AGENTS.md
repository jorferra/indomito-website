# AGENTS.md

Antes de cambiar algo en este proyecto, leé `HANDOFF.md` completo.

Reglas mínimas:
- Todo el contenido se edita en `content.json`. No escribas precios, fechas ni estados a mano en `build.mjs`.
- No inventes datos del negocio: ni locales, ni horarios, ni equipo, ni productos, ni tueste, ni Club. Si falta un dato, dejalo pendiente y avisá.
- Laboratorio Sensorial se nombra con una sola fórmula: "Una experiencia de Laboratorio Sensorial, en colaboración con Indómito Café."
- Escribí en español rioplatense, breve y seco. Respetá la lista de frases a evitar (HANDOFF §3).
- Los tamaños tipográficos salen solo de las variables `--fs-*`. Las etiquetas en mono mayúscula van en `--amber`.
- Después de cada cambio corré `node build.mjs`. No edites `dist/` ni `preview/` a mano.
- El sitio es bilingüe (HANDOFF §14). Todo cambio de texto en español se replica en inglés: `content.en.json` (misma posición en arrays), `src/i18n.mjs` o `src/archivo/notas-en.json`. Las experiencias son en castellano: no prometer atención en inglés.
