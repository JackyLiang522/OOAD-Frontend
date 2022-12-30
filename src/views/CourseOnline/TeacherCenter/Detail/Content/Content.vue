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
      <span class="text-large font-600 mr-3"> {{ course_name }} </span>
    </template>
  </el-page-header>

  <el-divider/>

  <el-row>
    <el-col :span="4">
      <el-scrollbar max-height="400px">
        <el-divider style="margin: 0 0 0 0"/>
        <div v-for="(chapter,index) in chapters" :key="chapter.number">
          <el-link @click="changeChapter(index)" style="margin: 10px 10px 10px 10px;white-space: pre-wrap;">
            <span>{{ `第${chapter.number}章\n${chapter.title}` }}</span>

          </el-link>
          <el-divider style="margin: 0 0 0 0"/>
        </div>
        <div style="display: flex;justify-content: center">
          <el-button type="primary" @click="addChapter" size="small" style="margin-top: 20px;">增加章节</el-button>
          <el-button type="primary" @click="submitChapter" size="small" style="margin-top: 20px;">提交章节</el-button>
        </div>
      </el-scrollbar>
    </el-col>

    <el-col :offset="1" :span="19">
      <el-tabs>
        <el-tab-pane label="视频">
          <Video :chapterInfo="chapterInfo" @change-title="changeTitle"/>
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
import {computed, onMounted, reactive, ref} from "vue";
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
    const course_name = route.query.course_name
    const course_id = route.query.course_id

    const chapters = ref([
      {
        number: '1',
        title: 'name1'
      }, {
        number: '2',
        title: 'name2'
      },
    ])
    const addChapter = () => {
      const newChapter = {
        number: chapters.value.length + 1 + "",
        title: 'default'
      };
      chapters.value.push(newChapter)
    }

    const submitChapter = () => {
      console.log("submit {{chapters}} to back end")
    }

    const chapterInfo = reactive({
      number: '1',
      title: '这里是标题',
    })

    function changeTitle(chapter_number: string, new_title: string) {
      for (let i = 0; i < chapters.value.length; i++) {
        const cur = chapters.value[i]
        if (cur.number === chapter_number) {
          cur.title = new_title
          break
        }
      }
      console.log(chapters.value)
    }

    function changeChapter(index: number) {
      chapterInfo.number = chapters.value[index].number
      chapterInfo.title = chapters.value[index].title
    }
    
    const store = useStore()

    onMounted(() => {
      axios.get(`http://${store.state.host}/api/chapter/list?courseId=${course_id}`)
          .then(response => {
            chapters.value = response.data
          })
    })

    return {
      chapters,
      chapterInfo,
      addChapter,
      submitChapter,
      changeTitle,
      changeChapter,
      course_name
    }
  }
}
</script>

<style scoped>

</style>