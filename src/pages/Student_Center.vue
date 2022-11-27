<template>
  <el-container>
    <el-header>
      <h2>Hello, student xxx</h2>
    </el-header>
    <el-main>My courses</el-main>
  </el-container>
  <button @click="test">1111</button>
</template>

<script>
import axios from "axios";
import store from "@/store";

export default {
  name: "Student_Center",
  setup() {
    function test() {
      const protocol = window.location.protocol
      const host = window.location.host
      // console.log(`${s1}/login`)
      // window.location.href = `${s1}/login`
      window.location.href=`${protocol}//${host}/login#/login`
      // console.log(`${protocol}//${host}/login#/`)
    }

    return {
      test
    }
  }
}
</script>

<style scoped>

</style>