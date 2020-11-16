## 页面适配

**PC端——页面设配**

1.1366*768

2.1440*900

3.1920*1080

4.2560x1440

**移动端页面适配**

页面太小的我建议不要适配了，比如老款的酷派手机 480*800

安卓：

1.720*1280

2.1080*1920 

3.1440*2560

ios

1.375*667 iphone6/7/8

2.414*736 iphone6/7/8 plus

3.320*568 iphone se

4.375*812 iphone 11

5.414*896 iphone 11 pro max

## 命令

### Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```


**本地部署地址**：http://192.168.1.34:25080/mobile/

## 目录结构

```
├── src
│   ├── api                               # 常用的方法封装
│   │   ├── request.js                    # axios 请求封装
│   │   └── transit.js                    # 请求方式封装
│   │
│   ├── assets
│   │   ├── font                   		  # 字体文件夹
│   │   ├── img                           # 公共图片
│   │   ├── video                         # 公共视频 
│   │   ├── iconfont                      # 字体图标  
│   │   ├── element.scss                  # Element UI 样式修改
│   │   ├── global.scss                   # 页面公共样式
│   │   ├── mixin.scss                    # 页面的公共 CSS 部分
│   │   └── reset.scss                    # 去除页面默认样式
│   │ 
│   ├── layout                            # 页面布局（展示页分页）
│   │   ├── components                    # 布局模块
│   │   │   ├── AppMain.vue
│   │   │   ├── Footer.vue
│   │   │   └── NavBar.vue                # 顶部栏
│   │   └── index.vue
│   │ 
│   ├── plugins       
│   │   └── element.js                    # Element UI 按需引入文件
│   │ 
│   ├── router   
│   │   ├── index.js                       # 主路由
│   │
│   ├── views   
│   │   ├── competition                   # 第四届大赛
│   │   ├── home
│   │   │   ├── home.vue                  # 首页
│   │   │   └── honor.vue                 # 获奖者荣誉
│   │   ├── login                         # 登录
│   │   ├── partner                       # 合作伙伴
│   │   ├── register                      # 注册
│   │   ├── components                    # 页面组件
│   │   │   ├── FootBottom                # 页面底部
│   │   │   ├── RightPanel                # 回到顶部以及客服按钮
│   │   │   └── TabBar                    # 顶部栏下面的导航栏
│   │   ├── newsCenter
│   │   │   ├── allNews.vue               # 全部新闻
│   │   │   ├── hotNews.vue               # 热点新闻
│   │   │   └── newsCenter.vue            # 新闻中心
│   ├── App.vue
│   └── main.js
│
├── .env                                  # 所有模式 - 环境变量
├── .env.development                      # 开发模式 - 环境变量
├── .env.production                       # 生产模式 - 环境变量
└── package.json
```

## 路由

- 页面路由都在router下的index.vue。

## 权限

无


