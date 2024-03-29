<template>
  <el-page-header title="返回" @back="$router.push('/teacher/overview/list')">
    <template #breadcrumb>
      <el-breadcrumb :separator-icon="ArrowRight()">
        <el-breadcrumb-item to="/teacher/overview/list">
          课程列表
        </el-breadcrumb-item>
        <el-breadcrumb-item>课程详情</el-breadcrumb-item>
      </el-breadcrumb>
    </template>
    <template #content>
      <span class="text-large font-600 mr-3"> {{ courseName }} </span>
    </template>
  </el-page-header>

  <el-divider/>

  <el-row>
    <el-col :span="4">
      <el-scrollbar max-height="400px">
        <el-divider style="margin: 0 0 0 0"/>
        <div v-for="(chapter, index) in chapters">
          <el-link @click="changeChapter(index, chapter.id)" style="margin: 10px 10px 10px 10px;white-space: pre-wrap;">
            <span>{{ `第${index + 1}章\n${chapter.name}` }}</span>
          </el-link>
          <el-divider style="margin: 0 0 0 0"/>
        </div>
        <div style="display: flex;justify-content: center">
          <el-button type="primary" @click="addChapter" size="small" style="margin-top: 20px;">增加章节</el-button>
        </div>
      </el-scrollbar>
    </el-col>

    <el-col :offset="1" :span="19">
      <el-tabs>
        <el-tab-pane label="视频">
          <Video
              :chapterInfo="chapterInfo"
              @change-title="changeTitle"
          />
        </el-tab-pane>
        <el-tab-pane label="作业">
          <Homework :chapterInfo="chapterInfo"/>
        </el-tab-pane>
        <el-tab-pane label="分数">
          <Grade :chapterInfo="chapterInfo"/>
        </el-tab-pane>
        <el-tab-pane label="测验">
          <Quiz :chapterInfo="chapterInfo"/>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>

</template>

<script lang="ts">
import {ArrowRight} from "@element-plus/icons-vue";
import {onBeforeMount, reactive, ref} from "vue";
import Video from "@/views/CourseOnline/TeacherCenter/Detail/Content/Video.vue";
import Homework from "@/views/CourseOnline/TeacherCenter/Detail/Content/Homework.vue";
import Grade from "@/views/CourseOnline/TeacherCenter/Detail/Content/Grade.vue";
import Quiz from "@/views/CourseOnline/TeacherCenter/Detail/Content/Quiz.vue";
import {useRoute} from "vue-router";
import axios from "axios";
import {useStore} from "vuex";

export default {
  name: "Content",
  components: {Quiz, Grade, Homework, Video},
  methods: {
    ArrowRight() {
      return ArrowRight
    },

  },
  setup() {
    const route = useRoute()
    const courseId = route.query.courseId
    const courseName = ref('')

    const chapters = ref()

    const addChapter = () => {
      axios.post(`http://${store.state.host}/api/chapter/add?courseId=${courseId}&chapterName=default`)
          .then(response => {
            chapters.value.push(response.data)
          })
    }

    let chapterInfo = reactive({
      id: -1,
      number: -1,
      title: ''
    })

    // 在后端做更新
    async function changeTitle(number: number, newTitle: string) {
      for (let i = 0; i < chapters.value.length; i++) {
        if (i + 1 === number) {
          await axios.put(`http://${store.state.host}/api/chapter/update?chapterId=${chapters.value[i].id}&chapterName=${newTitle}`)
          chapters.value[i].name = newTitle
          break
        }
      }
    }

    function changeChapter(index: number, id: number) {
      chapterInfo.id = id
      chapterInfo.number = index + 1
      chapterInfo.title = chapters.value[index].name
    }

    const store = useStore()

    onBeforeMount(async () => {
      await axios.get(`http://${store.state.host}/api/course/list_by_id?courseId=${courseId}`)
          .then(response => {
            courseName.value = response.data.courseName
          })

      await axios.get(`http://${store.state.host}/api/chapter/list?courseId=${courseId}`)
          .then(response => {
            chapters.value = response.data
          })

      // assign chapter numbers
      for (let i = 0; i < chapters.value.length; i++) {
        chapters.value[i].number = i + 1
      }

      // set display chapter info
      chapterInfo.number = 1
      chapterInfo.title = chapters.value[0].name
      chapterInfo.id = chapters.value[0].id
    })

    return {
      chapters,
      chapterInfo,
      addChapter,
      changeTitle,
      changeChapter,
      courseName
    }
  }
}
</script>

<style scoped>

</style>