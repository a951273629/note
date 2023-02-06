# NodeJs

[TOC]



## 1初识Node.js

#### 1.1浏览器中的JavaScript运行环境

- v8引擎负责解析和执行JavaScript 代码。
- 内置API是由运行环境提供的特殊接口,只能在所属的运行环境中被调用。

#### 1.2 什么是node

Node.js是一个基于Chrome V8引擎的JavaScript运行环境。

![image-20230121222918810](E:\typora\homework\img\nodeJs\image-20230121222918810.png)

- 浏览器是JavaScript的前端运行环境。

- Node.js 是JavaScript的后端运行环境。

- Node.js中无法调用DOM和BOM等浏览器内置API。



**node.js可以做什么**

Nodejs作为一个JavaScript的运行环境，仅仅提供了基础的功能和API。然而，基于Node.js提供的这些基础能，很多强大的工具和框架如雨后春笋，层出不穷，所以学会了Node.,js，可以让前端程序员胜任更多的工作和岗位:

- 基于Express框架(http://www.expressjs.com.cn/)，可以快速构建Web应用
- 基于Electron框架(https://electronjs.org/)，可以构建跨平台的桌面应用

- 基于restify框架(http://restify.com/)，可以快速构建API接口项目

- 读写和操作数据库、创建实用的命令行工具辅助前端开发、etc...

总之: Node.js 是大前端时代的“大宝剑”，有了Node,js 这个超级buff的加持，前端程序员的行业竞争力会越来越强!



**node.js的学习路线**

JavaScript 基础语法＋Node.js 内置API模块(fs、path、http等)＋第三方API模块(express、mysql等)

#### 1.3 在node.js环境中执行JavaScript代码

- 打开终端
- 输入node 和要执行的js文件路径

```sh
node node.js
```

![image-20230122120716778](E:\typora\homework\img\nodeJs\image-20230122120716778.png)



**cmd快捷键**

- 在资源管理器中按住shift +单击鼠标右键 可以打开当前目录的powershell窗口

- tab 自动补全路径 

- esc 清空当前输入的命令

- 输入cls 命令 清空终端

## fs文件系统模块

### 2.1什么是fs文件系统模块

fs 模块是Nodejs官方提供的、用来操作文件的模块。它提供了一系列的方法和属性，用来满足用户对文件的操作需求

例如:

- fs.readFile)方法，用来读取指定文件中的内容

- fs.writeFile(方法，用来向指定的文件中写入内容

![image-20230122121646049](E:\typora\homework\img\nodeJs\image-20230122121646049.png)

### 2.2使用fs读取文件fs.readFile()

使用fs.readFile()方法，可以读取指定文件中的内容，语法格式如下:

```js
fs.readFile(path,options,callback)
```

- 参数1:必选参数，字符串，表示文件的路径。
- 参数2:可选参数，表示以什么编码格式来读取文件。
- 参数3:必选参数，文件读取完成后，通过回调函数拿到读取的结果。回调函数有两个参数err和dataStr,分别是失败和成功的结果

示例:

```js
const fs = require("fs");

// 调用 fs.readFile()方法读取文件
/**
 *  @path  读取文件的存放路径
 *  @param {String} option 读取文件的时候采用的编码格式
 * @param {function} callback 回调函数 拿去读取失败和成功的结果 两个参数err dataStr
 */
fs.readFile(
  (path = "C:/Users/xiaoming/Desktop/DNF/使用说明.txt"),
  "utf8",
  //   如果读取成功err值为null
  //  如果读取失败err的值为错误对象
  function (err, dataStr) {
    console.log(err, "--------", dataStr);
  }
);
```

#### 2.2.2判断文件读取成功失败

可以判断err 对象是否为null，从而知晓文件读取的结果:

```js
const fs = require("fs");

fs.readFile(
  (path = "C:/Users/xiaoming/Desktop/DNF/使说明.txt"),
  "utf8",
  function (err, dataStr) {
    if (err) {
       return console.log("读取失败了", err);
    }
    console.log('读取成功了',dataStr);
  }
);
```

### 2.3 使用fs写文件fs.writeFile()

使用fs.writeFile0方法，可以向指定的文件中写入内容，语法格式如下:

```js
fs.writeFile(file,data[,options],callback)
```

- 参数1:必选参数，需要指定一个文件路径的字符串，表示文件的存放路径。

- 参数2:必选参数，表示要写入的内容。

- 参数3:可选参数，表示以什么格式写入文件内容,默认值是utf8。

- 参数4:必选参数，文件写入完成后的回调函数。

```js
/**
 *
 参数1 文件存放路径
 参数2 表示要写入的值
 参数3 回调函数 有一个参数是err值 写成成功为null 失败为失败的对象
 *
 */

fs.writeFile(
  "C:/Users/xiaoming/Desktop/DNF/使用说明.txt",
  "abcd",
  "utf-8",
  function (err) {
    console.log(err);
  }
);
```

**判断是否写入成功也是err是否为null  为null写入成功  为错误对象则写入失败**

### 2.4 fs路径问题 使用__dirname 解决

- 在使用fs模块操作文件时，如果提供的操作路径是以.或..开头的相对路径时，很容易出现路径动态拼接错误的问题。

- 原因:代码在运行的时候，会以执行node命令时所处的目录，动态拼接出被操作文件的完整路径。
- 解决方案:在使用fs模块操作文件时，直接提供完整的路径，不要提供√或../开头的相对路径，从而防止路径动态拼接的问题。

```js
//  ./ ../表示相对路径
fs.readFile((path = "./1.txt"), "utf8", function (err, dataStr) {
  if (err) {
    return console.log("读取失败了", err.message);
  }
  console.log("读取成功了", dataStr);
});

// __dirname表示当前文件所处的目录 拼接后就是完整的路径
fs.readFile((path = __dirname + "/1.txt"), "utf8", function (err, dataStr) {
  if (err) {
    return console.log("读取失败了", err.message);
  }
  console.log("读取成功了", dataStr);
});
```



## 3 path路径模块

### 3.1 什么是path路径模块

path模块是Node.js 官方提供的、用来处理路径的模块。它提供了一系列的方法和属性，用来满足用户对路径的处理需求。

例如:

- path.join()方法，用来将多个路径片段拼接成一个完整的路径字符串

- path.basename(方法，用来从路径字符串中,将文件名解析出来

如果要在JavaScript代码中，使用path模块来处理路径，则需要使用如下的方式先导入它:

```js
const path = require('path');
```

#### 3.1.2 path.join()示例

```js
//  ../会抵消一层路径  ./不会
const pathStr1 = path.join("/a", "/b/c", "../", "/d", "e");
console.log(pathStr1);
// 输出 \a\b\d\e

const pathStr2 = path.join(__dirname, "./1.txt");
console.log(pathStr2);
// 输出 C:\Users\xiaoming\Desktop\nodeJs\1.txt
```

#### 3.1.3  path.basename()示例

使用path.basename)方法，可以获取路径中的最后一部分，经常通过这个方法获取路径中的文件名，语法格式

- 第一个参数是完整路径
- 第二个参数是扩展名称 (可以不填)
- 返回值是文件的名称 

```js
path.basename(path[, ext])
```



使用path.basename)方法，可以从一个文件路径中，获取到文件的名称部分:

示例:

```js
const path = require("path");

const filePath = "./file/html/index.html";
let fileName = path.basename(filePath);
// 打印的是完整文件名称 index.html
console.log(fileName);

fileName = path.basename(filePath, ".html");
// 打印没有后缀的文件名称 index
console.log(fileName);

```

#### 3.1.4 获取路径中的文件扩展名称

```js
const filePath = "./file/html/index.html";

let extName = path.extname(filePath);
console.log(extName);
// 打印扩展名称 .html
```



## 4 http模块

服务器和普通电脑的区别在于，服务器上安装了web服务器软件，例如:lIS、Apache等。通过安装这些服务器软件，就能把一台普通的电脑变成一台web服务器。

在Node.,js 中，我们不需要使用IIS、Apache等这些第三方web服务器软件。因为我们可以基于Node.js 提供的http模块，通过几行简单的代码，就能轻松的手写一个服务器软件，从而对外提供web 服务。

### 4.1创建一个web服务器

#### 4.1.1 创建服务器基本步骤

1. 导入http模块

```js
// 导入http模块
const http = require("http");
```

2. 创建web 服务器实例

调用http.createServer(方法，即可快速创建一个web 服务器实例:

```js
// 创建server服务器实例
const server = http.createServer();
```

3. 为服务器实例绑定request事件，监听客户端的请求

为服务器实例绑定request事件，即可监听客户端发送过来的网络请求:

```js
// 使用server实例.on() 为服务器绑定一个request事件
server.on("request", (request, response) => {
  // 只要有客户端请求我们自己的服务器 就会触发request 事件
  console.log("请求头", request);
  console.log("响应头", response);
});
```

4. 启动服务器

调用服务器实例的.listen()方法，即可启动当前的web 服务器实例:

```js
// 调用server.listen(端口号,callBlack回调)方法即可启动web服务器
server.listen(80, () => {
  console.log("http server running at local");
});

```

#### 4.1.2 request 请求对象

只要服务器接收到了客户端的请求，就会调用通过server.on)为服务器绑定的 request事件处理函数。

如果想在事件处理函数中，访问与客户端相关的数据或属性，可以使用如下的方式:

```js
// 使用server实例.on() 为服务器绑定一个request事件
server.on("request", (request, response) => {
 /**
  * request.url 是请求的路径
  * request.method 是请求的方法 比如get请求 post请求
  */
  console.log(`请求路径是:${request.url},请求的方法是:${request.method}`);

});
```

#### 4.1.3 response 响应对象

在服务器的 request事件处理函数中，如果想访问与服务器相关的数据或属性，可以使用如下的方式:

```js
// 使用server实例.on() 为服务器绑定一个request事件
server.on("request", (request, response) => {
 /**
  * request.url 是请求的路径
  * request.method 是请求的方法 比如get请求 post请求
  */
  const str = `请求路径是:${request.url},请求的方法是:${request.method}`;

//   向客户端发送指定的内容,并结束这次请求的处理过程
  response.end(str);

});
```

![image-20230123113944806](E:\typora\homework\img\nodeJs\image-20230123113944806.png)

#### 4.1.4设置响应头

当调用res.end()方法，向客户端发送中文内容的时候，会出现乱码问题，此时，需要手动设置内容的编码格式:

```js
server.on("request", (request, response) => {
  const str = `请求路径是:${request.url},请求的方法是:${request.method}`;
  // 设置响应头 返回utf-8格式的字符串编码
  response.setHeader("Content-Type", "text/html;charset=utf-8");
  //   向客户端发送指定的内容,并结束这次请求的处理过程
  response.end(str);
});
```

![image-20230123115125610](E:\typora\homework\img\nodeJs\image-20230123115125610.png)

### 4.2 处理不同的url请求

- 获取请求的url地址
- 设置默认的响应内容为404 Not found
- 判断用户请求的是否为/或/index.html首页

- 判断用户请求的是否为/about.html关于页面

- 设置Content-Type响应头，防止中文乱码
- 使用res.end)把内容响应给客户端

```js
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
```

### 4.3搭建一个web服务器

把文件的实际存放路径，作为每个资源的请求url地址。

![image-20230123135822095](E:\typora\homework\img\nodeJs\image-20230123135822095.png)



```js
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
```

![image-20230124102038106](E:\typora\homework\img\nodeJs\image-20230124102038106.png)

## 5 npm与包

### 5.1 包简介

Node.js 中的第三方模块又叫做包。

**包的来源**

不同于Node.js 中的内置模块与自定义模块，包是由第三方个人或团队开发出来的，免费供所有人使用。注意:Node.js 中的包都是免费且开源的,不需要付费即可免费下载使用。

**为什么需要包**

由于 Node.,js 的内置模块仅提供了一些底层的 API，导致在基于内置模块进行项目开发的时，效率很低。包是基于内置模块封装出来的，提供了更高级、更方便的 API，极大的提高了开发效率。
包和内置模块之间的关系，类似于jQuery和浏览器内置API之间的关系。

**从哪里下载包**

国外有一家IT公司，叫做npm, Inc.这家公司旗下有一个非常著名的网站: https://www.npmjs.com/，它是全球最大的包共享平台，你可以从这个网站上搜索到任何你需要的包,只要你有足够的耐心!
到目前位置，全球约1100多万的开发人员，通过这个包共享平台，开发并共享了超过120多万个包供我们使用。
npm, Inc.公司提供了一个地址为https://registry.npmjs.org/的服务器，来对外共享所有的包，我们可以从这个服务
器上下载自己所需要的包。

注意:

从https://www.npmjs.com/网站上搜索自己所需要的包

从https://registry.npmjs.org/服务器上下载自己需要的包



### 5.2 npm 包管理配置

npm规定，在项目根目录中，必须提供一个叫做package.json的包管理配置文件。用来记录与项目有关的一些配信息。例如:

- 项目的名称、版本号、描述等
- 项目中都用到了哪些包
- 哪些包只在开发期间会用到
- 那些包在开发和部署时都需要用到

**多人协作**

![image-20230125094258790](E:\typora\homework\img\nodeJs\image-20230125094258790.png)

在项目根目录中，创建一个叫做package.json的配置文件，即可用来记录项目中安装了哪些包。从而方便剔除node_modules目录之后，在团队成员之间共亨项目的源代码。

- 今后在项目开发中，一定要把 node_modules文件夹，添加到.gitignore忽略文件中。

- 运行npm,install 命令安装包的时候，npm包管理工具会自动把包的名称和版本号，记录到package.json中。
- package.json文件中，有一个dependencies节点，专门用来记录您使用npm install命令安装了哪些包。



**安装所有的依赖**

可以运行npm install命令(或npm i)一次性安装所有的依赖包:

```shell
#执行npm install 命令时，npm包管理工具会先读取package.json 中的dependencies节点,
#读取到记录的所有依赖包名称和版本号之后，npm包管理工具会把这些包一次性下载到项目中
npm i
```



**卸载包**

可以运行npm uninstall命令，来卸载指定的包:

```shell
#使用npm uninstall具体的包名来卸载包
npm uninstall moment
```

注意: npm uninstall 命令执行成功后，会把卸载的包，自动从packagejson的dependencies 中移除掉。



#### 5.2.1 devDependencies 开发依赖

如果某些包只在项目开发阶段会用到，在项目上线之后不会用到，则建议把这些包记录到devDependencies 节点中。与之对应的，如果某些包在开发和项目上线之后都需要用到，则建议把这些包记录到dependencies节点中。



您可以使用如下的命令，将包记录到devDependencies节点中:

```sh
# 安装指定的包,并且记录到 devDependencies
npm i 包名 -D

# 注意:上述命令是简写形式，等价于卜面完整的写法:
npm install 包名 --save--dev
```

#### 5.2.2 切换npm 包下载镜像源

下包的镜像源，指的就是下包的服务器地址。

```sh
#查看当前的下包镜像源
npm config get registry

#将下包的镜像源切换为淘宝镜像源
npm config set registry =https://registry.npm.taobao.org/

#检查镜像源是否下载成功
npm config get registry
```

**nrm**

为了更方便的切换下包的镜像源，我们可以安装nrm这个小工具，利用nrm提供的终端命令，可以快速查看和切换下包的镜像源。

```sh
#通过npm包管理器，将nrm安装为全局可用的工具
npm i nrm -g
#查看所有可用的镜像源
nrm ls
#将下包的镜像源切换为taobao镜像
nrm use taobao
```



### 5.3 包的分类

**项目包**

那些被安装到项目的node_modules目录中的包，都是项目包。



项目包又分为两类，分别是:

- 开发依赖包(被记录到devDependencies节点中的包，只在开发期间会用到)
- 核心依赖包（被记录到dependencies节点中的包，在开发期间和项目上线之后都会用到)

