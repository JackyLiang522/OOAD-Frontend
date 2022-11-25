<template>
  <el-header>
    <el-row class="row-bg" justify="end">
      <el-link type="primary"><router-link to="/login">登录</router-link></el-link>
      <el-link type="default"><router-link to="/register">注册</router-link></el-link>
    </el-row>
  </el-header>
  <router-view/>
</template>

<script>
export default {
  name: "Home"
}
</script>

<style scoped>

</style>