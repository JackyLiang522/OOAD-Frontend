import {createRouter, createWebHashHistory} from "vue-router";
import Student_Center from "@/pages/Student_Center.vue";
import CourseList from "@/modules/StudentCenter/Course/CourseList.vue"
import Home from "@/pages/Home.vue";
import Video from "@/pages/Video.vue"


// @ts-ignore
export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/student',
            component: Student_Center,
            children: [
                {
                    path: '',
                    redirect: '/student/course'
                },
                {
                    path: 'course',
                    children: [
                        {
                            path: 'list',
                            component: CourseList
                        }, {
                            path: '',
                            redirect: '/student/course/list'
                        }
                    ]
                }
            ]
        }, {
            path: '/',
            redirect: '/home'
        }, {
            path: '/home',
            component: Home
        }, {
            path: '/video',
            component: Video
        }
    ]
})