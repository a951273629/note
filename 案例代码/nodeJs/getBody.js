const qs = require("querystring");

module.exports = function (req, res, next) {
  // 定义一个str字符串 存储客户端发送的请求体数据
  let str = "";
  // 监听req data事件
  req.on("data", (check) => {
    str += check;
  });
  // 监听req的end事件
  req.on("end", () => {
    // 将字符串解析成json对象
    req.body = qs.parse(str);
    /**
         输出json对象:
          {
          "name": "王炸",
          "age":"23"
          }
      */
  });
  next();
};
