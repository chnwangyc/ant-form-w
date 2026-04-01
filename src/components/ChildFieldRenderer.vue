<template>
  <!-- 下拉选择 -->
  <a-select
    v-if="field.type === 'select'"
    v-model:value="localValue"
    :disabled="field.disabled || disabled"
    :placeholder="field.message"
    :size="field.data?.size || 'middle'"
    :style="field.data?.style"
    @blur="handleBlur"
    @focus="handleFocus"
  >
    <a-select-option
      v-for="option in field.data?.list || []"
      :key="option"
      :value="option"
    >
      {{ option }}
    </a-select-option>
  </a-select>

  <!-- 新版下拉选择 -->
  <a-select
    v-else-if="field.type === 'select_new'"
    v-model:value="localValue"
    :disabled="field.disabled || disabled"
    :dropdown-match-select-width="false"
    :placeholder="getPlaceholder(field)"
    :size="field.data?.size || 'middle'"
    :style="field.data?.style"
    :options="field.data?.list || []"
    @blur="handleBlur"
    @focus="handleFocus"
  />

  <!-- 带标签的下拉选择 -->
  <a-select
    v-else-if="field.type === 'select_label'"
    v-model:value="localValue"
    :disabled="field.disabled || disabled"
    :dropdown-match-select-width="false"
    :placeholder="getPlaceholder(field)"
    :size="field.data?.size || 'middle'"
    :style="field.data?.style"
    :options="field.data?.list || []"
    @blur="handleBlur"
    @focus="handleFocus"
  />

  <!-- 级联选择（国内城市） -->
  <a-cascader
    v-else-if="field.type === 'cascaderCities'"
    v-model:value="localValue"
    :disabled="field.disabled || disabled"
    :options="provinceCities"
    :placeholder="getPlaceholder(field)"
    :size="field.data?.size || 'middle'"
    :style="field.data?.style"
    change-on-select="false"
    @blur="handleBlur"
    @focus="handleFocus"
  />

  <!-- 自定义级联选择（国家） -->
  <a-cascader
    v-else-if="field.type === 'customCascaderCountry'"
    v-model:value="localValue"
    :disabled="field.disabled || disabled"
    :options="field.data?.cascader || []"
    :placeholder="getPlaceholder(field)"
    :size="field.data?.size || 'middle'"
    :style="field.data?.style"
    change-on-select="false"
    @blur="handleBlur"
    @focus="handleFocus"
  />

  <!-- 级联选择（国家） -->
  <a-cascader
    v-else-if="field.type === 'cascaderCountry'"
    v-model:value="localValue"
    :disabled="field.disabled || disabled"
    :options="countryOptions"
    :placeholder="getPlaceholder(field)"
    :size="field.data?.size || 'middle'"
    :style="field.data?.style"
    change-on-select="false"
    @blur="handleBlur"
    @focus="handleFocus"
  />

  <!-- 级联选择（国籍） -->
  <a-cascader
    v-else-if="field.type === 'cascaderNationality'"
    v-model:value="localValue"
    :disabled="field.disabled || disabled"
    :options="nationalityOptions"
    :placeholder="getPlaceholder(field)"
    :size="field.data?.size || 'middle'"
    :style="field.data?.style"
    change-on-select="false"
    @blur="handleBlur"
    @focus="handleFocus"
  />

  <!-- 级联选择（民族） -->
  <a-cascader
    v-else-if="field.type === 'cascaderEthnicity'"
    v-model:value="localValue"
    :disabled="field.disabled || disabled"
    :options="ethnicityOptions"
    :placeholder="getPlaceholder(field)"
    :size="field.data?.size || 'middle'"
    :style="field.data?.style"
    change-on-select="false"
    @blur="handleBlur"
    @focus="handleFocus"
  />

  <!-- 其他级联选择 -->
  <a-cascader
    v-else-if="field.type === 'cascaderOther'"
    v-model:value="localValue"
    :disabled="field.disabled || disabled"
    :options="field.data?.cascader || []"
    :size="field.data?.size || 'middle'"
    :style="field.data?.style"
    placeholder=""
    change-on-select="false"
    @blur="handleBlur"
    @focus="handleFocus"
  />

  <!-- 文本输入 -->
  <a-input
    v-else-if="field.type === 'string'"
    v-model:value="localValue"
    :disabled="field.disabled || disabled"
    :placeholder="getPlaceholder(field)"
    :size="field.data?.size || 'middle'"
    :style="getInputStyle(field)"
    @blur="handleBlur"
    @focus="handleFocus"
  />

  <!-- 默认渲染 -->
  <div v-else class="child-field-default">
    <span class="field-type-label">[{{ field.type }}]</span>
    <a-input
      v-model:value="localValue"
      :placeholder="field.label"
      @blur="handleBlur"
      @focus="handleFocus"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, inject } from 'vue';
import type { FormItemConfig } from './form-config';

// 简易 i18n 透传
const formI18n = inject<{ t?: (key: string) => string }>('formI18n', {});
const t = (key: string) => formI18n.t?.(key) ?? key;

// 级联选项占位，由宿主项目通过 props 或 provide 注入
const provinceCities = inject<any[]>('formProvinceCities', []);
const countryOptions = inject<any[]>('formCountryOptions', []);
const nationalityOptions = inject<any[]>('formNationalityOptions', []);
const ethnicityOptions = inject<any[]>('formEthnicityOptions', []);

// 定义组件属性
interface ChildFieldRendererProps {
  field: FormItemConfig;
  parentKey: string;
  value: any;
  disabled?: boolean;
}

const props = defineProps<ChildFieldRendererProps>();

// 定义组件事件
const emit = defineEmits<{
  'update:value': [value: any];
  blur: [value: any];
  focus: [value: any];
  change: [value: any];
}>();

// 本地值引用
const localValue = ref(props.value);

// 获取占位符文本
const getPlaceholder = (field: FormItemConfig): string => {
  return field.placeholder || field.message || t(field.label);
};

// 获取输入框样式
const getInputStyle = (field: FormItemConfig): string => {
  const baseStyle = 'width: 100%;';
  return field.data?.style ? baseStyle + field.data.style : baseStyle;
};

// 处理失焦
const handleBlur = (value: any) => {
  emit('blur', value);
};

// 处理聚焦
const handleFocus = (value: any) => {
  emit('focus', value);
};

// 监听外部值变化
watch(() => props.value, (newValue) => {
  if (newValue !== localValue.value) {
    localValue.value = newValue;
  }
});

// 监听本地值变化，统一向父组件 emit
watch(localValue, (newValue) => {
  emit('update:value', newValue);
  emit('change', newValue);
});
</script>

<style scoped lang="less">
.child-field-default {
  display: flex;
  flex-direction: column;
  gap: 4px;
  
  .field-type-label {
    font-size: 10px;
    color: #999;
    font-weight: bold;
  }
}
</style>
