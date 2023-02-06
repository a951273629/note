# webPack

[TOC]



## 什么是 webpack，有什么用？

> webpack 就是一个打包工具，宗旨是一切静态资源(js/json/css/img/less/...)皆可打包，分析项目结构，找到JS模块以及浏览器不能直接运行的拓展语言，并使用转译工具将其转译，最终打包为合格的格式供浏览器使用



## 核心概念

1. 【entry 入口】：webpack 使用该文件模块作为打包入口，构建内部依赖图，进行递归。找出所有依赖的模块，并使用相应的 loader 进行转译
2. 【output 出口】：最终输出结果的文件，默认为 ./dist
3. 【loader】：处理那些非JavaScript文件。将所有类型的文件转换成 webpack 能够有效处理的文件(javaScript和json)，常用的有 `babel-loader`,`sass-loader`,`css-loader`,`style-loader`,`vue-loader`,`file-loader`,`url-loader`;
4. 【plugin：插件】，用来增强 webpack 功能，一种强大的扩展；
5. 【mode：模式】，生成模式production和开发模式development；

### loader

不同的 loader 会有不同的功能，但是主要功能都是用来转换和处理代码



1) webpack本身只能处理 JS、JSON模块，如果要加载其他类型的文件(模块)，就需要使用对应的loader 。

2) 它本身是一个函数，接受源文件作为参数，返回转换的结果。

3) loader一般以xxx-loader的方式命名，xxx代表了这个loader要做的转换功能，比如css-loader。

### plugin

完成loader不能完成的功能

插件使用需要先进行安装，在配置文件里使用 `new` 关键字配置生成插件常用插件有：

- `HtmlWebpackPlugin`：自动生成 `index.html` 并且自动引入 js 文件，可用来做长缓存（持久缓存）；
- `HotModuleReplacement`: 实时热更新插件；
- `cleanWebpackPlugin`: 每次构建时自动清理 dist 目录



### 开启项目

初始化项目:

使用npm init或yarn init生成一个package.json文件

```shell
npm init -y
```



```
{
"name" : "webpack_test",
"version" : "1.0.0"
}
```

安装webpack

```shell
npm install webpack@4 webpack-cli@3 -g  # 全局安装,作为指令使用

npm install webpack@4 webpack-cli@3-D # 本地安装,作为本地依赖使用

npm install webpack webpack-cli --save-dev #安装最新的webpack
```

### 处理js和json文件

创建js文件

src/js/app.js

src/js/module1.js

**开发者模式 生成的代码没有经过压缩**

```shell
webpack ./src/js/app.js -o ./build/js/app.js --mode=development
```



生产者模式

```shell
webpack ./src/js/app.js -o ./build/js/app.js --mode=production
```



- webpack能够编译打包js和json文件

- 能将es6的模块化语法转换成浏览器能识别的语法(结构赋值,箭头函数等不会转成es5的语法)

- 能压缩代码

缺点:

- 不能编译打包css、img等文件
- 不能将js的es6基本语法转化为es5以下语法

改善:使用webpack配置文件解决，自定义功能



*es6中引入json文件是用默认暴露的方式

```js
import data from './json/test.json'
```

### 4 webpack配置文件

![image-20230109111513777](E:\typora\homework\img\css\image-20230109111513777.png)

* 目的:在项目根目录定义配置文件，通过自定义配置文件，还原以上功能

* 文件名称: webpack.config.js
* 文件内容:

```js
// 引入Node内置path模块 专门用于解决路径问题
const path = require("path");

// 使用CJS的模块化规范 暴露一个对象,该对象就是webpack的详细配置对象(规则)
module.exports = {
  mode: "development", //工作模式 production 生产模式 二选一
  entry: "./src/js/app.js", //入口
    /*
    完整写法
     entry:{
     	main:'./src/js/app.js'
     }
    */
  //   输出(出口)
  output: {
    //输出文件的路径
    path: path.resolve(__dirname, "build"),
    // 输出文件的路径
    filename: "app.js",
  },
};

```



在当前目录创建包环境 才能使用nonde的npm命令

```shell
npm init --yes   
```

![image-20230109115838680](E:\typora\homework\img\css\image-20230109115838680.png)

#### 4.1配置loader

安装处理css的loader 并配置

```shell
 #安装处理css的loader
 npm i css-loader -D 
 
 npm i style-loader -D
```



在`webpack.config.js`文件中新增`module`配置	

```js
// 使用CJS的模块化规范 暴露一个对象,该对象就是webpack的详细配置对象(规则)
module.exports = {
  mode: "development", //工作模式
  entry: "./src/js/app.js", //入口
  //   输出(出口)
  output: {
    //输出文件的路径
    path: path.resolve(__dirname, "build"),
    // 输出文件的路径
    filename: "app.js",
  },
  //   module.rules 中配置一个一个的loader
  module: {
    rules: [
      {
        // 匹配规则 匹配所有.css文件
        test: /\.css$/i,
        // css-loader 将css文件加载到js中,转换成样式字符串  style-loader内联到head的style标签中使样式生效
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
```

