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
        <el-input v-model="form.description"/>
      </el-form-item>
      <!--      <el-form-item label="是否多选">-->
      <!--        <el-switch v-model="form.multiple" />-->
      <!--      </el-form-item>-->
      <el-form-item label="题目类型">
        <el-radio-group v-model="form.type">
          <el-radio label="多选"/>
          <el-radio label="单选"/>
          <el-radio label="判断"/>
        </el-radio-group>
      </el-form-item>
<!--      <div v-if="!isJudge">-->
        <el-form-item label="正确选项">
          <el-checkbox-group v-model="form.answers">
            <el-checkbox v-for="(domain, index) in form.options"
                         :key="domain.key" :label="'选项 ' + (index+1)" name="type"/>
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
          <el-input v-model="domain.value"/>
          <el-button class="mt-2" @click.prevent="removeDomain(domain)"
          >删除
          </el-button
          >
        </el-form-item>
<!--      </div>-->
<!--      <div v-else>-->
<!--      </div>-->
      <el-form-item>
        <el-button @click="addDomain">增加选项</el-button>
        <el-button type="primary" @click="submitForm(formRef)">添加问题</el-button>
      </el-form-item>
    </el-form>
  </el-card>

</template>

<script lang="ts" setup>
import {computed, reactive, ref, watch} from 'vue'
import type {FormInstance} from 'element-plus'
import {ElMessage} from 'element-plus'

const props = defineProps(['chapterInfo'])
const chapterId = computed(() => props.chapterInfo.id)
// chapterId.value
const formRef = ref<FormInstance>()
const form = reactive({
  description: '',
  type: '',
  answers: [],
  options: [
    {
      key: 1,
      value: '',
    },
    {
      key: 2,
      value: '',
    },
  ]
})
const isJudge = computed(() => form.type == '判断')
const type = computed(() => form.type)
watch(
    type,
    (type) => {
      if (type=='判断') {
        form.options = [{
          key: 1,
          value: '对',
        }, {
          key: 2,
          value: '错',
        }];
        console.log("isJudge")
      } else {
        if (type == '单选') {
          form.options = [
            {
              key: 1,
              value: '',
            },
            {
              key: 2,
              value: '',
            },
          ];
        } else {
          form.options = [
            {
              key: 1,
              value: '',
            },
            {
              key: 2,
              value: '',
            },
          ];
        }
        console.log("isNotJudge")

      }
    }
)

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
  if (!form.description || !form.type || form.answers.length == 0 || form.options.length == 0) {
    ElMessage({
      message: '请输入所有信息',
      type: 'warning',
    });
    return;
  }
  for (let i = 0; i < form.options.length; i++) {
    if (!form.options[i].value) {
      ElMessage({
        message: '请输入选项内容',
        type: 'warning',
      });
      return;
    }
  }
  if (form.type == '多选') {
    if (form.answers.length <= 1) {
      ElMessage({
        message: '多选题需设置至少2个正确选项',
        type: 'warning',
      });
      return
    }
  } else if (form.type == '单选') {
    if (form.answers.length > 1 || form.answers.length == 0) {
      ElMessage({
        message: '单选题需设置1个正确选项',
        type: 'warning',
      });
      return
    }
  } else {
    if (form.answers.length > 1 || form.answers.length == 0) {
      ElMessage({
        message: '判断题需设置1个正确选项',
        type: 'warning',
      });
      return
    }
  }


  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
      emit('add-question', form.description, form.type, form.answers, form.options)
      form.description = ''
      form.type = ''
      form.answers = []
      form.options = [
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