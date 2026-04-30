import React from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile, INDOMITO_TOKENS, IndomitoNav, IndomitoFooter, PageCover, PageSectionHeader, PageSpread, PageLedger, IdmPhoto, SectionLabel, SectionManifiesto, SectionCafe, SectionTienda, SectionSuscripcion, SectionEventos, SectionPortatil, SectionEquipo, SectionNewsletter, Pillar, FooterCol } from './shared';
import AmbientVisualizer from './ambient-visualizer';
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
  return (
    <PageCover
      eyebrow="Mmxxvi · Café de especialidad"
      title="INDÓMITO"
      dek={{
        content: (
          <>
            <span style={{ color: HT.taupe, fontStyle: 'italic' }}>Lo que se siente, no se discute.</span>
            <br />
            Living de puertas adentro.
            <br />
            Los fines de semana, la barra sale a la vereda.
          </>
        ),
        maxWidth: 760,
      }}
      meta={(
        <>
          Un refugio sensorial<br />Caballito, Buenos Aires
        </>
      )}
    >
      <AmbientVisualizer />
    </PageCover>
  );
}

// ── Section head (matches Origen/Stanza pattern) ───────────
function HomeSectionHead({ num, label, meta }) {
  return <PageSectionHeader num={num} label={meta || ''} title={label} />;
}

// ── Chapter break — back to top ───────────────────────────────────────
function ChapterBreak() { return null; }

// ── Reusable: asymmetric 1.4:1 spread with quiet italic + loud + link ─
function HomeSpread({ quiet, loud, foot, href, linkLabel, right, noBreak }) {
  return (
    <PageSpread
      quiet={quiet}
      loud={loud}
      foot={foot}
      href={href}
      linkLabel={linkLabel}
      right={right}
      noBreak={noBreak}
    />
  );
}

// ── Right-rail ledger (list of k/v rows) ───────────────────
function Ledger({ rows, title }) {
  return <PageLedger rows={rows} title={title} />;
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
      <div style={{ margin: isMobile ? '0 20px' : '0 48px', border: `1px solid ${HT.rule}`, background: HT.bgAlt }}>
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
      <section style={{ padding: isMobile ? '0 20px' : '0 48px' }}>
        <HomeSectionHead num="I" label="Refugio." meta="Qué es Indómito" />
      </section>
      <HomeSpread
        quiet={'Café, vinilo, pausa. En ese orden.'}
        loud={'Un lugar para lo analógico, lo ritual y lo compartido.'}
        noBreak
        foot="Refugio · ritual · analógico"
        href="#/nosotros"
        linkLabel="Conocer nuestro origen"
      />
      

      {/* II · Carta */}
      <section style={{ padding: isMobile ? '0 20px' : '0 48px' }}>
        <HomeSectionHead num="II" label="Carta." meta="21 referencias · 6 familias" />
      </section>
      <HomeSpread
        quiet={'Todo lo que pasa sobre la barra.'}
        loud={'Bebidas, fríos, filtrados, alcohol, pastelería — un mismo pulso.'}
        noBreak
        foot="Bebidas · Fríos · Filtrados · Alcohol · Pastelería"
        href="#/carta"
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
      <section style={{ padding: isMobile ? '0 20px' : '0 48px' }}>
        <HomeSectionHead num="III" label="Sistema Portátil." meta="Servicio para eventos" />
      </section>
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
      <section style={{ padding: isMobile ? '0 20px' : '0 48px' }}>
        <HomeSectionHead num="IV" label="Club." meta="Membresía privada" />
      </section>
      <HomeSpread
        quiet={'Nuestra membresía.'}
        loud={'Café del mes, newsletter, beneficios.'}
        noBreak
        foot="Club Sensorial · $6.000 / mes"
        href="#/club"
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
      <section style={{ padding: isMobile ? '0 20px' : '0 48px' }}>
        <HomeSectionHead num="V" label="Laboratorio." meta="Laboratorio Sensorial" />
      </section>
      <HomeSpread
        quiet={'El café cruzado con música, historia y proceso.'}
        loud={'Un recorrido sensorial inédito de 90 minutos.'}
        noBreak
        foot="6 Estaciones · grupos reducidos · cupos limitados"
        href="#/laboratorio"
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
      <section style={{ padding: isMobile ? '0 20px' : '0 48px' }}>
        <HomeSectionHead num="VI" label="Tienda." meta="Próximamente · 2026" />
      </section>
      <HomeSpread
        quiet={'Objetos que acompañan la pausa.'}
        loud={'Remeras, totebags, piezas únicas. Criterio propio.'}
        noBreak
        foot="Acceso anticipado · lista de espera"
        href="#/tienda"
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

export default HomepagePageV2;
