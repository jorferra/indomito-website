# Indómito V3: technical handoff

Documento de traspaso para seguir trabajando el sitio en Codex, Claude Code u otra IA.
Estado: septiembre 2026. Owner: Jor Ferraro.

Leer entero antes de tocar nada. Las secciones 2 y 3 (hechos del negocio y reglas de voz) importan tanto como el código. Las versiones anteriores del sitio fallaron porque cada agente rellenó los huecos inventando datos.

---

## 1. Qué es esto

Sitio estático de **Indómito Café** (indomitocafe.com). Reemplaza al sitio actual en Framer.

- **Ubicación:** `/Users/xu/Work/indomito-website/v3/`, dentro del repo `github.com/jorferra/indomito-website`.
- **Stack:** HTML estático generado por `build.mjs` (Node, sin dependencias) desde una fuente única, `content.json`.
- **Deploy previsto:** Cloudflare Workers con static assets (`wrangler.jsonc`).
- **Preview navegable:** artifact privado en claude.ai. Es una sola página con router por hash; se genera en `preview/index.html`.

```
v3/
├── content.json        ← TODO el contenido editable (carta, precios, estados, encuentros, contactos)
├── build.mjs           ← generador: templates de páginas + head SEO + sitemap + redirects + preview
├── wrangler.jsonc      ← config de Cloudflare Workers (assets en ./dist, 404 propio)
├── README.md
├── HANDOFF.md          ← este documento
├── src/
│   ├── styles.css      ← único CSS (tokens, escala tipográfica, temas claro/oscuro)
│   └── img/            ← fotos webp 800/1600, logos, wordmark.svg, og.jpg, favicon
├── preview/index.html  ← generado (no editar a mano)
└── dist/               ← generado (no editar a mano; no está en la carpeta, lo crea el build)
```

**Comandos**

```bash
node build.mjs          # genera dist/ (sitio real) y preview/index.html
npx wrangler deploy     # publica dist/ en Cloudflare (requiere login de wrangler)
```

Para ver el sitio real en local: `cd dist && python3 -m http.server 8000` (las rutas usan barra final: `/carta/`).

---

## 2. Hechos del negocio (no inventar, no contradecir)

- Indómito es un **living a puertas cerradas en Caballito Norte**. No es un café de mostrador:
  - no tiene horarios, local a la calle ni "barra" abierta al público;
  - no tuesta café y no compra café verde;
  - no hay "café de la semana" ni "blend del día".
- El living recibe gente en fechas puntuales, por convocatoria. Ahí se escuchan vinilos y se sirve en tazas de cerámica.
- En el living hay máquina de espresso. En **Sistema Portátil** (el servicio para eventos) el café es **espresso**.
- **Laboratorio Sensorial (LS)** es un método de Jor Ferraro y Andrés Mainetti. Se menciona siempre con esta fórmula exacta:
  > Una experiencia de Laboratorio Sensorial, en colaboración con Indómito Café.
  - Nunca "Laboratorio Sensorial de Indómito" ni "Eventos de LS".
  - La fórmula completa va en la página de cada edición, no repetida en listas.
- **Roles en LS:** Andrés Mainetti guía desde la barra (el costado del café). Jor Ferraro lleva la parte musical e histórica.
- **Diario Sensorial** es una sección dentro del Instagram @indomito_cafe. En el sitio aparece solo como procedencia del **Archivo Sonoro** (sección propia `/archivo-sonoro/`, ver §13). No se usa "Diario Sensorial" como nombre de navegación.
- **Club Sensorial y TRAZA no existen** como producto. No se publican hasta que haya una membresía real.
- **Tienda:** la primera edición está en preparación. No se publican productos inexistentes, precios dummy ni mockups.
- **Música en Sistema Portátil:** curaduría en vivo a cargo de Jor. Sin pedidos (no es un DJ de eventos).
- **Contacto:** WhatsApp +54 9 11 6046 3980 · Instagram @indomito_cafe · LS: @labsensorial.

**Datos falsos conocidos en versiones anteriores (NO reutilizar):**
- tres locales (Pedro Goyena 1420, Nicaragua 4857, Coronel Díaz 2025);
- horarios Lun–Dom;
- "Fundado 2021" y coordenadas GPS;
- equipo inventado (Joaquín Vega, Malena Vitale, etc.);
- "tostamos semanalmente" y "relaciones directas con productores";
- Club a $6.000/mes con 15% de descuento.

Todo esto está en el `CLAUDE.md` y en `src/shared.jsx` de la V1 (ver sección 12).

---

## 3. Voz y reglas editoriales

**Registro:** rioplatense natural, breve y seco, con remates en dos tiempos. La referencia es la voz de las previews V2:
- "El café va donde vos estés."
- "Intenso y directo. Sin concesiones."
- "Lo que pasó y lo que va a pasar."
- "Nos escribís con fecha y formato. Te respondemos, cerramos y vamos."

**Fórmula de redacción:** sustantivo concreto + acción simple + dato útil.

**Evitar:**
- "experiencia inmersiva única", "viaje sensorial", "refugio sensorial", "comunidad vibrante", "redefinimos", "te invitamos a descubrir", "más que una cafetería";
- definir por negación ("No somos una cafetería…", "No es un evento");
- "aún", calcos del inglés y adjetivos de catálogo ("aromas que cuentan historias").

**Frases fijas y dónde viven (no repetir en otros lugares):**

| Frase | Ubicación única |
|---|---|
| Un café no se toma. Se habita. | Origen (lema de cierre) |
| Lo que se siente, no se discute. | Cierre de la página Living |
| Extraemos todo nuestro café a 90 °C. | Carta (dato técnico) y línea chica en la carta de la home |
| Tiempo alrededor de la taza. | Origen |
| Respondemos nosotros, con tiempo. | Footer |

