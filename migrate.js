const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
if (!fs.existsSync(srcDir)) fs.mkdirSync(srcDir);

const filesToMove = [
  'shared.jsx',
  'ambient-visualizer.jsx',
  'carta-data.jsx',
  'carta-v1-remixes.jsx',
  'sistema-portatil-page.jsx',
  'agenda-page.jsx',
  'eventos-page.jsx',
  'club-page.jsx',
  'tienda-page.jsx',
  'origen-page.jsx',
  'contacto-page.jsx',
  'homepage-page-v2.jsx'
];

// Helper to replace links in shared.jsx
let sharedContent = fs.readFileSync('shared.jsx', 'utf-8');
// Fix Window assignments
sharedContent = sharedContent.replace(/Object\.assign\(window,\s*\{([\s\S]*?)\}\);/, 'export { $1 };');
// Fix NAV_LINKS
sharedContent = sharedContent.replace(/'Indomito Cafe - Carta\.html'/g, "'/carta'");
sharedContent = sharedContent.replace(/'Indomito Cafe - Sistema Portatil\.html'/g, "'/servicio'");
sharedContent = sharedContent.replace(/'Indomito Cafe - Agenda\.html'/g, "'/agenda'");
sharedContent = sharedContent.replace(/'Indomito Cafe - Eventos\.html'/g, "'/laboratorio'");
sharedContent = sharedContent.replace(/'Indomito Cafe - Club\.html'/g, "'/club'");
sharedContent = sharedContent.replace(/'Indomito Cafe - Tienda\.html'/g, "'/tienda'");
sharedContent = sharedContent.replace(/'Indomito Cafe - Origen\.html'/g, "'/nosotros'");
sharedContent = sharedContent.replace(/'Indomito Cafe - Contacto\.html'/g, "'/contacto'");
sharedContent = sharedContent.replace(/'index\.html'/g, "'/'");
// Change <a> to <Link> for internal links
sharedContent = `import React from 'react';\nimport { Link } from 'react-router-dom';\n` + sharedContent;
sharedContent = sharedContent.replace(/<a([^>]*href=['"]\/[^'"]*['"][^>]*)>/g, '<Link$1>');
sharedContent = sharedContent.replace(/<\/a>/g, '</Link>');
// Replace class -> className just in case? React already uses className in these files probably.
fs.writeFileSync(path.join(srcDir, 'shared.jsx'), sharedContent);

// ambient visualizer
let ambientContent = fs.readFileSync('ambient-visualizer.jsx', 'utf-8');
ambientContent = `import React, { useEffect, useRef, useState, useMemo } from 'react';\n` + ambientContent;
ambientContent = ambientContent.replace(/Object\.assign\(window,\s*\{([\s\S]*?)\}\);/, 'export default AmbientVisualizer;');
fs.writeFileSync(path.join(srcDir, 'ambient-visualizer.jsx'), ambientContent);

// carta data
if (fs.existsSync('carta-data.jsx')) {
  let cartaData = fs.readFileSync('carta-data.jsx', 'utf-8');
  cartaData = cartaData.replace(/Object\.assign\(window,\s*\{([\s\S]*?)\}\);/, 'export { $1 };');
  fs.writeFileSync(path.join(srcDir, 'carta-data.jsx'), cartaData);
}

// Pages
const pages = [
  { file: 'homepage-page-v2.jsx', export: 'HomepagePageV2' },
  { file: 'carta-v1-remixes.jsx', export: 'CartaPage' }, // assuming it exports CartaPage
  { file: 'sistema-portatil-page.jsx', export: 'SistemaPortatilPage' },
  { file: 'agenda-page.jsx', export: 'AgendaPage' },
  { file: 'eventos-page.jsx', export: 'EventosPage' },
  { file: 'club-page.jsx', export: 'ClubPage' },
  { file: 'tienda-page.jsx', export: 'TiendaPage' },
  { file: 'origen-page.jsx', export: 'OrigenPage' },
  { file: 'contacto-page.jsx', export: 'ContactoPage' }
];

