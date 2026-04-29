// Agenda — eventos, TRAZA, paisajes sonoros

const TT = INDOMITO_TOKENS;
const mono = '"JetBrains Mono", ui-monospace, monospace';
const monoColor = '#8B6F47';

// ── Cover ─────────────────────────────────────────────────────
function AgendaCover() {
  const isMobile = useIsMobile();
  return (
    <header style={{margin: isMobile ? '0 16px' : '0 48px',
                    padding: isMobile ? '48px 0 64px' : '80px 0 120px',
                    borderTop:`1px solid ${TT.ink}`, borderBottom:`1px solid ${TT.ink}`,
                    textAlign:'center'}}>
      <div className="idm-mono" style={{fontFamily:mono, color:monoColor, letterSpacing:'.22em', marginBottom:24, fontSize: isMobile ? 11 : 15}}>
        Mmxxvi · calendario
      </div>
      <h1 style={{fontFamily:TT.display, fontSize:'clamp(64px, 14vw, 220px)', fontWeight:300, margin:0,
                  letterSpacing:'-0.05em', lineHeight:.82}}>
        Agenda
      </h1>
      <div style={{maxWidth:560, margin: isMobile ? '32px auto 0' : '56px auto 0',
                   fontFamily:TT.display, fontSize: isMobile ? 16 : 18, lineHeight:1.65, color:'rgb(26,26,25)'}}>
        Lo que hacemos.
      </div>
      <div className="idm-mono" style={{fontFamily:mono, color:monoColor, fontWeight:600, fontSize:11, marginTop: isMobile ? 24 : 36, letterSpacing:'.18em'}}>
        Indómito Café · Buenos Aires
      </div>
      <div style={{position:'relative', width:'100%', height: isMobile ? 240 : 560,
                   marginTop: isMobile ? 32 : 56, marginBottom: isMobile ? -48 : -80, overflow:'hidden'}}>
        <img src="assets/fotos%20para%20Club/cenitalbandeja.jpg"
             style={{position:'absolute', inset:0, width:'100%', height:'100%',
                     objectFit:'cover', objectPosition:'center center', display:'block'}}/>
      </div>
    </header>
  );
}

// ── Section head ──────────────────────────────────────────────
function AgendaSectionHead({ num, label, title }) {
  const isMobile = useIsMobile();
  return (
    <div style={{display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr',
                 gap: isMobile ? 8 : 72,
                 padding: isMobile ? '56px 0 28px' : '120px 0 48px',
                 borderBottom:`1px solid ${TT.rule}`, marginBottom: isMobile ? 28 : 48, alignItems:'end'}}>
      <h2 style={{fontFamily:TT.display, fontSize:'clamp(32px, 6vw, 88px)', margin:0, fontWeight:400,
                  letterSpacing:'-0.04em', lineHeight:.95}}>
        {title}
      </h2>
      <div style={{paddingBottom: isMobile ? 0 : 16}}>
        <div className="idm-mono" style={{fontFamily:mono, color:monoColor, letterSpacing:'.22em', marginBottom:6}}>
          {num}
        </div>
        <div className="idm-mono" style={{fontFamily:mono, color:monoColor, letterSpacing:'.18em'}}>
          {label}
        </div>
      </div>
    </div>
  );
}

// ── Evento row ────────────────────────────────────────────────
function AgendaEventRow({ code, title, date, desc, estado }) {
  const isMobile = useIsMobile();
  const isLista = estado === 'lista';
  return (
    <div style={{display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr',
                 gap: isMobile ? 20 : 72,
                 padding: isMobile ? '32px 0' : '48px 0',
                 borderBottom:`1px dotted ${TT.rule}`, alignItems:'start'}}>
      <div>
        <div className="idm-mono" style={{fontFamily:mono, color:monoColor, letterSpacing:'.22em', fontSize:11, marginBottom:16}}>
          {code}
        </div>
        <h3 style={{fontFamily:TT.display, fontSize:'clamp(32px, 4vw, 48px)', fontWeight:400, margin:'0 0 20px',
                    letterSpacing:'-0.035em', lineHeight:1.05}}>
          {title}
        </h3>
        <p style={{fontFamily:TT.display, fontSize:17, lineHeight:1.65, margin:0,
                   color:TT.ink, maxWidth:520, letterSpacing:'-0.015em'}}>
          {desc}
        </p>
      </div>
      <div style={{paddingTop:8, borderTop:`1px solid ${TT.rule}`}}>
        <div className="idm-mono" style={{fontFamily:mono, color:monoColor, letterSpacing:'.14em', marginBottom:20}}>
          {date}
        </div>
        <a href="Indomito Cafe - Eventos.html" className="idm-hover-underline"
           style={{fontFamily:TT.display, fontSize:20, fontWeight:500,
                   color:TT.ink, textDecoration:'none', letterSpacing:'-0.015em', display:'block', marginBottom:12}}>
          {isLista ? 'Anotarme →' : 'Reservar →'}
        </a>
        <div className="idm-mono" style={{fontFamily:mono, color:monoColor, letterSpacing:'.14em', fontSize:11}}>
          · {isLista ? 'fecha por confirmar' : 'cupos limitados'}
        </div>
      </div>
    </div>
  );
}

