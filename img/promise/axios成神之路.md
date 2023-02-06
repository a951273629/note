# axios成神之路

[TOC]

## 前置工作

###  json-server搭建一台服务器

地址:https://github.com/typicode/json-server

全局安装

```shell
npm install -g json-server
```

启动服务器

```shell
json-server --watch db.json
```

### 一般http请求与ajax请求-

1 jax请求是一种特别的 http请求
2．对服务器端来说，没有任何区别，区别在浏览器端
3．浏览器端发请求:只有XHR或fetch发出的才是ajax请求，其它所有的
都是非ajax请求
4．浏览器端接收到响应
(1)一般请求:浏览器一般会直接显示响应体数据，也就是我们常说的
自动刷新/跳转页面
(2) ajax请求:浏览器不会对界面进行任何更新操作，只是调用监视的
回调函数并传入响应相关数据

## axios使用

### 3.1 axios特点

1．基本promise的异步ajax请求库

2．浏览器端/node端都可以使用

3  支持请求/响应拦截器

4．支持请求取消

5．请求/响应数据转换c6.批量发送多个请求

### 3.2  axios基本使用

1.axios调用的返回值是Promise实例。

2.成功的值叫response，失败的值叫error.

3.axios成功的值是一个axios封装的response对象，服务器返回的真正数据在response.data中

4携带query参数时,编写的配置项叫params

```js
        let btn = document.querySelector('#btn');
        btn.onclick = ()=>{
            //发送 GET请求----不携带参数
            let result = axios({
                url:'http://localhost:5000/persons',
                method:'GET'
            })
            result.then(response=>{
                console.log('请求成功',response);
            },
            error=>{
                console.log('请求失败',error);
            })
        }
        
        
        
        //精简方式
        axios.get('http://localhost:5000/persons').then(
                response=>{
                console.log('请求成功',response.data);
            },
            error=>{
                console.log('请求失败',error);
            }
            )
```

![image-20221202212419770](E:\typora\homework\img\axios\image-20221202212419770.png)

#### get请求携带query参数

携带query参数时,编写的配置项叫params

```js
        btn.onclick = ()=>{
            let result = axios({

                url:'http://localhost:5000/person',
                method:'GET',
                params:{
                    id:'1'
                }
            })
            result.then(response=>{
                console.log('请求成功',response.data);
            },
            error=>{
                console.log('请求失败',error);
            })


            axios.get('http://localhost:5000/person',{params:{id:'1'}}).then(
                response=>{
                console.log('请求成功',response.data);
            },
            error=>{
                console.log('请求失败',error);
            }
            )
        }
```

#### post请求携带请求体参数

```js
            axios({
                url:"http://localhost:5000/person",
                method:"POST",
                data:{
                    name:'大哥',
                    age:'26'
                }
            }).then(response=>{
                console.log('请求成功',response.data);
            },error=>{
                console.log('请求失败',error.data);
            })

            axios.post('http://localhost:5000/person',{name:'大哥',age:'26'}).then(
                response=>{
                console.log('请求成功',response.data);
            },
            error=>{
                console.log('请求失败',error);
            }
            )
```

#### PUT 请求携带请求体参数

```js
            axios({
                url:"http://localhost:5000/person",
                method:"PUT",
                data:{
                    id: "1",
                    name:'大萌萌',
                    age:'28'
                }
            }).then(response=>{
                console.log('请求成功',response.data);
            },error=>{
                console.log('请求失败',error.data);
            })

            axios.put('http://localhost:5000/person',{id:'1',name:'大哥',age:'26'}).then(
                response=>{
                console.log('请求成功',response.data);
            },
            error=>{
                console.log('请求失败',error);
            }
            )
```

#### axios常用默认配置

```js
        // 给axios配置默认属性
        axios.defaults.timeout = 2000;	
        //默认请求头
        axios.defaults.headers = {
            school:'gg'
        }
        // 基础路径
        axios.defaults.baseURL = 'http://localhost:5000'
```

#### axios.create 创建一个新的axios

axios.create(config)

1. 根据指定配置创建一个新的axios,也就是每个新axios都有自己的配置
2. 新axios只是没有取消请求和批量发请求的方法,其他所有的语法都是一致的
3. 为什么要设计这个create

​		需求:项目中有部分接口的配置与另一部分接口需要的配置不太一样

```js
        let axios_2 = axios.create({
        timeout : 2000,
        headers : {
            school:'gg'
        },
        baseURL : 'http://localhost:5000'
        })
```



### 3.3axios拦截器



#### axios请求拦截器

1 是什么?

​	在真正发送请求前执行的一个回调函数

2 作用:

​	对所有的请求做统一的处理:追加请求头,追加参数,界面loading提示等等

```js
        // axios请求拦截器
        axios.interceptors.request.use((config)=>{
            if(Date.now()%2 === 0){
                config.headers.token='asdasd344dsc'
            }
            console.log(config);
            return config
        })
```

请求拦截器接收到的参数config

![image-20221204103504596](E:\typora\homework\img\axios\image-20221204103504596.png)



#### axios响应拦截器

1 是什么?

​	得到响应之后执行的一组回调函数

2 作用:

​	若请求成功,对成功的数据进行处理

​	若请求失败,对失败进行进一步操作

如果有多个拦截器 后指定的先执行

```js
        // axios响应拦截器
        axios.interceptors.response.use(response=>{
            if(Date.now()%2 === 0){
                return response.data;
            }
            return "时间戳不是偶数失败"
        },error=>{
            console.log('响应拦截器失败的回调');
            alert(error)
            // 返回一个pending状态的promise 让请求不走成功也不走失败中断在这里
            return new Promise(()=>{});
        })
```

#### 取消请求和拦截器搭配使用实现`防抖`

```js
        // 拦截器和取消请求配合来 防止请求连续多次发送
        // 取消请求
        const {CancelToken,isCancel} = axios
        // axios请求拦截器
        axios.interceptors.request.use((config)=>{
            if(axios.cancel)axios.cancel();
            config.cancelToken = new CancelToken(c=>axios.cancel=c)
            return config
        })

        //响应拦截器 判断和处理这次返回的是取消请求还是一个错误
        axios.interceptors.response.use(response=>{
            return response.data;
        },
        error=>{
            if(isCancel(error)){
                console.log('取消了请求原因是',error.message);
            }else{
                console.log('失败了',error);
            }
            return new Promise(()=>{})
        })

        btn.onclick = async ()=>{
             console.log(await axios.get('http://localhost:5000/test1?delay=3000'));  
        }
```

### 3.4axios批量发送请求

```js
        btn.onclick = async ()=>{
           axios.all([
              axios.get('http://localhost:5000/test1'),
              axios.get('http://localhost:5000/test2'),
              axios.get('http://localhost:5000/test3')
           ]).then(
            response =>{
                console.log(response);
            },
            error=>{

            }
           ) 
        }
```



axios完结撒花  2022年12月4日16:58:54  