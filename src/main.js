import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VueKonva from 'vue-konva'
import TDesign from 'tdesign-vue-next'
import 'tdesign-vue-next/es/style/index.css'

document.documentElement.setAttribute('theme-mode', 'dark')

const app = createApp(App)

app.use(VueKonva)
app.use(TDesign)

app.mount('#app')
