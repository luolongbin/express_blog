
const express = require('express');
const router = express.Router();
const utils = require('../../config/utils')
const { RES_CODE, HTTP_CODE } = require('../../config/constant');


// 创建资源
router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
})

// 更新资源
router.post('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
})

// 删除资源
router.post('/delete/:id', async (req, res) => {
    const model = await req.Model.findByIdAndDelete(req.params.id)
    res.send({
        success: true
    })
})

// 获取资源列表
router.get('/', async (req, res) => {
    req.Model.countDocuments({}, async (err, count) => {
        if (err) {
            return utils.severErr(err, res)
        } else {
            const model = await req.Model.find({}, null, { limit: 100 })
            let data = {
                count,
                data: model
            }
            utils.responseClient(res, RES_CODE.reqSuccess, "获取文章成功", data)
        }
    })
})

// 资源详情
router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
})

module.exports = router

