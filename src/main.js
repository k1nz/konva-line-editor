import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import VueKonva from 'vue-konva'
import TDesign from 'tdesign-vue-next'
import './assets/theme.css'

import TooltipButton from './components/tooltip-button/index.vue'

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
app.use(VueKonva)
app.use(TDesign)

app.component('TooltipButton', TooltipButton)

app.mount('#app')
