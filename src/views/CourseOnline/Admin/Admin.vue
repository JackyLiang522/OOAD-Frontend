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
      <el-table-column prop="name" label="课程名字" width="100px"/>
      <el-table-column prop="intro" label="课程简介" width="350px"/>
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
    </el-table>
  </div>
</template>

<script>
import {reactive} from "vue";

export default {
  name: "Admin",
  setup() {
    const table_data = reactive([
      {
        name: 'Java',
        intro: 'This is hava not jvav.',
        price: 1.11,
        cover: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }, {
        name: 'Java',
        intro: 'This is hava not jvav.',
        price: 1.11,
        cover: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }, {
        name: 'Java',
        intro: 'This is hava not jvav.',
        price: 1.11,
        cover: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }, {
        name: 'Java',
        intro: 'This is hava not jvav.',
        price: 1.11,
        cover: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }, {
        name: 'Java',
        intro: 'This is hava not jvav.',
        price: 1.11,
        cover: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }, {
        name: 'Java',
        intro: 'This is hava not jvav.',
        price: 1.11,
        cover: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }, {
        name: 'Java',
        intro: 'This is hava not jvav.',
        price: 1.11,
        cover: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
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