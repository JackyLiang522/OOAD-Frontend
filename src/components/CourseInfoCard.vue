<template>
  <div
      class="course_info_card"
      :style="{
    boxShadow:'var(--el-box-shadow)',
    borderRadius: `var(--el-border-radius-${'base'})`}"
  >

    <el-image
        style="width: 120px; margin: 20px 60px 0 60px;"
        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        fit="contain"/>

    <p style="font-size: 20px;font-weight: bold;color: #397ce2;text-align: center;margin: 15px 0 15px 0">高等数学</p>

    <el-scrollbar height="105px">
      <div class="content">
        授课教师：张三
        <br>
        章节数量：16
        <br>
        课程价格：0
        <br>
        课程简介：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup>
</script>

<style scoped>
.course_info_card {
  width: 240px;
  height: 300px;
  background-color: white;
  border: 1px solid var(--el-border-color);
  margin: 0 0 0 0;
}

.content {
  word-wrap: break-word;
  word-break: normal;
  margin: 0 20px 0 20px;
  line-height: 20px;
  font-size: 15px;
}
</style>