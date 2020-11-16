import Vue from 'vue'
// import 'babel-polyfill'     //   兼容ie浏览器
import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
Vue.use(Element, { size: 'small', zIndex: 3000 })
import "@/styles/icon/iconfont.css"
import '@/styles/index.scss'; // global css

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import App from './App'
import store from './store'
import router from './router'
import axios from 'axios'
Vue.prototype.$axios = axios
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
import time from './api/time'


//  滑动组件
// import VueSuperSlide from 'vue-superslide'
// import JsonViewer from 'vue-json-viewer'
//Vue.use(VueSuperSlide)
//Vue.use(JsonViewer)

import * as filters from './filters' // global filters
/* alert*/
import { dictFun } from './api/selectData.js' /* select字典数据*/
import util from './api/util.js'
Vue.prototype.dictFun = dictFun
Vue.prototype.util = util
Vue.prototype.time = time

/**公共时间过滤器 */
import vueFilter from './utils/filter'
for (let key in vueFilter) {
  Vue.filter(key, vueFilter[key])
}
/**表格宽度自适应 */
// import AFTableColumn from 'af-table-column'
// Vue.use(AFTableColumn)
Vue.prototype.IsNull = value => {
  return value || '无数据'
}
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}


Vue.use(Element, {
  size: Cookies.get('size') || 'small' // set element-ui default size
})


//富文本编辑器
import  VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
Vue.filter('imgs',(val)=>{
  return  process.env.VUE_APP_IMGURL + val
})
//实现quill-editor编辑器拖拽上传图片
// import * as Quill from 'quill'
// import { ImageDrop } from 'quill-image-drop-module'
// Quill.register('modules/imageDrop', ImageDrop)

// //实现quill-editor编辑器调整图片尺寸
// import ImageResize from 'quill-image-resize-module'
// Quill.register('modules/imageResize', ImageResize)

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
