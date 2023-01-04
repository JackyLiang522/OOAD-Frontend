<template>
  <div>
    <span style="font-size: 20px;margin:0 100px 0 0">章节 {{ chapterNumber }}：{{ chapterName }}</span>
    <span style="float: right">
      <span style="font-size: 15px;">by {{ teacher }}</span>
        <el-button 
            size="default"
            type="info" 
            style="margin-left: 40px" 
            @click="this.$router.push({ path: '/quiz', query: {chapterId: chapterId}})">
          测验
        </el-button>
    </span>
    <br>
    <div style="height: 20px;margin-top:0;color: gray">
      <el-icon size="14px" style="margin: 0 0 0 20px;vertical-align: middle">
        <Warning/>
      </el-icon>
      <span style="font-size: 13px"> 未经作者授权禁止转载</span>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  props: {
    teacher: String,
    chapterNumber: Number,
    chapterName: String,
    chapterId: Number,
  },
  name: 'VideoQuizHeader',
}
</script>