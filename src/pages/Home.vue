<template>
  <div style="width: 70%;position: relative;transform: translateX(15%);margin-top: 20px">
    <div style="display: flex;justify-content: center;">
      <el-input
          size="large"
          placeholder="请输入"
          style="width: 450px"
      />
      <el-button size="large" :icon="Search" style="margin-left: 20px;width: 100px">搜索</el-button>
    </div>
    <el-divider/>

    <el-space wrap style="display: flex;justify-content: center;">
      <CourseInfoCard/>
      <CourseInfoCard/>
      <CourseInfoCard/>
      <CourseInfoCard/>
      <CourseInfoCard/>
      <CourseInfoCard/>
      <CourseInfoCard/>
      <CourseInfoCard/>
      <CourseInfoCard/>
    </el-space>
  </div>
</template>

<script setup>
import {Search} from "@element-plus/icons-vue";
import CourseInfoCard from "@/components/CourseInfoCard";


</script>

<style scoped>

</style>