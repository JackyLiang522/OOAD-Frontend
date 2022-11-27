import {createRouter, createWebHashHistory} from "vue-router";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";

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