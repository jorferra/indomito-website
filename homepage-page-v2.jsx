// Homepage — Chapbook (definitive)
// Combines the Origen masthead/stanza/colophon system with Carta V1b's
// asymmetric 1.4:1 spreads. Copy is verbatim from indomitocafe.com (home
// + sections). Links into each existing subpage.
//
// Structure:
//   Cover          — "Indómito" masthead + italic lede
//   I  · Refugio   — Origen-style pull-quote spread (manifesto)
//   II · Carta     — featured drinks preview → Carta.html
//   III· Club      — membership preview → Club.html
//   IV · Eventos   — Laboratorio Sensorial preview → Eventos.html
//   V  · Tienda    — capsule preview → Tienda.html
//   Intermission   — quiet centered pull-quote
//   VI · Origen    — manifesto lede → Origen.html
//   Colophon       — contact + hours + location ledger

const HT = INDOMITO_TOKENS;
const mono = '"JetBrains Mono", ui-monospace, monospace';
const monoColor = '#8B6F47';

// ── Cover ──────────────────────────────────────────────────
function HomeCover() {
  const isMobile = useIsMobile();
  return (
    <header style={{ margin: isMobile ? '0 16px' : '0 48px',
      padding: isMobile ? '48px 0 72px' : '80px 0 120px',
      borderTop: `1px solid ${HT.rule}`, borderBottom: `1px solid ${HT.rule}`,
      textAlign: 'center' }}>
      <div className="idm-mono" style={{ fontFamily: mono, color: monoColor, letterSpacing: '.22em', marginBottom: 28, fontSize: isMobile ? 11 : 15 }}>
        Mmxxvi · Café de especialidad
      </div>
      <h1 style={{ fontFamily: HT.display, fontSize: isMobile ? 'clamp(72px, 20vw, 120px)' : 'clamp(80px, 16vw, 240px)',
        fontWeight: 300, letterSpacing: '-0.05em', lineHeight: .82, margin: '32px 0 0' }}>
        INDÓMITO
      </h1>
      <div style={{ maxWidth: 760, fontFamily: HT.display, fontWeight: 400, fontStyle: 'italic',
        color: HT.taupe, letterSpacing: '-0.018em', lineHeight: 1.3,
        margin: isMobile ? '32px auto 0' : '55px auto 0',
        fontSize: isMobile ? 'clamp(26px, 6vw, 36px)' : '44px' }}>
        Lo que se siente, no se discute.
      </div>
      <div style={{ maxWidth: 560, margin: '24px auto 0', fontFamily: HT.display,
        fontSize: isMobile ? 16 : 18, lineHeight: 1.65, color: 'rgb(26,26,25)' }}>
        Living de puertas adentro.<br/>Los fines de semana, la barra sale a la vereda.
      </div>
      <div className="idm-mono" style={{ fontFamily: mono, color: monoColor, fontWeight: 600,
        fontSize: 11, marginTop: isMobile ? 24 : 36, letterSpacing: '.18em' }}>
        Un refugio sensorial · Caballito · Buenos Aires
      </div>
      <AmbientVisualizer />
    </header>
  );
}

