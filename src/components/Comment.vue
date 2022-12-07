<template>
  <el-divider/>
  <p style="font-size: 20px;font-weight: bold;margin:0">{{username}}</p>
  <el-scrollbar max-height="100" style="margin: 15px 40px 0 40px;word-break: break-word;">
    {{content}}
  </el-scrollbar>
  <p style="margin: 10px 0 0 40px;font-size: 13px;color:gray;">{{date}}</p>
</template>

<script>
export default {
  name: "Comment",
  props: {
    content: String,
    username: String,
    date: String
  }
}
</script>

<style scoped>

</style>