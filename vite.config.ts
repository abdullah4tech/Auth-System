import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import compression from 'vite-plugin-compression';
import Inspect from 'vite-plugin-inspect';
import { imagetools } from 'vite-imagetools';

import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    compression({ algorithm: 'brotliCompress' }),
    Inspect(),
    imagetools()
  ],
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  build: {
    sourcemap: true, // Enable source maps
    rollupOptions: {
      output: {
        sourcemap: true, // Make sure the Rollup config also enables sourcemaps
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
