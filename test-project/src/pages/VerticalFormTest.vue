<template>
  <div class="page-container">
    <a-page-header
      title="垂直布局测试"
      subtitle="测试垂直布局下的表单显示和功能"
      @back="goBack"
    />

    <div class="content">
      <!-- 垂直布局表单测试 -->
      <a-card title="垂直布局表单测试" :bordered="false">
        <CustomForm
          :model="form.model"
          :rules="form.rules"
          layout="vertical"
          submitText="垂直提交"
          @finish="handleSubmit"
          @finishFailed="handleFailed"
          ref="verticalFormRef"
        >
          <a-form-item name="username" label="用户名" :rules="form.rules.username">
            <a-input v-model:value="form.model.username" placeholder="请输入用户名" />
          </a-form-item>

          <a-form-item name="password" label="密码" :rules="form.rules.password">
            <a-input-password v-model:value="form.model.password" placeholder="请输入密码" />
          </a-form-item>

          <a-form-item name="confirmPassword" label="确认密码" :rules="confirmPasswordRules">
            <a-input-password v-model:value="form.model.confirmPassword" placeholder="请再次输入密码" />
          </a-form-item>

          <a-form-item name="userType" label="用户类型" :rules="form.rules.userType">
            <a-select v-model:value="form.model.userType" placeholder="请选择用户类型">
              <a-select-option value="personal">个人用户</a-select-option>
              <a-select-option value="business">企业用户</a-select-option>
              <a-select-option value="admin">管理员</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item name="bio" label="个人简介">
            <a-textarea 
              v-model:value="form.model.bio" 
              placeholder="请输入个人简介（可选）"
              :rows="4"
              :maxlength="200"
              show-count
            />
          </a-form-item>

          <a-form-item name="agreement" :rules="form.rules.agreement">
            <a-checkbox v-model:checked="form.model.agreement">
              我已阅读并同意<a href="#" @click.prevent>《用户协议》</a>
            </a-checkbox>
          </a-form-item>

          <template #actions-left>
            <a-button @click="handleReset">重置</a-button>
            <a-button @click="toggleLoading">切换加载状态</a-button>
          </template>
          
          <template #actions-right>
            <a-button @click="fillDemoData">填充示例数据</a-button>
            <a-button type="primary" html-type="submit" :loading="loading">注册账号</a-button>
          </template>
        </CustomForm>
      </a-card>

      <!-- 布局对比 -->
      <a-card title="布局对比测试" :bordered="false">
        <a-tabs v-model:activeKey="activeLayout">
          <a-tab-pane key="vertical" tab="垂直布局">
            <CustomForm
              :model="compareModel"
              :rules="compareRules"
              layout="vertical"
              :showActions="false"
            >
              <a-form-item name="field1" label="字段1">
                <a-input v-model:value="compareModel.field1" placeholder="垂直布局字段1" />
              </a-form-item>
              <a-form-item name="field2" label="字段2">
                <a-input v-model:value="compareModel.field2" placeholder="垂直布局字段2" />
              </a-form-item>
            </CustomForm>
          </a-tab-pane>
          
          <a-tab-pane key="horizontal" tab="水平布局">
            <CustomForm
              :model="compareModel"
              :rules="compareRules"
              layout="horizontal"
              :showActions="false"
            >
              <a-form-item name="field1" label="字段1">
                <a-input v-model:value="compareModel.field1" placeholder="水平布局字段1" />
              </a-form-item>
              <a-form-item name="field2" label="字段2">
                <a-input v-model:value="compareModel.field2" placeholder="水平布局字段2" />
              </a-form-item>
            </CustomForm>
          </a-tab-pane>
        </a-tabs>
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
const verticalFormRef = ref()

// 主要表单数据
const form = reactive({
  loading: false,
  model: {
    username: '',
    password: '',
    confirmPassword: '',
    userType: undefined,
    bio: '',
    agreement: false
  },
  rules: {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' },
      { pattern: /^\w+$/, message: '用户名只能包含字母、数字和下划线', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
    ],
    userType: [
      { required: true, message: '请选择用户类型', trigger: 'change' }
    ],
    agreement: [
      { 
        validator: (_, value) => {
          if (!value) {
            return Promise.reject(new Error('请同意用户协议'))
          }
          return Promise.resolve()
        },
        trigger: 'change'
      }
    ]
  }
})

// 计算属性定义确认密码规则
const confirmPasswordRules = computed(() => ([
  { required: true, message: '请确认密码', trigger: 'blur' },
  {
    validator: (_, value) => {
      if (value !== form.model.password) {
        return Promise.reject(new Error('两次输入的密码不一致'))
      }
      return Promise.resolve()
    },
    trigger: 'blur'
  }
]))

// 布局对比相关数据
const activeLayout = ref('vertical')
const compareModel = reactive({
  field1: '',
  field2: ''
})

const compareRules = {
  field1: [{ required: true, message: '请输入字段1', trigger: 'blur' }],
  field2: [{ required: true, message: '请输入字段2', trigger: 'blur' }]
}

const loading = computed(() => form.loading)

// 事件处理函数
const handleSubmit = async (values) => {
  console.log('垂直表单提交:', values)
  form.loading = true
  
  // 模拟异步提交
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  form.loading = false
  message.success('注册成功！欢迎加入我们！')
}

const handleFailed = (errorInfo) => {
  console.log('垂直表单验证失败:', errorInfo)
  message.error('表单验证失败，请检查输入内容！')
}

const handleReset = () => {
  verticalFormRef.value?.resetFields()
  message.info('表单已重置')
}

const toggleLoading = () => {
  form.loading = !form.loading
  message.info(form.loading ? '已开启加载状态' : '已关闭加载状态')
}

const fillDemoData = () => {
  form.model.username = 'demo_user'
  form.model.password = '123456'
  form.model.confirmPassword = '123456'
  form.model.userType = 'personal'
  form.model.bio = '这是一个演示用户的个人简介。'
  form.model.agreement = true
  message.info('示例数据已填充')
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