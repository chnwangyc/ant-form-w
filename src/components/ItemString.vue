<template>
  <a-form-item
    v-if="record.type === 'string_new'"
    :key="'string' + index"
    :label-col="{ span: labelCol }"
    :name="record.key"
    :wrapper-col="{ span: wrapperCol }"
    class="mb-0"
  >
    <template #label>
      <b v-if="record.active == true" class="update-form-list-label-active">*</b>
      <span :class="size ===  'large' ? 'pt-5' : ''">{{ $t(record.label) }}</span>
      <span v-if="colon">:</span>
    </template>
    <template #help>
      {{ record.help || '' }}
    </template>
    <template #extra>
      <CheckCircleTwoTone
        v-if="filterExtra(record.extra) == 'success'"
        twoToneColor="#bb133e"
      />
      <CloseCircleTwoTone
        v-if="filterExtra(record.extra) == 'fail'"
        twoToneColor="#bb133e"
      />
      {{ record.extra ? $t(record.extra) : '' }}
    </template>
    <a-input
      :value="modelFormList[record.key]"
      :disabled="record.disabled"
      :maxlength="filterInputMaxLength(record)"
      :placeholder="$t(record.message)"
      :prefix="record.prefix || ''"
      :size="size"
      :suffix="record.suffix || ''"
      @update:value="handleInputChange"
      @change="handleInputChange"
    ></a-input>
  </a-form-item>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons-vue'

// 定义props
const props = defineProps({
  // 表单项记录
  record: {
    type: Object,
    required: true
  },
  // 索引
  index: {
    type: Number,
    required: true
  },
  // 表单数据模型
  modelFormList: {
    type: Object,
    required: true
  },
  // 标签列配置
  labelCol: {
    type: Number,
    default: 6
  },
  // 包装列配置
  wrapperCol: {
    type: Number,
    default: 18
  },
  // 尺寸
  size: {
    type: String,
    default: 'default'
  },
  // 是否显示冒号
  colon: {
    type: Boolean,
    default: true
  }
})

// 定义emits
const emit = defineEmits<{
  (e: 'update:modelFormList', value: Record<string, any>): void
  (e: 'change', key: string, value: any, index: number): void
}>()

// 处理输入变化
const handleInputChange = (value: any) => {
  // 创建新的表单数据对象，避免直接修改props
  const newModelFormList = { ...props.modelFormList }
  newModelFormList[props.record.key] = value
  
  // 发射更新事件给父组件
  emit('update:modelFormList', newModelFormList)
  emit('change', props.record.key, value, props.index)
}

// 过滤额外信息状态
const filterExtra = (extra: string): string => {
  if (!extra) return ''
  // 这里可以根据具体的业务逻辑来过滤和判断extra的状态
  // 示例逻辑，实际使用时需要根据具体需求调整
  if (extra.toLowerCase().includes('success') || extra.toLowerCase().includes('成功')) {
    return 'success'
  } else if (extra.toLowerCase().includes('fail') || extra.toLowerCase().includes('失败')) {
    return 'fail'
  }
  return ''
}

// 过滤输入框最大长度
const filterInputMaxLength = (record: any): number | undefined => {
  if (!record.maxlength) return undefined
  const maxlength = parseInt(record.maxlength)
  return isNaN(maxlength) ? undefined : maxlength
}
</script>

<style scoped>
.mb-0 {
  margin-bottom: 0;
}

.update-form-list-label-active {
  color: #ff4d4f;
}
</style>
