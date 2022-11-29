<template>
  <el-divider/>
  <p style="font-size: 20px;font-weight: bold;margin:0">张小三</p>
  <el-scrollbar max-height="100" style="margin: 15px 40px 0 40px;word-break: break-word;">
    {{content}}
  </el-scrollbar>
  <p style="margin: 10px 0 0 40px;font-size: 13px;color:gray;">2022-10-10 10:10</p>
</template>

<script>
export default {
  name: "Comment",
  props:['content']
}
</script>

<style scoped>

</style>