import {createRouter, createWebHashHistory} from "vue-router";
import Student_Center from "@/views/StudentCenter/Student_Center.vue";
import CourseList from "@/views/StudentCenter/Course/CourseList.vue"
import CourseDetail from "@/views/StudentCenter/Course/CourseDetail.vue"
import Homework from "@/views/StudentCenter/Course/Homework.vue"
import Home from "@/views/Home.vue";
import Video from "@/views/Video_Quiz/Video.vue"
import Quiz from "@/views/Video_Quiz/Quiz.vue";
import Balance from "@/views/StudentCenter/Course/Balance.vue";


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
                        },
                        {
                            path: 'detail',
                            component: CourseDetail,
                        }, {
                            path: '',
                            redirect: '/student/course/list'
                        }, {
                            path: 'hw',
                            component: Homework
                        },
                    ]
                }, {
                    path: 'balance',
                    component: Balance
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
        }, {
            path: '/quiz',
            component: Quiz
        }
    ]
})