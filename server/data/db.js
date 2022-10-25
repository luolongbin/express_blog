// 引入 mongoose 
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// 连接数据库，自动新建 express_admin 库
mongoose.connect('mongodb://localhost:27017/express_admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// 建立用户表
const UserSchema = new mongoose.Schema({
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
const User = mongoose.model('User', UserSchema)

module.exports = { User }

const conn = mongoose.connection;

conn.on("error",error=>{
    console.log("数据库连接失败:" + error);
})
conn.on("open",()=>{
    console.log("数据库连接成功");
})