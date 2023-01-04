<template>
  <div style="display: flex;justify-content: center;">

    <el-divider content-position="left"
                style="display: flex;justify-content: center;width: 70%; margin:30px  0 30px 3%"><b>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/student/course' } "><h3>课程列表</h3>
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/student/course/detail' } "><h3>课程XX</h3></el-breadcrumb-item>
        <el-breadcrumb-item><h3>作业</h3></el-breadcrumb-item>
      </el-breadcrumb>
    </b>
    </el-divider>
  </div>
  <div style="display: flex;justify-content: center;">
    <el-card class="box-card" style="height: 100%; width:50%">
      <div slot="header" class="clearfix" style="margin-bottom: 10px">
        <h3>第一次作业-xxx</h3>
      </div>
      <div style="display: flex;justify-content: center;margin-top: 1px">
        <el-divider></el-divider>
      </div>
      <div>

        <el-descriptions
            class="margin-top"
            :column="3"
            :size="size"
            border
        >
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                标题
              </div>
            </template>
            作业1
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                截止
              </div>
            </template>
            2022/12/31
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                状态
              </div>
            </template>
            尚未提交
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                评分
              </div>
            </template>
            -（最高 100.0）
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                题目
              </div>
            </template>
            <a href="https://sakai.sustech.edu.cn/access/content/attachment/85c9d4ad-5ce9-4059-b7b4-b775bd75494d/%E4%BD%9C%E4%B8%9A/615a2f50-d4c7-4a0c-9e25-5f6ba700196b/cs305_homework2.pdf">CS042_第一次作业.pdf</a>
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <div>
        <!--        <el-upload-->
        <!--            class="upload-demo"-->
        <!--            action="https://jsonplaceholder.typicode.com/posts/"-->
        <!--            :before-upload="beforeHomeworkUpload"-->
        <!--            :on-preview="handlePreview"-->
        <!--            :on-remove="handleRemove"-->
        <!--            :before-remove="beforeRemove"-->
        <!--            :limit="1"-->
        <!--            :on-exceed="handleExceed"-->
        <!--            :file-list="fileList"-->
        <!--            list-type="text"-->
        <!--            style="display: table;margin-top: 20px;"-->
        <!--            :auto-upload="false"-->
        <!--        >-->
        <!--            http-request="onUpload"-->
        <!--          <div style="display: table">-->
        <!--            <el-button size="small" type="primary">点击上传</el-button>-->
        <!--            <template #tip>-->
        <!--              <div class="el-upload__tip text-red">-->
        <!--                只能上传zip/pdf文件，且不超过20Mb-->
        <!--                limit 1 file, new file will cover the old file-->
        <!--              </div>-->
        <!--            </template>-->
        <!--&lt;!&ndash;            <div slot="tip" class="el-upload__tip">只能上传zip/pdf文件，且不超过20Mb</div>&ndash;&gt;-->
        <!--          </div>-->
        <el-upload
            ref="upload"
            class="upload-demo"
            :action = "hwURL"
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
              <!--              只能上传zip/pdf文件，且不超过20Mb-->
              <!--              <br/>-->
              最多上传一份文件，新的提交会覆盖已有提交
            </div>
          </template>
        </el-upload>
      </div>


    </el-card>
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import {ElMessage, genFileId} from 'element-plus'
import type {UploadInstance, UploadProps, UploadRawFile} from 'element-plus'
import {$ref} from "vue/macros";
import {useStore} from "vuex";

const upload = ref<UploadInstance>()
const store = useStore()
const hwURL = "http://"+store.state.host+"/api/upload/pdf"

// const fileList = ref([])
const beforeUpload = (file: any) => {
  // const suffix = splitStrLast(file.name, '.')
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
  console.log(file)
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
  // console.log("submit")
  console.log(upload)
  upload.value!.submit()
}
</script>
<!--<script lang="ts">-->
<!--import axios from "axios";-->


<!--export default {-->
<!--  name: "Homework",-->
<!--  data() {-->
<!--    return {-->
<!--      fileList: [{-->
<!--        name: 'hanako.pdf',-->
<!--        url: 'https://c-ssl.duitang.com/uploads/item/201802/26/20180226093953_rejxw.thumb.1000_0.jpg'-->
<!--      }]-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    beforeHomeworkUpload(file) {-->
<!--      let that = this;-->
<!--      const isZip = (file.type.indexOf("zip") !== -1);-->
<!--      const isPdf = (file.type.indexOf("pdf") !== -1);-->
<!--      const isLt20M = file.size / 1024 / 1024 < 20;-->
<!--      console.log(file.type)-->

<!--      if (!isZip && !isPdf) {-->
<!--        this.$message.error('上传作业文件只能是 ZIP/PDF 格式!');-->
<!--      }-->
<!--      if (!isLt20M) {-->
<!--        this.$message.error('上传作业文件大小不能超过 20MB!');-->
<!--      }-->
<!--      if ((isZip || isPdf) && isLt20M) {-->
<!--        // this.filelist.push(file);-->
<!--        console.log("add")-->
<!--        return true-->
<!--      }-->
<!--      return false-->
<!--    },-->
<!--    handleRemove(file, fileList) {-->
<!--      console.log(file, fileList);-->
<!--    },-->
<!--    handlePreview(file) {-->
<!--      console.log(file);-->
<!--    },-->

<!--    // handleExceed(files, fileList) {-->
<!--    //-->
<!--    //   this.$message.warning(`已更新提交`);-->
<!--    // },-->
<!--    beforeRemove(file, fileList) {-->
<!--      return this.$confirm(`确定移除 ${file.name}？`);-->
<!--    },-->
<!--    // 上传文件-->
<!--    onUpload(file) {-->
<!--      let that = this-->
<!--      let formData = new FormData()-->
<!--      formData.append('file', file.file)-->
<!--      this.postUpload(formData).then((res) => {-->
<!--        console.log(res)-->
<!--        this.$message.success(this.$t('UPLOAD_SUCCESS'))-->
<!--      }).catch((e) => {-->
<!--        this.$message.error(e.message)-->
<!--      })-->
<!--    },-->
<!--    postUpload(file) {-->
<!--      return axios({-->
<!--        url: 'upload',-->
<!--        method: 'post',-->
<!--        data: file,-->
<!--        headers: {-->
<!--          'Content-Type': 'multipart/form-data'-->
<!--        }-->
<!--      })-->
<!--    },-->
<!--  }-->

<!--}-->
<!--</script>-->

<style scoped>

</style>