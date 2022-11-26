import {createApp} from 'vue'
import student from './student.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import router from '@/router/student_center'


let app = createApp(student)
app.use(ElementPlus)
app.use(router)

app.mount('#studentAPP')