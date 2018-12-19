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
        unique: true,
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
// 发布模型
mongoose.model('User', userSchema) // 这里User要与数据库定义的名称一样