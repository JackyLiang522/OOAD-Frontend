<template>
  <h4 style="margin: 0 0 0 10px">{{ `第${chapterInfo.number}章 ${chapterInfo.title}` }}</h4>
</template>

<script>
export default {
  name: "Quiz",
  props: ['chapterInfo'],
}
</script>

<style scoped>

</style>