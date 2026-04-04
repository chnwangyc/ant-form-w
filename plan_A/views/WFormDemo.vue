<template>
  <div class="wform-demo">
    <h1>WForm 组件调试</h1>
    <p class="desc">简化版表单组件 — 基于 ant-design-vue Form 封装</p>

    <!-- Props 控制面板 -->
    <a-card title="Props 配置控制" style="margin-bottom: 24px">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-form-item label="gutter">
            <a-input-number
              v-model:value="gutter"
              :min="0"
              :max="48"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="colon">
            <a-switch v-model:checked="colon" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="disabled">
            <a-switch v-model:checked="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="labelCol span">
            <a-input-number
              v-model:value="labelColSpan"
              :min="1"
              :max="24"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="wrapperCol span">
            <a-input-number
              v-model:value="wrapperColSpan"
              :min="1"
              :max="24"
              style="width: 100%"
              block
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="validateTrigger">
            <a-select v-model:value="validateTrigger" style="width: 100%">
              <a-select-option value="change">change</a-select-option>
              <a-select-option value="blur">blur</a-select-option>
              <a-select-option value="['change', 'blur']"
                >change & blur</a-select-option
              >
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
    </a-card>

    <!-- WForm 组件展示 -->
    <a-card title="WForm 组件展示">
      <w-form
        :gutter="gutter"
        :colon="colon"
        :bordered="bordered"
        :disabled="disabled"
        :label-col="labelColSpan"
        :wrapper-col="wrapperColSpan"
        :validate-trigger="validateTrigger"
      />
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import WForm from "@/components/w-form.vue";

// Props 状态
const gutter = ref([10, 0]);
const colon = ref(false);
const bordered = ref(true);
const disabled = ref(false);
const labelColSpan = ref(6);
const wrapperColSpan = ref(18);
const validateTrigger = ref("change");
</script>

<style scoped>
.wform-demo {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.wform-demo h1 {
  margin-bottom: 4px;
}

.desc {
  color: #666;
  margin-bottom: 24px;
}
</style>
