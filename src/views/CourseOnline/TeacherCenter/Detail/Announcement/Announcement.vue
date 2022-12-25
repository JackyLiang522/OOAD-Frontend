<template>
  <el-page-header title="返回" @back="$router.push('/teacher/overview/list')">
    <template #breadcrumb>
      <el-breadcrumb :separator-icon="ArrowRight()">
        <el-breadcrumb-item to="/teacher/overview/list">
          课程列表
        </el-breadcrumb-item>
        <el-breadcrumb-item>课程通知</el-breadcrumb-item>
      </el-breadcrumb>
    </template>
    <template #content>
      <span class="text-large font-600 mr-3"> 高等数学 </span>
    </template>
  </el-page-header>
  <el-divider/>

  <div style="display: flex;justify-content: center;">
    <el-card class="box-card" style="height: 100%; width:50%">
      <div slot="header" class="clearfix" style="margin-bottom: 10px">
        <h3>发布通知</h3>
      </div>
      <div style="display: flex;justify-content: center;">
        <div></div>
      </div>
      <div style="display: flex;justify-content: center;">
        <el-form :model="form" label-width="120px">
          <el-form-item label="主题">
            <el-input v-model="form.subject"/>
          </el-form-item>
          <el-form-item label="通知内容">
            <el-input v-model="form.message" type="textarea"/>
          </el-form-item>
          <el-form-item label="同时发送邮件">
            <el-radio-group v-model="form.email">
              <el-radio label="是"/>
              <el-radio label="否"/>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>

    </el-card>
  </div>

  <div  style="margin:40px 0 20px 30px">
    <span >
      <span style="vertical-align: 40%">历史通知</span><el-icon size="30px" style="margin-left: 5px"><Clock/></el-icon>
    </span>

  </div>
  <div>
  <el-timeline>
    <el-timeline-item center timestamp="2018/4/12" placement="top">
      <el-card shadow="never">
        <h4>后端作业已发布</h4>
        <p>同学们好，
          后端作业已发布，线下检查安排如下： 对于第二次后端作业，我们只支持在上机课时间线下检查，如果提前做好了，可找老师或SA现场检查并记分数。为了平衡检查资源，我们给同学们两次检查机会： 第一次线下检查后会给个分数并记录，如果觉得不是很理想，可以回去修改 第二次线下检查就确定了本次作业的最终分数。
          提交安排： 第二次作业检查之后，需要将源代码提交sakai，但是对于检查环节，我们只支持上机课时间线下检查。</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item center timestamp="2018/4/3" placement="top">
      <el-card shadow="never">
        <h4>第一次作业成绩发布通知</h4>
        <p>同学们好，
          第一次作业已发布，请大家在assignment模块查看。对应SA名单如下，后续作业批改SA依旧不变，如若有疑问，请本周内（建议上机课时间）咨询指定SA.</p>
      </el-card>
    </el-timeline-item>
  </el-timeline>
  </div>
</template>

<script lang="ts">
import {ArrowRight} from "@element-plus/icons-vue";
import {reactive} from 'vue'


export default {
  name: "Announcement",
  data() {
    return {
      form: reactive({
        subject: '样例主题',
        message: '信息内容',
        email: false,
      })
    }
  },
  methods: {
    ArrowRight() {
      return ArrowRight
    },
    onSubmit() {
      console.log('submit!')
    }

  },
}
</script>

<style scoped>

</style>