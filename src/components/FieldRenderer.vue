<template>
  <a-col
    :lg="resolvedColSpan"
    :md="24"
    :xs="24"
    :class="['form-field-col', field.className]"
    :style="getFieldStyle"
  >
    <a-form-item
      :name="field.key"
      :rules="fieldRules"
      :label-col="{ span: labelColConfig }"
      :wrapper-col="{ span: wrapperColConfig }"
      :class="['field-renderer-item', { 'mb-0': true }]"
      :help="field.help || undefined"
      :validate-status="validateStatus"
      :has-feedback="hasFeedback"
    >
    <!-- label 插槽 -->
    <template v-if="showLabel" #label>
      <b v-if="field.active" class="update-form-list-label-active">*</b>
      <span :class="labelPaddingClass">{{ t(field.label) }}</span>
      <span v-if="hasColonInLabel">:</span>
    </template>

    <!-- extra 插槽 -->
    <template v-if="extraContent" #extra>
      <component :is="extraContent" />
    </template>

    <!-- 自定义组件渲染 -->
    <component
      v-if="field.type === 'custom' && field.component"
      :is="field.component"
      v-model:value="localValue"
      :disabled="field.disabled || disabled"
      v-bind="field.componentProps"
      @blur="handleBlur"
      @focus="handleFocus"
    />

    <!-- 插槽类型 -->
    <slot
      v-else-if="isSlotType(field.type)"
      :name="field.key"
      :record="field"
      :value="localValue"
    >
      {{ field.key }} 默认插槽内容
    </slot>

    <!-- 输入组合类型 -->
    <a-input-group
      v-else-if="field.type === 'inputGroupSelectInput'"
      compact
    >
      <template
        v-for="(childField, childIndex) in field.children"
        :key="`child-${childField.key}-${childIndex}`"
      >
        <child-field-renderer
          :field="childField"
          :parent-key="field.key"
          :value="getChildValue(childField.key)"
          :disabled="field.disabled || disabled"
          @update:value="handleChildChange($event, childField)"
          @blur="handleChildBlur($event, childField)"
          @focus="handleChildFocus($event, childField)"
        />
      </template>
    </a-input-group>

    <!-- 带重置按钮的文本输入 -->
    <template v-else-if="field.type === 'string_reset'">
      <a-input
        v-model:value="localValue"
        :disabled="field.disabled || disabled"
        :maxlength="field.data?.maxLength"
        :placeholder="getPlaceholder(field)"
        :prefix="field.prefix || ''"
        :size="fieldSize"
        :suffix="field.suffix || ''"
        style="width: 70%"
        @blur="handleBlur"
        @focus="handleFocus"
      />
      <span v-if="field.disabled" style="margin-left: 1%; color: #52c41a; font-size: 16px;">✓</span>
      <a-popconfirm
        v-if="field.disabled"
        cancel-text="取消"
        ok-text="重置"
        title="确定重置当前手机号及其他数据？"
        @confirm="handleReset"
      >
        <a-button style="width: 28%; margin-left: 1%" type="primary">重置</a-button>
      </a-popconfirm>
    </template>

    <!-- 文本输入 -->
    <a-input
      v-else-if="field.type === 'string' || field.type === 'string_new'"
      v-model:value="localValue"
      :disabled="field.disabled || disabled"
      :maxlength="field.data?.maxLength"
      :placeholder="getPlaceholder(field)"
      :prefix="field.prefix || ''"
      :size="fieldSize"
      :suffix="field.suffix || ''"
      @blur="handleBlur"
      @focus="handleFocus"
    />

    <!-- 数字输入 -->
    <a-input-number
      v-else-if="field.type === 'number'"
      v-model:value="localValue"
      :disabled="field.disabled || disabled"
      :formatter="(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
      :min="0"
      :placeholder="getPlaceholder(field)"
      :size="fieldSize"
      style="width: 100%"
      @blur="handleBlur"
      @focus="handleFocus"
    />

    <!-- 金额输入 -->
    <a-input
      v-else-if="field.type === 'number_amount'"
      v-model:value="localValue"
      :disabled="field.disabled || disabled"
      :placeholder="getPlaceholder(field)"
      :size="fieldSize"
      prefix="￥"
      style="width: 100%"
      suffix="万元"
      type="number"
      @blur="handleBlur"
      @focus="handleFocus"
    />

    <!-- 长文本输入 -->
    <a-textarea
      v-else-if="field.type === 'text'"
      v-model:value="localValue"
      :auto-size="{ minRows: 4, maxRows: 100 }"
      :disabled="field.disabled || disabled"
      :maxlength="field.data?.maxLength"
      :placeholder="getPlaceholder(field)"
      :show-count="field.showCount !== false"
      :size="fieldSize"
      @blur="handleBlur"
      @focus="handleFocus"
    />

    <!-- 密码输入 -->
    <a-input-password
      v-else-if="field.type === 'password'"
      v-model:value="localValue"
      :disabled="field.disabled || disabled"
      :placeholder="getPlaceholder(field)"
      :size="fieldSize"
      @blur="handleBlur"
      @focus="handleFocus"
    />

    <!-- 下拉选择（单选） -->
    <a-select
      v-else-if="field.type === 'select' || field.type === 'select_new' || field.type === 'select_label'"
      v-model:value="localValue"
      :disabled="field.disabled || disabled"
      :dropdown-match-select-width="false"
      :options="getOptions(field)"
      :placeholder="getPlaceholder(field)"
      :size="fieldSize"
      @blur="handleBlur"
      @focus="handleFocus"
    />

    <!-- 多选下拉 -->
    <a-select
      v-else-if="field.type === 'select_options'"
      v-model:value="localValue"
      :disabled="field.disabled || disabled"
      :options="getOptions(field)"
      :placeholder="getPlaceholder(field)"
      :size="fieldSize"
      mode="multiple"
      option-label-prop="label"
      @blur="handleBlur"
      @focus="handleFocus"
    />

    <!-- 级联选择 -->
    <a-cascader
      v-else-if="isCascaderType(field.type)"
      v-model:value="localValue"
      :disabled="field.disabled || disabled"
      :options="getCascaderOptions(field)"
      :placeholder="getPlaceholder(field)"
      :size="fieldSize"
      :style="field.data?.style"
      change-on-select="false"
      @blur="handleBlur"
      @focus="handleFocus"
    />

    <!-- 按钮式单选 -->
    <a-radio-group
      v-else-if="field.type === 'radioButton'"
      v-model:value="localValue"
      :disabled="field.disabled || disabled"
      button-style="solid"
      @blur="handleBlur"
      @focus="handleFocus"
    >
      <a-radio-button
        v-for="option in getOptions(field)"
        :key="option.value"
        :value="option.value"
        :style="field.data?.style"
      >
        {{ option.label }}
      </a-radio-button>
    </a-radio-group>

    <!-- 单选 -->
    <a-radio-group
      v-else-if="field.type === 'radio' || field.type === 'radio_new'"
      v-model:value="localValue"
      :disabled="field.disabled || disabled"
      @blur="handleBlur"
      @focus="handleFocus"
    >
      <a-radio
        v-for="option in getOptions(field)"
        :key="option.value"
        :value="option.value"
        :style="field.data?.style"
      >
        {{ option.label }}
      </a-radio>
    </a-radio-group>

    <!-- 日期选择 -->
    <a-date-picker
      v-else-if="field.type === 'datePicker'"
      v-model:value="localValue"
      :disabled="field.disabled || disabled"
      :input-read-only="true"
      :placeholder="getPlaceholder(field)"
      :size="fieldSize"
      format="YYYY-MM-DD"
      value-format="YYYY-MM-DD"
      style="width: 100%"
      @blur="handleBlur"
      @focus="handleFocus"
    />

    <!-- 月份选择 -->
    <a-month-picker
      v-else-if="field.type === 'monthPicker'"
      v-model:value="localValue"
      :disabled="field.disabled || disabled"
      :disabled-date="field.data?.disabledDate"
      :input-read-only="true"
      :placeholder="getPlaceholder(field)"
      :size="fieldSize"
      format="YYYY-MM"
      style="width: 100%"
      value-format="YYYY-MM"
      @blur="handleBlur"
      @focus="handleFocus"
    />

    <!-- 验证码输入 -->
    <template v-else-if="field.type === 'captcha' || field.type === 'quickCaptcha'">
      <a-input
        v-model:value="localValue"
        :maxlength="6"
        :placeholder="getPlaceholder(field)"
        :size="fieldSize"
        style="width: 50%; margin-top: 5px"
        @blur="handleBlur"
        @focus="handleFocus"
      />
      <a-button
        :disabled="!canGetCaptcha"
        :size="fieldSize"
        style="width: 48.8%; margin-left: 1%; margin-top: 5px"
        type="primary"
        @click="handleGetCaptcha"
      >
        {{ captchaButtonText }}
      </a-button>
    </template>

    <!-- 默认渲染（兜底） -->
    <div v-else class="field-renderer-default">
      <span class="field-type-label">[{{ field.type }}]</span>
      <span class="field-key-label">{{ field.key }}</span>
      <a-input
        v-model:value="localValue"
        :placeholder="`${field.label} (${field.type})`"
        @blur="handleBlur"
        @focus="handleFocus"
      />
    </div>
  </a-form-item>
  </a-col>
