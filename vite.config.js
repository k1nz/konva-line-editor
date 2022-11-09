import { resolve } from 'path'
import { defineConfig } from 'vite'
import VueMacros from 'unplugin-vue-macros/vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@src': resolve(__dirname, './src'),
    },
  },
  plugins: [
    VueMacros({
      plugins: {
        vue: vue(),
        // vueJsx: VueJsx(), // if needed
      },
    }),
  ],
})