重新使用`webpack`打包就可以处理 css文件了

#### 4.2 less-loader

webpack 将 Less 编译为 CSS 的 loader。

首先，你需要先安装 `less` 和 `less-loader`：

```shell
npm install less less-loader --save -dev
```

然后将该 loader 添加到 `webpack` 的配置中去，例如：

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },
};
```

接着使用你习惯的方式运行 `webpack`。

### 5 配置webpack插件生成html文件  HtmlWebpackPlugin

该插件将为你生成一个 HTML5 文件， 在 body 中使用 `script` 标签引入你所有 webpack 生成的 bundle。 只需添加该插件到你的 webpack 配置中

**安装**

```shell
npm install --save-dev html-webpack-plugin
```

**基本用法**

```js
// 引入Node内置path模块 专门用于解决路径问题
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

// 使用CJS的模块化规范 暴露一个对象,该对象就是webpack的详细配置对象(规则)
module.exports = {
  mode: "development", //工作模式
  entry: "./src/js/app.js", //入口
  //   输出(出口)
  output: {
    //输出文件的路径
    path: path.resolve(__dirname, "build"),
    // 输出文件的路径
    filename: "js/app.js",
  },
  plugins: [new HtmlWebpackPlugin()],
};
```

这将会生成一个`build/index.html` 文件：

![image-20230109205501868](E:\typora\homework\img\css\image-20230109205501868.png)



生成的内容

```html
<html>
  <head>
    <meta charset="utf-8">
    <title>Webpack App</title>
  <meta name="viewport" content="width=device-width, initial-scale=1"><script defer src="js/app.js"></script></head>
  <body>
  </body>
</html>
```

如果引入多个js，他们都会在已生成 HTML 文件中的 `<script>` 标签内引入。

如果在 webpack 的输出中有任何 CSS 资源。那么这些资源也会在 HTML 文件 `<head>` 元素中的 `<link>` 标签内引入。

**配置**

只有配置模板路径后`webpack`才会生成页面结构

```js
  //   plugins中专门用于配置插件,插件必须经过实例化这一环节
  plugins: [
    new HtmlWebpackPlugin({
      // 模板路径
      template: "./src/index.html",
    }),
  ],
```

配置模板路径之后生成的`index.html`

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script defer src="js/app.js"></script>
  </head>
  <body>
    <div class="title">11</div>
  </body>
</html>
```



### 6 配置webpack处理图片文件

#### 6.1 webpack4 中处理图片

在过去`webpack4`中处理图片采用的loader是`file-loader`和`url-loader`, 可能还有`image-webpack-loader`进行处理图片。

- file-loader: 在css 和html 主页中，相对路径的图片都会被处理，发布到输出目录中

- url-loader: 是对file-loader的封装，因此在安装了file-loader和url-loader 后，在webpack.config.js 中只对url-loader 做配置即可。url-loader的自身功能是给图片一个limit 标准，当图片小于limit时，使用base64 的格式引用图片；否则，使用url 路径引用图片。

- image-webpack-loader: 压缩图片。

#### 6.2webpack5中处理图片

- **现在 `Webpack5` 已经将`file-loader`和`url-loader`两个 `Loader `功能内置到 `Webpack` 里了，我们只需要简单配置即可处理图片资源**

