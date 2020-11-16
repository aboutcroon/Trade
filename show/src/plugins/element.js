import Vue from 'vue'
import {
  Button,
  Input,
  Message,
  Checkbox,
  CheckboxGroup,
  Carousel,
  CarouselItem,
  Form,
  FormItem,
  Pagination,
  Select,
  Dropdown,
  DropdownMenu,
  DropdownItem, 
  Option,
  Tabs,
  TabPane,
  Row,
  Col,
  Rate,
  Upload,
  Radio,
  RadioGroup,
  RadioButton,
  Table,
  TableColumn,
  Divider,
  Dialog,
  Steps,
  Step
} from 'element-ui'

import '../assets/element-variables.scss'

Vue.use(Button)
Vue.use(Input)
Vue.prototype.$message = Message
// 复选框
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
// 轮播
Vue.use(Carousel)
Vue.use(CarouselItem)
// 表单
Vue.use(Form)
Vue.use(FormItem)

// 分页
Vue.use(Pagination)

Vue.use(Select)

// 下拉
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);


Vue.use(Option)
Vue.use(Tabs)
Vue.use(TabPane)
//响应式布局
Vue.use(Row)
Vue.use(Col)
//评分
Vue.use(Rate)
//上传
Vue.use(Upload)
//单选框
Vue.use(Radio),
Vue.use(RadioGroup),
Vue.use(RadioButton)
//表格
Vue.use(Table)
Vue.use(TableColumn)
//分割线
Vue.use(Divider)
// 弹窗
Vue.use(Dialog)
//步骤条
Vue.use(Steps)
Vue.use(Step)



