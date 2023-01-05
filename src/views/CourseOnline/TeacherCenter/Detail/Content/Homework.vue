<template>
  <h4 style="margin: 0 0 0 10px">{{ `第${chapterInfo.number}章 ${chapterInfo.title}` }}</h4>

  <div style="display: flex;justify-content: center">
    <el-table
        :data="table_data"
        border
        style="width: 750px;margin:20px 20px 0 20px;"
        stripe
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
    >
      <el-table-column prop="title" label="作业标题" width="200px"/>
      <el-table-column prop="deadline" label="截止日期" width="200px"/>
      <el-table-column prop="attachment_url" label="附件" width="200px">
        <template v-slot="scope">
          <el-link
              @click="openUrl(scope.$index)">
            {{ table_data[scope.$index].attachment_name }}
<!--            {{table_data[scope.$index].attachment_url}}-->
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="编辑" width="150px">
        <template v-slot="scope">
          <el-button
              type="success"
              size="small"
              @click="editRow(scope.$index)"
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

  <div style="display: flex;justify-content: center;margin-top: 20px">
    <el-button type="primary" @click="addRow" v-show="table_data.length === 0">
      增加新作业
    </el-button>
    <el-button type="primary" @click="submitEdit">
      提交作业变更
    </el-button>
  </div>

  <Teleport to="body">
    <el-dialog v-model="dialog_visible" title="编辑截止日期" width="400px">
      <div style="display: flex;justify-content: center">
        <el-form>
          <el-form-item label="作业标题">
            <el-input v-model="new_title" placeholder="请输入作业标题" clearable/>
          </el-form-item>
          <el-form-item label="截止时间">
            <el-date-picker
                v-model="date_time"
                type="datetime"
                placeholder="请选择截止时间"
                format="YYYY/MM/DD hh:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
            />
          </el-form-item>
          <el-form-item label="附件">
            <el-upload
                ref="upload"
                class="upload-demo"
                :action="hwURL"
                :limit="1"
                :on-exceed="handleExceed"
                :on-success="handleSuccess"
                :before-upload="beforeUpload"
                :auto-upload="false"
                list-type="text"
            >
              <template #trigger>
                <el-button type="primary">选择文件</el-button>
              </template>
              <template #tip>
                <div class="el-upload__tip" style="color: indianred">
                  最多上传一份文件，新的提交会覆盖已有提交
                </div>
              </template>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <template #footer style="padding: 0 0 0 0">
      <span>
        <el-button @click="dialog_visible = false">取消</el-button>
        <el-button type="primary" @click="finishEdit">
          确认
        </el-button>
      </span>
      </template>
    </el-dialog>
  </Teleport>
</template>

<script lang="ts">
import {computed, onBeforeMount, reactive, ref, watch} from "vue";
import {ElMessage, genFileId, UploadInstance, UploadProps, UploadRawFile} from "element-plus";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import axios from "axios";

export default {
  name: "Homework",
  props: ['chapterInfo'],
  setup(props: any) {
    const store = useStore()
    const chapterId = computed(() => props.chapterInfo.id)
    const courseId = useRoute().query.courseId
    const hwURL = computed(() => "http://" + store.state.host + "/api/upload/pdf?chapterId=" + props.chapterInfo.id)
    const upload = ref<UploadInstance>()
    const table_data = ref([
      {
        title: '',
        deadline: '',
        attachment_url: '',
        attachment_name: ''
      }
    ])

    watch(chapterId, () => refreshTable())
    const refreshTable = async () => {
      if (chapterId.value === -1)
        return

      // table_data.value
      await axios.get(`http://${store.state.host}/api/assignment/list?chapterId=${chapterId.value}`).then((response) => {
        // teacher.value = response.data.name;
        if (response.data){
          const row = table_data.value[edited_index.value]
          row.deadline = response.data.deadline
          row.title = response.data.title
          row.attachment_name = `作业附件`
          row.attachment_url = `http://${store.state.host}/api/upload/pdf/${chapterId.value}.pdf`
        } else {
          table_data.value = []
        }
      })

    }

    onBeforeMount(() => {
      refreshTable()
    })


    const dialog_visible = ref(false)
    const new_deadline = ref('')
    const edited_index = ref(0)
    const new_title = ref('')

    function editRow(index: number) {
      edited_index.value = index
      dialog_visible.value = true
      new_deadline.value = table_data.value[index].deadline
      new_title.value = table_data.value[index].title

    }

    function finishEdit() {
      if (upload.value === undefined)
        return
      console.log(courseId)

      dialog_visible.value = false
      const row = table_data.value[edited_index.value]
      row.deadline = new_deadline.value
      row.title = new_title.value
      row.attachment_name = '作业附件待提交'
      row.attachment_url = ''
      // row.attachment_name = upload.value.name
      // console.log("upload.value.name")
      // console.log(upload.value.name)
    }

    async function submitEdit() {
      await axios.post(`http://${store.state.host}/api/assignment/add?chapterId=${chapterId.value}&&title=${new_title.value}&&deadline=${new_deadline.value}`)
      await submitUpload()
      await refreshTable()
    }

    function removeRow(index: number) {
      table_data.value.splice(index, 1)
    }


    const beforeUpload = (file: any) => {
      if (!file.name.includes('.pdf')) {
        ElMessage.warning('只能上传pdf文件')
        return false
      } else {
        return true
      }
    }

    const handleExceed: UploadProps['onExceed'] = (files) => {
      upload.value!.clearFiles()
      const file = files[0] as UploadRawFile
      file.uid = genFileId()
      upload.value!.handleStart(file)
      ElMessage({
        message: '已更新提交.',
        type: 'success',
      })
      // this.$message.warning(`已更新提交`);
    }

    const handleSuccess = () => {
      ElMessage({
        message: '上传成功.',
        type: 'success',
      })
    }

    const submitUpload = () => {
      upload.value!.submit()
      console.log("submit")
    }

    function addRow() {
      table_data.value.push({
        title: '',
        deadline: '',
        attachment_url: '',
        attachment_name: ''
      })
    }

    function openUrl(index:number) {
      if (table_data.value[index].attachment_url === ''){
        return
      }
      window.open(table_data.value[index].attachment_url)
    }


    return {
      table_data,
      editRow: editRow,
      finishEdit: finishEdit,
      dialog_visible,
      date_time: new_deadline,
      edited_index,
      new_title,
      removeRow,
      beforeUpload,
      handleExceed,
      handleSuccess,
      submitUpload,
      addRow,
      hwURL,
      upload,
      submitEdit,
      openUrl
    }
  }
}
</script>

<style scoped>

</style>