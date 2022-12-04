<template>
<!--  <div style="display: flex;justify-content: center;">-->
<!--    <el-divider content-position="left"-->
<!--                style="display: flex;justify-content: center;width: 70%; margin:30px  0 3% 3%"><b>-->
<!--      <h2>我的课程</h2>-->
<!--    </b>-->
<!--    </el-divider>-->
<!--  </div>-->
  <el-container>
    <el-header style="height: 70px">
      <h3 style="margin-right: 5px;">
        <span style="vertical-align: 22%">我的课程</span>
        <el-icon size="30px" style="margin-left: 5px">
          <List/>
        </el-icon>
      </h3>
    </el-header>
    <hr class="style-three" style="margin-bottom: 30px">
  </el-container>

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

  <el-row style="margin:  0 0 0 0" align="middle">
    <el-col :span="5" :offset="6" style="text-align: center;vertical-align: center">
      <div class="grid-content bg-purple-light" >
        <router-link to="/video"  style="margin-top: 10px;line-height:inherit;display: block" >
          <h4>课程 A</h4></router-link>
        <!--        跳转至课程视频观看url-->
      </div>
    </el-col>
    <el-col :span="5" style="text-align: center;vertical-align: center">
      <div class="grid-content bg-purple">
        <router-link to="/student/course/detail">
          <h4 >课程详情</h4></router-link>
      </div>
    </el-col>
    <el-col :span="2">
      <div class="grid-content bg-purple-dark"><h5 style="text-align: center">教师: xx </h5></div>
    </el-col>
  </el-row>

  <el-row style="margin:  0 0 0 0">
    <el-col :span="5" :offset="6">
      <div class="grid-content bg-purple-light" style="text-align: center; ">
        <router-link to="/video"  style="height: 200%">
          <h4>课程 A</h4></router-link>
        <!--        跳转至课程视频观看url-->
      </div>
    </el-col>
    <el-col :span="5">
      <div class="grid-content bg-purple">
        <router-link to="/student/course/detail">
          <h4 style="text-align: center">课程详情</h4></router-link>
      </div>
    </el-col>
    <el-col :span="2">
      <div class="grid-content bg-purple-dark"><h5 style="text-align: center">教师: xx </h5></div>
    </el-col>
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
hr.style-three {
  width: 100%;
  margin: 0 auto;
  border: 0;
  height: 5px;
  background: #333;
  background-image: linear-gradient(to right, #ccc, #333, #ccc);
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

</style>