// Three Carta variations — reorganized layouts, real copy only.
// V1 Ticket · V2 Index · V3 Manifesto-first

const T = INDOMITO_TOKENS;

// ──────────────────────────────────────────────────────────────
// V1 · TICKET — printed menu feel. 2 columns, dense, scanable.
// Bebidas + Fríos share a spread; Filtrados/Alcohol/Pastelería
// compact below; 89°c sits as a letter-pressed seal.
// ──────────────────────────────────────────────────────────────
function CartaV1() {
  const Item = ({it, showRecipe=true}) => (
    <div style={{display:'grid', gridTemplateColumns:'1fr auto', gap:'0 24px', alignItems:'baseline',
                 padding:'18px 0', borderBottom:`1px dotted ${T.rule}`}}>
      <div>
        <div style={{display:'flex', alignItems:'baseline', gap:12}}>
          <span style={{fontFamily:T.display, fontSize:24, letterSpacing:'-0.02em'}}>{it.name}</span>
          {it.sub && <span className="idm-mono" style={{color:T.inkSoft}}>{it.sub}</span>}
        </div>
        {showRecipe && it.recipe && (
          <div className="idm-mono" style={{color:T.inkSoft, marginTop:6, fontSize:10.5}}>
            {it.recipe.toUpperCase()}
          </div>
        )}
        <div style={{display:'flex', gap:32, marginTop:8, fontSize:13, color:T.inkSoft, lineHeight:1.4}}>
          <div style={{flex:1}}>{it.es.map((l,i)=><div key={i}>{l}</div>)}</div>
          <div style={{flex:1, fontStyle:'italic', color:T.inkMuted}}>{it.en.map((l,i)=><div key={i}>{l}</div>)}</div>
        </div>
      </div>
      <div style={{fontFamily:T.mono, fontSize:13, letterSpacing:'.04em', alignSelf:'start', paddingTop:4, color:T.ink}}>
        {it.price}
      </div>
    </div>
  );

  const ColHeader = ({num, title, count}) => (
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:8,
                 paddingBottom:14, borderBottom:`1px solid ${T.ink}`}}>
      <div style={{display:'flex', alignItems:'baseline', gap:14}}>
        <span className="idm-mono" style={{color:T.inkMuted}}>{num}</span>
        <h3 style={{fontFamily:T.display, fontSize:36, margin:0, letterSpacing:'-0.025em'}}>{title}</h3>
      </div>
      <span className="idm-mono" style={{color:T.inkSoft}}>{count} referencias</span>
    </div>
  );

  return (
    <div className="idm-root" style={{minHeight:'100%'}}>
      <IndomitoNav />

      {/* Masthead — newspaper style */}
      <header style={{borderTop:`1px solid ${T.ink}`, borderBottom:`1px solid ${T.ink}`, margin:'0 48px'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr auto 1fr', alignItems:'center',
                     padding:'28px 0', gap:32}}>
          <div className="idm-mono" style={{color:T.inkSoft}}>Edición vigente · Caballito</div>
          <div style={{textAlign:'center'}}>
            <div className="idm-mono" style={{color:T.inkSoft, marginBottom:8}}>Nuestra carta</div>
            <h1 className="idm-display" style={{fontSize:96, margin:0, letterSpacing:'-0.035em', lineHeight:.9}}>
              La carta
            </h1>
          </div>
          <div className="idm-mono" style={{color:T.inkSoft, textAlign:'right'}}>Tostado semanal · Lotes pequeños</div>
        </div>
      </header>

      {/* Spread: Bebidas / Fríos */}
      <section style={{padding:'64px 48px 0'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:72}}>
          <div>
            <ColHeader num="01" title="Bebidas" count={CARTA_DATA.bebidas.length}/>
            <div>{CARTA_DATA.bebidas.map((it,i)=><Item key={i} it={it}/>)}</div>
          </div>
          <div>
            <ColHeader num="02" title="Fríos" count={CARTA_DATA.frios.length}/>
            <div>{CARTA_DATA.frios.map((it,i)=><Item key={i} it={it}/>)}</div>
          </div>
        </div>
      </section>

      {/* 89°c seal — inserted between spreads */}
      <section style={{padding:'80px 48px'}}>
        <div style={{border:`1px solid ${T.ink}`, padding:'56px 64px',
                     background:T.bgAlt, display:'grid', gridTemplateColumns:'auto 1fr', gap:56, alignItems:'center'}}>
          <div style={{width:140, height:140, border:`1px solid ${T.ink}`, borderRadius:'50%',
                       display:'flex', alignItems:'center', justifyContent:'center',
                       fontFamily:T.display, fontSize:52, letterSpacing:'-0.04em'}}>
            89°c
          </div>
          <div>
            <div style={{fontFamily:T.display, fontSize:32, letterSpacing:'-0.02em', lineHeight:1.15}}>
              {CARTA_DATA.manifesto.es1}<br/>
              {CARTA_DATA.manifesto.es2}
            </div>
            <div className="idm-mono" style={{color:T.inkSoft, marginTop:20, maxWidth:520, lineHeight:1.7}}>
              {CARTA_DATA.manifesto.en1.toUpperCase()} · {CARTA_DATA.manifesto.en2.toUpperCase()}
            </div>
          </div>
        </div>
      </section>

      {/* Filtrados / Alcohol row */}
      <section style={{padding:'0 48px 64px'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:72}}>
          <div>
            <ColHeader num="03" title="Filtrados" count={CARTA_DATA.filtrados.length}/>
            <div>{CARTA_DATA.filtrados.map((it,i)=><Item key={i} it={it}/>)}</div>
          </div>
          <div>
            <ColHeader num="04" title="Alcohol" count={CARTA_DATA.alcohol.length}/>
            <div>{CARTA_DATA.alcohol.map((it,i)=><Item key={i} it={it}/>)}</div>
          </div>
        </div>
      </section>

      {/* Pastelería — 3 columns */}
      <section style={{padding:'0 48px 120px'}}>
        <ColHeader num="05" title="Pastelería" count={CARTA_DATA.pasteleria.length}/>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'0 48px'}}>
          {CARTA_DATA.pasteleria.map((it,i)=><Item key={i} it={it} showRecipe={false}/>)}
        </div>
      </section>

      <IndomitoFooter/>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// V2 · INDEX — catalog / anchor-nav. Sticky tabs at top, category
