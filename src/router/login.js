import {createRouter, createWebHashHistory} from "vue-router";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

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