```sh
npm i 包名 -D #开发依赖包(会被记录到devDependencies 节点中的包,只会在开发期间会用到)
npm i 包名 #核心依赖包
```

**全局包**

在执行npm install命令时，如果提供了-g 参数，则会把包安装为全局包。

全局包会被安装到 C:\Users\xiaoming\AppData\Roaming\npm\node_modules

```sh
npm i 包名 -g #全局安装指定的包
npm uninstall 包名 -g #卸载全局安装的包
```

注意:

- 只有工具性质的包，才有全局安装的必要性。因为它们提供了好用的终端命令。

- 判断某个包是否需要全局安装后才能使用，可以参考官方提供的使用说明即可。

**规范的包的结构**

—个规范的包，它的组成结构，必须符合以下3点要求:

- 包必须以单独的目录而存在
- 包的顶级目录下要必须包含package.json这个包管理配置文件
- packagejson中必须包含name，version，main这三个属性，分别代表包的名字、版本号、包的入口。

### 5.4开发一个包

**初始化package.json**

```sh
npm init -y #初始化一个package.json
```

`package.json`

```json
{
  "name": "myfrist_tools", //项目名称
  "version": "1.0.0", 		//版本号
  "description": "一个帅气的工具包", //描述
  "main": "index.js",			//入口文件
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [], //关键次
  "author": "", //作者
  "license": "ISC" //许可协议
}

```

