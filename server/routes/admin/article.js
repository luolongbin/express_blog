
const express = require('express');
const router = express.Router();
router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
})

module.exports = router