// ── Section head (matches Origen/Stanza pattern) ───────────
function HomeSectionHead({ num, label, meta }) {
  const isMobile = useIsMobile();
  return (
    <div style={{ padding: isMobile ? '0 20px' : '0 48px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr',
        gap: isMobile ? 8 : 72,
        padding: isMobile ? '64px 0 24px' : '120px 0 32px',
        borderBottom: `1px solid ${HT.rule}`, marginBottom: isMobile ? 32 : 56, alignItems: 'end' }}>
        <h2 style={{ fontFamily: HT.display, fontSize: 'clamp(36px, 6vw, 88px)', margin: 0, fontWeight: 400,
          letterSpacing: '-0.04em', lineHeight: .95 }}>
          {label}
        </h2>
        <div style={{ paddingBottom: isMobile ? 0 : 16, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div className="idm-mono" style={{ fontFamily: mono, color: monoColor, letterSpacing: '.22em' }}>
            {num}
          </div>
          {meta && !isMobile &&
            <div className="idm-mono" style={{ fontFamily: mono, color: monoColor, letterSpacing: '.14em', fontSize: 10 }}>
              {meta}
            </div>
          }
        </div>
      </div>
    </div>
  );
}

// ── Chapter break — back to top ───────────────────────────────────────
function ChapterBreak() { return null; }

// ── Reusable: asymmetric 1.4:1 spread with quiet italic + loud + link ─
function HomeSpread({ quiet, loud, foot, href, linkLabel, right, noBreak }) {
  const isMobile = useIsMobile();
  return (
    <section style={{ padding: isMobile ? '0 20px' : '0 48px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr',
        gap: isMobile ? 32 : 72,
        paddingBottom: isMobile ? 56 : 80,
      }}>
        <div>
          <p style={{ fontFamily: HT.display, fontSize: isMobile ? 'clamp(26px, 6vw, 36px)' : 44,
            fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.22,
            margin: '0 0 24px', whiteSpace: 'pre-line' }}>
            <span style={{ color: HT.taupe, fontStyle: 'italic' }}>{quiet}</span>{loud ? (noBreak ? ' ' : '\n') : ''}{loud}
          </p>
          {foot &&
            <div className="idm-mono" style={{ fontFamily: mono, color: monoColor, letterSpacing: '.14em', marginBottom: 24 }}>
              {foot}
            </div>
          }
          {href &&
            <a href={href} className="idm-hover-underline" style={{ fontFamily: HT.display,
              fontSize: isMobile ? 18 : 22, fontWeight: 500, color: HT.ink,
              textDecoration: 'none', letterSpacing: '-0.018em' }}>
              {linkLabel} →
            </a>
          }
        </div>
        {right}
      </div>
    </section>
  );
}

// ── Right-rail ledger (list of k/v rows) ───────────────────
function Ledger({ rows, title }) {
  const isMobile = useIsMobile();
  return (
    <div style={{ paddingTop: isMobile ? 0 : 8 }}>
      {title &&
        <div className="idm-mono" style={{ fontFamily: mono, color: monoColor, letterSpacing: '.2em', fontSize: 11, fontWeight: 600, marginBottom: 14 }}>
          {title}
        </div>
      }
      {rows.map((r, i) =>
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 20,
          padding: '14px 0', borderBottom: `1px dotted ${HT.rule}`, alignItems: 'baseline' }}>
          <div className="idm-mono" style={{ fontFamily: mono, color: monoColor, letterSpacing: '.14em' }}>{r.k}</div>
          <div style={{ fontFamily: HT.display, fontSize: isMobile ? 15 : 17, letterSpacing: '-0.018em', textAlign: 'right' }}>{r.v}</div>
        </div>
      )}
    </div>
  );
}

// ── Intermission (matches Carta V1b) ───────────────────────
function Intermission({ quiet, loud, foot }) {
  const isMobile = useIsMobile();
  return (
    <section style={{ padding: isMobile ? '80px 20px' : '140px 48px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontFamily: HT.display, fontSize: 'clamp(26px, 4vw, 52px)', fontWeight: 400,
          letterSpacing: '-0.028em', lineHeight: 1.15, margin: 0 }}>
          <span style={{ color: HT.taupe, fontStyle: 'italic' }}>{quiet}</span>
          {loud ? <><br />{loud}</> : null}
        </p>
        {foot &&
          <div className="idm-mono" style={{ fontFamily: mono, color: monoColor, fontWeight: 600, fontSize: 11, marginTop: 24, letterSpacing: '.18em' }}>
            {foot}
          </div>
        }
      </div>
    </section>
  );
}

