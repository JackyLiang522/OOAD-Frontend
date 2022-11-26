<template>
<router-view/>
</template>

<script>
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import router from "@/router/login";

export default {
  name: 'login',
  components: {
    Register,
    Login,
  },
  router
}
</script>

<style>

</style>
