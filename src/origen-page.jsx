import React from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile, INDOMITO_TOKENS, IndomitoMark, IndomitoNav, IndomitoFooter, IdmPhoto, SectionLabel, SectionManifiesto, SectionCafe, SectionTienda, SectionSuscripcion, SectionEventos, SectionPortatil, SectionEquipo, SectionNewsletter, Pillar, FooterCol } from './shared';
// Nosotros — cover → manifiesto → cta
// Sin ruido.

const TT = INDOMITO_TOKENS;
const mono = '"JetBrains Mono", ui-monospace, monospace';
const monoColor = '#8B6F47';

// ── Cover ─────────────────────────────────────────────────────
function OrigenCover() {
  const isMobile = useIsMobile();
  return (
    <header style={{margin: isMobile ? '0 16px' : '0 48px',
                    padding: isMobile ? '48px 0 64px' : '80px 0 120px',
                    borderTop:`1px solid ${TT.ink}`, borderBottom:`1px solid ${TT.ink}`,
                    textAlign:'center'}}>
      <div className="idm-mono" style={{fontFamily:mono, color:monoColor, letterSpacing:'.22em', marginBottom:24, fontSize: isMobile ? 11 : 15}}>
        Mmxxvi · ORIGEN
      </div>
      <h1 style={{fontFamily:TT.display, fontSize:'clamp(64px, 14vw, 220px)', fontWeight:300, margin:0,
                  letterSpacing:'-0.05em', lineHeight:.82}}>
        Nosotros
      </h1>
      <div style={{maxWidth:560, margin: isMobile ? '32px auto 0' : '56px auto 0',
                   fontFamily:TT.display, fontSize: isMobile ? 16 : 18, lineHeight:1.65, color:'rgb(26,26,25)'}}>
        Indómito nació en un living.
      </div>
      <div className="idm-mono" style={{fontFamily:mono, color:monoColor, fontWeight:600, fontSize:11, marginTop: isMobile ? 24 : 36, letterSpacing:'.18em'}}>
        Café · vinilo · Buenos Aires
      </div>
      <div style={{position:'relative', width:'100%', height: isMobile ? 240 : 560,
                   marginTop: isMobile ? 32 : 56, marginBottom: isMobile ? -48 : -80, overflow:'hidden'}}>
        <img src="assets/fotos%20para%20Nosotros/mano2.jpg"
             style={{position:'absolute', inset:0, width:'100%', height:'100%',
                     objectFit:'cover', objectPosition:'center 40%'}}/>
      </div>
    </header>
  );
}

// ── Manifiesto ────────────────────────────────────────────────
function OrigenManifiesto() {
  const isMobile = useIsMobile();
  return (
    <section style={{padding: isMobile ? '64px 20px 80px' : '120px 48px 140px'}}>
      <div style={{maxWidth:800}}>

        <p style={{fontFamily:TT.display, fontSize:'clamp(20px, 2.4vw, 26px)',
                   lineHeight:1.72, letterSpacing:'-0.02em', margin:'0 0 40px', color:TT.ink}}>
          <span style={{color:TT.taupe, fontStyle:'italic'}}>Empezó un sábado a la tarde, con vinilos y el café equivocado.</span>{' '}
          Esa primera taza mala fue la pregunta: ¿cuánto mejor puede ser esto?
          Desde entonces aprendimos. Origen, variedad, proceso, altitud.
          Cada lote que servimos tiene trazabilidad y una decisión detrás.
        </p>

        <p style={{fontFamily:TT.display, fontSize:'clamp(20px, 2.4vw, 26px)',
                   lineHeight:1.72, letterSpacing:'-0.02em', margin:'0 0 40px', color:TT.ink}}>
          Pero el café siempre fue el pretexto.
          Lo que queríamos era el tiempo alrededor de la taza.
          Las charlas que se extienden. Los vinilos que siguen.
          La pausa que no pide permiso.
        </p>

        <p style={{fontFamily:TT.display, fontSize:'clamp(20px, 2.4vw, 26px)',
                   lineHeight:1.72, letterSpacing:'-0.02em', margin:0, color:TT.ink}}>
          Indómito es un lugar que se habita.
          Esta comunidad crece de a poco, sin ruido. Y así tiene que ser.
          Ideas, encuentros, playlists compartidas, pequeños hallazgos, ediciones limitadas —
          cada cosa que hacemos tiene intención y pertenencia emocional.
        </p>

      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────
function OrigenCTA() {
  const isMobile = useIsMobile();
  return (
    <section style={{padding: isMobile ? '0 20px 80px' : '0 48px 140px'}}>
      <div style={{borderTop:`1px solid ${TT.ink}`, paddingTop: isMobile ? 40 : 56,
                   display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr',
                   gap: isMobile ? 40 : 72}}>
        <div>
          <p style={{fontFamily:TT.display, fontSize:'clamp(32px, 4vw, 52px)', fontWeight:400,
                     letterSpacing:'-0.035em', lineHeight:1.1, margin:'0 0 40px'}}>
            <span style={{color:TT.taupe, fontStyle:'italic'}}>Escribinos.</span><br/>
            Respondemos nosotros, con tiempo.
          </p>
          <a href="https://wa.me/5491160463980" className="idm-hover-underline"
             style={{fontFamily:TT.display, fontSize:22, fontWeight:500,
                     color:TT.ink, textDecoration:'none', letterSpacing:'-0.018em'}}>
            Escribir por WhatsApp →
          </a>
        </div>
        <div style={{paddingTop:8}}>
          {[
            { k:'Barrio',    v:'Caballito · Buenos Aires' },
            { k:'Formato',   v:'Café · vinilo · ciclos' },
            { k:'WhatsApp',  v:'+54 9 11 60 46 39 80' },
            { k:'Instagram', v:'@indomito_cafe' },
          ].map((r,i) => (
            <div key={i} style={{display:'grid', gridTemplateColumns:'1fr auto', gap:20,
                                  padding:'16px 0', borderBottom:`1px dotted ${TT.rule}`, alignItems:'baseline'}}>
              <div className="idm-mono" style={{fontFamily:mono, color:monoColor, letterSpacing:'.14em'}}>{r.k}</div>
              <div style={{fontFamily:TT.display, fontSize:17, letterSpacing:'-0.018em'}}>{r.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────
function OrigenPage() {
  return (
    <div className="idm-root" style={{width:'100%', background:TT.bg}}>
      <IndomitoNav/>
      <OrigenCover/>
      <OrigenManifiesto/>
      <OrigenCTA/>
      <IndomitoFooter/>
    </div>
  );
}

export default OrigenPage;
