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
        <div class="cell-item">
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
            <TurnOff />
          </el-icon>
          是否多选
        </div>
      </template>
      {{multiple}}
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
    <el-descriptions-item
        v-for= "(option, index) in options">
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <Expand />
          </el-icon>
         选项 {{index+1}}
        </div>
      </template>
      {{option.value}}
    </el-descriptions-item>
  </el-descriptions>

</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Tickets,
  TurnOff,
  Finished,
  Expand
} from '@element-plus/icons-vue'

const prop = defineProps(['title','description','multiple','answers','options'])
//
// const tags = ref([
//   { name: '选项 1'},
//   { name: '选项 2' },
//   { name: '选项 3' },
// ])
const size = ref('')
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
}
.margin-top {
  margin-top: 20px;
}
</style>
