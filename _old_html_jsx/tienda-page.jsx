// Tienda Sensorial — Chapbook
// Objetos que acompañan la pausa. Ediciones limitadas.
// cover → cápsulas → waitlist

const TT = INDOMITO_TOKENS;
const mono = '"JetBrains Mono", ui-monospace, monospace';
const monoColor = '#8B6F47';

// ── Cover ─────────────────────────────────────────────────────
function TiendaCover() {
  const isMobile = useIsMobile();
  return (
    <header style={{margin: isMobile ? '0 16px' : '0 48px',
                    padding: isMobile ? '48px 0 64px' : '80px 0 120px',
                    borderTop:`1px solid ${TT.ink}`, borderBottom:`1px solid ${TT.ink}`,
                    textAlign:'center'}}>
      <div className="idm-mono" style={{fontFamily:mono, color:monoColor, letterSpacing:'.22em', marginBottom:28, fontSize:15}}>
        Mmxxvi · Objetos
      </div>
      <h1 style={{fontFamily:TT.display, fontSize:'clamp(72px, 14vw, 220px)', fontWeight:300, margin:0,
                  letterSpacing:'-0.05em', lineHeight:.82}}>
        Tienda<br/><em style={{fontStyle:'italic', fontWeight:300}}>Sensorial</em>
      </h1>
      <div style={{maxWidth:620, margin:'56px auto 0', fontFamily:TT.display, fontSize:18, lineHeight:1.65, color:'rgb(26,26,25)'}}>
        Objetos que acompañan la pausa.<br/>Ediciones limitadas.
      </div>
      <div className="idm-mono" style={{fontFamily:mono, color:monoColor, fontWeight:600, fontSize:12, marginTop:36, letterSpacing:'.18em'}}>
        Tienda · Indómito Café · Buenos Aires
      </div>
    </header>
  );
}

// ── Section head ──────────────────────────────────────────────
function TiendaSectionHead({ num, label, title }) {
  const isMobile = useIsMobile();
  return (
    <div style={{display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr',
                 gap: isMobile ? 8 : 72,
                 padding: isMobile ? '56px 0 28px' : '120px 0 48px',
                 borderBottom:`1px solid ${TT.rule}`, marginBottom: isMobile ? 28 : 48,
                 alignItems:'end'}}>
      <h2 style={{fontFamily:TT.display, fontSize:'clamp(48px, 6vw, 88px)', margin:0, fontWeight:400,
                  letterSpacing:'-0.04em', lineHeight:.95}}>
        {title}
      </h2>
      <div style={{paddingBottom:16}}>
        <div className="idm-mono" style={{fontFamily:mono, color:monoColor, letterSpacing:'.22em', marginBottom:10}}>
          {num} · {label}
        </div>
      </div>
    </div>
  );
}

