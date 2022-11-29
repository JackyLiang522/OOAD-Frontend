<template>
  <div style="display: flex;justify-content: center;">
    <el-divider content-position="left"
                style="display: flex;justify-content: center;width: 70%; margin:30px  0 3% 3%"><b>
      <h3>我的课程</h3>
    </b>
    </el-divider>
  </div>
  <div style="display: flex;justify-content: center;">

    <el-input
        v-model="searchInfo"
        size="large"
        placeholder="请输入课程名"
        style="width: 50%; margin:  20px 0 10px 0"
    />
    <el-button size="large" :icon="Search"
               style="display: flex;justify-content: center; width: 100px;  margin:  20px 0 0  20px">搜索
    </el-button>
  </div>

  <el-row style="margin:  0 0 0 0">
    <el-col :span="6"></el-col>
    <el-col :span="4">
      <div class="grid-content bg-purple-light">
        <router-link to="/student/course/detail">
          <h4>课程 A</h4></router-link>
<!--        跳转至课程视频观看url-->
      </div>
    </el-col>
    <el-col :span="4">
      <div class="grid-content bg-purple">
        <router-link to="/student/course/detail">
          <h4 style="text-align: center">课程详情</h4></router-link>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="grid-content bg-purple-light"><h5 style="text-align: right">教师: xx </h5></div>
    </el-col>
    <el-col :span="6"></el-col>
  </el-row>

  <el-row style="margin:  0 0 0 0">
    <el-col :span="6"></el-col>
    <el-col :span="4">
      <div class="grid-content bg-purple">
        <router-link to="/student/course/detail">
          <h4>课程 A</h4></router-link>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="grid-content bg-purple-light">
        <router-link to="/student/course/detail">
          <h4 style="text-align: center">课程详情</h4></router-link>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="grid-content bg-purple"><h5 style="text-align: right">教师: xx </h5></div>
    </el-col>
    <el-col :span="6"></el-col>
  </el-row>

</template>

<script>
import router from "@/router/CourseOnline";

export default {
  name: "CourseList",
  router,
}
</script>

<style>
.el-row {
  margin-bottom: 20px;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>