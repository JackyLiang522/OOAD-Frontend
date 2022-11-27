<template>
  <el-container>
    <el-header>
      <el-menu
          class="el-menu-demo"
          mode="horizontal"
          :router=true
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
      >
        <el-menu-item index="course" disabled>Course</el-menu-item>
        <el-menu-item index="notification">Notification</el-menu-item>
        <el-menu-item index="balance">Balance</el-menu-item>
      </el-menu>
    </el-header>
  </el-container>
  <router-view></router-view>
</template>

<script>
import axios from "axios";
import store from "@/store";
import router from "@/router/CourseOnline";

export default {
  name: "Student_Center",
  router,
}
</script>

<style scoped>

</style>