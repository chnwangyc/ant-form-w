import { createRouter, createWebHistory } from 'vue-router'
import BasicFormTest from '../pages/BasicFormTest.vue'
import VerticalFormTest from '../pages/VerticalFormTest.vue'
import ComplexFormTest from '../pages/ComplexFormTest.vue'
import DynamicFormTest from '../pages/DynamicFormTest.vue'
import Home from '../pages/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Ant Form W - 测试首页' }
  },
  {
    path: '/basic',
    name: 'BasicForm',
    component: BasicFormTest,
    meta: { title: '基础表单测试' }
  },
  {
    path: '/vertical',
    name: 'VerticalForm',
    component: VerticalFormTest,
    meta: { title: '垂直布局测试' }
  },
  {
    path: '/complex',
    name: 'ComplexForm',
    component: ComplexFormTest,
    meta: { title: '复杂表单测试' }
  },
  {
    path: '/dynamic',
    name: 'DynamicForm',
    component: DynamicFormTest,
    meta: { title: '动态表单测试' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 路由守卫 - 设置页面标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router