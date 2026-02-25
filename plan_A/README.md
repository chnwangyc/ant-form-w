# Ant Form W 本地调试与测试说明

本项目用于本地实时预览和调试 `ant-form-w` npm 包中的组件。

## 目录结构

```
plan_A/
├── index.html           # 页面入口
├── main.js              # Vue 初始化入口
├── App.vue              # 根组件，含路由视图
├── views/
│   └── Home.vue         # 默认 Home 页面
├── router/
│   └── index.js         # 路由配置
├── vite.config.demo.ts  # 本地调试用 Vite 配置
└── README.md            # 本说明文档
```

## 前置条件

- 已安装 Node.js 与 npm
- 项目根目录 `/Volumes/wangyy/Code/ant-form-w` 已执行 `npm install` 安装依赖
- 已安装 `vue-router`（若未安装会自动提示执行安装命令）

## 启动步骤

1. **安装依赖（首次）**  
   在项目根目录执行：
   ```bash
   npm install
   npm install vue-router@^4
   ```

2. **启动本地调试服务**  
   在项目根目录执行：
   ```bash
   npx vite -c plan_A/vite.config.demo.ts
   ```
   - 服务默认运行在 **http://localhost:3001/**
   - 会自动打开浏览器

3. **访问页面**  
   浏览器打开 [http://localhost:3001/](http://localhost:3001/) 即可看到默认的 Home 页面。

## 调试组件

- 在 `views/Home.vue` 或新建的视图组件中引入 `ant-form-w` 包内的组件：
  ```js
  // 引用本地源码（推荐，实时生效）
  import SomeComp from 'ant-form-w'
  // 或指定具体路径
  import SomeComp from '../../src/components/SomeComp.vue'
  ```
- 保存文件后，Vite 会热更新，浏览器即时反映改动。

## 添加更多页面

1. 在 `views/` 新建 `.vue` 文件，例如 `Test.vue`
2. 在 `router/index.js` 中添加路由：
   ```js
   {
     path: '/test',
     name: 'Test',
     component: () => import('../views/Test.vue')
   }
   ```
3. 访问 [http://localhost:3001/test](http://localhost:3001/test) 即可预览

## 常见问题

- **404 错误**  
  确保访问的是根路径 `/` 或已配置的路由，不要直接访问不存在的路径如 `/Home`（除非配置重定向）。
- **端口占用**  
  可修改 `vite.config.demo.ts` 中的 `server.port` 更换端口。
- **历史模式路由失效**  
  配置已启用 `historyApiFallback: true`，支持刷新直接访问路由。

## 注意事项

- 本调试服务仅用于开发环境，不要用于生产。
- 修改 `src/` 中的组件代码会实时反映到 demo 中，无需重新构建 npm 包。
