const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()
router.get('/', async (ctx) => {
    ctx.body = "这是用户操作首页"
})
router.post('/register', async (ctx) => {
    // console.log(ctx.request.body) 获取前端返回的数据
    // 取得User model
    const User = mongoose.model('User')
    let newUser = new User(ctx.request.body)
    // 用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
    await newUser.save()
        .then(() => {
            ctx.body = {
                code: 200,
                message: '注册成功'
            }
        })
        .catch(error => {
            ctx.body = {
                code: 500,
                message: error
            }
        })
})
module.exports = router;