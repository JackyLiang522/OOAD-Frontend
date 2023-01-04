<template>
  <div style="display: flex;justify-content: center;">
    <el-input v-model="searchInfo" size="large" placeholder="请输入" style="width: 450px"/>
    <el-button
        size="large"
        :icon="Search"
        style="margin-left: 20px;width: 100px"
        @click="handleSearch"
    >搜索
    </el-button>
  </div>
  <el-divider/>

  <el-space wrap style="display: flex;justify-content: center;">
    <CourseInfoCard
        v-for="course in shownCourses"
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
  <el-pagination
      layout="prev, pager, next"
      style="display: flex;justify-content: center;margin-top: 50px"
      :total="resultCourses.length"
      :page-size="pageSize"
      v-model:current-page="currentPage"
      @current-change="changeShown"
  />
</template>

<script>
import {useStore} from "vuex";
import {computed, onBeforeMount} from "vue";
import axios from "axios";
import CourseInfoCard from "@/views/CourseOnline/Home/CourseInfoCard.vue";
import {ref} from "vue";
import {Search} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";

export default {
  components: {CourseInfoCard},
  setup() {
    let searchInfo = ref('')
    let allCourses = ref([])
    let purchasedCourses = ref([])
    const pageSize = ref(8)
    const currentPage = ref(1)
    const store = useStore()
    const userInfo = JSON.parse(localStorage.getItem('user_info'))
    const shownCourses = ref([])
    const resultCourses = ref([])


    function changeShown() {
      const temp = []
      for (let i = (currentPage.value - 1) * pageSize.value; i < Math.min(resultCourses.value.length, currentPage.value * pageSize.value); i++) {
        temp.push(resultCourses.value[i])
      }
      shownCourses.value = temp
    }

    function hasPurchased(courseId) {
      const store = useStore()
      const identity = store.state.userInfo.identity
      return (identity === 'student' && purchasedCourses.value.some(item => item.id === courseId))
          || (identity === 'teacher')
    }

    function purchaseCourse(courseId, price, course_name) {
      console.log("purchaseCourse")
      const date = new Date();
      const mon = date.getMonth() + 1;
      const day = date.getDate();
      const curDate = date.getFullYear() + "-" + (mon < 10 ? "0" + mon : mon) + "-" + (day < 10 ? "0" + day : day);
      // const store = useStore()
      const new_record = {
        date: curDate,
        remain: store.state.userInfo.balance,
        change: -price,
        course_name: course_name
      }
      // 把 new_record 也发给后端，加入交易历史
      axios.post(`http://${store.state.host}/api/course/subscribe?courseId=${courseId}&clientId=${userInfo.id}`).then((response) => {
        if (response.data) {
          purchasedCourses.value.push(allCourses.value.find(item => item.id === courseId))
          ElMessage({
            message: '购买成功',
            type: 'success',
          });
        }else {
          ElMessage({
            message: '余额不足',
            type: 'warning',
          });
        }
      })
    }

    onBeforeMount(async () => {
      let coursesResponse
      const store = useStore()
      if (store.state.userInfo.identity === 'student') {
        coursesResponse = await axios.get(`http://${store.state.host}/api/course/list`)
      } else {
        const userId = store.state.userInfo.id
        coursesResponse = await axios.get(`http://${store.state.host}/api/course/list_by_teacher?&&teacherId=${userId}`)
      }
      for (let i = 0; i < coursesResponse.data.length; i++) {
        const chapterCountResponse = await axios.get(`http://${store.state.host}/api/chapter/list?courseId=${coursesResponse.data[i].id}`);
        const teacherResponse = await axios.get(`http://${store.state.host}/api/course/get_teacher?courseId=${coursesResponse.data[i].id}`);
        allCourses.value.push({
          id: coursesResponse.data[i].id,
          courseName: coursesResponse.data[i].courseName,
          teacher: teacherResponse.data.name,
          chapterCount: chapterCountResponse.data.length,
          price: coursesResponse.data[i].price,
          introduction: coursesResponse.data[i].introduction
        })
      }
      resultCourses.value = allCourses.value
      changeShown()

      const subscribeResponse = await axios.get(`http://${store.state.host}/api/course/list_subscribed`, {
        params: {
          clientId: userInfo.id
        }
      })
      purchasedCourses.value = subscribeResponse.data
    })

    const handleSearch = function () {
      const tempResults = []
      allCourses.value
          .filter(course => course.courseName.indexOf(searchInfo.value) !== -1)
          .forEach(course => tempResults.push(course))
      resultCourses.value = tempResults
      changeShown()
    }

    return {
      courses: allCourses,
      hasPurchased,
      purchaseCourse,
      purchasedCourses,
      searchInfo,
      currentPage,
      pageSize,
      changeShown,
      Search,
      shownCourses,
      handleSearch,
      resultCourses,
    }
  },
}
</script>

<style scoped>
</style>