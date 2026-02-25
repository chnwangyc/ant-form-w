<template>
  <div id="app">
    <header class="app-header">
      <h1>🧪 Ant Form W - Local Test Project</h1>
      <p>Testing the ant-form-w npm package locally</p>
    </header>

    <main class="app-main">
      <!-- 基础表单测试 -->
      <section class="test-section">
        <h2>1. Basic Form Test</h2>
        <CustomForm
          :model="basicForm.model"
          :rules="basicForm.rules"
          layout="horizontal"
          @finish="handleBasicSubmit"
          @finishFailed="handleBasicFailed"
          @valuesChange="handleValuesChange"
        >
          <a-form-item name="name" label="姓名" :rules="[{ required: true, message: '请输入姓名' }]">
            <a-input v-model:value="basicForm.model.name" placeholder="请输入姓名" />
          </a-form-item>

          <a-form-item name="email" label="邮箱" :rules="[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入有效的邮箱地址' }]">
            <a-input v-model:value="basicForm.model.email" placeholder="请输入邮箱" />
          </a-form-item>

          <a-form-item name="age" label="年龄" :rules="[{ required: true, message: '请输入年龄' }, { type: 'number', min: 1, max: 120, message: '年龄必须在1-120之间' }]">
            <a-input-number v-model:value="basicForm.model.age" :min="1" :max="120" style="width: 100%" />
          </a-form-item>

          <template #actions-left>
            <a-button @click="handleReset">重置</a-button>
          </template>
        </CustomForm>
      </section>

      <!-- 垂直布局测试 -->
      <section class="test-section">
        <h2>2. Vertical Layout Test</h2>
        <CustomForm
          :model="verticalForm.model"
          :rules="verticalForm.rules"
          layout="vertical"
          submitText="垂直提交"
          @finish="handleVerticalSubmit"
        >
          <a-form-item name="username" label="用户名" :rules="[{ required: true, message: '请输入用户名' }]">
            <a-input v-model:value="verticalForm.model.username" placeholder="请输入用户名" />
          </a-form-item>

          <a-form-item name="password" label="密码" :rules="[{ required: true, message: '请输入密码' }]">
            <a-input-password v-model:value="verticalForm.model.password" placeholder="请输入密码" />
          </a-form-item>

          <a-form-item name="confirmPassword" label="确认密码" :rules="[{ required: true, message: '请确认密码' }]">
            <a-input-password v-model:value="verticalForm.model.confirmPassword" placeholder="请再次输入密码" />
          </a-form-item>
        </CustomForm>
      </section>

      <!-- 复杂表单测试 -->
      <section class="test-section">
        <h2>3. Complex Form Test</h2>
        <CustomForm
          :model="complexForm.model"
          :rules="complexForm.rules"
          layout="horizontal"
          :loading="complexForm.loading"
          @finish="handleComplexSubmit"
          ref="complexFormRef"
        >
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item name="firstName" label="名字" :rules="[{ required: true, message: '请输入名字' }]">
                <a-input v-model:value="complexForm.model.firstName" placeholder="请输入名字" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item name="lastName" label="姓氏" :rules="[{ required: true, message: '请输入姓氏' }]">
                <a-input v-model:value="complexForm.model.lastName" placeholder="请输入姓氏" />
              </a-form-item>
            </a-col>
          </a-row>

          <a-form-item name="gender" label="性别" :rules="[{ required: true, message: '请选择性别' }]">
            <a-radio-group v-model:value="complexForm.model.gender">
              <a-radio value="male">男</a-radio>
              <a-radio value="female">女</a-radio>
            </a-radio-group>
          </a-form-item>

          <a-form-item name="birthDate" label="出生日期">
            <a-date-picker 
              v-model:value="complexForm.model.birthDate"
              style="width: 100%"
              placeholder="请选择出生日期"
            />
          </a-form-item>

          <a-form-item name="interests" label="兴趣爱好">
            <a-checkbox-group v-model:value="complexForm.model.interests">
              <a-checkbox value="reading">阅读</a-checkbox>
              <a-checkbox value="music">音乐</a-checkbox>
              <a-checkbox value="sports">运动</a-checkbox>
              <a-checkbox value="travel">旅行</a-checkbox>
            </a-checkbox-group>
          </a-form-item>

          <template #actions-right>
            <a-button @click="validateSingleField">验证姓名</a-button>
            <a-button @click="showFormData">查看数据</a-button>
          </template>
        </CustomForm>
      </section>

      <!-- 测试结果展示 -->
      <section class="test-section" v-if="testResults.length > 0">
        <h2>Test Results</h2>
        <a-card>
          <pre>{{ JSON.stringify(testResults, null, 2) }}</pre>
        </a-card>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { message, Card, Button } from 'ant-design-vue'
