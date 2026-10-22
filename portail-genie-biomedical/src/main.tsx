import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/main.css';

const base = import.meta.env.BASE_URL; // ex. /Secteur-Biom-dical-CETCI-ECDC/

// Anciens liens à la forme /#/a-propos : redirigés vers la vraie URL /a-propos/
if (window.location.hash.startsWith('#/')) {
  window.history.replaceState(null, '', base + window.location.hash.slice(2));
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={base.replace(/\/$/, '')}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
