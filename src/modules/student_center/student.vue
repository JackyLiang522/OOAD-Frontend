<template>
  <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
  >
    <el-menu-item index="1">Course Online</el-menu-item>
    <el-menu-item index="2" disabled>Hello, student {{ userName }}</el-menu-item>
    <el-menu-item index="3">{{  }}</el-menu-item>
  </el-menu>
  <router-view/>
</template>

<script>
import router from "@/router/student_center";
import Student_Center from "@/pages/Student_Center";

export default {
  name: 'student',
  components: {
    Student_Center
  },
  router,
  data() {
    return {
      userName: 'xxx'
    }
  }
}
</script>

<style>

</style>