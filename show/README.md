## 命令

```
# 安装依赖
yarn install
# 测试
yarn serve
# 打包
yarn build
```

**本地部署地址**：http://192.168.1.34:25080/show/

## 目录结构

```
├── src
│   ├── api                               # 常用的方法封装
│   │   ├── request.js                    # axios 请求封装
│   │   └── transit.js                    # 请求方式封装
│   │
│   ├── assets
│   │   ├── font-family                   # 字体文件夹
│   │   ├── img                           # 公共图片
│   │   ├── videos                        # 公共视频
│   │   ├── account.scss                  # 登录/注册页样式     
│   │   ├── element-ui.scss               # Element UI 样式修改
│   │   ├── element-variables.scss        # Element UI 主题颜色修改
│   │   ├── global.scss                   # 页面公共样式
│   │   ├── icon.js                       # 页面引用的 icon 图标（svg）
│   │   ├── index.scss                    # 页面引用的 CSS 样式
│   │   ├── palette.scss                  # 页面引用的 CSS 公共变量
│   │   └── reset.scss                    # 去除页面默认样式
│   │ 
│   ├── components                        # 公共组件目录
│   │   ├── AccountBlock.vue              # 登录/注册 模块（中间内容）
│   │   ├── AccountNumber.vue             # 登录/注册 模块（头部、底部、背景） 
│   │   ├── BreadCrumbs.vue               # 带背景的头部模块
│   │   ├── GuestCard.vue                 # 重磅嘉宾 - 人物卡片
│   │   ├── HomeGuest.vue                 # 首页 - 重磅嘉宾板块（不带背景）
│   │   ├── HomeInnovation.vue            # "乘风创业，破浪创新，世界互联中国梦" 模块（不带背景）
│   │   └── SubTitle.vue                  # 页面小标题
│   │ 
│   ├── layout                            # 页面布局（展示页分页）
│   │   ├── components                    # 布局模块
│   │   │   ├── AppMain.vue
│   │   │   ├── Footer.vue
│   │   │   └── NavBar.vue
│   │   ├── 404.vue                       # 404页面
│   │   └── index.vue
│   │ 
│   ├── plugins       
│   │   └── element.js                    # Element UI 按需引入文件
│   │ 
│   ├── router   
│   │   ├── index.js                      # 主路由
│   │   ├── page.js                       # 展示页分页内容
│   │   └── user.js                       # 用户控制台路由
│   │
│   ├── views   
│   │   ├── game                          # 第四届大赛
│   │   ├── guest                         # 重磅嘉宾 - 嘉宾列表
│   │   ├── home                          # 首页
│   │   ├── login                         # 登录
│   │   ├── partner                       # 合作伙伴
│   │   ├── password                      # 找回密码
│   │   ├── register                      # 注册
│   │   ├── user                          # 登录后的用户页
│   │   │   ├── components.vue
│   │   │   │   ├── GrayBlock.vue         # 灰色背景块
│   │   │   │   ├── JudgingRules.vue      # 评审规则模块      
│   │   │   │   └── UserTitle.vue         # 控制台头部
│   │   │   ├── normal.vue                # 分页面
│   │   │   └── index.vue                 # 用户控制台首页
│   │   ├── App.vue
│   │   └── main.js
│   ├── App.vue
│   └── main.js
│
├── .env                                  # 所有模式 - 环境变量
├── .env.development                      # 开发模式 - 环境变量
├── .env.production                       # 生产模式 - 环境变量
└── package.json
```

## 路由

- 登录、注册、404页面在最外层路由。
- 展示页内容在 `src/router/page.js`。
- 用户登录后的页面在 `src/router/user.js`。

## 权限

登录后通过 Vuex 的 getters 可以获取用户的基本信息。使用示例：

```js
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['userinfo', 'auth'])
  },
  mounted() {
    /* 登录状态（默认false，登录后为true） */
    this.auth
    /* 用户信息 */
    this.userinfo
    /* 用户角色类型（权限） */
    this.userinfo.roleType
  }
}
```

roleType 权限类型

| 值   | 类型       |
| ---- | ---------- |
| 0    | 超级管理员 |
| 1    | 管理员     |
| 2    | 主评委     |
| 3    | 副评委     |
| 4    | 机构用户   |
| 5    | 普通用户   |

## 账号

主评委

