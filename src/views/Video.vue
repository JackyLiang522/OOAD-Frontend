<template>
  <div>
    <span style="font-size: 20px;margin:0 100px 0 0">章节1：HelloWorld</span>
    <span style="font-size: 15px;">by 张三</span>
    <el-button size="default" style="margin:0 0 0 20px;width: 130px;vertical-align: middle;">订阅</el-button>
    <br>
    <div style="height: 20px;margin-top:0;color: gray">
      <el-icon size="14px" style="margin: 0 0 0 20px;vertical-align: middle">
        <Warning/>
      </el-icon>
      <span style="font-size: 13px"> 未经作者授权禁止转载</span>
    </div>
  </div>

  <el-row style="margin:20px 0 0 0;height: 350px" :gutter="30">
    <el-col :span="16">
      <video-player
          class="video-player vjs-big-play-centered"
          src="https://vjs.zencdn.net/v/oceans.mp4"
          poster="https://vjs.zencdn.net/v/oceans.png"
          crossorigin="anonymous"
          playsinline
          controls
          :volume="0.6"
          :playback-rates="[0.7, 1.0, 1.5, 2.0]"
          @mounted="handleMounted"
          @ready="handleEvent($event)"
          @play="handleEvent($event)"
          @pause="handleEvent($event)"
          @ended="handleEvent($event)"
          @loadeddata="handleEvent($event)"
          @waiting="handleEvent($event)"
          @playing="handleEvent($event)"
          @canplay="handleEvent($event)"
          @canplaythrough="handleEvent($event)"
          @timeupdate="handleEvent(player?.currentTime())"
          style="height: 100%"
      />
    </el-col>
    <el-col :span="8">
      <div class="grid-content ep-bg-purple" style="background-color: lightblue;height:100%;"/>
    </el-col>
  </el-row>



</template>

<script lang="ts">
import {defineComponent, shallowRef} from 'vue'
import {VideoJsPlayer} from 'video.js'
import {VideoPlayer} from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

export default defineComponent({
  name: 'vue-basic-player-example',
  title: 'Basic player (Vue)',
  url: import.meta.url,
  components: {
    VideoPlayer
  },
  setup() {
    const player = shallowRef<VideoJsPlayer>()
    const handleMounted = (payload: any) => {
      player.value = payload.player
      console.log('Basic player mounted', payload)
    }

    const handleEvent = (log: any) => {
      console.log('Basic player event', log)
    }

    return {player, handleMounted, handleEvent}
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.video-player {
  background-color: $black;
  width: 100%;
}
</style>