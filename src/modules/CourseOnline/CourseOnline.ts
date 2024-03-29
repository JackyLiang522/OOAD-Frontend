import {createApp} from 'vue'
import course_online_app from '@/modules/CourseOnline/CourseOnline.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import router from '@/router/CourseOnline'
import store from "@/store";



const app = createApp(course_online_app)
app.use(ElementPlus)
app.use(router)
app.use(store)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#course_online_app')