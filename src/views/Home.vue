<template>
  <div style="display: flex;justify-content: center;">
    <el-input v-model="searchInfo" size="large" placeholder="请输入" style="width: 450px" />
    <el-button size="large" :icon="Search" style="margin-left: 20px;width: 100px">搜索</el-button>
  </div>
  <el-divider />

  <el-space wrap style="display: flex;justify-content: center;">
    <CourseInfoCard v-for="course in courses" :courseId="course.courseId" :courseName="course.courseName" :teacher="course.teacher" :chapterCount="course.chapterCount"
          :price="course.price" :introduction="course.introduction" />
  </el-space>
  <el-pagination layout="prev, pager, next" style="display: flex;justify-content: center;margin-top: 50px"
    :total="100" />
</template>

<script setup>
import {Search} from "@element-plus/icons-vue";
import CourseInfoCard from "@/components/CourseInfoCard";
import {ref} from "vue";
import axios from "axios";
import store from "@/store";

let searchInfo = ref('')

</script>

<script>
export default {
  data() {
    return {
      courses: [{ courseName: "Java", teacher: 'Yepang Liu', chapterCount: 12, price: 0, introduction: "Hello World!" }]
    }
  },
  async created() {
    axios.get(`http://${store.state.host}/api/course/list`).then((response) => {
      this.courses = response.data
    })
  }
}
</script>

<style scoped>
</style>