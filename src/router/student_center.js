import {createRouter, createWebHashHistory} from "vue-router";
import Student_Center from "@/pages/Student_Center";

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
            redirect:'/student'
        }
    ]
})