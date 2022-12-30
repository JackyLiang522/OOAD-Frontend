<template>
  <div style="display: flex;justify-content: center;">
    <el-input v-model="searchInfo" size="large" placeholder="请输入" style="width: 450px"/>
    <el-button size="large" :icon="Search" style="margin-left: 20px;width: 100px">搜索</el-button>
  </div>
  <el-divider/>

  <el-space wrap style="display: flex;justify-content: center;">
    <CourseInfoCard
        v-for="course in courses"
        :courseId="course.courseId"
        :courseName="course.courseName"
        :teacher="course.teacher"
        :chapterCount="course.chapterCount"
        :price="course.price"
        :introduction="course.introduction"
        :has_purchased="hasPurchase(course.courseId)"
    />
  </el-space>
  <el-pagination layout="prev, pager, next" style="display: flex;justify-content: center;margin-top: 50px"
                 :total="100"/>
</template>

<script>
import {useStore} from "vuex";
import {computed, onMounted} from "vue";
import axios from "axios";
import CourseInfoCard from "@/views/CourseOnline/Home/CourseInfoCard.vue";
import {ref} from "vue";
import {Search} from "@element-plus/icons-vue";

export default {
  methods: {Search},
  components: {CourseInfoCard},
  setup() {
    const store = useStore()

    let searchInfo = ref('')

    function hasPurchase(courseId) {
      const purchased_courses = store.state.userInfo.purchased_courses
      for (let i = 0; i < purchased_courses.length; i++) {
        const cur_purchased_course = purchased_courses[i]
        if (cur_purchased_course.courseId === courseId)
          return true
      }
      return false
    }

    onMounted(async () => {
      const store = useStore()
      await axios.get(`http://${store.state.host}/api/course/list`).then((response) => {
        this.courses = response.data
      })
    })

    return {
      courses: [
        {
          courseName: "Java",
          teacher: 'Yepang Liu',
          chapterCount: 12,
          price: 0,
          introduction: "Hello World!",
          courseId: 1,
        }
      ],
      hasPurchase,
      searchInfo,
    }
  },
}
</script>

<style scoped>
</style>