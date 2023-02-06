# 前端vue2商城项目

## 项目结构

#### vue-cli脚手架初始化项目。

1. node + webpack +淘宝镜像
2. node_modules文件夹:项目依赖文件夹
3. public文件夹:一般放置一些静态资源（图片)，需要注意，放在public文件夹中的静态资源，webpack进行打包的时候，会原封不动打包到dist文件夹中。
4. src文件夹(程序员源代码文件夹):
5. assets文件夹:一般也是放置静态资源(一般放置多个组件共用的静态资源），需要注意，放置在assets文件夹里面静态资源，在webpack打包的时候，webpack会把静态资源当做一个模块，打包JS文件里面。
6. components文件夹:一般放置的是非路由组件（全局组件)
7. App.vue:唯一的根组件，Vue当中的组件（.vue）
8. main.js:程序入口文件，也是整个程序当中最先执行的文件
9. babel.config.js:配置文件（babel相关)
10. package.json文件:认为项目‘身份证'，记录项目叫做什么、项目当中有哪些依赖、项目怎么运行。
11. package-lock.json:缓存性文件

#### 其他项目配置

项目运行起来的时候,让浏览器自动打开---在`package.json`文件中配置

```js
  "scripts": {
    "serve": "vue-cli-service serve --open",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
```



在`vue.config.js`文件中配置语法

```js
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭默认语法检查
  lintOnSave:false
})

```

## 项目搭建

#### 拆分组件

完成非路由组件Header与Footer业务
在咱们项目当中,不在以HTML +CSS为主,主要搞业务、逻辑在开发项目的时候;
1:书写静态页面（HTML +CSS)

2:拆分组件

3:获取服务器的数据动态展示

4:完成相应的动态业务逻辑

注意:创建组件的时候,组件结构＋组件的样式+图片资源

注意2:咱们项目采用的less样式，浏览器不识别less样式，需要通过less、less-loader【安装6版本的】进行处理less，把less样式变为css样式，浏览器才可以识别。

```shell
npm i -g less-loader@6
```

注意3:如果想让组件识别less样式，需要在style标签的身上加上lang=less

![image-20221205160119895](E:\typora\homework\img\mall\image-20221205160119895.png)

#### 路由配置

路由组件的搭建vue-router
在上面分析的时候，路由组件应该有四个: Home、Search. Login.Register- components文件夹:经常放置的非路由组件(共用全局组件)
-pages |views文件夹:经常放置路由组件

##### 5.1配置路由

项目当中配置的路由一般放置在router文件夹中

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/pages/Home/HomeRouter'
import Login from '@/pages/Login/LoginRouter'
import Register from '@/pages/Register/RegisterRouter'
import Search from '@/pages/Search/SearchRouter'
Vue.use(VueRouter);
export default new VueRouter({
    //配置路由
    routs:[
        {
            path:"/home",
            component:Home
        },
        {
            path:"/login",
            component:Login
        },
        {
            path:"/register",
            component:Register
        },
        {
            path:"/search",
            component:Search
        },
        {
            path:"*",
            component:'/home'
        },
    ]
})
```



##### 5.2总结

![image-20221205160557971](E:\typora\homework\img\mall\image-20221205160557971.png)

路由组件与非路由组件的区别?
1:路由组件一般放置在pages|views文件夹，非路由组件一般放置components文件夹中
2:路由组件一般需要在router文件夹中进行注册（使用的即为组件的名字)，非路由组件在使用的时候，一般都是以标签的形式使用
3:注册完路由，不管路由路由组件、还是非路由组件身上都有$route、$router属性
$route:一般获取路由信息【路径、query、 params等等】
$router:一般进行编程式导航进行路由跳转【push|replace】



#### 路由参数相关问题

##### 1 路由传递参数(对象写法)path是否可以结合params参数一起使用?

路由跳转传参的时候,对象的写法可以是name path 形式,但是需要注意的是,path 这种写法不能与params参数一起使用



##### 2 如何指定params参数可传可不传?

如果路由要求传递params参数,但是你就不传递params参数,会发现一件事情,URL会有问题的。如何指定params参数可以传递,或者不传递,在配置路由的时候,在站位的后面加上一个问号 【params可以传递参数或者不传递参数】



##### 3 如果params参数传递是空串该怎样处理?

使用undefined解决 params参数可以传递,不传递

```js
params:{keyword:''||undefined}
```



##### 4 路由组件能不能传递props数据

==props传参只能传递params参数==

可以传递 有三种形式

1)  配置props为true

```js
   //router ->index.js 配置
routes:[
        {
            name:'find',
            path:"/search/:key",
            component:SearchRouter,
            props:true
           
        }
    ]

//组件中路由参数传递 必须有params参数
            this.$router.push({
                name:'find',
                // path:'/search',
                query:{
                    keyword:this.keyword
                },
                params:{
                    keyword:this.keyword               }
            })

//路由组件中接收
export default {
    props:['keyword']
}
```

2)  对象写法

```js
    //router ->index.js 配置   
		{
            name:'find',
            path:"/search",
            component:SearchRouter,
                //props配置成一个对象
            props:{
                a:1,
                b:2
            }       
        },
            
            
    // 在路由组件中的写法
    export default {
    props:['a','b']
}
```

3) 函数写法

```js
    //router ->index.js 配置   
		{
            name:'find',
            path:"/search",
            component:SearchRouter,
                //props配置成一个函数
            props:($route)=>{
                return {
                    keyword:$route.params.keywprd,
                    k:$route.params.k
                }
            }
        },
            
