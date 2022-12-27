<template>
  <h4 style="margin: 0 0 0 10px">{{ `第${chapterInfo.number}章 ${chapterInfo.title}` }}</h4>
  <el-scrollbar max-height="500px">
    <div >
      <Question></Question>
    </div>

  </el-scrollbar>
</template>

<script>
import StudentQuiz from '@/views/CourseOnline/Quiz/Quiz.vue'
import Question from '@/views/CourseOnline/TeacherCenter/Detail/Content/Question.vue'

export default {
  name: "Quiz",
  props: ['chapterInfo'],
  components: {StudentQuiz, Question}
}
</script>

<style scoped>

</style>