import {createRouter, createWebHashHistory} from "vue-router";
import Login from "@/views/Login/Login.vue";
import Register from "@/views/Login/Register.vue";

export default createRouter({
    history: createWebHashHistory(),
    routes: [{
        path: '/login',
        component: Login
    }, {
        path: '/register',
        component: Register
    }, {
        path: '/',
        redirect: '/login'
    }
    ]
})