<template>
  <div id="login-container" :style="{ boxShadow: `var(${'--el-box-shadow'})` }">
    <p id="login-title">注册</p>
    <el-input class="top" size="large" v-model="userInfo.email" placeholder="请输入邮箱" clearable/>
    <el-input class="middle" size="large" v-model="userInfo.user_name" placeholder="请输入昵称" clearable/>
    <el-input class="middle" size="large" v-model="userInfo.password" type="password" autocomplete="off"
              placeholder="请输入密码" show-password clearable/>
    <el-input class="middle" size="large" v-model="userInfo.password_again" type="password" autocomplete="off"
              placeholder="请再次输入密码" show-password clearable/>
    <el-radio-group v-model="userInfo.is_teacher" class="bottom">
      <el-radio :label="false" size="large">我是学生</el-radio>
      <el-radio :label="true" size="large">我是教师</el-radio>
    </el-radio-group>
    <br>
    <router-link to="/login" class="ask-login">已有账号？点此登录</router-link>
    <br>
    <el-button class="login-button" type="primary" @click="register">注册</el-button>
    <el-button class="login-button" @click="clearInfo">清空</el-button>
  </div>
</template>

<script>
import {onBeforeUnmount, reactive} from "vue";
import {ElMessage} from 'element-plus'
import axios from "axios";
import store from "@/store";
import router from '@/router/Login'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Register",
  setup() {
    document.body.setAttribute('style', 'background:rgba(159,197,248,0.78)')

    onBeforeUnmount(() => {
      document.body.removeAttribute('style')
    })

    const userInfo = reactive({
      email: '',
      password: '',
      password_again: '',
      user_name: '',
      is_teacher: false
    })

    function clearInfo() {
      userInfo.email = ''
      userInfo.password = ''
      userInfo.password_again = ''
      userInfo.user_name = ''
    }

    function register() {
      if (!userInfo.email || !userInfo.password || !userInfo.password_again || !userInfo.user_name) {
        showWarning("请输入所有信息")
        return;
      }
      if (userInfo.password !== userInfo.password_again) {
        showWarning("两次密码输入不同")
        return
      }
      let reg =/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
      if (!reg.test(userInfo.email)) {
        showWarning("请输入合法邮箱")
        return
      }
      submitInfo()
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

    async function submitInfo() {
      await axios.post(`http://${store.state.host}/api/client/register?email=${userInfo.email}&password=${userInfo.password}&username=${userInfo.user_name}&isTeacher=${userInfo.is_teacher}`).then(
          response => {
            if (response.data) {
              showSuccess("注册成功")
              router.push('/Login')
            } else {
              showError('用户名或密码不符合规范')
            }
          },
          err => {
            console.log(err)
          })
    }

    return {
      userInfo,
      clearInfo,
      register
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
  height: 520px;
  padding: 10px 40px 10px 40px;
  background-color: white;
}

#login-title {
  font-size: 30px;
  letter-spacing: 10px;
}

.top {
  margin: 0 0 20px 0;
}

.middle {
  margin: 0 0 20px 0;
}

.bottom {
  margin: 0 0 10px 0;
}

.ask-login {
  text-align: center;
  font-size: 10px;
}

.login-button {
  margin: 30px 20px 20px 20px;

}
</style>