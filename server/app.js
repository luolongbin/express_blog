const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt')
const SECRET = 'token_secret'
const app = express();
const { User } = require('./data/db');

app.use(express.json()) // 设置后可以用 req.body 获取 POST 传入 data

app.use(expressJWT({ secret: SECRET, algorithms: ['HS256']}).unless({ path: ['/api/login'] }))

// server.js
app.post('/api/register', async (req, res) => {
    User.create({
      username: req.body.username,
      password: req.body.password
    })
    res.send('ok')
})

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        username: req.body.username
    })
    
    if(!user) {
        return res.status(422).send({
            message: '用户名不存在'
        })
    }
    // compareSync 解密匹配，返回 boolean 值
    const isPasswordValid = bcrypt.compareSync(
        req.body.password,
        user.password
    )

    if(!isPasswordValid) {
        return res.status(422).send({
            message: '密码不正确'
        })
    }

    const token = jwt.sign({ id: String(user._id), username: user.username}, SECRET)
    res.send({
        user,
        status: 200,
        message: '登录成功',
        token
    })
})

app.get('/api/profile', async (req, res) => {
    console.log(req.user);
    // const raw = String(req.headers.authorization.split(' ').pop())
    // const { id } = jwt.verify(raw, SECRET)
    // const result = await User.findById(id)
    res.send(req.user)
})

app.use((err, req, res, next) => {
    if(err.name === 'UnauthorizedError') {
        return res.status(401).send({
            status: 401,
            message: '无效的token'
        })
    }
})

app.listen(3000, () => {
    console.log('http://localhost:3000');
})