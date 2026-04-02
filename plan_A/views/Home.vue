<template>
  <div class="home-page">
    <h1>Ant Form W 组件测试</h1>
    <p class="desc">自定义表单组件库 — 支持通过 JSON/JS 配置动态渲染表单字段</p>

    <!-- 导航标签 -->
    <a-tabs v-model:activeKey="activeTab" type="card">
      <!-- 1. 基础字段测试 -->
      <a-tab-pane key="basic" tab="基础字段">
        <BasicFields />
      </a-tab-pane>

      <!-- 2. 链式 Builder 测试 -->
      <a-tab-pane key="builder" tab="链式构建器">
        <BuilderDemo />
      </a-tab-pane>

      <!-- 3. 快捷函数测试 -->
      <a-tab-pane key="quick" tab="快捷函数">
        <QuickFunctions />
      </a-tab-pane>

      <!-- 4. 校验测试 -->
      <a-tab-pane key="validate" tab="校验功能">
        <ValidationDemo />
      </a-tab-pane>

      <!-- 5. 编程式操作测试 -->
      <a-tab-pane key="api" tab="编程式 API">
        <ApiDemo />
      </a-tab-pane>

      <!-- 6. 自定义组件 + 插槽 -->
      <a-tab-pane key="slot" tab="插槽 & 自定义">
        <SlotDemo />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import BasicFields from './BasicFields.vue';
import BuilderDemo from './BuilderDemo.vue';
import QuickFunctions from './QuickFunctions.vue';
import ValidationDemo from './ValidationDemo.vue';
import ApiDemo from './ApiDemo.vue';
import SlotDemo from './SlotDemo.vue';

// 国际化注入
provide('formI18n', {
  t: (key) => {
    const map = {
      '姓名': '姓名',
      '手机号': '手机号',
      '邮箱': '邮箱',
      '年龄': '年龄',
      '性别': '性别',
      '学历': '学历',
      '爱好': '爱好',
      '生日': '生日',
      '入职月份': '入职月份',
      '婚否': '婚否',
      '工作状态': '工作状态',
      '经验等级': '经验等级',
      '个人简介': '个人简介',
      '请输入姓名': '请输入姓名',
      '请输入手机号': '请输入手机号',
      '请输入邮箱': '请输入邮箱',
      '请选择性别': '请选择性别',
      '请选择学历': '请选择学历',
      '请选择爱好': '请选择爱好',
      '请选择生日': '请选择生日',
      '请输入个人简介': '请输入个人简介',
    };
    return map[key] || key;
  },
});

// 活动的 tab
const activeTab = ref('basic');
</script>

<style scoped>
.home-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.home-page h1 {
  margin-bottom: 4px;
}

.desc {
  color: #666;
  margin-bottom: 24px;
}

.form-section {
  padding: 20px;
  background: #fafafa;
  border-radius: 8px;
}

.form-section h3 {
  margin-bottom: 20px;
}

.form-section h4 {
  margin: 16px 0 8px;
}

.form-data-preview {
  margin-top: 24px;
  padding: 16px;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
}

.form-data-preview pre {
  margin: 0;
  font-size: 13px;
  color: #333;
  white-space: pre-wrap;
  word-break: break-all;
}

.api-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 16px 0;
}
</style>
