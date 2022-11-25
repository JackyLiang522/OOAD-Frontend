import {createRouter, createWebHashHistory} from "vue-router";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/Home";

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
            component:Home
        }
    ]
})