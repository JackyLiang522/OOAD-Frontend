<template>
  <h4 style="margin: 0 0 0 10px">{{ `第${this.chapterInfo.number}章 ${chapterInfo.title}` }}</h4>

  <el-scrollbar max-height="400px" style="margin-top: 10px;margin-bottom: 30px">
    <div>
      <DisplayQuestion
          v-for="(question, index) in questionList"
          :key="question.id"
          :title="'第 ' + (index+1)+' 题'"
          :description="question.description"
          :type="question.type"
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
import axios from "axios";
import store from "@/store";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Quiz",
  props: ['chapterInfo'],
  // eslint-disable-next-line vue/no-unused-components
  components: {StudentQuiz, Question, DisplayQuestion},
  data() {
    return {
      questionList: [],
    }
  },
  methods: {
    addQuestion(description, type, answers, options) {
      alert("成功添加")
      const newQuestion = {
        id: new Date().toISOString(),
        description: description,
        type: type,
        answers: answers,
        options: options,
      };
      this.questionList.push(newQuestion);
      alert(this.questionList.length)
      console.log(this.questionList)
    },
    async submitQuestion() {
      await axios.post(`http://${store.state.host}/api/quiz/add?chapterId=${this.chapterInfo.number}`, this.questionList)
      /*return axios({
        headers:{
          "Content-Type": "application/json"
        },
        url: `http://${store.state.host}/api/quiz/add?chapterId=${this.chapterInfo.number}`,
        method: 'post',
        //转换成json字符串
        data:JSON.stringify(this.questionList)
      })*/

    }
  }
}
</script>

<style scoped>

</style>