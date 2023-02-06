// 导入http模块
const http = require("http");

// 创建server服务器实例
const server = http.createServer();

// 使用server实例.on() 为服务器绑定一个request事件
server.on("request", (request, response) => {
  const url = request.url;
  let content = "<h1>404 Not found </h1>";
  if (url === "/" || url === "/index.html") {
    content = "<h1>首页 </h1>";
  } else if (url === "/about.html") {
    content = "<h1>关于 </h1>";
  }
  response.setHeader("Content-Type", "text/html;charset=utf-8");
  //   向客户端发送指定的内容,并结束这次请求的处理过程
  response.end(content);
});

// 调用server.listen(端口号,callBlack回调)方法即可启动web服务器
server.listen(80, () => {
  console.log("http server running at local");
});
