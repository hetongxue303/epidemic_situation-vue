import {createApp} from 'vue'
import App from './App.vue'

import router from './router'
import ElementPlus from './plugins/element-plus'
import i18n from './i18n'

import './assets/stytle/global.scss'
import 'reset.css'
import 'animate.css'
import 'virtual:windi.css'

const app = createApp(App)

app.use(router).use(ElementPlus).use(i18n)

app.mount('#app')