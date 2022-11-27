import {createRouter, createWebHashHistory} from "vue-router";
import Student_Center from "@/views/StudentCenter/Student_Center.vue";
import CourseList from "@/views/StudentCenter/Course/CourseList.vue"
import Home from "@/views/Home.vue";
import Video from "@/views/Video.vue"


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