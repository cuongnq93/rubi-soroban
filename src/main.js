import 'element-plus/lib/theme-chalk/index.css'
import './assets/scss/app.scss'

import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
