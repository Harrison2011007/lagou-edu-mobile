import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

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
    component: () => import(/* webpackChunkName: 'login' */'@/views/learn'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: 'login' */'@/views/user'),
    meta: { requiresAuth: true }
  },
  {
    path: '/course-info/:courseId',
    name: 'course-info',
    component: () => import(/* webpackChunkName: 'course-info' */'@/views/course-info'),
    props: true
  },
  // 课程视频
  {
    path: '/course-info/:lessonId',
    name: 'lesson-video',
    component: () => import(/* webpackChunkName: 'lesson-video' */'@/views/course-info/video'),
    props: true
  },
  // 支付功能
  {
    path: '/pay/:courseId/',
    name: 'pay',
    component: () => import(/* webpackChunkName: 'pay' */'@/views/pay'),
    meta: { requiresAuth: true },
    props: true
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

// 设置到行首尾进行登陆检测和跳转
router.beforeEach((to, from, next) => {
  // 验证to 路由是否需要进行身份验证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user) {
      // 未登录，跳转到登陆页面
      return next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    }
    // 已经登录，允许通过
    next()
  } else {
    next()
  }
})

export default router