</template>

<script setup lang="ts">
import { computed, ref, watch, inject, h, type VNode } from 'vue';
import type { FormItemConfig } from './form-config';
import type { FieldRendererProps, FormContext } from '../types';
import ChildFieldRenderer from './ChildFieldRenderer.vue';

// 简易 i18n 透传，库本身不依赖 vue-i18n，由宿主项目通过 provide('formI18n', { t }) 注入
const formI18n = inject<{ t?: (key: string) => string }>('formI18n', {});
const t = (key: string) => formI18n.t?.(key) ?? key;

const props = defineProps<FieldRendererProps>();

const emit = defineEmits<{
  'update:value': [value: any];
  blur: [value: any];
  focus: [value: any];
  reset: [];
  getCaptcha: [field: FormItemConfig];
}>();

// 表单上下文
const formContext = inject<FormContext>('formContext');

// 本地值
const localValue = ref(props.value);

// 验证码状态
const canGetCaptcha = ref(true);
const captchaButtonText = ref('获取验证码');
const remainingTime = ref(60);

// 验证状态
const validateStatus = ref('');
const hasFeedback = computed(() => !!validateStatus.value);

// 字段大小
const fieldSize = computed(() => props.field.data?.size || 'middle');

// 栅格列跨度
const resolvedColSpan = computed(() => {
  if (props.colSpan !== undefined) {
    return props.colSpan;
  }
  if (props.field.block === true) {
    return 24;
  }
  return formContext?.config?.span ?? 8;
});

