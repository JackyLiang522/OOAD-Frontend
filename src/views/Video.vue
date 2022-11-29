<template>
  <div>
    <span style="font-size: 20px;margin:0 100px 0 0">章节1：HelloWorld</span>
    <span style="text-align: right">
      <span style="font-size: 15px;">by 张三</span>
      <el-button size="default" type="primary" style="margin:0 0 0 20px;width: 130px;vertical-align: middle;">订阅
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
          :playback-rates="[0.5, 1.0, 1.5, 2.0]"
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
          style="height: 100%;margin-top: 3px"
      />
    </el-col>
    <el-col :span="8">
      <el-scrollbar height="340px" style="border: 3px solid gray">
        <div style="margin:10px 20px 0 20px;word-break: break-word;">
          <el-link
              v-for="i in chapters.length"
              style="margin: 5px 0 5px 0;"
              :underline="false"
              :href="chapter_hrefs[i]"
          >
            {{ chapters[i] }}
          </el-link>
        </div>
      </el-scrollbar>
    </el-col>
  </el-row>

  <el-row style="margin-top: 30px;" :gutter="30" justify="center">
    <el-col :span="15">
      <el-input
          v-model="comment_input"
          type="textarea"
          placeholder="发表一条友善的评论吧"
          resize="none"
          :rows="3"
          clearable
      />
    </el-col>
    <el-col :span="3">
      <el-button type="primary" style="height: 100%;width: max(100%,50px);">发布</el-button>
    </el-col>
  </el-row>

  <Comment v-for="content in contents" :content="content"/>


  <el-divider/>

  <el-container>
    <el-footer style="background-color: black;margin-top: 100px;color :white">
      <p style="text-align: center">已经到底咯</p>
    </el-footer>
  </el-container>
</template>

<script lang="ts">
import {defineComponent, ref, shallowRef} from 'vue'
import {VideoJsPlayer} from 'video.js'
import {VideoPlayer} from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import Comment from "@/components/Comment.vue";

export default defineComponent({
  name: 'vue-basic-player-example',
  title: 'Basic player (Vue)',
  url: import.meta.url,
  components: {
    Comment,
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

    let chapters = [
      '章节名：这是一个章节的名字',
      '章节名：这是一个章节的名字',
      '章节名：这是一个章节的名字',
      '章节名：这是一个章节的名字',
      '章节名：这是一个章节的名字',
      '章节名：这是一个很长很长很长很长很长很长很长很长很长很长很长很长很长的章节的名字',
      '章节名：这是一个很长很长很长很长很长很长很长很长很长很长很长很长很长的章节的名字',
      '章节名：这是一个很长很长很长很长很长很长很长很长很长很长很长很长很长的章节的名字',
      '章节名：这是一个很长很长很长很长很长很长很长很长很长很长很长很长很长的章节的名字',
      '章节名：这是一个很长很长很长很长很长很长很长很长很长很长很长很长很长的章节的名字',
      '章节名：这是一个很长很长很长很长很长很长很长很长很长很长很长很长很长的章节的名字',
      'consist letter and letter and letter and letter and letter and letter and letter and letter and letter and' +
      'letter and letter',
      '章节名：这是一个长英文单词longgggggggggggggggggggggggggggggggggggggggggggggggggggggggggg',
    ]

    let chapter_hrefs = [
      '/login#/login',
      '/login#/login',
      '/login#/login',
      '/login#/login',
      '/login#/login',
      '/login#/login',
      '/login#/login',
      '/login#/login',
      '/login#/login',
      '/login#/login',
      '/login#/login',
      '/login#/login',
      '/login#/login',
      '/login#/login',
    ]

    let comment_input = ref('')

    let contents = [
      '中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符' +
      '中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符' +
      '中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符' +
      '中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符' +
      '中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符' +
      '中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符' +
      '中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符' +
      '中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符' +
      '中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符' +
      '中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符中文占位符'
      ,
      'English_Word English_Word English_Word English_Word English_Word English_Word English_Word English_Word English_Word' +
      'English_Word English_Word English_Word English_Word English_Word English_Word English_Word English_Word English_Word' +
      'English_Word English_Word English_Word English_Word English_Word English_Word English_Word English_Word English_Word' +
      'English_Word English_Word English_Word English_Word English_Word English_Word English_Word English_Word English_Word' +
      'English_Word English_Word English_Word English_Word English_Word English_Word English_Word English_Word English_Word' +
      'English_Word English_Word English_Word English_Word English_Word English_Word English_Word English_Word English_Word' +
      'English_Word English_Word English_Word English_Word English_Word English_Word English_Word English_Word English_Word' +
      'English_Word English_Word English_Word English_Word English_Word English_Word English_Word English_Word English_Word' +
      'English_Word English_Word English_Word English_Word English_Word English_Word English_Word English_Word English_Word'
      ,
      'a_very_long_wordddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'
      ,
      '一条很短的评论'
    ]

    return {
      player,
      handleMounted,
      handleEvent,
      comment_input,
      contents,
      chapters,
      chapter_hrefs
    }
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