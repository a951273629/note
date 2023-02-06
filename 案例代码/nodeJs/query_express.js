const express = require("express");
const app = express();

app.get("/", (req, res) => {
  // req.query默认是一个空对象
  // 客户端使用?name=zs&age=20这种查询字符串形式，发送到服务器的参数
  // 可以通过req.query对象访问到。例如:
  // req.query. name
  // req.query.age
  console.log(req.query);
  res.send("请求成功");
});
//  URL地址中,可以通过:参数名的形式，四配动态参数值
app.get("/user/ :id", (req, res) => {
  // req.params 默认是一个空对象
  // 里面存放着通过:动态匹配到的参数值
  console.log(req.params);
});
app.listen(80, () => {
  console.log("服务器启动了");
});