// 字段样式
const getFieldStyle = computed(() => {
  return props.field.data?.style ?? {};
});

// 是否显示 label
const showLabel = computed(() => {
  return props.field.type !== 'divslot';
});

// label 的 padding class
const labelPaddingClass = computed(() => {
  return formContext?.config?.size === 'large' ? 'pt-5' : '';
});

// label 是否包含冒号
const hasColonInLabel = computed(() => {
  const label = t(props.field.label);
  return label.includes('：') || label.includes(':');
});

// 字段规则
const fieldRules = computed(() => {
  const rules: any[] = [];

  if (props.field.required) {
    rules.push({
      required: true,
      message: props.field.message || `${props.field.label}不能为空`,
      trigger: 'blur',
    });
  }

  if (props.field.validator) {
    rules.push({
      validator: props.field.validator,
      trigger: 'blur',
    });
  }

  return rules;
});

// labelCol 配置
const labelColConfig = computed(() => {
  if (props.field.type === 'blockslot') {
    return 0;
  }
  // 优先使用字段级别的 labelCol 配置
  if (props.field.labelCol) {
    return props.field.labelCol.span;
  }
  // 使用表单全局配置
  if (formContext?.config?.labelCol) {
    return formContext.config.labelCol.span;
  }
  return 6;
});

// wrapperCol 配置
const wrapperColConfig = computed(() => {
  if (props.field.type === 'blockslot') {
    return 24;
  }
  // 优先使用字段级别的 wrapperCol 配置
  if (props.field.wrapperCol) {
    return props.field.wrapperCol.span;
  }
  // 使用表单全局配置
  if (formContext?.config?.wrapperCol) {
    return formContext.config.wrapperCol.span;
  }
  return 13;
});

