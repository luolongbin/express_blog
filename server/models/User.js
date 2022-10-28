const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// 建立用户表
const schema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        // 设置 bcrypt 加密
        set(val) {
            return bcrypt.hashSync(val, 2)
        }
    }
})

// 建立用户数据库模型
module.exports = mongoose.model('User', schema)