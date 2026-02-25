import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// 本地调试用的 Vite 配置，直接引用 ant-form-w 的源码
// 运行方式：npx vite -c plan_A/vite.config.demo.ts

export default defineConfig({
  root: resolve(__dirname), // 明确指定项目根目录为 plan_A
  plugins: [vue()],
  base: '/',
  resolve: {
    alias: {
      // 让 demo 直接引用本地包的源码，而不是 node_modules 中的构建产物
      'ant-form-w': resolve(__dirname, '../src'),
      '@': resolve(__dirname, '../src')
    }
  },
  server: {
    port: 3001, // 指定端口避免冲突
    open: true, // 自动打开浏览器
    historyApiFallback: true // 支持 vue-router history 模式
  }
})
