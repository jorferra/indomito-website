import React from 'react';
import { useIsMobile, INDOMITO_TOKENS, IndomitoNav, IndomitoFooter, PageCover, PageSectionHeader, PageSpread } from './shared';

const TM = INDOMITO_TOKENS;
const mono = '"JetBrains Mono", ui-monospace, monospace';
const monoColor = '#8B6F47';

function MediaCover() {
  return (
    <PageCover
      eyebrow="Mmxxvi · ARCHIVO"
      title="Media"
      dek={{
        content: (
          <>
            Sonidos, sesiones
            <br />
            y transmisiones.
          </>
        ),
        maxWidth: 620,
      }}
      meta="Spotify · Twitch · Archivo"
      imageSrc="assets/bandex1.png"
      imageAlt="Indómito Media"
    />
  );
}

function MediaCard({ num, title, href, sub }) {
  const isMobile = useIsMobile();
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="idm-hover-underline"
      style={{
        display: 'block',
        border: `1px solid ${TM.rule}`,
        background: TM.bgAlt,
        padding: isMobile ? '18px' : '24px',
        textDecoration: 'none',
        color: TM.ink,
      }}
    >
      <div className="idm-mono" style={{fontFamily: mono, color: monoColor, letterSpacing: '.18em', fontSize: 10, marginBottom: 14}}>
        {num}
      </div>
      <div style={{fontFamily: TM.display, fontSize: isMobile ? 28 : 32, fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 1.04, marginBottom: 8}}>
        {title}
      </div>
      <div className="idm-mono" style={{fontFamily: mono, color: monoColor, letterSpacing: '.12em', fontSize: 10, lineHeight: 1.5, marginBottom: 18}}>
        {sub}
      </div>
      <div style={{fontFamily: TM.display, fontSize: 18, fontWeight: 500, letterSpacing: '-0.015em'}}>
        Abrir en Spotify →
      </div>
    </a>
  );
}

function TwitchSlot() {
  const isMobile = useIsMobile();
  return (
    <div style={{
      border: `1px solid ${TM.rule}`,
      background: TM.bgAlt,
      padding: isMobile ? '18px' : '24px',
    }}>
      <div style={{
        aspectRatio: '16 / 9',
        border: `1px dashed ${TM.rule}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        textAlign: 'center',
      }}>
        <div>
          <div className="idm-mono" style={{fontFamily: mono, color: monoColor, letterSpacing: '.2em', marginBottom: 12}}>
            Twitch
          </div>
          <div style={{fontFamily: TM.display, fontSize: isMobile ? 18 : 22, lineHeight: 1.35, letterSpacing: '-0.02em'}}>
            Slot listo para livestreams
          </div>
        </div>
      </div>
    </div>
  );
}

function MediaPage() {
  const isMobile = useIsMobile();
  return (
    <div className="idm-root" style={{width: '100%', background: TM.bg}}>
      <IndomitoNav />
      <MediaCover />

      <section style={{padding: isMobile ? '24px 20px 0' : '40px 48px 0'}}>
        <PageSectionHeader num="I" label="Archivo" title="Paisajes sonoros." />

        <div style={{display: 'grid', gap: 16, marginBottom: isMobile ? 56 : 80}}>
          <MediaCard
            num="Paisaje Sonoro #01"
            title="Andrés"
            sub="Playlist · curaduría de Andrés"
            href="https://open.spotify.com/playlist/3sF6ysY3EOqixepQqtpSUB?si=4e9c2d0093ed425f"
          />
          <MediaCard
            num="Paisaje Sonoro #02"
            title="Jor"
            sub="Playlist · curaduría de Jor"
            href="https://open.spotify.com/playlist/6Lov7CikaA4zBBvO7j8FHz?si=422799c8831b49d7"
          />
          <MediaCard
            num="Paisaje Sonoro #03"
            title="Nathan Larson"
            sub="Playlist · curaduría de Nathan Larson"
            href="https://open.spotify.com/playlist/6PomRknQAymlCrGx71xiEI?si=8d7f254470e24711"
          />
        </div>
      </section>

      <section style={{padding: isMobile ? '64px 20px 80px' : '96px 48px 140px'}}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr',
          gap: isMobile ? 32 : 72,
          alignItems: 'start',
        }}>
          <div>
            <div className="idm-mono" style={{fontFamily: mono, color: monoColor, letterSpacing: '.22em', marginBottom: 16}}>
              En vivo
            </div>
            <p style={{
              fontFamily: TM.display,
              fontSize: isMobile ? 20 : 24,
              lineHeight: 1.55,
              margin: 0,
              color: TM.ink,
              maxWidth: 560,
            }}>
              Cuando haya transmisiones, este espacio puede alojar el embed de Twitch o sesiones en directo.
            </p>
          </div>
          <TwitchSlot />
        </div>
      </section>

      <IndomitoFooter />
    </div>
  );
}

export default MediaPage;
