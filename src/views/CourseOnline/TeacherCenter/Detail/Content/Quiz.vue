<template>
  <h4 style="margin: 0 0 0 10px">{{ `第${chapterInfo.number}章 ${chapterInfo.title}` }}</h4>
  <el-scrollbar max-height="500px">
    <h3>这里放QUIZ</h3>
  </el-scrollbar>
</template>

<script>
import StudentQuiz from '@/views/CourseOnline/Quiz/Quiz.vue'

export default {
  name: "Quiz",
  props: ['chapterInfo'],
  components: {StudentQuiz}
}
</script>

<style scoped>

</style>