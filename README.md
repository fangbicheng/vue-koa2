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
};
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

在项目的 service 文件夹下建立一个 database 文件夹，用来存放和数据库操作有关的文件。在 database 文件夹下，建立一个**service/init.js**文件，用来作数据库的连接和一些初始化的事情。

使用**Promise**，确保成功连接数据库，需要对意外处理和逻辑处理，让程序增加健壮性

```python
exports.connect = () => {
    // 连接数据库
    mongoose.connect(db)
    let maxConnectTimes = 0  // 自动连接次数
    return new Promise((resolve, reject) => {
        // 数据库连接事件监听
        mongoose.connection.on('disconnected', err => {
            console.log('***********数据库断开***********')
            if (maxConnectTimes < 3) {
                maxConnectTimes++
                mongoose.connect(db)
            } else {
                reject(err)
                throw new Error('数据库断开')
            }

        })
        // 数据库出现错误时
        mongoose.connection.on('error', err => {
            console.log('***********数据库错误***********')
            if (maxConnectTimes < 3) {
                maxConnectTimes++
                mongoose.connect(db)
            } else {
                reject(err)
                throw new Error('数据库错误')
            }
        })
        // 数据库链接打开时 只需要连接一次once
        mongoose.connection.once('open', () => {
            console.log('MongoDB Connected successfully!')
            resolve()
        })
    })
}
```

#### 3.3、Mongoose 的 Schema 建模介绍

如何在数据库中**建模**，也就是定义**Schema**，Schema 相当于 MongoDB 数据库的一个**映射**。**Schema 是一种以文件形式存储的数据库模型骨架**，无法直接通往数据库端，也就是说它不具备对数据库的操作能力。**Schema 是以 key-value 形式 Json 格式的数据**。

##### Schema 中的数据类型

- String ：字符串类型
- Number ：数字类型
- Date ： 日期类型
- Boolean： 布尔类型
- Buffer ： Node JS buffer 类型
- ObjectID ： 主键,一种特殊而且非常重要的类型
- Mixed ：混合类型
- Array ：集合类型

##### Mongoose 中的三个概念

- schema ：用来定义表的模版，实现和 MongoDB 数据库的映射。用来实现每个字段的类型，长度，映射的字段，不具备表的操作能力。
- model ：具备某张表操作能力的一个集合，是 mongoose 的核心能力。我们说的模型就是这个 Mondel
- entity ：类似记录，由 Model 创建的实体，也具有影响数据库的操作能力。

##### 初学定义一个用户 Schema

```python
const mongoose = require('mongoose')    // 引入Mongoose
const Schema = mongoose.Schema          // 声明Schema
let ObjectId = Schema.Types.ObjectId    // 声明Object类型，主键

//创建用户Schema
const userSchema = new Schema({
    UserId: ObjectId,
    userName:{ unique:true, type:String}, // unique 表示唯一
    password: String,
    createAt:{ type:Date,default:Date.now()},
    lastLoginAt:{ type:Date,default:Date.now()}
})
//发布模型
mongoose.model('User',userSchema)
```

##### 载入 Schema 和插入查出数据

Schema 建立好以后，需要载入这些数据库，当然最好的方法就是在后台服务已启动的时候就把载入做好，所以在**service/init.js**里作这件事，然后在**index.js**里直接执行。

###### 载入所有 Schema

直接在**service\init.js** 先引入一个**glob**和一个**resolve**

- glob：node 的 glob 模块允许你使用 \* 等符号，来写一个 glob 规则，像在 shell 里一样，获取匹配对应规则文件。
- resolve: 将一系列路径或路径段解析为绝对路径。

首先安装 glob

```python
npm install glob --save
```

然后引入

```python
const glob = require('glob')
const {resolve} = require('path')
```

一次性引入所有的 Schema 文件

```python
exports.initSchemas = () => {
    glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
}
```

使用了**glob.sync**同步引入所有的 schema 文件，然后用 forEach 的方法 require（引入）进来。这比一条条引入要优雅的多。

###### 插入数据

在操作数据库前需在**service/index.js**先引入 Mongoose 和刚写好的**initSchemas**

```python
const mongoose = require('mongoose')
const {connect , initSchemas} = require('./database/init.js')
```

