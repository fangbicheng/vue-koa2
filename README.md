---
title: Vue-js-Koa2移动电商实战
date: 2018-12-11 21:30:23
tags: "项目"
categories: "项目"
---

### Vue.js+Koa2 移动电商实战

@(项目)

该移动电商实战将从零开始搭建一个移动电商系统，包括首页展示，类别展示，购物功能，注册登录，积分系统，查找页面，后台接口设置。
涉及的技术栈包括：**Vue+Vue-Cli3+Router+Vant+Node+Koa2+Mongoose+MongoDB**

#### 1、初始化项目

#### 1.1、使用 vue-cli3.0 搭建环境

先全局安装 vue-cli3.0 :

```python
npm install -g @vue/cli
#OR
yarn global add @vue/cli
```

检测安装：

```python
vue -V
```

如果 vue-cli 还是 2.0 版本，那么就得必须把原有 vue-cli2 删除在重新安装 vue-cli3.0

创建项目:

```python
vue create my-project
```

此处有两个选择：
**default (babel, eslint)：** 默认套餐，提供 babel 和 eslint 支持
**Manually select features：**自己去选择需要的功能，提供更多的特性选择。比如如果想要支持 TypeScript ，就应该选择这一项。可以使用上下方向键来切换选项。如果只需要 babel 和 eslint 支持，那么选择第一项，就完事了，静静等待 vue 初始化项目。
vue-cli 内置支持了 8 个功能特性，可以多选：使用方向键在特性选项之间切换，使用空格键选中当前特性，使用 a 键切换选择所有，使用 i 键翻转选项。

初始完之后，进入到项目根目录：

```python
cd my-project
```

启动项目：

```python
npm run serve
```

#### 1.2、优雅引入 Vant 组件库

安装 Vant

```python
npm install vant --save
```

优雅的引入 Vant
vant 是支持**babel-plugin-import**引入的，它可以让我们按需引入组件模块，并且不用管理我们的样式，现在 Vue 项目组件库的主流引入方法。
安装 babel-plugin-import

```python
# 安装 babel-plugin-import 插件
npm i babel-plugin-import -D
```

babel.config.js 中配置

```python
  module.exports = {
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
```

在代码中直接引入 Vant 组件，插件会自动将代码转化为按需引入形式

```python
import { Button, Cell } from 'vant'
Vue.use(Button).use(Cell)
```

#### 1.3、移动端屏幕适配基础

本项目主要采用**flex + rem**的方式进行布局和完成移动端的适配
**rem 单位介绍**
rem（font size of the root element）是相对长度单位。相对于根元素（即 html 元素）font-size 计算值的倍数。
适配原理：将 px 替换成 rem，动态修改 html 的 font-size 适配。它可以很好的根据根元素的字体大小来进行变化，从而达到各种屏幕基本一直的效果体验。

```python
# 在index.html页面meta标签里添加，使屏幕最小/大 1.0  且不可滑动改变页面大小
minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"

// 得到手机屏幕的宽度
 let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
// 解决页面字体过大的问题
 if(htmlWidth>750){htmlWidth=750}
// 得到html的Dom元素
 let html = document.getElementsByTagName('html')[0];
// 设置根元素字体大小
 html.style.fontSize= htmlWidth/20 + 'px';
```

### 2、首页布局

#### 2.1、首页轮播图制作

首页布局主要与 flex 布局、css 样式有关，不多累赘。
首页轮播图的制作主要采用 Vant Swipe,、SwipeItem 组件，利用 Vant 实现图片轮播的**懒加载**，
**v-lazy="banner.imageUrl"**实现图片懒加载；
在加载图片到页面时，推荐使用**require**，如果用 require 引入图片，在不作任何配置的情况下就可以基本解决图片路径问题，在 data 中使用 require 导入图片**locationIcon: require('../../assets/images/location.png')**

#### 2.2、easyMock 和 Axios 的使用

##### easyMock

**Mock**的使用作为前端非常重要，比如在项目开始重启，前后端一起开发，后端并无暇照顾前端接口。这时候我们可以使用 Mock 的方式，来模拟数据