**Reglas que surgieron en la revisión:**
- El H1 es el nombre de la página; la oración va en la bajada (`.lead`).
- No repetir una misma frase en home y página interna, ni dos veces en la misma pantalla.
- "Caballito Norte" aparece solo en el footer, la bajada del hero, la bajada de Origen y junto a una fecha confirmada del living.
- Sin números romanos ni numeraciones decorativas (01/02/03) salvo que el contenido sea una secuencia real (pasos, estaciones).
- **Archivo de encuentros:** se muestra por serie y número ("Tostado & Girado · Edición 001"), no por fecha. La fecha real queda en `fechaReal` para registro interno.
- **Ediciones de LS:** "Edición {Tema}" como título y nombre propio como subtítulo. Nombre completo: "Laboratorio Sensorial: Edición {Tema}".
  - LS01 Edición Electrónica / Entreverde (archivo).
  - LS02 Edición Jamaica / Pressure Bloom (convocatoria abierta).
  - LS03 Edición Tango / Fuelles & Fermento (en preparación).
- **CTA de listas:** siempre "Anotarme por WhatsApp →". Postulaciones a LS: "Postularme →" (formulario de Tally).

---

## 4. Arquitectura

### 4.1 `content.json` (fuente única)

| Clave | Contenido |
|---|---|
| `site` | nombre, URL, zona, WhatsApp, Instagram, año, `umami` (null hasta instalar) |
| `carta` | `vigencia`, `destacados` (3 nombres para la home), `pie`, `notas[]` (la primera se muestra arriba), `categorias[]` con `nombre`, `meta`, `items[]` (`nombre`, `precio` numérico en ARS, `receta`, `nota`) |
| `living` | `estado` (`sin-fecha` o con fecha), `proxima` (`dia`, `horario`, `cupo`), `archivo[]` (`serie`, `titulo`, `nota`, `cafe`, `musica`, `fechaReal`), `frase` |
| `encuentros[]` | `id`, `estado` (`convocatoria` · `proximo` · `preparacion` · `archivo`), `codigo`, `titulo`, `subtitulo`, `nombreCompleto`, `ls` (bool), `fecha` (texto visible), `bajada`, `nota`, `cta` (`label` + `href` externo o `wa` = texto precargado de WhatsApp), `pagina` (bool = tiene página propia) |
| `ls02` | contenido de la página de la Edición Jamaica: `lead2`, `descripcion[]`, `estaciones[]`, `formato[]`, `fechaNota`, `creditos[]` |
| `tienda` | `estado`, `estadoLabel`, `productos[]` (vacío) |

**Comportamientos derivados de los datos:**
- La franja de aviso de la home aparece sola cuando algún encuentro tiene `estado: "convocatoria"`, y desaparece cuando ninguno lo tiene.
- Los precios se formatean con `toLocaleString("es-AR")`, pero **hoy no se muestran**: `carta.mostrarPrecios` está en `false` (decisión de Jor, 27/9/2026). Los valores quedan guardados en `content.json`; para volver a mostrarlos alcanza con poner `true`.
- Si `site.umami` tiene `{src, id}`, el script de analítica se inyecta en todas las páginas.

### 4.2 `build.mjs`

> Desde la versión bilingüe, rutas y textos fijos viven en `src/i18n.mjs` y las páginas se arman por idioma con `makeSite(lang)`. Ver §14.

- `ROUTES`: ruta real y hash de preview por página. `NAV`: menú (Living, Carta, Sistema Portátil, Encuentros, Archivo Sonoro, Origen; Tienda está solo en el footer).
- `ctx(mode)`: `link()` y `src()` resuelven rutas distintas para `dist` (paths absolutos) y `preview` (hashes y `img/` relativo).
- Piezas: `header`, `footer`, `fig` (img con srcset 800/1600, lazy salvo el hero), `pill` (estados), `menuItems`, `encCard`, `aviso`, `WORDMARK` (SVG inline) y `trk()` (atributos de evento para Umami).
- `P.{página}`: `title`, `desc` y `body(x)` de cada página. `P404` es aparte.
- `buildDist()`:
  - escribe una carpeta por ruta con `index.html`, más `404.html`, `styles.css`, `site.js`, `img/`, `robots.txt`, `sitemap.xml` y `_redirects`;
  - cada página lleva meta description, canonical, OG, Twitter card, theme-color y favicon;
  - la home suma además JSON-LD `CafeOrCoffeeShop`.
- `buildPreview()`: todas las páginas como `<div data-page>` en un solo archivo, con el CSS inline y un router por hash. Es el formato que exige el artifact de claude.ai (sin doctype, html, head ni body).

### 4.3 JavaScript (`site.js`)

- **Formulario de Sistema Portátil:**
  - valida que el nombre no esté vacío y, si falta, muestra un error en texto;
  - arma el mensaje de WhatsApp con los 7 campos;
  - muestra la confirmación, dispara `umami.track('consulta-sistema')` si existe y redirige a WhatsApp (solo fuera de un iframe).
- El menú móvil (`<details>`) se cierra al tocar un link.

---

## 5. Sistema visual

**Tokens (`src/styles.css`, `:root`)**

| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `--bg` | `#ffffff` | `#14120f` | fondo |
| `--ink` | `#16130f` | `#efeae2` | texto |
| `--mute` | `#5c554d` | `#a39b90` | secundario (≥ 4,5:1) |
| `--line` | `#e8e4de` | `#2c2823` | separadores |
| `--soft` | `#f5f3ef` | `#1d1a16` | franja de aviso, caja de confirmación |
| `--amber` | `#8b6f47` | `#c29a66` | **cobre:** todas las etiquetas mono en mayúsculas |

- **Tipografías:**
  - Inter (texto) y JetBrains Mono (etiquetas, precios), ambas desde Google Fonts.
  - El wordmark **INDÓMITO** usa Address Sans Pro Xt Regular (Alejandro Paul, Sudtipos), convertido a paths SVG (`src/img/wordmark.svg`, embebido inline con `currentColor`). La fuente no se sirve.
- **Logo disco:** `disco.png` / `disco-light.png`, a 15 px en el header. Es un detalle sutil, no un protagonista.
- **Escala tipográfica (9 pasos, variables `--fs-*`):**
  - wordmark hero `clamp(64,11vw,156)`;
  - h1 `clamp(48,8vw,104)`, lema `clamp(34,5.2vw,64)`, h2 `clamp(32,4.4vw,52)`, h3 `clamp(22,2.4vw,28)`;
  - lead `clamp(19,1.8vw,21)`, body-l 18, body 17, sm 15, meta 14, label 11 (mono).
  - No agregar tamaños sueltos: usar las variables.
