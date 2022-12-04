<template>
  <Video_Quiz_Header/>
  <div style="display: flex;justify-content: center">
    <div
        style="height:auto;background-color: white;margin:30px 0 0 0;border: 3px solid black;width: 70%;padding: 0 20px 5px 20px">
      <p style="text-align: center;font-size: 20px;font-weight: bold">标题</p>

      <p style="word-break: break-word;margin: 0 0 5px 0">单选题的题目在这里:</p>
      <el-radio-group v-model="radio_s" style="margin-left: 20px;border: 10px black">
        <el-radio label="A选项的文本"/>
        <el-radio label="B选项的文本"/>
        <el-radio label="C选项的文本"/>
        <el-radio label="D选项的文本"/>
      </el-radio-group>

      <p style="word-break: break-word;margin: 15px 0 5px 0;">多选题的题目在这里:</p>
      <el-checkbox-group v-model="check_s" style="margin-left: 20px">
        <el-checkbox label="Online activities" name="a"/>
        <el-checkbox label="Promotion activities" name="a"/>
        <el-checkbox label="Offline activities" name="a"/>
        <el-checkbox label="Simple brand exposure" name="a"/>
      </el-checkbox-group>

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
import {computed, onBeforeUnmount, reactive, ref} from 'vue'
import Video_Quiz_Header from "@/views/Video_Quiz/Video_Quiz_Header.vue";
import Vue from "vue";

export default {
  name: 'Quiz',
  components: {Video_Quiz_Header},
  setup() {
    const radio_s = ref('')
    const check_s = ref([])

    let total_seconds = ref(60)
    const timer = setInterval(() => {
      total_seconds.value--
    }, 1000)
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
    onBeforeUnmount(() => {
      clearInterval(timer)
    })

    return {
      radio_s,
      check_s, second, minute, hour
    }
  }
}


</script>

<style scoped>
:deep(el-radio__inner){
  color:black;
}
</style>