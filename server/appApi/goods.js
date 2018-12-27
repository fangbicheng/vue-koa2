const Router = require('koa-router')
const mongoose = require('mongoose')
const fs = require('fs') // 读取文件

let router = new Router

// 批量数据插入数据库的路由方法
router.get('/insertAllGoodsInfo', async (ctx) => {
    fs.readFile('./data_json/newGoods.json', 'utf8', (err, data) => {
        // 因为会被引入到index.js，此时路径是相对于index.js
        data = JSON.parse(data)
        let saveCount = 0 //插入条数
        const Goods = mongoose.model('Goods')
        data.map((value, index) => {
            let newGoods = new Goods(value)
            newGoods.save()
                .then(() => {
                    saveCount++
                    console.log('成功')
                })
                .catch(err => {
                    console.log('失败')
                })
        })
    })
    ctx.body = "开始导入数据"
})

// 商品大类导入数据库
router.get('/insertAllCategory', async (ctx) => {
    fs.readFile('./data_json/category.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        let saveCount = 0
        const Category = mongoose.model('Category')
        data.RECORDS.map((value, index) => {
            console.log(value)
            let newCategory = new Category(value)
            newCategory.save()
                .then(() => {
                    console.log('成功')
                })
                .catch(err => {
                    console.log('失败')
                })
        })
    })
    ctx.body = "开始导入数据"
})

// 商品子类导入数据库
router.post('/insertAllCategorySub', async (ctx) => {
    fs.readFile('./data_json/category_sub.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        let saveCount = 0
        const CategorySub = mongoose.model('CategorySub')
        data.RECORDS.map((value, index) => {
            console.log(value)
            let newCategorySub = new CategorySub(value)
            newCategorySub.save().then(() => {
                saveCount++
                console.log('成功插入' + saveCount)
            }).catch(error => {
                console.log('插入失败:' + error)
            })
        })
    })
    ctx.body = "开始导入数据"
})

// 获取商品详情信息
router.post('/getDetailGoodsInfo', async (ctx) => {
    try {
        let goodsId = ctx.request.body.goodsId
        const Goods = mongoose.model('Goods')
        let res = await Goods.findOne({
            ID: goodsId
        }).exec()
        ctx.body = {
            code: 200,
            message: res
        }
    } catch (error) {
        ctx.body = {
            code: 500,
            message: error
        }
    }
})





module.exports = router