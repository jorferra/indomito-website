// V2 — "Split Manifesto"
// Hero split: a large typographic manifesto on the left, a tall vertical
// photo on the right. More graphic, more assertive. Same downstream sections.

function IndomitoV2() {
  return (
    <div className="idm-root" style={{width:1440, minHeight:3600, background:INDOMITO_TOKENS.bg}}>
      <IndomitoNav />

      {/* Hero */}
      <section style={{padding:'0 48px 0', position:'relative'}}>
        <div style={{display:'grid', gridTemplateColumns:'1.55fr 1fr', gap:48, minHeight:820, paddingTop:24}}>
          {/* Left — typographic manifesto */}
          <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between', paddingBottom:40}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', fontFamily:INDOMITO_TOKENS.mono, fontSize:11, letterSpacing:'.18em', textTransform:'uppercase', color:INDOMITO_TOKENS.inkSoft}}>
              <span><span style={{display:'inline-block', width:6, height:6, borderRadius:'50%', background:'currentColor', marginRight:10, transform:'translateY(-2px)'}}/>Refugio sensorial · desde 2021</span>
              <span>Caballito · Buenos Aires</span>
            </div>

            <h1 className="idm-display" style={{fontSize:156, margin:'0 0 0 -6px', letterSpacing:'-0.042em', lineHeight:.9}}>
              Café,<br/>
              <span style={{color:INDOMITO_TOKENS.taupe}}>escucha</span><br/>
              y tiempo<br/>
              compartido.
            </h1>

            <div style={{display:'grid', gridTemplateColumns:'1.2fr 1fr auto auto', gap:24, alignItems:'end'}}>
              <p style={{fontSize:16, lineHeight:1.55, margin:0, maxWidth:420}}>
                Un refugio sensorial donde el café se habita. Diario, Club,
                Eventos y Sistema Portátil — todo se organiza alrededor de la
                pausa, la escucha y el detalle.
              </p>
              <div>
                <div className="idm-mono" style={{color:INDOMITO_TOKENS.inkSoft, marginBottom:6}}>Próximo evento</div>
                <div style={{fontFamily:INDOMITO_TOKENS.display, fontSize:20, letterSpacing:'-0.018em'}}>Jamaica · Pressure Bloom</div>
                <div style={{fontSize:13, color:INDOMITO_TOKENS.inkSoft, marginTop:2}}>17 May · Buenos Aires · 14 lugares</div>
              </div>
              <button className="idm-btn">Ver Diario →</button>
              <button className="idm-btn idm-btn--solid">Reservar →</button>
            </div>
          </div>

          {/* Right — tall photo.
              To swap in a real image: drop your file in `uploads/` and set src below,
              e.g. src="uploads/latte.jpg" */}
          <div style={{position:'relative'}}>
            <IdmPhoto
              src="uploads/20260418_165658.jpg"
              alt="Espresso cayendo en taza de vidrio"
              caption="Espresso · 40 ml · 89 °C"
              style={{position:'absolute', inset:0}}
            />
            <div style={{position:'absolute', top:24, right:24, zIndex:4, color:'#f4f1ec', fontFamily:INDOMITO_TOKENS.mono, fontSize:11, letterSpacing:'.18em', textTransform:'uppercase', textAlign:'right', lineHeight:1.8}}>
              N° 04<br/>
              <span style={{opacity:.7}}>Volumen Otoño</span>
            </div>
          </div>
        </div>

        {/* Index row */}
        <div style={{display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:16, padding:'20px 0', borderTop:`1px solid ${INDOMITO_TOKENS.rule}`, borderBottom:`1px solid ${INDOMITO_TOKENS.rule}`, marginTop:32, fontFamily:INDOMITO_TOKENS.mono, fontSize:11, letterSpacing:'.16em', textTransform:'uppercase', color:INDOMITO_TOKENS.inkSoft}}>
          {['01 Próximo evento','02 Qué es','03 Diario','04 Club','05 Portátil','06 Carta','07 Contacto'].map(s=>(
            <span key={s} className="idm-hover-underline" style={{cursor:'pointer'}}>{s}</span>
          ))}
        </div>
      </section>

      <SectionProximoEvento  numeric="01" />
      <SectionQueEs          numeric="02" />
      <SectionDiario         numeric="03" />
      <SectionClub           numeric="04" />
      <SectionSistemaPortatil numeric="05" />
      <SectionCarta          numeric="06" />
      <SectionContacto       numeric="07" />

      <IndomitoFooter />
    </div>
  );
}

window.IndomitoV2 = IndomitoV2;
