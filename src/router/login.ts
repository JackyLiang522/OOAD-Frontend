import {createRouter, createWebHashHistory} from "vue-router";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";

export default createRouter({
    history:createWebHashHistory(),
    routes: [
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path:'/',
            redirect:'/login'
        }
    ]
})