进入[easyMock 官网](https://www.easy-mock.com)，新建一个个人项目，反正就是挺简单的，重点是 Mock 数据如何建立，需要和后台沟通好、协同好，不然 Mock 数据就没有意义了。后期项目正式连接后台，需要把**Base URL**替换掉，换成正式的响应地址

##### Axios

引入 axios 后，在**生命周期 created**里请求数据

```python
created(){
    axios({
        url: 'https://www.easy-mock.com/mock/5ae2427800247c2aa1efe442/SmileVue/index',
        method: 'get',
    })
    .then(response => {
        console.log(response)
    })
    .catch((error) => {
    })
}
```

如果能取得数据后，说明已经 Mock 成功了

#### 2.3、vue-awesome-swiper

**Vue-Awesome-Swiper**轮播图插件，可以同时支持 Vue.js（1.X ~ 2.X），兼顾 PC 和移动端，随着 vue 的广泛使用，其中插件 swiper 也算是使用的比较频繁的插件。

- 安装 npm install vue-awesome-swiper --save
- 以组件形式引入

```python
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  components: {
    swiper,
    swiperSlide
  }
}
```

- 详细用法
  详细用法参考官网[swiper3](https://3.swiper.com.cn/api/index.html)、[vue-awesome-swiper 的使用以及 API 整理](https://segmentfault.com/a/1190000014609379)

#### 2.4、watch 和 filter 的使用

##### watch

把楼层这部分单独封装成一个传递参数的组件，并使用**watch**来监听参数的变化，打到正确渲染的目的

```python
 // 子组件
 export default {
    props:['floorData'],
    created(){
         //这里写得不到数据，应为数据是延迟返回的
    },
    watch:{
      floorData:function(val) {  // 这个函数方法要和props里面一致
         console.log(this.floorData) // 监听参数的变化
        }
    }
 }
```

##### filter

过滤器都是需要在很多组建中进行使用的，所以要编写一个比较通用的方法。

```python
export function toMoney(money){
    let newMoney = money;
    if(newMoney){
        newMoney = newMoney.toFixed(2)
    }else{
        newMoney = 0
        newMoney = newMoney.toFixed(2)
    }
    return newMoney
}
```

但是这个方法并不优雅，使用 ES6 函数默认参数，让代码变得优雅

```python
export function toMoney(money = 0) {
	return money.toFixed(2)
}
```

在 vue 里使用 Filter

```python
// 引入Filter 要注意此处打花括号
import { toMoney } from '@/filter/moneyFilter.js'

// 编写filter属性
filters:{
    moneyFilter(money){
        return toMoney(money)
    }
}

// 在template使用filter |
{{item.price | moneyFilter}}
```

### 3、后端服务 Koa2 与 MongoDB

#### 3.1、安装 Koa2 和 MongoDB

前端现在需要一些后端服务来获取数据，前后端服务可以分离，也可以直接在原有项目中新建一个**Service**文件夹。进入 Service 文件夹

- 安装 Koa

```python
// 使用npm init -y 生成并初始化package.json文件
	npm init -y
// 安装koa
	npm install --save koa
```

- 安装 MongoDB 数据库与图形操作界面 Robo3

#### 3.2、 Koa 用 Mongoose 连接数据库

**Mongoose**是一个开源的封装好的实现 Node 和 MongoDB 数据通讯的数据建模库。
使用 npm 安装 Mongoose

```python
npm install mongoose --save
```

在项目的 service 文件夹下建立一个 database 文件夹，用来存放和数据库操作有关的文件。在 database 文件夹下，建立一个**init.js**文件，用来作数据库的连接和一些初始化的事情。

使用**Promise**，确保成功连接数据库，需要对意外处理和逻辑处理，让程序增加健壮性

```python
const mongoose = require("mongoose");
  const db = "mongodb://localhost/smile-db";
  exports.connect = () => {
    //连接数据库
    mongoose.connect(db);
    let maxConnectTimes = 0;
    return new Promise((resolve, reject) => {
      //把所有连接放到这里
      //增加数据库监听事件
      mongoose.connection.on("disconnected", () => {
        console.log("***********数据库断开***********");
        if (maxConnectTimes < 3) {
          maxConnectTimes++;
          mongoose.connect(db);
        } else {
          reject();
          throw new Error("数据库出现问题，程序无法搞定，请人为修理......");
        }
      });
      mongoose.connection.on("error", err => {
        console.log("***********数据库错误***********");
        if (maxConnectTimes < 3) {
          maxConnectTimes++;
          mongoose.connect(db);
        } else {
          reject(err);
          throw new Error("数据库出现问题，程序无法搞定，请人为修理......");
        }
      });
      //链接打开的时
      mongoose.connection.once("open", () => {
        console.log("MongoDB connected successfully");
        resolve();
      });
    });
  }
```

未完待续...
