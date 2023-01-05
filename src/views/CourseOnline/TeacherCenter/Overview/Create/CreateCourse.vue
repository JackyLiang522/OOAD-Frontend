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
        <el-input-number v-model="course_info.price" :precision="2" :step="0.1" :min="0"
                         placeholder="请输入课程价格（0 表示免费）"/>
      </el-form-item>

      <el-form-item label="封面图">
        <el-upload
            v-model="file"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :limit="1"
            :on-exceed="handleExceed"
        >
          <el-icon>
            <Plus/>
          </el-icon>
        </el-upload>
        <Teleport to="html">
          <el-dialog v-model="dialog.visible">
            <img w-full :src="dialog.imageUrl" alt="Preview Image"/>
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
import {reactive} from "vue";
import type {UploadFile, UploadFiles, UploadProps, UploadUserFile} from 'element-plus'
import {ElMessage} from "element-plus";
import axios from "axios";
import store from "@/store";

export default {
  name: "CreateCourse",

  setup() {
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

    const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
      console.log(uploadFile, uploadFiles)
    }

    const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
      dialog.imageUrl = uploadFile.url!
      dialog.visible = true
    }

    const handleSuccess = (response: any, uploadFile: UploadFile) => {
      file.url = uploadFile.url
    }

    const handleExceed = (files: File[]) => {
      ElMessage.error('只能上传一个封面')
    }

    // TODO 上传封面图
    async function submit() {
      const teacher = JSON.parse(localStorage.getItem('user_info')!)
      await axios.post(`http://${store.state.host}/api/course/add?teacher=${teacher.id}&&name=${course_info.name}&&introduction=${course_info.introduction}&&price=${course_info.price}`).then(
        response => {
          // create course success
          ElMessage.success('创建成功');
        })
    }


    return {
      course_info,
      file,
      dialog,
      handleRemove,
      handlePictureCardPreview,
      handleSuccess,
      handleExceed,
      submit
    }
  }
}
</script>

<style scoped>

</style>