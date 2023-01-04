<template>
  <div class="common-layout">
    <el-container>
      <el-header style="height: 70px">
        <h3 style="margin-right: 5px;">
          <span style="vertical-align: 22%">课程通知</span>
          <el-icon size="30px" style="margin-left: 5px">
            <DataBoard/>
          </el-icon>
        </h3>
      </el-header>
      <hr class="style-three" style="margin-bottom: 0">
      <el-container>

        <el-aside width="20%">
          <div>
            <el-row class="tac">
              <el-menu
                  active-text-color="#ffd04b"
                  background-color="#545c64"
                  class="el-menu-vertical-demo"
                  default-active="2"
                  text-color="#fff"
                  style="width: 100%;height: 100%"
              >
                <el-menu-item v-for="course in courseList"
                              index="1" style="text-align:center" @click="setCourseID(course.id)"
                              route="/student/announcement">
                  <span>{{ course.courseName }}</span>
                </el-menu-item>
              </el-menu>
            </el-row>
          </div>
        </el-aside>
        <el-main>
          <div>
            <div class="demo-collapse" style="width: 100%">
              <el-collapse>

                <el-collapse-item v-for="announcement in announcementList"
                                  class="classTitle" :title="announcement.title" name="1">
                  <div>
                    <p> {{ announcement.content }}</p>
                    <p> {{ announcement.time.toDateString() }}</p>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>

          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import {onBeforeMount, ref} from "vue";
import {useStore} from "vuex";
import axios from "axios";

export default {
  name: "Announcement",
  setup() {
    const courseList = ref([])
    let courseID = 0
    const store = useStore()
    const stuID = store.state.userInfo.id
    // const courseNameList = ref(['课程a', '课程b'])
    // const announcementList = ref([{
    //   title: '后端作业已发布',
    //   content: '                    同学们好，\n' +
    //       '                    后端作业已发布，线下检查安排如下：\n' +
    //       '\n' +
    //       '                    对于第二次后端作业，我们只支持在上机课时间线下检查，如果提前做好了，可找老师或SA现场检查并记分数。为了平衡检查资源，我们给同学们两次检查机会：\n' +
    //       '                    第一次线下检查后会给个分数并记录，如果觉得不是很理想，可以回去修改\n' +
    //       '                    第二次线下检查就确定了本次作业的最终分数。\n' +
    //       '                    提交安排：\n' +
    //       '                    第二次作业检查之后，需要将源代码提交sakai，但是对于检查环节，我们只支持上机课时间线下检查。',
    //   time:new Date()
    // }])
    const announcementList = ref([])


    onBeforeMount(async () => {
      await axios.get(`http://${store.state.host}/api/course/list_subscribed?clientId=${stuID}`)
          .then(
              response => {
                if (response.data) {
                  courseList.value = response.data;
                }
              },
              err => {
                console.log(err)
              })

      // @ts-ignore
      courseID = courseList.value[0].id


      announcementList.value = []
      await axios.get(`http://${store.state.host}/api/announcement/list?courseId=${courseID}`)
          .then(
              response => {
                if (response.data) {
                  announcementList.value = response.data;
                }
              },
              err => {
                console.log(err)
              })

    })

    const setCourseID = async (id: number) => {
      console.log(id)
      courseID = id
      await axios.get(`http://${store.state.host}/api/announcement/list?courseId=${courseID}`)
          .then(
              response => {
                if (response.data) {
                  announcementList.value = response.data;
                }
              },
              err => {
                console.log(err)
              })
    }

    return {
      courseList,
      announcementList,
      setCourseID
    }
  }
}
</script>

<style scoped>
:deep(.el-menu-item) {
  font-size: 19px;
  font-weight: 500;
  color: #dbe2ef;
}

:deep(.el-collapse-item__header) {
  font-size: 18px;
  font-weight: 700;
  color: #364f6b;
}

/*渐变*/
hr.style-three {
  width: 100%;
  margin: 0 auto;
  border: 0;
  height: 5px;
  background: #333 linear-gradient(to right, #ccc, #333, #ccc);
}
</style>