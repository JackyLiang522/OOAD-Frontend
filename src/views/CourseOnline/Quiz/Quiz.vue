<template xmlns="http://www.w3.org/1999/html">
  <div style="display: flex;justify-content: center">
    <div
        style="height:auto;background-color: white;margin:30px 0 0 0;border: 3px solid black;width: 70%;padding: 0 20px 5px 20px">
      <p style="text-align: center;font-size: 20px;font-weight: bold">标题</p>

      <div v-for="(question,index) in questions">
        <div v-if="question.type==='single' || question.type==='judge'">
          <p style="word-break: break-word;margin: 20px 0 5px 0">
            {{ question.question_text }}
          </p>
          <el-radio-group
              v-model="student_answers[index]"
              style="margin-left: 20px;border: 10px black"
              v-for="choice in question.choices">
            >
            <el-radio :label="choice"/>
          </el-radio-group>
        </div>

        <div v-else-if="question.type==='multiple'">
          <p style="word-break: break-word;margin: 15px 0 5px 0;">多选题的题目在这里:</p>
          <el-checkbox-group
              v-model="student_answers[index]"
              style="margin-left: 20px"
              v-for="choice in question.choices">
            >
            <el-checkbox :label="choice"/>
          </el-checkbox-group>
        </div>
      </div>


      <div style="display: flex;justify-content: center;">
        <el-button type="primary" style="margin-top: 25px">提交</el-button>
      </div>
      <p style="text-align: right;margin:0 0 0 0;color:gray">{{
          `${hour}:${minute}:${second}`
        }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, onBeforeUnmount, onMounted, ref} from 'vue'
import index from "vuex";

export default {
  name: 'Quiz',
  computed: {
    index() {
      return index
    }
  },
  setup() {
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

    onMounted(() => {
      // 在这里更新问题列表
      questions.value = [
        {
          type: 'single',
          question_text: '单选题的题目站在这里',
          choices: [
            '选项1的文本',
            '选线2的文本',
            '选项3的文本'
          ],
          answer: ['选项2']
        }, {
          type: 'multiple',
          question_text: '多选题的题目在这里',
          choices: [
            '选项1的文本',
            '选线2的文本',
            '选项3的文本'
          ],
          answer: ['选项1', '选项2']
        }, {
          type: 'judge',
          question_text: '判断题目站在这里',
          choices: [
            '选项1的文本',
            '选线2的文本',
          ],
          answer: ['选项2']
        }
      ]

      student_answers.value = []
      for (let i = 0; i < questions.value.length; i++) {
        student_answers.value.push(undefined)
      }
      timer = setInterval(() => {
        if (total_seconds.value === 0) {
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
      for (let i = 0; i < questions.value; i++) {
        const question = questions.value[i]
        if (question.type === 'multiple') {
          parts.push(2)
          total_parts += 2
        } else {
          parts.push(1)
          total_parts++
        }
      }
      for (let i = 0; i < student_answers.value.length; i++) {
        const answer = questions.value[i].answer
        const student_answer = student_answers.value[i]
        if (questions.value[i].type === 'multiple') {
          let is_correct = true
          for (let j = 0; j < answer.length; j++) {
            const cur_answer = answer[j]
            let cur_correct = false
            for (let k = 0; k < student_answer.length; k++) {
              let cur_student_answer = student_answer[k]
              if (cur_answer === cur_student_answer) {
                cur_correct = true
                break
              }
            }
            if (!cur_correct) {
              is_correct = false
              break
            }
          }
          if (is_correct)
            total_score += 100 / total_parts * parts[i]
        } else {
          if (answer[0] === student_answer)
            total_score += 100 / total_parts * parts[i]
        }
      }
      sendBackend()
    }

    function sendBackend() {
      // 把分数传给后端
    }

    return {
      second,
      minute,
      hour,
      questions,
      student_answers
    }
  }
}


</script>

<style scoped>
:deep(el-radio__inner) {
  color: black;
}
</style>