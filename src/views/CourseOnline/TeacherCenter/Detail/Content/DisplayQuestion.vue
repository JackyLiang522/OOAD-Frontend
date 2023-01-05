<template>
  <el-descriptions
      class="margin-top"
      :title=title
      :column="3"
      :size="size"
      border
  >
    <el-descriptions-item>
      <template #label>
        <div class="cell-item" style="width: 80px">
          <el-icon :style="iconStyle">
            <tickets />
          </el-icon>
          题目描述
        </div>
      </template>
      {{description}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <Operation />
          </el-icon>
          题目类型
        </div>
      </template>
      {{type}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <Finished />
          </el-icon>
          正确选项
        </div>
      </template>
      <el-tag
          v-for="tag in answers"
          :key="tag"
          class="ml-2"
          type='success'
      >
        {{ tag }}
      </el-tag>
    </el-descriptions-item>
    <el-descriptions-item min-width="25%"
        v-for= "(option, index) in options">
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <Expand />
          </el-icon>
         选项 {{index+1}}
        </div>
      </template>
      <div style="width: 120px">{{option.value}}</div>

    </el-descriptions-item>
  </el-descriptions>

</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Tickets,
  Operation,
  Finished,
  Expand
} from '@element-plus/icons-vue'

const prop = defineProps(['title','description','type','answers','options'])
//
// const tags = ref([
//   { name: '选项 1'},
//   { name: '选项 2' },
//   { name: '选项 3' },
// ])
const size = ref('default')
const iconStyle = computed(() => {
  const marginMap = {
    large: '8px',
    default: '6px',
    small: '4px',
  }
  return {
    marginRight:  marginMap.default,
  }
})
</script>

<style scoped>
.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
  width: 80px
}
.margin-top {
  margin-top: 20px;
}
</style>
