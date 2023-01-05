<template xmlns="http://www.w3.org/1999/html">
  <div style="display: flex;justify-content: center">
    <div
        style="height:auto;background-color: white;margin:30px 0 0 0;border: 3px solid black;width: 70%;padding: 0 20px 5px 20px">
      <p style="text-align: center;font-size: 20px;font-weight: bold">测验</p>

      <div v-for="(question,index) in questions">
        <div v-if="question.type==='单选' || question.type==='判断'">
          <p style="word-break: break-word;margin: 20px 0 5px 0">
            {{ question.description }}
          </p>
          <el-radio-group
              v-model="student_answers[index]"
              style="margin-left: 20px;border: 10px black"
              v-for="option in question.options">
            >
            <el-radio :label="option"/>
          </el-radio-group>
        </div>

        <div v-else-if="question.type==='多选'">
          <p style="word-break: break-word;margin: 15px 0 5px 0;">{{ question.description }}</p>
          <el-checkbox-group
              v-model="student_answers[index]"
              style="margin-left: 20px"
              v-for="option in question.options">
            >
            <el-checkbox :label="option"/>
          </el-checkbox-group>
        </div>
      </div>


      <div style="display: flex;justify-content: center;">
        <el-button type="primary" @click="submitAnswers" style="margin-top: 25px">提交</el-button>
      </div>
      <p style="text-align: right;margin:0 0 0 0;color:gray">{{
          `${hour}:${minute}:${second}`
        }}</p>
    </div>
  </div>

  <el-button @click="test">111</el-button>
</template>

<script lang="ts">
import {computed, onBeforeUnmount, onMounted, ref} from 'vue'
import index, {useStore} from "vuex";
import axios from "axios";
import store from "@/store";
import {useRoute, useRouter} from "vue-router";
import {ElMessage} from 'element-plus';


export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Quiz',
  computed: {
    index() {
      return index
    }
  },
  setup() {
    const route = useRoute()
    const chapterId = route.query.chapterId
    const store = useStore()
    const userId = store.state.userInfo.id

    let total_seconds = ref(0)
    let timer: any = null
    const second = computed(() => {
      const s = total_seconds.value % 60
      return s < 10 ? '0' + s : s.toString()
    })
    const minute = computed(() => {
      const m = Math.floor(total_seconds.value / 60)
      return m < 10 ? '0' + m : m.toString()
    })
    const hour = computed(() => {
      const h = Math.floor(total_seconds.value / 3600)
      return h < 10 ? '0' + h : h.toString()
    })

    const questions = ref()
    const student_answers = ref()

    onMounted(async () => {
      await axios.get(`http://${store.state.host}/api/quiz/listByChapter?chapterId=${chapterId}`).then(
          response => {
            if (response.data) {
              questions.value = response.data;
            }
          },
          err => {
            console.log(err)
          })
      student_answers.value = []
      for (let i = 0; i < questions.value.length; i++) {
        student_answers.value.push(undefined)
      }
      timer = setInterval(() => {
        if (total_seconds.value <= 0) {
          submitAnswers()
        }
        total_seconds.value--
      }, 1000)
      total_seconds.value = 60 * questions.value.length
    })

    onBeforeUnmount(() => {
      if (timer != null) {
        clearInterval(timer)
        timer = null
      }
    })

    function submitAnswers() {
      if (timer != null) {
        clearInterval(timer)
        timer = null
      }

      const parts = []
      let total_parts = 0
      let total_score = 0
      for (let i = 0; i < questions.value.length; i++) {
        const question = questions.value[i]
        if (question.type === '多选') {
          parts.push(2)
          total_parts += 2
        } else {
          parts.push(1)
          total_parts++
        }
      }
      for (let i = 0; i < student_answers.value.length; i++) {
        const answer = questions.value[i].answers
        const student_answer = student_answers.value[i]
        if (questions.value[i].type === '多选') {
          let is_correct = true
          const temp: any[] = []
          student_answer.forEach((ans: any) => temp.push(ans))
          if (answer.length == student_answer.length) {
            for (let j = 0; j < answer.length; j++) {
              if (!temp.some(ele => ele === questions.value[i].options[parseInt(answer[j]) - 1])) {
                is_correct = false;
                break;
              }
            }
          } else {
            is_correct = false;
          }
          if (is_correct)
              // total_score += 100 / total_parts * parts[i]
            total_score += parts[i];
        } else {
          if (student_answer != undefined && questions.value[i].options[(answer[0]) - 1] === student_answer)
              // total_score += 100 / total_parts * parts[i]
            total_score += parts[i];
        }
      }
      total_score = 100 * total_score / total_parts;
      sendBackend(total_score)
    }

    async function sendBackend(score: number) {
      await axios.post(`http://${store.state.host}/api/quiz/recordGrade?chapterId=${chapterId}&&studentId=${userId}&&grade=${score}`)
      ElMessage({
        message: '提交成功',
        type: 'success',
      })
      const router = useRouter()
      await router.push('/home')
    }

    function test() {
      console.log(questions.value)
      console.log(student_answers.value)
    }

    return {
      second,
      minute,
      hour,
      questions,
      student_answers,
      submitAnswers,
      test
    }
  }
}


</script>

<style scoped>
:deep(el-radio__inner) {
  color: black;
}
</style>