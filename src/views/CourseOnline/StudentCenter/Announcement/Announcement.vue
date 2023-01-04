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

              <!--                        <el-col :span="12">-->
              <el-menu
                  active-text-color="#ffd04b"
                  background-color="#545c64"
                  class="el-menu-vertical-demo"
                  default-active="2"
                  text-color="#fff"
                  style="width: 100%;height: 100%"
              >
                <!--              :router="true"-->
                <!--                TODO: 获取已购课程-->
                <el-menu-item v-for="course in courseList"
                              index="1" style="text-align:center" @click="setCouseID(course.id)"
                              route="/student/announcement">
                  <span>{{ course.courseName }}</span>
                </el-menu-item>
              </el-menu>
              <!--              </el-col>-->
            </el-row>
          </div>
        </el-aside>
        <el-main>
          <div>
            <div class="demo-collapse" style="width: 100%">
              <el-collapse>
                <!--                TODO: 获取课程通知-->
                <el-collapse-item v-for="announcement in announcementList"
                                  class="classTitle" :title="announcement.title" name="1">
                  <div>
                    {{ announcement.content }}
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

export default {
  name: "Announcement",
  setup() {
    const courseList = ref([])
    let courseID = 0
    const store = useStore()
    const stuID = store.state.userInfo.id
    // const couseNameList = ref(['课程a', '课程b'])
    // const announcementList = ref([{
    //   title: '后端作业已发布',
    //   body: '                    同学们好，\n' +
    //       '                    后端作业已发布，线下检查安排如下：\n' +
    //       '\n' +
    //       '                    对于第二次后端作业，我们只支持在上机课时间线下检查，如果提前做好了，可找老师或SA现场检查并记分数。为了平衡检查资源，我们给同学们两次检查机会：\n' +
    //       '                    第一次线下检查后会给个分数并记录，如果觉得不是很理想，可以回去修改\n' +
    //       '                    第二次线下检查就确定了本次作业的最终分数。\n' +
    //       '                    提交安排：\n' +
    //       '                    第二次作业检查之后，需要将源代码提交sakai，但是对于检查环节，我们只支持上机课时间线下检查。'
    // }])
    const announcementList = ref([])


    onBeforeMount(async () => {
      // TODO: 根据stuID返回已购课程
      courseList.value = []
      courseID = courseList.value[0].id
      // TODO: 根据courseID返回通知列表
      announcementList.value = []
    })

    const setCouseID = (id) =>{
      courseID = id
    }

    return {
      courseList,
      announcementList,
      setCouseID
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