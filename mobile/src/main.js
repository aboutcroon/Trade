import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAwesomeSwiper from "vue-awesome-swiper";
import 'swiper/css/swiper.css'
import 'default-passive-events'   // 添加被动监听器passive优化页面的滑动性能

// 重置默认样式
import './assets/reset.scss'

// 引入公共样式
import './assets/global.scss'

import './plugins/element.js'
import './assets/iconfont/iconfont.css'

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