// ── Colophon / Contact ─────────────────────────────────────
function HomeColophon() {
  const isMobile = useIsMobile();
  return (
    <section style={{ padding: isMobile ? '72px 20px 64px' : '140px 48px 120px' }}>
      <div style={{ borderTop: `1px solid ${HT.ink}`, paddingTop: isMobile ? 40 : 56, maxWidth: 720 }}>
        <p style={{ fontFamily: HT.display, fontSize: isMobile ? 'clamp(24px, 6vw, 36px)' : 40,
          fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.2, margin: '0 0 28px' }}>
          <span style={{ color: HT.taupe, fontStyle: 'italic' }}>Pasá por la barra.</span><br />
          O escribinos — respondemos nosotros, con tiempo.
        </p>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 16 : 0 }}>
          <a href="https://wa.me/5491160463980" className="idm-hover-underline"
             style={{ fontFamily: HT.display, fontSize: isMobile ? 18 : 22, fontWeight: 500,
               color: HT.ink, textDecoration: 'none', letterSpacing: '-0.018em',
               marginRight: isMobile ? 0 : 40 }}>
            WhatsApp →
          </a>
          <a href="https://instagram.com/indomito_cafe" className="idm-hover-underline"
             style={{ fontFamily: HT.display, fontSize: isMobile ? 18 : 22, fontWeight: 500,
               color: HT.ink, textDecoration: 'none', letterSpacing: '-0.018em' }}>
            Instagram →
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Page ───────────────────────────────────────────────────
function HomepagePageV2() {
  const isMobile = useIsMobile();
  const px = isMobile ? 20 : 48;
  return (
    <React.Fragment>
    <div className="idm-root" style={{ width: '100%', background: HT.bg }}>
      <IndomitoNav />
      <HomeCover />

      {/* EN TAZA · AHORA */}
      <div style={{ margin: isMobile ? '0 16px' : '0 48px', border: `1px solid ${HT.rule}`, background: HT.bgAlt }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, padding: isMobile ? '20px 20px 16px' : '32px 48px 24px', borderBottom: `1px solid ${HT.rule}` }}>
          <div className="idm-mono" style={{ fontFamily: mono, color: monoColor, letterSpacing: '.28em', fontSize: 11, opacity: 0.45 }}>◈</div>
          <div className="idm-mono" style={{ fontFamily: mono, color: monoColor, letterSpacing: '.22em', fontSize: isMobile ? 11 : 13 }}>EN TAZA · AHORA</div>
          <div className="idm-mono" style={{ fontFamily: mono, color: HT.taupe, letterSpacing: '.18em', fontSize: 10, marginLeft: 'auto' }}>Semana 17 · 2026</div>
        </div>
        {/* Spec grid — 5 cols desktop, 2-col wrap mobile */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, max-content)',
          justifyContent: isMobile ? 'start' : 'space-between',
          gap: isMobile ? '28px 16px' : 0,
          padding: isMobile ? '24px 20px 28px' : '36px 48px 40px',
        }}>
          {[
            { label: 'ORIGEN',    value: 'Etiopía',           sub: 'Yirgacheffe · G1'      },
            { label: 'PROCESO',   value: 'Natural',           sub: '48h · cama africana'   },
            { label: 'NOTAS',     value: 'Jazmín · Durazno',  sub: 'Bergamota · miel'      },
            { label: 'TUESTE',    value: 'Medio-claro',       sub: '195 °C · 11 min'       },
            { label: 'MÉTODO',    value: 'V60',               sub: '13g · 210ml · 3 min'   },
          ].map(({ label, value, sub }, i) => (
            <div key={i}>
              <div className="idm-mono" style={{ fontFamily: mono, color: monoColor, letterSpacing: '.22em', fontSize: 10, marginBottom: 10 }}>{label}</div>
              <div style={{ fontFamily: HT.display, fontSize: isMobile ? 20 : 24, fontWeight: 400, color: HT.ink, letterSpacing: '-0.02em', marginBottom: 8 }}>{value}</div>
              <div className="idm-mono" style={{ fontFamily: mono, color: monoColor, letterSpacing: '.10em', fontSize: 10 }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Editorial index title */}
      <div style={{ padding: isMobile ? '48px 20px 0' : '72px 48px 0', display: 'flex', alignItems: 'baseline', gap: 24, borderTop: `1px solid ${HT.rule}` }}>
        <div className="idm-mono" style={{ fontFamily: mono, color: monoColor, letterSpacing: '.28em', fontSize: 10, opacity: 0.45 }}>§</div>
        <div className="idm-mono" style={{ fontFamily: mono, color: monoColor, letterSpacing: '.28em', fontSize: 10 }}>ÍNDICE EDITORIAL</div>
        <div style={{ flex: 1, height: 1, background: HT.rule, opacity: 0.4 }} />
      </div>

      {/* I · Refugio — manifesto pull-quote */}
      <HomeSectionHead num="I" label="Refugio." meta="Qué es Indómito" />
      <HomeSpread
        quiet={'Café, vinilo, pausa. En ese orden.'}
        loud={'Un lugar para lo analógico, lo ritual y lo compartido.'}
        noBreak
        foot="Refugio · ritual · analógico"
        href="Indomito Cafe - Origen.html"
        linkLabel="Conocer nuestro origen"
        right={
        <Ledger title="Desde" rows={[
        { k: 'Fundado', v: '2025 · BA' },
        { k: 'Formato', v: 'café · música · eventos' },
        { k: 'Tono', v: 'analógico · ritual' }]
        } />
        } />
      

      {/* II · Carta */}
      <HomeSectionHead num="II" label="Carta." meta="21 referencias · 6 familias" />
      <HomeSpread
        quiet={'Todo lo que pasa sobre la barra.'}
        loud={'Bebidas, fríos, filtrados, alcohol, pastelería — un mismo pulso.'}
        noBreak
        foot="Bebidas · Fríos · Filtrados · Alcohol · Pastelería"
        href="Indomito Cafe - Carta.html"
        linkLabel="Ver la carta"
        right={
        <Ledger title="Destacados" rows={[
        { k: 'Espresso', v: '$4.300' },
        { k: 'Flat white', v: '$5.200' },
        { k: 'V60', v: '$5.800' },
        { k: 'Cold brew', v: '$5.400' }]
        } />
        } />

      <ChapterBreak />

      {/* III · Sistema Portátil */}
      <HomeSectionHead num="III" label="Sistema Portátil." meta="Servicio para eventos" />
      <HomeSpread
        quiet={'Café que va donde estés.'}
        loud={'Especialidad, pastelería, música curada — Barra itinerante.'}
        noBreak
        foot="reuniones · cenas · lanzamientos"
        href="https://wa.me/5491160463980"
        linkLabel="Escribir por Sistema Portátil"
        right={
        <Ledger title="Incluye" rows={[
        { k: 'Café', v: 'especialidad · en el momento' },
        { k: 'Pastelería', v: 'dulce y salada' },
        { k: 'Música', v: 'curaduría integrada' },
        { k: 'Pedido', v: 'por WhatsApp' }]
        } />
        } />

      <ChapterBreak />

      {/* IV · Club */}
      <HomeSectionHead num="IV" label="Club." meta="Membresía privada" />
      <HomeSpread
        quiet={'Nuestra membresía.'}
        loud={'Café del mes, newsletter, beneficios.'}
        noBreak
        foot="Club Sensorial · $6.000 / mes"
        href="Indomito Cafe - Club.html"
        linkLabel="Conocer el Club"
        right={
        <Ledger title="Incluye" rows={[
        { k: 'Café del Mes',  v: '250 g · numerado' },
        { k: 'Drops',         v: 'ediciones limitadas' },
        { k: 'Carta',         v: '15% de descuento' },
        { k: 'TRAZA',         v: 'newsletter impreso' }]
        } />
        } />

      <ChapterBreak />

      {/* V · Eventos */}
      <HomeSectionHead num="V" label="Laboratorio." meta="Laboratorio Sensorial" />
      <HomeSpread
        quiet={'El café cruzado con música, historia y proceso.'}
        loud={'Un recorrido sensorial inédito de 90 minutos.'}
        noBreak
        foot="6 Estaciones · grupos reducidos · cupos limitados"
        href="Indomito Cafe - Eventos.html"
        linkLabel="Ver el Laboratorio"
        right={
        <Ledger title="Próximos" rows={[
        { k: 'EV.02', v: 'Jamaica · Pressure Bloom' },
        { k: 'EV.03', v: 'Fuelles & Fermento' },
        { k: 'Pasado', v: 'Entreverde · agotado' }]
        } />
        } />

      <ChapterBreak />

      {/* Intermission — quiet pull-quote */}
      <Intermission
        quiet={'Lo analógico tiene su tiempo.'}
        loud={'No apuramos lo que no se debe apurar.'}
        foot="Indómito Café · Buenos Aires" />
      

      {/* VI · Tienda */}
      <HomeSectionHead num="VI" label="Tienda." meta="Próximamente · 2026" />
      <HomeSpread
        quiet={'Objetos que acompañan la pausa.'}
        loud={'Remeras, totebags, piezas únicas. Criterio propio.'}
        noBreak
        foot="Acceso anticipado · lista de espera"
        href="Indomito Cafe - Tienda.html"
        linkLabel="Ver Tienda"
        right={
        <Ledger title="Cápsulas" rows={[
        { k: 'IC1', v: 'Remeras · disponible pronto' },
        { k: 'IC2', v: 'Totebags · disponible' },
        { k: 'IC3', v: 'Gorras · disponible' }]
        } />
        } />
      


      <HomeColophon />
      <IndomitoFooter />
    </div>
    </React.Fragment>);

}

Object.assign(window, {
  HomepagePageV2
});