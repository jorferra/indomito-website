// V1 — "Editorial Quiet"
// Full-bleed hero photograph, a single small typographic mark, long editorial scroll.
// Feels like a printed journal.

function IndomitoV1() {
  return (
    <div className="idm-root" style={{width:1440, minHeight:3600, background:INDOMITO_TOKENS.bg}}>
      {/* NAV floats over the hero in off-white */}
      <div style={{position:'relative'}}>
        {/* Hero */}
        <div style={{position:'relative', height:900, overflow:'hidden'}}>
          <IdmPhoto variant="steam" style={{position:'absolute', inset:0}}/>
          {/* nav over hero */}
          <div style={{position:'absolute', top:0, left:0, right:0, zIndex:4}}>
            <IndomitoNav inverse />
          </div>
          {/* hero copy */}
          <div style={{position:'absolute', left:48, right:48, bottom:56, zIndex:4, color:'#f4f1ec', display:'grid', gridTemplateColumns:'1fr auto', alignItems:'end', gap:48}}>
            <div>
              <div style={{fontFamily:INDOMITO_TOKENS.mono, fontSize:11, letterSpacing:'.18em', textTransform:'uppercase', opacity:.72, marginBottom:20}}>
                <span style={{display:'inline-block', width:6, height:6, borderRadius:'50%', background:'currentColor', marginRight:10, transform:'translateY(-2px)'}}/>
                Buenos Aires · Refugio Sensorial · Desde 2021
              </div>
              <h1 className="idm-display" style={{fontSize:132, margin:0, letterSpacing:'-0.038em', lineHeight:.94}}>
                Un refugio<br/>donde el café<br/>se habita.
              </h1>
            </div>
            <div style={{maxWidth:340, textAlign:'right'}}>
              <p style={{fontSize:15, lineHeight:1.55, opacity:.85, margin:0}}>
                Desde Buenos Aires, cultivamos experiencias alrededor del café,
                la escucha y el tiempo compartido.
              </p>
              <div style={{marginTop:32, display:'flex', gap:12, justifyContent:'flex-end'}}>
                <button className="idm-btn" style={{borderColor:'#f4f1ec', color:'#f4f1ec'}}>Ver Diario →</button>
                <button className="idm-btn idm-btn--solid" style={{background:'#f4f1ec', color:INDOMITO_TOKENS.ink}}>Próximo evento →</button>
              </div>
            </div>
          </div>
          {/* film grain layer vignette */}
          <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(0,0,0,.25) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 55%, rgba(0,0,0,.55) 100%)', zIndex:2}}/>
        </div>

        {/* Marquee line under hero */}
        <div style={{borderTop:`1px solid ${INDOMITO_TOKENS.rule}`, borderBottom:`1px solid ${INDOMITO_TOKENS.rule}`, padding:'18px 48px', display:'flex', gap:40, fontFamily:INDOMITO_TOKENS.mono, fontSize:11, letterSpacing:'.18em', textTransform:'uppercase', color:INDOMITO_TOKENS.inkSoft, whiteSpace:'nowrap', overflow:'hidden'}}>
          <span>· Café de especialidad</span>
          <span>· Diario Sensorial</span>
          <span>· Laboratorio Sensorial</span>
          <span>· Club Sensorial</span>
          <span>· Sistema Portátil</span>
          <span>· Caballito · Buenos Aires</span>
          <span>· Desde 2021</span>
        </div>
      </div>

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

window.IndomitoV1 = IndomitoV1;