**初始化包的基本结构**

新建itheima-tools文件夹，作为包的根目录

在itheima-tools 文件夹中，新建如下三个文件:

- package.json (包管理配置文件)

- index.js(包的入口文件)
- README.md(包的说明文档)

`index.js`

```js
//导入功能
const data = require("./dataFormat");
const html = require("./htmlEscape");
//入口文件暴露功能
module.exports = {
  ...data,
  ...html,
};

```

`dataFormat.js` 格式化时间

```js
// 定义格式化时间的函数
function dataFormat(dateStr) {
  const dt = new Date(dateStr);

  const y = addZero(dt.getFullYear());
  const mm = addZero(dt.getMonth() + 1);
  const dd = addZero(dt.getDate());

  const hh = addZero(dt.getHours());
  const mmh = addZero(dt.getMinutes());
  const ss = addZero(dt.getSeconds());
  return `${y}-${mm}-${dd}-${hh}-${mmh}-${ss}`;
}
// 补零
function addZero(n) {
  return n > 9 ? n : "0" + n;
}
module.exports = {
  dataFormat,
};

```

`htmlEscape.js` 转义html标签

```js
// 定义转义 HTML 字符的函数
function htmlEscape(htmlStr) {
  return htmlStr.replace(/<|>|"|&/g, (match) => {
    switch (match) {
      case "<":
        return "&lt;";

      case ">":
        return "&gt;";

      case '"':
        return "&quot;";

      case "&":
        return "&amp;";
    }
  });
}
function htmlUnEscape(str) {
  return str.replace(/&lt;|&gt;|&quot;|&amp;/g, (match) => {
    switch (match) {
      case "&lt;":
        return "<";

      case "&gt;":
        return ">";

      case "&quot;":
        return '"';

      case "&amp;":
        return "&";
    }
  });
}
module.exports = {
  htmlEscape,
  htmlUnEscape,
};

```

