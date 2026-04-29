import React from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile, INDOMITO_TOKENS, IndomitoMark, IndomitoNav, IndomitoFooter, IdmPhoto, SectionLabel, SectionManifiesto, SectionCafe, SectionTienda, SectionSuscripcion, SectionEventos, SectionPortatil, SectionEquipo, SectionNewsletter, Pillar, FooterCol } from './shared';
// Sistema Portátil — página dedicada
// Mismo sistema visual que Homepage y Carta:
// hero cover → foto → secciones asimétricas → colofón → footer

const SP = INDOMITO_TOKENS;
const mono = '"JetBrains Mono", ui-monospace, monospace';
const monoColor = '#8B6F47';

// ── Reutilizamos el mismo patrón de header de sección ──────
function SPSectionHead({ num, label, meta }) {
  const isMobile = useIsMobile();
  return (
    <div style={{ padding: isMobile ? '0 20px' : '0 48px' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr',
        gap: isMobile ? 8 : 72,
        padding: isMobile ? '56px 0 24px' : '120px 0 32px',
        borderBottom: `1px solid ${SP.rule}`, marginBottom: isMobile ? 28 : 56, alignItems: 'end',
      }}>
        <h2 style={{
          fontFamily: SP.display, fontSize: 'clamp(48px, 6vw, 88px)',
          margin: 0, fontWeight: 400, letterSpacing: '-0.04em', lineHeight: .95,
        }}>
          {label}
        </h2>
        <div style={{ paddingBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div className="idm-mono" style={{ fontFamily: mono, color: monoColor, letterSpacing: '.22em' }}>
            {num}
          </div>
          {meta && (
            <div className="idm-mono" style={{ fontFamily: mono, color: monoColor, letterSpacing: '.14em', fontSize: 10 }}>
              {meta}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Ledger (mismo que Homepage) ────────────────────────────
function SPLedger({ rows, title }) {
  return (
    <div style={{ paddingTop: 8 }}>
      {title && (
        <div className="idm-mono" style={{ fontFamily: mono, color: monoColor, letterSpacing: '.2em', fontSize: 11, fontWeight: 600, marginBottom: 14 }}>
          {title}
        </div>
      )}
      {rows.map((r, i) => (
        <div key={i} style={{
          display: 'grid', gridTemplateColumns: '1fr auto', gap: 20,
          padding: '14px 0', borderBottom: `1px dotted ${SP.rule}`, alignItems: 'baseline',
        }}>
          <div className="idm-mono" style={{ fontFamily: mono, color: monoColor, letterSpacing: '.14em' }}>{r.k}</div>
          <div style={{ fontFamily: SP.display, fontSize: 17, letterSpacing: '-0.018em', textAlign: 'right' }}>{r.v}</div>
        </div>
      ))}
    </div>
  );
}

// ── Spread asimétrico (mismo que Homepage) ─────────────────
function SPSpread({ quiet, loud, foot, href, linkLabel, right, noBreak }) {
  const isMobile = useIsMobile();
  return (
    <section style={{ padding: isMobile ? '0 20px' : '0 48px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr',
                    gap: isMobile ? 32 : 72, paddingBottom: isMobile ? 56 : 80 }}>
        <div>
          <p style={{
            fontFamily: SP.display, fontSize: 44, fontWeight: 400,
            letterSpacing: '-0.025em', lineHeight: 1.22, margin: '0 0 32px',
            maxWidth: 680, whiteSpace: 'pre-line',
          }}>
            <span style={{ color: SP.taupe, fontStyle: 'italic' }}>{quiet}</span>
            {loud ? (noBreak ? ' ' : '\n') : ''}{loud}
          </p>
          {foot && (
            <div className="idm-mono" style={{ fontFamily: mono, color: monoColor, letterSpacing: '.14em', marginBottom: 28 }}>
              {foot}
            </div>
          )}
          {href && (
            <a href={href} className="idm-hover-underline" style={{
              fontFamily: SP.display, fontSize: 22, fontWeight: 500,
              color: SP.ink, textDecoration: 'none', letterSpacing: '-0.018em',
            }}>
              {linkLabel} →
            </a>
          )}
        </div>
        {right}
      </div>
    </section>
  );
}

// ── Colofón / CTA final ────────────────────────────────────
function SPColophon() {
  const isMobile = useIsMobile();
  return (
    <section style={{ padding: isMobile ? '64px 20px 72px' : '140px 48px 120px' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr',
        gap: isMobile ? 40 : 72,
        borderTop: `1px solid ${SP.ink}`, paddingTop: isMobile ? 40 : 56,
      }}>
        <div>
          <div className="idm-mono" style={{ fontFamily: mono, color: monoColor, letterSpacing: '.22em', marginBottom: 20 }}>
            Reservas
          </div>
          <p style={{
            fontFamily: SP.display, fontSize: 40, fontWeight: 400,
            letterSpacing: '-0.025em', lineHeight: 1.2, margin: '0 0 32px', maxWidth: 680,
          }}>
            <span style={{ color: SP.taupe, fontStyle: 'italic' }}>Contanos qué estás armando.</span><br />
            Respondemos nosotros, con tiempo.
          </p>
          <a
            href="https://wa.me/5491160463980"
            className="idm-hover-underline"
            style={{
              fontFamily: SP.display, fontSize: 22, fontWeight: 500,
              color: SP.ink, textDecoration: 'none', letterSpacing: '-0.018em',
            }}
          >
            Escribir por WhatsApp →
          </a>
        </div>
        <SPLedger rows={[
          { k: 'Formato',   v: 'barra itinerante' },
          { k: 'Café',      v: 'especialidad · en el momento' },
          { k: 'Música',    v: 'curaduría integrada' },
          { k: 'Pedido',    v: 'por WhatsApp' },
          { k: 'Contacto',  v: '+54 9 11 6046 3980' },
        ]} />
      </div>
    </section>
  );
}

// ── Página ─────────────────────────────────────────────────
function SistemaPortatilPage() {
  const isMobile = useIsMobile();
  return (
    <div className="idm-root" style={{ width: '100%', background: SP.bg }}>
      <IndomitoNav />

      {/* Hero cover */}
      <header style={{
        margin: isMobile ? '0 16px' : '0 48px',
        padding: isMobile ? '48px 0 64px' : '80px 0 120px',
        borderTop: `1px solid ${SP.ink}`, borderBottom: `1px solid ${SP.ink}`,
        textAlign: 'center',
      }}>
        <div className="idm-mono" style={{ fontFamily: mono, color: monoColor, letterSpacing: '.22em', marginBottom: isMobile ? 20 : 28, fontSize: isMobile ? 11 : 15 }}>
          Mmxxvi · Servicio itinerante
        </div>
        <h1 style={{
          fontFamily: SP.display, fontSize: 'clamp(56px, 13vw, 220px)',
          fontWeight: 300, margin: 0, letterSpacing: '-0.05em', lineHeight: .82,
        }}>
          Sistema<br /><em style={{fontStyle:'italic', fontWeight:300}}>Portátil</em>
        </h1>
        <div style={{
          maxWidth: 560, margin: isMobile ? '32px auto 0' : '56px auto 0',
          fontFamily: SP.display, fontSize: isMobile ? 16 : 18, lineHeight: 1.65, color: 'rgb(26,26,25)',
        }}>
          El café va donde vos estés.<br />
          Especialidad, pastelería y música curada — en un solo servicio.
        </div>
        <div className="idm-mono" style={{ fontFamily: mono, color: monoColor, fontWeight: 600, fontSize: 11, marginTop: isMobile ? 24 : 36, letterSpacing: '.18em' }}>
          Reuniones · Cenas · Lanzamientos · Buenos Aires
        </div>
        <div style={{ position: 'relative', width: '100%', height: isMobile ? 240 : 560, marginTop: isMobile ? 32 : 40, marginBottom: isMobile ? -48 : -80, overflow: 'hidden' }}>
          <img src="assets/fotos%20para%20Servicio/event2.jpg" alt="Sistema Portátil · Indómito Café"
            style={{position: 'absolute', inset: 0, width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'center center', display: 'block'}}/>
        </div>
      </header>

      {/* I · Qué es */}
      <SPSectionHead num="I" label="La propuesta." meta="Qué es el Sistema" />
      <SPSpread
        quiet="Café de especialidad, donde sea."
        loud="Una barra completa que llega armada, prepara en el momento y se va sin dejar rastro."
        foot="sin logística · sin excusas · sin compromiso de calidad"
        right={
          <SPLedger title="El sistema incluye" rows={[
            { k: 'Café',       v: 'especialidad · tostado propio' },
            { k: 'Método',     v: 'espresso · filtrado · batch' },
            { k: 'Pastelería', v: 'dulce y salada · del día' },
            { k: 'Música',     v: 'curaduría integrada' },
            { k: 'Parlante',   v: 'Edifier · 70W RMS · Bluetooth' },
            { k: 'Barista',    v: 'incluido' },
          ]} />
        }
      />

      {/* II · Para qué ocasiones */}
      <SPSectionHead num="II" label="Ocasiones." meta="Dónde encaja" />
      <SPSpread
        quiet="Para encuentros que merecen cuidado."
        loud="Reuniones íntimas, equipos, cenas, eventos — café, pastelería y música curada."
        foot="La música viene incluida. El criterio, también."
        right={
          <SPLedger title="Lo pedís para" rows={[
            { k: 'Reuniones',   v: 'de equipo · de directorio' },
            { k: 'Eventos',     v: 'lanzamientos · presentaciones' },
            { k: 'Sociales',    v: 'cenas · cumpleaños · casamientos' },
            { k: 'Comerciales', v: 'pop-ups · ferias · showrooms' },
          ]} />
        }
      />

      {/* III · Cómo funciona */}
      <SPSectionHead num="III" label="Cómo funciona." meta="El proceso" />
      <SPSpread
        quiet="Escribís, acordamos, aparecemos."
        loud="El resto lo resolvemos nosotros."
        foot="consulta gratuita · presupuesto en 24 h"
        href="https://wa.me/5491160463980"
        linkLabel="Consultar disponibilidad"
        right={
          <SPLedger title="El proceso" rows={[
            { k: '01', v: 'contanos el evento' },
            { k: '02', v: 'presupuesto en 24 h' },
            { k: '03', v: 'confirmamos fecha' },
            { k: '04', v: 'llegamos listos' },
          ]} />
        }
      />

      <SPColophon />
      <IndomitoFooter />
    </div>
  );
}

export default SistemaPortatilPage;
