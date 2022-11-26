<template>
  <div
      id="login-container"
      class="inline-flex"
      :style="{boxShadow:`var(${'--el-box-shadow'})`}"
  >
    <p id="login-title">登录</p>
    <el-input class="account-input" size="large" v-model="account" placeholder="请输入邮箱"/>
    <el-input
        class="password-input"
        size="large"
        v-model="password"
        type="password"
        placeholder="请输入密码"
        show-password
    />
    <router-link to="/register" class="ask-register">没有账号？点此注册</router-link>
    <br>
    <el-button class="login-button" type="primary" @click="login">登录</el-button>
    <el-button class="login-button" @click="clearInfo">清空</el-button>
  </div>
</template>

<script>
import {onBeforeUnmount, reactive, ref, toRef} from "vue";
import {ElMessage} from 'element-plus'

import axios from "axios";

export default {
  name: "Login",
  setup() {
    let userInfo = reactive({
      account: '',
      password: '',
    })

    function clearInfo() {
      userInfo.account = ''
      userInfo.password = ''
    }

    function login() {
      if (checkInfo()) {
        alert('登录成功')
      } else {
        ElMessage({
          showClose: true,
          message: '用户名或密码错误',
          type: 'error',
          duration: 2000,
        })
      }
    }

    async function checkInfo() {
      console.log('http://10.26.123.10:8888/login?email=' + userInfo.account + '&password=' + userInfo.password)
      await axios.post('http://10.26.123.10:8888/login?email=' + userInfo.account + '&password=' + userInfo.password).then(
          response => {
            if (response.data.code === 1) {
              this.$router.push('/course')
              return true
            } else {
              return false
            }
          },
          err => {
            alert(err)
          })
    }

    document.body.setAttribute('style', 'background:rgba(159,197,248,0.78)')

    onBeforeUnmount(() => {
      document.body.removeAttribute('style')
    })

    return {
      account: toRef(userInfo, 'account'),
      password: toRef(userInfo, 'password'),
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

.account-input {
  margin: 20px 0 40px 0;
}

.password-input {
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