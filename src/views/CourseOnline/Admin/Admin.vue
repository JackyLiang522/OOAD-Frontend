<template>
  <div style="display: flex;justify-content: center">
    <el-table
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
        <template v-slot="scope">
          <el-button
              type="success"
              size="small"
              @click="handlePass(scope.row)"
              round>
              通过
          </el-button>
          <el-button
              type="danger"
              size="small"
              @click="handleReject(scope.row)"
              round>
              拒绝
          </el-button>
        </template>
      </el-table-column>
    </el-table>
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