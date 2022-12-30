<template>
  <VideoHeader
      :teacher="teacher"
      :chapterName="chapters[0].chapterName"
      :chapterNumber="chapters[0].chapterNumber"/>

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
              v-for="chapter in chapters"
              style="margin: 5px 0 5px 0;"
              :underline="false"
              href="/"
          >
            {{ chapter.chapterName }}
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
      <el-button @click="releaseComment" type="primary" style="height: 100%;width: max(100%,50px);">发布</el-button>
    </el-col>
  </el-row>

  <Comment v-for="comment in comments" :username="comment.username" :content="comment.content" :date="comment.date"/>


  <el-divider/>


</template>

<script lang="ts">
import {defineComponent, ref, shallowRef} from 'vue'
import {VideoJsPlayer} from "video.js"
import {VideoPlayer} from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import Comment from "@/views/CourseOnline/Video/Comment.vue";
import VideoHeader from "@/views/CourseOnline/Video/VideoHeader.vue";
import router from '@/router/CourseOnline'
import axios from 'axios';
import store from "@/store";
import {useStore} from "vuex";

export default defineComponent({
  name: 'vue-basic-player-example',
  title: 'Basic player (Vue)',
  url: import.meta.url,
  components: {
    VideoHeader,
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

    let comment_input = ref('')

    const comments = ref([{username: 'Bob', content: '114514', date: '2022-10-10 10:10'}])
    const store = useStore()

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
      courseId: 0,
      teacher: '陈文雁',
      chapters: [{chapterId: 0, chapterName: 'Introduction', chapterNumber: 0}],
      chapter: {chapterId: 0},
      comments,
      header: false,
      releaseComment
    }
  },

  async created() {
    this.courseId = router.currentRoute.value.query.course_id;
    axios.get(`http://${store.state.host}/api/chapter/list?courseId=` + this.courseId).then((response) => {
      this.chapters = response.data;
      this.chapter = this.chapters[0];
    })
    axios.get(`http://${store.state.host}/api/course?courseId=` + this.courseId).then((response) => {
      this.teacher = response.data.teacher;
    })
    axios.get(`http://${store.state.host}/api/comment/list?chapterId=` + this.chapter.chapterId).then((response) => {
      this.comments = response.data;
    })
  },
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