<template>
  <el-container style="display: flex;flex-direction: column;min-height: 100%;">
    <el-header height="60px" style="background-color: black;">
      <el-row :gutter="20">
        <el-col :span="2" style="text-align: center">
          <router-link :to="icon_link">
            <el-image
                style="width: 30px; height: 30px;margin-top: 5px;"
                src='https://th.bing.com/th/id/OIP.RlUTXgwQmhZvma5follA8gHaHa?pid=ImgDet&rs=1'
                fit="cover"
            />
            <br>
            <div style="font-size: 10px;color:white; height: 10px">Course Online</div>
          </router-link>
        </el-col>
        <el-divider direction="vertical" border-style=" solid" style="height: 50px;margin-top: 5px;"/>
        <div style="
          line-height:60px;
          vertical-align: middle;
          letter-spacing: 2px;
          font-size: 22px;
          color: white;
          margin-left: 20px;
          font-weight: bold;"
        >
          {{ welcome_word }}
        </div>
        <div style="
        position: absolute;
        float: right;
        right: 30px;
        vertical-align: middle;
        height: 60px"
        >
          <router-link :underline="false" :to="email_link" style="color:#3a8ee6">
            <span style="line-height: 60px;">
              {{ email_words }}
            </span>
          </router-link>
          <el-divider direction="vertical" border-style=" solid" style="height: 40px;"/>
          <el-link
              type="primary"
              style="font-size: 15px;color: lightgray;font-weight: bold"
              href="login#/Login"
          >
            {{ login_words }}
          </el-link>
        </div>
      </el-row>
    </el-header>
    <!--  </el-container>-->
    <el-main style="flex: 1">
      <div style="width: 72%;position: relative;transform: translateX(19.44%);">
        <router-view/>
      </div>
    </el-main>
    <!--  <el-container>-->
    <el-footer style="background-color: black;color :white;">
      <p style="text-align: center">已经到底咯</p>
    </el-footer>
  </el-container>
</template>

<script>
import router from "@/router/CourseOnline";
import StudentCenter from "@/views/CourseOnline/StudentCenter/StudentCenter.vue";
import {useStore} from "vuex";
import {computed, onBeforeMount, onMounted} from "vue";

export default {
  name: 'course_online_app',
  components: {
    StudentCenter
  },
  router,
  data() {
    const store = useStore()

    const identity = computed(() => store.state.userInfo.identity)
    const user_name = computed(() => store.state.userInfo.user_name)
    const email = computed(() => store.state.userInfo.email)
    let timer = null
    // const user = computed(() => JSON.parse(localStorage.getItem('user_info')))


    const welcome_word = computed(() => {
      // console.log('home')
      // window.location.href = '/#/home'
      if (identity.value === 'tourist')
        return '欢迎，游客'
      else if (identity.value === 'teacher')
        return `欢迎，教师${user_name.value}`
      else if (identity.value === 'student')
        return `欢迎，学生${user_name.value}`
      else
        return `欢迎，管理员${user_name.value}`
    })

    const email_words = computed(() => {
      if (identity.value === 'tourist')
        return '请登录'
      else
        return email.value
    })

    const email_link = computed(() => {
      if (identity.value === 'teacher')
        return '/teacher/overview/list'
      else if (identity.value === 'student')
        return '/student/course/list'
      else
        return ''
    })

    const login_words = computed(() => {
      if (identity.value === 'tourist')
        return '登录'
      else
        return '切换账号'
    })

    const icon_link = computed(() => {
      if (identity.value === 'admin')
        return ''
      else
        return '/home'
    })

    function test() {
      console.log(user_name.value)
    }

    onMounted(() => {
      timer = setInterval(
      ()=>{
        let user_info = JSON.parse(localStorage.getItem('user_info'))
        // console.log("user.user_name"+user.user_name)
        // console.log("user_name"+user_name.value)
        if (user_name.value !== user_info.user_name){
          console.log('user changed')
          window.location.href = '/#/home'
          store.commit('SET_EMAIL', user_info.email)
          store.commit('SET_USER_NAME', user_info.user_name)
          store.commit('SET_IDENTITY', user_info.identity)
          store.commit('SET_PURCHASED_COURSES', user_info.purchased_courses)
          store.commit('SET_BALANCE', user_info.balance)
        }
      }, 500)
    })

    onBeforeMount(() => {
      const user_info = JSON.parse(localStorage.getItem('user_info'))
      store.commit('SET_EMAIL', user_info.email)
      store.commit('SET_USER_NAME', user_info.user_name)
      store.commit('SET_IDENTITY', user_info.identity)
      store.commit('SET_PURCHASED_COURSES', user_info.purchased_courses)
      store.commit('SET_BALANCE', user_info.balance)
      test()
    })

    return {
      welcome_word,
      email_words,
      email_link,
      login_words,
      icon_link
    }
  },
  // watch: {
  //   user: 'refreshLocation'
  // },
  // methods: {
  //   refreshLocation() {
  //     console.log('back to home')
  //     window.location.href = '/#/home'
  //   }
  // }
}
</script>

<style>
</style>