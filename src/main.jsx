
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';

function applyFontPair() {
  const r = document.documentElement.style;
  r.setProperty('--idm-display', '"Space Grotesk", sans-serif');
  r.setProperty('--idm-body', '"Lora", serif');
  r.setProperty('--idm-mono', '"JetBrains Mono", monospace');
}
applyFontPair();

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <App />
  </HashRouter>
);
