<template>
<router-view/>
</template>

<script>
import Login from "@/views/Login/Login";
import Register from "@/views/Login/Register";
import router from "@/router/Login";

export default {
  name: 'login_app',
  components: {
    Register,
    Login,
  },
  router
}
</script>

<style>

</style>
