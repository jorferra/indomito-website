# Indómito V3

Sitio estático generado desde una sola fuente de contenido. Sin dependencias.

- `content.json` — carta, precios, estados de Encuentros y Tienda, contactos. **Todo cambio de contenido se hace acá.**
- `build.mjs` — genera `dist/` (sitio real, una carpeta por ruta) y `preview/index.html` (vista navegable).
- `src/styles.css` — único CSS. `src/img/` — fotos en webp (800 y 1600 px).
- `wrangler.jsonc` — publicación en Cloudflare Workers (static assets, 404 propio, `_redirects`).

## Comandos

```bash
node build.mjs          # genera dist/ y preview/
npx wrangler deploy     # publica dist/ en Cloudflare
```

## Hechos del negocio (no inventar)

- Living a puertas cerradas en Caballito Norte. Sin horarios, sin local a la calle, sin tueste propio.
- Laboratorio Sensorial se menciona solo como: "Una experiencia de Laboratorio Sensorial, en colaboración con Indómito Café."
- Diario Sensorial es una sección del Instagram de Indómito. En el sitio aparece solo como procedencia del Archivo Sonoro (/archivo-sonoro/).
- Club no existe como sección hasta que haya una membresía real.
- No publicar productos que no existen ni fotos de terceros o mockups.

## Antes de salir

- Confirmar precios de la carta y la fecha de vigencia en `content.json`.
- Apuntar el dominio a Cloudflare y probar los redirects de `dist/_redirects`.
