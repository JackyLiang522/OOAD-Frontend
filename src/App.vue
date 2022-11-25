<template>
<!--  <Login/>-->
<!--  <Register/>-->
  <Home/>
</template>

<script>
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/Home";
import router from "@/router";

export default {
  name: 'App',
  components: {
    Home,
    Register,
    Login,
  },
  router
}
</script>

<style>

</style>