插入数据

```python
// 立即执行函数
;(async () => {
    await connect()
    initSchemas()
})()
```

#### 3.4、打造安全的用户密码加密机制

现在使用的都是普通的明文密码，这在实际工作中是肯定不允许，需要对密码进行**加密**和**加盐**的处理。

##### 加密处理

密码的加密有很多种加密算法，比如我们使用的**MD5 加密**或者**hash256 加密算法**，其实他们都是 hash 的算法。就是把你的密码进行一次不可逆的编译，这样就算别人得到了这个密码值，也不能进行直接登录操作

##### 加盐处理

所谓**加盐技术**，其实就是把原来的密码里，加入一些其他的字符串，并且我们可以自己设置加入字符串的强度。

##### bcrypt 的使用

bcrypt 是一种跨平台的文件加密工具。由它加密的文件可在所有支持的操作系统和处理器上进行转移。它的口令必须是 8 至 56 个字符，并将在内部被转化为 448 位的密钥。

安装并在**server/database/schema/User.js**引入 bcrypt

```python
npm instal --save bcrypt

const bcrypt = require('bcrypt')
```

然后是用**pre**每次进行保存时都进行加盐加密的操作

```python
// 加盐长度
const SALT_WORK_FACTOR = 10

userSchema.pre('save', function (next) {
    // 加盐
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err)
        // 加密
        bcrypt.hash(this.passWord, salt, (err, hash) => {
            if (err) return next(err)
            this.passWord = hash
            next()
        })
    })
})
```

#### 3.5、 Koa2 的用户操作的路由模块化

目前所有的路由都写在**service/idnex.js**里显然不是正确的选择，这会导致 index.js 页面越来越臃肿，最后变的没办法维护。此时需要把**Koa 程序模块化**，我们也叫做**路由模块化**。

安装 koa-router

```python
npm install koa-router --save
```

新建一个**appApi/User.js**文件夹，有关 User.js 的操作，以后都会放到这个文件下，就是要编写的供前台使用的接口程序了。

```python
const Router = require('koa-router')
let router = new Router()
router.get('/', async (ctx) => {
    ctx.body = "这是用户操作首页"
})
router.get('/register', async (ctx) => {
    ctx.body = "用户注册接口"
})
module.exports = router;
```

此时需要把这个文件和 koa-router 引入到**server/index.js**下面

```python
// 引入koa-router
const Router = require('koa-router')
// 引入user.js模块
let user = require('./appApi/user.js')

// 装载所有子路由
let router = new Router();
router.use('/user',user.routes())

// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())
```

#### 3.6、前端细节注意事项

##### 注册的防重复提交

**注册的防重复提交**是注册中需要注意的细节。防重复提交一般是在前端来处理的，为什么会产生重复提交的现象那？比如用户的手机网速很慢，用户在 1 秒钟内还没得到结果，他认为可能是没点击到，就又点击了，这时候后台就被请求了两次。

1. 在按钮上绑定 loading 属性

```python
 <van-button type="primary" @click="axiosRegisterUser" :loading="openLoading" size="large">马上注册</van-button>

// data中声明
 openLoading: false, // 是否开启用户注册的loading状态
```

2. 在一开始进入注册方法的时候，作的第一件事就是把注册按钮变成 loading 状态

```python
this.openLoading = true;
```

然后在注册失败的时候取消 loading 状态（this.openLoading = false），注册成功就跳转到个人中心页面

##### 注册时的前端验证

登陆注册时，前端就必须作表单验证

vant 框架提供的 field 属性提供了错误提示的机制，就是**error-message 属性**。现在 script 的 data 里注册两个属性，usernameErrorMsg 和 passwordErrorMsg 当值不符时，作用户提示使用。开始这两个值都为空，不给用户作任何提示操作，只有按下注册按钮时才进行检测提示

验证表单信息

```python

```

#### 3.7、打通注册用户的前后端通讯

在前端写好用户操作页面以后，需要前后端进行打通，使用 API 接口的形式可以互相同通讯和传递数据

**接收来自前端发过来的请求---koa-bodyparser 中间件**

```python
npm install --save koa-bodyparser
```

在**service/index.js**文件中注册和引入中间件

