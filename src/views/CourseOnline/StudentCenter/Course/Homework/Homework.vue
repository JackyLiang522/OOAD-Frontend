<template>
  <div style="display: flex;justify-content: center;">

    <el-divider content-position="left"
                style="display: flex;justify-content: center;width: 100%; margin:30px  0 30px 0"><b>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/student/course' } "><h3>课程列表</h3>
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/student/course/detail',query:{courseId:route.query.courseId} } "><h3>
          {{ courseName }}</h3></el-breadcrumb-item>
        <el-breadcrumb-item><h3>作业</h3></el-breadcrumb-item>
      </el-breadcrumb>
    </b>
    </el-divider>
  </div>
  <el-row>

    <el-col :span="15">
      <iframe :src="`static/pdf/web/viewer.html?file=http://localhost:8081/api/upload/studentAssignment/${chapterId}_${userID}.pdf`"
              style="width: 100%; height: 600px"
      ></iframe>
    </el-col>

    <el-col :span="8" :offset="1">
      <div style="margin: 20% 0 0 0">
        <el-card class="box-card" style="height: 100%; width:100%">
          <div slot="header" class="clearfix" style="margin-bottom: 10px">
            <h3>{{ homeWork.title }}</h3>
          </div>
          <div style="display: flex;justify-content: center;margin-top: 1px">
            <el-divider></el-divider>
          </div>
          <div>

            <el-descriptions
                class="margin-top"
                :column="3"
                size="large"
                border
            >
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">
                    截止
                  </div>
                </template>
                {{ homeWork.deadline }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">
                    状态
                  </div>
                </template>
                {{ homeWork.state }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">
                    评分
                  </div>
                </template>
                {{ homeWork.state === '未提交' ? '-' : homeWork.score }} / 100.0
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">
                    题目
                  </div>
                </template>
                <el-link type="primary" @click="openUrl(homeWork.attachment.url)">
                  {{ homeWork.attachment.name }}
                </el-link>
              </el-descriptions-item>
            </el-descriptions>
          </div>
          <div v-if="hasExceedDDL">
            <p style="color:red;">截止日期已过，无法提交</p>
          </div>
          <div v-else>
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
                style="margin-top: 20px"
            >
              <!--          :file-list="fileList"-->
              <template #trigger>
                <el-button type="primary">选择文件</el-button>
              </template>
              <el-button class="ml-3" type="success" @click="submitUpload" style="margin-left: 5px">
                提交
              </el-button>
              <template #tip>
                <div class="el-upload__tip" style="color: indianred">
                  最多上传一份pdf文件，新的提交会覆盖已有提交
                </div>
              </template>
            </el-upload>
          </div>
        </el-card>
      </div>
    </el-col>

  </el-row>
</template>
<script setup lang="ts">
import {onBeforeMount, reactive, ref} from 'vue'
import {ElMessage, genFileId} from 'element-plus'
import type {UploadInstance, UploadProps, UploadRawFile} from 'element-plus'
import {$ref} from "vue/macros";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import axios from "axios";

const upload = ref<UploadInstance>()
const store = useStore()

const route = useRoute()
const courseId = route.query.courseId
const courseName = ref()
const userID = useStore().state.userInfo.id
const chapterId = route.query.chapterId
const hwURL = "http://" + store.state.host + "/api/upload/studentAssignment?chapterId=" + chapterId + "&studentId=" + store.state.userInfo.id
const studentId = store.state.userInfo.id
let homeWork = reactive({
  title: "标题",
  deadline: "2022/12/31",
  state: '未提交',
  score: 0,
  attachment: {
    url: '',
    name: ''
  }
})
const hasExceedDDL = ref(false)


onBeforeMount(async () => {

  // TODO: 获取课程名字
  courseName.value = 'Java'
  await axios.get(`http://${store.state.host}/api/course/list_by_id?courseId=${courseId}`).then((response) => {
    courseName.value = response.data.courseName
  })  // http://localhost:8081/api/upload/pdf/1.pdf


  await axios.get(`http://${store.state.host}/api/assignment/showHomeWork?chapterId=${chapterId}&&studentId=${studentId}`).then((response) => {
    homeWork.title = response.data.title
    homeWork.deadline = response.data.deadline
    homeWork.state = response.data.state
    homeWork.score = response.data.score

    homeWork.attachment.url = `http://${store.state.host}/api/upload/pdf/${chapterId}.pdf`
    homeWork.attachment.name = `${courseName.value}_${chapterId}.pdf`
    
    hasExceedDDL.value = new Date(homeWork.deadline) < new Date()
    console.log(hasExceedDDL.value)
  })

})

// const fileList = ref([])
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
  // console.log(file)
  file.uid = genFileId()
  upload.value!.handleStart(file)
  ElMessage({
    message: '已更新提交.',
    type: 'success',
  })

}

const handleSuccess = () => {
  ElMessage({
    message: '上传成功.',
    type: 'success',
  })
}

const submitUpload = () => {
  console.log(upload)
  upload.value!.submit()
}

const openUrl = (url: string | URL | undefined) => {
  if (url === '') {
    return
  }
  window.open(url)
}
</script>

<style scoped>

</style>