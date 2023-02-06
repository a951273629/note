// 导入模块
const http = require("http");
const fs = require("fs");
const path = require("path");
// 创建server服务器
const server = http.createServer();

// 监听请求
server.on("request", (request, response) => {
  let url = request.url;
  if (url === "" || url === "/") {
    url = "index.html";
  }
  const result = path.join(__dirname, "./clock", url);
  console.log(result);
  fs.readFile(result, "utf8", (err, dataStr) => {
    // 读取失败返回404
    if (err) return response.end("404 not found");
    // 读取成功吧要响应的数据返回给客户端
    response.end(dataStr);
    // 读取失败,向客户端响应固定的 错误消息
  });
});

server.listen(80, () => {
  console.log("服务器启动了");
});
