import React from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile, INDOMITO_TOKENS, IndomitoMark, IndomitoNav, IndomitoFooter, IdmPhoto, SectionLabel, SectionManifiesto, SectionCafe, SectionTienda, SectionSuscripcion, SectionEventos, SectionPortatil, SectionEquipo, SectionNewsletter, Pillar, FooterCol } from './shared';
import { CARTA_DATA } from './carta-data';
// Three V1 remixes — all push the "printed menu / editorial" direction.
// V1a · Broadsheet — full masthead, 3-column spread, 89°c seal mid-page.
// V1b · Chapbook   — cover page + quiet inner pages, no seal, 1-big/1-small column.
// V1c · Brasserie  — heavy-rule table, two-column spread, 89°c as running footer.

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
      padding: isMobile ? '56px 0 16px' : '120px 0 20px', marginBottom:8,
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

function V1Seal() {
  return (
    <div style={{
      border:`1.5px solid ${TV1.ink}`, padding:'52px 64px', background:TV1.bgAlt,
      display:'grid', gridTemplateColumns:'auto 1fr', gap:56, alignItems:'center',
      position:'relative',
    }}>
      <div style={{
        width:160, height:160, border:`1.5px solid ${TV1.ink}`, borderRadius:'50%',
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        gap:6,
      }}>
        <span className="idm-mono" style={{color:TV1.inkSoft, fontSize:10}}>Extracción</span>
        <span style={{fontFamily:TV1.display, fontSize:52, fontWeight:700, letterSpacing:'-0.04em', lineHeight:.9}}>
          89°c
        </span>
        <span className="idm-mono" style={{color:TV1.inkSoft, fontSize:10}}>Punto justo</span>
      </div>
      <div>
        <div style={{fontFamily:TV1.display, fontSize:32, fontWeight:500, letterSpacing:'-0.02em', lineHeight:1.18}}>
          {CARTA_DATA.manifesto.es1}<br/>
          {CARTA_DATA.manifesto.es2}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// V1a · BROADSHEET — big masthead, heavy rules, spread layout
// ═══════════════════════════════════════════════════════════════
function CartaV1a() {
  return (
    <div className="idm-root" style={{minHeight:'100%'}}>
      <IndomitoNav/>

      {/* Broadsheet masthead — double-rule + oversized title */}
      <header style={{margin:'0 48px'}}>
        <div style={{borderTop:`3px solid ${TV1.ink}`, borderBottom:`1px solid ${TV1.ink}`,
                     display:'grid', gridTemplateColumns:'1fr 2fr 1fr', alignItems:'end',
                     padding:'24px 0 20px', gap:24}}>
          <div className="idm-mono" style={{color:TV1.inkSoft}}>
            Tomo I · Edición vigente<br/>
            Caballito · Buenos Aires
          </div>
          <div style={{textAlign:'center'}}>
            <div className="idm-mono" style={{color:TV1.inkSoft, marginBottom:10, letterSpacing:'.22em'}}>
              — Indómito Café · Nuestra carta —
            </div>
            <h1 style={{fontFamily:TV1.display, fontSize:168, fontWeight:800, margin:0,
                        letterSpacing:'-0.045em', lineHeight:.85}}>
              La&nbsp;Carta
            </h1>
          </div>
          <div className="idm-mono" style={{color:TV1.inkSoft, textAlign:'right'}}>
            Tostado semanal<br/>Lotes pequeños<br/>Sin azúcar agregada
          </div>
        </div>
        <div style={{borderBottom:`3px solid ${TV1.ink}`, display:'flex',
                     justifyContent:'space-between', padding:'14px 0'}}>
          <span className="idm-mono" style={{color:TV1.inkSoft}}>Veintiún referencias · seis familias</span>
          <span className="idm-mono" style={{color:TV1.inkSoft}}>Precios en pesos argentinos · ars</span>
          <span className="idm-mono" style={{color:TV1.inkSoft}}>89°c · extracción</span>
        </div>
      </header>

      {/* Lede — italic pull-quote */}
      <section style={{padding:'56px 48px 40px'}}>
        <div style={{maxWidth:980, margin:'0 auto', textAlign:'center'}}>
          <p style={{fontFamily:TV1.display, fontSize:38, fontWeight:400, fontStyle:'italic',
                     letterSpacing:'-0.02em', lineHeight:1.22, margin:0, color:TV1.ink}}>
            Todo lo que servimos está aquí. Nada más, nada menos —
            una carta que prefiere la <span style={{fontStyle:'normal', fontWeight:600}}>claridad</span> a la abundancia.
          </p>
        </div>
      </section>

      {/* Spread 1 — Bebidas / Fríos, two columns */}
      <section style={{padding:'24px 48px 0'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:64}}>
          <div>
            <V1ColHeader num="01" title="Bebidas" count={CARTA_DATA.bebidas.length}/>
            {CARTA_DATA.bebidas.map((it,i)=><V1Item key={i} it={it}/>)}
          </div>
          <div>
            <V1ColHeader num="02" title="Fríos" count={CARTA_DATA.frios.length}/>
            {CARTA_DATA.frios.map((it,i)=><V1Item key={i} it={it}/>)}
          </div>
        </div>
      </section>

      {/* 89°c seal — in the middle */}
      <section style={{padding:'80px 48px'}}>
        <V1Seal/>
      </section>

      {/* Spread 2 — Filtrados / Alcohol, two columns */}
      <section style={{padding:'0 48px 16px'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:64}}>
          <div>
            <V1ColHeader num="03" title="Filtrados" count={CARTA_DATA.filtrados.length}/>
            {CARTA_DATA.filtrados.map((it,i)=><V1Item key={i} it={it}/>)}
          </div>
          <div>
            <V1ColHeader num="04" title="Alcohol" count={CARTA_DATA.alcohol.length}/>
            {CARTA_DATA.alcohol.map((it,i)=><V1Item key={i} it={it}/>)}
          </div>
        </div>
      </section>

      {/* Pastelería — 3 columns, dense */}
      <section style={{padding:'64px 48px 120px'}}>
        <V1ColHeader num="05" title="Pastelería" count={CARTA_DATA.pasteleria.length}/>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'0 48px'}}>
          {CARTA_DATA.pasteleria.map((it,i)=><V1Item key={i} it={it} showRecipe={false}/>)}
        </div>
      </section>

      <IndomitoFooter/>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// V1b · CHAPBOOK — slim, quiet, no seal. Cover page, then inner
// pages with an asymmetric 2-col split (wide bebidas / narrow sides).
// ═══════════════════════════════════════════════════════════════
function CartaV1b() {
  const isMobile = useIsMobile();
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
      <header style={{margin: isMobile ? '0 16px' : '0 48px',
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
      <section style={{padding: isMobile ? '0 20px' : '0 48px'}}>
        <div style={{display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 0 : 72}}>
          <div>
            <V1ColHeader num="01" title="Café" desc="sobre la barra · en taza" rule="thin"/>
            {CARTA_DATA.bebidas.map((it,i)=><V1Item key={i} it={it}/>)}
          </div>
          <div>
            <V1ColHeader num="02" title="Fríos" desc="sobre hielo · temperatura baja" rule="thin"/>
            {CARTA_DATA.frios.map((it,i)=><V1Item key={i} it={it} dense/>)}
            <div style={{height: isMobile ? 32 : 56}}/>
            <V1ColHeader num="03" title="Filtrados" desc="extracción lenta · claridad" rule="thin"/>
            {CARTA_DATA.filtrados.map((it,i)=><V1Item key={i} it={it} dense/>)}
          </div>
        </div>
      </section>

      {/* Intermission */}
      <section style={{padding: isMobile ? '72px 20px' : '140px 48px'}}>
        <div style={{maxWidth:860, margin:'0 auto', textAlign:'center'}}>
          <p style={{fontFamily:TV1.display, fontSize:'clamp(24px, 4vw, 52px)', fontWeight:400,
                     letterSpacing:'-0.028em', lineHeight:1.15, margin:0}}>
            <span style={{color:TV1.taupe, fontStyle:'italic'}}>{CARTA_DATA.manifesto.es1}</span><br/>
            {CARTA_DATA.manifesto.es2}
          </p>
        </div>
      </section>

      {/* Spread 2 — Pastelería / Alcohol */}
      <section style={{padding: isMobile ? '0 20px 72px' : '0 48px 140px'}}>
        <div style={{display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 0 : 72}}>
          <div>
            <V1ColHeader num="04" title="Pastelería" desc="del horno · del día" rule="thin"/>
            {CARTA_DATA.pasteleria.map((it,i)=><V1Item key={i} it={it} showRecipe={false}/>)}
          </div>
          <div>
            <V1ColHeader num="05" title="Alcohol" desc="para quedarse un rato más" rule="thin"/>
            {CARTA_DATA.alcohol.map((it,i)=><V1Item key={i} it={it}/>)}
          </div>
        </div>
      </section>

      <IndomitoFooter/>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// V1c · BRASSERIE — heavy table-style rules, 89°c runs as footer
// on every spread. Two big columns, prices right-aligned in their
// own gutter, item names in large semibold caps-ish.
// ═══════════════════════════════════════════════════════════════
function CartaV1c() {
  const RunningFooter = () => (
    <div style={{
      borderTop:`1px solid ${TV1.ink}`, borderBottom:`3px solid ${TV1.ink}`,
      padding:'12px 0', display:'flex', justifyContent:'space-between',
      fontFamily:TV1.mono, fontSize:10.5, color:TV1.inkSoft, letterSpacing:'.16em',
    }}>
      <span>Indómito Café · Caballito</span>
      <span style={{color:TV1.ink, fontWeight:600}}>89°c · para preservar el equilibrio</span>
      <span>Tostado semanal · 2026</span>
    </div>
  );

  const BrasserieItem = ({it, showRecipe=true}) => (
    <tr style={{borderBottom:`1px solid ${TV1.rule}`}}>
      <td style={{padding:'18px 20px 18px 0', verticalAlign:'top', width:56}}>
        <span className="idm-mono" style={{color:TV1.inkMuted}}>{it._n}</span>
      </td>
      <td style={{padding:'18px 24px 18px 0', verticalAlign:'top'}}>
        <div style={{display:'flex', alignItems:'baseline', gap:10, flexWrap:'wrap'}}>
          <span style={{fontFamily:TV1.display, fontSize:22, fontWeight:600, letterSpacing:'-0.015em'}}>
            {it.name}
          </span>
          {it.sub && <span className="idm-mono" style={{color:TV1.inkSoft}}>{it.sub}</span>}
        </div>
        {showRecipe && it.recipe && (
          <div className="idm-mono" style={{color:TV1.inkSoft, marginTop:6, fontSize:10.5}}>
            {it.recipe.toUpperCase()}
          </div>
        )}
        <div style={{marginTop:8, fontSize:13, color:TV1.inkSoft}}>
          {it.es.join(' · ')}
        </div>
      </td>
      <td style={{padding:'18px 0 18px 0', verticalAlign:'top', textAlign:'right', width:120, fontFamily:TV1.mono, fontSize:14}}>
        {it.price}
      </td>
    </tr>
  );

  const Table = ({num, title, items, showRecipe=true}) => (
    <div>
      <V1ColHeader num={num} title={title} count={items.length}/>
      <table style={{width:'100%', borderCollapse:'collapse'}}>
        <tbody>
          {items.map((it,i)=><BrasserieItem key={i} it={{...it, _n:String(i+1).padStart(2,'0')}} showRecipe={showRecipe}/>)}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="idm-root" style={{minHeight:'100%'}}>
      <IndomitoNav/>

      {/* Brasserie masthead — slab-centered, heavy rules */}
      <header style={{margin:'0 48px', padding:'40px 0 20px',
                      borderTop:`4px double ${TV1.ink}`, borderBottom:`4px double ${TV1.ink}`,
                      textAlign:'center'}}>
        <div className="idm-mono" style={{color:TV1.inkSoft, marginBottom:16, letterSpacing:'.24em'}}>
          ~ Indómito Café · Caballito ~
        </div>
        <h1 style={{fontFamily:TV1.display, fontSize:140, fontWeight:900, margin:0,
                    letterSpacing:'-0.04em', lineHeight:.9, textTransform:'uppercase'}}>
          Carta Brasserie
        </h1>
        <div className="idm-mono" style={{color:TV1.inkSoft, marginTop:16, letterSpacing:'.2em'}}>
          Bebidas · Fríos · Filtrados · Alcohol · Pastelería
        </div>
      </header>

      {/* Running footer — intro instance */}
      <div style={{padding:'0 48px', marginTop:20}}><RunningFooter/></div>

      {/* Spread 1 */}
      <section style={{padding:'64px 48px 40px'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:64}}>
          <Table num="01" title="Bebidas" items={CARTA_DATA.bebidas}/>
          <Table num="02" title="Fríos"   items={CARTA_DATA.frios}/>
        </div>
      </section>

      <div style={{padding:'0 48px'}}><RunningFooter/></div>

      {/* Spread 2 — wide bebidas filtradas + alcohol */}
      <section style={{padding:'64px 48px 40px'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:64}}>
          <Table num="03" title="Filtrados" items={CARTA_DATA.filtrados}/>
          <Table num="04" title="Alcohol"   items={CARTA_DATA.alcohol}/>
        </div>
      </section>

      <div style={{padding:'0 48px'}}><RunningFooter/></div>

      {/* Pastelería — full-width table */}
      <section style={{padding:'64px 48px 64px'}}>
        <Table num="05" title="Pastelería" items={CARTA_DATA.pasteleria} showRecipe={false}/>
      </section>

      <div style={{padding:'0 48px 96px'}}><RunningFooter/></div>

      <IndomitoFooter/>
    </div>
  );
}

export default CartaV1a;