```python
const bodyParser = require('koa-bodyparser')
app.use(bodyParser());
```

**支持跨域请求---koa2-cors 中间件**

```python
npm install --save koa2-cors
```

在**service/index.js**文件中注册和引入中间件

```python
const cors = require('koa2-cors')
app.use(cors())
```

#### 3.8、登陆的服务端业务逻辑

登录的业务逻辑还是很简单的，就是得到前端发来的用户名和密码，然后跟数据库进行比对，如果正确就显示登录成功，失败就显示登录失败。

##### Shema 中的比对实例方法

需要在 Shema 中制作一个比对的实例方法，这个方法就是**比对我们加盐加密后的密码**的。在**service/database/schema/User.js**下增加下面的代码

```python
// 密码比对 实例方法
userSchema.methods = {
    //密码比对的方法  第一个： 客户端传递的； 数据库的
    comparePassword: (_password, passWord) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(_password, passWord, (err, isMatch) => {
                if (!err) resolve(isMatch)
                else reject(err)
            })
        })
    }
}
```

上面的代码声明了一个实例方法，方法叫做**comparePassword**，然后传递两个参数，一个是客户端密码，一个是数据库取出来的密码。用**bcrypt**提供的**compare 方法**就可以比对，最后包装成**Promise 返回**就可以了

##### 编写登录的 Api 接口

进入**service/appApi/user.js**，增加一个 login 路由，并在路由内写入业务逻辑代码。

```python
// 用户登录
router.post('/login', async (ctx) => {
    // 得到前端传递过来的数据
    let loginUser = ctx.request.body
    console.log(loginUser)
    let userName = loginUser.userName
    let passWord = loginUser.passWord
    // 引入User的model
    const User = mongoose.model('User')
    // 查找用户名是否存在，如果存在开始比对密码
    await User.findOne({
            userName: userName
        }).exec()
        .then(async (result) => {
            if (result) {
                //当用户名存在时，开始比对密码
                console.log(result)
                let newUser = new User() //因为是实例方法，所以要new出对象，才能调用
                await newUser.comparePassword(passWord, result.passWord)
                    .then(isMatch => {
                        //返回比对结果
                        ctx.body = {
                            code: 200,
                            message: isMatch
                        }
                    })
                    .catch(error => {
                        //出现异常，返回异常
                        // console.log(error)
                        ctx.body = {
                            code: 500,
                            message: error
                        }
                    })
            } else {
                ctx.body = {
                    code: 200,
                    message: '用户名不存在'
                }
            }
        }).catch(error => {
            ctx.body = {
                code: 500,
                message: error
            }
        })
})
```

##### 保存用户登录状态

移动端的应用有一个特殊的地方，就是当用户登录一次后，下次就不用登录了。这时候登录的信息是存储到了**本地的 LocalStorage**里了。这个操作要等取得正确的登录状态以后再执行，也就是要在 axios 返回了登录成功结果以后执行

```python
 //axios用户登录
    axiosLoginUser() {
      //先把按钮进行loading状态，防止重复提交
      this.openLoading = true;
      axios({
        url: url.login,
        method: "post",
        data: {
          userName: this.username,
          passWord: this.password
        }
      })
        .then(res => {
          console.log("登录", res);
          if (res.data.code === 200 && res.data.message === true) {
            new Promise((resolve, reject) => {
              // 保存用户登录状态
              localStorage.userInfo = {
                userName: this.userName
              };
              setTimeout(() => {
                resolve();
              }, 500);
            })
              .then(() => {
                Toast.success("登录成功");
                this.$router.push("/");
              })
              .catch(err => {
                Toast.fail("登录状态保存失败");
                console.log(err);
              });
          } else {
            Toast.fail("登录失败");
            this.openLoading = false;
          }
        })
        .catch(error => {
          Toast.fail("登录失败");
          this.openLoading = false;
        });
    },
```

保存了用户登录状态以后，就有了一个是否登录的依据，然后就不会重复登录了，在已进入登录页面的**creadted**生命周期里，就判断是否已经登录

```python
created(){
    if(localStorage.userInfo){
        Toast.success('您已经登录')
        this.$router.push('/')
    }
},
```

未完待续...
