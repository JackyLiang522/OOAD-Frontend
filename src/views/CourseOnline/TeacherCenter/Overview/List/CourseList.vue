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
        :icon="Search"
        style="display: flex;justify-content: center; width: 100px;  margin:  20px 0 0  20px"
        @click="handleSearch"
    >
      搜索
    </el-button>
  </div>

  <div>
    <el-row v-for="cls in shownClasses" style="margin: 0 0 0 0" align="middle">
      <el-col :span="3" :offset="6" style="text-align: center;margin-top:20px;vertical-align: center">
        <div class="grid-content bg-purple-light">
          <router-link
              :to="{
                path:'/video',
                query:{
                  courseId:cls.id
                }
              }"
              style="line-height:inherit;display: block;">
            <span class="my-h4">{{ cls.courseName }}</span>
          </router-link>
        </div>
      </el-col>
      <el-col :span="9" style="text-align: center;margin-top:20px;vertical-align: center;">
        <div class="grid-content bg-purple">
          <div>
            <router-link :to="{
              path:'/teacher/detail/content',
              query:{
                courseId:cls.id
              }
            }">
              <span class="my-h4">目录</span>
            </router-link>
            <el-divider direction="vertical"/>
            <router-link :to="{
              path:'/teacher/detail/announcement',
              query:{
                courseId:cls.id
              }
            }">
              <span class="my-h4">通知</span>
            </router-link>
            <el-divider direction="vertical"/>
            <router-link :to="{
              path:'/teacher/detail/student',
              query:{
                courseId:cls.id
              }
            }">
              <span class="my-h4">学生</span>
            </router-link>
            <el-divider direction="vertical"/>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>


</template>

<script>
import {Search} from "@element-plus/icons-vue";
import {onBeforeMount, ref} from "vue";
import axios from "axios";
import store from "@/store";
import {useStore} from "vuex";

export default {
  name: "CourseList",
  setup() {
    const searchInfo = ref('')
    const allClasses = ref([])
    const shownClasses = ref([])
    const store = useStore()
    const userId = store.state.userInfo.id

    // TODO 应该添加课程审核的状态 已通过 待审核 被拒绝
    onBeforeMount(async () => {
      await axios.get(`http://${store.state.host}/api/course/list_by_teacher?teacherId=${userId}`)
          .then(response => allClasses.value = response.data)
      shownClasses.value = allClasses.value
    })

    function handleSearch() {
      const temp = []
      allClasses.value
          .filter(course => course.courseName.indexOf(searchInfo.value) !== -1)
          .forEach(course => temp.push(course))
      shownClasses.value = temp
    }

    return {
      Search,
      searchInfo,
      shownClasses,
      handleSearch
    }
  },
}
</script>

<style scoped>
.my-h4 {
  /*display: block;*/
  margin-top: 2em;
  margin-bottom: 1.33em;
  font-weight: bold;
  font-size: 110%;
}

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