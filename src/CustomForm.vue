<template>
  <a-form
    :model="formData"
    :layout="layout"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed"
    :class="['custom-form', `custom-form-${layout}`, className]"
    ref="formRef"
  >
    <slot></slot>
    
    <a-form-item v-if="showSubmitButton" :wrapper-col="submitBtnWrapperCol">
      <a-button 
        type="primary" 
        html-type="submit"
        :loading="loading"
        class="custom-form-submit-btn"
      >
        {{ submitText }}
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { FormInstance } from 'ant-design-vue'
import type { FormProps } from 'ant-design-vue'
import { CustomFormProps } from './types'

// 定义props
interface Props extends CustomFormProps {
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  layout: 'horizontal',
  showSubmitButton: true,
  submitText: '提交',
  loading: false
})

// 定义emits
const emit = defineEmits<{
  finish: [values: any]
  finishFailed: [errorInfo: any]
}>()

// Refs
const formRef = ref<FormInstance>()

// 响应式数据
const formData = reactive<Record<string, any>>({})

// 计算属性
const labelCol = computed(() => {
  if (props.layout === 'vertical') {
    return { span: 24 }
  }
  return { span: 6 }
})

const wrapperCol = computed(() => {
  if (props.layout === 'vertical') {
    return { span: 24 }
  }
  return { span: 14 }
})

const submitBtnWrapperCol = computed(() => {
  if (props.layout === 'vertical') {
    return { span: 24, offset: 0 }
  }
  return { span: 14, offset: 6 }
})

// 方法
const handleFinish = (values: any) => {
  emit('finish', values)
  props.onSubmit?.(values)
}

const handleFinishFailed = (errorInfo: any) => {
  emit('finishFailed', errorInfo)
}

// 暴露方法给父组件
defineExpose({
  formRef,
  validate: () => formRef.value?.validate(),
  resetFields: () => formRef.value?.resetFields(),
  clearValidate: () => formRef.value?.clearValidate()
})
</script>

<style scoped>
.custom-form {
  width: 100%;
}

.custom-form-horizontal .custom-form-submit-btn {
  min-width: 120px;
}

.custom-form-vertical .custom-form-submit-btn {
  width: 100%;
  margin-top: 16px;
}

.custom-form-inline .custom-form-submit-btn {
  margin-left: 8px;
}

.custom-form-submit-btn {
  background-color: #1890ff;
  border-color: #1890ff;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.custom-form-submit-btn:hover {
  background-color: #40a9ff;
  border-color: #40a9ff;
}

.custom-form-submit-btn:active {
  background-color: #096dd9;
  border-color: #096dd9;
}

.custom-form-submit-btn[type="primary"]:not(:disabled):hover {
  background-color: #40a9ff;
  border-color: #40a9ff;
}
</style>