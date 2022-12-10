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
                <el-menu-item index="1" style="text-align:center" route="/student/announcement">
                  <span>课程A</span>
                </el-menu-item>
                <el-menu-item index="2" >
                  <span>课程B</span>
                </el-menu-item>
                <el-menu-item index="3">
                  <span>课程C</span>
                </el-menu-item>
              </el-menu>
              <!--              </el-col>-->
            </el-row>
          </div>
        </el-aside>
        <el-main>
          <div>
            <div class="demo-collapse" style="width: 100%">
              <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item class="classTitle" title="后端作业已发布" name="1">
                  <div>
                    同学们好，
                  </div>
                  <div>
                    后端作业已发布，线下检查安排如下：

                    对于第二次后端作业，我们只支持在上机课时间线下检查，如果提前做好了，可找老师或SA现场检查并记分数。为了平衡检查资源，我们给同学们两次检查机会：
                    第一次线下检查后会给个分数并记录，如果觉得不是很理想，可以回去修改
                    第二次线下检查就确定了本次作业的最终分数。
                  </div>
                  <div>
                    提交安排：
                    第二次作业检查之后，需要将源代码提交sakai，但是对于检查环节，我们只支持上机课时间线下检查。
                  </div>
                </el-collapse-item>
                <el-collapse-item title="第一次作业成绩发布通知" name="2">
                  <div>
                    同学们好，
                  </div>
                  <div>
                    第一次作业已发布，请大家在assignment模块查看。对应SA名单如下，后续作业批改SA依旧不变，如若有疑问，请本周内（建议上机课时间）咨询指定SA

                  </div>
                </el-collapse-item>

                <el-collapse-item title="关于本周课堂检查补充通知" name="4">
                  <div>
                    同学们好，
                  </div>
                  <div>
                    鉴于本周是ddl free
                    week，此次名单上的同学可选择放弃。我们上课时依旧会按照原名单点名，如果未应答就等同于放弃，放弃本周检查的同学会在后续课程安排检查后续实验课介绍的内容。名单上的同学如果想参与，依旧可以按照本周的检查流程进行。
                    也多谢同学提醒ddl free week相关事宜
                  </div>
                  <div>
                    请悉知

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

<script>
export default {
  name: "Announcement"
}
</script>

<style scoped>
:deep(.el-menu-item){
  font-size: 19px;
  font-weight: 500;
  color: #dbe2ef;
}
:deep(.el-collapse-item__header){
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