import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'), // root index.html
        login: path.resolve(__dirname, 'src/login/login.html'),
        dashboard: path.resolve(__dirname, 'src/dashboard/dashboard.html'),
      },
    },
  },
});
