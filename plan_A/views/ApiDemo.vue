<template>
  <div class="form-section">
    <h3>通过 ref 调用表单方法</h3>
    <CustomForm
      ref="formRef"
      :config="config"
      :show-submit-button="false"
      layout="vertical"
      size="middle"
    />
    <div class="api-buttons">
      <a-button type="primary" @click="handleValidate">验证表单</a-button>
      <a-button @click="handleReset">重置表单</a-button>
      <a-button @click="handleSetValue">设置值</a-button>
      <a-button @click="handleGetValue">获取值</a-button>
      <a-button @click="handleCheckModified">检查是否修改</a-button>
    </div>
    <div class="form-data-preview">
      <h4>API 返回结果：</h4>
      <pre>{{ apiResult }}</pre>
    </div>
    <div class="props-demo">
      <h4>Props 配置演示：</h4>
      <a-space>
        <a-tag color="blue">layout: vertical</a-tag>
        <a-tag color="green">showSubmitButton: false</a-tag>
        <a-tag color="purple">冒号根据 label 字符串自动判断</a-tag>
      </a-space>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CustomForm from '@/components/CustomForm.vue';
import {
  FormFieldType,
  createFormConfig,
  createField,
} from '@/';

const formRef = ref(null);
const apiResult = ref('点击按钮查看结果');

const config = createFormConfig([
  createField({ type: FormFieldType.STRING, key: 'field1', label: '字段1', required: true, active: true, colSpan: 12, labelCol: { span: 6 }, wrapperCol: { span: 18 } }),
  createField({ type: FormFieldType.SELECT, key: 'field2', label: '字段2', colSpan: 12, data: { list: ['A', 'B', 'C'] }, labelCol: { span: 6 }, wrapperCol: { span: 18 } }),
  createField({ type: FormFieldType.TEXT, key: 'field3', label: '字段3', block: true, labelCol: { span: 3 }, wrapperCol: { span: 21 } }),
], { title: '编程式 API 测试', span: 2 });

const handleValidate = async () => {
  try {
    const res = await formRef.value?.validate();
    apiResult.value = JSON.stringify({ success: true, data: res }, null, 2);
  } catch (e) {
    apiResult.value = JSON.stringify({ success: false, error: '校验失败' }, null, 2);
  }
};

const handleReset = () => {
  formRef.value?.reset();
  apiResult.value = '表单已重置';
};

const handleSetValue = () => {
  formRef.value?.setFieldsValue({ field1: '自动设置的值', field2: 'B', field3: '自动填入的内容' });
  apiResult.value = '已调用 setFieldsValue({ field1, field2, field3 })';
};

const handleGetValue = () => {
  const val = formRef.value?.getFieldValue('field1');
  apiResult.value = JSON.stringify({ field1: val, allData: formRef.value?.formData }, null, 2);
};

const handleCheckModified = () => {
  const modified = formRef.value?.isModified();
  const fields = formRef.value?.getModifiedFields();
  apiResult.value = JSON.stringify({ isModified: modified, modifiedFields: fields }, null, 2);
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

.api-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 16px 0;
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
