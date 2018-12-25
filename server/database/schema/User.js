const mongoose = require('mongoose')
// bcrypt加密
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
// 加盐长度
const SALT_WORK_FACTOR = 10
// 创建UserSchema
const userSchema = new Schema({
    UserId: {
        type: ObjectId // 主键
    },
    userName: {
        unique: true, // 表示唯一
        type: String
    },
    passWord: String,
    createAt: {
        type: Date,
        default: Date.now()
    },
    lastLoginAt: {
        type: Date,
        default: Date.now()
    }
}, {
    collection: 'User'
})
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

// 发布模型
mongoose.model('User', userSchema) // 这里User要与数据库定义的名称一样