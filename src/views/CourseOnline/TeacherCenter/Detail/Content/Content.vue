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
      <span class="text-large font-600 mr-3"> 高等数学 </span>
    </template>
  </el-page-header>

  <el-divider/>

  <el-row>
    <el-col :span="4">
      <el-scrollbar max-height="400px">
        <el-divider style="margin: 0 0 0 0"/>
        <div v-for="chapter in chapters" :key="chapter.number">
          <el-link style="margin: 10px 10px 10px 10px;white-space: pre-wrap;">
            <span>{{ `第${chapter.number}章\n${chapter.title}` }}</span>

          </el-link>
          <el-divider style="margin: 0 0 0 0"/>
        </div>
      </el-scrollbar>
    </el-col>

    <el-col :offset="1" :span="19">
      <el-tabs>
        <el-tab-pane label="视频">
          <Video :chapterInfo="chapterInfo"/>
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
import {computed, reactive, ref} from "vue";
import Video from "@/views/CourseOnline/TeacherCenter/Detail/Content/Video.vue";
import Homework from "@/views/CourseOnline/TeacherCenter/Detail/Content/Homework.vue";
import Grade from "@/views/CourseOnline/TeacherCenter/Detail/Content/Grade.vue";
import Quiz from "@/views/CourseOnline/TeacherCenter/Detail/Content/Quiz.vue";

export default {
  name: "Content",
  components: {Quiz, Grade, Homework, Video},
  methods: {
    ArrowRight() {
      return ArrowRight
    }
  },
  setup() {
    const chapters = ref([
      {
        number: '111',
        title: 'name1'
      }, {
        number: '222',
        title: 'name2'
      }, {
        number: '222',
        title: 'name2'
      }, {
        number: '222',
        title: 'name2'
      }, {
        number: '222',
        title: 'name2'
      }, {
        number: '222',
        title: 'name2'
      }, {
        number: '222',
        title: 'name2'
      }, {
        number: '222',
        title: 'name2'
      }, {
        number: '222',
        title: 'name2'
      }, {
        number: '222',
        title: 'name2'
      }
    ])

    const chapterInfo = reactive({
      number: 1,
      title: '这里是标题',
      intro: '这里是章节简介'
    })

    return {
      chapters,
      chapterInfo
    }
  }
}
</script>

<style scoped>

</style>