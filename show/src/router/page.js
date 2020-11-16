export default [
  /* 首页 */
  {
    path: '',
    component: () => import('@/views/home/index.vue'),
    name: 'home',
  },
  /* 第四届大赛 */
  {
    path: 'game',
    component: () => import('@/views/game/index.vue'),
    name: 'game',
  },
  /* 嘉宾列表 */
  {
    path: 'guest',
    component: () => import('@/views/guest/index.vue'),
    name: 'guestList'
  },
  /* 嘉宾详情 */
  {
    path: 'guestDetails',
    component: () => import('@/views/guest/GuestDetails.vue'),
    name: 'guestDetails'
  },
  {
    path: 'partner',
    component: () => import('@/views/partner/index.vue'),
    name: 'partner',
  },
  {
    path: 'news',
    component: () => import('@/views/news/index.vue'),
    name: 'news',
  },
  {
    path: 'newsDetail',
    component: () => import('@/views/news/NewsDetail/index.vue'),
    name: 'newsDetail',
  },
  {
    path: 'exhibition',
    component: () => import('@/views/exhibition/index.vue'),
    name: 'exhibition',
  },
  {
    path: 'exhibitionWorkDetail',
    component: () => import('@/views/exhibition/WorkDetail/index.vue'),
    name: 'exhibitionWorkDetail',
  },
  {
    path: 'helpCenter',
    component: () => import('@/views/helpCenter/index.vue'),
    name: 'helpCenter',
  },
  {
    path: 'question',
    component: () => import('@/views/helpCenter/Question/index.vue'),
    name: 'question',
  }
]