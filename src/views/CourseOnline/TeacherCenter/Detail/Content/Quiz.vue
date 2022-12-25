<template>
  <h4 style="margin: 0 0 0 0">{{ `第${chapterInfo.number}章` }}</h4>
  <p>{{ chapterInfo.title }}</p>
  <p style="color: gray;font-size: 13px">{{ chapterInfo.intro }}</p>
</template>

<script>
export default {
  name: "Quiz",
  props: ['chapterInfo'],
}
</script>

<style scoped>

</style>