// V3 — based on the ACTUAL Indómito site (indomitocafe.com). All copy verbatim.
// Only two on-page sections exist on the real site: Hero + Próximo Evento.
// Layout keeps that discipline and adds only the footer. No invented text.

function IndomitoV3() {
  const navItems = ['Inicio','Carta','Club','Eventos','Tienda','Origen'];
  return (
    <div className="idm-root" style={{width:1440, minHeight:2400, background:INDOMITO_TOKENS.bg}}>
      {/* Real nav: pipe-separated single row */}
      <div style={{padding:'28px 48px 0', display:'flex', justifyContent:'center'}}>
        <nav className="idm-mono" style={{fontSize:13, letterSpacing:'.14em', textTransform:'uppercase', color:INDOMITO_TOKENS.ink, display:'flex', gap:14}}>
          {navItems.map((n,i)=>(
            <React.Fragment key={n}>
              <a href="#" className="idm-hover-underline" style={{color:'inherit'}}>{n}</a>
              {i<navItems.length-1 && <span style={{opacity:.5}}>|</span>}
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Hero — centered, real wordmark + tagline */}
      <section style={{padding:'160px 48px 80px', textAlign:'center'}}>
        <h1 className="idm-display" style={{fontSize:148, margin:0, letterSpacing:'-0.04em', lineHeight:1}}>
          INDÓMITO
        </h1>
        <h2 className="idm-display" style={{fontSize:40, margin:'28px 0 0', letterSpacing:'.02em', fontWeight:400, color:INDOMITO_TOKENS.ink}}>
          CAFÉ DE ESPECIALIDAD BUENOS AIRES
        </h2>

        <div style={{maxWidth:720, margin:'72px auto 0', textAlign:'center', display:'grid', gap:22}}>
          <p style={{fontSize:20, lineHeight:1.5, margin:0}}>Un café no se toma. Se habita. Cada taza es un ritual.</p>
          <p style={{fontSize:20, lineHeight:1.5, margin:0}}>Desde Buenos Aires, lo celebramos como experiencia viva:</p>
          <p style={{fontSize:20, lineHeight:1.5, margin:0, fontStyle:'italic', color:INDOMITO_TOKENS.taupe}}>aroma, pausa, textura y sonido.</p>
          <p style={{fontSize:20, lineHeight:1.5, margin:'20px 0 0'}}>De esa sensibilidad nace el Club Sensorial:</p>
          <p style={{fontSize:20, lineHeight:1.5, margin:0, maxWidth:620, marginLeft:'auto', marginRight:'auto'}}>
            un espacio íntimo para quienes sienten el café como lenguaje.
          </p>
        </div>
      </section>

      {/* Próximo Evento — full block, verbatim */}
      <section style={{padding:'120px 48px 160px', textAlign:'center', borderTop:`1px solid ${INDOMITO_TOKENS.rule}`}}>
        <h2 className="idm-display" style={{fontSize:32, margin:'0 0 72px', letterSpacing:'.22em', textTransform:'uppercase', fontWeight:400}}>
          Próximo Evento
        </h2>

        <div style={{maxWidth:880, margin:'0 auto', display:'grid', gap:22}}>
          <p className="idm-display" style={{fontSize:64, margin:0, letterSpacing:'-0.028em', lineHeight:1.05}}>
            Jamaica: Pressure Bloom
          </p>

          <div className="idm-mono" style={{fontSize:13, letterSpacing:'.22em', textTransform:'uppercase', color:INDOMITO_TOKENS.inkSoft, margin:'28px 0 0'}}>
            Laboratorio Sensorial · Edición 02
          </div>
          <div className="idm-mono" style={{fontSize:13, letterSpacing:'.22em', textTransform:'uppercase', color:INDOMITO_TOKENS.inkSoft}}>
            2026 · Buenos Aires
          </div>

          <div style={{margin:'40px 0 0', display:'grid', gap:10, fontSize:19, lineHeight:1.5}}>
            <p style={{margin:0}}>Un recorrido sensorial guiado desde las montañas Blue Mountain</p>
            <p style={{margin:0}}>hasta los sound systems de Kingston.</p>
          </div>

          <div style={{margin:'48px 0 0', display:'grid', gap:12, fontSize:17, color:INDOMITO_TOKENS.ink}}>
            <p style={{margin:0}}>14 personas · 90 minutos</p>
            <p style={{margin:0}}>Café de origen único + 6 Estaciones musicales</p>
            <p style={{margin:0, fontStyle:'italic', color:INDOMITO_TOKENS.taupe}}>
              Burro → Ska → Rocksteady → Reggae → Dub → Dancehall
            </p>
          </div>

          <div style={{marginTop:64, display:'flex', gap:20, justifyContent:'center', alignItems:'center'}}>
            <button className="idm-btn idm-btn--solid">Reservas</button>
            <span className="idm-mono" style={{fontSize:12, letterSpacing:'.2em', textTransform:'uppercase', color:INDOMITO_TOKENS.inkSoft}}>Cupos limitados</span>
          </div>
        </div>
      </section>

      {/* Footer — real structure, real numbers */}
      <footer style={{padding:'72px 48px 56px', borderTop:`1px solid ${INDOMITO_TOKENS.rule}`}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, maxWidth:1200, margin:'0 auto'}}>
          <div>
            <div className="idm-mono" style={{fontSize:11, letterSpacing:'.22em', textTransform:'uppercase', color:INDOMITO_TOKENS.inkSoft, marginBottom:20}}>Contacto</div>
            <div style={{display:'grid', gap:8, fontSize:15}}>
              <div><span className="idm-mono" style={{color:INDOMITO_TOKENS.inkSoft, marginRight:12}}>WhatsApp</span>+54 9 11 60 46 39 80</div>
              <div><span className="idm-mono" style={{color:INDOMITO_TOKENS.inkSoft, marginRight:12}}>Instagram</span>@indomito_cafe</div>
            </div>
          </div>
          <div>
            <div className="idm-mono" style={{fontSize:11, letterSpacing:'.22em', textTransform:'uppercase', color:INDOMITO_TOKENS.inkSoft, marginBottom:20}}>Explorar</div>
            <div style={{display:'grid', gap:6, fontSize:15}}>
              {['Carta','Club','Eventos','Tienda','Origen'].map(x=>(
                <a key={x} href="#" className="idm-hover-underline" style={{color:INDOMITO_TOKENS.ink}}>→ {x}</a>
              ))}
            </div>
          </div>
        </div>
        <div style={{borderTop:`1px solid ${INDOMITO_TOKENS.rule}`, marginTop:48, paddingTop:24, display:'flex', justifyContent:'space-between', fontSize:12, color:INDOMITO_TOKENS.inkSoft}} className="idm-mono">
          <span>Copyright © 2025 Indómito Café · Buenos Aires · Argentina</span>
          <a href="#" className="idm-hover-underline" style={{color:'inherit'}}>Terms & Conditions</a>
        </div>
      </footer>
    </div>
  );
}

window.IndomitoV3 = IndomitoV3;
