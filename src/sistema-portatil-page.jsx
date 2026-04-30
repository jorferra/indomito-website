import React from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile, INDOMITO_TOKENS, IndomitoNav, IndomitoFooter, PageCover, PageSectionHeader, PageSpread, PageLedger } from './shared';
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
    <section style={{ padding: isMobile ? '0 20px' : '0 48px' }}>
      <PageSectionHeader num={num} label={meta || label} title={label} />
    </section>
  );
}

// ── Ledger (mismo que Homepage) ────────────────────────────
function SPLedger({ rows, title }) {
  return <PageLedger rows={rows} title={title} />;
}

// ── Spread asimétrico (mismo que Homepage) ─────────────────
function SPSpread({ quiet, loud, foot, href, linkLabel, right, noBreak }) {
  return <PageSpread quiet={quiet} loud={loud} foot={foot} href={href} linkLabel={linkLabel} right={right} noBreak={noBreak} />;
}

// ── Colofón / CTA final ────────────────────────────────────
function SPColophon() {
  const isMobile = useIsMobile();
  return (
    <section style={{ padding: isMobile ? '64px 20px 72px' : '140px 48px 120px' }}>
      <div style={{ borderTop: `1px solid ${SP.ink}`, paddingTop: isMobile ? 40 : 56, maxWidth: 680 }}>
        <p style={{
          fontFamily: SP.display, fontSize: isMobile ? 'clamp(32px, 4vw, 52px)' : 40, fontWeight: 400,
          letterSpacing: '-0.025em', lineHeight: 1.2, margin: '0 0 32px', maxWidth: 680,
        }}>
          <span style={{ color: SP.taupe, fontStyle: 'italic' }}>Contanos qué estás armando.</span><br />
          Respondemos nosotros, con tiempo.
        </p>
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
      <PageCover
        eyebrow="Mmxxvi · Servicio itinerante"
        title={<><span>Sistema</span><br /><em style={{fontStyle:'italic', fontWeight:300}}>Portátil</em></>}
        dek={{
          content: (
            <>
              El café va donde vos estés.
              <br />
              Especialidad, pastelería y música curada.
              <br />
              En un solo servicio.
            </>
          ),
          maxWidth: 560,
          opacity: 0.92,
        }}
        meta="Reuniones · Eventos"
        imageSrc="assets/fotos%20para%20Servicio/event2.jpg"
        imageAlt="Sistema Portátil · Indómito Café"
      />

      {/* I · Qué es */}
      <SPSectionHead num="I" label="La propuesta." meta="Qué es el Sistema" />
      <SPSpread
        quiet="Café de especialidad, donde sea."
        loud="Lo molemos, preparamos y servimos en el momento."
        foot="respuesta en 24 h · logística simple"
        noBreak
        right={
          <SPLedger title="El sistema incluye" rows={[
            { k: 'Café',       v: 'especialidad · blend del día' },
            { k: 'Método',     v: 'espresso' },
          { k: 'Pastelería', v: 'artesanal · dulce y salada' },
          { k: 'Música',     v: 'curaduría integrada' },
          { k: 'Sonido',     v: 'Edifier · 70W RMS' },
        ]} />
        }
      />

      {/* II · Para qué ocasiones */}
      <SPSectionHead num="II" label="Ocasiones." meta="Dónde encaja" />
      <SPSpread
        quiet="Para encuentros que merecen cuidado."
        loud="Reuniones, eventos privados, celebraciones."
        noBreak
        foot="La música viene incluida. El criterio, también."
      />

      {/* III · Cómo funciona */}
      <SPSectionHead num="III" label="Cómo funciona." meta="El proceso" />
      <SPSpread
        quiet="Nos escribís con fecha y formato."
        loud="Te respondemos, cerramos y vamos."
        noBreak
        foot="respuesta en 24 h · sin vueltas"
        href="https://wa.me/5491160463980"
        linkLabel="Pedir disponibilidad"
      />

      <IndomitoFooter />
    </div>
  );
}

export default SistemaPortatilPage;
