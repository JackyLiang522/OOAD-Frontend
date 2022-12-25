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
    // // 表格数据写入excel，并导出为Excel文件
    // exportToExcel() {
    //   const XLSX = require('xlsx')
    //   console.log('XLSX', XLSX, FileSaver)
    //   // 使用 this.$nextTick 是在dom元素都渲染完成之后再执行
    //   this.$nextTick(function () {
    //     // 设置导出的内容是否只做解析，不进行格式转换     false：要解析， true:不解析
    //     const xlsxParam = {raw: true}
    //     const wb = XLSX.utils.table_to_book(document.querySelector('#stuTable'), xlsxParam)
    //     // 导出excel文件名
    //     let fileName = '营业收入' + new Date().getTime() + '.xlsx'
    //
    //     const wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'})
    //     try {
    //       // 下载保存文件
    //       FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), fileName)
    //     } catch (e) {
    //       if (typeof console !== 'undefined') {
    //         console.log(e, wbout)
    //       }
    //     }
    //     return wbout
    //   })
    // },

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
  setup() {
    return {}
  }
}
</script>

<style scoped>

</style>