<template>
<router-view/>
</template>

<script>
import Login from "@/views/Login";
import Register from "@/views/Register";
import router from "@/router/login";

export default {
  name: 'loginApp',
  components: {
    Register,
    Login,
  },
  router
}
</script>

<style>

</style>
