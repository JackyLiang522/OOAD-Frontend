import {createRouter, createWebHashHistory} from "vue-router";
import Student_Center from "@/pages/Student_Center.vue";
import Home from "@/pages/Home.vue";

export default createRouter({
    history:createWebHashHistory(),
    routes: [
        {
            path: '/student',
            component: Student_Center
        },
        {
            path:'/',
            redirect:'/home'
        },
        {
            path:'/home',
            component:Home
        }
    ]
})