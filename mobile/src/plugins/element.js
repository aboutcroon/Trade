import Vue from 'vue'
import {Button, Dialog, TabPane, Tabs} from 'element-ui'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';


Vue.use(Button)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Dialog)
// element内置下拉动态效果
Vue.component(CollapseTransition.name, CollapseTransition)
