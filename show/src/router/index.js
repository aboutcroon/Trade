import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
import { getSaveToken } from '@/api/token.js'
import Layout from '@/layout/index.vue'
import userLayout from '@/layout/user.vue'
import Pages from './page.js'
import User from './user.js'

Vue.use(VueRouter)

const tokenName = process.env.VUE_APP_TOKENNAME

const routes = [
  {
    path: '/',
    component: Layout,
    children: Pages
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'Login',
    meta: {
      title: '登录',
      account: true,
    }
  },
  {
    path: '/register',
    component: () => import('@/views/register/index.vue'),
    name: 'register',
    meta: {
      title: '注册',
      account: true,
    }
  },
  {
    path: '/password',
    component: () => import('@/views/password/index.vue'),
    name: 'password',
    meta: {
      title: '找回密码',
      account: true,
    },
  },
  {
    path: '/user',
    component: userLayout,
    children: User,
    meta: {
      title: '用户页',
      requireAuth: true,
    }
  },
  {
    path: '*',
    component: () => import('@/layout/404.vue'),
    name: '404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  /* 设置跳转路由后回到顶部 */
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

router.beforeEach(async (to, from, next) => {
  /* 是否存在 token */
  const token = getSaveToken(tokenName)
  /* 是否需要权限 */
  const authority = to.matched.some(record => record.meta.requireAuth)
  if (token) {
    if (authority) {
      /* 如果存在token，先请求token获取用户信息，获取成功再跳转 */
      if (store.state.auth) {
        /* 登陆成功 */
        store.commit('setToken', store.state.token)
        loginSucces(to, next, store.state)
      } else {
        /* 如果未登录，则等待请求登录信息 */
        try {
          const data = await store.dispatch('getUserInfo')
          if (data && data.code && data.code === '200' || data.code === 200) {
            /* 登录成功 */
            loginSucces(to, next, store.state)
          } else {
            /* 登录失败 */
            next({ name: 'Login' })
          }
        } catch (err) {
          /* 登录接口错误 */
          next({ name: 'Login' })
        }
      }
    } else {
      /* 不需要权限的路由，直接跳转 */
      next()
    }
  } else {
    /* 如果不存在 token，说明未登录，禁止跳转权限页面 */
    if (authority) {
      next({ name: 'Login' })
    } else {
      next()
    }
  }
})

/* 登陆成功 */
function loginSucces(to, next, state) {
  const roleType = state.userinfo.roleType
  const accountStatus = to.matched.some(record => record.meta.account)
  /* 登录后禁止跳转账户登录相关页面 */
  if (accountStatus) {
    next({ name: 'userControl' })
  } else {
    if (roleType === 5 || roleType === 4) {
      /* 普通用户 */
      authorityFn(to, next, 'user')
    } else if (roleType === 3 || roleType === 2) {
      /* 评审用户 */
      authorityFn(to, next, 'judge')
    }
  }
}

function authorityFn(to, next, type) {
  const active = to.matched.some(record => record.meta.role && record.meta.role.indexOf(type) > -1)
  if (active) {
    next()
  } else {
    next({ name: 'userControl' })
  }
}

export default router
