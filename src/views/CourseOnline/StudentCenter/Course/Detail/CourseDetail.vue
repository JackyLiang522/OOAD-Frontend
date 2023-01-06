<template>
  <div style="display: flex;justify-content: center;">

    <el-divider content-position="left"
                style="display: flex;justify-content: center;width: 70%; margin:30px  0 30px 3%"><b>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/student/course' } "><h3>课程列表</h3>
        </el-breadcrumb-item>
        <el-breadcrumb-item><h3>{{ courseName }}</h3></el-breadcrumb-item>
      </el-breadcrumb>
    </b>
    </el-divider>
  </div>
  <div style="display: flex;justify-content: center;">
    <el-card class="box-card" style="height: 100%; width:50%">
      <div slot="header" class="clearfix" style="margin-bottom: 10px">
        <h3>{{ courseName }}</h3>
      </div>
      <div style="display: flex;justify-content: center;">
        <div>课程作业</div>
      </div>
      <div style="display: flex;justify-content: center;">
        <el-table
            :data="hwData"
            stripe
            :border="true"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            style="width: 100%; margin: 10px 0 0 0;">
          <el-table-column
              prop="title"
              label="作业标题"
              width="150">
            <template v-slot="scope">
              <router-link
                  :to="`/student/course/hw?chapterId=${hwData[scope.$index].chapterId}&courseId=${courseId}`">
                {{ scope.row.title }}
              </router-link>
            </template>
          </el-table-column>

          <el-table-column
              prop="state"
              label="状态"
              min-width="150">
          </el-table-column>


          <el-table-column
              prop="date"
              label="截止日期"
              min-width="200">
          </el-table-column>
          <el-table-column
              prop="score"
              label="分数"
              min-width="100">
          </el-table-column>
        </el-table>
      </div>
      <div style="display: flex;justify-content: center; margin-top: 40px">
        <div>课程进度</div>
      </div>
      <div style="display: flex;justify-content: center;">
        <el-table
            :data="pgData"
            stripe
            :border="true"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            style="width: 100%; margin: 10px 0 0 0;">
          <el-table-column
              prop="title"
              label="章节"
              width="150"
          >
          </el-table-column>
          <el-table-column
              prop="state"
              label="状态"
              min-width="150">
          </el-table-column>
          <el-table-column
              prop="score"
              label="小测得分"
              min-width="150">
          </el-table-column>
        </el-table>
      </div>
<!--      <el-button style="float: right; margin: 40px  3% 20px 0" type="danger" round>退课</el-button>-->


    </el-card>
  </div>
</template>

<script>
import {onBeforeMount, ref} from "vue";
import courseInfoCard from "../../../Home/CourseInfoCard.vue";
import {useRoute} from "vue-router";
import axios from "axios";
import store from "@/store";
import {useStore} from "vuex";

export default {
  name: "CourseDetail",
  computed: {
    courseInfoCard() {
      return courseInfoCard
    }
  },
  setup() {
    const route = useRoute()
    const courseId = route.query.courseId
    const store = useStore()
    const userID = store.state.userInfo.id
    const hwData = ref()
    const pgData = ref()
    const courseName = ref()


    onBeforeMount(async () => {
      // TODO: 从后端更新两个data变量/listHwData
      hwData.value = [{
        title: '作业1',
        state: '完成',
        date: '2016-05-02',
        score: 90,
        chapterId: 0
      }, {
        title: '作业2',
        state: '未完成',
        date: '2016-05-02',
        score: '-',
        chapterId: 1
      }]
      pgData.value = [
        {
          title: '章节一',
          state: '完成',
          score: 90
        }, {
          title: '章节二',
          state: '未完成',
          score: '-'
        }
      ]

      // TODO: 根据courseId获取课程名
      courseName.value = 'Java'
      await axios.get(`http://${store.state.host}/api/course/list_by_id?courseId=${courseId}`).then((response) => {
        courseName.value = response.data.courseName
      })

      await axios.get(`http://${store.state.host}/api/course/listHwData?courseId=${courseId}&&studentId=${userID}`).then((response) => {
        hwData.value = response.data
      })


      await axios.get(`http://${store.state.host}/api/course/listPgData?courseId=${courseId}&&studentId=${userID}`).then((response) => {
        pgData.value = response.data
      })

    })

    return {
      hwData,
      pgData,
      courseName,
      courseId
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}


.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}
</style>