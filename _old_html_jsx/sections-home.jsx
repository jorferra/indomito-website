// Homepage sections for Indómito — matches the supplied copy deck.
// Replaces the earlier placeholder sections. All copy is verbatim or
// tightly adapted from the brief.

// ── 01 · Próximo evento ─────────────────────────────────────
function SectionProximoEvento({ numeric='01' }) {
  return (
    <section style={{padding:'0 48px 140px', borderTop:`1px solid ${INDOMITO_TOKENS.rule}`}}>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:0, minHeight:640}}>
        <IdmPhoto variant="event" caption="Laboratorio Sensorial · Edición 02" style={{minHeight:640}}/>
        <div style={{background:INDOMITO_TOKENS.ink, color:INDOMITO_TOKENS.bg, padding:'80px 72px', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
          <div>
            <div style={{fontFamily:INDOMITO_TOKENS.mono, fontSize:11, letterSpacing:'.18em', textTransform:'uppercase', opacity:.65, marginBottom:28}}>
              {numeric} / Próximo evento
            </div>
            <h2 className="idm-display" style={{fontSize:80, margin:'0 0 24px', letterSpacing:'-0.032em', lineHeight:.98}}>
              Jamaica:<br/>Pressure Bloom.
            </h2>
            <div className="idm-mono" style={{fontSize:11, letterSpacing:'.18em', textTransform:'uppercase', opacity:.7, marginBottom:32}}>
              Laboratorio Sensorial · Edición 02
            </div>
            <p style={{fontSize:16, lineHeight:1.6, maxWidth:480, margin:0, opacity:.82}}>
              Un recorrido sensorial guiado desde las montañas Blue Mountain
              hasta los sound systems de Kingston. Café de origen único y seis
              estaciones musicales: burro, ska, rocksteady, reggae, dub, dancehall.
            </p>
          </div>
          <div style={{marginTop:56, display:'grid', gridTemplateColumns:'1fr 1fr auto', gap:24, alignItems:'baseline', paddingTop:28, borderTop:'1px solid rgba(244,241,236,.18)'}}>
            <div>
              <div className="idm-mono" style={{fontSize:11, letterSpacing:'.18em', textTransform:'uppercase', opacity:.55, marginBottom:8}}>Ciudad · Fecha</div>
              <div style={{fontFamily:INDOMITO_TOKENS.display, fontSize:20, letterSpacing:'-0.02em'}}>Buenos Aires · 17 May</div>
            </div>
            <div>
              <div className="idm-mono" style={{fontSize:11, letterSpacing:'.18em', textTransform:'uppercase', opacity:.55, marginBottom:8}}>Duración</div>
              <div style={{fontFamily:INDOMITO_TOKENS.display, fontSize:20, letterSpacing:'-0.02em'}}>90 min · 14 personas</div>
            </div>
            <button className="idm-btn" style={{borderColor:INDOMITO_TOKENS.bg, color:INDOMITO_TOKENS.bg}}>Reservar →</button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 02 · Qué es Indómito ────────────────────────────────────
function SectionQueEs({ numeric='02' }) {
  return (
    <section style={{padding:'140px 48px', borderTop:`1px solid ${INDOMITO_TOKENS.rule}`}}>
      <div style={{maxWidth:1040, margin:'0 auto'}}>
        <SectionLabel num={numeric}>Qué es Indómito</SectionLabel>
        <p className="idm-display" style={{fontSize:44, lineHeight:1.22, margin:'40px 0 56px', letterSpacing:'-0.02em'}}>
          Indómito nació en un living, entre vinilos, café y conversaciones largas.
          Hoy es un refugio sensorial donde lo analógico, lo ritual y lo compartido
          encuentran forma.
        </p>
        <div style={{display:'flex', gap:16}}>
          <button className="idm-btn">Leer más en Origen →</button>
        </div>
      </div>
    </section>
  );
}

// ── 03 · Diario Sensorial preview ───────────────────────────
function SectionDiario({ numeric='03' }) {
  const entries = [
    { code:'M · 24', mood:'Niebla alta', coffee:'Gogogu · Etiopía',       sound:'Arthur Russell — Tower of Meaning', variant:'milk',    body:'Una luz baja, una taza que se demora. Escuchar hasta que la niebla tome forma.' },
    { code:'M · 23', mood:'Claridad lenta', coffee:'La Esperanza · Colombia', sound:'Alice Coltrane — Turiya Sings',  variant:'hands',   body:'El momento después del primer sorbo, cuando todo lo demás deja de competir por atención.' },
    { code:'M · 22', mood:'Ruido suave',  coffee:'Ambiental · Brasil',      sound:'Laraaji — Sun Gong',               variant:'beans',   body:'Un café cargado de cacao. Un disco que no termina. El mundo, esperando afuera.' },
  ];
  return (
    <section style={{padding:'0 48px 140px', borderTop:`1px solid ${INDOMITO_TOKENS.rule}`}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', padding:'80px 0 16px', gap:40}}>
        <div style={{display:'flex', alignItems:'baseline', gap:28}}>
          <SectionLabel num={numeric}>Diario Sensorial</SectionLabel>
          <h2 className="idm-display" style={{fontSize:72, margin:0, letterSpacing:'-0.028em', lineHeight:1}}>
            Un archivo visual y sonoro.
          </h2>
        </div>
        <a href="#" className="idm-hover-underline idm-mono" style={{color:INDOMITO_TOKENS.inkSoft}}>Ver Diario completo →</a>
      </div>
      <p style={{maxWidth:640, margin:'0 0 56px', fontSize:16, lineHeight:1.6, color:INDOMITO_TOKENS.inkSoft}}>
        Cada pieza reúne imagen, bebida y escucha en una misma unidad.
        Entrá por clima, por momento del día o por el café en tu taza.
      </p>
      <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24}}>
        {entries.map(e => (
          <article key={e.code} style={{display:'flex', flexDirection:'column'}}>
            <IdmPhoto variant={e.variant} style={{aspectRatio:'4/5', marginBottom:20}}/>
            <div className="idm-mono" style={{color:INDOMITO_TOKENS.inkSoft, marginBottom:10, display:'flex', justifyContent:'space-between'}}>
              <span>{e.code}</span><span>Mood</span>
            </div>
            <h3 style={{fontFamily:INDOMITO_TOKENS.display, fontSize:28, margin:'0 0 14px', letterSpacing:'-0.02em', lineHeight:1.05}}>{e.mood}</h3>
            <p style={{fontSize:14.5, lineHeight:1.55, margin:'0 0 20px'}}>{e.body}</p>
            <div style={{marginTop:'auto', paddingTop:16, borderTop:`1px solid ${INDOMITO_TOKENS.rule}`, display:'grid', gap:4}}>
              <div className="idm-mono" style={{color:INDOMITO_TOKENS.inkSoft}}>Café · {e.coffee}</div>
              <div className="idm-mono" style={{color:INDOMITO_TOKENS.inkSoft}}>Sonido · {e.sound}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ── 04 · Club Sensorial preview ─────────────────────────────
function SectionClub({ numeric='04' }) {
  const capas = [
    { t:'Paisajes sonoros',  b:'Playlists vivas en Spotify para distintos momentos del día y del café.' },
    { t:'Frecuencias en vivo',b:'Sesiones de escucha transmitidas en directo, con artista, álbum y arte visibles en cada track.' },
    { t:'Tostado & Girado',  b:'Café y vinilo. Un disco entero, sin interrupciones, con todas las frecuencias activadas.', micro:'Última edición · Kind Of Blue · Miles Davis · 1959' },
    { t:'Laboratorio Sensorial', b:'Noventa minutos donde café, música y narrativa técnica avanzan en paralelo, de cereza a taza.' },
  ];
  return (
    <section style={{background:INDOMITO_TOKENS.bgAlt, padding:'100px 48px', borderTop:`1px solid ${INDOMITO_TOKENS.rule}`}}>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1.5fr', gap:80, alignItems:'start'}}>
        <div style={{position:'sticky', top:40}}>
          <SectionLabel num={numeric}>Club Sensorial</SectionLabel>
          <h2 className="idm-display" style={{fontSize:80, margin:'28px 0 28px', letterSpacing:'-0.032em', lineHeight:.98}}>
            Para quienes viven el café como ritual.
          </h2>
          <p style={{fontSize:16, lineHeight:1.6, margin:'0 0 24px', maxWidth:420}}>
            El eje privado de Indómito: café del mes, acceso anticipado a experiencias
            y un ecosistema de escucha que se expande fuera de redes.
          </p>
          <button className="idm-btn idm-btn--solid">Solicitar acceso →</button>
        </div>
        <div>
          <div style={{fontFamily:INDOMITO_TOKENS.mono, fontSize:11, letterSpacing:'.18em', textTransform:'uppercase', color:INDOMITO_TOKENS.inkSoft, paddingBottom:18, borderBottom:`1px solid ${INDOMITO_TOKENS.rule}`, marginBottom:0}}>
            Capas del Club
          </div>
          {capas.map((c,i)=>(
            <div key={c.t} style={{display:'grid', gridTemplateColumns:'40px 1fr', gap:32, padding:'28px 0', borderBottom:`1px solid ${INDOMITO_TOKENS.rule}`, alignItems:'baseline'}}>
              <div className="idm-mono" style={{color:INDOMITO_TOKENS.inkSoft}}>{String(i+1).padStart(2,'0')}</div>
              <div>
                <div style={{fontFamily:INDOMITO_TOKENS.display, fontSize:28, letterSpacing:'-0.02em', marginBottom:8}}>{c.t}</div>
                <p style={{fontSize:15, lineHeight:1.55, margin:0, color:INDOMITO_TOKENS.ink}}>{c.b}</p>
                {c.micro && <div className="idm-mono" style={{color:INDOMITO_TOKENS.inkSoft, marginTop:10}}>{c.micro}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 05 · Sistema Portátil ───────────────────────────────────
function SectionSistemaPortatil({ numeric='05' }) {
  return (
    <section style={{padding:'0 48px 140px', borderTop:`1px solid ${INDOMITO_TOKENS.rule}`}}>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:0, minHeight:560, marginTop:0}}>
        <div style={{background:INDOMITO_TOKENS.bg, padding:'96px 72px 80px', display:'flex', flexDirection:'column', justifyContent:'space-between', borderRight:`1px solid ${INDOMITO_TOKENS.rule}`}}>
          <div>
            <SectionLabel num={numeric}>Sistema Portátil</SectionLabel>
            <h2 className="idm-display" style={{fontSize:72, margin:'28px 0 28px', letterSpacing:'-0.028em', lineHeight:1}}>
              Una atmósfera que viaja.
            </h2>
            <p style={{fontSize:16, lineHeight:1.6, maxWidth:440, margin:'0 0 24px'}}>
              Café de especialidad, pastelería artesanal y curaduría musical
              para reuniones, lanzamientos, cenas y eventos cuidados.
            </p>
            <ul style={{listStyle:'none', padding:0, margin:0, display:'grid', gap:10, fontSize:14.5, color:INDOMITO_TOKENS.ink}}>
              {[
                'Reuniones, cenas, lanzamientos y encuentros de escala media.',
                'Café de especialidad preparado en el momento.',
                'Pastelería artesanal dulce y salada.',
                'Curaduría musical integrada al clima del espacio.',
              ].map((x,i)=>(
                <li key={i} style={{display:'grid', gridTemplateColumns:'14px 1fr', gap:14, alignItems:'baseline'}}>
                  <span style={{width:6, height:6, borderRadius:'50%', background:INDOMITO_TOKENS.taupe, marginTop:8}}/>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
          <button className="idm-btn" style={{alignSelf:'flex-start', marginTop:48}}>Escribir por Sistema Portátil →</button>
        </div>
        <IdmPhoto variant="event" caption="Sistema Portátil · Colección privada, 2026" style={{minHeight:560}}/>
      </div>
    </section>
  );
}

// ── 06 · Carta (acceso mínimo) ──────────────────────────────
function SectionCarta({ numeric='06' }) {
  const rows = [
    { name:'Espresso',       tech:'40 ml · 89 °C · 25–30 s',           note:'Intenso y directo.',           price:'$4300' },
    { name:'Flat White',     tech:'40 ml espresso + 120 ml leche',      note:'Cremoso y firme. Clásico sin exceso.', price:'$5000' },
    { name:'Latte',          tech:'30 ml espresso + 180 ml leche',      note:'Abierto, suave. Café en calma.', price:'$5000' },
    { name:'Chemex / Origami', tech:'Filtrado · 89 °C',                 note:'Extracción limpia. Claridad y pausa.', price:'$5600' },
    { name:'Espresso Tonic', tech:'Café y burbuja',                     note:'Amargo tenso.',                price:'$5500' },
    { name:'Cold Brew · Orange', tech:'Tiempo, no presión',             note:'Frío. Continuo.',              price:'$5500' },
  ];
  return (
    <section style={{padding:'0 48px 140px', borderTop:`1px solid ${INDOMITO_TOKENS.rule}`}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', padding:'80px 0 32px', gap:40}}>
        <div style={{display:'flex', alignItems:'baseline', gap:28}}>
          <SectionLabel num={numeric}>Carta</SectionLabel>
          <h2 className="idm-display" style={{fontSize:72, margin:0, letterSpacing:'-0.028em', lineHeight:1}}>
            Tiempo con precisión.
          </h2>
        </div>
        <a href="#" className="idm-hover-underline idm-mono" style={{color:INDOMITO_TOKENS.inkSoft}}>Ver Carta completa →</a>
      </div>
      <p style={{maxWidth:640, margin:'0 0 40px', fontSize:16, lineHeight:1.6, color:INDOMITO_TOKENS.inkSoft}}>
        Café de especialidad, bebidas y pastelería artesanal. Extraemos a 89 °C
        para preservar el equilibrio.
      </p>
      <div style={{borderTop:`1px solid ${INDOMITO_TOKENS.rule}`}}>
        {rows.map((r,i)=>(
          <div key={i} style={{display:'grid', gridTemplateColumns:'1.5fr 1.3fr 1.6fr auto', gap:32, alignItems:'baseline', padding:'24px 0', borderBottom:`1px solid ${INDOMITO_TOKENS.rule}`}}>
            <div style={{fontFamily:INDOMITO_TOKENS.display, fontSize:26, letterSpacing:'-0.02em'}}>{r.name}</div>
            <div className="idm-mono" style={{color:INDOMITO_TOKENS.inkSoft}}>{r.tech}</div>
            <div style={{fontSize:14.5, color:INDOMITO_TOKENS.ink}}>{r.note}</div>
            <div style={{fontFamily:INDOMITO_TOKENS.display, fontSize:22, letterSpacing:'-0.02em', textAlign:'right'}}>{r.price}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── 07 · Contacto ──────────────────────────────────────────
function SectionContacto({ numeric='07' }) {
  return (
    <section style={{padding:'0 48px 140px'}}>
      <div style={{borderTop:`1px solid ${INDOMITO_TOKENS.rule}`, padding:'80px 0 0'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 2.2fr', gap:80, alignItems:'start'}}>
          <SectionLabel num={numeric}>Contacto</SectionLabel>
          <div>
            <h2 className="idm-display" style={{fontSize:72, margin:'0 0 56px', letterSpacing:'-0.028em', lineHeight:1}}>
              Escribí, pasá, escuchá.
            </h2>
            <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:24}}>
              {[
                { k:'WhatsApp',  v:'+54 9 11 6046 3980' },
                { k:'Instagram', v:'@indomito_cafe' },
                { k:'Dirección', v:'Caballito · CABA' },
                { k:'Horarios',  v:'Mar–Dom · 09–19h' },
              ].map(x=>(
                <div key={x.k}>
                  <div className="idm-mono" style={{color:INDOMITO_TOKENS.inkSoft, marginBottom:10}}>{x.k}</div>
                  <div style={{fontFamily:INDOMITO_TOKENS.display, fontSize:22, letterSpacing:'-0.02em'}}>{x.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, {
  SectionProximoEvento, SectionQueEs, SectionDiario, SectionClub,
  SectionSistemaPortatil, SectionCarta, SectionContacto,
});
