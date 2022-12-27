<template>
  <h4 style="margin: 0 0 0 10px">{{ `第${chapterInfo.number}章 ${chapterInfo.title}` }}</h4>
  <el-scrollbar max-height="500px">
    <div >
      <Question :options="options" :description="description" :answers="answers" :multiple="multiple" :timer="timer"></Question>
    </div>

  </el-scrollbar>
</template>

<script>
import StudentQuiz from '@/views/CourseOnline/Quiz/Quiz.vue'
import Question from '@/views/CourseOnline/TeacherCenter/Detail/Content/Question.vue'
import {reactive} from "vue";

export default {
  name: "Quiz",
  props: ['chapterInfo'],
  components: {StudentQuiz, Question},
  data() {
    return {
        options: [
          {
            key: 1,
            value: '',
          },
        ],
        description: '',
        timer: '',
        multiple: true,
        answers: [],
    }
  }
}
</script>

<style scoped>

</style>