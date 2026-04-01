<template>
  <div class="home-page">
    <h1>Ant Form W 组件测试</h1>
    <p class="desc">自定义表单组件库 — 支持通过 JSON/JS 配置动态渲染表单字段</p>

    <!-- 导航标签 -->
    <a-tabs v-model:activeKey="activeTab" type="card">
      <!-- 1. 基础字段测试 -->
      <a-tab-pane key="basic" tab="基础字段">
        <div class="form-section">
          <h3>文本 / 数字 / 选择 / 日期 / 单选</h3>
          <CustomForm v-model="basicFormData" :config="basicConfig" @submit="handleSubmit" @field-change="onFieldChange" />
          <div class="form-data-preview">
            <h4>表单数据（实时）：</h4>
            <pre>{{ JSON.stringify(basicFormData, null, 2) }}</pre>
          </div>
        </div>
      </a-tab-pane>

      <!-- 2. 链式 Builder 测试 -->
      <a-tab-pane key="builder" tab="链式构建器">
        <div class="form-section">
          <h3>使用 FormBuilder 链式 API 快速构建表单</h3>
          <CustomForm v-model="builderFormData" :config="builderConfig" @submit="handleSubmit" />
          <div class="form-data-preview">
            <h4>表单数据：</h4>
            <pre>{{ JSON.stringify(builderFormData, null, 2) }}</pre>
          </div>
        </div>
      </a-tab-pane>

      <!-- 3. 快捷函数测试 -->
      <a-tab-pane key="quick" tab="快捷函数">
        <div class="form-section">
          <h3>createLoginForm / createRegisterForm / createContactForm</h3>
          <a-space direction="vertical" :size="24" style="width: 100%">
            <div>
              <h4>登录表单</h4>
              <CustomForm :config="loginConfig" @submit="handleSubmit" />
            </div>
            <div>
              <h4>联系表单</h4>
              <CustomForm :config="contactConfig" @submit="handleSubmit" />
            </div>
          </a-space>
        </div>
      </a-tab-pane>

      <!-- 4. 校验测试 -->
      <a-tab-pane key="validate" tab="校验功能">
        <div class="form-section">
          <h3>必填 / 自定义校验 / 实时防抖校验</h3>
          <CustomForm
            :config="validateConfig"
            :auto-validate="true"
            :debounce-validate="true"
            @submit="handleSubmit"
          />
        </div>
      </a-tab-pane>

      <!-- 5. 编程式操作测试 -->
      <a-tab-pane key="api" tab="编程式 API">
        <div class="form-section">
          <h3>通过 ref 调用表单方法</h3>
          <CustomForm ref="apiFormRef" :config="apiConfig" />
          <div class="api-buttons">
            <a-button type="primary" @click="handleApiValidate">验证表单</a-button>
            <a-button @click="handleApiReset">重置表单</a-button>
            <a-button @click="handleApiSetValue">设置值</a-button>
            <a-button @click="handleApiGetValue">获取值</a-button>
            <a-button @click="handleApiCheckModified">检查是否修改</a-button>
          </div>
          <div class="form-data-preview">
            <h4>API 返回结果：</h4>
            <pre>{{ apiResult }}</pre>
          </div>
        </div>
      </a-tab-pane>

      <!-- 6. 自定义组件 + 插槽 -->
      <a-tab-pane key="slot" tab="插槽 & 自定义">
        <div class="form-section">
          <h3>slot / valueSlot / blockslot / 自定义组件</h3>
          <CustomForm :config="slotConfig" @submit="handleSubmit">
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
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup>
import { ref, reactive, provide } from 'vue';
import { message } from 'ant-design-vue';
import CustomForm from '@/components/CustomForm.vue';
import {
  FormFieldType,
  createFormConfig,
  createField,
  createFormBuilder,
  createLoginForm,
  createContactForm,
} from '@/';

