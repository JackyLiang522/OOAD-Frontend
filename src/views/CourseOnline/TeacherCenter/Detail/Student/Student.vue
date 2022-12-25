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
      <span class="text-large font-600 mr-3"> 高等数学 </span>
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
              prop="score"
              label="分数">
          </el-table-column>
          <el-table-column label="操作" width="150px">
            <el-button
                type="success"
                size="small" round>
              编辑
            </el-button>
            <el-button
                type="danger"
                size="small" round>
              删除
            </el-button>
          </el-table-column>
        </el-table>
      </div>
      <exportExcel :id="'stuTable'" :name="'学生名单'"></exportExcel>

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

export default {
  name: "Student",
  components: {ExportExcel},
  methods: {
    ArrowRight() {
      return ArrowRight
    },

  },
  data() {
    return {
      stuData: [{
        name: 'ksco',
        score: 90
      },
        {
          name: 'tsuki',
          score: '-'
        }],
    }
  },
  // setup() {
  //   return {}
  // }
}
</script>

<style scoped>

</style>