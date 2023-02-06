const util = require("./index");
// let nowData = data.dataFormat(new Date());
// console.log(nowData);
const htmlStr = "<h1> 哥哥<h1>";
const str = util.htmlEscape(htmlStr);
console.log(str);

const origin = util.htmlUnEscape(str);
console.log(origin);
