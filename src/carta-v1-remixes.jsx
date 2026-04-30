import React from 'react';
import { useIsMobile, INDOMITO_TOKENS, IndomitoMark, IndomitoNav, IndomitoFooter, IdmPhoto, SectionLabel, SectionManifiesto, SectionCafe, SectionTienda, SectionSuscripcion, SectionEventos, SectionPortatil, SectionEquipo, SectionNewsletter, Pillar, FooterCol } from './shared';
import { CARTA_DATA } from './carta-data';
// Carta V1b · Chapbook — cover page + quiet inner pages, no seal, 1-big/1-small column.

const TV1 = INDOMITO_TOKENS;

// ── shared atoms ──────────────────────────────────────────────
function V1Item({it, showRecipe=true, dense=false}) {
  return (
    <div style={{display:'grid', gridTemplateColumns:'1fr auto', gap:'0 24px',
                 alignItems:'baseline', padding: dense ? '12px 0' : '18px 0',
                 borderBottom:`1px dotted ${TV1.rule}`}}>
      <div>
        <div style={{display:'flex', alignItems:'baseline', gap:10, flexWrap:'wrap'}}>
          <span style={{fontFamily:TV1.display, fontSize: dense ? 20 : 24, fontWeight:500, letterSpacing:'-0.018em'}}>
            {it.name}
          </span>
          {it.sub && <span className="idm-mono" style={{color:TV1.inkSoft}}>{it.sub}</span>}
        </div>
        {showRecipe && it.recipe && (
          <div className="idm-mono" style={{color:TV1.inkSoft, marginTop:6, fontSize:10.5}}>
            {it.recipe.toUpperCase()}
          </div>
        )}
        {!dense && (
          <div style={{marginTop:8, fontSize:13, lineHeight:1.45, color:TV1.ink}}>
            {it.es.map((l,i)=><div key={i}>{l}</div>)}
          </div>
        )}
        {dense && (
          <div style={{marginTop:4, fontSize:12, color:TV1.ink}}>
            {it.es.join(' · ')}
          </div>
        )}
      </div>
      <div style={{fontFamily:TV1.mono, fontSize:13, letterSpacing:'.04em', alignSelf:'start', paddingTop:4}}>
        {it.price}
      </div>
    </div>
  );
}

