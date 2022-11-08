
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs=require('fs');

const upload = multer({dest: __dirname + '/../../uploads'})

router.post('/upload', upload.single('file'), async (req, res) => {
    const file = req.file;
    const ext = path.parse(file.originalname).ext;
    const newname = file.path + ext;
    fs.rename(file.path, newname, (err) => {
        if(err) {
            console.log("上传图片失败");
        } else {
            console.log("上传图片成功");
        }
    })
    file.url = `http://localhost:3000/uploads/${file.filename}${ext}`
    res.send(file)
})

module.exports = router