// ====== 国际化注入 ======
provide('formI18n', {
  t: (key) => {
    const map = {
      '姓名': '姓名',
      '手机号': '手机号',
      '邮箱': '邮箱',
      '年龄': '年龄',
      '性别': '性别',
      '学历': '学历',
      '爱好': '爱好',
      '生日': '生日',
      '入职月份': '入职月份',
      '婚否': '婚否',
      '工作状态': '工作状态',
      '经验等级': '经验等级',
      '个人简介': '个人简介',
      '请输入姓名': '请输入姓名',
      '请输入手机号': '请输入手机号',
      '请输入邮箱': '请输入邮箱',
      '请选择性别': '请选择性别',
      '请选择学历': '请选择学历',
      '请选择爱好': '请选择爱好',
      '请选择生日': '请选择生日',
      '请输入个人简介': '请输入个人简介',
    };
    return map[key] || key;
  },
});

// ====== 公共 ======
const activeTab = ref('basic');

const handleSubmit = (values) => {
  console.log('[表单提交]', values);
  message.success('表单提交成功，请查看控制台');
};

const onFieldChange = (key, value) => {
  console.log(`[字段变化] ${key}:`, value);
};

// ====== 1. 基础字段配置 ======
const basicFormData = reactive({});

const basicConfig = createFormConfig([
  createField({ type: FormFieldType.STRING, key: 'name', label: '姓名', required: true, active: true, data: { maxLength: 50 } }),
  createField({ type: FormFieldType.STRING, key: 'mobile', label: '手机号', required: true, active: true, data: { maxLength: 11 } }),
  createField({ type: FormFieldType.NUMBER, key: 'age', label: '年龄', colSpan: 8, data: { min: 0, max: 150 } }),
  createField({ type: FormFieldType.SELECT, key: 'gender', label: '性别', colSpan: 8, data: { list: ['男', '女', '其他'] } }),
  createField({ type: FormFieldType.SELECT_NEW, key: 'education', label: '学历', colSpan: 8, data: { list: [{ label: '本科', value: 'bachelor', key: 'bachelor' }, { label: '硕士', value: 'master', key: 'master' }, { label: '博士', value: 'phd', key: 'phd' }] } }),
  createField({ type: FormFieldType.SELECT_OPTIONS, key: 'hobbies', label: '爱好', block: true, data: { list: [{ label: '阅读', value: 'reading' }, { label: '运动', value: 'sports' }, { label: '音乐', value: 'music' }] } }),
  createField({ type: FormFieldType.DATE_PICKER, key: 'birthday', label: '生日', colSpan: 12 }),
  createField({ type: FormFieldType.MONTH_PICKER, key: 'joinMonth', label: '入职月份', colSpan: 12 }),
  createField({ type: FormFieldType.RADIO, key: 'married', label: '婚否', colSpan: 12, data: { list: ['已婚', '未婚'] } }),
  createField({ type: FormFieldType.RADIO_NEW, key: 'workStatus', label: '工作状态', colSpan: 12, data: { list: [{ key: 'fulltime', value: '全职' }, { key: 'parttime', value: '兼职' }, { key: 'freelance', value: '自由职业' }] } }),
  createField({ type: FormFieldType.RADIO_BUTTON, key: 'experienceLevel', label: '经验等级', block: true, data: { list: ['初级', '中级', '高级', '专家'] } }),
  createField({ type: FormFieldType.TEXT, key: 'introduction', label: '个人简介', block: true, data: { maxLength: 500 }, showCount: true }),
], {
  title: '基础字段测试',
  span: 3,
});

const handleBasicUpdate = (values) => {
  Object.keys(basicFormData).forEach(k => delete basicFormData[k]);
  Object.assign(basicFormData, values);
};

// ====== 2. 链式 Builder ======
const builderConfig = createFormBuilder()
  .setTitle('链式构建器测试')
  .addTextField('username', '用户名', { required: true, active: true, placeholder: '请输入用户名', colSpan: 12 })
  .addPasswordField('password', '密码', { required: true, active: true, placeholder: '请输入密码', colSpan: 12 })
  .addSelectField('role', '角色', ['管理员', '编辑', '访客'], { placeholder: '请选择角色', colSpan: 12 })
  .addRadioField('status', '状态', ['启用', '禁用'], { required: true, colSpan: 12 })
  .addTextareaField('remark', '备注', { block: true, data: { maxLength: 200 } })
  .setButtonStyle({ onSubmit: '创建用户', block: true, size: 'large' })
  .build();

