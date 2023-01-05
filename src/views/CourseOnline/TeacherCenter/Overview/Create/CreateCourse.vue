<template>
  <div style="display: flex;justify-content: center;">
    <el-form
        label-position="left"
        label-width="80px"
        :model="course_info"
        style="width: 500px"
    >
      <el-form-item label="课程名">
        <el-input v-model="course_info.name" placeholder="请输入课程名"/>
      </el-form-item>
      <el-form-item label="课程简介">
        <el-input v-model="course_info.introduction" placeholder="请为此课程输入一段课程介绍" type="textarea"
                  :rows="4"/>
      </el-form-item>
      <el-form-item label="价格">
        <el-input-number v-model="course_info.price" :precision="0" :step="1" :min="0"
                         placeholder="请输入课程价格（0 表示免费）"/>
      </el-form-item>

      <el-form-item label="封面图">
        <el-upload
            ref="upload"
            :action="hwURL"
            list-type="picture-card"
            :before-upload="beforeUpload"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :limit="1"
            :on-exceed="handleExceed"
            :auto-upload="false"
        >
          <el-icon>
            <Plus/>
          </el-icon>
        </el-upload>
        <Teleport to="html">
          <el-dialog v-model="dialog.visible">
            <img  :src="dialog.imageUrl" alt="Preview Image"/>
          </el-dialog>
        </Teleport>
      </el-form-item>
      <el-form-item style="display: flex;justify-content: center">
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script lang="ts">
import {computed, reactive, ref} from "vue";
import type {UploadFile, UploadFiles, UploadProps, UploadUserFile} from 'element-plus'
import {ElMessage, UploadInstance} from "element-plus";
import axios from "axios";
import store from "@/store";

export default {
  name: "CreateCourse",

  setup() {
    const upload = ref<UploadInstance>()
    let courseID = ref(0)
    const hwURL = computed(()=>`http://${store.state.host}/api/upload/image?courseId=${courseID.value}`)
    const course_info = reactive({
      name: '',
      introduction: '',
      price: 0,
    })

    const file = reactive<UploadUserFile>({
      name: '',
      url: ''
    })

    const dialog = reactive({
      imageUrl: '',
      visible: false
    })

    const beforeUpload = (file: any) => {
      // console.log("before upload")
      // console.log(file.name)
      if (!file.name.includes('.jpg')&&!file.name.includes('.png')) {
        ElMessage.warning('只能上传图片文件')
        return false
      } else {
        return true
      }
    }

    const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
      console.log(uploadFile, uploadFiles)
    }

    const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
      dialog.imageUrl = uploadFile.url!
      dialog.visible = true
    }

    const handleSuccess = (response: any, uploadFile: UploadFile) => {
      file.url = uploadFile.url
      console.log(file.url)
      ElMessage.success('创建成功');
    }

    const handleExceed = (files: File[]) => {
      ElMessage.error('只能上传一个封面')
    }

    // TODO 上传封面图
    async function submit() {
      console.log("submit")
      console.log(file.name)
      // if (!file.name.includes('.jpg')&&!file.name.includes('.png')) {
      //   ElMessage.warning('只能上传图片文件')
      //   // return false
      // } else {
      //   // return true
      // }
      const teacher = JSON.parse(localStorage.getItem('user_info')!)
      await axios.post(`http://${store.state.host}/api/course/add?teacher=${teacher.id}&&name=${course_info.name}&&introduction=${course_info.introduction}&&price=${course_info.price}`).then(
        response => {
          courseID.value = response.data
          console.log(hwURL.value)
          // courseID = 0
          // create course success
        })
      upload.value!.submit()
    }


    return {
      course_info,
      file,
      dialog,
      handleRemove,
      handlePictureCardPreview,
      handleSuccess,
      handleExceed,
      submit,
      hwURL,
      upload,
      beforeUpload
    }
  }
}
</script>

<style scoped>

</style>