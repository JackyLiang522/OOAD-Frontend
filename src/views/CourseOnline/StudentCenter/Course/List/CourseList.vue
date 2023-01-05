<template>
  <!--  <div style="display: flex;justify-content: center;">-->
  <!--    <el-divider content-position="left"-->
  <!--                style="display: flex;justify-content: center;width: 70%; margin:30px  0 3% 3%"><b>-->
  <!--      <h2>我的课程</h2>-->
  <!--    </b>-->
  <!--    </el-divider>-->
  <!--  </div>-->
  <el-container>
    <el-header style="height: 70px">
      <h3 style="margin-right: 5px;">
        <span style="vertical-align: 22%">我的课程</span>
        <el-icon size="30px" style="margin-left: 5px">
          <List/>
        </el-icon>
      </h3>
    </el-header>
    <hr class="style-three" style="margin-bottom: 30px">
  </el-container>

  <div style="display: flex;justify-content: center;">

    <el-input
        v-model="searchInfo"
        size="large"
        placeholder="请输入课程名"
        style="width: 50%; margin:  20px 0 10px 0"
    />
    <el-button
        size="large"
        :icon="Search()"
        @click="searchCourses"
        style="display: flex;justify-content: center; width: 100px;  margin:  20px 0 0  20px">搜索
    </el-button>
  </div>

  <el-row style="margin:  0 0 0 0" align="middle" v-for="course in shownCourses">
    <el-col :span="5" :offset="6" style="text-align: center;vertical-align: center">
      <div class="grid-content bg-purple-light">
        <router-link :to="`/video?courseId=${course.id}`" style="margin-top: 10px;line-height:inherit;display: block">
          <h4>{{ course.courseName }}</h4></router-link>
        <!--        跳转至课程视频观看url-->
      </div>
    </el-col>
    <el-col :span="5" style="text-align: center;vertical-align: center">
      <div class="grid-content bg-purple">
        <router-link :to="`/student/course/detail?courseId=${course.id}`">
          <h4>课程详情</h4></router-link>
      </div>
    </el-col>
    <el-col :span="2">
      <div class="grid-content bg-purple-dark">
        <h5 style="text-align: center">教师: {{ course.teacher }} </h5>
      </div>
    </el-col>
  </el-row>


</template>

<script>
import {onMounted, ref} from "vue";
import axios from "axios";
import store from "@/store";
import {Search} from "@element-plus/icons-vue";

export default {
  name: "CourseList",
  methods: {
    Search() {
      return Search
    }
  },
  setup() {
    const allCourses = ref([])
    const userInfo = JSON.parse(localStorage.getItem('user_info'))

    onMounted(async () => {
      // 从后端获取订阅的课程
      const coursesResponse = await axios.get(`http://${store.state.host}/api/course/list_subscribed?clientId=${userInfo.id}`);
      for (let i = 0; i < coursesResponse.data.length; i++) {
        const teacherResponse = await axios.get(`http://${store.state.host}/api/course/get_teacher?courseId=${coursesResponse.data[i].id}`);
        allCourses.value.push({
          id: coursesResponse.data[i].id,
          courseName: coursesResponse.data[i].courseName,
          teacher: teacherResponse.data.name,
        })
      }
      shownCourses.value = allCourses.value
    })

    const searchInfo = ref('')
    const shownCourses = ref([])

    function searchCourses() {
      const temp = []
      allCourses.value
          .filter(course => course.courseName.includes(searchInfo.value))
          .forEach(course => temp.push(course))
      shownCourses.value = temp
    }

    return {
      shownCourses,
      searchInfo,
      searchCourses
    }
  }
}
</script>

<style>
hr.style-three {
  width: 100%;
  margin: 0 auto;
  border: 0;
  height: 5px;
  background: #333 linear-gradient(to right, #ccc, #333, #ccc);
}


.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

</style>