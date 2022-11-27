<template>
  <el-container>
    <el-header height="60px" style="background-color: black">
      <el-row :gutter="20">
        <el-col :span="2" style="text-align: center">
          <router-link to="/home">
            <el-image
                style="width: 30px; height: 30px;margin-top: 5px;"
                src='https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
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
          <span style="line-height: 60px;color: white">1111111@qq.com</span>
          <el-divider direction="vertical" border-style=" solid" style="height: 40px;"/>
          <el-link type="primary" style="font-size: 15px;color: lightgray;font-weight: bold">
            注销
          </el-link>
        </div>
      </el-row>
    </el-header>
  </el-container>
  <div style="width: 70%;position: relative;transform: translateX(21%);margin-top: 20px">
    <router-view/>
  </div>
</template>

<script>
import router from "@/router/CourseOnline";
import Student_Center from "@/pages/Student_Center";

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