// ── Capsule — hemisferio izq: emocional · hemisferio der: técnico ────
function Capsule({ idx, title, lede, caption, note, photo, edition, model, cta }) {
  const isMobile = useIsMobile();
  return (
    <div style={{display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr',
                 gap: isMobile ? 28 : 72,
                 padding: isMobile ? '32px 0 40px' : '48px 0 56px',
                 borderBottom:`1px dotted ${TT.rule}`,
                 alignItems:'start'}}>
      <div>
        <div style={{display:'flex', alignItems:'baseline', gap:16, marginBottom:24}}>
          <span className="idm-mono" style={{fontFamily:mono, color:TT.inkMuted}}>
            {String(idx).padStart(2,'0')}
          </span>
          <h3 style={{fontFamily:TT.display, fontSize:40, margin:0, fontWeight:500,
                      letterSpacing:'-0.028em', lineHeight:1}}>
            {title}
          </h3>
        </div>
        {lede && (
          <p style={{fontFamily:TT.display, fontSize:20, lineHeight:1.55, margin:'0 0 32px',
                     color:TT.ink, maxWidth:480, letterSpacing:'-0.018em'}}>
            {lede}
          </p>
        )}

        {photo ? (
          <div style={{aspectRatio:'4/5', maxWidth:420, position:'relative'}}>
            <div style={{width:'100%', height:'100%', overflow:'hidden', border:`1px solid ${TT.rule}`}}>
              <img
                src={photo}
                alt={title}
                style={{width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 30%', display:'block'}}
              />
            </div>
            {[0,1,2,3].map(i => (
              <span key={i} style={{
                position:'absolute',
                [i<2?'top':'bottom']: -1,
                [i%2===0?'left':'right']: -1,
                width:16, height:16,
                borderTop:    i<2  ? `1px solid ${TT.ink}` : 'none',
                borderBottom: i>=2 ? `1px solid ${TT.ink}` : 'none',
                borderLeft:   i%2===0 ? `1px solid ${TT.ink}` : 'none',
                borderRight:  i%2===1 ? `1px solid ${TT.ink}` : 'none',
              }}/>
            ))}
          </div>
        ) : (
          <div style={{
            aspectRatio:'4/5', maxWidth:420, background:TT.bgAlt,
            border:`1px solid ${TT.rule}`,
            display:'flex', alignItems:'center', justifyContent:'center',
            position:'relative',
          }}>
            <div style={{textAlign:'center'}}>
              <div className="idm-mono" style={{fontFamily:mono, color:monoColor, letterSpacing:'.22em', marginBottom:8}}>
                No. {String(idx).padStart(3,'0')}
              </div>
              <div style={{fontFamily:TT.display, fontSize:14, fontStyle:'italic', color:TT.inkMuted}}>
                en preparación
              </div>
            </div>
            {[0,1,2,3].map(i => (
              <span key={i} style={{
                position:'absolute',
                [i<2?'top':'bottom']: -1,
                [i%2===0?'left':'right']: -1,
                width:16, height:16,
                borderTop: i<2 ? `1px solid ${TT.ink}` : 'none',
                borderBottom: i>=2 ? `1px solid ${TT.ink}` : 'none',
                borderLeft: i%2===0 ? `1px solid ${TT.ink}` : 'none',
                borderRight: i%2===1 ? `1px solid ${TT.ink}` : 'none',
              }}/>
            ))}
          </div>
        )}
      </div>

      <div style={{paddingTop:12, borderTop:`1px solid ${TT.rule}`, maxWidth:320}}>
        {caption && (
          <p style={{fontFamily:TT.display, fontSize:14, lineHeight:1.65,
                     color:TT.inkSoft, margin:'0 0 20px',
                     paddingBottom:20, borderBottom:`1px dotted ${TT.rule}`,
                     letterSpacing:'-0.01em'}}>
            {caption}
          </p>
        )}
        {edition && (
          <div style={{marginBottom:22}}>
            <div className="idm-mono" style={{fontFamily:mono, color:monoColor, letterSpacing:'.14em', marginBottom:6}}>Edición</div>
            <div style={{fontFamily:TT.display, fontSize:18, letterSpacing:'-0.018em'}}>
              {edition}
            </div>
          </div>
        )}
        <div style={{marginBottom:22}}>
          <div className="idm-mono" style={{fontFamily:mono, color:monoColor, letterSpacing:'.14em', marginBottom:6}}>Estado</div>
          <div style={{fontFamily:TT.display, fontSize:18, letterSpacing:'-0.018em'}}>
            {note}
          </div>
        </div>
        {model && (
          <div style={{marginBottom: cta ? 36 : 0}}>
            <div className="idm-mono" style={{fontFamily:mono, color:monoColor, letterSpacing:'.14em', marginBottom:6}}>Modelo</div>
            <div style={{fontFamily:TT.display, fontSize:18, letterSpacing:'-0.018em'}}>
              {model}
            </div>
          </div>
        )}
        {cta && (
          <div style={{borderTop:`1px solid ${TT.rule}`, paddingTop:24}}>
            <a href="https://wa.me/5491160463980" className="idm-hover-underline"
               style={{fontFamily:TT.display, fontSize:20, fontWeight:500,
                       color:TT.ink, textDecoration:'none', letterSpacing:'-0.015em'}}>
              {cta} →
            </a>
            <div className="idm-mono" style={{fontFamily:mono, color:monoColor,
                                               letterSpacing:'.14em', fontSize:10, marginTop:10, opacity:.75}}>
              · vía WhatsApp · cupos limitados
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Waitlist ──────────────────────────────────────────────────
function Waitlist() {
  const isMobile = useIsMobile();
  return (
    <section style={{padding: isMobile ? '0 20px 72px' : '0 48px 140px'}}>
      <div style={{display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr',
                   gap: isMobile ? 32 : 72, alignItems:'start'}}>
        <div>
          <p style={{fontFamily:TT.display, fontSize:17, lineHeight:1.65, margin:'0 0 40px', maxWidth:560, color:TT.ink}}>
            Escribinos y te avisamos cuando la próxima pieza esté lista.
            Un aviso, sin ruido.
          </p>
          <a href="https://wa.me/5491160463980" className="idm-hover-underline"
             style={{fontFamily:TT.display, fontSize:22, fontWeight:500,
                     color:TT.ink, textDecoration:'none', letterSpacing:'-0.018em'}}>
            Escribir por WhatsApp →
          </a>
          <div className="idm-mono" style={{fontFamily:mono, color:monoColor, letterSpacing:'.14em', marginTop:14, fontSize:11}}>
            Lista silenciosa · un aviso único por apertura
          </div>
        </div>

        <div style={{paddingTop:12, borderTop:`1px solid ${TT.rule}`}}>
          <div className="idm-mono" style={{fontFamily:mono, color:monoColor, letterSpacing:'.14em', marginBottom:16}}>
            Canales
          </div>
          <div className="idm-mono" style={{fontFamily:mono, color:TT.inkMuted, letterSpacing:'.14em', lineHeight:1.9}}>
            WhatsApp · +54 9 11 60 46 39 80<br/>
            Instagram · @indomito_cafe
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────
function TiendaPage() {
  const isMobile = useIsMobile();
  return (
    <div className="idm-root" style={{width:'100%', background:TT.bg}}>
      <IndomitoNav/>
      <TiendaCover/>

      {/* I — Cápsulas */}
      <section style={{padding: isMobile ? '0 20px' : '0 48px'}}>
        <TiendaSectionHead num="I" label="Qué estamos preparando" title="Símbolos de pertenencia."/>
        <Capsule
          idx={1}
          title="IC1"
          caption="Remera algodón pesado, peinado. DTF. Cuello redondo, caída clásica."
          note="primer lote · disponible pronto"
          model="logo vinilo indómito black"
          photo="assets/fotos%20para%20Tienda/Free_T-Shirt_Mockup_logosmall1.jpg"
          cta="Reservar primer lote"
        />

        <Capsule
          idx={2}
          title="IC2"
          caption="Totebag lona cruda, costura reforzada. Asa larga para el hombro."
          note="disponible"
          model="logo vinilo indómito"
          photo="assets/fotos%20para%20Tienda/ttb3.png"
          cta="Comprar"
        />

        <Capsule
          idx={3}
          title="IC3"
          caption="Trucker negra, frente rígido. Bordado en crema, un solo color."
          note="disponible"
          model="logo vinilo indómito"
          photo="assets/fotos%20para%20Tienda/gorralogo1.png"
          cta="Comprar"
        />

      </section>

      <Waitlist/>
      <IndomitoFooter/>
    </div>
  );
}

Object.assign(window, { TiendaPage, TiendaCover, TiendaSectionHead, Capsule, Waitlist });