- 假如，像 background 和 icon 这样的图像，要如何处理呢？在 webpack 5 中，可以使用内置的 [Asset Modules](https://webpack.docschina.org/guides/asset-modules/)，我们可以轻松地将这些内容混入我们的系统中：

**webpack.config.js**

```js
// 引入Node内置path模块 专门用于解决路径问题
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

// 使用CJS的模块化规范 暴露一个对象,该对象就是webpack的详细配置对象(规则)
module.exports = {
  mode: "development", //工作模式
  entry: "./src/js/app.js", //入口
  //   输出(出口)
  output: {
    //输出文件的路径
    path: path.resolve(__dirname, "build"),
    // 输出文件的路径
    filename: "js/app.js",
  },
  //   module.rules 中配置一个一个的loader
  module: {
    rules: [
      {
        // 匹配规则 匹配所有.css文件
        test: /\.css$/i,
        // css-loader 将css文件加载到js中,转换成样式字符串  style-loader内联到head的style标签中使样式生效
        use: ["style-loader", "css-loader"],
      },
      {
        // webpack5中已经内置了处理图片的loader
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset",
      },
    ],
  },
};

```



处理你的 CSS 中的 `url('./my-image.png')`。loader 会识别这是一个本地文件，并将 `'./my-image.png'` 路径，替换为 `output` 目录中图像的最终路径

`webpack ` 命令编译后生成的图片

![image-20230109213226286](E:\typora\homework\img\css\image-20230109213226286.png)

#### 6.3优化图片资源

将小于某个大小的图片转化成 data URI 形式（Base64 格式）

优点：减少请求数量

缺点：体积变得更大

此时输出的图片文件就只有两张，有一张图片以 data URI 形式内置到 js 中了 （注意：需要将上次打包生成的文件清空，再重新打包才有效果）

```js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 小于4kb的图片会被base64处理
          },
        },
      },
    ],
  },
};
```


如果一个模块源码大小小于 maxSize，那么模块会被作为一个 Base64 编码的字符串注入到包中， 否则模块文件会被生成到输出的目标目录中。

#### 6.4解析html中图片 html-loader

首先，你需要安装 `html-loader` ：

```sh
npm install --save-dev html-loader
```

然后将插件添加到你的 `webpack` 配置中。例如：

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
     //   plugins中专门用于配置插件,插件必须经过实例化这一环节
  plugins: [
    new HtmlWebpackPlugin({
      // 模板路径
      template: "./src/index.html",
    }),
  ],
};
```



stack overflow 国外代码报错问答社区

思否 国内代码报错问答社区



### 7. 加载 fonts 字体

那么，像字体这样的其他资源如何处理呢？使用 Asset Modules 可以接收并加载任何文件，然后将其输出到构建目录。这就是说，我们可以将它们用于任何类型的文件，也包括字体。让我们更新 `webpack.config.js` 来处理字体文件：

**webpack.config.js**

```js
 const path = require('path');

 module.exports = {
   entry: './src/index.js',
   output: {
     filename: 'bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
   module: {
     rules: [
       {
         test: /\.css$/i,
         use: ['style-loader', 'css-loader'],
       },
       {
         test: /\.(png|svg|jpg|jpeg|gif)$/i,
         type: 'asset/resource',
       },
         //处理字体图标
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          // 将图片文件输出到 font 目录中
          // 将图片文件命名 [hash:8][ext][query]
          // [hash:8]: hash值取8位
          // [ext]: 使用之前的文件扩展名
          // [query]: 添加之前的query参数
          filename: "font/[hash:8][ext][query]",
        },
      },
     ],
   },
 };
```

打包其他的资源

安装 file-loader

```sh
npm i file-loader -D
```

**webpack.config.js**

```js

            {
                //打包其他资源，处理html/js/CSS以外的资源
                exclude: /\.(css|js|html|json|less|png|jpg|gif)$/,
                loader: 'file-loader',
}
```



### 8. devServer

代码修改后的方式是： 手动执行npm run build编译命令，然后去刷新浏览器，这种方式未免也太麻烦了吧？

对的，[webpack](https://so.csdn.net/so/search?q=webpack&spm=1001.2101.3001.7020)已经帮我们想到了，webpack提供了webpack-dev-server包



```sh
npm i webpack-dev-server #安装dev-server

npm i webpack-dev-server -g#全局安装dev-server
```

通过 [webpack-dev-server](https://github.com/webpack/webpack-dev-server) 的这些配置，能够以多种方式改变其行为。这是一个基本的示例，利用 `gzips` 压缩 `public/` 目录当中的所有内容并提供一个本地服务(serve)：

```sh
webpack-dev-server #热启动项目
```

`wbpack-dev-server`生成了打包文件 在内存中

**webpack.config.js**

```js
const path = require('path');
module.exports = {
  /*
  .........
  ...*/
devServer: {
    static: {
      directory: path.join(__dirname, "src"),
    },
    //启动gzip压缩
    compress: true,
    //端口
    port: 9000,
    // 自动打开浏览器
    // open:true
  },
};

```

为了我们后面使用方便，修改package.json，添加启动命令

```json
"dev": "webpack-dev-server"
```

![image-20230111103915692](E:\typora\homework\img\css\image-20230111103915692.png)



添加完使用启动命令： `npm run dev`



这个时候我们去修改代码index.html代码，在保存的同时，我们发现浏览器里的渲染也同步发生了。webpack-dev-server来实现代码的热更新

### 9.mini-css-extract-plugin

安装  `mini-css-extract-plugin`:

```sh
npm install --save-dev mini-css-extract-plugin #安装mini-css-extract-plugin
```

引入

**webpack.config.js**

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  plugins: [
      new MiniCssExtractPlugin({
      filename: "css/index.css",
    })],
  module: {
    rules: [
      {
        test: /\.css$/i,
          // 替换我们之前的  style-loader 
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
```

### 10 css兼容性处理 postcss-loader

安装 postcss-loader

```sh
npm install --save-dev postcss-loader postcss #安装postcss-loader
```

在配置里面`postcss-preset-env`是已经使用了,但是默认没有安装,我们需要安装

