const fs = require("fs");

//  ./ ../表示相对路径
fs.readFile((path = "./1.txt"), "utf8", function (err, dataStr) {
  if (err) {
    return console.log("读取失败了", err.message);
  }
  console.log("读取成功了", dataStr);
});

// __dirname表示当前文件所处的目录
fs.readFile((path = __dirname + "/1.txt"), "utf8", function (err, dataStr) {
  if (err) {
    return console.log("读取失败了", err.message);
  }
  console.log("读取成功了", dataStr);
});

/**
 *
 参数1 文件存放路径
 参数2 表示要写入的值
 参数3 回调函数 有一个参数是err值 写成成功为null 失败为失败的对象
 *
 */

// fs.writeFile(+"1.txt", "abcd", "utf-8", function (err) {
//   console.log(err);
// });
