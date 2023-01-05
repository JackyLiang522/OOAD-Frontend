<template>
  <el-page-header title="返回" @back="$router.push('/teacher/overview/list')">
    <template #breadcrumb>
      <el-breadcrumb :separator-icon="ArrowRight()">
        <el-breadcrumb-item to="/teacher/overview/list">
          课程列表
        </el-breadcrumb-item>
        <el-breadcrumb-item>课程通知</el-breadcrumb-item>
      </el-breadcrumb>
    </template>
    <template #content>
      <span class="text-large font-600 mr-3"> {{ courseName }} </span>
    </template>
  </el-page-header>
  <el-divider/>

  <div style="display: flex;justify-content: center;">
    <el-card class="box-card" style="height: 100%; width:50%">
      <div slot="header" class="clearfix" style="margin-bottom: 10px">
        <h3>发布通知</h3>
      </div>
      <div style="display: flex;justify-content: center;">
        <div></div>
      </div>
      <div style="display: flex;justify-content: center;">
        <el-form :model="form" label-width="120px">
          <el-form-item label="标题">
            <el-input v-model="form.title"/>
          </el-form-item>
          <el-form-item label="通知内容">
            <el-input v-model="form.content" type="textarea"/>
          </el-form-item>
          <el-form-item label="同时发送邮件">
            <el-radio-group v-model="form.email">
              <el-radio label="是"/>
              <el-radio label="否"/>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>

    </el-card>
  </div>

  <div style="margin:40px 0 20px 30px">
    <span>
      <span style="vertical-align: 40%">历史通知</span><el-icon size="30px" style="margin-left: 5px"><Clock/></el-icon>
    </span>

  </div>
  <div>
    <el-timeline>
      <el-timeline-item v-for="announcement in announcementList" center :timestamp="new Date(announcement.time).toDateString()"
                        placement="top">
        <el-card shadow="never">
          <h4>{{ announcement.title }}</h4>
          <p>{{ announcement.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script lang="ts">
import {ArrowRight} from "@element-plus/icons-vue";
import {onBeforeMount, reactive, ref} from 'vue'
import axios from "axios";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

export default {
  name: "Announcement",
  data() {
    return {}
  },
  methods: {
    ArrowRight() {
      return ArrowRight
    },
  },
  setup() {
    const announcementList = ref([])

    const store = useStore()
    const route = useRoute()
    const courseId = route.query.courseId
    const courseName = ref('')

    const form = reactive({
      title: '样例标题',
      content: '信息内容',
      // TODO: 实现发邮件功能
      email: false,
    })

    const onSubmit = async () => {
      await axios.post(`http://${store.state.host}/api/announcement/add?courseId=${courseId}&&title=${form.title}&&content=${form.content}`)
      console.log('submit!')

      await axios.get(`http://${store.state.host}/api/announcement/list?courseId=${courseId}`)
          .then(
              response => {
                if (response.data) {
                  announcementList.value = response.data;
                }
              },
              err => {
                console.log(err)
              })
      
      // send email
      if (form.email) {
        await axios.post(`http://${store.state.host}/api/announcement/send_email?courseId=${courseId}&&title=${form.title}&&content=${form.content}`)
      }


    }

    onBeforeMount(async () => {
      await axios.get(`http://${store.state.host}/api/announcement/list?courseId=${courseId}`)
          .then(
              response => {
                if (response.data) {
                  announcementList.value = response.data;
                }
              },
              err => {
                console.log(err)
              })
      await axios.get(`http://${store.state.host}/api/course/list_by_id?courseId=${courseId}`)
          .then(response => {
            courseName.value = response.data.courseName
          })
    })


    return {
      form,
      announcementList,
      onSubmit,
      courseName
    }
  }
}
</script>

<style scoped>

</style>