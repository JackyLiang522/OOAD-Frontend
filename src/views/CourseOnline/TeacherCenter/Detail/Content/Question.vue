<template>
  <el-card class="box-card">
    <el-form
        ref="formRef"
        :model="dynamicForm"
        label-width="120px"
        class="demo-dynamic"
    >
      <el-form-item label="题目描述"
                    :rules="{
        required: true,
        message: '题目描述不能为空',
        trigger: 'blur',
      }">
        <el-input v-model="props.description" />
      </el-form-item>
      <el-form-item label="时间限制" :rules="{
        required: true,
        message: '时间限制不能为空',
        trigger: 'blur',
      }">
        <el-col :span="11">
          <el-time-picker
              v-model="props.timer"
              placeholder="请设置用时"
              style="width: 100%"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="是否多选">
        <el-switch v-model="props.multiple" />
      </el-form-item>
      <el-form-item label="正确选项">
        <el-checkbox-group v-model="props.answers">
          <el-checkbox v-for="(domain, index) in props.options"
                       :key="domain.key" :label="'选项 ' + (index+1)" name="type" />
        </el-checkbox-group>
      </el-form-item>

      <el-form-item
          v-for="(domain, index) in props.options"
          :key="domain.key"
          :label="'选项 ' + (index+1)"
          :prop="'domains.' + index + '.value'"
          :rules="{
        required: true,
        message: 'domain can not be null',
        trigger: 'blur',
      }"
      >
        <el-input v-model="domain.value" />
        <el-button class="mt-2" @click.prevent="removeDomain(domain)"
        >Delete</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button @click="addDomain">New option</el-button>
        <el-button @click="resetForm(formRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>

</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'

// const form = reactive({
//   description: '',
//   timer: '',
//   multiple: true,
//   answers: [],
// })

const props = defineProps(['options','description','timer','multiple','answers'])

const formRef = ref<FormInstance>()
const dynamicForm = reactive({
  options: [
    {
      key: 1,
      value: '',
    },
  ],
  description: '',
  timer: '',
  multiple: true,
  answers: [],
})

interface OptionItem {
  key: number
  value: string
}

const removeDomain = (item: OptionItem) => {
  const index = props.options.indexOf(item)
  if (index !== -1) {
    props.options.splice(index, 1)
  }
}

const addDomain = () => {
  props.options.push({
    key: Date.now(),
    value: '',
  })
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped>

</style>