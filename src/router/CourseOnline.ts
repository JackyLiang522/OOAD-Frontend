import {createRouter, createWebHashHistory} from "vue-router";
import TeacherCourseList from "@/views/CourseOnline/TeacherCenter/Overview/List/CourseList.vue";
import CreateCourse from "@/views/CourseOnline/TeacherCenter/Overview/Create/CreateCourse.vue";

import StudentCenter from "@/views/CourseOnline/StudentCenter/StudentCenter.vue";
import StudentCourseList from "@/views/CourseOnline/StudentCenter/Course/List/CourseList.vue"
import CourseDetail from "@/views/CourseOnline/StudentCenter/Course/Detail/CourseDetail.vue"
import Announcement from "@/views/CourseOnline/StudentCenter/Announcement/Announcement.vue"
import Homework from "@/views/CourseOnline/StudentCenter/Course/Homework/Homework.vue"
import Home from "@/views/CourseOnline/Home/Home.vue";
import Video from "@/views/CourseOnline/Video/Video.vue"
import Quiz from "@/views/CourseOnline/Quiz/Quiz.vue";
import Balance from "@/views/CourseOnline/StudentCenter/Balance/Balance.vue";
import Content from "@/views/CourseOnline/TeacherCenter/Detail/Content/Content.vue";
import Student from "@/views/CourseOnline/TeacherCenter/Detail/Student/Student.vue";
import OverviewHeader from "@/views/CourseOnline/TeacherCenter/Overview/OverviewHeader.vue";


// @ts-ignore
export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
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
        }, {
            path: '/student',
            component: StudentCenter,
            children: [
                {
                    path: '',
                    redirect: '/student/course'
                }, {
                    path: 'announcement',
                    component: Announcement
                },
                {
                    path: 'course',
                    children: [
                        {
                            path: 'list',
                            component: StudentCourseList
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
            path: '/teacher',
            children: [
                {
                    path: '',
                    redirect: '/teacher/overview/list'
                }, {
                    path: 'overview',
                    component: OverviewHeader,
                    children: [
                        {
                            path: '',
                            redirect: '/teacher/overview/list'
                        }, {
                            path: 'list',
                            component: TeacherCourseList
                        }, {
                            path: 'create',
                            component: CreateCourse
                        }
                    ]
                }, {
                    path: 'detail',
                    children: [
                        {
                            path:'',
                            redirect:'/teacher/detail/content'
                        },{
                            path: 'content',
                            component: Content
                        }, {
                            path: 'announcement',
                            component: Announcement
                        }, {
                            path: 'student',
                            component: Student
                        }
                    ]
                }
            ]
        },
    ]
})