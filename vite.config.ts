import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AntFormW',
      fileName: (format) => {
        if (format === 'es') {
          return 'index.esm.js'
        }
        if (format === 'umd') {
          return 'index.umd.js'
        }
        if (format === 'cjs') {
          return 'index.cjs.js'
        }
        return `index.${format}.js`
      },
      formats: ['es', 'umd', 'cjs']
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'ant-design-vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'ant-design-vue': 'AntDesignVue'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})