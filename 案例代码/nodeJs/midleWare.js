const { request } = require("express");
const express = require("express");
const app = express();

// 注册为全局中间件
app.use(function (req, res, next) {
  console.log("中间件1生效了");
  // 为req对象挂载一个属性，从而后面的路由可以使用这个属性
  req.nowTime = Date.now();
  // 在当前中间件的业务处理完毕后，必须调用next()函数
  // next 表示把流程交付给下一个中间件或者路由
  next();
});

app.use(function (req, res, next) {
  console.log("中间件2生效了");
  // 为req对象挂载一个属性，从而后面的路由可以使用这个属性
  next();
});

app.get("/", (req, res) => {
  res.send("page" + req.nowTime);
});

app.listen(80, () => {
  console.log("服务器启动了");
});