- **Títulos:** un H1 por página; los títulos de sección son `h2.k` (estilo etiqueta cobre).
- **Layout:** columna de 1120 px, gutter de 20 px, secciones separadas por línea fina. La home es un hero tipográfico sin foto más 5 "puertas": Living, Carta, Sistema Portátil, Encuentros y Archivo Sonoro (Encuentros.
- **Accesibilidad aplicada:**
  - contraste AA y objetivos táctiles de 24 px o más;
  - foco visible (outline cobre) y `prefers-reduced-motion`;
  - modo oscuro por `prefers-color-scheme` y `[data-theme]`;
  - `[hidden]{display:none!important}`.

**Fotos en uso:** `carta-granos` (Carta, franja 21:9) y `origen-mano` (Origen). Las demás de `src/img` están disponibles y sin usar.
**Fotos prohibidas:** de terceros (producto Audio-Technica, Edifier, miniaturas de YouTube), mockups de Tienda, tapas de discos en primer plano, fotos de Sistema Portátil que no sean del servicio real, stock e IA.

---

## 6. Páginas

| Ruta | Contenido |
|---|---|
| `/` | Aviso LS02 · hero wordmark · Living · Carta (3 destacados + 90 °C) · Sistema Portátil · Encuentros (estados) |
| `/living/` | Cómo funciona (3 pasos) · próxima apertura (estado) · archivo por edición · cierre "Lo que se siente, no se discute." |
| `/carta/` | Nota de disponibilidad · índice de categorías (solo en dist) · franja de granos · 5 categorías con receta y nota · 90 °C · notas |
| `/sistema-portatil/` | Intro · foto de la barra en un evento (`sistema-barra-*.webp`) · "Indómito se mueve." · ficha (Café, Pastelería, Música, Sonido) · ocasiones (incluye Casamientos, Cumpleaños, Eventos de empresa, Coffee break) · formulario → WhatsApp (`#consulta`) · botón fijo de WhatsApp en móvil · JSON-LD `Service` |
| `/encuentros/` | Próximos (h2) · archivo |
| `/encuentros/edicion-jamaica/` | Estado + Tally · La edición (4 párrafos) · Estaciones · Formato · Créditos |
| `/tienda/` | Estado de lista, sin productos (linkeada solo desde el footer) |
| `/origen/` | Mano · texto de origen · lema |
| `/terminos/`, `404.html` | Legales; 404 con `noindex` |

---

## 7. SEO

**Hecho:**
- títulos con palabra clave por página ("Barra de café para eventos en Buenos Aires — Indómito", etc.);
- descripciones únicas, `lang="es-AR"`, canonical, OG (`/img/og.jpg`, espresso 1200×630);
- JSON-LD en la home, sitemap, robots, alt en imágenes y jerarquía de títulos.

**Redirects (`dist/_redirects`, formato de Cloudflare):**

```
/eventos        /encuentros/ 301
/objetos        /tienda/     301
/club           /encuentros/ 301
/club/tg1       /living/     301
/club/playlists /origen/     301
/terms          /terminos/   301
```

`/news*`, `/page-3`, `/old-home-2`, `/tcvxp` e `/index.php/*` quedan en 404 a propósito. Son restos del template de Framer ("Latte Haven") y de un WordPress anterior que Google todavía tiene indexados.

**Pendiente:**
1. Google Search Console: verificar el dominio, enviar el sitemap y pedir la baja de las URLs del template.
2. Perfil de Google Business como negocio con zona de servicio (Sistema Portátil), sin publicar la dirección del living.
3. JSON-LD `Event` para cada edición de LS cuando tenga `startDate`.
4. Imagen OG por página (hoy todas usan la misma).

---

## 8. Analítica

**1 oct 2026 — acciones en GA4:** `click_postulacion` (salida a Tally), `click_lista_encuentros` (listas de Living/Encuentros), `click_lista_tienda` (interés por WhatsApp), `click_whatsapp_sistema` (botón fijo o confirmación), `click_whatsapp` (footer) y `consulta_sistema` (formulario válido que prepara el mensaje). Parámetros: `origen`, `idioma`; el formulario suma `tipo_evento`. No se envían nombre, teléfono, fecha, zona ni mensaje. Las salidas esperan callback o hasta 600 ms. Umami y Ads conservan sus eventos. Estos eventos miden intención: no confirman envío en WhatsApp, postulación completada en Tally, alta efectiva ni venta.

**Configuración guardada en la propiedad GA4 (1 oct 2026):** `consulta_sistema`, `click_postulacion`, `click_lista_tienda` y `click_whatsapp_sistema` creados con código y marcados como eventos clave. Conteo: una vez por sesión. Sin valor monetario predeterminado. `click_lista_encuentros` y `click_whatsapp` se registran como eventos de apoyo, sin marcar como clave. Los parámetros propios no están registrados como dimensiones personalizadas para informes estándar.

**Validación:** build de las 92 páginas, sintaxis de `dist/site.js`, pruebas de enrutamiento de eventos exclusivamente a GA4 y navegación con callback/timeout. Formulario vacío sin evento; formulario válido con un único `consulta_sistema` sin datos personales en sus parámetros. En producción se verificó la recepción de `click_postulacion` en Tiempo real mediante un clic de prueba desde la home a Tally; no se envió ninguna postulación. La prueba queda incluida en los datos del 1 de octubre. Umami y las conversiones existentes de Google Ads se conservan.

**1 oct 2026:** GA4 configurado con `site.googleAnalytics.id = G-8NHQC1ET9Q` (flujo `indomito cafe web stream`, ID 10490179823). Comparte una única carga de gtag con Google Ads, conserva Umami y habilita los endpoints de Analytics en la CSP. Mide páginas y los eventos de medición mejorada que estén activos en el flujo; las acciones propias se registran también en GA4 según el detalle anterior. La instalación no recupera datos anteriores.

**Estado (26 sep 2026): Umami Cloud activo** (plan Hobby gratis: 100k eventos/mes, 6 meses de historial). `site.umami` en `content.json` tiene `src` e `id`. Verificado en vivo: pageviews y eventos (`escucha-al-azar`, `whatsapp` con `origen`) llegan a `gateway.umami.is/api/send`. Los eventos que navegan con JS (escucha al azar, consulta de Sistema Portátil) esperan hasta 600 ms a que Umami confirme antes de salir. Search Console: propiedad `https://www.indomitocafe.com/` verificada por meta tag (`site.gscVerification`), sitemap enviado.

- **Recomendación:** Umami self-hosted en el servidor Hetzner (Docker, Traefik, Postgres ya existen).
- Cloudflare Web Analytics no sirve para esto porque no registra eventos propios.
- **Instalación en el sitio:** completar `site.umami = { "src": "https://.../script.js", "id": "<website-id>" }` en `content.json` y rebuild.
- **Eventos ya marcados** (`data-umami-event` + `data-umami-event-origen`):
  - `postulacion`: `aviso-home`, `ls02` (lista), `pagina-edicion`;
  - `lista`: `living`, `living-proxima`, `ls03`, `tienda`;
  - `consulta-sistema`: formulario, vía JS con `tipo` y `personas`;
  - `whatsapp` e `instagram`: footer.
- **KPIs mensuales:** consultas de Sistema Portátil por tipo de evento · postulaciones por edición y por origen · altas a listas (living, Tienda).

---

## 9. Deploy

**Estado (26 sep 2026): la V3 está en producción en https://www.indomitocafe.com.**

- Registrador: GoDaddy (el dominio sigue registrado ahí). Nameservers: Cloudflare (`carmelo`, `elisa.ns.cloudflare.com`). DNSSEC apagado.
- Zona en la cuenta de Cloudflare de soyjorferraro@gmail.com, plan Free.
- Worker `indomito-web` (assets estáticos de `dist/`) con custom domains `www.indomitocafe.com` e `indomitocafe.com` (en `wrangler.jsonc`, `routes`). workers.dev quedó deshabilitado.
- Redirect Rule "Redirect from root to WWW": `indomitocafe.com/*` → `https://www.indomitocafe.com/${1}` (301, conserva query). "Always Use HTTPS" activado.
- Los registros de Framer (A 31.43.160.6/161.6 y CNAME www → sites.framer.app) fueron borrados. Queda solo `_domainconnect` (de GoDaddy).

**Para publicar un cambio:** `node build.mjs && npx wrangler deploy` desde `v3/` en la Mac (Wrangler ya está logueado en esa Mac).

**Seguridad (27 sep 2026):** `build.mjs` genera `dist/_headers` con HSTS, CSP, X-Frame-Options DENY, nosniff, Referrer-Policy y Permissions-Policy. La CSP permite scripts solo de `self`, Umami (`cloud.umami.is`) y el beacon que Cloudflare inyecta (`static.cloudflareinsights.com`). Si se suma un script o servicio externo nuevo, hay que agregarlo a la CSP o el navegador lo bloquea.
**Tema:** el sitio va siempre en claro (`data-theme="light"` en `<html>`). Los estilos oscuros siguen en `styles.css`; para reactivarlos, sacar ese atributo.
**Publicar desde otra máquina:** también se publicó desde un entorno en la nube con `npx wrangler login --device`. Antes de publicar desde cualquier lado, confirmar que la copia local esté al día con esta carpeta: si no, se pisan cambios.

**Ojo:** la V1 (React) y la V2 (HTML) usan el mismo proyecto de Vercel `indomito-website` y el mismo repo. La V3 va a Cloudflare. No publicar V1 ni V2 al dominio.

---

## 10. Pendientes de contenido (bloquean la publicación)

- [x] Precios de la carta: se sacaron del sitio (27/9/2026). Si vuelven, antes confirmar el doble espresso ($4.300, igual que el simple).
- [x] Edición Jamaica: café de Etiopía y cupo de 12 personas, confirmados por Jor el 25 de septiembre de 2026.
- [ ] Mapeo estación ↔ etapa del café en LS02 (no está definido; no inventarlo).
- [ ] Licencia de Address Sans Pro para el wordmark.
- [x] Sistema Portátil tiene foto propia desde el 26/9/2026 (event2.jpg de `IndomitoClaudeDesign/assets/fotos para Servicio`). Faltan: capacidad mín./máx., precio de referencia, eventos anteriores, tiempo real de respuesta y más fotos con gente.
- [ ] Confirmar que Indómito hace casamientos, cumpleaños, eventos de empresa y coffee break (se agregaron a Ocasiones y al formulario sin confirmación explícita).
- [ ] Home: "Abrimos cuando hay fecha. Pocos lugares, sin apuro." choca con la regla de no comunicar escasez. Propuesta: "Abrimos cuando hay fecha. Cada lugar tiene nombre."
- [x] Umami instalado y `site.umami` completo.
- [ ] Fecha de la próxima apertura del living (hoy "en preparación").

---

## 11. Decisiones tomadas (no revertir sin el OK de Jor)

- Hero sin foto, solo tipografía con el wordmark original.
- Sin fotos en Living hasta tener fotos propias. Sistema Portátil ya usa una foto propia del servicio real.
- Carta sin precios (27/9/2026).
- Tienda fuera del menú y de la home; solo una línea en el footer.
- Aviso fijo en la home mientras haya una convocatoria abierta.
- Sin números romanos.
- Carta con receta (mono) + nota corta en dos tiempos por ítem.
- **Sistema Portátil:**
  - Café "Especialidad. Espresso.";
  - Música "Curaduría en vivo.";
  - Sonido "Equipo propio." (sin modelo ni potencia);
  - sin "Rodajes".
- Origen:
  > Indómito nació en un living de Caballito Norte. / Entre vinilos, cafés, silencios y conversaciones que pedían más tiempo que likes. / Después vino el oficio: moler, medir, esperar. / El punto de partida sigue siendo el mismo: tiempo alrededor de la taza. Lo analógico, lo ritual, lo compartido. / **Un café no se toma. Se habita.**

---

## 12. Historial y otras carpetas (referencia, no fuente)

| Versión | Dónde | Estado |
|---|---|---|
| Framer (en vivo) | indomitocafe.com | Metadata duplicada, `lang="en"`, 10 MB de fuentes (incluye SF Pro, sin licencia web), páginas de template indexadas, eventos vencidos, Club inventado |
| V1 React/Vite | `…/GoogleDrive…/MacStudio/IndomitoClaudeDesign/` | HashRouter (malo para SEO), `CLAUDE.md` y `shared.jsx` con datos falsos, `node_modules` sincronizado en Drive |
| V2 HTML | `/Users/xu/Work/indomito-website/` (raíz) | Buena voz; notas de diseño publicadas como copy, CTAs sin link, Club y Tienda dummy |
| Handoff de contenido | Perplexity, "Indómito Café — Content Handoff" | Estructura de 5 puertas y reglas de voz; precios inventados (no usar) |

Recomendación pendiente: mover V1, V2 y los checkpoints a `_archivo/`, fuera del alcance de los agentes, y reemplazar el `CLAUDE.md` de la V1 por uno con solo los hechos de la sección 2.


---

## 13. Archivo Sonoro

Sección `/archivo-sonoro/` con una página por escucha (`/archivo-sonoro/{artista-tema}/`). Código en `src/archivo.mjs`; datos en `src/archivo/archive.json`; imágenes en `src/archivo/img/` (tapas `cover-{id}-400|800.webp`, placas del Diario `diario-{fecha}-{id}.webp` recortadas al texto).

**Fuente:** export de `music_usage.sqlite3` del pipeline del Diario Sensorial (el mismo JSON que usa `archive-preview.diariosensorial.pages.dev`).

**Normalización en el build (no editar datos a mano):**
- Fecha: `editorial_date` (se quita el sufijo `_A`, `_B`…). Si falta, se usa el mes de `used_at` y se muestra como "mes de uso".
- Año del disco: `release_year`. Se descarta (el sitio omite el año, sin rótulo) si es anterior a 1920 o si contradice el año citado en la nota. El build lista esos casos en consola ("datos a revisar").
- Correcciones verificadas: `src/archivo/correcciones.json`, por slug (`año`, `disco`, `nota`, `fuente`). Ganan sobre el export y sacan la entrada de "revisar". Ya corregidos: Nils Frahm "Ambre" → Wintermusik, 2009; Bing & Ruth "Starwood Choker" → No Home of the Mind (4AD, 2017), con tapa reemplazada (el export traía City Lake).
- Nota: se oculta si es el texto genérico "una entrada del archivo sonoro".
- Portada tipo `artist` se rotula "Foto del artista".

**Página índice:** búsqueda, décadas (según año del disco, generadas de los datos), "Una escucha al azar" (evento Umami `escucha-al-azar`).
**Ficha:** tapa, disco, año, fecha del Diario, nota si existe, publicación original (placa) si existe, "Seguí por acá" (hasta 3: mismo artista o disco a ±3 años). JSON-LD `MusicRecording`. Sin reproductor (decisión: pendiente).
**Home:** puerta "Archivo Sonoro" con las 3 últimas escuchas.

**Pendiente en el pipeline (Codex):**
1. Exportar sin `export_path`, `usage_id` ni `generated_from` (hoy publican rutas locales en el JSON de pages.dev).
2. Recuperar `editorial_date` de las 17 escuchas de abril–mayo 2026.
3. Corregir en origen (music_usage.sqlite3) Frahm, Bing & Ruth y Sakamoto como en `correcciones.json`: el pipeline asignó mal disco, año y tapa (Frahm, Bing & Ruth) y fechó mal Babel (Sakamoto: la película es de 2006). Satie queda sin año: es una pieza de 1890 sin grabación de referencia registrada.
4. Reemplazar las notas genéricas por notas reales o dejarlas vacías.
5. Al publicar una escucha nueva: copiar `archive.json` + imágenes a `src/archivo/`, sumar su nota en inglés a `src/archivo/notas-en.json` (el build avisa si falta), correr `node build.mjs` y `npx wrangler deploy`.

---

## 14. Versión en inglés

El sitio sale en dos idiomas desde el mismo build: español en `/`, inglés en `/en/`. Español es la fuente de verdad.

**Archivos:**
- `src/i18n.mjs`: rutas por idioma (`ROUTES.es`, `ROUTES.en`) y todos los textos fijos de las páginas (`T.es`, `T.en`).
- `content.en.json`: capa de textos en inglés sobre `content.json`. Solo textos. Precios, estados, links, fechas reales y números salen siempre de `content.json`. Los arrays se combinan por posición: si se agrega un ítem a la carta o un encuentro en español, hay que agregar su traducción en la misma posición (el build avisa si las cantidades no coinciden).
- `src/archivo/notas-en.json`: notas del Archivo Sonoro en inglés, por slug. Sin traducción, la ficha en inglés sale sin nota y el build lo lista.

**Rutas en inglés:** `/en/`, `/en/living/`, `/en/menu/`, `/en/portable-bar/`, `/en/gatherings/`, `/en/gatherings/jamaica-edition/`, `/en/shop/`, `/en/sound-archive/` (+ `/{slug}/`), `/en/origin/`, `/en/terms/`, `/en/404.html` (Cloudflare sirve el `404.html` más cercano).

**Selector:** "EN" / "ES" en el header, lleva a la misma página en el otro idioma (también en las fichas del archivo). No hay redirección automática por idioma del navegador, a propósito. Evento Umami `idioma`.

**SEO:** cada página declara `hreflang` es-AR, en y x-default (→ español), `og:locale` y `og:locale:alternate`. El sitemap incluye las 92 URLs. El JSON-LD del negocio va solo en la home en español.

**Reglas editoriales en inglés:**
- No es traducción literal: misma voz, corta y seca.
- Quedan en español en los dos idiomas: "Sistema Portátil", "Living", "Laboratorio Sensorial", "Diario Sensorial", "Tostado & Girado", los subtítulos (Pressure Bloom, Fuelles & Fermento, Entreverde), "Medialunas" y las dos frases de firma ("Lo que se siente, no se discute." y "Un café no se toma. Se habita.", marcadas `lang="es"`).
- Fórmula de LS en inglés: "A Laboratorio Sensorial experience, in collaboration with Indómito Café."
- Living, Encuentros y la Edición Jamaica avisan "Hosted in Spanish": las experiencias son en castellano. No prometer atención en inglés en ningún lado mientras eso no sea cierto.
- Precios en inglés: formato "ARS 4,300" (sin uso mientras `mostrarPrecios` sea `false`; la nota "Prices in Argentine pesos" se quitó).
- El formulario de Sistema Portátil arma el mensaje de WhatsApp en el idioma de la página.


## 15. Google Ads (activo desde 26/9/2026)
- Cuenta 176-655-8674, etiqueta AW-666439793. Conversiones: "Sistema Portátil · Formulario" (Enviar formulario de contacto) y "Sistema Portátil · WhatsApp" (Contacto), ambas primarias, recuento "Una", valor fijo 1 ARS, sin conversiones mejoradas. La cuenta de Ads figura cancelada: hay que reactivarla (facturación) antes de lanzar la campaña.
- `site.googleAds` en content.json: con `id` vacío no se carga nada de Google. Al completar `id` (AW-…) y `labels.form` / `labels.whatsapp`, el build carga la etiqueta desde site.js, dispara conversiones al enviar el formulario de Sistema Portátil y al tocar el botón fijo de WhatsApp, y suma los dominios de Google a la CSP.
- **Estado (30/9/2026, verificado en producción): `id` y `labels` ya están completos y la etiqueta AW-666439793 carga en el sitio en vivo** (presente en `site.js` y dominios de Google en la CSP). La campaña sigue sin lanzar (§16) y la cuenta figura cancelada: mientras no se reactive, la etiqueta dispara conversiones que Google no registra en ninguna cuenta activa.
- Visitas con gclid/gbraid/wbraid o utm_source=google quedan marcadas en la sesión: el mensaje de WhatsApp termina en "(vía Google)" y el evento `consulta-sistema` lleva `fuente: google-ads`.
- /sistema-portatil/ tiene botón fijo "Consultar por WhatsApp" en pantallas de hasta 860 px (evento `whatsapp`, origen `sistema-fijo`).

## 16. Campaña de Google Ads (plan, sin lanzar)

- Documento: "Campaña Google Ads — Sistema Portátil" (Claude Docs). Búsqueda solamente, CABA + GBA, grupos Eventos y Empresas, 15 títulos, 4 descripciones, prueba de 4 semanas con reglas de seguir, ajustar o cortar según costo por consulta.
- Auditoría hecha el 26/9/2026. Correcciones pendientes en la campaña (no en el sitio): sacar las negativas "busco" y "máquina"; quitar los sitelinks a Living, Encuentros y Carta; apagar AI Max (sobre todo la expansión de URL final); unificar el fijado de títulos; títulos propios para Empresas; sumar al costo la percepción de IVA (21 %) y de Ingresos Brutos (CABA y PBA).
- Antes de lanzar: reactivar la cuenta 176-655-8674 (figura cancelada desde 2023) y validar palabras clave en el Planificador.

## 17. Instagram (@indomito_cafe)

- **Skill de marca:** propuesto como `indomito-marca` (voz, paleta, tipografías, mood, formatos de IG, captions, chequeo). Regla central: primero claridad, después estilo; nada de referencias que el lector no conoce.
- **Post de lanzamiento del sitio:** carrusel de 5 placas 1080 × 1350 y caption en `ig/2026-09-sitio/` (portada "Abrimos la web."). Pendiente de publicar a mano: la cuenta no está conectada a Metricool.
- **Destacadas (decisión en curso):** siete, con íconos de línea dibujados por Jor, trazo redondeado parejo, negro sobre crema:
  Indómito (disco con vapor) · Living (sillón) · Carta (taza con plato) · Portátil (valija) · Encuentros (dos círculos que se cruzan) · Laboratorio (matraz) · Series (tres hojas corridas).
  Ajustes antes de exportar: sin anillo dibujado (el borde lo pone Instagram), punto de Indómito más chico, renglones de Series de largo desigual y trazo un punto más fino, títulos en el campo de nombre de Instagram (no dentro de la imagen). Portadas 1080 × 1920 con el ícono centrado.
  Descartado en el camino: fotos, glifos crípticos (A/B, 90°, LS), máquina de escribir, palabras en mono (ilegibles a 64 pt), iniciales, discos con etiqueta.
- **Series:** una sola destacada con CRITERIO, SENTIDO y SERVICIO en orden, cada una abierta por su pieza 00. Fuente: carpeta de Drive con las tres series y `INDOMITO_cuestionario_Andres.txt`. La máquina de escribir es el formato de las series, no la voz de la marca.
- **Corregir en las series y el cuestionario:** SERVICIO 05 y 09 dicen 89 °C, y la pregunta 11 del cuestionario también (la carta dice 90 °C). Falta SENTIDO 00.
- **Perfil:** la bio usa emojis y "Consultas por MD" (el sitio lleva a WhatsApp); la foto de perfil tiene fondo lila, fuera de la paleta. Bio propuesta: "Café de especialidad y vinilos. / Un living en Caballito que abre con fecha. / Barra para eventos · Laboratorio Sensorial. / Consultas por WhatsApp ↓". Destacadas actuales a reemplazar: Sistema Portátil, inicio, Cultura del café.
- Archivos de trabajo en `ig/` de esta carpeta (versiones v2 a v9 de destacadas son exploración; no publicar).


## 18. Series en la web (diseño aprobado, sin construir)

Objetivo: publicar CRITERIO, SENTIDO y SERVICIO como páginas del sitio. Es el contenido propio más valioso para buscadores y agentes: el Archivo Sonoro cuenta qué escuchan, Laboratorio muestra qué hacen y Series dice cómo piensan.

**Fuente de contenido:** carpeta de Drive "INDÓMITO / SERIES" (CRITERIO_serie-01, SENTIDO_serie-02, SERVICIO_serie-03, Inicio). Cada serie tiene `copy/` (texto de cada pieza), `fuentes.md` (respaldo auditado con citas) y `publicar/` (placas de IG). El texto se edita en `copy/` del repo diario-sensorial y se regenera con `scripts/criterio_deliver.py`. Web e IG tienen que salir del mismo `copy/`: nunca corregir una pieza solo en la web.

**Pruebas:** en `v3/pruebas/` (fuera de `dist/`, así no se publican): `prueba-criterio-01.html`, `-07`, `-03` y `-03b`. **La 03b es la aprobada.** Son autónomas: tienen el CSS del sitio adentro y las imágenes apuntan a indomitocafe.com, así que se abren con doble clic. Los links del menú no andan en `file://`. Si cambia `src/styles.css`, hay que volver a meterlo en cada prueba.

**Estructura de cada pieza (según la 03b):**
1. Etiqueta en mono: `Series · Criterio · 03 de 10`, con "Series" enlazado al índice.
2. h1 con el título de la pieza.
3. Bajada: la primera frase de la pieza.
4. Cuerpo: el resto, en el tamaño de lectura de Origen (`fs-lead`, máximo 40ch).
5. Ficha (`dl.ficha`) solo cuando la pieza trae datos medibles, como CRITERIO 01 (18 g, 36 g, 28 s).
6. **Fuentes**, en una línea por obra, sin citas ni paráfrasis: nombre completo de la obra, año y secciones. Ejemplo: "Specialty Coffee Association, *Coffee Sensory and Cupping Handbook* (2021), secciones 13.1, 13.2 y capítulo 14." Las citas textuales quedan en `fuentes.md`, como respaldo interno. Pendiente: subir el tamaño de Fuentes a texto normal, porque en móvil se lee como nota legal.
7. Pie con la firma `Indómito / Series / Criterio 03` y los enlaces anterior y siguiente.
8. Más aire antes del pie global en las páginas de Series. No cambiar el pie del sitio.

**Abreviaturas de obras (de `fuentes.md`):**
- SCA: *Coffee Sensory and Cupping Handbook* (2021)
- ATLAS: James Hoffmann, *The World Atlas of Coffee*
- ARTUSI: *Manual del café*

**URLs y páginas:**
- Una por pieza: `/series/criterio/03-describir-y-juzgar/`, con el número para conservar el orden.
- Índices: `/series/` y `/series/criterio/`, `/series/sentido/`, `/series/servicio/`, con las piezas en orden 00 a 10 en lista, no en grilla.

**Marcado:**
- `<article>`, un solo h1 y migas de pan.
- JSON-LD `Article` con `isPartOf` (la serie) y autor Indómito Café.
- Sumar todas las páginas al sitemap.
- No usar rel=prev/next: Google no lo usa desde 2019, alcanzan los enlaces visibles.
- Sin versión en inglés por ahora: son textos de autor en castellano.

**Menú:** Series necesita su lugar en el menú. Las pruebas marcan "Origen" solo porque se armaron sobre esa plantilla.

**Build:**
1. Leer los `copy/*.txt` de cada serie. Hay que copiarlos al repo o apuntar a la carpeta.
2. De cada `fuentes.md`, extraer solo qué obras y qué secciones usa cada pieza.
3. Generar las páginas, los índices y el sitemap.

**Pendientes editoriales:**
- CRITERIO 03: cambiar el cierre en `copy/` por "Cuando el gusto no coincide, queda la descripción." y releer las diez con ese criterio.
- SERVICIO 05 y 09 dicen 89 °C: pasarlos a 90 °C.
- Falta SENTIDO 00.

## 19. Descubrimiento por buscadores y agentes (orden acordado)

1. Series en la web (sección 18).
2. Corregir la entidad en JSON-LD: la home dice `CafeOrCoffeeShop` con dirección, y sugiere una cafetería abierta al público. Pasar a una organización o negocio con área de servicio, con `@id`, y colgar de ella el `Service` de Sistema Portátil (ya existe), los `Event` de cada edición de Laboratorio Sensorial y el Archivo Sonoro.
3. Primer párrafo que responde, en las páginas clave. Ejemplo para Sistema Portátil: "Sistema Portátil es la barra móvil de Indómito Café para eventos en Buenos Aires. Sirve espresso de especialidad, con curaduría musical en vivo y equipo propio."
4. `/llms.txt` y versiones en texto de las páginas, generadas por el build desde `content.json`. Prioridad baja: Google no lo usa. Evitar la frase circular "Laboratorio Sensorial es una experiencia de Laboratorio Sensorial"; usar "un encuentro para 12 personas con dos guías, café y música, en colaboración con Indómito Café".

**Ya resuelto, no rehacer:**
- robots.txt permite todo. Nombrar a GPTBot solo si se decide bloquear el entrenamiento; OAI-SearchBot no hace falta.
- La ficha de Google está creada.
- Los enlaces `wa.me` están en el pie, en el botón fijo y en la confirmación del formulario.
- Umami ya muestra las visitas que llegan desde chatgpt.com, perplexity.ai y otros asistentes.

## 20. Destacadas de IG: textos

Los textos de una placa por destacada se revisaron el 27/9/2026:
- Series e Indómito se aprobaron tal cual. En Indómito, cambiar "con pausa, curiosidad y atención" por "con pausa y atención".
- Living, Carta, Portátil, Encuentros y Laboratorio se corrigieron. Versiones corregidas:
  - LIVING: "El lugar donde empieza todo. / Un living. Café preparado sin apuro, discos y conversaciones alrededor de una mesa. / Abrimos cuando hay fecha. Cada lugar tiene nombre."
  - CARTA: "Café de especialidad, espresso o filtrado, en taza de cerámica. / Bebidas frías y pastelería artesanal, dulce y salada. / Una carta corta, hecha para quedarse un rato."
  - PORTÁTIL: "Indómito puede moverse. / Sistema Portátil lleva café de especialidad, servicio y nuestra manera de hacer las cosas a eventos y encuentros. / Nos contás dónde. Nosotros armamos el sistema. / Consultas por WhatsApp."
  - ENCUENTROS: "A veces el living cambia de forma. / Aperturas con fecha y ediciones de Laboratorio Sensorial. / Encuentros pensados alrededor del café, la música y una idea. / Acá quedan las próximas fechas."
  - LABORATORIO: "Café, música e historia puestos sobre la misma mesa. / Laboratorio Sensorial explora una cultura a través de la escucha y del café. 12 personas, dos guías. / LS01 · LS02 · LS03"
- Reglas que aplican:
  - Sin "Pocos lugares".
  - WhatsApp, no DM.
  - Sin "producciones".
  - La carta es fija; solo varía el origen del grano.
  - Encuentros son aperturas del living y ediciones de Laboratorio Sensorial, nada más.
  - Laboratorio: LS01 · LS02 · LS03, 12 personas, dos guías.

## Cómo seguir en otra herramienta (Codex u otra)

- **Fuente de verdad:** la carpeta `indomito-website/v3` en la Mac. Leer este archivo y `AGENTS.md` antes de tocar nada.
- **Build:** `node build.mjs` genera `dist/` y `preview/`.
- **Publicar:** `npx wrangler@4 deploy` desde `v3/`, con la sesión de Cloudflare iniciada (`npx wrangler login`). Deploy solo desde una copia sincronizada con lo publicado.
- **Verificar después de cada cambio:** `node --check dist/site.js`, revisar la CSP en `dist/_headers` y mirar la página en celular y en escritorio.
- **Estado al 27/9/2026:** el sitio publicado coincide con esta carpeta. Las pruebas de Series están en `v3/pruebas/`.

- **27/9:** la lista de ocasiones de Sistema Portátil quedó en 6: Celebraciones · Lanzamientos · Activaciones de marca · Eventos de empresa · Cenas · Espacios culturales. Casamiento, Cumpleaños y Coffee break siguen solo en el desplegable del formulario (por las búsquedas de Ads).
- **27/9:** home, bloque living: "Abrimos cuando hay fecha. Cada encuentro tiene su momento." (EN: "Each gathering has its moment.")


## 21. Metadata de la home (1 oct 2026)

Título ES aprobado: "Indómito Café — Café de especialidad y curaduría musical". Descripción ES: "Living a puertas cerradas en Caballito, con encuentros por convocatoria. Sistema Portátil lleva café de especialidad y curaduría musical a eventos en Buenos Aires." Versión EN equivalente en `src/i18n.mjs`. Aplica al título de pestaña, meta description, Open Graph y Twitter mediante el template existente. Se conserva todo el texto visible de la home y la metadata de las páginas internas.


## 22. Entidad del negocio (1 oct 2026)

La home ES identifica a Indómito Café como `Organization`, con ID estable `https://www.indomitocafe.com/#organization`, URL, imagen, teléfono e Instagram. Se retiran la clasificación `CafeOrCoffeeShop`, `PostalAddress` y `servesCuisine`. Sistema Portátil ES/EN sigue siendo `Service`, con ID estable `https://www.indomitocafe.com/sistema-portatil/#service`, URL por idioma, cobertura CABA/GBA y `provider` enlazado al mismo ID de organización. No cambia contenido visible ni la ficha de Google Business.


## 23. Sistema Portátil: condiciones y opciones (1 oct 2026)

Datos confirmados por Jor: mínimo de 50 cafés (no personas); cantidad superior a coordinar, sin máximo confirmado. Consulta sugerida con 2 o 3 semanas de anticipación. Se publican ambas líneas antes del formulario, ES/EN desde `sistemaCoordinacion` en content.json/content.en.json. Pastelería artesanal y equipo de sonido son opcionales, a coordinar; música se coordina según el evento. La bajada ya no promete música incluida siempre.

Coordinación por WhatsApp, sin publicar un bloque técnico: espacio en heladera para las leches, conexión eléctrica y pileta/lavamanos para descartar agua. Los requisitos eléctricos específicos quedan a confirmar con Andrés. No se publica un máximo de 70 cafés ni se presenta el sonido como servicio ya contratado en eventos anteriores.

## 24. Archivo: compartir y escuchar (1 oct 2026)

Las 72 fichas ES/EN declaran imagen propia en Open Graph y Twitter: placa del Diario si existe, tapa en su defecto y OG general como último recurso. Se conserva el archivo original sin recortarlo. Los servicios externos pueden cachear previews anteriores.

Por decisión de Jor, las 36 escuchas enlazan a Spotify en ambos idiomas mediante búsquedas por artista y tema. Rótulos «Buscar en Spotify» / «Search on Spotify»: no se presentan como enlaces directos a una grabación verificada. El build genera los enlaces automáticamente para futuras entradas, sin consultas de red ni mantenimiento de un catálogo externo. Se retiraron el mapa de Apple Music y su script de resolución. No hay reproductores ni cargas de terceros adicionales.

Los clics llevan evento Umami `escucha` (origen = slug, destino = proveedor) y GA4 `click_escucha` (origen = slug, idioma). No es evento clave ni prueba de reproducción: solo salida al servicio musical. Se conservan canonical propio, hreflang y MusicRecording.

Search Console, consulta del 1 oct 2026: propiedad https://www.indomitocafe.com/, filtro 3 meses pero datos visibles solo 25–28 sep. 3 clics, 135 impresiones, CTR 2,2 %, posición media 5,9. Home: 1 clic/61 impresiones. Fichas EN de Stars of the Lid y Helios: un clic cada una. Sistema Portátil: 0 clics/1 impresión. Muestra insuficiente para evaluar conversiones o efectos de los cambios de hoy; contiene URLs antiguas de Framer. Mantener fichas EN indexables y dejar acumular datos de GA4 desde su instalación del 1 oct.

Validación: 92 páginas generadas; 72 fichas con imagen resoluble y enlace de escucha; 16 placas, 19 tapas y 1 imagen general por idioma. Revisión visual ES escritorio y EN móvil; prueba de evento `click_escucha` dirigido solo a GA4, sin conversión Ads. Producción ES/EN verificada. Deploy Cloudflare `363d1fc1-b094-4c68-9b87-ab25b98a0340`.

Actualización Spotify (1 oct 2026): enlaces unificados en las 72 fichas ES/EN; imágenes para compartir y eventos de medición conservados.
