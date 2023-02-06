const express = require("express");
const userRouter = require("./Express路由");
// 创建web服务器
const app = express();

// 挂载路由
app.use(userRouter);

app.listen(80, () => {
  console.log("server running");
});
