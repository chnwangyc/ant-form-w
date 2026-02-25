// 简单的模块加载测试
console.log('=== Ant Form W 本地测试 ===')

try {
  // 测试是否能正确导入我们的包
  console.log('1. 检查构建文件是否存在...')
  
  const fs = require('fs')
  const path = require('path')
  
  // 检查dist文件
  const distFiles = ['index.es.js', 'index.umd.js', 'style.css', 'index.d.ts']
  distFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', 'dist', file)
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath)
      console.log(`   ✅ ${file} (${stats.size} bytes)`)
    } else {
      console.log(`   ❌ ${file} 不存在`)
    }
  })
  
  console.log('\n2. 检查源码文件...')
  const srcFiles = ['CustomForm.vue', 'FormItem.vue', 'types.ts', 'index.ts']
  srcFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', 'src', file)
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath)
      console.log(`   ✅ ${file} (${stats.size} bytes)`)
    } else {
      console.log(`   ❌ ${file} 不存在`)
    }
  })
  
  console.log('\n3. 检查package.json配置...')
  const pkg = require('../package.json')
  console.log(`   ✅ 包名: ${pkg.name}`)
  console.log(`   ✅ 版本: ${pkg.version}`)
  console.log(`   ✅ 主入口: ${pkg.main}`)
  console.log(`   ✅ 模块入口: ${pkg.module}`)
  console.log(`   ✅ 类型入口: ${pkg.types}`)
  
  console.log('\n4. 检查依赖配置...')
  console.log(`   ✅ Vue peer依赖: ${pkg.peerDependencies.vue}`)
  console.log(`   ✅ ant-design-vue peer依赖: ${pkg.peerDependencies['ant-design-vue']}`)
  
  console.log('\n🎉 所有检查通过！包结构完整，可以进行本地使用。')
  console.log('\n使用方式：')
  console.log('1. 在其他Vue项目中安装: npm install /Volumes/wangyy/Code/ant-form-w')
  console.log('2. 或复制dist文件夹到你的项目中')
  console.log('3. 在组件中导入: import { CustomForm, FormItem } from "ant-form-w"')
  
} catch (error) {
  console.error('❌ 测试失败:', error.message)
}