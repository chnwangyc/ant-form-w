<template>
  <div class="page-container">
    <a-page-header
      title="基础表单测试"
      subtitle="测试基本的表单功能和验证规则"
      @back="goBack"
    />

    <div class="content">
      <!-- 基础表单测试 -->
      <a-card title="基础表单功能测试" :bordered="false">
        <CustomForm
          :model="form.model"
          :rules="form.rules"
          layout="horizontal"
          @finish="handleSubmit"
          @finishFailed="handleFailed"
          @valuesChange="handleValuesChange"
          ref="basicFormRef"
        >
          <a-form-item name="name" label="姓名" :rules="[{ required: true, message: '请输入姓名' }]">
            <a-input v-model:value="form.model.name" placeholder="请输入姓名" />
          </a-form-item>

          <a-form-item name="email" label="邮箱" :rules="emailRules">
            <a-input v-model:value="form.model.email" placeholder="请输入邮箱" />
          </a-form-item>

          <a-form-item name="age" label="年龄" :rules="ageRules">
            <a-input-number v-model:value="form.model.age" :min="1" :max="120" style="width: 100%" />
          </a-form-item>

          <a-form-item name="phone" label="手机号" :rules="phoneRules">
            <a-input v-model:value="form.model.phone" placeholder="请输入手机号" />
          </a-form-item>

          <a-form-item name="website" label="个人网站">
            <a-input v-model:value="form.model.website" placeholder="请输入网址" />
          </a-form-item>

          <template #actions-left>
            <a-button @click="handleReset">重置表单</a-button>
            <a-button @click="validateSingleField('name')">验证姓名</a-button>
          </template>
          
          <template #actions-right>
            <a-button @click="showFormData">查看数据</a-button>
            <a-button type="primary" html-type="submit">提交</a-button>
          </template>
        </CustomForm>
      </a-card>

      <!-- 测试结果展示 -->
      <a-card title="测试结果" :bordered="false" v-if="testResults.length > 0">
        <a-timeline>
          <a-timeline-item 
            v-for="(result, index) in testResults" 
            :key="index"
            :color="result.type === 'success' ? 'green' : 'red'"
          >
            <template #dot>
              <span class="timeline-icon">{{ result.type === 'success' ? '✅' : '❌' }}</span>
            </template>
            <div class="timeline-content">
              <p class="timeline-title">{{ result.action }} - {{ result.time }}</p>
              <pre v-if="result.data">{{ JSON.stringify(result.data, null, 2) }}</pre>
            </div>
          </a-timeline-item>
        </a-timeline>
        
        <a-button @click="clearResults" style="margin-top: 16px">清空结果</a-button>
      </a-card>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { CustomForm } from 'ant-form-w'

const router = useRouter()
const basicFormRef = ref()

// 表单数据
const form = reactive({
  model: {
    name: '',
    email: '',
    age: undefined,
    phone: '',
    website: ''
  },
  rules: {
    name: [
      { required: true, message: '请输入姓名', trigger: 'blur' },
      { min: 2, max: 10, message: '姓名长度在 2 到 10 个字符', trigger: 'blur' }
    ]
  }
})

// 计算属性定义验证规则
const emailRules = computed(() => ([
  { required: true, message: '请输入邮箱', trigger: 'blur' },
  { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
]))

const ageRules = computed(() => ([
  { required: true, message: '请输入年龄', trigger: 'blur' },
  { type: 'number', min: 1, max: 120, message: '年龄必须在1-120之间', trigger: 'blur' }
]))

const phoneRules = computed(() => ([
  { required: true, message: '请输入手机号', trigger: 'blur' },
  { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
]))

// 测试结果
const testResults = ref([])

// 添加测试结果
const addResult = (action, type, data = null) => {
  testResults.value.unshift({
    action,
    type,
    data,
    time: new Date().toLocaleTimeString()
  })
}

// 事件处理函数
const handleSubmit = (values) => {
  console.log('基础表单提交:', values)
  addResult('表单提交', 'success', values)
  message.success('基础表单提交成功！')
}

const handleFailed = (errorInfo) => {
  console.log('基础表单验证失败:', errorInfo)
  addResult('表单验证失败', 'error', errorInfo)
  message.error('表单验证失败，请检查输入内容！')
}

const handleValuesChange = (changedValues, allValues) => {
  console.log('值变化:', { changedValues, allValues })
}

const handleReset = () => {
  basicFormRef.value?.resetFields()
  addResult('重置表单', 'success')
  message.info('表单已重置')
}

const validateSingleField = async (fieldName) => {
  try {
    await basicFormRef.value?.validateField(fieldName)
    message.success(`${fieldName} 字段验证通过`)
    addResult(`${fieldName}字段验证`, 'success')
  } catch (error) {
    message.error(`${fieldName} 字段验证失败`)
    addResult(`${fieldName}字段验证`, 'error')
  }
}

const showFormData = () => {
  const data = basicFormRef.value?.getValues()
  console.log('当前表单数据:', data)
  addResult('查看表单数据', 'success', data)
  message.info('请查看控制台输出的表单数据')
}

const clearResults = () => {
  testResults.value = []
  message.info('测试结果已清空')
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.page-container {
  padding: 24px;
  max-width: 1000px;
  margin: 0 auto;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.timeline-content .timeline-title {
  margin: 0 0 8px 0;
  font-weight: 500;
}

.timeline-content pre {
  background: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  font-size: 12px;
  margin: 8px 0 0 0;
}

.timeline-icon {
  font-size: 16px;
}

@media (max-width: 768px) {
  .page-container {
    padding: 16px;
  }
}
</style>