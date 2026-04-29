import React, { useEffect, useRef, useState, useMemo } from 'react';
function GrainOverlay() {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const ctx  = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = canvas.clientWidth  * dpr;
      canvas.height = canvas.clientHeight * dpr;
    };
    resize();
    window.addEventListener('resize', resize);

    // Bake grain once
    const grain = document.createElement('canvas');
    const bake = () => {
      grain.width  = canvas.width;
      grain.height = canvas.height;
      const gc = grain.getContext('2d');
      gc.scale(dpr, dpr);
      const W = canvas.clientWidth, H = canvas.clientHeight;
      let gs = 13337;
      const gr = () => { gs = (gs * 1664525 + 1013904223) & 0xffffffff; return (gs >>> 0) / 0xffffffff; };
      for (let i = 0; i < 900; i++) {
        const x = gr() * W, y = gr() * H, r = 0.4 + gr() * 0.9, ang = gr() * Math.PI;
        gc.save(); gc.translate(x, y); gc.rotate(ang);
        gc.beginPath(); gc.ellipse(0, 0, r * 2.5, r * 0.4, 0, 0, Math.PI * 2);
        gc.fillStyle = `rgba(42,28,14,${(0.04 + gr() * 0.06).toFixed(3)})`; gc.fill();
        gc.restore();
      }
    };
    bake();

    let raf;
    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(grain, 0, 0, W, H);
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        opacity: 0.18,
        pointerEvents: 'none',
        mixBlendMode: 'multiply',
      }}
    />
  );
}

function AmbientVisualizer() {
  const VIDEOS = [
    'assets/853761-hd_1920_1080_25fps.mp4',
    'assets/2849945-uhd_3840_2160_24fps.mp4',
    'assets/2853789-uhd_3840_2160_24fps.mp4',
    'assets/2853794-uhd_3840_2160_24fps.mp4',
  ];

  const src = React.useMemo(
    () => VIDEOS[Math.floor(Math.random() * VIDEOS.length)],
    []
  );

  return (
    <div style={{ position: 'relative', width: '100%', height: 560, marginTop: 40, marginBottom: -80, overflow: 'hidden' }}>
      <video
        key={src}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
          display: 'block',
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
      <GrainOverlay />
    </div>
  );
}

export default AmbientVisualizer;
