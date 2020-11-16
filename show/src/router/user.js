export default [
  {
    path: '',
    component: () => import('@/views/user/index.vue'),
    name: 'userControl',
    meta: {
      role: ['judge', 'user']
    }
  },
  /* 评审作品管理 - 评审 */
  {
    path: 'reviewDetail',
    component: () => import('@/views/user/ReviewDetail/index.vue'),
    name: 'reviewDetail',
    meta: {
      role: ['judge']
    }
  }, 
  /* 评审作品确认 - 评审 */
  {
    path: 'reviewResult',
    component: () => import('@/views/user/ReviewResult/index.vue'),
    name: 'reviewResult',
    meta: {
      role: ['judge']
    }
  },
  /* 我的账号 - 用户/评审 */
  {
    path: 'account',
    component: () => import('@/views/user/account/index.vue'),
    name: 'account',
    meta: {
      role: ['judge', 'user']
    }
  },
  /* 上传作品 - 用户*/
  {
    path: 'uploadTrade',
    component: () => import('@/views/user/TradeUploadTrade/index.vue'),
    name: 'uploadTrade',
    meta: {
      role: ['user']
    }
  },
  /* 查看作品 - 用户 */
  {
    path: 'tradeDetail',
    component: () => import('@/views/user/TradeDetail/index.vue'),
    name: 'tradeDetail',
    meta: {
      role: ['user']
    }
  }
  /* {
    path: 'game',
    component: () => import('@/views/game/index.vue'),
    name: 'game',
  },
  {
    path: 'partner',
    component: () => import('@/views/partner/index.vue'),
    name: 'partner',
  } */
]