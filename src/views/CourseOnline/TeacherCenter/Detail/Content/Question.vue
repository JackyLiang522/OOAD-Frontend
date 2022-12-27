<template>
  <el-card class="box-card">
    <el-form
        ref="formRef"
        :model="form"
        label-width="120px"
        class="demo-dynamic"
    >
      <el-form-item label="题目描述"
                    :rules="{
        required: true,
        message: '题目描述不能为空',
        trigger: 'blur',
      }">
        <el-input v-model="form.description" />
      </el-form-item>
      <el-form-item label="是否多选">
        <el-switch v-model="form.multiple" />
      </el-form-item>
      <el-form-item label="正确选项">
        <el-checkbox-group v-model="form.answers">
          <el-checkbox v-for="(domain, index) in form.options"
                       :key="domain.key" :label="'选项 ' + (index+1)" name="type" />
        </el-checkbox-group>
      </el-form-item>

      <el-form-item
          v-for="(domain, index) in form.options"
          :key="domain.key"
          :label="'选项 ' + (index+1)"
          :rules="{
        required: true,
        message: 'domain can not be null',
        trigger: 'blur',
      }"
      >
        <el-input v-model="domain.value" />
        <el-button class="mt-2" @click.prevent="removeDomain(domain)"
        >删除</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button @click="addDomain">增加选项</el-button>
        <el-button type="primary" @click="submitForm(formRef)">添加问题</el-button>
      </el-form-item>
    </el-form>
  </el-card>

</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'


const formRef = ref<FormInstance>()
const form = reactive({
  description: '',
  multiple: true,
  answers: [],
  options: [
    {
      key: 1,
      value: '',
    },
  ],
})

interface OptionItem {
  key: number
  value: string
}

const removeDomain = (item: OptionItem) => {
  const index = form.options.indexOf(item)
  if (index !== -1) {
    form.options.splice(index, 1)
  }
}

const addDomain = () => {
  form.options.push({
    key: Date.now(),
    value: '',
  })
}
const emit = defineEmits(['add-question'])
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
      emit('add-question', form.description,form.multiple,form.answers,form.options)
      form.description = ''
      form.multiple = true
      form.answers = []
      form.options =  [
        {
          key: 1,
          value: '',
        },
      ]
    } else {
      console.log('error submit!')
      return false
    }
  })
}

</script>

<style scoped>

</style>