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
          {{ welcome_word }}
        </div>
        <div style="
        position: absolute;
        float: right;
        right: 30px;
        vertical-align: middle;
        height: 60px"
        >
          <router-link :underline="false" to="/teacher" style="color:#3a8ee6">
            <!--          <router-link :underline="false" to="/student" style="color:#3a8ee6">-->
            <span style="line-height: 60px;">
              {{ email_words}}
            </span>
          </router-link>
          <el-divider direction="vertical" border-style=" solid" style="height: 40px;"/>
          <el-link
              type="primary"
              style="font-size: 15px;color: lightgray;font-weight: bold"
              href="login"
          >
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
    <el-footer style="background-color: black;color :white;">
      <p style="text-align: center">已经到底咯</p>
    </el-footer>
  </el-container>
</template>

<script>
import router from "@/router/CourseOnline";
import StudentCenter from "@/views/CourseOnline/StudentCenter/StudentCenter.vue";
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  name: 'course_online_app',
  components: {
    StudentCenter
  },
  router,
  data() {
    const store = useStore()

    const welcome_word = computed(() => {
      const is_teacher = store.state.userInfo.is_teacher
      const user_name = store.state.userInfo.user_name
      const is_login = store.state.userInfo.is_login
      if (is_login) {
        if (is_teacher) {
          return `欢迎，教师${user_name}`
        } else {
          return `欢迎，学生${user_name}`
        }
      } else {
        return '欢迎，游客'
      }
    })
    
    const email_words = computed(() => {
      return store.state.userInfo.is_login?
          store.state.userInfo.email:
          '请登录'
    })
    
    return {
      userName: 'xxx',
      welcome_word,
      email_words
    }
  }
}
</script>

<style>
</style>