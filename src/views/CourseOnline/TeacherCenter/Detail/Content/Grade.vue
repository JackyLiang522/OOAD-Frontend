<template>
  <h4 style="margin: 0 0 0 10px">{{ `第${chapterInfo.number}章 ${chapterInfo.title}` }}</h4>
  <div style="display: flex;justify-content: center; margin-top: 20px">
    <div>章节成绩</div>
  </div>
  <div style="display: flex;justify-content: center">

    <el-table
        id="chapterTable"
        :data="table_data"
        border
        style="width: 650px;margin:20px 20px 0 20px;"
        stripe
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
    >
      <el-table-column prop="name" label="学生姓名" width="150px"/>
      <el-table-column prop="homework_score" label="作业分数" width="100px"/>
      <el-table-column prop="quiz_score" label="测验分数" width="100px"/>
      <el-table-column label="学生作答" width="150px">
        <template v-slot="scope">
          <el-link type="primary" v-if="table_data[scope.$index]?.attachment_url !== ''" @click="openUrl(table_data[scope.$index]?.attachment_url)">
            {{ table_data[scope.$index]?.attachment_name }}
          </el-link>
          <a v-else style="color: gray">
            学生暂未提交
          </a>
        </template>
      </el-table-column>
      <el-table-column label="编辑" width="150px">
        <template v-slot="scope">
          <el-button
              type="success"
              size="small"
              @click="editScore(scope.$index)"
              round>
            编辑
          </el-button>
<!--          <el-button
              type="danger"
              size="small"
              @click="removeRow(scope.$index)"
              round>
            删除
          </el-button>-->
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div style="display: flex;justify-content: right;margin: 20px 50px 0 0">
    <el-button-group>
      <el-button type="primary" @click="submitInfo" round>提交变更</el-button>
      <el-button type="primary" @click="exportData" round>导出成绩</el-button>
<!--      <exportExcel :id="'chapterTable'" :name="'章节成绩'" style="margin:0 0 0 0"></exportExcel>-->
    </el-button-group>
  </div>


  <Teleport to="body">
    <el-dialog v-model="dialog_visible" title="编辑分数" width="500px">
      <div style="display: flex;justify-content: center">
        <el-form>
          <el-form-item label="作业分数">
            <el-input style="width: 300px;" v-model="new_homework_score" placeholder="请输入作业分数" clearable/>
          </el-form-item>
          <el-form-item label="测验分数">
            <el-input style="width: 300px;" v-model="new_quiz_score" placeholder="请输入测验分数" clearable/>
          </el-form-item>
        </el-form>
      </div>

      <template #footer style="margin: 0 0 0 0">
      <span>
        <el-button @click="dialog_visible = false">取消</el-button>
        <el-button type="primary" @click="submitEdit">
          确认
        </el-button>
      </span>
      </template>
    </el-dialog>
  </Teleport>
</template>

<script>
import {computed, onBeforeMount, reactive, ref, watch} from "vue";
import ExportExcel from "@/views/CourseOnline/TeacherCenter/Detail/Student/ExportExcel.vue";
import {ElMessage} from "element-plus";
import axios from "axios";
import store from "@/store";
import {useRoute} from "vue-router";

export default {
  name: "Grade",
  components: {ExportExcel},
  props: ['chapterInfo'],
  setup(props) {
    const chapterId = computed(() => props.chapterInfo.id)
    const courseId = useRoute().query.courseId
    let table_data = ref([
      // {
      //   id: 0,
      //   name: 'Stu 1',
      //   homework_score: 10,
      //   quiz_score: 10,
      //   homework_gradebook_id: 0,
      //   quiz_gradebook_id: 0,
      //   attachment_url: 'https://sakai.sustech.edu.cn/access/content/attachment/85c9d4ad-5ce9-4059-b7b4-b775bd75494d/%E4%BD%9C%E4%B8%9A/615a2f50-d4c7-4a0c-9e25-5f6ba700196b/cs305_homework2.pdf',
      //   attachment_name: 'name1'
      // },
    ])

    onBeforeMount(() => {
      refreshTable();
    })

    watch(props.chapterInfo, () => refreshTable())

    const refreshTable = async () => {
      if(chapterId.value === -1)
        return
      // table_data.value
      // console.log(chapterId.value)
      await axios.get(`http://${store.state.host}/api/export/list?chapterId=${chapterId.value}`).then((response) => {
        // TODO 这里应该是要传一个URL做预览
        table_data.value = response.data;
        // console.log(table_data)
        // console.log(response.data)
      })
    }

    async function exportData() {
      window.location.href = `http://${store.state.host}/api/export?chapterId=${chapterId.value}`;
    }

    async function submitInfo() {
      //  TODO: 这里把table_data传给后端
      await axios.post(`http://${store.state.host}/api/export/updateQuizAndAssignment`, table_data.value)
    }

    function removeRow(index) {
      table_data.value.splice(index, 1)
    }

    const dialog_visible = ref(false)
    const new_homework_score = ref()
    const new_quiz_score = ref()
    const edited_index = ref()

    function editScore(index) {
      edited_index.value = index
      new_homework_score.value = table_data[index]?.homework_score
      new_quiz_score.value = table_data[index]?.quiz_score
      dialog_visible.value = true
    }

    function submitEdit() {
      const score_reg = /^([1-9]\d?|100)$/
      if (score_reg.test(new_homework_score.value) && score_reg.test(new_quiz_score.value)) {
        const row = table_data.value[edited_index.value]
        // console.log("new_homework_score.value" + new_homework_score.value)
        row.homework_score = new_homework_score.value
        row.quiz_score = new_quiz_score.value
        dialog_visible.value = false
      } else {
        ElMessage({
          type: 'error',
          message: ('分数只能为 0 ~ 100 的整数'),
          grouping: true
        })
      }
    }

    function openUrl(url) {
      window.open(url)
    }

    return {
      table_data,
      editScore,
      submitInfo,
      removeRow,
      dialog_visible,
      new_homework_score,
      new_quiz_score,
      submitEdit,
      exportData,
      openUrl
    }
  }
}
</script>
<style scoped>
</style>