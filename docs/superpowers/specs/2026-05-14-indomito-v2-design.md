# Indomito Website V2 Design Spec

## Goal
Create a second version of the Indómito website with a more austere, menu-like visual language while keeping V1 frozen.

V2 should preserve the current information architecture and content intent, but present it in a stricter, more minimal format:
- white background
- black text
- Inter as the base typeface
- one main column
- smaller type
- less ornamentation
- more spacing discipline

The result should feel closer to a printed cafe menu than to an editorial landing page.

## Non-Goals
- Do not modify V1 pages or V1 routing behavior.
- Do not reintroduce decorative visuals, warm paper tones, or complex multi-column spreads.
- Do not remove information from the site just to make it minimal.
- Do not redesign the brand identity from scratch.

## Visual Direction
V2 should be austere and direct.

Core characteristics:
- background: pure white
- foreground: pure black and restrained grays
- typography: Inter
- layout: one centered column on desktop, one column on mobile
- hierarchy: title, supporting text, then structured content blocks
- spacing: generous vertical rhythm, compact content blocks
- tone: practical, clean, slightly editorial, but not fancy

The reference mood is a printed menu or cafe sheet, not a brochure and not a magazine spread.

## Content Strategy
V2 keeps the same major sections as V1:
- Home
- Carta
- Servicio
- Agenda
- Media
- Club
- Nosotros / Contacto

The difference is in presentation, not information removal.

Each page should keep the core content, but in a stripped-down format:
- fewer visual containers
- fewer badges and decorative labels
- no oversized hero treatments
- no warm background treatments
- no layout that depends on left/right spreads

## Layout System
Use a single-column system as the default pattern for V2.

Suggested structure:
- top title area
- short intro paragraph
- one optional hero image or media block
- stacked sections below
- clear section titles
- compact metadata rows or lists when needed

Rules:
- desktop and mobile both use one column
- content width should remain controlled and readable
- section dividers should be simple and light
- text should stay left-aligned and easy to scan
- any repeated content should be rendered as a plain list or compact key/value block

## Typography
Typography should be intentionally smaller and less expressive than V1.

Rules:
- base font: Inter
- body text: compact but readable
- section titles: small, clear, bold enough to separate sections
- avoid decorative tracking and exaggerated display sizing
- use black and near-black for most text
- use muted gray only for secondary labels or metadata

The page should feel calm and restrained, not luxurious or atmospheric.

## Media Usage
V2 may still use images and video, but only when they support clarity.

Rules:
- no decorative media used just to fill space
- images should be functional and readable
- avoid layered overlays and collage-like hero treatments
- keep media blocks simple and well-contained

## Shared Components
V2 should be implemented in parallel to V1, with shared low-level utilities only where they do not force V1 behavior onto V2.

Recommended separation:
- shared tokens for color, spacing, and type scale
- V2-specific page components and layout primitives
- V1 remains untouched

This keeps the new system isolated and makes it possible to iterate on V2 without disturbing the current site.

## Routing Strategy
V1 remains the default experience.

V2 should live under a separate route namespace until it is ready for promotion. A practical option is:
- `#/v2` for the V2 home
- `#/v2/carta`
- `#/v2/servicio`
- `#/v2/agenda`
- `#/v2/media`
- `#/v2/club`
- `#/v2/nosotros`

This allows side-by-side comparison and prevents accidental breakage of the live V1 site.

## Page-Level Intent
### Home
Keep the home strong, but minimal:
- title-led opening
- short supporting copy
- no heavy editorial blocks
- content should feel like an entry point, not a promotional montage

### Carta
Make Carta feel like a clean menu:
- plain list structure
- compact section headings
- clear price/item hierarchy if present
- no exaggerated visual spread

### Servicio
Keep the service pitch, but present it as a stripped operational sheet:
- what it is
- how it works
- what is included
- who it is for

### Agenda
Keep only events and their essential details:
- what is happening
- when
- how to act on it

### Media
Treat Media as a simple archive / media hub:
- sounds
- sessions
- streams
- links or embeds

### Club
Keep TRAZA and related editorial membership content here, but in minimal form.

### Nosotros / Contacto
Merge into one page with a direct about/contact presentation.

## Implementation Boundary
The V2 implementation should be isolated enough that V1 can remain frozen.

Preferred structure:
- `src/v2/*` for V2 page modules
- V2-specific route handling
- reuse only generic tokens and helper utilities where useful

The implementation should not rewrite the current pages in place.

## Success Criteria
The V2 design is successful if:
- it reads as clearly minimal and austere
- it feels like a printed menu or cafe sheet
- it preserves the existing information
- it uses one-column layout consistently
- it avoids ornament and visual clutter
- it stays separate from V1

## Open Questions
- Whether V2 should reuse the current media assets or select a smaller set.
- Whether V2 should start with all pages or only the most visible ones first.
- Whether `#/v2` should be hidden behind a toggle or exposed directly.
