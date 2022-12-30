<template>
  <el-button type="primary" @click="has_video=!has_video">
    该按钮仅用于测试，控制台有输出为正常现象
    <br/>
    当前 has_video 为 {{ has_video }}
  </el-button>
  <el-row>
    <el-col :span="has_video?5:24">
      <h4 style="margin: 0 0 0 0">{{ `第${chapterInfo.number}章` }}</h4>
      <p>{{ chapterInfo.title }}</p>
      <el-button style="margin: 0 0 20px 0" @click="handleEditTitle">编辑标题</el-button>

      <el-upload
          v-if="!has_video"
          ref="upload"
          :action="'http://' + host + '/api/upload/video/'"
          :data="{chapterId: chapterInfo.number}"
          :limit="1"
          :on-exceed="handleExceed"
          :auto-upload="false"
          :before-upload="checkType"
      >
        <template #trigger>
          <el-button type="primary">选择视频</el-button>
        </template>
        <el-button class="ml-3" type="success" @click="submitUpload">
          上传
        </el-button>
        <template #tip>
          <div class="el-upload__tip text-red">
            只能上传一个视频
          </div>
        </template>
      </el-upload>
    </el-col>

    <el-col :offset="1" :span="18">
      <video-player v-show="has_video"
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
                    :fluid="true"
                    preload="metadata"
      />
    </el-col>
  </el-row>


</template>

<script lang="ts">
import {reactive, ref, shallowRef} from 'vue'
import {VideoJsPlayer} from 'video.js'
import {VideoPlayer} from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import {ElMessage, genFileId, ElMessageBox} from 'element-plus'
import store from '@/store'
import type {UploadInstance, UploadProps, UploadRawFile} from 'element-plus'

export default {
  name: "Video",
  components: {VideoPlayer},
  props: ['chapterInfo'],
  emits: ['changeTitle'],
  setup(props: any, context: any) {
    const player = shallowRef<VideoJsPlayer>()
    const handleMounted = (payload: any) => {
      player.value = payload.player
      console.log('Basic player mounted', payload)
    }
    const handleEvent = (log: any) => {
      console.log('Basic player event', log)
    }

    let comment_input = ref('')
    const host = store.state.host

    const has_video = ref(false)

    const upload = ref<UploadInstance>()

    const handleExceed: UploadProps['onExceed'] = (files) => {
      upload.value!.clearFiles()
      const file = files[0] as UploadRawFile
      file.uid = genFileId()
      upload.value!.handleStart(file)
    }

    const submitUpload = () => {
      upload.value!.submit()
    }

    const checkType: UploadProps['beforeUpload'] = (rawFile) => {
      if (rawFile.type !== 'video/mp4') {
        ElMessage.error('视频只能为 mp4 格式')
        return false
      }
      return true
    }

    function handleEditTitle() {
      ElMessageBox.prompt('请输入新标题', '编辑标题', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
          .then(({value}) => {
            context.emit('changeTitle', props.chapterInfo.number, value)
          })
          .catch(() => {
          })
    }

    return {
      host,
      player,
      handleMounted,
      handleEvent,
      comment_input,
      has_video,
      handleExceed,
      submitUpload,
      upload,
      checkType,
      handleEditTitle
    }
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.video-player {
  background-color: $black;
  width: 100%;
}
</style>