const builderFormData = reactive({});

const handleBuilderUpdate = (values) => {
  Object.keys(builderFormData).forEach(k => delete builderFormData[k]);
  Object.assign(builderFormData, values);
};

// ====== 3. 快捷函数 ======
const loginConfig = createLoginForm();
const contactConfig = createContactForm();

// ====== 4. 校验 ======
const validateConfig = createFormConfig([
  createField({
    type: FormFieldType.STRING,
    key: 'phone',
    label: '手机号',
    required: true,
    active: true,
    colSpan: 8,
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
    validator: (_value) => {
      if (_value < 18 || _value > 120) {
        return Promise.reject('年龄必须在 18-120 之间');
      }
      return Promise.resolve();
    },
  }),
], { title: '校验功能测试', span: 3 });

// ====== 5. 编程式 API ======
const apiFormRef = ref(null);
const apiResult = ref('点击按钮查看结果');

const apiConfig = createFormConfig([
  createField({ type: FormFieldType.STRING, key: 'field1', label: '字段1', required: true, active: true, colSpan: 12 }),
  createField({ type: FormFieldType.SELECT, key: 'field2', label: '字段2', colSpan: 12, data: { list: ['A', 'B', 'C'] } }),
  createField({ type: FormFieldType.TEXT, key: 'field3', label: '字段3', block: true }),
], { title: '编程式 API 测试', span: 2 });

const handleApiValidate = async () => {
  try {
    const res = await apiFormRef.value?.validate();
    apiResult.value = JSON.stringify({ success: true, data: res }, null, 2);
  } catch (e) {
    apiResult.value = JSON.stringify({ success: false, error: '校验失败' }, null, 2);
  }
};
const handleApiReset = () => {
  apiFormRef.value?.reset();
  apiResult.value = '表单已重置';
};
const handleApiSetValue = () => {
  apiFormRef.value?.setFieldsValue({ field1: '自动设置的值', field2: 'B', field3: '自动填入的内容' });
  apiResult.value = '已调用 setFieldsValue({ field1, field2, field3 })';
};
const handleApiGetValue = () => {
  const val = apiFormRef.value?.getFieldValue('field1');
  apiResult.value = JSON.stringify({ field1: val, allData: apiFormRef.value?.formData }, null, 2);
};
const handleApiCheckModified = () => {
  const modified = apiFormRef.value?.isModified();
  const fields = apiFormRef.value?.getModifiedFields();
  apiResult.value = JSON.stringify({ isModified: modified, modifiedFields: fields }, null, 2);
};

// ====== 6. 插槽 ======
const slotValues = reactive({ customSlot: '', blockContent: '' });

const slotConfig = createFormConfig([
  createField({ type: FormFieldType.STRING, key: 'realName', label: '真实姓名', required: true, active: true, colSpan: 12 }),
  createField({ type: FormFieldType.SLOT, key: 'customSlot', label: '自定义插槽字段', colSpan: 12 }),
  createField({ type: FormFieldType.SLOT, key: 'agreementText', label: '协议文本', block: true }),
  createField({ type: FormFieldType.BLOCK_SLOT, key: 'blockContent', label: '独占行内容' }),
  createField({ type: FormFieldType.DIV_SLOT, key: 'dividerSection' }),
  createField({ type: FormFieldType.DIV, key: 'spacer' }),
], {
  title: '插槽功能测试',
  span: 2,
  buttonStyle: { onSubmit: '提交申请', block: false, size: 'default' },
});

const handleReadAgreement = () => {
  message.info('阅读协议（演示）');
};
const handleCancel = () => {
  message.info('取消操作（演示）');
};
</script>

<style scoped>
.home-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.home-page h1 {
  margin-bottom: 4px;
}

.desc {
  color: #666;
  margin-bottom: 24px;
}

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

.api-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 16px 0;
}
</style>
