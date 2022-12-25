<template>
  <div>
    <span style="font-size: 20px;margin:0 100px 0 0">章节 {{chapterNumber}}：{{chapterName}}</span>
    <span style="float: right">
      <span style="font-size: 15px;">by {{teacher}}</span>
      <el-button-group style="margin:0 0 0 20px;width: 130px;vertical-align: middle;">
      <el-button
          size="default"
          type="primary"
      >
        订阅
      </el-button>
        <el-button size="default" type="info" @click="this.$router.push('/quiz')">
          测验
        </el-button>
        </el-button-group>
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
export default {
  props: {
    teacher: String,
    chapterNumber: Number,
    chapterName: String
  },
  name:'VideoQuizHeader'
}
</script>