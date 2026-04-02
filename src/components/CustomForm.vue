<template>
  <div v-if="config" class="custom-form-wrapper">
    <!-- 表单标题 -->
    <div v-if="config.title" class="custom-form-title">
      <h3>{{ config.title }}</h3>
    </div>

    <!-- 主表单 -->
    <a-form
      ref="formRef"
      :model="formData"
      :rules="mergedRules"
      :layout="config.layout || layout"
      :colon="false"
      :size="config.size || size"
      :scrollToFirstError="true"
      v-bind="config.formProps"
    >
      <!-- 表单字段区域 -->
      <a-row :gutter="config.gutter || gutter">
        <template v-for="(field, index) in config.fields" :key="`field-${field.key}-${index}`">
          <!-- 字段渲染 -->
          <field-renderer
            v-if="field.type !== 'div' && field.type !== 'divslot'"
            :field="field"
            :value="formData[field.key]"
            :index="index"
            :col-span="getFieldColSpan(field)"
            :disabled="field.disabled"
            @update:value="handleFieldChange($event, field)"
            @blur="handleFieldBlur($event, field)"
            @focus="handleFieldFocus($event, field)"
          >
            <!-- 动态转发插槽到 FieldRenderer -->
            <template v-if="$slots[field.key]" #[field.key]>
              <slot :name="field.key" />
            </template>
          </field-renderer>

          <!-- 独立div插槽 -->
          <div
            v-else-if="field.type === 'divslot'"
            :key="`divslot-${field.key}-${index}`"
            class="form-div-slot"
          >
            <slot :name="field.key">{{ field.key }} div独占一行block</slot>
          </div>

          <!-- 空div占位 -->
          <div
            v-else-if="field.type === 'div'"
            :key="`div-${field.key}-${index}`"
            class="form-div-placeholder"
          ></div>
        </template>
      </a-row>

      <!-- 表单操作区域 -->
      <div v-if="showSubmitButton" class="custom-form-actions">
        <!-- 提交按钮左侧插槽 -->
        <slot name="left">
          <template v-if="config.slots?.left">
            <component :is="config.slots.left" />
          </template>
        </slot>

        <!-- 提交按钮 -->
        <a-button
          :loading="loading"
          :disabled="isButtonDisabled"
          :block="buttonBlock"
          :size="buttonSize"
          :style="buttonStyle"
          type="primary"
          @click="handleSubmit"
        >
          <slot name="onSubmit">
            <template v-if="config.slots?.onSubmit">
              <component :is="config.slots.onSubmit" />
            </template>
            <span v-else>{{ submitButtonText }}</span>
          </slot>
        </a-button>

        <!-- 提交按钮右侧插槽 -->
        <slot name="right">
          <template v-if="config.slots?.right">
            <component :is="config.slots.right" />
          </template>
        </slot>
      </div>
    </a-form>
  </div>

  <!-- 无配置提示 -->
  <div v-else class="custom-form-empty">
    <a-empty description="表单配置为空" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch, provide, onMounted, onUnmounted } from 'vue';
import type { FormInstance } from '../types';
import type { CustomFormProps, CustomFormExpose, FormContext } from '../types';
import { FormFieldType } from './form-config';
import FieldRenderer from './FieldRenderer.vue';

