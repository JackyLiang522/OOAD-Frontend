<template>
  <div
      class="course_info_card"
      :style="{
    boxShadow:'var(--el-box-shadow)',
    borderRadius: `var(--el-border-radius-${'base'})`}"
  >

    <el-image
        style="width: 120px; margin: 20px 60px 0 60px;"
        :src="`http://${host}/api/upload/image/${courseId}.png`"
        fit="contain"/>

    <p style="font-size: 20px;font-weight: bold;color: #397ce2;text-align: center;margin: 15px 0 15px 0">
      <router-link :to="hasPurchased?(`/video?courseId=${courseId}`):''">
        {{ courseName }}
      </router-link>
      <el-button
          type="primary"
          size="small"
          style="margin-left: 20px"
          v-show="!hasPurchased"
          @click="purchaseCourse(courseId,price,courseName)"
      >购买
      </el-button>
    </p>

    <el-scrollbar height="105px" style="height: 105px">
      <div class="content">
        授课教师：{{ teacher }}
        <br>
        章节数量：{{ chapterCount }}
        <br>
        课程价格：{{ price }}
        <br>
        课程简介：{{ introduction }}
      </div>
    </el-scrollbar>
  </div>

</template>

<script>

import {useStore} from "vuex";

export default {
  props: [
    'courseId',
    'courseName',
    'teacher',
    'chapterCount',
    'price',
    'introduction',
    'hasPurchased',
    'purchaseCourse'
  ],
  setup(){
    const host = useStore().state.host
    
    return{
      host
    }
  }
}
</script>

<style scoped>
.course_info_card {
  width: 240px;
  height: 280px;
  background-color: white;
  border: 1px solid var(--el-border-color);
  margin: 0 0 0 0;
}

.content {
  word-wrap: break-word;
  word-break: normal;
  margin: 0 20px 0 20px;
  line-height: 20px;
  font-size: 15px;
  padding: 0 0 0 0;
}
</style>