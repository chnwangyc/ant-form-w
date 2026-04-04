<template>
  <div class="home-page">
    <WFormDemo />
  </div>
</template>

<script setup>
import WFormDemo from './WFormDemo.vue';
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
