<template>
  <div class="form-section">
    <h3>slot / valueSlot / blockslot / 自定义组件</h3>
    <CustomForm
      :config="config"
      layout="horizontal"
      size="middle"
      :gutter="[16, 16]"
      submit-text="提交申请"
      @submit="handleSubmit"
    >
      <!-- 命名插槽 -->
      <template #customSlot>
        <a-input
          v-model:value="slotValues.customSlot"
          placeholder="这是自定义插槽内容"
          style="width: 100%"
        />
      </template>
      <template #agreementText>
        <div style="color: #1890ff; cursor: pointer;" @click="handleReadAgreement">
          《用户服务协议》和《隐私政策》
        </div>
      </template>
      <template #blockContent>
        <a-card size="small" title="独占行插槽 - 自定义内容区">
          <p>这里可以放置任意内容：表格、图表、自定义组件等。</p>
          <a-input v-model:value="slotValues.blockContent" placeholder="独占行插槽中的输入" />
        </a-card>
      </template>
      <template #dividerSection>
        <a-divider>分割线插槽</a-divider>
      </template>
      <!-- 提交按钮左侧 -->
      <template #left>
        <a-button @click="handleCancel">取消</a-button>
      </template>
    </CustomForm>
    <div class="props-demo">
      <h4>Props 配置演示：</h4>
      <a-space>
        <a-tag color="blue">layout: horizontal</a-tag>
        <a-tag color="green">labelCol: { span: 5 }</a-tag>
        <a-tag color="orange">wrapperCol: { span: 19 }</a-tag>
        <a-tag color="purple">冒号根据 label 字符串自动判断</a-tag>
      </a-space>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { message } from 'ant-design-vue';
import CustomForm from '@/components/CustomForm.vue';
import {
  FormFieldType,
  createFormConfig,
  createField,
} from '@/';

const slotValues = reactive({ customSlot: '', blockContent: '' });

const config = createFormConfig([
  createField({ type: FormFieldType.STRING, key: 'realName', label: '真实姓名', required: true, active: true, colSpan: 12, labelCol: { span: 6 }, wrapperCol: { span: 18 } }),
  createField({ type: FormFieldType.SLOT, key: 'customSlot', label: '自定义插槽字段', colSpan: 12, labelCol: { span: 6 }, wrapperCol: { span: 18 } }),
  createField({ type: FormFieldType.SLOT, key: 'agreementText', label: '协议文本', block: true, labelCol: { span: 3 }, wrapperCol: { span: 21 } }),
  createField({ type: FormFieldType.BLOCK_SLOT, key: 'blockContent', label: '独占行内容', labelCol: { span: 0 }, wrapperCol: { span: 24 } }),
  createField({ type: FormFieldType.DIV_SLOT, key: 'dividerSection' }),
  createField({ type: FormFieldType.DIV, key: 'spacer' }),
], {
  title: '插槽功能测试',
  span: 2,
  buttonStyle: { onSubmit: '提交申请', block: false, size: 'default' },
});

const handleSubmit = (values) => {
  console.log('[表单提交]', values);
  message.success('表单提交成功，请查看控制台');
};

const handleReadAgreement = () => {
  message.info('阅读协议（演示）');
};

const handleCancel = () => {
  message.info('取消操作（演示）');
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