**编写包的说明文档**

包根目录中的README.md文件，是包的使用说明文档。通过它，我们可以事先把包的使用说明，以markdow
的格式写出来，方便用户参考。

README文件中具体写什么内容，没有强制性的要求;只要能够清晰地把包的作用、用法、注意事项等描述清楚即可。我们所创建的这个包的README.md文档中，会包含以下6项内容:

安装方式、导入方式、格式化时间、转义HTML 中的特殊字符、还原HTML中的特殊字符、开源协议



### 5.5 发布一个npm包

https://www.npmjs.com/ 登录npm网站

**登录账号**

npm账号注册完成后，可以在终端中执行npm login命令，依次输入用户名、密码、邮箱后，即可登录成功。

注意:在运行npm login命令之前，必须先把下包的服务器地址切换为npm的官方服务器。否则会导致发布包失败!

![image-20230127120520218](E:\typora\homework\img\nodeJs\image-20230127120520218.png)

**发布包**

将终端切换到包的==根目录==之后，运行npm publish 命令，即可将包发布到npm上(注意:==包名不能雷同==)。

![image-20230127122939242](E:\typora\homework\img\nodeJs\image-20230127122939242.png)

![image-20230127122850998](E:\typora\homework\img\nodeJs\image-20230127122850998.png)

**删除发布的包**

运行  ==npm unpublish  包名  --force==   命令，即可从npm删除已发布的包。

![image-20230127123347956](E:\typora\homework\img\nodeJs\image-20230127123347956.png)

- npm unpublish命令只能删除72小时以内发布的包
- npm unpublish 删除的包，在24小时内不允许重复发布

- 发布包的时候要慎重，尽量不要往npm上发布没有意义的包!

## 6 node 模块加载机制

**优先从缓存中加载**

模块在第一次加载后会被缓存。这也意味着多次调用require()不会导致模块的代码被执行多次。
注意:不论是内置模块、用户自定义模块、还是第三方模块，它们都会优先从缓存中加载，从而提高模块的加载效率。

**内置模块加载机制**

内置模块是由Node.,js 官方提供的模块，内置模块的加载优先级最高。
例如，require('fs')始终返回内置的fs模块，即使在node_modules目录下有名字相同的包也叫做fs。



**自定义模块加载机制**

使用require()加载自定义模块时，必须指定以.或../开头的路径标识符。在加载自定义模块时，如果没有指定/或../这样的路径标识符，则 node 会把它当作内置模块或第三方模块进行加载。

同时，在使用require()导入自定义模块时，如果省略了文件的扩展名，则Node.js 会按顺序分别尝试加载以下的文件:

- 按照确切的文件名进行加载
- 补全.js扩展名进行加载

- 补全 .json扩展名进行加载

- 补全.node扩展名进行加载

- 加载失败，终端报错

**第三方模块的加载机制**

如果传递给require()的模块标识符不是一个内置模块，也没有以./或../开头，则Node.js 会从当前模块的父目录开始，尝试从/node_modules文件夹中加载第三方模块。

如果没有找到对应的第三方模块，则移动到再上一层父目录中，进行加载，直到文件系统的根目录。
例如，假设在'C:\Usersvitheimaproject\foo.js'文件里调用了require(tools')，则Node.js会按以下顺序查找:

```path
1. C:\Users\itheima\project \node_modules \tools

2. C\Users\itheimanode_modules\tools

3. C\Users\node_modules\tools

4. C:\node_modules\tools
```

**目录作为模块**

当把目录作为模块标识符，传递给require()进行加载的时候，有三种加载方式:

- 在被加载的目录下查找一个叫做package.json的文件，并寻找 main属性，作为 require()加载的入口
- 如果目录里没有package.json文件，或者main 入口不存在或无法解析，则Node.js将会试图加载目录下的 index js文件。

- y如果以上两步都失败了，则Node.js 会在终端打印错误消息，报告模块的缺失: Eror: Cannot find module 'xoox'

## 7 Express 路由



### **7.1express简介**

官方给出的概念:Express是基于 Node.js平台，快速、开放、极简的 Web开发框架。
通俗的理解: Express 的作用和Node.js内置的http模块类似，是专门用来创建Web 服务器的。

Express的本质:就是一个npm上的第三方包，提供了快速创建Web 服务器的便捷方法。

**进一步理解Express**

​	不使用express能否创建Web服务器?

​	能,使用Node.js提供的原生http模块即可。



​	既生瑜何生亮(有了http 内置模块,为什么还有用 Express)?
​	http 内置模块用起来很复杂，开发效率低; Express,是基于内置的 http模块进一步封装出来的，能够极大的提高开发效率。



​	http内置模块与Express是什么关系?
​	类似于浏览器中Web API和jQuery的关系。后者是基于前者进一步封装出来的。

#### 7.1.2 express能做什么

对于前端程序员来说，最常见的两种服务器，分别是:

- Web 网站服务器:专门对外提供Web 网页资源的服务器。

- API接口服务器:专门对外提供API接口的服务器。

使用Express，我们可以方便、快速的创建Web网站的服务器或API接口的服务器。

#### 7.1.3 express基本使用

在项目所处的目录中，运行如下的终端命令，即可将express安装到项目中使用:

```sh
npm i express
```

**get请求**

通过app.get()方法，可以监听客户端的GET请求，具体的语法格式如下:

```js
// 参数1 客户端请求的 URL 地址
// 参数2:请求对应的处理函数
   //req:请求对象(包含了与请求相关的属性与方法)
   //res:响应对象(包含了与响应相的属性与方法)
app.get('请求url',(req,res)=>{
    res.send('返回结果')
})
```

**post请求**

通过app.post()方法，可以监听客户端的POST请求

**获取query参数**

通过req.query对象，可以访问到客户端通过查询字符串的形式，发送到服务器的参数:

```js
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
app.listen(80, () => {
  console.log("服务器启动了");
});
```

**获取params参数**

通过req.params对象，可以访问到URL中，通过:匹配到的动态参数:

```js
// URL地址中,可以通过:参数名的形式，四配动态参数值
app.get("/user/:id/:name", (req, res) => {
  // req.params 默认是一个空对象
  // 里面存放着通过:动态匹配到的参数值
  console.log(req.params);
});
```

### 7.2 托管静态资源

express提供了一个非常好用的函数，叫做express.static)，通过它，我们可以非常方便地创建一个静态资源服务器,例如，通过如下代码就可以将public目录下的图片、CSS文件、JavaScript 文件对外开放访问了:

