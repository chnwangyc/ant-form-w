<template>
  <div id="app">
    <!-- 导航栏 -->
    <a-layout-header class="app-header">
      <div class="header-content">
        <div class="logo">
          <router-link to="/">
            <span class="logo-text">🧪 Ant Form W</span>
          </router-link>
        </div>
        
        <a-menu 
          theme="dark" 
          mode="horizontal" 
          :selected-keys="[route.path]"
          class="nav-menu"
        >
          <a-menu-item key="/">
            <router-link to="/">首页</router-link>
          </a-menu-item>
          <a-menu-item key="/basic">
            <router-link to="/basic">基础表单</router-link>
          </a-menu-item>
          <a-menu-item key="/vertical">
            <router-link to="/vertical">垂直布局</router-link>
          </a-menu-item>
          <a-menu-item key="/complex">
            <router-link to="/complex">复杂表单</router-link>
          </a-menu-item>
          <a-menu-item key="/dynamic">
            <router-link to="/dynamic">动态表单</router-link>
          </a-menu-item>
        </a-menu>
      </div>
    </a-layout-header>

    <!-- 主要内容区域 -->
    <a-layout-content class="app-content">
      <router-view />
    </a-layout-content>

    <!-- 页脚 -->
    <a-layout-footer class="app-footer">
      <div class="footer-content">
        <p>Ant Form W 本地测试项目 - 用于测试 npm 包功能</p>
        <p>本地开发模式 - 组件库路径: ../</p>
      </div>
    </a-layout-footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { Layout, Menu } from 'ant-design-vue'

const { Header, Content, Footer } = Layout

const route = useRoute()
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 24px;
}

.logo {
  margin-right: 48px;
}

.logo-text {
  color: white;
  font-size: 18px;
  font-weight: bold;
}

.nav-menu {
  flex: 1;
  border-bottom: none;
}

.app-content {
  flex: 1;
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.app-footer {
  background: #001529;
  color: white;
  text-align: center;
  padding: 16px;
}

.footer-content p {
  margin: 4px 0;
  font-size: 14px;
  opacity: 0.8;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-content {
    padding: 0 16px;
    flex-wrap: wrap;
  }
  
  .logo {
    margin-right: 24px;
  }
  
  .app-content {
    padding: 16px;
  }
  
  .nav-menu {
    font-size: 14px;
  }
}
</style>