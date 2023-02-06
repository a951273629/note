const express = require("express");
const app = express();

app.get("/api/jsonp", (req, res) => {
  // 获取客户端发送的回调函数的名字
  const fullName = req.query.callback;
  // 得到要通过jsonp形式发送给客户端的数据
  const data = { name: "zs", age: 22 };
  // 拼接出一个函数调用的字符串
  const scriptStr = `${fullName}(${JSON.stringify(data)})`;
  // 把上一步拼接得到的字符串响应给客户端
  res.send(scriptStr);
});

app.listen(80, () => {
  console.log("服务器启动了");
});
