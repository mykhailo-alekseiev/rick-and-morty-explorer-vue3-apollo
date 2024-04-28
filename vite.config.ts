import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import tailwind from "tailwindcss"
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import autoprefixer from "autoprefixer"
import { unheadVueComposablesImports } from '@unhead/vue';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  server:{
    port: 3000,
  },
  plugins: [
    vue(),
    VueDevTools(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        unheadVueComposablesImports
      ],
      dts: 'auto-imports.d.ts',
      vueTemplate: true,
      eslintrc: {
        enabled: true,
      },
    }),
    Components({
      dts: 'components.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
