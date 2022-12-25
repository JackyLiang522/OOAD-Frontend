<template>
  <!--  <div style="display: flex;justify-content: center;">-->
  <!--    <el-divider content-position="left"-->
  <!--                style="display: flex;justify-content: center;width: 70%; margin:30px  0 3% 3%"><b>-->
  <!--      <h2>我的课程</h2>-->
  <!--    </b>-->
  <!--    </el-divider>-->
  <!--  </div>-->
  <el-container>
    <el-header style="height: 70px">
      <h3 style="margin-right: 5px;">
        <span style="vertical-align: 22%">我的课程</span>
        <el-icon size="30px" style="margin-left: 5px">
          <List/>
        </el-icon>
      </h3>
    </el-header>
    <hr class="style-three" style="margin-bottom: 30px">
  </el-container>

  <div style="display: flex;justify-content: center;">

    <el-input
        v-model="searchInfo"
        size="large"
        placeholder="请输入课程名"
        style="width: 50%; margin:  20px 0 10px 0"
    />
    <el-button size="large" :icon="Search"
               style="display: flex;justify-content: center; width: 100px;  margin:  20px 0 0  20px">搜索
    </el-button>
  </div>

  <el-row style="margin:  0 0 0 0" align="middle">
    <el-col :span="3" :offset="6" style="text-align: center;margin-top:20px;vertical-align: center">
      <div class="grid-content bg-purple-light">
        <router-link to="/video" style="line-height:inherit;display: block;">
          <span class="my-h4">课程 A</span></router-link>
        <!--        跳转至课程视频观看url-->
      </div>
    </el-col>
    <el-col :span="9" style="text-align: center;margin-top:20px;vertical-align: center;">
      <div class="grid-content bg-purple">
        <!--        <router-link to="/student/course/detail">-->
        <!--          <h4 >课程详情</h4></router-link>-->
        <div>
          <router-link to="/teacher/detail/content">
            <span class="my-h4">目录</span></router-link>
          <el-divider direction="vertical"/>
          <router-link to="/teacher/detail/announcement">
            <span class="my-h4">通知</span></router-link>
          <el-divider direction="vertical"/>
          <router-link to="/teacher/detail/student">
            <span class="my-h4">学生</span></router-link>
          <el-divider direction="vertical"/>
        </div>
      </div>
    </el-col>
  </el-row>

  <el-row style="margin:  0 0 0 0" align="middle">
    <el-col :span="3" :offset="6" style="text-align: center;margin-top:20px;vertical-align: center">
      <div class="grid-content bg-purple-light">
        <router-link to="/video" style="line-height:inherit;display: block;">
          <span class="my-h4">课程 B</span></router-link>
        <!--        跳转至课程视频观看url-->
      </div>
    </el-col>
    <el-col :span="9" style="text-align: center;margin-top:20px;vertical-align: center;">
      <div class="grid-content bg-purple">
        <!--        <router-link to="/student/course/detail">-->
        <!--          <h4 >课程详情</h4></router-link>-->
        <div>
          <router-link to="/teacher/detail/content">
            <span class="my-h4">目录</span></router-link>
          <el-divider direction="vertical"/>
          <router-link to="/teacher/detail/announcement">
            <span class="my-h4">通知</span></router-link>
          <el-divider direction="vertical"/>
          <router-link to="/teacher/detail/student">
            <span class="my-h4">学生</span></router-link>
          <el-divider direction="vertical"/>
        </div>
      </div>
    </el-col>
  </el-row>


</template>

<script>
import {Search} from "@element-plus/icons-vue";
import {ref} from "vue";

export default {
  name: "CourseList",
  setup() {
    const searchInfo = ref('')
    return {
      Search,
      searchInfo
    }
  }
}
</script>

<style scoped>
.my-h4 {
  /*display: block;*/
  margin-top: 2em;
  margin-bottom: 1.33em;
  font-weight: bold;
  font-size: 110%;
}

hr.style-three {
  width: 100%;
  margin: 0 auto;
  border: 0;
  height: 5px;
  background: #333 linear-gradient(to right, #ccc, #333, #ccc);
}


.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

</style>