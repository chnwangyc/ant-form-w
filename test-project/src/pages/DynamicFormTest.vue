<template>
  <div class="page-container">
    <a-page-header
      title="动态表单测试"
      subtitle="测试动态添加/删除表单项的功能"
      @back="goBack"
    />

    <div class="content">
      <!-- 动态表单测试 -->
      <a-card title="动态字段管理" :bordered="false">
        <CustomForm
          :model="form.model"
          :rules="form.rules"
          layout="horizontal"
          @finish="handleSubmit"
          @finishFailed="handleFailed"
          ref="dynamicFormRef"
        >
          <!-- 静态字段 -->
          <a-form-item name="projectName" label="项目名称" :rules="form.rules.projectName">
            <a-input v-model:value="form.model.projectName" placeholder="请输入项目名称" />
          </a-form-item>

          <!-- 动态字段列表 -->
          <div class="dynamic-fields-section">
            <div class="section-header">
              <h3>团队成员</h3>
              <a-button type="dashed" @click="addMember" icon="plus">
                添加成员
              </a-button>
            </div>

            <div 
              v-for="(member, index) in form.model.members" 
              :key="member.id"
              class="dynamic-field-item"
            >
              <a-row :gutter="16" align="middle">
                <a-col :span="8">
                  <a-form-item
                    :name="['members', index, 'name']"
                    :label="`成员${index + 1}姓名`"
                    :rules="memberNameRules"
                  >
                    <a-input 
                      v-model:value="member.name" 
                      placeholder="请输入姓名"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="6">
                  <a-form-item
                    :name="['members', index, 'role']"
                    :label="`角色`"
                  >
                    <a-select v-model:value="member.role" placeholder="选择角色">
                      <a-select-option value="leader">负责人</a-select-option>
                      <a-select-option value="developer">开发者</a-select-option>
                      <a-select-option value="designer">设计师</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :span="6">
                  <a-form-item
                    :name="['members', index, 'email']"
                    :label="`邮箱`"
                    :rules="memberEmailRules"
                  >
                    <a-input 
                      v-model:value="member.email" 
                      placeholder="请输入邮箱"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="3">
                  <a-form-item>
                    <a-button 
                      type="text" 
                      danger 
                      @click="removeMember(index)"
                      :disabled="form.model.members.length <= 1"
                    >
                      删除
                    </a-button>
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
          </div>

          <template #actions-left>
            <a-button @click="handleReset">重置</a-button>
            <a-button @click="addQuickMember">快速添加</a-button>
          </template>
          
          <template #actions-right>
            <a-button @click="showFormData">查看数据</a-button>
            <a-button type="primary" html-type="submit">提交项目</a-button>
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
const dynamicFormRef = ref()

// 表单数据
const form = reactive({
  model: {
    projectName: '',
    members: [
      { id: 1, name: '', role: '', email: '' }
    ]
  },
  rules: {
    projectName: [
      { required: true, message: '请输入项目名称', trigger: 'blur' }
    ]
  }
})

let memberIdCounter = 1

// 计算属性定义验证规则
const memberNameRules = computed(() => ([
  { required: true, message: '请输入成员姓名', trigger: 'blur' }
]))

const memberEmailRules = computed(() => ([
  { required: true, message: '请输入邮箱', trigger: 'blur' },
  { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
]))

// 添加成员
const addMember = () => {
  memberIdCounter++
  form.model.members.push({
    id: memberIdCounter,
    name: '',
    role: '',
    email: ''
  })
  message.success('已添加新成员字段')
}

// 快速添加成员
const addQuickMember = () => {
  memberIdCounter++
  form.model.members.push({
    id: memberIdCounter,
    name: '新成员' + memberIdCounter,
    role: 'developer',
    email: `member${memberIdCounter}@example.com`
  })
  message.success('已添加示例成员')
}

// 删除成员
const removeMember = (index) => {
  if (form.model.members.length > 1) {
    form.model.members.splice(index, 1)
    message.info('已删除成员字段')
  }
}

// 事件处理函数
const handleSubmit = (values) => {
  console.log('动态表单提交:', values)
  message.success('项目信息提交成功！')
}

const handleFailed = (errorInfo) => {
  console.log('动态表单验证失败:', errorInfo)
  message.error('表单验证失败，请检查输入内容！')
}

const handleReset = () => {
  dynamicFormRef.value?.resetFields()
  // 重置members数组
  form.model.members = [{ id: 1, name: '', role: '', email: '' }]
  memberIdCounter = 1
  message.info('表单已重置')
}

const showFormData = () => {
  const data = dynamicFormRef.value?.getValues()
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

.dynamic-fields-section {
  margin: 24px 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-header h3 {
  margin: 0;
}

.dynamic-field-item {
  padding: 16px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  margin-bottom: 16px;
  background: #fafafa;
}
</style>