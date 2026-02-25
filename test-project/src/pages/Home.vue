<template>
  <div class="home">
    <header class="home-header">
      <h1>🧪 Ant Form W - 本地测试项目</h1>
      <p>基于Vue3和ant-design-vue的自定义表单组件库测试平台</p>
    </header>

    <main class="home-content">
      <div class="intro-section">
        <a-alert
          message="项目说明"
          description="这是一个用于本地测试 ant-form-w npm 包的完整项目。您可以分别测试不同场景下的表单功能。"
          type="info"
          show-icon
          style="margin-bottom: 24px"
        />
      </div>

      <div class="features-section">
        <h2>🚀 功能特性</h2>
        <a-row :gutter="24">
          <a-col :xs="24" :sm="12" :lg="8">
            <a-card hoverable class="feature-card">
              <template #cover>
                <div class="feature-icon">📝</div>
              </template>
              <a-card-meta title="基础表单">
                <template #description>
                  测试基本的表单功能，包括文本输入、数字输入、必填验证等
                </template>
              </a-card-meta>
            </a-card>
          </a-col>
          
          <a-col :xs="24" :sm="12" :lg="8">
            <a-card hoverable class="feature-card">
              <template #cover>
                <div class="feature-icon">📐</div>
              </template>
              <a-card-meta title="布局切换">
                <template #description>
                  测试水平布局和垂直布局，验证不同布局下的显示效果
                </template>
              </a-card-meta>
            </a-card>
          </a-col>

          <a-col :xs="24" :sm="12" :lg="8">
            <a-card hoverable class="feature-card">
              <template #cover>
                <div class="feature-icon">🔧</div>
              </template>
              <a-card-meta title="复杂表单">
                <template #description>
                  测试复杂场景，包括栅格布局、日期选择器、多选框等
                </template>
              </a-card-meta>
            </a-card>
          </a-col>

          <a-col :xs="24" :sm="12" :lg="8">
            <a-card hoverable class="feature-card">
              <template #cover>
                <div class="feature-icon">⚡</div>
              </template>
              <a-card-meta title="动态表单">
                <template #description>
                  测试动态添加/删除表单项，验证表单的动态变化能力
                </template>
              </a-card-meta>
            </a-card>
          </a-col>

          <a-col :xs="24" :sm="12" :lg="8">
            <a-card hoverable class="feature-card">
              <template #cover>
                <div class="feature-icon">🔍</div>
              </template>
              <a-card-meta title="字段验证">
                <template #description>
                  测试单个字段验证、全部验证、条件验证等高级功能
                </template>
              </a-card-meta>
            </a-card>
          </a-col>

          <a-col :xs="24" :sm="12" :lg="8">
            <a-card hoverable class="feature-card">
              <template #cover>
                <div class="feature-icon">🎯</div>
              </template>
              <a-card-meta title="事件处理">
                <template #description>
                  测试表单提交、失败、值变化等各种事件的处理
                </template>
              </a-card-meta>
            </a-card>
          </a-col>
        </a-row>
      </div>

      <div class="navigation-section">
        <h2>🧭 快速导航</h2>
        <a-space direction="vertical" size="large" style="width: 100%">
          <a-card class="nav-card">
            <a-descriptions title="测试页面导航" :column="1">
              <a-descriptions-item label="基础表单测试">
                <a-space>
                  <a-tag color="blue">路径: /basic</a-tag>
                  <a-button type="primary" @click="goToRoute('/basic')">进入测试</a-button>
                </a-space>
              </a-descriptions-item>
              
              <a-descriptions-item label="垂直布局测试">
                <a-space>
                  <a-tag color="green">路径: /vertical</a-tag>
                  <a-button type="primary" @click="goToRoute('/vertical')">进入测试</a-button>
                </a-space>
              </a-descriptions-item>

              <a-descriptions-item label="复杂表单测试">
                <a-space>
                  <a-tag color="orange">路径: /complex</a-tag>
                  <a-button type="primary" @click="goToRoute('/complex')">进入测试</a-button>
                </a-space>
              </a-descriptions-item>

              <a-descriptions-item label="动态表单测试">
                <a-space>
                  <a-tag color="purple">路径: /dynamic</a-tag>
                  <a-button type="primary" @click="goToRoute('/dynamic')">进入测试</a-button>
                </a-space>
              </a-descriptions-item>
            </a-descriptions>
          </a-card>
        </a-space>
      </div>

      <div class="usage-section">
        <a-collapse ghost>
          <a-collapse-panel key="1" header="📖 使用说明">
            <a-steps :current="currentStep" :items="stepItems" />
            
            <a-divider />

            <a-alert
              message="本地开发提示"
              description="确保主项目 ant-form-w 已经构建完成（npm run build），这样测试项目才能正确引用本地包。"
              type="warning"
              show-icon
              style="margin-top: 16px"
            />
          </a-collapse-panel>
        </a-collapse>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const currentStep = ref(0)

const stepItems = ref([
  {
    title: '构建组件库',
    description: '在主项目中运行 npm run build 构建组件库'
  },
  {
    title: '启动测试项目',
    description: '在测试项目中运行 npm run dev 启动开发服务器'
  },
  {
    title: '访问测试页面',
    description: '通过左侧导航或上方按钮访问不同的测试页面'
  },
  {
    title: '调试和测试',
    description: '在各个页面中测试表单功能和验证组件行为'
  }
])

const goToRoute = (path) => {
  router.push(path)
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.home-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
}

.home-header h1 {
  margin: 0 0 16px 0;
  font-size: 2.5rem;
  font-weight: 600;
}

.home-header p {
  margin: 0;
  font-size: 1.1rem;
  opacity: 0.9;
}

.features-section,
.navigation-section,
.usage-section {
  margin-bottom: 48px;
}

.features-section h2,
.navigation-section h2,
.usage-section h2 {
  margin-bottom: 24px;
  color: #262626;
  font-size: 1.8rem;
  font-weight: 600;
  border-left: 4px solid #1890ff;
  padding-left: 16px;
}

.feature-card {
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.feature-icon {
  font-size: 3rem;
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.nav-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.intro-section {
  margin-bottom: 32px;
}

@media (max-width: 768px) {
  .home {
    padding: 16px;
  }
  
  .home-header {
    padding: 24px 16px;
  }
  
  .home-header h1 {
    font-size: 2rem;
  }
  
  .features-section h2,
  .navigation-section h2,
  .usage-section h2 {
    font-size: 1.5rem;
  }
}
</style>