```js
const express = require("express");
const path = require("path");
const app = express();
//当前运行目录下的 /clock目录里面发布为静态访问的资源
app.use(express.static(path.join(__dirname, "./clock")));

//启动服务器就可以访问clock中的所有文件了
app.listen(80, () => {
  console.log("server running");
});
```

注意:Express在指定的静态目录中查找文件，并对外提供资源的访问。因此，存放静态文件的==目录名不会出现==在URL中。

**挂载路径**

如果希望在托管的静态资源访问路径之前，挂载路径前缀，则可以使用如下的方式:

```js
app.use('/public',express.static( 'public'))
```

### 7.3 nodemon

**为什么使用nodemon**

在编写调试Node,js项目的时候，如果修改了项目的代码，则需要频繁的手动close掉，然后再重新启动，非常繁琐.现在，我们可以使用nodemon (https://www.npmjs.com/package/nodemon)这个工具，它能够监听项目文件的变动，当代码被修改后，nodemon 会自动帮我们重启项目，极大方便了开发和调试。

**安装**

```sh
npm i -g nodemon
```

**使用**

当基于Node.js编写了一个网站应用的时候，传统的方式，是运行`node app.js`命令，来启动项目。这样做的坏处代码被修改之后，需要手动重启项目。

现在，我们可以将node 命令替换为nodemon命令，使用`nodemon app.js`来启动项目。这样做的好处是:代码被修改之后，会被nodemon监听到，从而实现自动重启项目的效果。

```sh
#原来node启动的方式
node app.js

#现在nodemon启动的方式
nodemon app.js
```



### 7.4路由使用

**路由概念**

在Express 中，路由指的是客户端的请求与服务器处理函数之间的映射关系。
Express 中的路由分3部分组成，分别是请求的类型、请求的URL地址、处理函数。

#### 7.4.1简单使用

在Express 中使用路由最简单的方式，就是把路由挂载到app 上，示例代码如下:

```
const express = require("express");
// 创建web服务器
const app = express();

// 挂载路由
app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/", (req, res) => {
  res.send("hello world");
});

app.listen(80, () => {
  console.log("server running");
});

```

#### 7.4.2模块路由

为了方便对路由进行模块化的管理，Express不建议将路由直接挂载到app上，而是推荐将路由抽离为单独的模将路由抽离为单独模块的步骤如下:

- 创建路由模块对应的.js文件
- 调用express.Router)函数创建路由对象l

- 向路由对象上挂载具体的路由
- 使用module.exports向外共享路由对象

- 使用app.use()函数注册路由模块

**创建路由模块**

`expressModule.js`

```js
// 导入express
const express = require('express');
// 创建路由对象
const router =express.Router();


// 挂载请求
router.get('/user/list',function(req,res){
    res.sendFile('get user list')
})

router.post('/user/add',function(req,res){
    res.send('add new user')
})

// 导出路由对象
module.exports =router;
```

**注册路由模块**

```js
const express = require("express");
const userRouter =require('./Express路由')
// 创建web服务器
const app = express();

// 挂载路由
app.use(userRouter)

app.listen(80, () => {
  console.log("server running");
});

```

**为路由模块添加统一访问前缀**

```js
app.use('/api',userRouter)
```



## 8 Express 中间件

中间件(Middleware )，特指业务流程的中间处理环节。

### 8.1 中间件的概念

**Express中间件的调用流程**

当一个请求到达Express的服务器之后，可以连续调用多个中间件，从而对这次请求进行预处理。

**Express中间件的格式**

Express的中间件，本质上就是一个function处理函数，Express中间件的格式如下:

![image-20230129094500742](E:\typora\homework\img\nodeJs\image-20230129094500742.png)



**next函数的作用**

next函数是实现多个中间件连续调用的关键，它表示把流转关系转交给下一个中间件或路由。

![image-20230129094601431](E:\typora\homework\img\nodeJs\image-20230129094601431.png)

### 8.2 使用中间件

**定义一个中间件函数**

```js
const mw = function (req,res,next) {

  // 在当前中间件的业务处理完毕后，必须调用next()函数

  // next 表示把流程交付给下一个中间件或者路由

  next();

}

```



**注册为全局中间件**

全局的中间件会在处理每一次的请求之前调用

客户端发起的任何请求，到达服务器之后，都会触发的中间件，叫做全局生效的中间件。
通过调用app.use(中间件函数)，即可定义一个全局生效的中间件，示例代码如下:

```js
const { request } = require("express");
const express = require("express");
const app = express();
const mw = function (req, res, next) {
  console.log("中间件生效了");
  // 在当前中间件的业务处理完毕后，必须调用next()函数
  // next 表示把流程交付给下一个中间件或者路由
  next();
};
// 注册为全局中间件
app.use(mw);

app.get("/", (req, res) => {
  res.send("page");
});

app.listen(80, () => {
  console.log("服务器启动了");
});
```

**注册全局中间件的简化形式**

```js
// 注册为全局中间件
app.use(function (req, res, next) {
    console.log("中间件生效了");
    // 在当前中间件的业务处理完毕后，必须调用next()函数
    // next 表示把流程交付给下一个中间件或者路由
    next();
  });
```

### 8.3 中间件的作用

多个中间件之间，共享同一份req和res。基于这样的特性，我们可以在上游的中间件中，统一为req或 res对象添加自定义的属性或方法，供下游的中间件或路由进行使用。

