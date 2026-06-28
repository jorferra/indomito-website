# Documentacion Indomito V2

## Estado

Indomito V2 es una version visual separada de V1. V1 queda congelada como referencia anterior. V2 es el sitio minimal, blanco, tipografia negra, Inter/system fallback, con estructura de menu impreso: austero, directo, poco ornamental.

La produccion actual se publica en Vercel:

- Produccion: `https://indomito-website.vercel.app`
- Proyecto local: `/Users/jor/Work/indomito-site/v2/IndomitoClaudeDesign`
- Tipo: HTML estatico
- Build output: `dist/`

## Concepto

La direccion visual de V2 es "carta de cafe al paso":

- Fondo blanco puro.
- Texto negro.
- Menos imagen, menos video, menos gesto editorial.
- Mucho aire.
- Una sola columna cuando mejora lectura.
- Separadores minimos.
- Informacion completa, pero menos pesada.
- El sitio debe sentirse imprimible.

No es una landing comercial clasica. No busca vender con hero grande, imagenes aspiracionales o bloques con mucho formato. Busca ordenar la informacion como una carta sobria.

## Navegacion

Todas las paginas tienen navegacion superior con estas entradas:

- Home
- Carta
- Servicio
- Agenda
- Media
- Club
- Tienda
- Nosotros
- Laboratorio

Decisiones tomadas:

- `Laboratorio` vive como pagina principal.
- `Home` lista Laboratorio junto con las demas secciones.
- `Tienda` y `Club` tienen el mismo peso visual que Carta y Servicio.
- `Nosotros` y contacto viven juntos en una sola pagina.
- `Media` contiene paisajes sonoros, sesiones y futuras transmisiones.

## Paginas vivas

### `index.html`

Indice de acceso a todas las paginas. Es una pantalla util para revisar estructura y navegar rapido.

### `home.html`

Entrada principal. Presenta Indomito en clave minimal y lista las secciones principales con igual peso.

### `carta.html`

Carta completa en version austera. Evitar manifiestos, ingles y frases repetitivas. La carta debe ser clara, con precios y categorias legibles.

### `servicio.html`

Sistema portatil. Texto principal decidido:

> El cafe va donde vos estes. Especialidad, pasteleria y musica curada en un solo servicio.

Propuesta decidida:

> Cafe de especialidad, donde sea. Lo molemos, preparamos y servimos en el momento.

Sistema incluye:

- Cafe: especialidad / blend del dia
- Metodo: espresso
- Pasteleria: artesanal, dulce y salada
- Musica: curaduria integrada
- Sonido: Edifier 70W RMS

Ocasiones:

> Para encuentros que merecen cuidado. Reuniones, eventos privados, celebraciones.

No incluir ferias. No incluir bloque final redundante de reservas. No incluir "Escribir por WhatsApp" como CTA visible.

### `agenda.html`

Agenda de eventos. Copy decidido:

> Lo que paso  
> y lo que va a pasar.

La agenda no debe mezclar archivo, eventos y media como si todo fuera el mismo tipo de contenido.

### `media.html`

Pagina para paisajes sonoros, sesiones y livestreams futuros. Copy decidido:

> Sonidos, sesiones  
> y transmisiones.

Paisajes sonoros pertenecen aca, no en Agenda.

### `club.html`

Lugar para TRAZA y formatos de comunidad/membresia. TRAZA no pertenece a Agenda.

### `tienda.html`

Tienda minimal con productos puntuales. En los previews se usaron productos dummy: remera, cap y bolsa de cafe. El estilo debe mantener poco texto y precio claro.

### `nosotros.html`

Origen y contacto juntos.

### `laboratorio.html`

Pagina principal para laboratorio, formatos de escucha, cafe y proceso.

## Tecnica

El sitio actual no depende de React, Vite ni assets locales para renderizar V2. Es HTML estatico.

Archivos fuente necesarios:

- `index.html`
- `home.html`
- `carta.html`
- `servicio.html`
- `agenda.html`
- `media.html`
- `club.html`
- `tienda.html`
- `nosotros.html`
- `laboratorio.html`
- `package.json`
- `.vercelignore`
- `.gitignore`
- `README.md`
- `DOCUMENTACION_INDÓMITO_V2.md`

El script de build:

```bash
npm run build
```

Hace:

```bash
rm -rf dist
mkdir -p dist
cp index.html home.html carta.html servicio.html agenda.html media.html club.html tienda.html nosotros.html laboratorio.html dist/
```

El deploy:

```bash
npm run deploy
```

usa:

```bash
npx vercel deploy --prod --yes
```

## Vercel

Vercel esta linkeado por `.vercel/project.json`. No borrar `.vercel/` local salvo que se quiera relinkear el proyecto.

La produccion esperada es:

```text
https://indomito-website.vercel.app
```

Si se despliega desde este folder, se actualiza la V2 en produccion.

## Como modificar visualmente

Para cambios de texto:

1. Abrir el HTML de la pagina.
2. Buscar el texto exacto.
3. Editar el contenido.
4. Correr `npm run build`.
5. Correr `npm run deploy`.

Para cambios de layout:

1. Editar el `<style>` dentro del HTML correspondiente.
2. Mantener fondo blanco y texto negro salvo decision explicita.
3. Revisar mobile primero.
4. Evitar imagenes grandes, cards decorativas y exceso de separadores.

Para cambios globales:

Hoy no hay CSS compartido. Cada HTML tiene sus estilos embebidos. Esto fue elegido para velocidad y simplicidad. Si V2 se vuelve definitiva, el siguiente paso natural es extraer un `style.css` compartido y reducir duplicacion.

## Reglas visuales

- No usar fondo crema.
- No usar tipografia ornamental.
- Mantener Inter o system sans.
- Evitar textos grandes salvo encabezados principales.
- El texto principal puede vivir en torno a 40px cuando funciona como statement.
- No abusar de lineas horizontales.
- No usar dos columnas si ensucia la lectura.
- Priorizar aire, ritmo y lectura.

## Pendientes recomendados

1. Extraer CSS comun a un solo archivo.
2. Revisar copy definitivo de cada pagina.
3. Reemplazar productos dummy de Tienda si se activa venta real.
4. Definir si `index.html` debe ser indice o redirigir a `home.html`.
5. Agregar metadata SEO basica por pagina.
6. Agregar favicon y Open Graph cuando haya identidad final.

## Cuidado

No volver a mezclar V1 y V2 en el mismo folder. V1 debe quedar como referencia congelada. V2 debe seguir siendo simple, auditable y facil de publicar.
