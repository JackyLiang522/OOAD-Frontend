import {createRouter, createWebHashHistory} from "vue-router";
import TeacherCenter from "@/views/TeacherCenter/TeacherCenter.vue";
import TeacherCourseList from "@/views/TeacherCenter/CourseList/CourseList.vue";
import CreateCourse from "@/views/TeacherCenter/CreateCourse/CreateCourse.vue";

import StudentCenter from "@/views/StudentCenter/StudentCenter.vue";
import StudentCourseList from "@/views/StudentCenter/Course/CourseList.vue"
import CourseDetail from "@/views/StudentCenter/Course/CourseDetail.vue"
import Announcement from "@/views/StudentCenter/Announcement/Announcement.vue"
import Homework from "@/views/StudentCenter/Course/Homework.vue"
import Home from "@/views/Home.vue";
import Video from "@/views/VideoQuiz/Video.vue"
import Quiz from "@/views/VideoQuiz/Quiz.vue";
import Balance from "@/views/StudentCenter/Balance/Balance.vue";
import Content from "@/views/TeacherCenter/CourseList/Content.vue";
import Student from "@/views/TeacherCenter/CourseList/Student.vue";


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
            component: TeacherCenter,
            children: [
                {
                    path: '',
                    redirect: '/teacher/course'
                }, {
                    path: 'course',
                    children: [
                        {
                            path: '',
                            redirect: '/teacher/course/list'
                        }, {
                            path: 'create',
                            component: CreateCourse
                        }, {
                            path: 'list',
                            children: [
                                {
                                    path: '',
                                    component: TeacherCourseList
                                }, {
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
                }
            ]
        },
    ]
})