// 简易防抖实现，避免依赖 lodash-es
function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T & { cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | null = null;
  const debounced = ((...args: any[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T & { cancel: () => void };
  debounced.cancel = () => {
    if (timer) { clearTimeout(timer); timer = null; }
  };
  return debounced;
}

// 定义组件属性
const props = withDefaults(defineProps<CustomFormProps>(), {
  layout: 'horizontal',
  showSubmitButton: true,
  submitText: '提交',
  loading: false,
  size: 'middle',
  span: 3,
  gutter: () => [10, { xs: 0, sm: 0, md: 0, lg: 0 }],
  labelCol: () => ({ span: 6 }),
  wrapperCol: () => ({ span: 13 }),
  autoValidate: true,
  debounceValidate: true,
  debounceDelay: 300,
});

// 定义组件事件
const emit = defineEmits<{
  'update:modelValue': [value: Record<string, any>];
  submit: [values: Record<string, any>];
  fieldChange: [fieldKey: string, value: any, field: any];
  fieldBlur: [fieldKey: string, value: any, field: any];
  fieldFocus: [fieldKey: string, value: any, field: any];
  validateSuccess: [values: Record<string, any>];
  validateError: [errors: any];
}>();

// 表单引用
const formRef = ref<FormInstance>();

// 表单数据
const formData = reactive<Record<string, any>>({});

// 字段映射
const fieldMap = reactive(new Map<string, any>());

// 原始数据（用于检查是否修改）
const originalData = ref<Record<string, any>>({});

// 初始化表单数据
const initializeFormData = () => {
  // 清空现有数据
  Object.keys(formData).forEach(key => {
    delete formData[key];
  });

  // 初始化字段映射
  fieldMap.clear();

  if (props.config?.fields) {
    props.config.fields.forEach(field => {
      // 设置字段映射
      fieldMap.set(field.key, field);

      // 初始化字段值
      const initialValue = props.modelValue?.[field.key] ?? getFieldDefaultValue(field);
      formData[field.key] = initialValue;

      // 处理组合字段
      if (field.children) {
        field.children.forEach(childField => {
          const childKey = `${field.key}.${childField.key}`;
          fieldMap.set(childKey, childField);
          formData[childKey] = props.modelValue?.[childKey] ?? getFieldDefaultValue(childField);
        });
      }
    });
  }

  // 保存原始数据
  originalData.value = { ...formData };
};

// 获取字段默认值
const getFieldDefaultValue = (field: any): any => {
  switch (field.type) {
    case FormFieldType.SELECT_OPTIONS:
      return [];
    case FormFieldType.NUMBER:
    case FormFieldType.NUMBER_AMOUNT:
      return 0;
    default:
      return '';
  }
};

// 合并验证规则
const mergedRules = computed(() => {
  const rules: Record<string, any[]> = { ...props.config?.rules };

  // 从字段配置中添加必填规则
  props.config?.fields.forEach(field => {
    if (field.required && field.key) {
      if (!rules[field.key]) {
        rules[field.key] = [];
      }

      // 添加必填规则
      const requiredRule = {
        required: true,
        message: field.message || `${field.label}不能为空`,
        trigger: 'blur',
      };

      // 检查是否已存在必填规则
      const hasRequiredRule = rules[field.key].some(rule => rule.required);
      if (!hasRequiredRule) {
        rules[field.key].unshift(requiredRule);
      }
    }

    // 添加自定义验证器
    if (field.validator) {
      if (!rules[field.key]) {
        rules[field.key] = [];
      }
      rules[field.key].push({
        validator: field.validator,
        trigger: 'blur',
      });
    }
  });

  return rules;
});

// 按钮相关计算属性
const isButtonDisabled = computed(() => {
  return props.buttonStyle?.disabled ?? props.loading;
});

const buttonBlock = computed(() => {
  return props.buttonStyle?.block ?? false;
});

const buttonSize = computed(() => {
  return props.buttonStyle?.size ?? 'default';
});

const buttonStyle = computed(() => {
  return props.buttonStyle?.style ?? {};
});

const submitButtonText = computed(() => {
  return props.config?.buttonStyle?.onSubmit ?? props.submitText;
});

// 获取字段列跨度
const getFieldColSpan = (field: any): number => {
  if (field.colSpan !== undefined) {
    return field.colSpan;
  }
  if (field.block === true) {
    return 24;
  } else {
    return props.config?.span ?? props.span ?? 8;
  }
};

// 字段变化处理
const handleFieldChange = (value: any, field: any) => {
  formData[field.key] = value;
  
  // 触发自定义变化回调
  if (field.onChange) {
    field.onChange(value, field);
  }

  // 触发组件事件
  emit('fieldChange', field.key, value, field);
  emit('update:modelValue', { ...formData });

  // 自动验证
  if (props.autoValidate) {
    if (props.debounceValidate) {
      debouncedValidate(field.key);
    } else {
      validateField(field.key);
    }
  }
};

// 字段失焦处理
const handleFieldBlur = (value: any, field: any) => {
  if (field.onBlur) {
    field.onBlur(value, field);
  }
  emit('fieldBlur', field.key, value, field);
};

// 字段聚焦处理
const handleFieldFocus = (value: any, field: any) => {
  if (field.onFocus) {
    field.onFocus(value, field);
  }
  emit('fieldFocus', field.key, value, field);
};

// 防抖验证函数
const debouncedValidate = debounce((fieldName: string) => {
  validateField(fieldName);
}, props.debounceDelay);

// 验证指定字段
const validateField = async (fieldName: string) => {
  if (!formRef.value) return;
  
  try {
    await formRef.value.validate(fieldName);
  } catch (error) {
    // 验证错误静默处理
    console.debug(`Field ${fieldName} validation error:`, error);
  }
};

// 表单提交处理
const handleSubmit = async () => {
  if (!formRef.value) return;

  try {
    await formRef.value.validate();
    
    // 触发提交事件
    emit('submit', { ...formData });
    emit('validateSuccess', { ...formData });
    
    // 如果有外部提交回调
    if (props.onSubmit) {
      await props.onSubmit({ ...formData });
    }
  } catch (error) {
    console.error('Form validation failed:', error);
    emit('validateError', error);
    console.warn('表单验证失败，请检查输入');
  }
};

// 重置表单
const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields();
    initializeFormData();
  }
};

// 暴露组件方法
defineExpose<CustomFormExpose>({
  formRef,
  formData,
  submit: handleSubmit,
  reset: resetForm,
  validate: async () => {
    if (!formRef.value) throw new Error('Form ref not available');
    return formRef.value.validate();
  },
  validateField: async (fieldNames) => {
    if (!formRef.value) throw new Error('Form ref not available');
    return formRef.value.validate(fieldNames);
  },
  getFieldValue: (fieldName) => formData[fieldName],
  setFieldValue: (fieldName, value) => {
    formData[fieldName] = value;
    emit('update:modelValue', { ...formData });
  },
  setFieldsValue: (values) => {
    Object.assign(formData, values);
    emit('update:modelValue', { ...formData });
  },
  resetField: (fieldName) => {
    if (formRef.value) {
      formRef.value.resetFields(fieldName);
    }
  },
  clearValidate: (fieldName) => {
    if (formRef.value) {
      formRef.value.clearValidate(fieldName);
    }
  },
  isModified: () => {
    return JSON.stringify(formData) !== JSON.stringify(originalData.value);
  },
  getModifiedFields: () => {
    const modifiedFields: string[] = [];
    Object.keys(formData).forEach(key => {
      if (JSON.stringify(formData[key]) !== JSON.stringify(originalData.value[key])) {
        modifiedFields.push(key);
      }
    });
    return modifiedFields;
  },
});

// 提供表单上下文
provide<FormContext>('formContext', {
  config: props.config!,
  formData,
  formRef,
  fieldMap,
  updateFormData: (key, value) => {
    formData[key] = value;
  },
  triggerFieldValidate: validateField,
});

// 监听配置变化
watch(() => props.config, () => {
  initializeFormData();
}, { deep: true });

// 监听外部数据变化
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    Object.assign(formData, newValue);
  }
}, { deep: true });

// 组件生命周期
onMounted(() => {
  initializeFormData();
});

onUnmounted(() => {
  // 清理防抖函数
  debouncedValidate.cancel();
});
</script>

<style scoped lang="less">
.custom-form-wrapper {
  width: 100%;
  
  .custom-form-title {
    margin-bottom: 24px;
    text-align: center;
    
    h3 {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      color: #333;
    }
  }
  
  .form-field-col {
    margin-bottom: 16px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .form-div-slot {
    width: 100%;
    margin-bottom: 16px;
  }
  
  .form-div-placeholder {
    width: 100%;
    height: 1px;
    margin: 16px 0;
  }
  
  .custom-form-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid #f0f0f0;
    
    :deep(.ant-btn) {
      min-width: 120px;
    }
  }
}

.custom-form-empty {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  background-color: #fafafa;
  border-radius: 8px;
  border: 1px dashed #d9d9d9;
}
</style>
