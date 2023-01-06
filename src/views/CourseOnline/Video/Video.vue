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
  <testSpeed @sendDelay="checkNetworkSpeed"/>
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
import {useRoute, useRouter} from "vue-router";

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
  setup() {
    const delay = ref(0)
    const player = shallowRef<VideoJsPlayer>()
    const handleMounted = (payload: any) => {
      player.value = payload.player
      // console.log('Basic player mounted', payload)
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

    let notChange = false
    onBeforeMount(() => {
      const has_open_video_page = localStorage.getItem('has_open_video_page')
      console.log(has_open_video_page)
      if (has_open_video_page === 'true') {
        notChange = true
        useRouter().push('/home')
      } else {
        localStorage.setItem('has_open_video_page', 'true')
      }
    })

    onBeforeUnmount(() => {
      if (notChange)
        return
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

    function checkNetworkSpeed(speed: number) {
      console.log(speed)
      console.log(chapter.value.id)
      if (chapter.value.id !== 2)
        return;
      if (isNaN(speed))
        return

      lastTime.value = time.value

      if (speed > 100) {
      //   videoSrc.value = require('C:\\Users\\Ksco\\ProgramProjects\\GithubRepos\\OOAD-Backend\\files\\video\\2_240.mp4')
      //   console.log(240)
      // } else if(3000 < speed && speed <= 5000) {
      //   videoSrc.value = require('C:\\Users\\Ksco\\ProgramProjects\\GithubRepos\\OOAD-Backend\\files\\video\\2_360.mp4')
      //   console.log(360)
      // }else if(1000 < speed && speed<= 3000){
        videoSrc.value = require('C:\\Users\\Ksco\\ProgramProjects\\GithubRepos\\OOAD-Backend\\files\\video\\2_240.mp4')
        console.log(240)
      // }else if(300 < speed && speed<= 1000){
      //   videoSrc.value = require('C:\\Users\\Ksco\\ProgramProjects\\GithubRepos\\OOAD-Backend\\files\\video\\2_240.mp4')
      //   console.log(240)
      }else{
        videoSrc.value = require('C:\\Users\\Ksco\\ProgramProjects\\GithubRepos\\OOAD-Backend\\files\\video\\2.mp4')
        console.log(1080)
      }
      hasJump.value = false
    }


    return {
      player,
      handleMounted,
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
      checkNetworkSpeed
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