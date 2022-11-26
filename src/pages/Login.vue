<template>
  <div
      id="login-container"
      class="inline-flex"
      :style="{boxShadow:`var(${'--el-box-shadow'})`}"
  >
    <p id="login-title">登录</p>
    <el-input class="top" size="large" v-model="userInfo.email" placeholder="请输入邮箱" clearable/>
    <el-input
        class="middle"
        size="large"
        v-model="userInfo.password"
        type="password"
        placeholder="请输入密码"
        show-password
        clearable
    />
    <router-link to="/register" class="ask-register">没有账号？点此注册</router-link>
    <br>
    <el-button class="login-button" type="primary" @click="login">登录</el-button>
    <el-button class="login-button" @click="clearInfo">清空</el-button>
  </div>
</template>

<script>
import {onBeforeUnmount, reactive} from "vue";
import {ElMessage} from 'element-plus'

import axios from "axios";
import store from "@/store";

export default {
  name: "Login",
  setup() {
    let userInfo = reactive({
      email: '',
      password: '',
    })

    function clearInfo() {
      userInfo.email = ''
      userInfo.password = ''
    }

    async function login() {
      if(!userInfo.email || !userInfo.password){
        showWarning("请输入所有信息")
        return
      }

      let response = ''
      await checkInfo().then((data) => response = data, err => response = err.message)
      if (response === 'succeed') {
        showSuccess("登录成功")
      } else {
        showError(response)
      }
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
      let response = ''
      await axios.post(`https://${store.state.host}/login?email=${userInfo.email}&password=${userInfo.password}`).then(
          response => {
            if (response.data.code === 1) {
              response = 'succeed'
            } else {
              response = 'not-exist'
            }
          },
          err => {
            response = err.message
          })
      return response
    }

    document.body.setAttribute('style', 'background:rgba(159,197,248,0.78)')

    onBeforeUnmount(() => {
      document.body.removeAttribute('style')
    })

    return {
      userInfo,
      clearInfo,
      login,

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