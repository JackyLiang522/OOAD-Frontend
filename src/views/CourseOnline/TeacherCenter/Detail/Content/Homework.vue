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
          <a :href="table_data[scope.$index].attachment_url">
            {{ table_data[scope.$index].attachment_name }}
          </a>
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

  <div style="display: flex;justify-content: center;margin-top: 20px">
    <el-button type="primary" @click="addRow" v-show="table_data.length === 0">
      增加新作业
    </el-button>
    <el-button type="primary">
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
        <el-button type="primary" @click="submitEdit">
          确认
        </el-button>
      </span>
      </template>
    </el-dialog>
  </Teleport>

</template>

<script lang="ts">
import {reactive, ref} from "vue";
import {ElMessage, genFileId, UploadInstance, UploadProps, UploadRawFile} from "element-plus";
import {useRoute} from "vue-router";
import {useStore} from "vuex";

export default {
  name: "Homework",
  props: ['chapterInfo'],
  setup(props: any) {
    const store = useStore()
    const chapterId = props.chapterInfo.id
    const courseId = useRoute().query.courseId
    const hwURL = "http://" + store.state.host + "/api/upload/pdf?chapterId=" + chapterId
    const upload = ref<UploadInstance>()
    const table_data = reactive([
      {
        title: '标题1',
        deadline: '这里表示DDL',
        attachment_url: 'https://sakai.sustech.edu.cn/access/content/attachment/85c9d4ad-5ce9-4059-b7b4-b775bd75494d/%E4%BD%9C%E4%B8%9A/615a2f50-d4c7-4a0c-9e25-5f6ba700196b/cs305_homework2.pdf',
        attachment_name: 'name1'
      }
    ])

    const dialog_visible = ref(false)
    const new_deadline = ref('')
    const edited_index = ref(0)
    const new_title = ref('')

    function editRow(index: number) {
      edited_index.value = index
      dialog_visible.value = true
      new_deadline.value = table_data[index].deadline
      new_title.value = table_data[index].title
    }

    async function submitEdit() {
      if (upload.value === undefined)
        return
      console.log(courseId)
      await submitUpload()
      dialog_visible.value = false
      const row = table_data[edited_index.value]
      row.deadline = new_deadline.value
      row.title = new_title.value
      row.attachment_name = upload.value.name
      //  TODO: 这里把后端得到的文件下载地址传进去
      //   row.attachment_url = 'xxx/xxx/xxx'

    }

    function removeRow(index: number) {
      table_data.splice(index, 1)
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
      table_data.push({
        title: '',
        deadline: '',
        attachment_url: '',
        attachment_name: ''
      })
    }


    return {
      table_data,
      editRow: editRow,
      submitEdit: submitEdit,
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
      upload
    }
  }
}
</script>

<style scoped>

</style>