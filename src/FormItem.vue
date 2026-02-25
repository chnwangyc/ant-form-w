<template>
  <a-form-item
    :label="label"
    :name="name"
    :rules="finalRules"
    :required="computedRequired"
    :class="className"
    v-bind="$attrs"
  >
    <slot></slot>
  </a-form-item>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'

// 定义props
const props = defineProps({
  // 标签
  label: {
    type: [String, Object] as PropType<string | VNode>,
    default: undefined
  },
  // 字段名
  name: {
    type: String,
    default: undefined
  },
  // 验证规则
  rules: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  // 是否必填
  required: {
    type: Boolean,
    default: false
  },
  // 自定义样式类名
  className: {
    type: String,
    default: ''
  }
})

// 计算最终的验证规则
const finalRules = computed(() => {
  if (props.required && !props.rules?.some((rule: any) => rule.required)) {
    const requiredRule = {
      required: true,
      message: typeof props.label === 'string' ? `请输入${props.label}` : '此项为必填项'
    }
    return [requiredRule, ...(props.rules || [])]
  }
  return props.rules || []
})

// 计算是否显示必填星号
const computedRequired = computed(() => {
  return props.required || finalRules.value.some((rule: any) => rule.required)
})
</script>

<style scoped>
/* 可以在这里添加自定义样式 */
</style>