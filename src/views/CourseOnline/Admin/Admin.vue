<template>
  <div style="display: flex;justify-content: center">
    <!-- <el-table
        :data="table_data"
        border
        style="width: 700px;margin:20px 20px 0 20px;"
        stripe
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
    >
      <el-table-column prop="courseName" label="课程名字" width="100px"/>
      <el-table-column prop="introduction" label="课程简介" width="350px"/>
      <el-table-column prop="price" label="课程价格" width="100px"/>
      <el-table-column label="审核" width="150px">
        <el-button
            type="success"
            size="small" round>
          通过
        </el-button>
        <el-button
            type="danger"
            size="small" round>
          拒绝
        </el-button>
      </el-table-column>
    </el-table> -->
    
    <table border="1" style="width: 700px;margin:20px 20px 0 20px;">
    <thead>
      <tr>
        <th style="text-align:center">课程名字</th>
        <th style="text-align:center">课程简介</th>
        <th style="text-align:center">课程价格</th>
        <th style="text-align:center">审核</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in table_data" :key="row.courseName">
        <td style="text-align:center">{{ row.courseName }}</td>
        <td style="text-align:center">{{ row.introduction }}</td>
        <td style="text-align:center">{{ row.price }}</td>
        <td style="text-align:center">
          <el-button type="success" size="small" round @click="handlePass(row)">通过</el-button>
          <el-button type="danger" size="small" round @click="handleReject(row)">拒绝</el-button>
        </td>
      </tr>
    </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store";
import {ElMessage} from 'element-plus'

export default {
  name: "Admin",
  data() {
    return {
      table_data: []
    }
  },
  methods: {
    handlePass(row) {
      axios.post(`http://${store.state.host}/api/course/update_status?courseId=${row.id}&status=1`).then((response) => {
        ElMessage.success({
          message: '操作成功',
          type: 'success',
          duration: 2000,
        })
      })
      axios.get(`http://${store.state.host}/api/course/list_under_review`).then((response) => {
        this.table_data = response.data
      })
    },
    handleReject(row) {
      axios.post(`http://${store.state.host}/api/course/update_status?courseId=${row.id}&status=2`).then((response) => {
        ElMessage.success({
          message: '操作成功',
          type: 'success',
          duration: 2000,
        })
      })
      axios.get(`http://${store.state.host}/api/course/list_under_review`).then((response) => {
        this.table_data = response.data
      })
    }
  },
  async created() {
    axios.get(`http://${store.state.host}/api/course/list_under_review`).then((response) => {
      this.table_data = response.data
    })
  }
}
</script>

<style scoped>

</style>