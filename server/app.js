const express = require('express');
const app = express();
const connectDB = require('./data/db');

app.use(express.json()) // 设置后可以用 req.body 获取 POST 传入 data
app.use(require('cors')()) // 解决跨域问题

// middleware
const resourceMiddleware = require('./middleware/resource')

// 用户管理
app.use('/admin/api/user/', require('./routes/admin/user'))
// 图片管理
app.use('/admin/api/', require('./routes/admin/upload'))
app.use('/uploads', express.static(__dirname + '/uploads'))
// 文章管理
app.use('/admin/api/:resource',resourceMiddleware() , require('./routes/admin/article'))

connectDB().then(() => {
    app.listen(3000, () => { console.log('http://localhost:3000'); })
}).catch(e => {
    console.log(e);
})
