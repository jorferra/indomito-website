import React from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile, INDOMITO_TOKENS, IndomitoNav, IndomitoFooter, PageCover, PageSectionHeader } from './shared';
// Agenda — eventos

const TT = INDOMITO_TOKENS;
const mono = '"JetBrains Mono", ui-monospace, monospace';
const monoColor = '#8B6F47';

// ── Cover ─────────────────────────────────────────────────────
function AgendaCover() {
  return (
    <PageCover
      eyebrow="Mmxxvi · calendario"
      title="Agenda"
      dek={{
        content: (
          <>
            Lo que pasó
            <br />
            y lo que va a pasar.
          </>
        ),
      }}
      meta="Indómito Café · Buenos Aires"
      imageSrc="assets/fotos%20para%20Club/cenitalbandeja.jpg"
      imageAlt="Agenda · Indómito Café"
    />
  );
}

// ── Section head ──────────────────────────────────────────────
function AgendaSectionHead({ num, label, title }) {
  return <PageSectionHeader num={num} label={label} title={title} />;
}

// ── Evento row ────────────────────────────────────────────────
function AgendaEventRow({ code, title, date, desc, estado }) {
  const isMobile = useIsMobile();
  const isLista = estado === 'lista';
  return (
    <div style={{display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr',
                 gap: isMobile ? 20 : 72,
                 padding: isMobile ? '32px 0' : '48px 0',
                 borderBottom:`1px dotted ${TT.rule}`, alignItems:'start'}}>
      <div>
        <div className="idm-mono" style={{fontFamily:mono, color:monoColor, letterSpacing:'.22em', fontSize:11, marginBottom:16}}>
          {code}
        </div>
        <h3 style={{fontFamily:TT.display, fontSize:'clamp(32px, 4vw, 48px)', fontWeight:400, margin:'0 0 20px',
                    letterSpacing:'-0.035em', lineHeight:1.05}}>
          {title}
        </h3>
        <p style={{fontFamily:TT.display, fontSize:17, lineHeight:1.65, margin:0,
                   color:TT.ink, maxWidth:520, letterSpacing:'-0.015em'}}>
          {desc}
        </p>
      </div>
      <div style={{paddingTop:8, borderTop:`1px solid ${TT.rule}`}}>
        <div className="idm-mono" style={{fontFamily:mono, color:monoColor, letterSpacing:'.14em', marginBottom:20}}>
          {date}
        </div>
        <a href="#/laboratorio" className="idm-hover-underline"
           style={{fontFamily:TT.display, fontSize:20, fontWeight:500,
                   color:TT.ink, textDecoration:'none', letterSpacing:'-0.015em', display:'block', marginBottom:12}}>
          {isLista ? 'Anotarme →' : 'Reservar →'}
        </a>
        <div className="idm-mono" style={{fontFamily:mono, color:monoColor, letterSpacing:'.14em', fontSize:11}}>
          · {isLista ? 'fecha por confirmar' : 'cupos limitados'}
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────
function AgendaPage() {
  const isMobile = useIsMobile();
  return (
    <div className="idm-root" style={{width:'100%', background:TT.bg}}>
      <IndomitoNav/>
      <AgendaCover/>

      {/* I · Próximos */}
      <section style={{padding: isMobile ? '0 20px' : '0 48px'}}>
        <AgendaSectionHead num="I" label="Próximos" title="Nuestro ecosistema vive."/>
        <AgendaEventRow
          code="Ev.02 · Laboratorio Sensorial"
          title="Jamaica: Pressure Bloom"
          date="Mayo · Junio 2026"
          desc="Burru, ska, rocksteady, reggae, dub, dancehall — una historia completa. Café de proceso natural. Noventa minutos de presencia."
          estado="abierto"
        />
        <AgendaEventRow
          code="Ev.03 · Laboratorio Sensorial"
          title="Fuelles & Fermento"
          date="2026 · por confirmar"
          desc="Bandoneón y fermentación. Dos procesos lentos, dos resultados únicos. Próxima sesión en preparación."
          estado="lista"
        />
      </section>

      <IndomitoFooter/>
    </div>
  );
}

export default AgendaPage;
