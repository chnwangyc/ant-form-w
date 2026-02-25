<template>
  <div class="custom-form-wrapper">
    <a-form
      :model="formData"
      :layout="layout"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :rules="rules"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
      @values-change="handleValuesChange"
      :class="['custom-form', `custom-form-${layout}`, className]"
      ref="formRef"
      :scrollToFirstError="true"
    >
      <!-- 动态表单内容插槽 -->
      <slot></slot>
      <ItemString></ItemString>
      
      <!-- 提交按钮区域 -->
      <a-form-item v-if="showSubmitButton" :wrapper-col="submitBtnWrapperCol">
        <div class="custom-form-actions">
          <slot name="actions">
            <a-button 
              type="primary" 
              html-type="submit"
              :loading="loading"
              class="custom-form-submit-btn"
              :size="buttonSize"
            >
              {{ submitText }}
            </a-button>
          </slot>
          
          <!-- 左侧操作插槽 -->
          <slot name="actions-left"></slot>
          
          <!-- 右侧操作插槽 -->
          <slot name="actions-right"></slot>
        </div>
      </a-form-item>
    </a-form>
    
    <!-- 额外内容插槽 -->
    <slot name="extra"></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch, nextTick } from 'vue'
import { FormInstance, message, type FormRule } from 'ant-design-vue'
import { CustomFormProps } from './types'
import ItemString from './components/ItemString.vue'

// 定义props
interface Props extends CustomFormProps {
  loading?: boolean
  rules?: Record<string, FormRule[]>
  model?: Record<string, any>
  buttonSize?: 'small' | 'middle' | 'large'
  showActions?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  layout: 'horizontal',
  showSubmitButton: true,
  showActions: true,
  submitText: '提交',
  loading: false,
  buttonSize: 'middle'
})

// 定义emits - 扩展更多事件
const emit = defineEmits<{
  (e: 'finish', values: any): void
  (e: 'finishFailed', errorInfo: any): void
  (e: 'validateField', field: string, error: any): void
  (e: 'reset', values: any): void
  (e: 'valuesChange', changedValues: any, allValues: any): void
}>()

// Refs
const formRef = ref<FormInstance>()

// 响应式数据
const formData = reactive<Record<string, any>>({})

// 内部表单数据模型
const innerModel = ref<Record<string, any>>({})

// 监听外部model变化
watch(() => props.model, (newModel) => {
  if (newModel) {
    Object.assign(innerModel.value, newModel)
  }
}, { immediate: true, deep: true })

// 表单值变化监听
const handleValuesChange = (changedValues: any, allValues: any): void => {
  emit('valuesChange', changedValues, allValues)
  
  // 自动更新formData
  Object.assign(formData, allValues)
}

// 表单验证工具方法
const validateField = async (field: string) => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validateFields([field])
    emit('validateField', field, null)
    return { success: true, errors: null }
  } catch (error) {
    emit('validateField', field, error)
    return { success: false, errors: error }
  }
}

// 批量验证
const validateFields = async (fields?: string[]) => {
  if (!formRef.value) return { success: false, errors: [] }
  
  try {
    const values = await formRef.value.validateFields(fields)
    return { success: true, values, errors: null }
  } catch (error) {
    return { success: false, values: null, errors: error }
  }
}

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
  
  // 成功提示
  if (!props.loading) {
    message.success('提交成功')
  }
}

const handleFinishFailed = (errorInfo: any) => {
  emit('finishFailed', errorInfo)
  
  // 错误提示
  if (!props.loading) {
    message.error('请检查表单填写是否正确')
  }
}

// 重置表单
const handleReset = () => {
  formRef.value?.resetFields()
  emit('reset', formData)
  message.info('表单已重置')
}

// 清除指定字段验证
const clearValidate = (fields?: string[]) => {
  formRef.value?.clearValidate(fields)
}

// 滚动到第一个错误字段
const scrollToField = (field: string) => {
  nextTick(() => {
    const element = document.querySelector(`[name="${field}"]`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  })
}

// 表单提交方法（供外部调用）
const submit = () => {
  formRef.value?.validateFields()
}

// 获取表单实例
const getFormInstance = (): FormInstance | undefined => {
  return formRef.value
}

// 暴露方法给父组件
defineExpose({
  formRef,
  validate: () => formRef.value?.validate(),
  resetFields: handleReset,
  clearValidate,
  validateField,
  validateFields,
  submit,
  getFormInstance,
  scrollToField,
  // 表单数据访问
  getValues: () => ({ ...formData }),
  setValues: (values: Record<string, any>) => {
    Object.assign(formData, values)
    Object.assign(innerModel.value, values)
  }
})
</script>

<style scoped>
.custom-form-wrapper {
  width: 100%;
}

.custom-form {
  width: 100%;
}

/* 操作按钮区域 */
.custom-form-actions {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

/* 水平布局按钮样式 */
.custom-form-horizontal .custom-form-actions {
  justify-content: flex-start;
}

.custom-form-horizontal .custom-form-submit-btn {
  min-width: 120px;
}

/* 垂直布局按钮样式 */
.custom-form-vertical .custom-form-actions {
  flex-direction: column;
  align-items: stretch;
}

.custom-form-vertical .custom-form-submit-btn {
  width: 100%;
  margin-top: 16px;
}

/* 内联布局按钮样式 */
.custom-form-inline .custom-form-submit-btn {
  margin-left: 8px;
}

/* 主按钮样式 */
.custom-form-submit-btn {
  background-color: #1890ff;
  border-color: #1890ff;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
  min-width: 100px;
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

.custom-form-submit-btn:disabled {
  background-color: #f5f5f5;
  border-color: #d9d9d9;
  color: rgba(0, 0, 0, 0.25);
  cursor: not-allowed;
}

/* 加载状态按钮 */
.custom-form-submit-btn[type="primary"][loading] {
  pointer-events: none;
}

/* 响应式适配 */
@media (max-width: 768px) {
  .custom-form-actions {
    flex-direction: column;
    width: 100%;
  }
  
  /* 注释掉未使用的选择器，避免lint警告 */
  /* .custom-form-actions :deep(.ant-btn) {
    width: 100%;
    margin-left: 0 !important;
  } */
  
  .custom-form-horizontal .custom-form-actions {
    justify-content: stretch;
  }
}

/* 暗色主题适配 */
@media (prefers-color-scheme: dark) {
  .custom-form-submit-btn:disabled {
    background-color: #434343;
    border-color: #555555;
    color: rgba(255, 255, 255, 0.25);
  }
}
</style>
