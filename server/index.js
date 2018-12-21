const Koa = require('koa')
const Router = require('koa-router')
const mongoose = require('mongoose')
// 接到前端发过来的请求的中间件 koa-bodyparser
const bodyParser = require('koa-bodyparser')
const {
    connect,
    initSchemas
} = require('./database/init.js')
let user = require('./appApi/user.js')
// 解决跨域的中间件 koa2-cors
const cors = require('koa2-cors')
const app = new Koa()

app.use(cors())
app.use(bodyParser())

// 转载所有子路由
let router = new Router()
router.use('/user', user.routes())

// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())


// 立即执行函数
;(async () => {
    await connect()
    initSchemas()
})()

app.use(async (ctx) => {
    ctx.body = `<h1>hello koa</h1>`
})
app.listen(3000, () => {
    console.log(`[Server] starting at port 3000`)
})