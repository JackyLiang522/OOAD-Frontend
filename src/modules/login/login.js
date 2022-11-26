import {createApp} from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import router from '@/router/login'
import store from '@/store'

import loginApp from "@/modules/login/loginApp";

let app = createApp(loginApp)
app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#loginApp')