import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import tailwind from 'tailwindcss'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import webfontDownload from 'vite-plugin-webfont-dl'
import autoprefixer from 'autoprefixer'
import { unheadVueComposablesImports } from '@unhead/vue'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
    }
  },
  server: {
    port: 3000
  },
  plugins: [
    VueRouter(),
    vue(),
    VueDevTools(),
    AutoImport({
      imports: [
        'vue',
        'pinia',
        unheadVueComposablesImports,
        VueRouterAutoImports,
        {
          'vue-router/auto': ['useLink']
        }
      ],
      dirs: ['src/composables', 'src/stores'],
      dts: 'auto-imports.d.ts',
      vueTemplate: true,
      eslintrc: {
        enabled: true
      }
    }),
    Components({
      dts: 'components.d.ts'
    }),
    webfontDownload([
      'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap'
    ])
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
