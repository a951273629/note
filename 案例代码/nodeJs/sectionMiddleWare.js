const { request } = require("express");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  throw new Error("服务器发生了错误");
  res.send("page");
});

// 定义注册一个处理服务器错误的中间件
// 错误级别中间件
app.use(function (err, req, res, next) {
  console.log("发生错误了");
  res.send("Error:服务器依托答辩" + err.message);
});
// 返回page+undefine
app.listen(80, () => {
  console.log("服务器启动了");
});
