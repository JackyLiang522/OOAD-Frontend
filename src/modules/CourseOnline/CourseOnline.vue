<template>
  <el-container style="display: flex;flex-direction: column;min-height: 100%;">
    <el-header height="60px" style="background-color: black;">
      <el-row :gutter="20">
        <el-col :span="2" style="text-align: center">
          <router-link to="/home">
            <el-image
                style="width: 30px; height: 30px;margin-top: 5px;"
                src='https://th.bing.com/th/id/OIP.RlUTXgwQmhZvma5follA8gHaHa?pid=ImgDet&rs=1'
                fit="cover"
            />
            <br>
            <div style="font-size: 10px;color:white; height: 10px">Course Online</div>
          </router-link>
        </el-col>
        <el-divider direction="vertical" border-style=" solid" style="height: 50px;margin-top: 5px;"/>
        <div style="
          line-height:60px;
          vertical-align: middle;
          letter-spacing: 2px;
          font-size: 22px;
          color: white;
          margin-left: 20px;
          font-weight: bold;"
        >
          欢迎，学生XXX
        </div>
        <div style="
        position: absolute;
        float: right;
        right: 30px;
        vertical-align: middle;
        height: 60px"
        >
          <router-link :underline="false" to="/student" style="color:#3a8ee6">
            <span style="line-height: 60px;">1111111@qq.com</span>
          </router-link>
          <el-divider direction="vertical" border-style=" solid" style="height: 40px;"/>
          <el-link type="primary" style="font-size: 15px;color: lightgray;font-weight: bold">
            登录
          </el-link>
        </div>
      </el-row>
    </el-header>
    <!--  </el-container>-->
    <el-main style="flex: 1">
      <div style="width: 72%;position: relative;transform: translateX(19.44%);">
        <router-view/>
      </div>
    </el-main>
    <!--  <el-container>-->
    <el-footer style="background-color: black;margin-top: 100px;color :white;">
      <p style="text-align: center">已经到底咯</p>
    </el-footer>
  </el-container>
</template>

<script>
import router from "@/router/CourseOnline";
import Student_Center from "@/views/StudentCenter/Student_Center";

export default {
  name: 'course_online',
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