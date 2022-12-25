import {createApp} from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import router from '@/router/Login'
import store from '@/store'

import login_app from "@/modules/Login/Login.vue";

const app = createApp(login_app)
app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#login_app')