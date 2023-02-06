const express = require("express");
const parse = require("./getBody");
const cors = require("cors");
const app = express();
// 在路由之前 配置cors中间件 从而解决接口跨域的问题
app.use(cors());
// 解析表单数据的自定义 中间件
app.use(parse);

app.get("/api/get", (req, res) => {
  console.log(req.body);
  res.send("ok");
});
app.delete("/api/delete", (req, res) => {
  res.send("delete");
});

// 返回page+undefine
app.listen(80, () => {
  console.log("服务器启动了");
});
