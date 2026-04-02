<template>
  <div class="form-section">
    <h3>createLoginForm / createRegisterForm / createContactForm</h3>
    <a-space direction="vertical" :size="24" style="width: 100%">
      <div>
        <h4>登录表单 (layout: vertical, size: large)</h4>
        <CustomForm
          :config="loginConfig"
          layout="vertical"
          size="large"
          submit-text="登录"
          @submit="handleSubmit"
        />
      </div>
      <div>
        <h4>联系表单 (layout: inline, showSubmitButton: false)</h4>
        <CustomForm
          :config="contactConfig"
          layout="inline"
          :show-submit-button="false"
          @submit="handleSubmit"
        />
      </div>
    </a-space>
  </div>
</template>

<script setup>
import { message } from 'ant-design-vue';
import CustomForm from '@/components/CustomForm.vue';
import {
  createLoginForm,
  createContactForm,
} from '@/';

const loginConfig = createLoginForm();
const contactConfig = createContactForm();

const handleSubmit = (values) => {
  console.log('[表单提交]', values);
  message.success('表单提交成功，请查看控制台');
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
</style>