import { CustomForm } from 'ant-form-w'

// 基础表单测试数据
const basicForm = reactive({
  model: {
    name: '',
    email: '',
    age: undefined
  },
  rules: {
    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    email: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
    ],
    age: [
      { required: true, message: '请输入年龄', trigger: 'blur' },
      { type: 'number', min: 1, max: 120, message: '年龄必须在1-120之间', trigger: 'blur' }
    ]
  }
})

// 垂直布局表单
const verticalForm = reactive({
  model: {
    username: '',
    password: '',
    confirmPassword: ''
  },
  rules: {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    confirmPassword: [{ required: true, message: '请确认密码', trigger: 'blur' }]
  }
})

// 复杂表单
const complexFormRef = ref()
const complexForm = reactive({
  loading: false,
  model: {
    firstName: '',
    lastName: '',
    gender: undefined,
    birthDate: null,
    interests: []
  },
  rules: {
    firstName: [{ required: true, message: '请输入名字', trigger: 'blur' }],
    lastName: [{ required: true, message: '请输入姓氏', trigger: 'blur' }],
    gender: [{ required: true, message: '请选择性别', trigger: 'change' }]
  }
})

// 测试结果
const testResults = ref([])

// 事件处理函数
const handleBasicSubmit = (values) => {
  console.log('Basic form submitted:', values)
  testResults.value.push({
    test: 'Basic Form Submit',
    timestamp: new Date().toISOString(),
    data: values
  })
  message.success('基础表单提交成功！')
}

const handleBasicFailed = (errorInfo) => {
  console.log('Basic form failed:', errorInfo)
  message.error('基础表单验证失败！')
}

const handleVerticalSubmit = (values) => {
  console.log('Vertical form submitted:', values)
  testResults.value.push({
    test: 'Vertical Form Submit',
    timestamp: new Date().toISOString(),
    data: values
  })
  message.success('垂直表单提交成功！')
}

const handleComplexSubmit = async (values) => {
  console.log('Complex form submitted:', values)
  complexForm.loading = true
  
  // 模拟异步提交
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  testResults.value.push({
    test: 'Complex Form Submit',
    timestamp: new Date().toISOString(),
    data: values
  })
  
  complexForm.loading = false
  message.success('复杂表单提交成功！')
}

const handleValuesChange = (changedValues, allValues) => {
  console.log('Values changed:', { changedValues, allValues })
}

const handleReset = () => {
  basicForm.model = {
    name: '',
    email: '',
    age: undefined
  }
  message.info('表单已重置')
}

const validateSingleField = async () => {
  const result = await complexFormRef.value?.validateField('firstName')
  console.log('Single field validation:', result)
  message.info('已验证姓名字段')
}

const showFormData = () => {
  const data = complexFormRef.value?.getValues()
  console.log('Current form data:', data)
  message.info('请查看控制台输出的表单数据')
}
</script>

<style scoped>
#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.app-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
}

.app-header h1 {
  margin: 0 0 10px 0;
  font-size: 2rem;
}

.app-header p {
  margin: 0;
  opacity: 0.9;
}

.app-main {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.test-section {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.test-section h2 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 1.5rem;
  border-bottom: 2px solid #1890ff;
  padding-bottom: 10px;
}

pre {
  background: #f5f5f5;
  padding: 16px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 12px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  #app {
    padding: 10px;
  }
  
  .test-section {
    padding: 20px;
  }
  
  .app-header h1 {
    font-size: 1.5rem;
  }
}
</style>