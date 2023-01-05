<template>
  <el-page-header title="返回" @back="$router.push('/teacher/overview/list')">
    <template #breadcrumb>
      <el-breadcrumb :separator-icon="ArrowRight()">
        <el-breadcrumb-item to="/teacher/overview/list">
          课程列表
        </el-breadcrumb-item>
        <el-breadcrumb-item>学生名单</el-breadcrumb-item>
      </el-breadcrumb>
    </template>
    <template #content>
      <span class="text-large font-600 mr-3"> {{ courseName }} </span>
    </template>
  </el-page-header>

  <el-divider/>
  <div style="display: flex;justify-content: center;">
    <el-card class="box-card" style="height: 100%; width:50%">
      <div slot="header" class="clearfix" style="margin-bottom: 10px">
        <h3>学生名单</h3>
      </div>
      <div style="display: flex;justify-content: center;">
        <div></div>
      </div>
      <div style="display: flex;justify-content: center;">
        <el-table
            id="stuTable"
            :data="stuData"
            stripe
            :border="true"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            style="width: 100%; margin: 10px 0 0 0;">
          <el-table-column
              prop="name"
              label="姓名">
            <template #default="scope">
              <div>{{ scope.row.name }}</div>
            </template>
          </el-table-column>

          <el-table-column
              prop="email"
              label="邮箱">
          </el-table-column>
        </el-table>
      </div>
      <el-button type="primary"   size="default" @click="exportData"
                 style="float: right; margin: 40px  3% 20px 0"  round>导出</el-button>
<!--      <exportExcel :id="'stuTable'" :name="'学生名单'"></exportExcel>-->

      <!--/*      <el-button @click="exportToExcel" style="float: right; margin: 40px  3% 20px 0" type="primary" round>导出</el-button>*/-->


    </el-card>
  </div>
</template>

<script lang="ts">
import {ArrowRight} from "@element-plus/icons-vue";
//导入依赖项
// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'
// const XLSX = require('xlsx')

import ExportExcel from "@/views/CourseOnline/TeacherCenter/Detail/Student/ExportExcel.vue";
import {useRoute} from "vue-router";
import {onBeforeMount, ref} from "vue";
import axios from "axios";
import videojs from "video.js";
import use = videojs.use;
import {useStore} from "vuex";
import store from "@/store";

export default {
  name: "Student",
  components: {ExportExcel},
  methods: {
    ArrowRight() {
      return ArrowRight
    },

  },
  setup() {
    const route = useRoute()
    const courseId = route.query.courseId
    const courseName = ref('')
    const store = useStore()
    const stuData = ref([])

    onBeforeMount(async () => {
      await axios.get(`http://${store.state.host}/api/course/list_by_id?courseId=${courseId}`)
          .then(response => {
            courseName.value = response.data.courseName
          })

      // TODO: 获取stuData
      await axios.get(`http://${store.state.host}/api/course/list_by_id?courseId=${courseId}`)
          .then(response => {
            courseName.value = response.data.courseName
          })

      await axios.get(`http://${store.state.host}/api/client/getByCourse?courseId=${courseId}`)
          .then(response => {
            stuData.value = response.data
          })

    })


    function exportData(){
      window.location.href = `http://${store.state.host}/api/export/studentData?courseId=${courseId}`;
    }

    return {
      stuData,
      courseName,
      exportData,
    }
  },
}
</script>

<style scoped>

</style>