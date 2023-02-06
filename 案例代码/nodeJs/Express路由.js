// 导入express
const express = require("express");
// 创建路由对象
const router = express.Router();

// 挂载请求
router.get("/user/list", function (req, res) {
  res.sendFile("get user list");
});

router.post("/user/add", function (req, res) {
  res.send("add new user");
});

// 导出路由对象
module.exports = router;
