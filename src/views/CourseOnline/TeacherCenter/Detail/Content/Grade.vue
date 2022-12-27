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
        <template v-slot="scope">
          <el-button
              type="success"
              size="small"
              @click="editScore(scope.$index)"
              round>
            编辑
          </el-button>
          <el-button
              type="danger"
              size="small"
              @click="removeRow(scope.$index)"
              round>
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div style="display: flex;justify-content: right;margin: 20px 50px 0 0">
    <el-button-group>
      <el-button type="primary" @click="submitInfo" round>提交变更</el-button>
      <exportExcel :id="'chapterTable'" :name="'章节成绩'" style="margin:0 0 0 0"></exportExcel>
    </el-button-group>
  </div>


  <!--    <el-button type="primary" plain>-->
  <!--      导出为-->
  <!--    </el-button>-->
</template>

<script>
import {reactive} from "vue";
import ExportExcel from "@/views/CourseOnline/TeacherCenter/Detail/Student/ExportExcel.vue";
import {ElMessageBox, ElMessage} from "element-plus";

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

    const editScore = (index) => {
      ElMessageBox.prompt('请输入新标题', '编辑标题', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^([1-9]\d?|100)$/,
        inputErrorMessage: '只能输入 0 ~ 100 的整数'
      })
          .then(({value}) => {
            table_data[index].score = value
          })
          .catch(() => {
          })
    }

    function submitInfo() {
      //   这里把所有东西传给后端
    }

    function removeRow(index) {
      table_data.splice(index, 1)
    }

    return {
      table_data,
      editScore,
      submitInfo,
      removeRow
    }
  }
}
</script>

<style scoped>

</style>