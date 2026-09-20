import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' : les chemins des fichiers sont relatifs, donc le site marche
// dans un sous-dossier GitHub Pages (https://compte.github.io/depot/).
export default defineConfig({
  base: './',
  plugins: [react()],
});
