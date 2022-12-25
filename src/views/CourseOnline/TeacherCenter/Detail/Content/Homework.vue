<template>
  <h4 style="margin: 0 0 0 0">{{ `第${chapterInfo.number}章` }}</h4>
  <p>{{ chapterInfo.title }}</p>

  <div style="display: flex;justify-content: center">
    <el-table
        :data="table_data"
        border
        style="width: 700px;margin:0 20px 0 20px;"
        height="250px"
        stripe
    >
      <el-table-column prop="title" label="作业标题" width="200px"/>
      <el-table-column prop="deadline" label="截止日期" width="350px"/>
      <el-table-column label="编辑" width="150px"/>
    </el-table>
  </div>
</template>

<script lang="ts">
import {reactive} from "vue";

export default {
  name: "Homework",
  props: ['chapterInfo'],
  setup() {
    const table_data = reactive([
      {
        title: '标题1',
        deadline: '这里表示DDL'
      }, {
        title: 'TITLE2',
        deadline: '后端随便存什么格式都可以'
      }, {
        title: 'title3',
        deadline: '只要以字符串形式返回就行'
      }, {
        title: '如果表格很长',
        deadline: '会自动出现滚动条'
      }, {
        title: '如果表格很长',
        deadline: '会自动出现滚动条'
      }, {
        title: '如果表格很长',
        deadline: '会自动出现滚动条'
      }, {
        title: '如果表格很长',
        deadline: '会自动出现滚动条'
      }, {
        title: '如果表格很长',
        deadline: '会自动出现滚动条'
      }, {
        title: '如果表格很长',
        deadline: '会自动出现滚动条'
      }, {
        title: '如果表格很长',
        deadline: '会自动出现滚动条'
      }, {
        title: '如果表格很长',
        deadline: '会自动出现滚动条'
      }
    ])

    return {
      table_data
    }
  }
}
</script>

<style scoped>

</style>