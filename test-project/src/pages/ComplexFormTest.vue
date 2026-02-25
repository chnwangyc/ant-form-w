<template>
  <div class="page-container">
    <a-page-header
      title="复杂表单测试"
      subtitle="测试复杂场景下的表单功能，包括栅格布局、多种控件类型等"
      @back="goBack"
    />

    <div class="content">
      <!-- 复杂表单测试 -->
      <a-card title="个人信息表单（复杂布局）" :bordered="false">
        <CustomForm
          :model="form.model"
          :rules="form.rules"
          layout="horizontal"
          :loading="form.loading"
          @finish="handleSubmit"
          @finishFailed="handleFailed"
          @valuesChange="handleValuesChange"
          ref="complexFormRef"
        >
          <!-- 基本信息行 -->
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item name="firstName" label="名字" :rules="form.rules.firstName">
                <a-input v-model:value="form.model.firstName" placeholder="请输入名字" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item name="lastName" label="姓氏" :rules="form.rules.lastName">
                <a-input v-model:value="form.model.lastName" placeholder="请输入姓氏" />
              </a-form-item>
            </a-col>
          </a-row>

          <!-- 联系信息行 -->
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item name="email" label="邮箱" :rules="form.rules.email">
                <a-input v-model:value="form.model.email" placeholder="请输入邮箱" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item name="phone" label="电话" :rules="form.rules.phone">
                <a-input v-model:value="form.model.phone" placeholder="请输入电话号码" />
              </a-form-item>
            </a-col>
          </a-row>

          <!-- 单选框组 -->
          <a-form-item name="gender" label="性别" :rules="form.rules.gender">
            <a-radio-group v-model:value="form.model.gender">
              <a-radio value="male">男</a-radio>
              <a-radio value="female">女</a-radio>
              <a-radio value="other">其他</a-radio>
            </a-radio-group>
          </a-form-item>

          <!-- 日期和评分 -->
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item name="birthDate" label="出生日期">
                <a-date-picker 
                  v-model:value="form.model.birthDate"
                  style="width: 100%"
                  placeholder="请选择出生日期"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item name="experience" label="工作经验（年）">
                <a-slider
                  v-model:value="form.model.experience"
                  :min="0"
                  :max="30"
                  :marks="experienceMarks"
                />
              </a-form-item>
            </a-col>
          </a-row>

          <!-- 多选框组 -->
          <a-form-item name="interests" label="兴趣爱好">
            <a-checkbox-group v-model:value="form.model.interests">
              <a-row :gutter="[16, 16]">
                <a-col :span="8">
                  <a-checkbox value="reading">阅读</a-checkbox>
                </a-col>
                <a-col :span="8">
                  <a-checkbox value="music">音乐</a-checkbox>
                </a-col>
                <a-col :span="8">
                  <a-checkbox value="sports">运动</a-checkbox>
                </a-col>
                <a-col :span="8">
                  <a-checkbox value="travel">旅行</a-checkbox>
                </a-col>
                <a-col :span="8">
                  <a-checkbox value="cooking">烹饪</a-checkbox>
                </a-col>
                <a-col :span="8">
                  <a-checkbox value="photography">摄影</a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
          </a-form-item>

          <!-- 开关和评分 -->
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item name="hasExperience" label="有相关经验">
                <a-switch 
                  v-model:checked="form.model.hasExperience"
                  checked-children="有"
                  un-checked-children="无"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item name="skillLevel" label="技能等级">
                <a-rate v-model:value="form.model.skillLevel" allow-half />
              </a-form-item>
            </a-col>
          </a-row>

          <template #actions-left>
            <a-button @click="handleReset">重置</a-button>
            <a-button @click="validateSingleField('firstName')">验证姓名</a-button>
          </template>
          
          <template #actions-right>
            <a-button @click="showFormData">查看数据</a-button>
            <a-button type="primary" html-type="submit">提交申请</a-button>
          </template>
        </CustomForm>
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
const complexFormRef = ref()

// 表单数据
const form = reactive({
  loading: false,
  model: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: undefined,
    birthDate: null,
    experience: 5,
    interests: [],
    hasExperience: false,
    skillLevel: 3
  },
  rules: {
    firstName: [{ required: true, message: '请输入名字', trigger: 'blur' }],
    lastName: [{ required: true, message: '请输入姓氏', trigger: 'blur' }],
    email: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
    ],
    gender: [{ required: true, message: '请选择性别', trigger: 'change' }]
  }
})

// 工作经验滑块标记
const experienceMarks = {
  0: '0年',
  5: '5年',
  10: '10年',
  15: '15年',
  20: '20年',
  25: '25年',
  30: '30年+'
}

// 事件处理函数
const handleSubmit = async (values) => {
  console.log('复杂表单提交:', values)
  form.loading = true
  
  // 模拟异步提交
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  form.loading = false
  message.success('个人信息提交成功！')
}

const handleFailed = (errorInfo) => {
  console.log('复杂表单验证失败:', errorInfo)
  message.error('表单验证失败，请检查输入内容！')
}

const handleValuesChange = (changedValues, allValues) => {
  console.log('复杂表单值变化:', { changedValues, allValues })
}

const handleReset = () => {
  complexFormRef.value?.resetFields()
  message.info('表单已重置')
}

const validateSingleField = async (fieldName) => {
  try {
    await complexFormRef.value?.validateField(fieldName)
    message.success(`${fieldName} 字段验证通过`)
  } catch (error) {
    message.error(`${fieldName} 字段验证失败`)
  }
}

const showFormData = () => {
  const data = complexFormRef.value?.getValues()
  console.log('当前表单数据:', data)
  message.info('请查看控制台输出的表单数据')
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
</style>