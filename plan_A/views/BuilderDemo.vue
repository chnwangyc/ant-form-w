<template>
  <div class="form-section">
    <h3>使用 FormBuilder 链式 API 快速构建表单</h3>
    <CustomForm
      v-model="formData"
      :config="config"
      layout="horizontal"
      :show-submit-button="true"
      :loading="loading"
      size="middle"
      :gutter="[20, 16]"
      :auto-validate="false"
      :debounce-validate="false"
      @submit="handleSubmit"
    />
    <div class="form-data-preview">
      <h4>表单数据：</h4>
      <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
    </div>
    <div class="props-demo">
      <h4>Props 配置演示：</h4>
      <a-space>
        <a-button @click="loading = !loading">
          切换加载状态 ({{ loading ? '加载中' : '正常' }})
        </a-button>
        <a-tag color="blue">layout: horizontal</a-tag>
        <a-tag color="orange">autoValidate: false</a-tag>
        <a-tag color="purple">冒号根据 label 字符串自动判断</a-tag>
      </a-space>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { message } from 'ant-design-vue';
import CustomForm from '@/components/CustomForm.vue';
import { createFormBuilder } from '@/';

const formData = reactive({});
const loading = ref(false);

const config = createFormBuilder()
  .setTitle('链式构建器测试')
  .addTextField('username', '用户名', { required: true, active: true, placeholder: '请输入用户名', colSpan: 12, labelCol: { span: 5 }, wrapperCol: { span: 19 } })
  .addPasswordField('password', '密码', { required: true, active: true, placeholder: '请输入密码', colSpan: 12, labelCol: { span: 5 }, wrapperCol: { span: 19 } })
  .addSelectField('role', '角色', ['管理员', '编辑', '访客'], { placeholder: '请选择角色', colSpan: 12, labelCol: { span: 5 }, wrapperCol: { span: 19 } })
  .addRadioField('status', '状态', ['启用', '禁用'], { required: true, colSpan: 12, labelCol: { span: 5 }, wrapperCol: { span: 19 } })
  .addTextareaField('remark', '备注', { block: true, data: { maxLength: 200 }, labelCol: { span: 3 }, wrapperCol: { span: 21 } })
  .setButtonStyle({ onSubmit: '创建用户', block: true, size: 'large' })
  .build();

const handleSubmit = (values) => {
  console.log('[表单提交]', values);
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    message.success('表单提交成功，请查看控制台');
  }, 1500);
};
</script>

<style scoped>
.form-section {
  padding: 20px;
  background: #fafafa;
  border-radius: 8px;
}

.form-section h3 {
  margin-bottom: 20px;
}

.form-section h4 {
  margin: 16px 0 8px;
  color: #666;
  font-size: 14px;
}

.form-data-preview {
  margin-top: 24px;
  padding: 16px;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
}

.form-data-preview pre {
  margin: 0;
  font-size: 13px;
  color: #333;
  white-space: pre-wrap;
  word-break: break-all;
}

.props-demo {
  margin-top: 16px;
  padding: 12px;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}
</style>
