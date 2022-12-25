<template>
  <h4 style="margin: 0 0 0 10px">{{ `第${chapterInfo.number}章 ${chapterInfo.title}` }}</h4>
  <div style="display: flex;justify-content: center; margin-top: 40px">
    <div>章节成绩</div>
  </div>
  <div style="display: flex;justify-content: center">

    <el-table
        id="chapterTable"
        :data="table_data"
        border
        style="width: 700px;margin:20px 20px 0 20px;"
        height="250px"
        stripe
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
    >
      <el-table-column prop="name" label="学生姓名" width="200px"/>
      <el-table-column prop="score" label="分数" width="350px"/>

      <el-table-column label="编辑" width="150px">
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
  </div> <div style="display: flex;justify-content: right;margin-right: 100px">
      <exportExcel :id="'chapterTable'" :name="'章节成绩'"></exportExcel>
    </div>



  <!--    <el-button type="primary" plain>-->
  <!--      导出为-->
  <!--    </el-button>-->
</template>

<script>
import {reactive} from "vue";
import ExportExcel from "@/views/CourseOnline/TeacherCenter/Detail/Student/ExportExcel.vue";

export default {
  name: "Grade",
  components: {ExportExcel},
  props: ['chapterInfo'],
  setup() {
    const table_data = reactive([
      {
        name: 'Stu 1',
        score: 10,
      }, {
        name: 'stu 2',
        score: 20,
      }, {
        name: 'stu 3',
        score: 30
      }, {
        name: 'stu 3',
        score: 30
      }, {
        name: 'stu 3',
        score: 30
      }, {
        name: 'stu 3',
        score: 30
      }, {
        name: 'stu 3',
        score: 30
      }, {
        name: 'stu 3',
        score: 30
      }, {
        name: 'stu 3',
        score: 30
      }, {
        name: 'stu 3',
        score: 30
      }, {
        name: 'stu 3',
        score: 30
      }, {
        name: 'stu 3',
        score: 30
      }, {
        name: 'stu 3',
        score: 30
      }, {
        name: 'stu 3',
        score: 30
      }, {
        name: 'stu 3',
        score: 30
      }, {
        name: 'stu 3',
        score: 30
      }, {
        name: 'stu 3',
        score: 30
      }
    ])

    return {
      table_data
    }
  }
}
</script>

<style scoped>

</style>