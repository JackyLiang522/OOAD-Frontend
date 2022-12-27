<template>
  <h4 style="margin: 0 0 0 10px">{{ `第${chapterInfo.number}章 ${chapterInfo.title}` }}</h4>

  <el-scrollbar max-height="400px" style="margin-top: 10px;margin-bottom: 30px">
    <div>
      <DisplayQuestion
          v-for="(question, index) in questionList"
          :key="question.id"
          :title="'第 ' + (index+1)+' 题'"
          :description="question.description"
          :multiple="question.multiple"
          :answers="question.answers"
          :options="question.options"
      ></DisplayQuestion>
    </div>

  </el-scrollbar>
  <Question @add-question="addQuestion"></Question>
  <div style="display: flex;justify-content: center;margin-top: 20px">

    <el-button type="primary" @click="submitQuestion" size="large">提交问题列表</el-button>
  </div>

</template>

<script>
import StudentQuiz from '@/views/CourseOnline/Quiz/Quiz.vue'
import Question from '@/views/CourseOnline/TeacherCenter/Detail/Content/Question.vue'
import DisplayQuestion from '@/views/CourseOnline/TeacherCenter/Detail/Content/DisplayQuestion.vue'

export default {
  name: "Quiz",
  props: ['chapterInfo'],
  components: {StudentQuiz, Question, DisplayQuestion},
  data() {
    return {
      questionList: [],
    }
  },
  methods: {
    addQuestion(description, multiple, answers, options) {
      alert("成功添加")
      const newQuestion = {
        id: new Date().toISOString(),
        description: description,
        multiple: multiple,
        answers: answers,
        options: options,
      };
      this.questionList.push(newQuestion);
      console.log(this.questionList)

    },
    submitQuestion() {
      console.log("submit {{questionList}} to back end.")
    }
  }
}
</script>

<style scoped>

</style>