const sharedExports = [
  'useIsMobile', 'INDOMITO_TOKENS', 'IndomitoMark', 'IndomitoNav', 'IndomitoFooter', 'IdmPhoto',
  'SectionLabel', 'SectionManifiesto', 'SectionCafe', 'SectionTienda', 'SectionSuscripcion',
  'SectionEventos', 'SectionPortatil', 'SectionEquipo', 'SectionNewsletter', 'Pillar', 'FooterCol'
].join(', ');

for (const p of pages) {
  if (!fs.existsSync(p.file)) continue;
  let content = fs.readFileSync(p.file, 'utf-8');
  
  // Find the export block
  const match = content.match(/Object\.assign\(window,\s*\{\s*(\w+)/);
  let exp = p.export;
  if (match) exp = match[1];
  
  content = content.replace(/Object\.assign\(window,[\s\S]*?\);/, `export default ${exp};`);
  
  // Replace links
  content = content.replace(/'Indomito Cafe - Carta\.html'/g, "'/carta'");
  content = content.replace(/'Indomito Cafe - Sistema Portatil\.html'/g, "'/servicio'");
  content = content.replace(/'Indomito Cafe - Agenda\.html'/g, "'/agenda'");
  content = content.replace(/'Indomito Cafe - Eventos\.html'/g, "'/laboratorio'");
  content = content.replace(/'Indomito Cafe - Club\.html'/g, "'/club'");
  content = content.replace(/'Indomito Cafe - Tienda\.html'/g, "'/tienda'");
  content = content.replace(/'Indomito Cafe - Origen\.html'/g, "'/nosotros'");
  content = content.replace(/'Indomito Cafe - Contacto\.html'/g, "'/contacto'");
  content = content.replace(/'index\.html'/g, "'/'");
  
  // Replace <a> with <Link> if it's internal
  content = content.replace(/<a([^>]*href=['"]\/[^'"]*['"][^>]*)>/g, '<Link$1>');
  content = content.replace(/<\/a>/g, '</Link>');
  
  let header = `import React from 'react';\nimport { Link } from 'react-router-dom';\nimport { ${sharedExports} } from './shared';\n`;
  if (content.includes('<AmbientVisualizer')) {
    header += `import AmbientVisualizer from './ambient-visualizer';\n`;
  }
  if (content.includes('CARTA_DATA') && fs.existsSync('carta-data.jsx')) {
    header += `import { CARTA_DATA } from './carta-data';\n`;
  }
  if (content.includes('CARTA_GROUPS') && fs.existsSync('carta-data.jsx')) {
    header += `import { CARTA_GROUPS } from './carta-data';\n`;
  }
  
  fs.writeFileSync(path.join(srcDir, p.file), header + content);
}

// Create vite.config.js
fs.writeFileSync('vite.config.js', `
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
`);

// Create src/App.jsx
fs.writeFileSync(path.join(srcDir, 'App.jsx'), `
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomepagePageV2 from './homepage-page-v2';
import CartaPage from './carta-v1-remixes';
import SistemaPortatilPage from './sistema-portatil-page';
import AgendaPage from './agenda-page';
import EventosPage from './eventos-page';
import ClubPage from './club-page';
import TiendaPage from './tienda-page';
import OrigenPage from './origen-page';
import ContactoPage from './contacto-page';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomepagePageV2 />} />
        <Route path="/carta" element={<CartaPage />} />
        <Route path="/servicio" element={<SistemaPortatilPage />} />
        <Route path="/agenda" element={<AgendaPage />} />
        <Route path="/laboratorio" element={<EventosPage />} />
        <Route path="/club" element={<ClubPage />} />
        <Route path="/tienda" element={<TiendaPage />} />
        <Route path="/nosotros" element={<OrigenPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
      </Routes>
    </>
  );
}
`);

// Create src/main.jsx
fs.writeFileSync(path.join(srcDir, 'main.jsx'), `
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

function applyFontPair() {
  const r = document.documentElement.style;
  r.setProperty('--idm-display', '"Space Grotesk", sans-serif');
  r.setProperty('--idm-body', '"Lora", serif');
  r.setProperty('--idm-mono', '"JetBrains Mono", monospace');
}
applyFontPair();

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
`);

console.log("Migration script complete.");
