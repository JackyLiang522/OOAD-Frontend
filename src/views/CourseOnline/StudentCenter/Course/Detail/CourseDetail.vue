<template>
  <div style="display: flex;justify-content: center;">

    <el-divider content-position="left"
                style="display: flex;justify-content: center;width: 70%; margin:30px  0 30px 3%"><b>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/student/course' } "><h3>课程列表</h3>
        </el-breadcrumb-item>
        <el-breadcrumb-item><h3>课程XX</h3></el-breadcrumb-item>
      </el-breadcrumb>
    </b>
    </el-divider>
  </div>
  <div style="display: flex;justify-content: center;">
    <el-card class="box-card" style="height: 100%; width:50%">
      <div slot="header" class="clearfix" style="margin-bottom: 10px">
        <h3>课程XX</h3>
      </div>
      <div style="display: flex;justify-content: center;">
        <div>课程作业</div>
      </div>
      <div style="display: flex;justify-content: center;">
        <el-table
            :data="hwData"
            stripe
            :border="true"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            style="width: 100%; margin: 10px 0 0 0;">
          <el-table-column
              prop="title"
              label="作业标题"
              width="150">
            <template #default="scope">
              <div>
<!--                <router-link :to="{ name: '/student/course/hw', query: { id: scope.row.id } }">-->
                <router-link to="/student/course/hw">
                  {{ scope.row.title }}
                </router-link>

              </div>
            </template>
          </el-table-column>

          <el-table-column
              prop="state"
              label="状态"
              min-width="150">
          </el-table-column>


          <el-table-column
              prop="date"
              label="截止日期"
              min-width="150">
          </el-table-column>
          <el-table-column
              prop="score"
              label="分数"
              min-width="150">
          </el-table-column>
        </el-table>
      </div>
      <div style="display: flex;justify-content: center; margin-top: 40px">
        <div>课程进度</div>
      </div>
      <div style="display: flex;justify-content: center;">
        <el-table
            :data="pgData"
            stripe
            :border="true"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            style="width: 100%; margin: 10px 0 0 0;">
          <el-table-column
              prop="title"
              label="章节"
              width="150"
          >
          </el-table-column>
          <el-table-column
              prop="state"
              label="状态"
              min-width="150">
          </el-table-column>
          <el-table-column
              prop="score"
              label="小测得分"
              min-width="150">
          </el-table-column>
        </el-table>
      </div>
      <el-button style="float: right; margin: 40px  3% 20px 0" type="danger" round>退课</el-button>


    </el-card>
  </div>
</template>

<script>
export default {
  name: "CourseDetail",
  data() {
    return {
      hwData: [{
        title: '作业1',
        state: '完成',
        date: '2016-05-02',
        score: 90
      },
        {
          title: '作业2',
          state: '未完成',
          date: '2016-05-02',
          score: '-'
        }],
      pgData: [{
        title: '章节一',
        state: '完成',
        score: 90
      },
        {
          title: '章节二',
          state: '未完成',
          score: '-'
        }]
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}


.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}
</style>