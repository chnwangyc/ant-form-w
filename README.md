# ant-form-w

基于Vue3和ant-design-vue的自定义表单组件库

## 安装

```bash
npm install ant-form-w
# 或
yarn add ant-form-w
```

## 特性

- 基于 Vue3 Composition API
- 支持 TypeScript
- 支持 CommonJS、ES Module 和 UMD
- 基于 ant-design-vue 4.x
- 内置样式优化
- 支持表单验证
- 支持 Volar 类型检查

## 使用前提

确保项目中已安装 Vue3 和 ant-design-vue：

```bash
npm install vue@^3.3.0 ant-design-vue@^4.0.0
```

## 快速开始

### 全局注册

```ts
// main.ts
import { createApp } from 'vue'
import AntFormW from 'ant-form-w'
import 'ant-design-vue/dist/reset.css'
import App from './App.vue'

const app = createApp(App)
app.use(AntFormW)
app.mount('#app')
```

### 局部注册

```vue
<template>
  <CustomForm
    :model="formData"
    layout="vertical"
    @finish="handleFinish"
    submit-text="保存"
  >
    <FormItem
      label="用户名"
      name="username"
      :rules="[{ required: true, message: '请输入用户名' }]"
    >
      <a-input v-model:value="formData.username" placeholder="请输入用户名" />
    </FormItem>

    <FormItem
      label="邮箱"
      name="email"
      :rules="[{ type: 'email', message: '请输入正确的邮箱格式' }]"
    >
      <a-input v-model:value="formData.email" placeholder="请输入邮箱" />
    </FormItem>
  </CustomForm>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { CustomForm, FormItem } from 'ant-form-w'

const formData = reactive({
  username: '',
  email: ''
})

const handleFinish = (values: any) => {
  console.log('表单数据:', values)
}
</script>
```

## API

### CustomForm Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| modelValue | Record<string, any> | - | 表单数据 (v-model) |
| layout | 'horizontal' | 'vertical' | 'inline' | 'horizontal' | 表单布局 |
| showSubmitButton | boolean | true | 是否显示提交按钮 |
| submitText | string | '提交' | 提交按钮文本 |
| className | string | - | 自定义样式类名 |
| loading | boolean | false | 加载状态 |

### CustomForm Events

| 事件名 | 参数 | 描述 |
|-------|------|------|
| finish | (values: any) | 表单验证成功时触发 |
| finishFailed | (errorInfo: any) | 表单验证失败时触发 |

### FormItem Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| label | string | VNode | - | 标签 |
| name | string | - | 字段名 |
| rules | any[] | [] | 验证规则 |
| required | boolean | false | 是否必填 |

## 开发

```bash
# 安装依赖
npm install

# 构建
npm run build

# 监听模式构建
npm run dev
```

## 许可证

MIT