// 在路由组件中接收参数的写法
export default {
    props:['keyword','k']
}   
```

#### axios二次封装

##### 6.1 axios二次封装

XMLHttpRequest. fetch、JQ、axios6.1为什么需要进行二次封装axios?
请求拦截器、响应拦截器:请求拦截器，可以在发请求之前可以处理一些业务、响应拦截器，当服务器数据返回以后，可以处理一些事情

```js
//封装一个request.js 文件
import axios from 'axios';
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import "nprogress/nprogress.css"
//复制一个axios实例
const requests = axios.create({
    //基础路径
    baseURL:"/api",
    timeout:5000
})
// 请求拦截器
requests.interceptors.request.use((config)=>{
    nprogress.start()
    return config
})

// 响应拦截器
requests.interceptors.response.use((response)=>{
    nprogress.done();
    return response.data
},(error)=>{
    return Promise.reject(error.message)
})

export default requests;




// 在index.js 使用封装的axios
//当前模块 API进行统一管理
import requests from "./request";
export const categoryList = ()=>{
    return requests.get('/product/getBaseCategoryList');
}

```



##### 6.2 在项目当中经常API文件夹【axios 】接口当中:路径都带有/api

baseURL : " / api" 



7:接口统一管理
项目很小:完全可以在组件的生命周期函数中发请求项目大: axios.get( 'xxx ')

#### 7.1跨域问题

什么是跨域:协议、域名、端口号不同请求，称之为跨域

JSONP CROS 代理服务器解决跨域

配置代理服务器

```js
  devServer:{
    proxy:{
      "/api":{
        target:"http://gmall-h5-api.atguigu.cn",
        // 路径重写 这里所有用的接口都有api所有不用重写路径
        // pathRewrite:{'^/api':''}
      }
    }
  }
```

#### 8 vuex

vuex是官方提供一个插件，状态管理库，集中式管理项目中组件共用的数据。
切记，并不是全部项目都需要vuex，如果项目很小，完全不需要Vuex，如果项目很大，组件很多、数据很多，数据维护很费劲，Vuex 

##### 8.1vuex实现模块式开发

如果项目过大，组件过多，接口也很多，数据也很多,可以让Vuex实现模块式开发模拟state存储数据



```js
// store ->  index.js  -------------------
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// vuex模块化开发
// 引入小仓库
import home from '@/store/home'
import search from '@/store/search'

// store类的一个实例
export default new Vuex.Store({
      modules:{
        home,
        search
      }
})


// store ->home -> index.js  ------------------- home模块
import {categoryList} from '@/api'

//state 仓库存储数据的地方
const state ={
    // state中数据默认初始化值 服务器返回对象 服务器返回数组【根据接口的返回值初始化】
    categoryList:[]
};
//在mutations中修改state
const mutations={
    CATEGORY_LIST(state,categoryList){
        state.categoryList =categoryList;
    }
};

//actions 处理业务逻辑 或者异步任务
const actions ={
   async categoryList(context){
        let result =  await categoryList();
        context.commit('CATEGORY_LIST',result.data);
   }
};
// getters:理解为计算属性 用于简化仓库数据,让组件获取仓库数据更加方便
const getters ={
    
}
export default {
    state,
    mutations,
    actions,
    getters
}



// ---------store->search->index.js search模块
//state 仓库存储数据的地方
const state ={

};
//在mutations中修改state
const mutations={

};

//actions 处理业务逻辑 或者异步任务
const actions ={

};
// getters:理解为计算属性 用于简化仓库数据,让组件获取仓库数据更加方便
const getters ={
    
}
export default {
    state,
    mutations,
    actions,
    getters
}
```

#### 防抖和节流

3)演示卡顿现象
正常:事件触发非常频繁，而且每一次的触发，回调函数都要去执行(如果时间很短，而回调函数内部有计算，那么很可能出现浏览器卡顿)



防抖:用户操作很频繁，但是只是执行最后一次。前面的所有操作都会取消。
节流:用户操作很频繁，但是把频繁的操作变为少量操作，例如1秒中用户点击了10次但是只执行一次【可以给浏览器有充裕的时间解析代码】



#### 编程式导航+向上冒泡 

最好的解决方案:编程式导航+事件委派
存在一些问题:事件委派，是把全部的子节点【h3、dt、dl、em】的事件委派给父亲节点

点击a标签的时候，才会进行路由跳转【怎么能确定点击的一定是a标签】
存在另外一个问题:即使你能确定点击的是a标签，如何区分是一级、二级、三级分类的标签。
第一个问题:把子节点当中a标签，我加上自定义属性data-category，其余的子节点是没有的

![image-20221208210015602](E:\typora\homework\img\mall\image-20221208210015602.png)

```js
        goSearch(event){
            //通过category判断是不是a标签
            let {category} = event.target.dataset
            
            if(category){
                // 路由跳转
                this.$router.push({
                    name:'find',
                    query:{
                        category,
                        categoryName:event.target.innerHTML
                    }
                })
            }
        }
```



#### 模拟数据mockjs

1) Mockjs: 用来拦截ajax请求, 生成随机数据返回

安装

```shell
npm i mockjs
```

2) 使用(mock/mockServer.js)

 利用mockjs来mock数据接口

```js
import Mock from 'mockjs'
// 把JSON数据格式引入进来
import banner from './banner.json'
import floor from './floor.json'
// JSON数据格式 引入 webpack 默认对外暴露:图片 JSON数据格式

// mock 第一个参数请求地址 第二个参数请求数据
Mock.mock('/mock/banner',{code:200,data:banner}) //模拟首页轮播图
Mock.mock('/mock/floor',{code:200,data:floor}) //



//在main.js引入一下
import '@/mock/mockServe'


// 获取banner轮播图 (Home首页轮播图的接口) 使用接口
export const getBannerList =()=>{
    return requests.get('/mock/banner')
}
```

