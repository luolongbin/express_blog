const express = require('express')
const app = express()
const router = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt')
const SECRET = 'token_secret'
const User = require('../../models/User')

app.use(expressJWT({ secret: SECRET, algorithms: ['HS256'] }).unless({ path: ['/api/login'] }))
// server.js
router.post('/register', async (req, res) => {
    console.log(req.body);
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    res.send('ok')
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({
        username: req.body.username
    })

    if (!user) {
        return res.status(422).send({
            message: '用户名不存在'
        })
    }
    // compareSync 解密匹配，返回 boolean 值
    const isPasswordValid = bcrypt.compareSync(
        req.body.password,
        user.password
    )

    if (!isPasswordValid) {
        return res.status(422).send({
            message: '密码不正确'
        })
    }

    const token = jwt.sign({ id: String(user._id), username: user.username }, SECRET)
    res.send({
        user,
        status: 200,
        message: '登录成功',
        token
    })
})

router.get('/api/profile', async (req, res) => {
    console.log(req.user);
    // const raw = String(req.headers.authorization.split(' ').pop())
    // const { id } = jwt.verify(raw, SECRET)
    // const result = await User.findById(id)
    res.send(req.user)
})

router.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).send({
            status: 401,
            message: '无效的token'
        })
    }
})

module.exports = router