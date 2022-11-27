<template>
    <div style="display: flex;justify-content: center;">
      <el-input
          v-model="searchInfo"
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
    </el-space>
    <el-pagination layout="prev, pager, next" style="display: flex;justify-content: center;margin-top: 50px" :total="100" />
</template>

<script setup>
import {Search} from "@element-plus/icons-vue";
import CourseInfoCard from "@/components/CourseInfoCard";
import {ref} from "vue";

let searchInfo = ref('')

</script>

<style scoped>

</style>