```js
const { request } = require("express");
const express = require("express");
const app = express();

// 注册为全局中间件
app.use(function (req, res, next) {
    console.log("中间件生效了");
    // 为req对象挂载一个属性，从而后面的路由可以使用这个属性
    req.nowTime = Date.now();
    next();
  });

app.get("/", (req, res) => {
  res.send("page"+req.nowTime);
});

app.listen(80, () => {
  console.log("服务器启动了");
});
```

#### 8.3.1**定义多个全局中间件**

可以使用app.use()连续定义多个全局中间件。客户端请求到达服务器之后，会按照中间件定义的先后顺序依次进调用，示例代码如下:

```
// 注册为全局中间件
app.use(function (req, res, next) {
  console.log("中间件1生效了");
  next();
});

app.use(function (req, res, next) {
  console.log("中间件2生效了");
  next();
});
```

#### 8.3.2**局部生效的中间件**

不使用app.use()定义的中间件,叫做局部生效的中间件。示例:

```js
const express = require("express");
const app = express();

const mw = function (req, res, next) {
  console.log("中间件1生效了");
  // 为req对象挂载一个属性，从而后面的路由可以使用这个属性
  req.nowTime = Date.now();
  // 在当前中间件的业务处理完毕后，必须调用next()函数
  // next 表示把流程交付给下一个中间件或者路由
  next();
};

app.get("/", mw, (req, res) => {
  res.send("page" + req.nowTime);
});
// 返回page+时间戳
app.post("/", (req, res) => {
  res.send("page" + req.nowTime);
});
// 返回page+undefine
app.listen(80, () => {
  console.log("服务器启动了");
});

```

#### 8.3.3 一个路由使用多个中间件

可以在路由中，通过如下两种等价的方式，使用多个局部中间件:

```js
// mw mw2 都是定义好的中间件函数
app.get("/", mw,mw2, (req, res) => {
  res.send("page" );
});
app.post("/", [mw,mw2],(req, res) => {
  res.send("page" );
});
```

#### 8.3.4 中间件的使用五个注意事项

- 一定要在路由之前注册中间件
- 客户端发送过来的请求,可以连续调用多个中间件进行处理

- 执行完中间件的业务代码之后,不要忘记调用next0函数
- 为了防止代码逻辑混乱,调用next(函数后不要再写额外的代码
- 连续调用多个中间件时,多个中间件之间,共享req和res 对象

### 8.4 中间件的分类

#### 8.4.1 应用级别的中间件

通过 app.use()或 app.get()或 app.post()，绑定到app实例上的中间件，叫做应用级别的中间件，代码示例如下:

```js
//应用级别的中间件(全局中间件)
app.use((req, res, next) =>{
        next()
    })

//应用级别的中间件（局部中间件)
app.get( ' / ',mw1,(req,res) =>{
    res.send( ' Home page.')
})

```

#### 8.4.2 路由级别的中间件

绑定到express.Router)实例上的中间件，叫做路由级别的中间件。它的用法和应用级别中间件没有任何区别。只不过，应用级别中间件是绑定到app实例上，路由级别中间件绑定到router实例上，代码示例如下:

```js
var app = express()
var router = express.Router()

//路由级别的中间件
router.use( function (req,res, next) {
    console.log( 'Time : ' ,Date.now());
    next()
})
app.use( "/', router)
```

#### 8.4.3 错误级别的中间件

错误级别中间件的作用:专门用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题。
格式:错误级别中间件的 function处理函数中，必须有4个形参，形参顺序从前到后，分别是(err, req, res,next)。

定义错误中间件要在定义路由之后才会生效

```js
app.get("/", (req, res) => {
    //抛出一个异常
  throw new Error("服务器发生了错误");
  res.send("page");
});

// 定义注册一个处理服务器错误的中间件
// 错误级别中间件
app.use(function (err, req, res, next) {
  console.log("发生错误了");
   //向客户端响应错误的相关内容 
  res.send("Error:服务器依托答辩" + err.message);
});
```

#### 8.4.4 Express内置中间件

自Express 4.16.0版本开始，Express 内置了3个常用的中间件，极大的提高了Express 项目的开发效率和体验:

- express.static快速托管静态资源的内置中间件，例如: HTML文件、图片、CSS样式等（无兼容性)
- express.json解析JSON格式的请求体数据（有兼容性，仅在4.16.0+版本中可用)
- express.urlencoded解析URL-encoded格式的请求体数据(有兼容性，仅在4.16.0+版本中可用)

```js
// 配置解析application/json格式数据的内置中间件
app.use(express.json())

//配置解析 application/x-ww-form-urlencoded格式数据的内置中间件
app.use(express.urlencoded({extended:false}))
```



##### 8.4.4.1 json中间件的使用

只有配置了express.json() 服务器才可以接收请求体数据

```js
// 注意: 除了错误级别的中间件，其他的中间件，必须在路由之前进行配置
// 配置解析application/json格式数据的内置中间件
app.use(express.json());

app.post("/", (req, res) => {
  // 在服务器，可以使用req. body 这个属性，来接收客户端发送过来的请求体数据
  // 默认情况下，如果不配置解析表单数据的中间件，则 req.body 默认等于undefined
  console.log(req.body);
  res.send("ok");
});
```

注意: 

- 除了错误级别的中间件，其他的中间件，必须在路由之前进行配置

- 如果不配置解析表单数据的中间件，则 req.body 默认等于undefined

**发送请求体**

![image-20230130114434798](E:\typora\homework\img\nodeJs\image-20230130114434798.png)

##### 8.4.4.2 urlencoded中间件使用

在发送urlencoded键值对格式的数据需要使用这个中间件

![image-20230130115239458](E:\typora\homework\img\nodeJs\image-20230130115239458.png)

同样使用req.body来接收 json格式的数据表单

```js
//配置解析 application/x-ww-form-urlencoded格式数据的内置中间件 解析urlencoded格式的数据
app.use(express.urlencoded({ extended: false }));

app.post("/book", (req, res) => {
  console.log(req.body);
  res.send("received book");
});
```

#### 8.4.5第三方中间件

非Express 官方内置的，而是由第三方开发出来的中间件，叫做第三方中间件。在项目中，大家可以按需下载并第三方中间件，从而提高项目的开发效率。

例如:在 express@4.16.0之前的版本中，经常使用body-parser这个第三方中间件，来解析请求体数据。使用步骤如下:

