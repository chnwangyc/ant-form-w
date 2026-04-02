<template>
  <div class="form-section">
    <h3>文本 / 数字 / 选择 / 日期 / 单选</h3>
    <CustomForm
      v-model="formData"
      :config="config"
      layout="vertical"
      :show-submit-button="true"
      submit-text="保存基础信息"
      :loading="loading"
      size="middle"
      :gutter="[16, 16]"
      :auto-validate="true"
      :debounce-validate="true"
      :debounce-delay="300"
      @submit="handleSubmit"
      @field-change="onFieldChange"
    />
    <div class="form-data-preview">
      <h4>表单数据（实时）：</h4>
      <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
    </div>
    <div class="props-demo">
      <h4>Props 配置演示：</h4>
      <a-space>
        <a-button @click="loading = !loading">
          切换加载状态 ({{ loading ? '加载中' : '正常' }})
        </a-button>
        <a-switch v-model:checked="showSubmit" checked-children="显示" un-checked-children="隐藏" />
        <span>提交按钮</span>
      </a-space>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { message } from 'ant-design-vue';
import CustomForm from '@/components/CustomForm.vue';
import {
  FormFieldType,
  createFormConfig,
  createField,
} from '@/';

const formData = reactive({});
const loading = ref(false);
const showSubmit = ref(true);

const config = createFormConfig([
  createField({ type: FormFieldType.STRING, key: 'name', label: '姓名', required: true, active: true, data: { maxLength: 50 }, labelCol: { span: 6 }, wrapperCol: { span: 18 } }),
  createField({ type: FormFieldType.STRING, key: 'mobile', label: '手机号', required: true, active: true, data: { maxLength: 11 }, labelCol: { span: 6 }, wrapperCol: { span: 18 } }),
  createField({ type: FormFieldType.NUMBER, key: 'age', label: '年龄', colSpan: 8, data: { min: 0, max: 150 }, labelCol: { span: 8 }, wrapperCol: { span: 16 } }),
  createField({ type: FormFieldType.SELECT, key: 'gender', label: '性别', colSpan: 8, data: { list: ['男', '女', '其他'] }, labelCol: { span: 8 }, wrapperCol: { span: 16 } }),
  createField({ type: FormFieldType.SELECT_NEW, key: 'education', label: '学历', colSpan: 8, data: { list: [{ label: '本科', value: 'bachelor', key: 'bachelor' }, { label: '硕士', value: 'master', key: 'master' }, { label: '博士', value: 'phd', key: 'phd' }] }, labelCol: { span: 8 }, wrapperCol: { span: 16 } }),
  createField({ type: FormFieldType.SELECT_OPTIONS, key: 'hobbies', label: '爱好', block: true, data: { list: [{ label: '阅读', value: 'reading' }, { label: '运动', value: 'sports' }, { label: '音乐', value: 'music' }] }, labelCol: { span: 3 }, wrapperCol: { span: 21 } }),
  createField({ type: FormFieldType.DATE_PICKER, key: 'birthday', label: '生日', colSpan: 12, labelCol: { span: 6 }, wrapperCol: { span: 18 } }),
  createField({ type: FormFieldType.MONTH_PICKER, key: 'joinMonth', label: '入职月份', colSpan: 12, labelCol: { span: 6 }, wrapperCol: { span: 18 } }),
  createField({ type: FormFieldType.RADIO, key: 'married', label: '婚否', colSpan: 12, data: { list: ['已婚', '未婚'] }, labelCol: { span: 6 }, wrapperCol: { span: 18 } }),
  createField({ type: FormFieldType.RADIO_NEW, key: 'workStatus', label: '工作状态', colSpan: 12, data: { list: [{ key: 'fulltime', value: '全职' }, { key: 'parttime', value: '兼职' }, { key: 'freelance', value: '自由职业' }] }, labelCol: { span: 6 }, wrapperCol: { span: 18 } }),
  createField({ type: FormFieldType.RADIO_BUTTON, key: 'experienceLevel', label: '经验等级', block: true, data: { list: ['初级', '中级', '高级', '专家'] }, labelCol: { span: 4 }, wrapperCol: { span: 20 } }),
  createField({ type: FormFieldType.TEXT, key: 'introduction', label: '个人简介', block: true, data: { maxLength: 500 }, showCount: true, labelCol: { span: 3 }, wrapperCol: { span: 21 } }),
], {
  title: '基础字段测试',
  span: 3,
});

const handleSubmit = (values) => {
  console.log('[表单提交]', values);
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    message.success('表单提交成功，请查看控制台');
  }, 1500);
};

const onFieldChange = (key, value) => {
  console.log(`[字段变化] ${key}:`, value);
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