```sh
npm install postcss-preset-env 
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
            {
        // 匹配规则 匹配所有.css文件
        test: /\.css$/i,
        // css-loader 将css文件加载到js中,转换成样式字符串  style-loader内联到head的style标签中使样式生效
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          //begin
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                    "postcss-preset-env",
                ],
              },
            },
          },
          //end
        ],
      },
    ],
  },
};
```

#### 10.1 使用vue中处理兼容性的方式

配置package.json，在其中追加browserslist配置，通过配置加载指定的css兼容性样式

```json
  "browserslist": [
      //兼容99%的浏览器
    "> 1%",
      //只考虑最新两个版本的浏览器
    "last 2 versions",
    //退市的浏览器不做兼容 比如IE
    "not dead",
    //兼容ie 10
    "ie 10"
  ]
```

### 11 js语法检查

- 概述:对js基本语法错误/隐患，进行提前检查

- 安装loader		

```sh
npm install --save-dev eslint  eslint-loader
```

- 安装检查规则库

```sh
npm install eslint-config-airbnb-base eslint-plugin-import
```

eslint-config-airbnb-base定制了一套标准的,常用的js语法检查规则,eslint-plugin-import 将eslint-config-airbnb-base导入到eslint-loader中

使用:

webpack.config.js

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
          //对js进行语法检查
        test: /\.js$/,
        exclude: /node_modules/,
          enforce:'pre',
        loader: 'eslint-loader',
        options: {
            //若有问题自动修复
            fix:true
          // eslint options (if necessary)
        },
      },
    ],
  },
  // ...
};
```

修改package.json

```js
  "eslintConfig": {
    "extends": "airbnb-base",
    "env": {
      "browser": true
    }
  }
```



eslint-disable-next-line //下一行不进行eslint检查

### 12 js 语法转换

概述:将浏览器不能识别的新语法转换成原来识别的旧语法，做浏览器兼容性处理。

也就是ES6转换到ES5语法

安装loader

```sh
npm install babel-loader @babel/core @babel/preset-env --save-dev
```

配置  webpack.config.js

```js
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { targets: "defaults" }]
          ]
        }
      }
    }
  ]
}
```

### 13 js兼容性处理

babel会做一些基础语法的转发但是一些高级语法需要`@babel/polyfill` 支持,比如Promise()

安装:

```sh
npm install --save @babel/polyfill
```



需要做语法转换的js里导入 需要先导入

```js
import "@babel/polyfill";
```

### 14 压缩html js css

修改 **webpack.config.js**中  mode: "production" 即可压缩html js文件

**css压缩需要使用额外的插件**

#### 14.1 CssMinimizerWebpackPlugin

安装 `css-minimizer-webpack-plugin`：

```sh
 npm install css-minimizer-webpack-plugin --save-dev
```

接着在 `webpack` 配置中加入该插件。示例：



**webpack.config.js**

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
};
```

这将仅在生产环境开启 CSS 优化。

如果还想在开发环境下启用 CSS 优化，请将 `optimization.minimize` 设置为 `true`:

**webpack.config.js**

```js
// [...]
module.exports = {
  optimization: {
    // [...]
    minimize: true,
  },
};
```

### Webpack总结

#### 1.webpack 总结

```js
module.exports = {
  mode: "", //工作模式
  entry: "", //入口
  //   输出(出口)
  output: {}
  // 一个一个的loader
  module: {
    rules: [
    
    ],
  },
  //   plugins中专门用于配置插件,插件必须经过实例化这一环节
  plugins: [
  ],
};
```

#### 2.webpack打包的基本流程

连接: webpack从入口JS开始，递归查找出所有相关的模块,并【连接】起来形成一个图(网)的结构

编译:将JS模块中的模块化语法【编译】为浏览器可以直接运行的模块语法(当然其它类型资源也会处理)

合并:将图中所有编译过的模块【合并】成一个或少量的几个文件,浏览器真正运行是打包后的文件



#### 3.比较loader与plugins

loader:用于加载特定类型的资源文件, webpack本身只能打包js和json。

plugin:用来扩展webpack其它方面的功能,一般loader处理不了的资源、完成不了的操作交给插件处理。



#### 4 常用loader和plugin

![image-20230113203838721](E:\typora\homework\img\webpack\image-20230113203838721.png)



![image-20230113204049758](E:\typora\homework\img\webpack\image-20230113204049758.png)

#### 5 webpack中的tree-shaking

1.概述: 有些时候，我们一个模块向外暴露了n个函数、对象、或其他一些数据，但是我们只是用到了其中的个或几个，那在最终打包的时候，我们只希望把我们所用的打包进去，这时候就要tree-shaking,即:去除无用代码。

2.配置:同时满足两个条件webpack会自动开启tree-shaking

​	1.使用ES6模块化
​	2.开启production环境