// extra 内容的 VNode
const extraContent = computed<VNode | null>(() => {
  const extra = props.field.extra;
  if (!extra) return null;

  const extraStr = typeof extra === 'string' ? extra : String(extra);
  const keySuccess = /success/g;
  const keyFail = /fail/g;
  let statusFlag = '';
  if (keySuccess.test(extraStr)) statusFlag = 'success';
  else if (keyFail.test(extraStr)) statusFlag = 'fail';

  const text = extraStr.replace(/success|fail/g, '').trim();

  // 使用 h() 函数构建 VNode
  const children: VNode[] = [];

  if (statusFlag === 'success') {
    children.push(h('span', { style: 'color: #bb133e; margin-right: 4px;' }, '\u2713'));
  } else if (statusFlag === 'fail') {
    children.push(h('span', { style: 'color: #bb133e; margin-right: 4px;' }, '\u2717'));
  }

  if (text) {
    children.push(h('span', {}, t(text)));
  }

  if (props.field.sub_extra) {
    children.push(h('br'));
    children.push(h('span', {}, props.field.sub_extra));
  }

  return h('span', {}, children);
});

// 判断是否是插槽类型
const isSlotType = (type: string): boolean => {
  return ['slot', 'valueSlot', 'blockslot', 'description'].includes(type);
};

// 判断是否是级联选择类型
const isCascaderType = (type: string): boolean => {
  return [
    'cascader',
    'cascader_new',
    'cascaderCountry',
    'cascaderNationality',
    'cascaderEthnicity',
    'customDataCascader',
    'cascaderCustom',
  ].includes(type);
};

// 获取占位符
const getPlaceholder = (field: FormItemConfig): string => {
  return field.placeholder || field.message || t(field.label);
};

// 获取选项（规范化：纯字符串 → {value, label} 对象）
const getOptions = (field: FormItemConfig): any[] => {
  const list = field.data?.list || [];
  if (list.length > 0 && typeof list[0] === 'string') {
    return list.map((item: string) => ({ value: item, label: item }));
  }
  return list;
};

// 获取级联选项
const getCascaderOptions = (field: FormItemConfig): any[] => {
  return field.data?.cascader || [];
};

// 获取子字段值
const getChildValue = (childKey: string): any => {
  const fullKey = `${props.field.key}.${childKey}`;
  return formContext?.formData[fullKey];
};

// 监听外部值变化
watch(() => props.value, (newValue: any) => {
  if (newValue !== localValue.value) {
    localValue.value = newValue;
  }
});

// 监听本地值变化，统一向父组件 emit
watch(localValue, (newValue: any) => {
  emit('update:value', newValue);
});

// 失焦
const handleBlur = (value: any) => {
  emit('blur', value);
};

// 聚焦
const handleFocus = (value: any) => {
  emit('focus', value);
};

// 重置
const handleReset = () => {
  emit('reset');
};

// 获取验证码
const handleGetCaptcha = () => {
  if (!canGetCaptcha.value) return;

  canGetCaptcha.value = false;
  remainingTime.value = 60;
  captchaButtonText.value = `${remainingTime.value}s后重新获取`;

  const timer = setInterval(() => {
    remainingTime.value--;
    captchaButtonText.value = `${remainingTime.value}s后重新获取`;

    if (remainingTime.value <= 0) {
      clearInterval(timer);
      canGetCaptcha.value = true;
      captchaButtonText.value = '获取验证码';
    }
  }, 1000);

  emit('getCaptcha', props.field);
};

// 子字段变化
const handleChildChange = (value: any, childField: FormItemConfig) => {
  const fullKey = `${props.field.key}.${childField.key}`;
  if (formContext) {
    formContext.formData[fullKey] = value;
    formContext.updateFormData(fullKey, value);
  }

  if (childField.onChange) {
    childField.onChange(value, childField);
  }
};

// 子字段失焦
const handleChildBlur = (value: any, childField: FormItemConfig) => {
  if (childField.onBlur) {
    childField.onBlur(value, childField);
  }
};

// 子字段聚焦
const handleChildFocus = (value: any, childField: FormItemConfig) => {
  if (childField.onFocus) {
    childField.onFocus(value, childField);
  }
};
</script>

<style scoped lang="less">
.field-renderer-item {
  width: 100%;

  :deep(.ant-form-item-label) {
    .update-form-list-label-active {
      color: #bb133e;
    }

    .pt-5 {
      padding-top: 5px;
    }
  }
}

.field-renderer-default {
  display: flex;
  flex-direction: column;
  gap: 8px;

  .field-type-label {
    font-size: 12px;
    color: #999;
    font-weight: bold;
  }

  .field-key-label {
    font-size: 14px;
    color: #666;
    font-family: monospace;
  }
}

.mb-0 {
  margin-bottom: 0 !important;
}
</style>