```
账号：lvheng
密码：222222
```

end...

## 组件说明

### 使用小标题

示例

```vue
<sub-title title="测试标题" english="hot news" miniDown>
    <router-link to="" class="see-more">查看更多</router-link>
</sub-title>
```

属性

```
title       标题
english     英文名称
miniDown    更小的间距
```

> 注：在标签中包裹的内容会在最右侧居中显示

### 带背景的分页面标题

示例

```vue
<BreadCrumbs
  title-right="（持续更新中）"
  description="多家机构共同发展，引领行业区块链版权风潮"
  :background="backgroundUrl"
  :crumb="[{title: '合作伙伴', link: 'partner1'},{title: '合作伙伴', link: 'partner2'}, {title: '合作伙伴', link: 'partner'}]"
/>
```

属性

```
title            标题
title-right      标题右侧小字
description      标题描述
background       背景图片地址
crumb            传入数组，存储面包屑链接。示例：[{title: '合作伙伴', link: 'partner'}...]。其中 link 为导航 name
```

### 用户控制台头部（UserTitle.vue）

示例

```vue
<UserTitle :stat-list="statList" show-avatar/>
```

属性

```
show-avatar    添加则显示左侧头像
avatar         头像图片路径
title          标题
description    标题下方描述
stat-list      标题右侧统计数字，示例： [{ number: 10, name: '总上传作品数量', }, ...]
```

### 灰色背景块（GrayBlock.vue）

示例

```vue
<gray-block></gray-block>
```

块中的内容为灰色背景，上下左右 padding 为 20px。

### 评审规则块（JudgingRules.vue）

展示评审规则，示例：

```vue
<JudgingRules />
```

## 样式

### 版心

使用 `.container` 样式为当前元素添加版心的样式，版心会自动水平居中，且带有左右 padding 20px。

### button 按钮样式

1. 自定义的红色 button 按钮默认都要带一个 `button-red` 的 class 样式，添加后不要调整任何颜色样式，只调整按钮的大小、padding、字体即可。
2. el-button 的按钮默认主题色为红色

## 文案备份

<details>
  <summary>获奖者荣誉</summary>
  <div>

获奖者服务：

一、奖状、奖杯（金奖独有）
中华商标（国际）创意设计大赛的获奖者除了能获得奖状、奖杯外，中华商标（国际）创意设计大赛设计作品将获得中华商标协会、中国教育电视台的权威认证。

二、获奖作品颁发区块链版权数字证书（直通互联网法院，图片存证即上链）
中华商标（国际）创意设计大赛作品将获得区块链版权数字证书，将作品信息上链存证，存证的商标作品加盖时 间戳并与注册作者关联，实现作品的确权，能够为作者提供真实性权属证明，极大地降低维权成本。作 品在各个监管节点间共识，环环相扣的数据结构使 其具有不可篡改性，从技术上排除了数据被篡改和 删减的可能，能够最大程度上保障参赛者的权益。

三、参加颁奖典礼（为用户提供展示自身形象和实力的机会）
中华商标（国际）创意设计大赛奖颁奖盛典由中华商标协会、中国网、中国教育电视台三家行业权威机构、国家权威媒体联合主办，颁奖盛典将采用线上、线下活动的形式，届时将邀请行业领导、协会领导、大赛专家评委、国内外著名知识产权专家学者、著名企业家、品牌策划师等相关人士。

四、获奖作品收录设计时代杂志专刊（提升企业或个人在该领域的影响力，塑造个人知名度和美誉度）
中华商标（国际）创意设计大赛作品将被收录当年《INTERNI 设计时代》专刊中，将被全球设计师、设计机构及企业进行参考。《INTERNI 设计时代》杂志为中国的国际设计最新流行趋势及最新设计文化发展趋势代言人；全球最顶级、高端和先进的设计类产品的代言人。

五、获奖作品入驻设计大赛知识产权知识产权运营管理平台（一站式直达服务，省去中间环节）
中华商标（国际）创意设计大赛区块链知识产权运营管理平台应用云计算+大数据+互联网（固定互联与移动互联相结合）汇集商标品牌大数据，形成商标品牌评估、区块链存证、商标交易、区域分析、侵权调解、精准营销、地标云为内容的商标品牌数据应用中心。获奖作品入驻平台可转化为数字资产进行安全可靠的知识产权交易。

  </div>
</details>