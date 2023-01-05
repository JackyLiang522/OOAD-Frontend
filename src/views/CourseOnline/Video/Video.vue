<template>
  <VideoHeader
      :teacher="teacher"
      :chapterName="chapter.name"
      :chapterNumber="chapter.chapterNumber"
      :chapterId="chapter.id"
      :courseId="courseId"
  />

  <el-row style="margin:20px 0 0 0;height: 350px" :gutter="30">
    <el-col :span="16">
      <video-player
          id="video-player"
          class="video-player vjs-big-play-centered"
          :src="videoSrc"
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
          @canplaythrough="handleCanPlay"
          @timeupdate="handleTimeUpdate(player?.currentTime())"
          style="height: 100%;margin-top: 3px"
      />
    </el-col>
    <el-col :span="8">
      <el-scrollbar height="340px" style="border: 3px solid gray">
        <div style="word-break: break-word;" v-for="chapter in chapters">
          <el-link
              style="margin:0px 0px 0px 50px;"
              type="primary"
              :underline="false"
              @click="changeChapter(chapter.id)">
            <h3>第{{ chapter.chapterNumber }}章 {{ chapter.name }}</h3>
          </el-link>
          <el-divider style="margin:0 10% 0 10%;width: 80%"></el-divider>
        </div>
      </el-scrollbar>
    </el-col>
  </el-row>
  <el-row style="margin-top: 30px;" :gutter="30" justify="center">
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
      <el-button @click="releaseComment" type="primary" style="height: 100%;width: max(100%,50px);">发布</el-button>
    </el-col>
  </el-row>

  <Comment
      v-for="comment in comments"
      :username="comment.nickname"
      :content="comment.contents"
      :date="comment.createTime"
  />

  <el-divider/>


  <testSpeed @sendDelay/>
</template>

<script lang="ts">
import {onBeforeMount, onBeforeUnmount, onMounted, reactive, ref, shallowRef} from 'vue'
import videojs, {VideoJsPlayer} from "video.js"
import {VideoPlayer} from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import Comment from "@/views/CourseOnline/Video/Comment.vue";
import VideoHeader from "@/views/CourseOnline/Video/VideoHeader.vue";
import testSpeed from "@/views/CourseOnline/Video/testSpeed.vue";
import axios from 'axios';
import {useStore} from "vuex";
import {ElMessageBox} from 'element-plus'
import {useRoute} from "vue-router";

export default {
  name: 'vue-basic-player-example',
  title: 'Basic player (Vue)',
  url: import.meta.url,
  components: {
    VideoHeader,
    Comment,
    VideoPlayer,
    testSpeed
  },
  emits: ['changeChapter'],
  setup() {
    const delay = ref(0)
    const player = shallowRef<VideoJsPlayer>()
    const handleMounted = (payload: any) => {
      player.value = payload.player
      console.log('Basic player mounted', payload)
    }
    const handleEvent = (log: any) => {
      console.log('Basic player event', log)
    }

    let comment_input = ref('')
    const comments = ref([{nickname: 'Bob', contents: '114514', createTime: '2022-10-10 10:10'}])
    const chapters = ref([{id: 0, name: 'Introduction', chapterNumber: 0}])
    const chapter = ref(chapters.value[0])
    const courseId = ref(0)
    const teacher = ref('')
    const videoSrc = ref('')
    const store = useStore()
    const userId = store.state.userInfo.id

    function changeChapter(chapterId: number) {
      for (let i = 0; i < chapters.value.length; i++) {
        if (chapters.value[i].id === chapterId) {
          chapter.value = chapters.value[i]
          videoSrc.value = `http://${store.state.host}/api/upload/video/${chapter.value.id}.mp4`
          axios.get(`http://${store.state.host}/api/comment/list?chapterId=${chapter.value.id}`).then((response) => {
            comments.value = response.data;
          })
          break
        }
      }
    }

    async function releaseComment() {
      if (comment_input.value === '')
        return

      const new_comment = {
        nickname: store.state.userInfo.user_name,
        contents: comment_input.value,
      }
      await axios.post(`http://${store.state.host}/api/comment/add?chapterId=${chapter.value.id}&&contents=${new_comment.contents}&&nickname=${new_comment.nickname}&&userId=${userId}`)
      await axios.get(`http://${store.state.host}/api/comment/list?chapterId=${chapter.value.id}`).then((response) => {
        comments.value = response.data;
      })
      comment_input.value = ''
    }

    onBeforeMount(async () => {
      const has_open_video_page = localStorage.getItem('has_open_video_page')
      console.log(has_open_video_page)
      if (has_open_video_page === 'true') {
        await ElMessageBox.alert('您已打开一个视频界面', '警告', {
          confirmButtonText: 'OK',
          callback: () => {
            window.close();
          },
        })
      } else {
        localStorage.setItem('has_open_video_page', 'true')
      }
    })

    onBeforeUnmount(() => {
      localStorage.setItem("has_open_video_page", 'false')
    })

    onMounted(async () => {
      // @ts-ignore
      courseId.value = useRoute().query.courseId;
      const chaptersResponse = await axios.get(`http://${store.state.host}/api/chapter/list?courseId=` + courseId.value)
      chapters.value = chaptersResponse.data
      chapter.value = chapters.value[0];
      videoSrc.value = `http://${store.state.host}/api/upload/video/${chapter.value.id}.mp4`
      for (let i = 0; i < chapters.value.length; i++) {
        chapters.value[i].chapterNumber = i + 1;
      }
      await axios.get(`http://${store.state.host}/api/course/get_teacher?courseId=` + courseId.value).then((response) => {
        teacher.value = response.data.name;
      })
      await axios.get(`http://${store.state.host}/api/comment/list?chapterId=` + chapter.value.id).then((response) => {
        // alert(response.data)
        comments.value = response.data;
      })
    })

    const lastTime = ref(-1)
    const time = ref(-1)
    const hasJump = ref(false)

    function handleTimeUpdate(timeNumber: number) {
      time.value = timeNumber
    }

    async function handleCanPlay() {
      if (lastTime.value === -1)
        return
      if (hasJump.value)
        return
      const video = videojs('video-player')
      video.play()
      video.currentTime(lastTime.value)
      hasJump.value = true
    }

    function checkNetworkSpeed() {
      lastTime.value = time.value
      const speed = getNetworkSpeed()
      let name
      if (speed === 1) {
        // 240
        name = `${chapter.value.id}_240.mp4`
      } else if (speed === 2) {
        // 360
        name = `${chapter.value.id}_360.mp4`
      } else if (speed === 3) {
        // 480
        name = `${chapter.value.id}_480.mp4`
      } else if (speed === 4) {
        // 720
        name = `${chapter.value.id}_720.mp4`
      } else {
        // 原画
        name = `${chapter.value.id}.mp4`
      }
      videoSrc.value = require(`D:\\Program\\Idea\\OOAD-Backend\\files\\video\\${name}`)
      hasJump.value = false
    }

    function getNetworkSpeed() {
      return 1
    }

    return {
      player,
      handleMounted,
      handleEvent,
      comment_input,
      courseId,
      teacher,
      chapters,
      chapter,
      comments,
      releaseComment,
      videoSrc,
      changeChapter,
      handleTimeUpdate,
      handleCanPlay,
      delay
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.video-player {
  background-color: $black;
  width: 100%;
}
</style>