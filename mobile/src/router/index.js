import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        redirect: '/home'
      },
      {
        path: '/home',  // 首页，activePage: 1
        component: () => import('@/views/home/home'),
        name: 'home',
      },
      {
        path: '/competition', // 第四届大赛，activePage: 2
        component: () => import('@/views/competition/competition'),
        name: 'competition',
      },
      {
        path: '/sample',  // 作品展示厅，activePage: 3
        component: () => import('@/views/sample/sample'),
        name: 'sample',
      },
      {
        path: '/newsCenter',  // 新闻中心，activePage: 4
        component: () => import('@/views/newsCenter/newsCenter'),
        name: 'newsCenter',
      },

      {
        path: '/home/allNews',  // 首页->全部新闻，activePage: 6
        component: () => import('@/views/newsCenter/allNews'),
        name: 'homeAllNews',
      },
      {
        path: '/newsCenter/allNews',  // 新闻中心->全部新闻，activePage: 7
        component: () => import('@/views/newsCenter/allNews'),
        name: 'centerAllNews',
      },
      {
        path: '/home/hotNews',  // 首页->热点新闻，activePage: 8
        component: () => import('@/views/newsCenter/hotNews'),
        name: 'homeHotNews',
      },
      {
        path: '/newsCenter/hotNews',  // 新闻中心->热点新闻，activePage: 9
        component: () => import('@/views/newsCenter/hotNews'),
        name: 'centerHotNews',
      },

      {
        path: '/home/honor',  // 首页->获奖者荣誉，activePage: 10
        component: () => import('@/views/home/honor'),
        name: 'homeHonor',
      },
      {
        path: '/home/guests',  // 首页->重磅嘉宾，activePage: 11
        component: () => import('@/views/home/guests'),
        name: 'homeGuests',
      },
      {
        path: '/sample/detail',  // 作品展示厅->作品详情，activePage: 12
        component: () => import('@/views/sample/detail'),
        name: 'sampleDetail',
      },
      {
        path: '/competition/guests',  // 首页->重磅嘉宾，activePage: 13
        component: () => import('@/views/home/guests'),
        name: 'competitionGuests',
      },

      {
        path: '/partner',   // 合作伙伴，activePage: 5
        component: () => import('@/views/partner/partner'),
        name: 'partner',
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    name: 'login',
  },
  {
    path: '/register',
    component: () => import('@/views/register'),
    name: 'register',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由跳转后，回到页面顶部
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
})

// 防止重复跳转到同一路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
