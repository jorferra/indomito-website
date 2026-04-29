
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
