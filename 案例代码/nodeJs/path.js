const path = require("path");

// const pathStr1 = path.join("/a", "/b/c", "../", "/d", "e");
// console.log(pathStr1);
// // 输出 \a\b\d\e
// const pathStr2 = path.join(__dirname, "./1.txt");
// console.log(pathStr2);

const filePath = "./file/html/index.html";
let fileName = path.basename(filePath);
// 打印的是完整文件名称 index.html
console.log(fileName);

fileName = path.basename(filePath, ".html");
// 打印没有后缀的文件名称 index
console.log(fileName);

let extName = path.extname(filePath);
console.log(extName);
// 打印扩展名称 .html
