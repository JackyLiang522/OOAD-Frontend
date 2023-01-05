<template>
  <div id="login-container" :style="{ boxShadow: `var(${'--el-box-shadow'})` }">
    <p id="login-title">登录</p>
    <el-input class="top" size="large" v-model="user_input.email" placeholder="请输入邮箱" clearable/>
    <el-input class="middle" size="large" v-model="user_input.password" type="password" placeholder="请输入密码"
              show-password
              clearable/>
    <router-link to="/register" class="ask-register">没有账号？点此注册</router-link>
    <br>
    <el-button class="login-button" type="primary" @click="login">登录</el-button>
    <el-button class="login-button" @click="clearInfo">清空</el-button>
  </div>
  <div style="display: flex;justify-content: center">
    <p>测试用按钮：</p>
    <el-button @click="studentLogin_test">学生登录</el-button>
    <el-button @click="teacherLogin_test">教师登录</el-button>
    <el-button @click="adminLogin_test">管理员登录</el-button>
    <el-button @click="touristLogin_test">游客登录</el-button>
  </div>
</template>

<script>
import {onBeforeUnmount, reactive} from "vue";
import {ElMessage, ElMessageBox} from 'element-plus'

import axios from "axios";
import {useStore} from "vuex";
import balance from "@/views/CourseOnline/StudentCenter/Balance/Balance.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  setup() {
    let user_input = reactive({
      email: '',
      password: '',
    })

    function clearInfo() {
      user_input.email = ''
      user_input.password = ''
    }

    async function login() {
      if (!user_input.email || !user_input.password) {
        showWarning("请输入所有信息")
        return
      }
      await checkInfo()
    }


    function showError(msg) {
      ElMessage({
        showClose: true,
        message: msg,
        type: 'error',
        duration: 2000,
      })
    }

    function showWarning(msg) {
      ElMessage({
        showClose: true,
        message: msg,
        type: 'warning',
      })
    }

    function showSuccess(msg) {
      ElMessage({
        showClose: true,
        message: msg,
        type: 'success',
      })
    }

    async function checkInfo() {
      await axios.post(`http://${store.state.host}/api/client/login?email=${user_input.email}&password=${user_input.password}`).then(
          async response => {
            if (response.data) {
              showSuccess("登录成功")

              const user = response.data;
              // obtain user identity
              let identity = null;
              if (user.admin) {
                identity = 'admin'
              } else if (user.teacher) {
                await ElMessageBox.confirm(
                    '请选择你的身份',
                    '提示',
                    {
                      confirmButtonText: '教师',
                      cancelButtonText: '学生',
                      type: 'info',
                    }
                )
                    .then(() => {
                      identity = 'teacher'
                    })
                    .catch(() => {
                      identity = 'student'
                    })
              } else {
                identity = 'student'
              }
              const user_info = {
                id: user.id,
                identity: identity,
                email: user.email,
                user_name: user.name,
                purchased_courses: user.courseSubscribed,
                balance: user.account,
              }
              localStorage.setItem('user_info', JSON.stringify(user_info))
              if (identity === 'admin') {
                window.location.href = '/#/admin'
              } else {
                window.location.href = '/#/home'
              }
            } else {
              showError('用户名或密码不正确')
            }
          },
          err => {
            console.log(err.message)
          })
    }

    document.body.setAttribute('style', 'background:rgba(159,197,248,0.78)')

    onBeforeUnmount(() => {
      document.body.removeAttribute('style')
    })

    const store = useStore()

    function studentLogin_test() {
      const student_info = {
        identity: 'student',
        email: '12012437@mail.sustech.edu.cn',
        user_name: '陈文雁',
        id: 4
      }
      localStorage.setItem('user_info', JSON.stringify(student_info))
      localStorage.setItem('has_open_video_page', 'false')
      window.location.href = '/#/home'
    }

    function teacherLogin_test() {
      const teacher_info = {
        identity: 'teacher',
        email: '12010903@mail.sustech.edu.cn',
        user_name: '林雨航',
        id: 1
      }
      localStorage.setItem('user_info', JSON.stringify(teacher_info))
      localStorage.setItem('has_open_video_page', 'false')
      window.location.href = '/#/home'
    }

    function adminLogin_test() {
      const admin_info = {
        identity: 'admin',
        email: '11910504@mail.sustech.edu.cn',
        user_name: '梁家源',
        id: 3
      }
      localStorage.setItem('user_info', JSON.stringify(admin_info))
      localStorage.setItem('has_open_video_page', 'false')
      window.location.href = '/#/admin'
    }

    function touristLogin_test() {
      const tourist_info = {
        identity: 'tourist',
        email: 'tourist@example.com',
        user_name: '',
        id: 0
      }
      localStorage.setItem('user_info', JSON.stringify(tourist_info))
      localStorage.setItem('has_open_video_page', 'false')
      window.location.href = '/#/home'
    }

    return {
      user_input: user_input,
      clearInfo,
      login,
      studentLogin_test,
      teacherLogin_test,
      adminLogin_test,
      touristLogin_test
    }
  }

}
</script>

<style scoped>
#login-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 250px;
  height: 450px;
  padding: 10px 40px 10px 40px;
  background-color: white;
}

#login-title {
  font-size: 30px;
  letter-spacing: 10px;
}

.top {
  margin: 20px 0 40px 0;
}

.middle {
  margin: 0 0 60px 0;
}

.ask-register {
  line-height: 30px;
  text-align: center;
  font-size: 10px;
}

.login-button {
  margin: 30px 20px 20px 0;

}
</style>