<template>
  <el-page-header title="返回" @back="$router.push('/teacher/course/list')">
    <template #breadcrumb>
      <el-breadcrumb :separator-icon="ArrowRight()">
        <el-breadcrumb-item to="/teacher/course/list">
          课程列表
        </el-breadcrumb-item>
        <el-breadcrumb-item>课程详情</el-breadcrumb-item>
      </el-breadcrumb>
    </template>
    <template #content>
      <span class="text-large font-600 mr-3"> 高等数学 </span>
    </template>
  </el-page-header>

  <el-divider/>

  <el-row>
    <el-col :span="5" style="background-color: orange">
      111
    </el-col>

    <el-col :offset="1" :span="18" style="background-color: skyblue">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="User" name="first">User</el-tab-pane>
        <el-tab-pane label="Config" name="second">Config</el-tab-pane>
        <el-tab-pane label="Role" name="third">Role</el-tab-pane>
        <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import {ArrowRight} from "@element-plus/icons-vue";
import {routerKey} from "vue-router";

export default {
  name: "Content",
  computed: {
    routerKey() {
      return routerKey
    }
  },
  methods: {
    ArrowRight() {
      return ArrowRight
    }
  }
}
</script>

<style scoped>

</style>