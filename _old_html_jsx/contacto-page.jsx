// Contacto — directo, sin ruido.

const TT = INDOMITO_TOKENS;
const mono = '"JetBrains Mono", ui-monospace, monospace';
const monoColor = '#8B6F47';

// ── Page ──────────────────────────────────────────────────────
function ContactoPage() {
  const isMobile = useIsMobile();
  return (
    <div className="idm-root" style={{width:'100%', background:TT.bg}}>
      <IndomitoNav/>

      {/* Hero */}
      <section style={{margin: isMobile ? '0 16px' : '0 48px',
                       padding: isMobile ? '48px 0 64px' : '80px 0 96px',
                       borderTop:`1px solid ${TT.ink}`, borderBottom:`1px solid ${TT.ink}`}}>
        <div className="idm-mono" style={{fontFamily:mono, color:monoColor,
                                          letterSpacing:'.22em', marginBottom: isMobile ? 20 : 32,
                                          fontSize: isMobile ? 11 : 15}}>
          Mmxxvi · CONTACTO
        </div>
        <h1 style={{fontFamily:TT.display, fontSize:'clamp(64px, 14vw, 220px)',
                    fontWeight:300, margin:0, letterSpacing:'-0.05em', lineHeight:.82}}>
          <span style={{fontStyle:'italic'}}>Escribinos.</span>
        </h1>
        <div style={{maxWidth:560, marginTop: isMobile ? 32 : 56, fontFamily:TT.display,
                     fontSize: isMobile ? 16 : 18, lineHeight:1.65, color:'rgb(26,26,25)'}}>
          Respondemos nosotros, con tiempo.<br/>
          Sin bots, sin formularios.
        </div>
      </section>

      {/* Bloque principal */}
      <section style={{padding: isMobile ? '48px 20px 80px' : '80px 48px 140px'}}>
        <div style={{display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr',
                     gap: isMobile ? 40 : 72, alignItems:'start'}}>

          {/* Izquierda — CTA */}
          <div>
            <a href="https://wa.me/5491160463980" className="idm-hover-underline"
               style={{fontFamily:TT.display, fontSize:'clamp(28px, 3.5vw, 44px)', fontWeight:400,
                       color:TT.ink, textDecoration:'none', letterSpacing:'-0.03em', lineHeight:1.1,
                       display:'block', marginBottom:24}}>
              Escribir por WhatsApp →
            </a>
            <div className="idm-mono" style={{fontFamily:mono, color:monoColor,
                                              letterSpacing:'.14em', fontSize:11, opacity:.8}}>
              +54 9 11 60 46 39 80
            </div>
          </div>

          {/* Derecha — Ledger */}
          <div style={{borderTop:`1px solid ${TT.ink}`, paddingTop:24}}>
            {[
              { k:'Barrio',     v:'Caballito · Buenos Aires' },
              { k:'Horario',    v:'Mar–Dom · 09–19h' },
              { k:'WhatsApp',   v:'+54 9 11 60 46 39 80' },
              { k:'Instagram',  v:'@indomito_cafe' },
              { k:'Formato',    v:'Café · vinilo · ciclos' },
            ].map((r,i) => (
              <div key={i} style={{display:'grid', gridTemplateColumns:'1fr auto', gap:20,
                                    padding:'16px 0', borderBottom:`1px dotted ${TT.rule}`,
                                    alignItems:'baseline'}}>
                <div className="idm-mono" style={{fontFamily:mono, color:monoColor, letterSpacing:'.14em'}}>
                  {r.k}
                </div>
                <div style={{fontFamily:TT.display, fontSize:17, letterSpacing:'-0.018em'}}>
                  {r.v}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <IndomitoFooter/>
    </div>
  );
}

Object.assign(window, { ContactoPage });
