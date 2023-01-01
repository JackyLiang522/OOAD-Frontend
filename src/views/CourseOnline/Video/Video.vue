<template>
  <VideoHeader
      :teacher="teacher"
      :chapterName="chapter.name"
      :chapterNumber="chapter.chapterNumber"/>

  <el-row style="margin:20px 0 0 0;height: 350px" :gutter="30">
    <el-col :span="16">
      <video-player
          class="video-player vjs-big-play-centered"
          :src="videoSrc"
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
              v-for="chapter in chapters"
              style="margin: 5px 0 5px 0;"
              :underline="false"
              @click="changeChapter(chapter.id)"
          > {{ chapter.chapterNumber }}.
            {{ chapter.name }}
          </el-link>
        </div>
      </el-scrollbar>
    </el-col>
  </el-row>
  <el-row style="margin-top: 30px;" :gutter="30" justify="center">
    <test-speed></test-speed>
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

  <Comment v-for="comment in comments" :username="comment.username" :content="comment.content" :date="comment.date"/>


  <el-divider/>


</template>

<script lang="ts">
import {onBeforeUnmount, onMounted, onUnmounted, ref, shallowRef} from 'vue'
import videojs, {VideoJsPlayer} from "video.js"
import {VideoPlayer} from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import Comment from "@/views/CourseOnline/Video/Comment.vue";
import VideoHeader from "@/views/CourseOnline/Video/VideoHeader.vue";
import testSpeed from "@/views/CourseOnline/Video/testSpeed.vue";
import router from '@/router/CourseOnline'
import axios from 'axios';
import {useStore} from "vuex";
import {ElMessage, ElMessageBox} from 'element-plus'
import type {Action} from 'element-plus'

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
    function removeHandler() {
      localStorage.setItem('has_open_video_page', 'false')
    }

    onUnmounted(() => {
      window.removeEventListener('beforeunload', e => removeHandler())
    })

    const player = shallowRef<VideoJsPlayer>()
    const handleMounted = (payload: any) => {
      player.value = payload.player
      console.log('Basic player mounted', payload)
    }
    const handleEvent = (log: any) => {
      console.log('Basic player event', log)
    }

    let comment_input = ref('')
    const comments = ref([{username: 'Bob', content: '114514', date: '2022-10-10 10:10'}])
    const chapters = ref([{id: 0, name: 'Introduction', chapterNumber: 0}])
    const chapter = ref(chapters.value[0])
    const courseId = ref(0)
    const teacher = ref('')
    const videoSrc = ref('')
    const store = useStore()

    function changeChapter(chapterId: number) {
      for (let i = 0; i < chapters.value.length; i++) {
        if (chapters.value[i].id === chapterId) {
          chapter.value = chapters.value[i]
          videoSrc.value = `http://${store.state.host}/api/upload/video/${chapter.value.id}.mp4`
          axios.get(`http://${store.state.host}/api/comment/list?chapterId=` + chapter.value.id).then((response) => {
            comments.value = response.data;
          })
          break
        }
      }
    }

    function releaseComment() {
      if (comment_input.value === '')
        return

      const new_comment = {
        username: store.state.userInfo.user_name,
        content: comment_input.value,
        date: dateFtt("yyyy-MM-dd hh:mm", new Date())
      }

      // 这里把新评论传给后端

      comment_input.value = ''
      comments.value.push(new_comment)
    }

    onMounted(async () => {
      const has_open_video_page = localStorage.getItem('has_open_video_page')
      if (has_open_video_page === 'true') {
        await ElMessageBox.alert('您已打开一个视频界面', '警告', {
          confirmButtonText: 'OK',
          callback: () => {
            window.close();
          },
        })
      } else {
        localStorage.setItem('has_open_video_page', 'true')
        window.addEventListener('beforeunload', e => removeHandler())
      }

      courseId.value = router.currentRoute.value.query.course_id;
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
        comments.value = response.data;
      })
    })
    
    function dateFtt(fmt: string, date: Date) { //author: meizz   
      const o = {
        "M+": date.getMonth() + 1,                 //月份   
        "d+": date.getDate(),                    //日   
        "h+": date.getHours(),                   //小时   
        "m+": date.getMinutes(),                 //分   
        "s+": date.getSeconds(),                 //秒   
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
        "S": date.getMilliseconds()             //毫秒   
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (const k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            // @ts-ignore
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
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