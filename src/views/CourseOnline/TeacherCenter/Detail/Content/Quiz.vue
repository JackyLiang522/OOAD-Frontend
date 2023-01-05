<template>
  <h4 style="margin: 0 0 0 10px">{{ `第${this.chapterInfo.number}章 ${chapterInfo.title}` }}</h4>

  <el-scrollbar max-height="400px" style="margin-top: 10px;margin-bottom: 30px">
    <div>
      <DisplayQuestion
          v-for="(question, index) in allQuestionList"
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
import {ElMessage} from "element-plus";
import {computed, onBeforeMount, ref, watch} from "vue";
import {useRoute} from "vue-router";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Quiz",
  props: ['chapterInfo'],
  // eslint-disable-next-line vue/no-unused-components
  components: {StudentQuiz, Question, DisplayQuestion},
  setup(props) {
    const addQuestionList = ref([])
    const allQuestionList = ref([])
    const courseId = useRoute().query.courseId
    const chapterId = computed(() => props.chapterInfo.id)

    function addQuestion(description, type, answers, options) {
      ElMessage({
        message: '成功添加.',
        type: 'success',
      });
      const newQuestion = {
        id: new Date().toISOString(),
        description: description,
        type: type,
        answers: answers,
        options: options,
      }
      addQuestionList.value.push(newQuestion);
      allQuestionList.value.push(newQuestion);

      console.log(allQuestionList.value)
    }

    async function submitQuestion() {
      console.log(addQuestionList.value)
      await axios.post(`http://${store.state.host}/api/quiz/add?chapterId=${chapterId.value}`, addQuestionList.value)
      /*return axios({
        headers:{
          "Content-Type": "application/json"
        },
        url: `http://${store.state.host}/api/quiz/add?chapterId=${chapterId.value}`,
        method: 'post',
        //转换成json字符串
        data:JSON.stringify(this.questionList)
      })*/
    }


    watch(chapterId, async () => {
      if (chapterId.value === -1)
        return
      await axios.get(`http://${store.state.host}/api/quiz/listQuizProblems?chapterId=${chapterId.value}`).then((response) => {
        addQuestionList.value = response.data;
      })
    })

    return {
      addQuestion,
      submitQuestion,
      questionList: addQuestionList,
      courseId,
      allQuestionList
    }
  },
}
</script>

<style scoped>

</style>