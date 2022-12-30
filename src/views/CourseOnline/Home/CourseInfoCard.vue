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

    <p style="font-size: 20px;font-weight: bold;color: #397ce2;text-align: center;margin: 15px 0 15px 0">
      <router-link :to="has_purchased?('/video?course_id=' + courseId):''">
        {{ courseName }}
      </router-link>
      <el-button
          type="primary"
          size="small"
          style="margin-left: 20px"
          v-show="!has_purchased"
          @click="purchaseCourse"
      >购买
      </el-button>
    </p>

    <el-scrollbar height="105px" style="height: 105px">
      <div class="content">
        授课教师：{{ teacher }}
        <br>
        章节数量：{{ chapterCount }}
        <br>
        课程价格：{{ price }}
        <br>
        课程简介：{{ introduction }}
      </div>
    </el-scrollbar>
  </div>

</template>

<script setup>
</script>

<script>
import {useStore} from "vuex";

export default {
  props: ['courseId', 'courseName', 'teacher', 'chapterCount', 'price', 'introduction', 'has_purchased'],

  setup(props) {
    const store = useStore()

    function purchaseCourse() {
      const courseInfo = {
        courseId:props.courseId,
        courseName:props.courseName,
        teacher:props.teacher,
        price:props.price,
        // 这里放后端村的一个课程的所有信息，必须要有course id
      }
      // 后端在这里购买课程
      // 如果要用传入的信息：props.变量名。例如： const courseId = props.courseId

      // 后端发送信息成功后，执行下面这段话，在前端把该课程加入用户信息：
      store.commit('PURCHASE_COURSE', courseInfo)
    }

    return {
      purchaseCourse
    }
  }
}
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
  padding: 0 0 0 0;
}
</style>