// ── Playlist row ──────────────────────────────────────────────
function PlaylistRow({ num, title, sub, href }) {
  const isMobile = useIsMobile();
  return (
    <div style={{display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr',
                 gap: isMobile ? 8 : 72,
                 padding: isMobile ? '24px 0' : '32px 0',
                 borderBottom:`1px dotted ${TT.rule}`, alignItems:'baseline'}}>
      <div style={{display:'flex', alignItems:'baseline', gap:20}}>
        <span className="idm-mono" style={{fontFamily:mono, color:TT.inkMuted, fontSize:11}}>{num}</span>
        <div>
          <div style={{fontFamily:TT.display, fontSize:22, fontWeight:400,
                       letterSpacing:'-0.02em', marginBottom:6}}>{title}</div>
          <div className="idm-mono" style={{fontFamily:mono, color:monoColor, letterSpacing:'.12em', fontSize:11}}>{sub}</div>
        </div>
      </div>
      <div>
        <a href={href || 'https://open.spotify.com'} className="idm-hover-underline"
           style={{fontFamily:mono, fontSize:11, color:monoColor, textDecoration:'none', letterSpacing:'.14em'}}>
          Escuchar en Spotify →
        </a>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────
function AgendaPage() {
  const isMobile = useIsMobile();
  return (
    <div className="idm-root" style={{width:'100%', background:TT.bg}}>
      <IndomitoNav/>
      <AgendaCover/>

      {/* I · Próximos */}
      <section style={{padding: isMobile ? '0 20px' : '0 48px'}}>
        <AgendaSectionHead num="I" label="Próximos" title="Nuestro ecosistema vive."/>
        <AgendaEventRow
          code="Ev.02 · Laboratorio Sensorial"
          title="Jamaica"
          date="Mayo · Junio 2026"
          desc="Burru, ska, rocksteady, reggae, dub, dancehall — una historia completa. Café de proceso natural. Noventa minutos de presencia."
          estado="abierto"
        />
        <AgendaEventRow
          code="Ev.03 · Laboratorio Sensorial"
          title="Fuelles & Fermento"
          date="2026 · por confirmar"
          desc="Bandoneón y fermentación. Dos procesos lentos, dos resultados únicos. Próxima sesión en preparación."
          estado="lista"
        />
      </section>

      {/* II · TRAZA */}
      <section style={{padding: isMobile ? '0 20px' : '0 48px'}}>
        <AgendaSectionHead num="II" label="Newsletter impreso" title="TRAZA."/>
        <div style={{display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr',
                     gap: isMobile ? 32 : 72, padding: isMobile ? '0 0 56px' : '0 0 80px', alignItems:'start'}}>
          <div>
            <p style={{fontFamily:TT.display, fontSize:17, lineHeight:1.65, margin:'0 0 32px',
                       color:TT.ink, maxWidth:560}}>
              Un newsletter escrito a máquina en una Olivetti de los 80.
              Llega impreso, por correo. Editoriales, notas, ideas — en papel, con error de tipeo incluido.
            </p>
            <p style={{fontFamily:TT.display, fontSize:17, lineHeight:1.65, margin:0,
                       color:TT.inkSoft, maxWidth:560}}>
              <span style={{color:TT.taupe, fontStyle:'italic'}}>TRAZA llega a miembros del Club Sensorial.</span>{' '}
              Primer número en preparación.
            </p>
          </div>
          <div style={{borderTop:`1px solid ${TT.rule}`, paddingTop:24}}>
            {[
              {k:'Formato',  v:'impreso · correo físico'},
              {k:'Cadencia', v:'mensual'},
              {k:'Acceso',   v:'miembros del Club'},
            ].map((r,i) => (
              <div key={i} style={{display:'grid', gridTemplateColumns:'1fr auto', gap:20,
                                    padding:'14px 0', borderBottom:`1px dotted ${TT.rule}`, alignItems:'baseline'}}>
                <div className="idm-mono" style={{fontFamily:mono, color:monoColor, letterSpacing:'.14em'}}>{r.k}</div>
                <div style={{fontFamily:TT.display, fontSize:17, letterSpacing:'-0.018em'}}>{r.v}</div>
              </div>
            ))}
            <div style={{marginTop:28}}>
              <a href="Indomito Cafe - Club.html" className="idm-hover-underline"
                 style={{fontFamily:TT.display, fontSize:18, fontWeight:500,
                         color:TT.ink, textDecoration:'none', letterSpacing:'-0.015em'}}>
                Conocer el Club →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* III · Paisajes Sonoros */}
      <section style={{padding: isMobile ? '0 20px 80px' : '0 48px 140px'}}>
        <AgendaSectionHead num="III" label="Playlists" title="Paisajes Sonoros."/>
        <PlaylistRow
          num="01"
          title="Nathan Larson — Shudder To Think"
          sub="Post-hardcore · ambient · Washington DC"
        />
        <PlaylistRow
          num="02"
          title="Jamaica · Pressure Bloom"
          sub="Burru · ska · rocksteady · reggae · dub"
        />
      </section>

      <IndomitoFooter/>
    </div>
  );
}

Object.assign(window, { AgendaPage, AgendaCover, AgendaSectionHead, AgendaEventRow, PlaylistRow });
