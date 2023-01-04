<template>
  <div style="display: flex;justify-content: center;">
    <el-input v-model="searchInfo" size="large" placeholder="请输入" style="width: 450px"/>
    <el-button size="large" :icon="Search" style="margin-left: 20px;width: 100px">搜索</el-button>
  </div>
  <el-divider/>

  <el-space wrap style="display: flex;justify-content: center;">
    <CourseInfoCard
        v-for="course in courses"
        :courseId="course.id"
        :courseName="course.courseName"
        :teacher="course.teacher"
        :chapterCount="course.chapterCount"
        :price="course.price"
        :introduction="course.introduction"
        :hasPurchased="hasPurchased(course.id)"
        :purchaseCourse="purchaseCourse"
    />
  </el-space>
  <el-pagination layout="prev, pager, next" style="display: flex;justify-content: center;margin-top: 50px"
                 :total="100"/>
</template>

<script>
import {useStore} from "vuex";
import {computed, onMounted} from "vue";
import axios from "axios";
import CourseInfoCard from "@/views/CourseOnline/Home/CourseInfoCard.vue";
import {ref} from "vue";
import {Search} from "@element-plus/icons-vue";

export default {
  methods: {Search},
  components: {CourseInfoCard},
  setup() {
    let searchInfo = ref('')
    let courses = ref([])
    let purchasedCourses = ref([])
    const store = useStore()
    const userInfo = JSON.parse(localStorage.getItem('user_info'))

    function hasPurchased(courseId) {
      const store = useStore()
      const identity = store.state.userInfo.identity
      return (identity === 'student' && purchasedCourses.value.some(item => item.id === courseId))
          || (identity === 'teacher')
    }

    function purchaseCourse(courseId, price, course_name) {
      const date = new Date();
      const mon = date.getMonth() + 1;
      const day = date.getDate();
      const curDate = date.getFullYear() + "-" + (mon < 10 ? "0" + mon : mon) + "-" + (day < 10 ? "0" + day : day);
      const store = useStore()
      const new_record = {
        date: curDate,
        remain: store.state.userInfo.balance,
        change: -price,
        course_name: course_name
      }
      // 把 new_record 也发给后端，加入交易历史
      axios.post(`http://${store.state.host}/api/course/subscribe?courseId=${courseId}&clientId=${userInfo.id}`).then((response) => {
        purchasedCourses.value.push(courses.value.find(item => item.id === courseId))
      })
    }

    onMounted(async () => {
      const coursesResponse = await axios.get(`http://${store.state.host}/api/course/list`);
      for (let i = 0; i < coursesResponse.data.length; i++) {
        const chapterCountResponse = await axios.get(`http://${store.state.host}/api/chapter/list?courseId=${coursesResponse.data[i].id}`);
        const teacherResponse = await axios.get(`http://${store.state.host}/api/course/get_teacher?courseId=${coursesResponse.data[i].id}`);
        courses.value.push({
          id: coursesResponse.data[i].id,
          courseName: coursesResponse.data[i].courseName,
          teacher: teacherResponse.data.name,
          chapterCount: chapterCountResponse.data.length,
          price: coursesResponse.data[i].price,
          introduction: coursesResponse.data[i].introduction
        })
      }

      const subscribeResponse = await axios.get(`http://${store.state.host}/api/course/list_subscribed`, {
        params: {
          clientId: userInfo.id
        }
      })
      purchasedCourses.value = subscribeResponse.data
    })

    return {
      courses,
      hasPurchased,
      purchaseCourse,
      purchasedCourses,
      searchInfo,
    }
  },
}
</script>

<style scoped>
</style>