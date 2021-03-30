import Vue from 'vue'
import VueRouter from 'vue-router'

// course组件常用，不采用懒加载的方式
import Course from '@/views/course'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */'@/views/login')
  },
  {
    path: '/',
    name: 'course',
    component: Course
  },
  {
    path: '/learn',
    name: 'learn',
    component: () => import(/* webpackChunkName: 'login' */'@/views/learn')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: 'login' */'@/views/user')
  },
  // 错误页面
  {
    path: '*',
    name: 'error-page',
    component: () => import(/* webpackChunkName: 'login' */'@/views/error-page')
  }

]

const router = new VueRouter({
  routes
})

export default router
