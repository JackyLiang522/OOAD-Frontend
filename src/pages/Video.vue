<template>
  <div style="height: 20px">
    <span style="font-size: 20px;margin:0 100px 0 0">章节1：HelloWorld</span>
    <span style="font-size: 15px;">by 张三</span>
    <el-button size="default" style="margin:0 0 0 20px;width: 130px;vertical-align: middle;">订阅</el-button>
    <br>
    <div style="height: 20px;margin-top: 10px;color: gray">
      <el-icon size="15px" style="margin: 0 0 0 20px;vertical-align: middle">
        <Warning/>
      </el-icon>
      未经作者授权禁止转载
    </div>
  </div>

</template>

<script>

import {VideoPlayer} from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

export default {
  name: "Video",
  components: {
    VideoPlayer
  }
}
</script>

<style scoped>

</style>