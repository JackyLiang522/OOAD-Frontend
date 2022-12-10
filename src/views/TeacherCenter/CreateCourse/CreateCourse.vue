<template>
  <div style="display: flex;justify-content: center;">
  <el-form
      label-position="left"
      label-width="80px"
      :model="course_info"
      style="width: 300px"
  >
    <el-form-item label="课程名">
      <el-input v-model="course_info.name" placeholder="请输入课程名"/>
    </el-form-item>
    <el-form-item label="课程简介">
      <el-input v-model="course_info.introduction" placeholder="请为此课程输入一段课程介绍" type="textarea"/>
    </el-form-item>
    <el-form-item label="价格">
      <el-input-number v-model="course_info.price" :precision="2" :step="0.1" :min="0" placeholder="请输入课程价格（0 表示免费）"/>
    </el-form-item>
  </el-form>
  </div>
</template>

<script lang="ts">
import {reactive} from "vue";

export default {
  name: "CreateCourse",

  setup() {
    const course_info = reactive({
      cover: '',
      name: '',
      introduction: '',
      price: 0,
    })

    return {
      course_info,
    }
  }
}
</script>

<style scoped>

</style>