function V1ColHeader({num, title, desc, rule='heavy'}) {
  const isMobile = useIsMobile();
  return (
    <div style={{
      display:'flex', justifyContent:'space-between', alignItems:'baseline',
      padding: isMobile ? '28px 0 12px' : '120px 0 20px', marginBottom: isMobile ? 6 : 8,
      borderBottom: rule==='heavy' ? `2px solid ${TV1.ink}` : `1px solid ${TV1.rule}`,
    }}>
      <h2 style={{fontFamily:TV1.display, fontSize:'clamp(40px, 5vw, 72px)', margin:0,
                  letterSpacing:'-0.04em', lineHeight:.95, fontWeight:400}}>{title}</h2>
      <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end', gap:6, paddingBottom:6}}>
        <span className="idm-mono" style={{color:'#8B6F47', letterSpacing:'.22em'}}>{num}</span>
        {desc && <span className="idm-mono" style={{color:TV1.inkMuted, fontSize:9, letterSpacing:'.14em'}}>{desc}</span>}
      </div>
    </div>
  );
}
// Carta V1b · CHAPBOOK — slim, quiet, no seal. Cover page, then inner
// pages with an asymmetric 2-col split (wide bebidas / narrow sides).
function CartaV1b() {
  const isMobile = useIsMobile();
  const sidePad = isMobile ? 28 : 48;
  return (
    <div className="idm-root v1b-scope" style={{width:'100%'}}>
      <style>{`
        .v1b-scope .idm-mono{
          font-family:"JetBrains Mono", ui-monospace, monospace !important;
          color:#8B6F47 !important;
        }
      `}</style>
      <IndomitoNav/>

      {/* Cover page */}
      <header style={{margin: `0 ${sidePad}px`,
                      padding: isMobile ? '48px 0 64px' : '80px 0 120px',
                      borderTop:`1px solid ${TV1.ink}`, borderBottom:`1px solid ${TV1.ink}`,
                      textAlign:'center'}}>
        <div className="idm-mono" style={{fontFamily:'"JetBrains Mono", ui-monospace, monospace',
                                           color:'#8B6F47', letterSpacing:'.22em',
                                           marginBottom: isMobile ? 20 : 28, fontSize: isMobile ? 11 : 15}}>
          Mmxxvi · Nuestra carta
        </div>
        <h1 style={{fontFamily:TV1.display, fontSize: isMobile ? 'clamp(72px, 18vw, 160px)' : 'clamp(80px, 16vw, 240px)',
                    fontWeight:300, margin:0, letterSpacing:'-0.05em', lineHeight:.85}}>
          Carta
        </h1>
        <div style={{maxWidth:560, margin: isMobile ? '32px auto 0' : '56px auto 0',
                     fontFamily:TV1.display, fontSize: isMobile ? 16 : 18,
                     lineHeight:1.65, color:'rgb(26,26,25)', whiteSpace:'pre-line'}}>
          {`Un cuadernillo con todo lo que pasa sobre la barra.\nElegí sin apuro. Miembros del Club, con descuento.`}
        </div>
        <div className="idm-mono" style={{fontFamily:'"JetBrains Mono", ui-monospace, monospace',
                                           color:'#8B6F47', fontWeight:600, fontSize:11,
                                           marginTop: isMobile ? 24 : 36, letterSpacing:'.18em'}}>
          Carta · Indómito Café · Buenos Aires
        </div>
        <div style={{position:'relative', width:'100%', height: isMobile ? 240 : 560,
                     marginTop: isMobile ? 32 : 40, marginBottom: isMobile ? -48 : -80, overflow:'hidden'}}>
          <img src="assets/fotos%20para%20Carta/cayendo.jpg" alt="Indómito Café"
            style={{position:'absolute', inset:0, width:'100%', height:'100%',
                    objectFit:'cover', objectPosition:'center center', display:'block'}}/>
        </div>
      </header>

      {/* Spread 1 — Café / Fríos + Filtrados */}
      <section style={{padding: `0 ${sidePad}px`}}>
        {isMobile ? (
          <div>
            <V1ColHeader num="01" title="Café" desc="sobre la barra · en taza" rule="thin"/>
            {CARTA_DATA.bebidas.map((it,i)=><V1Item key={i} it={it}/>)}
            <div style={{height: 14}}/>
            <V1ColHeader num="02" title="Fríos" desc="sobre hielo · temperatura baja" rule="thin"/>
            {CARTA_DATA.frios.map((it,i)=><V1Item key={i} it={it} dense/>)}
            <div style={{height: 14}}/>
            <V1ColHeader num="03" title="Filtrados" desc="extracción lenta · claridad" rule="thin"/>
            {CARTA_DATA.filtrados.map((it,i)=><V1Item key={i} it={it} dense/>)}
          </div>
        ) : (
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:72}}>
            <div>
              <V1ColHeader num="01" title="Café" desc="sobre la barra · en taza" rule="thin"/>
              {CARTA_DATA.bebidas.map((it,i)=><V1Item key={i} it={it}/>)}
            </div>
            <div>
              <V1ColHeader num="02" title="Fríos" desc="sobre hielo · temperatura baja" rule="thin"/>
              {CARTA_DATA.frios.map((it,i)=><V1Item key={i} it={it} dense/>)}
              <div style={{height: 56}}/>
              <V1ColHeader num="03" title="Filtrados" desc="extracción lenta · claridad" rule="thin"/>
              {CARTA_DATA.filtrados.map((it,i)=><V1Item key={i} it={it} dense/>)}
            </div>
          </div>
        )}
      </section>

      {/* Intermission */}
      <section style={{padding: isMobile ? '72px 28px' : '140px 48px'}}>
        <div style={{maxWidth:860, margin:'0 auto', textAlign:'center'}}>
          <p style={{fontFamily:TV1.display, fontSize:'clamp(24px, 4vw, 52px)', fontWeight:400,
                     letterSpacing:'-0.028em', lineHeight:1.15, margin:0}}>
            <span style={{color:TV1.taupe, fontStyle:'italic'}}>{CARTA_DATA.manifesto.es1}</span><br/>
            {CARTA_DATA.manifesto.es2}
          </p>
        </div>
      </section>

      {/* Spread 2 — Pastelería / Alcohol */}
      <section style={{padding: `0 ${sidePad}px ${isMobile ? 64 : 140}px`}}>
        {isMobile ? (
          <div>
            <V1ColHeader num="04" title="Pastelería" desc="del horno · del día" rule="thin"/>
            {CARTA_DATA.pasteleria.map((it,i)=><V1Item key={i} it={it} showRecipe={false}/>)}
            <div style={{height: 14}}/>
            <V1ColHeader num="05" title="Alcohol" desc="para quedarse un rato más" rule="thin"/>
            {CARTA_DATA.alcohol.map((it,i)=><V1Item key={i} it={it}/>)}
          </div>
        ) : (
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:72}}>
            <div>
              <V1ColHeader num="04" title="Pastelería" desc="del horno · del día" rule="thin"/>
              {CARTA_DATA.pasteleria.map((it,i)=><V1Item key={i} it={it} showRecipe={false}/>)}
            </div>
            <div>
              <V1ColHeader num="05" title="Alcohol" desc="para quedarse un rato más" rule="thin"/>
              {CARTA_DATA.alcohol.map((it,i)=><V1Item key={i} it={it}/>)}
            </div>
          </div>
        )}
      </section>

      <IndomitoFooter/>
    </div>
  );
}

export default CartaV1b;