// sections as typographic indexes with recipe as prominent metadata.
// ──────────────────────────────────────────────────────────────
function CartaV2() {
  const groups = [
    { id:'bebidas',    label:'Bebidas',    num:'01', items: CARTA_DATA.bebidas },
    { id:'frios',      label:'Fríos',      num:'02', items: CARTA_DATA.frios },
    { id:'filtrados',  label:'Filtrados',  num:'03', items: CARTA_DATA.filtrados },
    { id:'alcohol',    label:'Alcohol',    num:'04', items: CARTA_DATA.alcohol },
    { id:'pasteleria', label:'Pastelería', num:'05', items: CARTA_DATA.pasteleria },
  ];

  const IndexRow = ({it, showRecipe=true}) => (
    <li style={{display:'grid', gridTemplateColumns:'56px 1.2fr 1.3fr 1fr 100px', gap:32,
                alignItems:'baseline', padding:'32px 0', borderBottom:`1px solid ${T.rule}`}}>
      <span className="idm-mono" style={{color:T.inkMuted}}>{String(it._idx).padStart(2,'0')}</span>
      <div>
        <div style={{fontFamily:T.display, fontSize:36, letterSpacing:'-0.028em', lineHeight:1}}>{it.name}</div>
        {it.sub && <div className="idm-mono" style={{color:T.inkSoft, marginTop:8}}>{it.sub}</div>}
      </div>
      <div className="idm-mono" style={{color:T.inkSoft, lineHeight:1.6}}>
        {showRecipe && it.recipe ? it.recipe.toUpperCase() : <span style={{opacity:.4}}>—</span>}
      </div>
      <div style={{fontSize:13, color:T.ink, lineHeight:1.5}}>
        <div>{it.es.join(' · ')}</div>
        <div style={{color:T.inkMuted, fontStyle:'italic', marginTop:4}}>{it.en.join(' · ')}</div>
      </div>
      <div style={{fontFamily:T.display, fontSize:24, letterSpacing:'-0.02em', textAlign:'right'}}>{it.price}</div>
    </li>
  );

  return (
    <div className="idm-root" style={{minHeight:'100%'}}>
      <IndomitoNav/>

      {/* Hero */}
      <section style={{padding:'80px 48px 56px'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'end'}}>
          <div>
            <SectionLabel num="—">Nuestra carta</SectionLabel>
            <h1 className="idm-display" style={{fontSize:180, margin:'20px 0 0',
                letterSpacing:'-0.04em', lineHeight:.88}}>
              Índice<br/>de taza.
            </h1>
          </div>
          <div style={{fontSize:15, lineHeight:1.7, maxWidth:440, color:T.inkSoft, paddingBottom:16}}>
            Veintiún referencias. Seis familias.
            Todo lo que puede ocurrir sobre la barra,
            ordenado como lo pensamos: por gesto y temperatura,
            no por costumbre.
          </div>
        </div>
      </section>

      {/* Sticky category tabs */}
      <div style={{position:'sticky', top:0, zIndex:10, background:T.bg,
                   borderTop:`1px solid ${T.ink}`, borderBottom:`1px solid ${T.ink}`,
                   padding:'20px 48px'}}>
        <div style={{display:'flex', gap:0, justifyContent:'space-between', alignItems:'baseline'}}>
          {groups.map((g,i)=>(
            <a key={g.id} href={`#${g.id}`} style={{textDecoration:'none', color:T.ink, display:'flex', alignItems:'baseline', gap:14}}>
              <span className="idm-mono" style={{color:T.inkMuted}}>{g.num}</span>
              <span className="idm-hover-underline" style={{fontFamily:T.display, fontSize:26, letterSpacing:'-0.02em'}}>{g.label}</span>
              <span className="idm-mono" style={{color:T.inkSoft, marginLeft:4}}>·{g.items.length}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Sections */}
      {groups.map((g, gi) => {
        const items = g.items.map((it,i)=>({...it, _idx:i+1}));
        return (
          <section key={g.id} id={g.id} style={{padding:'96px 48px 32px'}}>
            <div style={{display:'grid', gridTemplateColumns:'1fr 3fr', gap:80, alignItems:'baseline', marginBottom:40}}>
              <div>
                <div className="idm-mono" style={{color:T.inkSoft}}>{g.num} / {String(g.items.length).padStart(2,'0')}</div>
                <h2 className="idm-display" style={{fontSize:96, margin:'16px 0 0', letterSpacing:'-0.035em', lineHeight:.95}}>
                  {g.label}
                </h2>
              </div>
              <div style={{display:'grid', gridTemplateColumns:'56px 1.2fr 1.3fr 1fr 100px', gap:32,
                           paddingBottom:16, borderBottom:`1px solid ${T.ink}`}}>
                <span className="idm-mono" style={{color:T.inkMuted}}>Nº</span>
                <span className="idm-mono" style={{color:T.inkMuted}}>Referencia</span>
                <span className="idm-mono" style={{color:T.inkMuted}}>Receta</span>
                <span className="idm-mono" style={{color:T.inkMuted}}>Descripción</span>
                <span className="idm-mono" style={{color:T.inkMuted, textAlign:'right'}}>Precio</span>
              </div>
            </div>
            <ul style={{listStyle:'none', padding:0, margin:0}}>
              {items.map((it,i)=><IndexRow key={i} it={it} showRecipe={g.id!=='pasteleria' && g.id!=='alcohol'}/>)}
            </ul>
          </section>
        );
      })}

      {/* 89°c closing */}
      <section style={{padding:'120px 48px', background:T.ink, color:T.bg, marginTop:80}}>
        <div style={{maxWidth:1200, margin:'0 auto'}}>
          <div className="idm-mono" style={{opacity:.55, marginBottom:32}}>Coda · 89°c</div>
          <h2 className="idm-display" style={{fontSize:132, margin:0, letterSpacing:'-0.035em', lineHeight:.95}}>
            {CARTA_DATA.manifesto.es1}<br/>
            <span style={{opacity:.55}}>{CARTA_DATA.manifesto.es2}</span>
          </h2>
          <div className="idm-mono" style={{opacity:.5, marginTop:48, letterSpacing:'.18em'}}>
            {CARTA_DATA.manifesto.en1.toUpperCase()} · {CARTA_DATA.manifesto.en2.toUpperCase()}
          </div>
        </div>
      </section>

      <IndomitoFooter/>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// V3 · MANIFESTO-FIRST — the 89°c statement leads, full-bleed.
// Then the carta unfolds as ratio-driven cards; recipe numbers
// (ml / °c / seg) become the visual hero of each item.
// ──────────────────────────────────────────────────────────────
function CartaV3() {
  // Parse recipe into structured tokens for display
  const parseRecipe = (r) => {
    if (!r) return [];
    return r.split(/\s*·\s*|\s*\+\s*/).map(s => s.trim()).filter(Boolean);
  };

  const RatioCard = ({it, i}) => {
    const tokens = parseRecipe(it.recipe);
    return (
      <article style={{display:'grid', gridTemplateColumns:'80px 1fr 120px', gap:40,
                       padding:'44px 0', borderBottom:`1px solid ${T.rule}`, alignItems:'start'}}>
        <div className="idm-mono" style={{color:T.inkMuted, paddingTop:12}}>{String(i+1).padStart(2,'0')}</div>
        <div>
          <div style={{display:'flex', alignItems:'baseline', gap:14, marginBottom:18}}>
            <h3 style={{fontFamily:T.display, fontSize:44, margin:0, letterSpacing:'-0.03em', lineHeight:1}}>{it.name}</h3>
            {it.sub && <span className="idm-mono" style={{color:T.inkSoft}}>{it.sub}</span>}
          </div>
          {tokens.length > 0 && (
            <div style={{display:'flex', gap:10, flexWrap:'wrap', marginBottom:20}}>
              {tokens.map((tok, ti) => (
                <span key={ti} className="idm-mono" style={{
                  display:'inline-block', padding:'8px 14px',
                  border:`1px solid ${T.rule}`, borderRadius:999,
                  color:T.ink, background:T.bgAlt, letterSpacing:'.08em', fontSize:10.5,
                }}>{tok.toUpperCase()}</span>
              ))}
            </div>
          )}
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, fontSize:15, lineHeight:1.55, maxWidth:720}}>
            <div>{it.es.map((l,li)=><div key={li}>{l}</div>)}</div>
            <div style={{color:T.inkMuted, fontStyle:'italic'}}>
              {it.en.map((l,li)=><div key={li}>{l}</div>)}
            </div>
          </div>
        </div>
        <div style={{fontFamily:T.display, fontSize:32, letterSpacing:'-0.02em', textAlign:'right', paddingTop:4}}>
          {it.price}
        </div>
      </article>
    );
  };

  const PastryCard = ({it, i}) => (
    <article style={{display:'grid', gridTemplateColumns:'40px 1fr auto', gap:24, alignItems:'baseline',
                     padding:'26px 0', borderBottom:`1px solid ${T.rule}`}}>
      <span className="idm-mono" style={{color:T.inkMuted}}>{String(i+1).padStart(2,'0')}</span>
      <div>
        <div style={{display:'flex', alignItems:'baseline', gap:12, marginBottom:4}}>
          <span style={{fontFamily:T.display, fontSize:26, letterSpacing:'-0.02em'}}>{it.name}</span>
          {it.sub && <span className="idm-mono" style={{color:T.inkSoft}}>· {it.sub}</span>}
        </div>
        <div style={{fontSize:13, color:T.inkSoft}}>
          {it.es.join(' · ')} <span style={{color:T.inkMuted, fontStyle:'italic', marginLeft:8}}>{it.en.join(' · ')}</span>
        </div>
      </div>
      <span style={{fontFamily:T.mono, fontSize:13}}>{it.price}</span>
    </article>
  );

  const Section = ({num, title, children, subtitle}) => (
    <section style={{padding:'80px 48px'}}>
      <div style={{maxWidth:1200, margin:'0 auto'}}>
        <div style={{display:'grid', gridTemplateColumns:'80px 1fr', gap:40, marginBottom:32, alignItems:'baseline'}}>
          <span className="idm-mono" style={{color:T.inkMuted}}>{num}</span>
          <div>
            <h2 className="idm-display" style={{fontSize:72, margin:0, letterSpacing:'-0.03em', lineHeight:1}}>{title}</h2>
            {subtitle && <div className="idm-mono" style={{color:T.inkSoft, marginTop:12}}>{subtitle}</div>}
          </div>
        </div>
        {children}
      </div>
    </section>
  );

  return (
    <div className="idm-root" style={{minHeight:'100%'}}>
      <IndomitoNav/>

      {/* Manifesto-first hero */}
      <section style={{padding:'40px 48px 80px', borderBottom:`1px solid ${T.ink}`}}>
        <div style={{maxWidth:1280, margin:'0 auto'}}>
          <div className="idm-mono" style={{color:T.inkSoft, marginBottom:32}}>00 / Principio</div>
          <h1 className="idm-display" style={{fontSize:168, margin:0, letterSpacing:'-0.04em', lineHeight:.9}}>
            {CARTA_DATA.manifesto.es1.split('89°c')[0]}
            <span style={{display:'inline-block', position:'relative'}}>
              <span style={{
                fontFamily:T.display, fontSize:168,
                background:T.ink, color:T.bg,
                padding:'0 24px', borderRadius:12, letterSpacing:'-0.04em',
              }}>89°c</span>
            </span>
          </h1>
          <h1 className="idm-display" style={{fontSize:168, margin:'8px 0 0', letterSpacing:'-0.04em', lineHeight:.9, color:T.taupe}}>
            {CARTA_DATA.manifesto.es2}
          </h1>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:48, marginTop:72, paddingTop:32, borderTop:`1px solid ${T.rule}`}}>
            <div className="idm-mono" style={{color:T.inkSoft, letterSpacing:'.14em'}}>
              {CARTA_DATA.manifesto.en1.toUpperCase()}<br/>
              {CARTA_DATA.manifesto.en2.toUpperCase()}
            </div>
            <div className="idm-mono" style={{color:T.inkSoft}}>
              Extracción medida.<br/>Dulzor, no astringencia.
            </div>
            <div className="idm-mono" style={{color:T.inkSoft, textAlign:'right'}}>
              Nuestra carta · Caballito · 2026
            </div>
          </div>
        </div>
      </section>

      <Section num="01" title="Bebidas" subtitle={`${CARTA_DATA.bebidas.length} referencias · espresso-base, en caliente`}>
        {CARTA_DATA.bebidas.map((it,i)=><RatioCard key={i} it={it} i={i}/>)}
      </Section>

      <Section num="02" title="Fríos" subtitle={`${CARTA_DATA.frios.length} referencias · temperatura baja, tiempo largo`}>
        {CARTA_DATA.frios.map((it,i)=><RatioCard key={i} it={it} i={i}/>)}
      </Section>

      <Section num="03" title="Filtrados" subtitle={`${CARTA_DATA.filtrados.length} referencia · extracción por goteo`}>
        {CARTA_DATA.filtrados.map((it,i)=><RatioCard key={i} it={it} i={i}/>)}
      </Section>

      {/* Alcohol + Pastelería — two columns side by side */}
      <section style={{padding:'80px 48px', background:T.bgAlt}}>
        <div style={{maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1.6fr', gap:80, alignItems:'start'}}>
          <div>
            <div style={{display:'flex', gap:20, alignItems:'baseline', marginBottom:24}}>
              <span className="idm-mono" style={{color:T.inkMuted}}>04</span>
              <h2 className="idm-display" style={{fontSize:56, margin:0, letterSpacing:'-0.03em'}}>Alcohol</h2>
            </div>
            {CARTA_DATA.alcohol.map((it,i)=>(
              <article key={i} style={{padding:'24px 0', borderBottom:`1px solid ${T.rule}`,
                     display:'flex', justifyContent:'space-between', alignItems:'baseline', gap:24}}>
                <div>
                  <div style={{fontFamily:T.display, fontSize:26, letterSpacing:'-0.02em'}}>{it.name}</div>
                  <div style={{fontSize:13, color:T.inkSoft, marginTop:6}}>
                    {it.es.join(' · ')}
                    <span style={{color:T.inkMuted, fontStyle:'italic', marginLeft:8}}>{it.en.join(' · ')}</span>
                  </div>
                </div>
                <span style={{fontFamily:T.mono, fontSize:13}}>{it.price}</span>
              </article>
            ))}
          </div>
          <div>
            <div style={{display:'flex', gap:20, alignItems:'baseline', marginBottom:24}}>
              <span className="idm-mono" style={{color:T.inkMuted}}>05</span>
              <h2 className="idm-display" style={{fontSize:56, margin:0, letterSpacing:'-0.03em'}}>Pastelería</h2>
            </div>
            {CARTA_DATA.pasteleria.map((it,i)=><PastryCard key={i} it={it} i={i}/>)}
          </div>
        </div>
      </section>

      {/* Closing note */}
      <section style={{padding:'120px 48px', textAlign:'center'}}>
        <div className="idm-mono" style={{color:T.inkSoft, marginBottom:24}}>Fin de la carta</div>
        <div style={{fontFamily:T.display, fontSize:44, letterSpacing:'-0.025em', lineHeight:1.2, maxWidth:880, margin:'0 auto'}}>
          Todo lo que servimos cabe en esta página.<br/>
          <span style={{color:T.taupe}}>Preferimos que sea así.</span>
        </div>
      </section>

      <IndomitoFooter/>
    </div>
  );
}

Object.assign(window, { CartaV1, CartaV2, CartaV3 });
