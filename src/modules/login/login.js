import {createApp} from 'vue'
import login from './login.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import router from '@/router/login'


let app = createApp(login)
app.use(ElementPlus)
app.use(router)

app.mount('#loginApp')