import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// URL de publication GitHub Pages du dépôt.
export default defineConfig({
  base: '/Secteur-Biom-dical-CETCI-ECDC/',
  plugins: [react()],
});
