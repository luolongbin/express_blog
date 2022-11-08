const { RES_CODE, HTTP_CODE } = require('./constant');

// 响应客户端
function responseClient(res , code = RES_CODE.dataFail, msg = "服务端错误", data = null, http_Code = HTTP_CODE.ok) {
    let responseData = {};
    responseData.code = code;
    responseData.msg = msg;
    responseData.data = data;
    res.status(http_Code).json(responseData);
}

module.exports = {
    responseClient
}