import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/* Layout */
import Layout from '@/layout'
/* Router Modules */
/* import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'*/

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () =>
			import('@/views/login1/index'),
    meta: { noCache: true },
    hidden: true
  },
  {
    path: '/404',
    component: () =>
			import('@/views/error-page/404'),
    meta: { noCache: false },
    hidden: true
  },

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/opus',
  //   children: [{
  //     path: 'opus',
  //     component: () => import('@/views/opus/index'),
  //     name: 'opus',
  //     meta: { title: '作品内页', icon: 'nav-shouye' }
  //   }]
  // },

  // {
  // 	path: '/',
  // 	component: Layout,
  // 	redirect: '/role',
  // 	meta: {
  // 		title: '权限管理',
  // 		icon: 'nav-quanxian'
  // 	},
  // 	children: [{
  // 		path: '/role',
  // 		name: 'role',
  // 		component: () =>
  // 			import('@/views/system/role/index'),
  // 		meta: {
  // 			title: '角色管理',
  // 			icon: '',
  // 			affix: true,
  // 		},

  // 	}, {
  // 		path: '/menu',
  // 		name: 'systemMenu',
  // 		component: () =>
  // 			import('@/views/system/menu/index'),
  // 		meta: {
  // 			title: '菜单管理',
  // 			icon: ''
  // 		}
  // 	}, {
  // 		path: '/user',
  // 		name: 'user',
  // 		component: () =>
  // 			import('@/views/system/user/index'),
  // 		meta: {
  // 			title: '用户管理',
  // 			icon: ''
  // 		}
  // 	}, {
  // 		path: '/access',
  // 		name: 'access',
  // 		component: () =>
  // 			import('@/views/system/access/index'),
  // 		meta: {
  // 			title: '接口管理',
  // 			icon: ''
  // 		}
  // 	}]
  // },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/article',
  //   children: [{
  //     path: 'article',
  //     component: () => import('@/views/article/index'),
  //     name: 'Access',
  //     meta: { title: '文章管理', affix: true, icon: 'nav-shouye' }
  //   }]
  // },
  // 
  

  // {
  // 	path: '/leagueChain',
  // 	component: Layout,
  // 	redirect: '/leagueChain/index', //重定向地址，在面包屑中点击会重定向去的地址
  // 	meta: {
  // 		title: '区块链管理',
  // 		icon: 'nav-qukuailian'
  // 	},
  // 	children: [{
  // 		path: 'index',
  // 		component: () => import('@/views/leagueChain/index'),
  // 		name: 'leagueChain',
  // 		meta: {
  // 			title: '区块链管理',
  // 			icon: 'nav-qukuailian',
  // 		}
  // 	}, {
  // 		path: 'add',
  // 		component: () => import('@/views/leagueChain/add/index'),
  // 		name: 'leagueChain/add',
  // 		hidden: true,
  // 		meta: {
  // 			title: '区块链新增',
  // 			icon: 'nav-qukuailian',
  // 		}
  // 	},]
  // },
  // {
  // 	path: '/unionMission',
  // 	component: Layout,
  // 	redirect: '/unionMission/index', //重定向地址，在面包屑中点击会重定向去的地址
  // 	meta: {
  // 		title: '部署详情',
  // 		icon: 'nav-bushuxiangqing'
  // 	},
  // 	children: [{
  // 		path: 'index',
  // 		component: () => import('@/views/unionMission/index'),
  // 		name: 'unionMission',
  // 		meta: {
  // 			title: '部署详情',
  // 			icon: 'nav-bushuxiangqing',
  // 		}
  // 	}]
  // },
  // {
  // 	path: '/node',
  // 	component: Layout,
  // 	redirect: '/node/index', //重定向地址，在面包屑中点击会重定向去的地址
  // 	meta: {
  // 		title: '节点管理',
  // 		icon: 'nav-jiedian'
  // 	},
  // 	children: [{
  // 		path: 'index',
  // 		component: () => import('@/views/node/index'),
  // 		name: 'node',
  // 		meta: {
  // 			title: '节点管理',
  // 			icon: '',
  // 		}
  // 	}]
  // }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