- 运行npm install body-parser安装中间件
- 使用require导入中间件
- 调用app.use(注册并使用中间件

注意:Express 内置的 express.urlencoded中间件，就是基于body-parser这个第三方中间件进一步封装出来的。

##### 8.4.6 自定义中间件

**需求描述与实现步骤**

自己手动模拟一个类似于express.urlencoded 这样的中间件，来解析POST提交到服务器的表单数据。

实现步骤:

- 定义中间件
- 监听req的data事件

- 监听req的end事件
- 使用querystring模块解析请求体数据

- 将解析出来的数据对象挂载为req.body

- 将自定义中间件封装为模块

##### 8.4.6.1 监听req的data事件

在中间件中，需要监听req对象的data事件，来获取客户端发送到服务器的数据。

如果数据量比较大，无法一次性发送完毕，则客户端会把数据切割后，分批发送到服务器。所以data事件可能会触发多次，每一次触发data事件时，获取到数据只是完整数据的一部分，需要手动对接收到的数据进行拼接。

```js
// 解析表单数据的自定义 中间件
app.use(function(req, res, next) {
    // 定义一个str字符串 存储客户端发送的请求体数据
    let str='';
    req.on('data',(check)=>{
        str+=check
    })
});
```

##### 8.4.6.2 监听req的end事件

当请求体数据接收完毕之后，会自动触发req的end事件。
因此，我们可以在req的end事件中，拿到并处理完整的请求体数据。示例代码如下:

```js
// 解析表单数据的自定义 中间件
app.use(function (req, res, next) {
  // 定义一个str字符串 存储客户端发送的请求体数据
  let str = "";
  // 监听req data事件
  req.on("data", (check) => {
    str += check;
  });
  // 监听req的end事件
    // str 就是拼接好的字符串
  req.on("end", () => {
    console.log(str);
      /**
         * 输出字符串:
        {
        "name": "王炸",
        "age":"23"
        }
    */
  });
  next();
});
```

##### 8.4.6.3 使用querystring模块解析请求体数据

Node.js内置了一个querystring模块，专门用来处理查询字符串。通过这个模块提供的parse()函数，可以轻松把查询字符串，解析成对象的格式。示例代码如下:

```js
//导入处理querystring的Node.js内置模块
const qs = require( ' querystring ')

//调用qs.parse()方法，把查询字符串解析为对象
const body = qs.parse(str)
```

**将解析出来的数据对象挂载为req.body**

上游的中间件和下游的中间件及路由之间，共享同一份req和res。因此，我们可以将解析出来的数据，挂载为req的自定义属性，命名为req.body，供下游使用。示例代码如下:

```js
const express = require("express");
const qs = require("querystring");
const app = express();
// 解析表单数据的自定义 中间件
app.use(function (req, res, next) {
  // 定义一个str字符串 存储客户端发送的请求体数据
  let str = "";
  // 监听req data事件
  req.on("data", (check) => {
    str += check;
  });
  // 监听req的end事件
  req.on("end", () => {
    // 将字符串解析成json对象
    req.body = qs.parse(str);
    console.log(req.body);
    /**
       输出json对象:
        {
        "name": "王炸",
        "age":"23"
        }
    */
  });
  next();
});
```

##### **8.4.6.4 将自定义中间件封装为模块**

为了优化代码的结构，我们可以把自定义的中间件函数，封装为独立的模块

`getBody.js`功能模块

![image-20230130201703979](E:\typora\homework\img\nodeJs\image-20230130201703979.png)

在`defineMiddleWare.js`中use我们的模块

![image-20230130201809236](E:\typora\homework\img\nodeJs\image-20230130201809236.png)

## 9 跨域问题

### 9.1接口的跨域问题

刚才编写的GET和POST接口，存在一个很严重的问题:不支持跨域请求。
解决接口跨域问题的方案主要有两种:

- CORS  (主流的解决方案，推荐使用)
- JSONP (有缺陷的解决方案:只支持GET请求)

```js
      $(function () {
        $("#btnGet").on("click", function () {
          $.ajax({
            type: "GET",
            url: "http://localhost:80/api/get",
            data: {
              name: "zs",
              age: 20,
            },
            success: (res) => {
              console.log(res);
            },
          });
        });
      });
```



### 9.2 使用cors中间件解决跨域问题

cors 是Express的一个第三方中间件。通过安装和配置cors 中间件，可以很方便地解决跨域问题。使用步骤分为如下3步:

1. 运行npm install cors 安装中间件
2. 使用const cors = require('cors')导入中间件
3. 在路由之前调用app.use(cors())配置中间件

```js
const express = require("express");
const cors = require("cors");
const app = express();
// 在路由之前 配置cors中间件 从而解决接口跨域的问题
app.use(cors());


app.get("/api/get", (req, res) => {
  res.send("ok");
});

// 返回page+undefine
app.listen(80, () => {
  console.log("服务器启动了");
});

```

### **9.3什么是CORS**

CORS (Cross-Origin Resource Sharing，跨域资源共享）由一系列HTTP响应头组成，这些HTTP响应头决定浏览器是否阻止前端JS代码跨域获取资源。

浏览器的同源安全策略默认会阻止网页“跨域”获取资源。但如果接口服务器配置了CORS相关的HTTP响应头，就可以解除浏览器端的跨域访问限制。

![image-20230131202019931](E:\typora\homework\img\跨域\image-20230131202019931.png)

**注意事项**

- CORS主要在服务器端进行配置。客户端浏览器无须做任何额外的配置，即可请求开启了CORS的接口。
- CORS 在浏览器中有兼容性。只有支持XMLHttpRequest Level2的浏览器，才能正常访问开启了CORS的服务端接口(例如:IE10+、Chrome4+、FireFox3.5+) 。
- 

### 9.4 CORS响应头部–Access-Control-Allow-Origin

响应头部中可以携带一个Access-Control-Allow-Origin字段，其语法如下:

```js
Access-Control-Allow-Origin:<origin> | *
```

其中，origin参数的值指定了允许访问该资源的外域URL。

例如，下面的字段值将只允许来自http://itcast.cn的请求:

```js
res.setHeader( 'Access-Control-Allow-Origin', 'http://itcast.cn')
```

如果指定了Access-Control-Allow-Origin字段的值为通配符 *，表示允许来自任何域的请求，示例代码如下:

```js
res.setHeader( 'Access-Control-Allow-Origin '，'*')
```



### 9.5 CORS 响应头部– Access-Control-Allow-Headers

默认情况下，CORS仅支持客户端向服务器发送如下的9个请求头:
Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、WidtContent-Type (值仅限于text/plain、multipart/form-data、application/x-www-form-urlencoded 三者之一)

如果客户端向服务器发送了==额外的请求头信息==，则需要在==服务器端==，通过Access-Control-Allow-Headers对额外的==请求头进行声明==，否则这次请求会失败!

```js
//允许客户端额外向服务器发送Content-Type请求头和X-Custom-Header请求头
//注意:多个请求头之间使用英文的逗号进行分割
res.setHeader( 'Access-Control-Allow-Headers ','Content-Type，X-Custom-Header')

```



### 9.6 CORS 响应头部- Access-Control-Allow-Methods

默认情况下，CORS仅支持客户端发起GET、POST、HEAD请求。

如果客户端希望通过==PUT==、==DELETE==等方式请求服务器的资源，则需要在服务器端，通过Access-Control-Alow-Methods来指明实际请求所允许使用的HTTP方法。

示例代码如下:

```
// 只允许POST、GET、DELETE、HEAD请求方法
res.setHeader ('Access-Control-Allow-Methods '，'POST，GET，DELETE，HEAD')
// 允许所有的 HTTP请求方法
res.setHeader('Access-Control-Allow-Methods ', '*')

```



### 9.7 简单请求和预检请求

**简单请求**

同时满足以下两大条件的请求，就属于简单请求:

1. 请求方式: GET、POST、HEAD三者之一

2. HTTP头部信息不超过以下几种字段:无自定义头部字段、Accept、Accept-Language、Content-Language
   DPR Downlink、Save-Data、Viewport-Width、Width 、Content-Type (只有三个值application/x-www-form-urlencoded、multipart/form-data、text/plain)



**预检请求**

只要符合以下任何一个条件的请求，都需要进行预检请求:

- 请求方式为GET、POST、HEAD之外的请求Method类型

- 请求头中包含自定义头部字段
- 向服务器发送了application/json格式的数据

在浏览器与服务器正式通信之前，浏览器会先发送ОPTION请求进行预检，以获知服务器是否允许该实际请求，所以这一次的OPTION请求称为“预检请求”。服务器成功响应预检请求后，才会发送真正的请求，并且携带真实数据。

**简单请求和预检请求的区别**

简单请求的特点: 客户端与服务器之间只会发生一次请求。
预检请求的特点: 客户端与服务器之间会发生两次请求，OPTION预检请求成功之后，才会发起真正的请求。

示例:

```js
 //用ajax发起一个delete请求 
	$("#btnDelete").on("click", () => {
          $.ajax({
            type: "DELETE",
            url: "http://localhost/api/delete",
            success: (res) => {
              console.log(res);
            },
          });
        });

//处理delete请求
app.delete("/api/delete", (req, res) => {
  res.send("delete");
});
```

处理delete请求

```js
app.delete("/api/delete", (req, res) => {
  res.send("delete");
});
```

![image-20230131203950990](E:\typora\homework\img\跨域\image-20230131203950990.png)



### 9.8 JSONP接口

概念:浏览器端通过<script>标签的src属性，请求服务器上的数据，同时，服务器返回一个函数的调用。这种请求数据的方式叫做JSONP。

特点:

- JSONP不属于真正的 Ajax请求，因为它没有使用XMLHttpRequest这个对象。

- JSONP仅支持GET请求，不支持POST、PUT、DELETE等请求。



**创建JSONP接口的注意事项**

如果项目中已经配置了CORS跨域资源共享，为了防止冲突，必须在配置CORS中间件之前声明JSONP的接口。否则JSONP接口会被处理成开启了CORS的接口。示例代码如下:

```js
//优先创建JSONP接口【这个接口不会被处理成CORS接口】
app.get( ' lapi/jsonp', (req,res) =>{ })

//再配置toRs 中间件【后续的所有接口，都会被处理成CORS接口】
app.use(cors())

//这是一个开启了CORS的接口
app.get( '/api/get ', (req,res) =>{ })

```



**实现JSONP接口的步骤**

- 获取客户端发送过来的回调函数的名字
- 得到要通过JSONP形式发送给客户端的数据
- 根据前两步得到的数据，拼接出一个函数调用的字符串
- 把上一步拼接得到的字符串，响应给客户端的<script>标签进行解析执行

**实现JSONP接口的具体代码**

```js
const express = require("express");
const app = express();

app.get("/api/jsonp", (req, res) => {
    // 获取客户端发送的回调函数的名字
    const fullName = req.query.callback
    // 得到要通过jsonp形式发送给客户端的数据
    const data ={name:'zs',age:22}
    // 拼接出一个函数调用的字符串
    const scriptStr = `${fullName}(${JSON.stringify(data)})`
    // 把上一步拼接得到的字符串响应给客户端
    res.send(scriptStr)
});

app.listen(80,()=>{
    console.log('服务器启动了');
})
```

**在网页中使用jQuery 发起JSONP请求**

调用$.ajax()函数，提供JSONP 的配置选项，从而发起JSONP请求，示例代码如下:

```js
        $("#jsonp").on("click", () => {
          $.ajax({
            type: "GET",
            url: "http://localhost/api/jsonp",
            // jsonp方式发起请求
            dataType: "jsonp",
            success: (res) => {
              console.log(res);
            },
          });
        });
```

## Node链接mysql

**使用8.0和以上数据库版本连接时 用mysql2包**

```
npm i mysql2
```

**5.7以及一下版本用 mysql包**6

```
npm i mysql
```

**这里使用的数据库版本是8.0以上的**

```js
var mysql = require("mysql2");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  port: "3306",
  database: "school",
});
connection.connect();

var sql = "SELECT * FROM student";
//查
connection.query(sql, function (err, result) {
  if (err) {
    console.log("[错误] - ", err.message);
    return;
  }

  console.log("--------------------------SELECT----------------------------");
  console.log(result);
  console.log(
    "------------------------------------------------------------\n\n"
  );
});

connection.end();

```

