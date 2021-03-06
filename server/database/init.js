const mongoose = require('mongoose')
const db = 'mongodb://localhost/mobileShopping'
const glob = require('glob')
// 允许使用 * 等符号，来写一个glob规则
const {
    resolve
} = require('path')
// resolve: 将一系列路径或路径段解析为绝对路径。

// 引入所有定义的schema
exports.initSchemas = () => {
    glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
}

exports.connect = () => {
    // 连接数据库
    mongoose.connect(db)
    let maxConnectTimes = 0
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
        // 数据库链接打开时
        mongoose.connection.once('open', () => {
            console.log('MongoDB Connected successfully!')
            resolve()
        })
    })
}