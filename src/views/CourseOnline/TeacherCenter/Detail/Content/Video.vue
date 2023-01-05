<template>
  <el-row>
    <el-col :span="has_video?5:24">
      <h4 style="margin: 0 0 0 0">{{ `第${chapterInfo.number}章` }}</h4>
      <p>{{ chapterInfo.title }}</p>
      <el-button style="margin: 0 0 20px 0" @click="handleEditTitle">编辑标题</el-button>

      <el-upload
          v-if="!has_video"
          ref="upload"
          :action="'http://' + host + '/api/upload/video/'"
          :data="{chapterId: chapterInfo.id}"
          :limit="1"
          :on-exceed="handleExceed"
          :on-success="handleSuccess"
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

    <el-col :offset="1" :span="18" style="height: 400px">
      <video-player
          v-show="has_video"
          class="video-player vjs-big-play-centered"
          :src="videoSrc"
          crossorigin="anonymous"
          playsinline
          controls
          :volume="0.6"
          :playback-rates="[0.5, 1.0, 1.5, 2.0]"
          @mounted="handleMounted"
          :fluid="false"
          preload="metadata"
          style="max-height: 100%"
      />
    </el-col>
  </el-row>
</template>

<script lang="ts">
import {computed, onBeforeMount, onBeforeUnmount, onMounted, reactive, ref, shallowRef, watch} from 'vue'
import {VideoJsPlayer} from 'video.js'
import {VideoPlayer} from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import {ElMessage, genFileId, ElMessageBox} from 'element-plus'
import store from '@/store'
import type {UploadInstance, UploadProps, UploadRawFile} from 'element-plus'
import axios from "axios";
import {useStore} from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Video",
  components: {VideoPlayer},
  props: ['chapterInfo'],
  emits: ['changeTitle'],
  setup(props: any, context: any) {
    const chapterId = computed(() => props.chapterInfo.id)
    // 使用：chapterId.value

    const player = shallowRef<VideoJsPlayer>()
    const handleMounted = (payload: any) => {
      player.value = payload.player
      console.log('Basic player mounted', payload)
    }

    const store = useStore()
    const host = store.state.host
    const has_video = ref(false)
    const videoSrc = ref('')

    watch(chapterId, async () => {
      if (chapterId.value === -1)
        return
      videoSrc.value = `http://${host}/api/upload/video/${chapterId.value}.mp4`
      await axios.get(videoSrc.value)
          .then(() => has_video.value = true, () => has_video.value = false)
    })

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

    // 这里只做前端的展示 Content/Content.vue 才是在后端做更新
    function handleEditTitle() {

      ElMessageBox.prompt('请输入新标题', '编辑标题', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
          .then(async ({value}) => {
            context.emit('changeTitle', props.chapterInfo.number, value)
          })
          .catch(() => {
          })
    }


    const handleSuccess = () => {
      ElMessage({
        message: '上传成功.',
        type: 'success',
      })
    }


    return {
      host,
      player,
      handleMounted,
      has_video,
      handleExceed,
      submitUpload,
      upload,
      checkType,
      handleEditTitle,
      handleSuccess,
      videoSrc
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