<template>
  <div class="form-section">
    <h3>必填 / 自定义校验 / 实时防抖校验</h3>
    <CustomForm
      :config="config"
      :auto-validate="autoValidate"
      :debounce-validate="debounceValidate"
      :debounce-delay="debounceDelay"
      layout="horizontal"
      size="middle"
      :colon="true"
      @submit="handleSubmit"
    />
    <div class="props-demo">
      <h4>校验配置演示：</h4>
      <a-space>
        <a-switch v-model:checked="autoValidate" checked-children="启用" un-checked-children="禁用" />
        <span>自动验证</span>
        <a-switch v-model:checked="debounceValidate" checked-children="启用" un-checked-children="禁用" />
        <span>防抖验证</span>
        <a-input-number v-model:value="debounceDelay" :min="100" :max="2000" :step="100" style="width: 120px" />
        <span>防抖延迟(ms)</span>
      </a-space>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import CustomForm from '@/components/CustomForm.vue';
import {
  FormFieldType,
  createFormConfig,
  createField,
} from '@/';

const autoValidate = ref(true);
const debounceValidate = ref(true);
const debounceDelay = ref(300);

const config = createFormConfig([
  createField({
    type: FormFieldType.STRING,
    key: 'phone',
    label: '手机号',
    required: true,
    active: true,
    colSpan: 8,
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
    validator: (_value, _rule) => {
      if (!_value || !/^1[3-9]\d{9}$/.test(_value)) {
        return Promise.reject('请输入正确的11位手机号');
      }
      return Promise.resolve();
    },
  }),
  createField({
    type: FormFieldType.STRING,
    key: 'email',
    label: '邮箱',
    required: true,
    active: true,
    colSpan: 8,
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
    validator: (_value) => {
      if (!_value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(_value)) {
        return Promise.reject('请输入正确的邮箱地址');
      }
      return Promise.resolve();
    },
  }),
  createField({
    type: FormFieldType.NUMBER,
    key: 'age',
    label: '年龄',
    required: true,
    active: true,
    colSpan: 8,
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
    validator: (_value) => {
      if (_value < 18 || _value > 120) {
        return Promise.reject('年龄必须在 18-120 之间');
      }
      return Promise.resolve();
    },
  }),
], { title: '校验功能测试', span: 3 });

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

.props-demo {
  margin-top: 16px;
  padding: 12px;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}
</style>
