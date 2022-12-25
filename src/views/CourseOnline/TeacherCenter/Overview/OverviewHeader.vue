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
          style="height: 100%"
      >
        <el-menu-item index="/teacher/overview/list/" ><h3>课程列表</h3></el-menu-item>
        <el-menu-item index="/teacher/overview/create"><h3>创建课程</h3></el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import router from "@/router/CourseOnline";

export default {
  name: "TeacherCenter",
  router,
}
</script>

}
<style scoped>
:deep(.el-menu-item) {
  font-size: 19px;
  font-weight: normal;
  color: #dbe2ef;
}
</style>