// 引入mongoose
const mongoose = require('mongoose')
const connectDB = async () => {
    // 连接数据库，自动新建 express_admin 库
    const conn = await mongoose.connect('mongodb://localhost:27017/express_admin', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("数据库连接成功");
    }).catch((e) => {
        console.log("数据库连接失败:" + e);
    })
}

module.exports = connectDB;