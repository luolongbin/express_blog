const express = require('express');
const app = express();
const connectDB = require('./data/db');

app.use(express.json()) // 设置后可以用 req.body 获取 POST 传入 data

// middleware
const resourceMiddleware = require('./middleware/resource')
console.log(resourceMiddleware());
app.use('/api/user/', require('./routes/admin/user'))
app.use('/api/article/:resource',resourceMiddleware() , require('./routes/admin/article'))

connectDB().then(() => {
    app.listen(3000, () => { console.log('http://localhost:3000'); })
}).catch(e => {
    console.log(e);
})
