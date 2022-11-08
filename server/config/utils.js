const { RES_CODE, HTTP_CODE } = require('./constant');

// 响应客户端
function responseClient(res , code = RES_CODE.dataFail, msg = "服务端错误", data = null, http_Code = HTTP_CODE.ok) {
    let responseData = {};
    responseData.code = code;
    responseData.msg = msg;
    responseData.data = data;
    res.status(http_Code).json(responseData);
}

// 错误请求返回
function severErr(err, res) {
    let errObj = {
        msg: "服务器错误",
        code: HTTP_CODE.severError,
        data: err
    }
    res.status(HTTP_CODE.severError).json(errObj)
}

module.exports = {
    responseClient,
    severErr
}