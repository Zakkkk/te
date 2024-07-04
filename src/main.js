import './sf-scss/allNoComponents.scss'
import './sf-scss/font.scss'
import './style/all.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
