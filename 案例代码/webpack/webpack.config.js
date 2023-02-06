/*
1 该文件是webpack的配置文件，所有webpack的任务、用到的loader、plugins都要配置在这里
2 该文件要符合CJs模块化规范
*/
// 引入Node内置path模块 专门用于解决路径问题
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
// 引入MiniCssExtractPlugin 提取为单独的CSS文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 使用CJS的模块化规范 暴露一个对象,该对象就是webpack的详细配置对象(规则)
module.exports = {
  mode: "production", //工作模式
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
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          //begin
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["postcss-preset-env"],
              },
            },
          },
          //end
        ],
      },
      {
        // webpack5中已经内置了处理图片的loader
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          // 将图片文件输出到 img 目录中
          // 将图片文件命名 [hash:8][ext][query]
          // [hash:8]: hash值取8位
          // [ext]: 使用之前的文件扩展名
          // [query]: 添加之前的query参数
          filename: "img/[hash:8][ext][query]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          // 将图片文件输出到 img 目录中
          // 将图片文件命名 [hash:8][ext][query]
          // [hash:8]: hash值取8位
          // [ext]: 使用之前的文件扩展名
          // [query]: 添加之前的query参数
          filename: "font/[hash:8][ext][query]",
        },
      },
      {
        // 配置解析html中的图片
        test: /\.html$/i,
        loader: "html-loader",
      },
      // 打包其他的资源
      {
        //打包其他资源，处理html/js/CSS以外的资源
        exclude: /\.(css|js|html|json|less|png|jpg|gif)$/,
        loader: "file-loader",
      },
      {
        //对js进行语法检查
        test: /\.js$/,
        exclude: /node_modules|webpack.config.js/,
        enforce: "pre",
        loader: "eslint-loader",
        options: {
          //若有问题自动修复
          fix: true,
          // eslint options (if necessary)
        },
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
  //   plugins中专门用于配置插件,插件必须经过实例化这一环节
  plugins: [
    new HtmlWebpackPlugin({
      // 模板路径
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "css/index.css",
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "src"),
    },
    compress: true,
    port: 9000,
    // 开启热模替换
    hot: true,
    // 自动打开浏览器
    // open:true
  },
};
