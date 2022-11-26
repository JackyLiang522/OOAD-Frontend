<template>
  <div
      id="login-container"
      class="inline-flex"
      :style="{boxShadow:`var(${'--el-box-shadow'})`}"
  >
    <p id="login-title">注册</p>
    <el-form
        ref="ruleFormRef"
        :model="userInfo"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
    >
      <el-input
          class="email-input"
          size="large"
          v-model="userInfo.email"
          placeholder="请输入账号"
      />
      <el-input
          class="password-input"
          size="large"
          v-model="userInfo.password"
          type="password"
          autocomplete="off"
          placeholder="请输入密码"
          show-password
      />
      <el-input
          class="password-input-again"
          size="large"
          v-model="userInfo.password_again"
          type="password"
          autocomplete="off"
          placeholder="请再次输入密码"
          show-password
      />
      <router-link to="/login" class="ask-login">已有账号？点此登录</router-link>
      <br>
      <el-button class="login-button" type="primary" @click="register(ruleFormRef)">注册</el-button>
      <el-button class="login-button" @click="clearInfo(ruleFormRef)">清空</el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import {onBeforeUnmount, reactive, ref} from "vue";
import {ElMessage} from 'element-plus'
import type {FormInstance} from "element-plus";
import axios from "axios";


export default {
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
    })
    function clearInfo() {
      userInfo.email = ''
      userInfo.password = ''
      userInfo.password_again = ''
    }

    function register() {
      if (true) {
        alert('注册成功')
      } else {
        ElMessage({
          showClose: true,
          message: '用户名或密码不符合规范',
          type: 'error',
          duration: 2000,
        })
      }
    }

    async function submitInfo() {
      let isSucceed = false
      await axios
          .post(`http://10.26.123.10:8888/login?username=${userInfo.email}&password=${userInfo.password}`)
          .then((response) => {
            if (response.data.code === 1) {
              this.$router.push('/course')
              isSucceed = true
            } else {
              isSucceed = false
            }
          }, err => {
            alert(err)
            isSucceed = false
          })
      return isSucceed
    }

    const ruleFormRef = ref<FormInstance>()
    const validateEmail = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else {
        callback()
      }
    }

    const validatePass = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else {
        if (userInfo.password !== '') {
          if (!ruleFormRef.value) return
          ruleFormRef.value.validateField('checkPass', () => null)
        }
        callback()
      }
    }

    const validatePass2 = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== userInfo.password) {
        callback(new Error("Two inputs don't match!"))
      } else {
        callback()
      }
    }

    const rules = reactive({
      email: [{validator: validateEmail, trigger: 'blur'}],
      password: [{validator: validatePass, trigger: 'blur'}],
      checkPassword: [{validator: validatePass2, trigger: 'blur'}],
    })




    return {
      userInfo,
      clearInfo,
      register,
      rules,
      ruleFormRef
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
  height: 500px;
  padding: 10px 40px 10px 40px;
  background-color: white;
}

#login-title {
  font-size: 30px;
  letter-spacing: 10px;
}

.email-input {
  margin: 20px 0 35px 0;
}

.password-input {
  margin: 0 0 0 0;
}

.password-input-again {
  margin: 35px 0 50px 0;
}

.ask-login {
  line-height: 30px;
  text-align: center;
  font-size: 10px;
}

.login-button {
  margin: 30px 20px 20px 0;

}
</style>