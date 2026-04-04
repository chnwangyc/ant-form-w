<template>
  <div>
    <a-form
      :colon="colon"
      :disabled="disabled"
      :validate-trigger="validateTrigger"
      class="w-border-box"
    >
      <a-row :gutter="gutter">
        <a-col :md="12" :lg="12">
          <a-row
            :gutter="[10, 10]"
            :wrap="false"
            :class="bordered ? 'w-form-row' : ''"
            style="height: 100%"
          >
            <a-col :span="labelCol" :class="bordered ? 'w-label-class' : ''">Fail</a-col>
            <a-col :span="wrapperCol" :class="bordered ? 'w-content-class' : ''"
              ><a-form-item validate-status="error">
                <template #label v-if="!bordered">Fail</template>
                <template #extra>extra</template>
                <template #help
                  >Should be combination of numbers & alphabets</template
                >
                <a-input
                  id="error"
                  placeholder="unavailable choice"
                /> </a-form-item
            ></a-col>
          </a-row>
        </a-col>
        <a-col :md="12" :lg="12">
          <a-row
            :gutter="[10, 10]"
            :wrap="false"
            :class="bordered ? 'w-form-row' : ''"
            style="height: 100%"
          >
            <a-col :span="labelCol" :class="bordered ? 'w-label-class' : ''">Warning</a-col>
            <a-col :span="wrapperCol" :class="bordered ? 'w-content-class' : ''">
              <a-form-item validate-status="warning">
                <template #label v-if="!bordered">Warning</template>
                <a-input id="warning" placeholder="Warning"> </a-input>
              </a-form-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col :md="12" :lg="12">
          <a-row
            :gutter="[10, 10]"
            :wrap="false"
            :class="bordered ? 'w-form-row' : ''"
            style="height: 100%"
          >
            <a-col :span="labelCol" :class="bordered ? 'w-label-class' : ''"
              >Validating{{ labelCol }}</a-col
            >
            <a-col :span="wrapperCol" :class="bordered ? 'w-content-class' : ''">
              <a-form-item
                has-feedback
                validate-status="validating"
                help="The information is being validated..."
              >
                <template #label v-if="!bordered">Validating</template>
                <a-input
                  id="validating"
                  placeholder="I'm content is being validated"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import type { Rule } from "ant-design-vue/es/form";

interface WFormProps {
  /** 栅格间隔，单位 px，支持对象响应式写法 */
  gutter?: number | number[] | { [key: string]: number } | [number, number];
  /** 表示 label 的 col 配置 */
  labelCol?: number | string;
  /** 表示 wrapper 的 col 配置 */
  wrapperCol?: number | string;
  /** 配置 label 的后缀 */
  colon?: boolean;
  /** 设禁用所有表单控件 */
  disabled?: boolean;
  /** 统一设置表单控件校验触发时机 */
  validateTrigger?: string | string[];
  /** 表单验证规则 */
  rules?: Record<string, Rule[]>;
  bordered: boolean;
}

const props = withDefaults(defineProps<WFormProps>(), {
  gutter: () => [10, 10],
  labelCol: 6,
  wrapperCol: 18,
  colon: false,
  disabled: false,
  validateTrigger: "change",
  rules: () => ({}),
  bordered: false,
});
</script>
<style lang="less">
.w-border-box {
  .w-form-row {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      width: 1px;
      background-color: #bb133e;
      height: 100%;
      left: 0;
      bottom: 0;
      margin-left: -1px;
    }
  }
  .w-label-class {
    padding-top: 8px;
    line-height: 32px;
    text-align: right;
    margin-top: -1px;
    position: relative;
    background: #f5f5f5;
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      background-color: #bb133e;
      height: 1px;
      left: 0;
      bottom: 0;
    }
    &::before {
      content: "";
      position: absolute;
      width: 100%;
      background-color: #bb133e;
      height: 1px;
      left: 0;
      top: 0;
    }
  }
  .w-content-class {
    padding-top: 8px;
    border-right: 1px solid #bb133e;
    position: relative;
    margin-top: -1px;
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      background-color: #bb133e;
      height: 1px;
      left: 0;
      bottom: 0;
    }
    &::before {
      content: "";
      position: absolute;
      width: 100%;
      background-color: #bb133e;
      height: 1px;
      left: 0;
      top: 0;
    }
  }
}
</style>
