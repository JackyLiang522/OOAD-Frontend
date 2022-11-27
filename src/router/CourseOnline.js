import {createRouter, createWebHashHistory} from "vue-router";
import Student_Center from "@/pages/Student_Center";
import Home from "@/pages/Home";

export default createRouter({
    history:createWebHashHistory(),
    mode: "history",
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