# Promise 成神之路



[TOC]



## 1 预备知识

#### 1.1 两种类型的[回调](https://so.csdn.net/so/search?q=回调&spm=1001.2101.3001.7020)函数

1. 同步回调

> 立即执行，完全执行完了才结束，不会放入回调队列中

数组遍历相关的回调 / [Promise](https://so.csdn.net/so/search?q=Promise&spm=1001.2101.3001.7020)的executor函数

```js
const arr = [1, 3, 5];
arr.forEach(item => { // 遍历回调，同步回调，不会放入队列，一上来就要执行
  console.log(item);
})
console.log('forEach()之后') // 1 3 5
```

2. 异步回调

> 不会立即执行，会放入回调队列中将来执行

定时器回调 / ajax回调 / Promise成功或失败的回调

```js
// 定时器回调
setTimeout(() => { // 异步回调，会放入队列中将来执行
  console.log('timeout callback()')
}, 0)
console.log('setTimeout()之后')

//先输出  setTimeout()之后
//再输出	timeout callback()
```

promise成功或者失败的回调

```js
// Promise 成功或失败的回调
new Promise((resolve, reject) => {
  resolve(1)
}).then(
  value => {console.log('value', value)},
  reason => {console.log('reason', reason)}
)
console.log('----')
// ----
// value 1
```

#### 1.2 JS中的异常error处理

![image-20221130191858219](E:\typora\homework\img\promise\image-20221130191858219.png)

##### 错误的类型

Error：所有错误的父类型

ReferenceError：引用的变量不存在

```js
console.log(a) // ReferenceError:a is not defined
```


TypeError：数据类型不正确

```js
let b
console.log(b.xxx)
// TypeError:Cannot read property 'xxx' of undefined

let c = {}
c.xxx()
// TypeError:c.xxx is not a function
```


RangeError：数据值不在其所允许的范围内

```js
function fn() {
  fn()
}
fn()
// Uncaught RangeError: Maximum call stack size exceeded
```


SyntaxError：语法错误

```js
const c = """"
// SyntaxError:Unexpected string
```

##### 错误处理（捕获与抛出）

​	抛出错误：throw error

```js
function something() {
  if (Date.now()%2===1) {
    console.log('当前时间为奇数，可以执行任务')
  } else { //如果时间为偶数抛出异常，由调用来处理
    throw new Error('当前时间为偶数，无法执行任务')
 	 }
  }

something();
```

​	捕获错误：try ... catch

// 捕获处理异常

```js
try {
  something()
} catch (error) {
  alert(error.message)
}
```

#### 1.3. 错误对象

- massage 属性：错误相关信息
- stack 属性：函数调用栈记录信息

```js
try {
  let d
  console.log(d.xxx)
} catch (error) {
  console.log(error.message)
  console.log(error.stack)
}
console.log('出错之后')
// Cannot read property 'xxx' of undefined
// TypeError:Cannot read property 'xxx' of undefined
// 出错之后

```

因为错误被捕获处理了，后面的代码才能运行下去，打印出‘出错之后’

## 2 Promise的理解和使用

#### 2.1理解Promise

- 抽象表达：Promise是JS中进行异步编程的新的解决方案(旧方案是`单纯使用回调函数`例如 `ajax`)

​	推荐阅读 【JavaScript】[同步与异步-异步与并行-异步运行机制-为什么要异步编程-异步与回调-回调地狱-JavaScript中的异步操作](https://blog.csdn.net/weixin_44972008/article/details/114380206)

​	---- 异步编程 ①fs 文件操作 ②数据库操作 ③Ajax ④定时器

- 具体表达：

①从语法上看：Promise是一个构造函数 (自己身上有`all`、`reject`、`resolve`这几个方法，原型上有`then`、`catch`等方法)

②从功能上看：promise对象用来封装一个异步操作并可以获取其成功/失败的结果值

- 阮一峰的解释：


所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果

从语法上说，Promise 是一个对象，从它可以获取异步操作的消息

Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理

#### 2.2Promise 的状态

![image-20221130201232230](E:\typora\homework\img\promise\image-20221130201232230.png)

实例对象promise中的一个属性 PromiseState

1. pending 调用resolve 变为fullfilled

2. pending 调用reject 变为rejected

注意

- 对象的状态不受外界影响
- 只有这两种，且一个 promise 对象只能改变一次
- 一旦状态改变，就不会再变，任何时候都可以得到这个结果
- 无论成功还是失败，都会有一个结果数据。成功的结果数据一般称为 value，而失败的一般称为 reason。

#### 2.3Promise对象的值

实例对象promise的另一个值 PromiseResult
保存着对象 成功/失败 的值（value/reason）

resolve/reject可以修改值

#### 2.4Promise 的基本流程

![image-20221130203316335](E:\typora\homework\img\promise\image-20221130203316335.png)

#### 2.5Promise 的基本使用

![image-20221130211434226](E:\typora\homework\img\promise\image-20221130211434226.png)

```js
const promise = new Promise(function(resolve, reject) {
  // ... some code
  if (/* 异步操作成功 */){
    resolve(value);
  } else {//异步操作失败
    reject(reason);
  }
});

```

`Promise`构造函数接受一个函数（`执行器函数`）`executor`作为参数，该函数的两个参数分别是`resolve`和`reject`。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。

`resolve`函数的作用是，将`Promise`对象的状态从“未完成”变为“成功”（即从 `pending` 变为 `fullfilled`），在异步操作成功时调用，并将异步操作的结果，作为参数value传递出去；
`reject`函数的作用是，将`Promise`对象的状态从“未完成”变为“失败”（即从 `pending` 变为` rejected`），在异步操作失败时调用，并将异步操作报出的错误，作为参数error/reason传递出去。

`Promise`实例生成以后，可以用`then`方法分别指定`fullfilled`状态和`rejected`状态的回调函数。

```js
promise.then(function(value) {
  // success 
}, function(reason) {
  // failure
});
```

`then`方法可以接受两个回调函数作为参数。
第一个回调函数`onResolved()`是`Promise`对象的状态变为`resolved`时调用
第二个回调函数`onRejected()`是`Promise`对象的状态变为`rejected`时调用
这两个函数都是可选的，不一定要提供。它们都接受Promise对象传出的值作为参数

`then`方法会把接收的回调函数放入队列中,有多个`then`都会有效



小例子

```js
        // 创建一个新的p对象promise
        const p = new Promise((resolve, reject) => { // 执行器函数
        // 执行异步操作任务
        setTimeout(() => {
            const time = Date.now() 
            // 如果当前时间是偶数代表成功，否则失败
            if (time % 2 == 0) {
            // 如果成功，调用resolve(value)
            resolve('成功的数据，time=' + time)
            } else {
            // 如果失败，调用reject(reason)
            reject('失败的数据，time=' + time)
            }
        }, 1000);
        })
        //then会将回调函数推入队列 所以多个then都会生效
        p.then(
        value => { // 接收得到成功的value数据 onResolved
            console.log('成功的回调1', value)  // 成功的回调 成功的数据，time=1615015043258
        },
        reason => { // 接收得到失败的reason数据 onRejected
            console.log('失败的回调1', reason)    // 失败的回调 失败的数据，time=1615014995315
        }
        )

        p.then(
        value => { // 接收得到成功的value数据 onResolved
            console.log('成功的回调2', value)  // 成功的回调 成功的数据，time=1615015043258
        },
        reason => { // 接收得到失败的reason数据 onRejected
            console.log('失败的回调2', reason)    // 失败的回调 失败的数据，time=1615014995315
        }
        )
```

.then() 和执行器(executor)同步执行，.then() 中的回调函数异步执行

## 3 Promise的API

![image-20221130212330632](E:\typora\homework\img\promise\image-20221130212330632.png)

#### 3.1`Promise.prototype.then` 方法：`p.then(onResolved, onRejected)`

指定两个回调（成功+失败）

- `onResolved` 函数：成功的回调函数 (value) => {}

- `onRejected` 函数：失败的回调函数 (reason) => {}

说明：指定用于得到成功 value 的成功回调和用于得到失败 reason 的失败回调，返回一个新的 `promise` 对象(暂时不研究返回的新Promise对象)


#### 3.2Promise.prototype.catch 方法：p.catch(onRejected)

指定失败的回调

- `onRejected` 函数：失败的回调函数` (reason) => {}`

- 成功了可以没有成功的回调,但是失败了需要有失败的回调,不指定失败的回调就会抛异常

说明：这是`then() `的语法糖，相当于` then(undefined, onRejected)`


```js
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(-100)
    }, 1000);
});
// 不指定异常的回到 底层会抛出异常
p.then(value => {
    console.log('成功了1');
})
p.catch(reason=>{
    console.log('失败了2');
})

```



#### 3.3. Promise.resolve 和 Promise.reject 方法：

##### 3.3.1`Promise.resolve(value)`

`value`：将被 `Promise` 对象解析的参数，也可以是一个成功或失败的 `Promise` 对象

返回：返回一个带着给定值解析过的 Promise 对象，如果参数本身就是一个 Promise 对象，则直接返回这个 Promise 对象。



```js
        let p1 = Promise.reject('原因没有钱')
        let p =Promise.resolve(p1)
        p.then(
        value=>{
            console.log('成功了',value);
        },reason=>{
            console.log('失败了',reason);
        })
		//最后输出 失败了 原因没有钱
```



##### 3.3.2  `Promise.reject(reason)`

`reason`：失败的原因

说明：返回一个失败的 `promise` 对象

```js
        let p1 = Promise.resolve('原因家里有矿')
        let p =Promise.reject(p1)

        p.then(
        value=>{
            console.log('成功了',value);
        },reason=>{
            console.log('失败了',reason);
        })

/*输出 失败了 Promise[[Prototype]]: Promise[[PromiseState]]: "fulfilled"[[PromiseResult]]: "原因家里有矿"*/
```

总结

![image-20221201154349239](E:\typora\homework\img\promise\image-20221201154349239.png)

####  3.4 `Promise.all `方法：`Promise.all(iterable)`

iterable：包含 n 个 promise 的可迭代对象，如`Array `或 `String`

说明：返回一个新的 promise，只有所有的 promise 都成功才成功，只要有一个失败了就直接失败

```js
        let p1 = new Promise((resolve, reject) => {
            resolve('p1成功')
        });
        let p2 = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('穷狗')
            }, 500);
        });
        let p3 = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('没钱')
            }, 2000);
        });
        let p = Promise.all([p1,p2,p3])
        p.then(value=>{console.log('成功了',value);},
        reason=>{
            console.log('失败了原因是:',reason);
        }
        )
        //输出 失败了原因是: 穷狗
```



```js
        let p1 = new Promise((resolve, reject) => {
            resolve('p1成功')
        });
        let p2 = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('家里有矿')
            }, 500);
        });
        let p3 = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('矿里有家')
            }, 2000);
        });
        let p = Promise.all([p1,p2,p3])
        p.then(value=>{console.log('成功了的值是:',value);},
        reason=>{
            console.log('失败了原因是:',reason);
        }
        )
        //输出 成功了的值是: (3) ['p1成功', '家里有矿', '矿里有家']
```

#### 3.5`Promise.race`方法：`Promise.race(iterable)`

iterable：包含 n 个 promise 的可迭代对象，如 Array 或 String

说明：返回一个新的 `promise`，第一个完成的 `promise` 的结果状态就是最终的结果状态
谁先完成就输出谁(不管是成功还是失败)

```js
        let p1 = new Promise((resolve, reject) => {
            resolve('p1成功')
        });
        let p2 = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('家里有矿')
            }, 500);
        });
        let p3 = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('矿里有家')
            }, 2000);
        });
        let p = Promise.race([p1,p2,p3])
        p.then(value=>{console.log('成功了的值是:',value);},
        reason=>{
            console.log('失败了原因是:',reason);
        }
        )
        //输出 成功了的值是: p1成功
```

#### 3.6Promise 的几个关键问题

##### 3.6.1如何改变 promise 的状态？



(1)resolve(value)：如果当前是 pending 就会变为 fulfilled 

(2)reject(reason)：如果当前是 pending 就会变为 rejected

(3)执行器函数(executor)抛出异常：如果当前是 pending 就会变为 rejected(但如果不是pending 是fulfilled 就不会再改变了)

```js
        let p = new Promise((resolve, reject) => {
            // resolve(800);
            throw 900
        });
        p.then(undefined,reason=>{
            console.log('失败',reason);
        })
```



##### 3.6.2改变 promise 状态和指定回调函数谁先谁后？

> 都有可能，常规是先指定回调再改变状态，但也可以先改状态再指定回调

- 如何先改状态再指定回调？

(1)在执行器中直接调用 `resolve()`/`reject()`

(2)延迟更长时间才调用 `then()`

```js
let p = new Promise((resolve, reject) => {
  // setTimeout(() => {
      resolve('OK');
  // }, 1000); // 有异步就先指定回调，否则先改变状态
});

p.then(value => {
  console.log(value);
},reason=>{
  
})
```



##### 3.6.3`promise.then()` 返回的新 promise 的结果状态由什么决定？

(1)简单表达：由 `then()` 指定的回调函数执行的结果决定

![image-20221201205954211](E:\typora\homework\img\promise\image-20221201205954211.png)

**链式调用**

(2)`promise` 的 `then()` 返回一个新的 `promise`，可以并成 `then()` 的链式调用

(3)通过 `then` 的链式调用串联多个同步/异步任务

```js
 let p = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });

        p.then(value=>{
            console.log('成功了1',value);
            return Promise.reject('aa');
        },reason=>{
            console.log('失败了1',reason);
        }).
        then(value=>{
            console.log('成功了2',value);
            return true;
        },reason=>{
            console.log('失败了2',reason);
            return 100;
        }).
        then(value=>{
            console.log('成功了3',value);
            throw 900;
        },reason=>{
            console.log('失败了3',reason);
            return false
        }).
        then(value=>{
            console.log('成功了4',value);
            return 100
        },reason=>{
            console.log('失败了4',reason);
        })
        /**
            输出    成功了1 undefined
                    失败了2 aa
                    成功了3 100
                    失败了4 900
*/
```

#### 3.7promise链式调用解决回调地狱

```js
   function timer(count) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if(Date.now()%2===1) resolve(`正经时间${count}`);
                    reject(`不正经时间${count}`)
                }, 1000);
            });
        }

         timer(1)
        .then(value=>{console.log('成功的回调',value); return timer(2)},reason=>{console.log('失败的回调',reason); return timer(2)})
        .then(value=>{console.log('成功的回调',value); return timer(3)},reason=>{console.log('失败的回调',reason); return timer(3)})
        .then(value=>{console.log('成功的回调',value); return timer(4)},reason=>{console.log('失败的回调',reason); return timer(4)})
        .then(value=>{console.log('成功的回调',value); return timer(5)},reason=>{console.log('失败的回调',reason); return timer(5)})
        .then(value=>{console.log('成功的回调',value); return timer(6)},reason=>{console.log('失败的回调',reason);})

        /**
            输出
            
            失败的回调 不正经时间1
            成功的回调 正经时间2
            成功的回调 正经时间3
            失败的回调 不正经时间4
            失败的回调 不正经时间5
            */
```

##### promise中断链:

1. 当使用promise的then链式调用时，在中间中断，不再调用后面的回调函数。

2. 办法:在失败的回调函数中返回一个`pendding`状态的`Promise`实例。

   

```js
        function timer(count) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if(Date.now()%2===1) resolve(`正经时间${count}`);
                    reject(`不正经时间${count}`)
                }, 1000);
            });
        }

         timer(1)
        .then(value=>{console.log('成功的回调',value); return timer(2)},reason=>
              //中断链式调用
              {console.log('失败的回调',reason);return new Promise((resolve, reject) => {
            
        })})
        .then(value=>{console.log('成功的回调',value); return timer(3)},reason=>{console.log('失败的回调',reason); return new Promise((resolve, reject) => {
            
        });})
        .then(value=>{console.log('成功的回调',value); return timer(4)},reason=>{console.log('失败的回调',reason); return timer(4)})
        .then(value=>{console.log('成功的回调',value); return timer(5)},reason=>{console.log('失败的回调',reason); return timer(5)})
```



##### promise错误穿透

​	1)当使用promise的then链式调用时，可以在最后用`catch`指定一个失败的回调

​	(2)前面任何操作出了错误，都会传到最后的`catch`,失败的回调中处理了

备注:如果不存在then的链式调用，就不需要考虑`then`的错误穿透。

```js
        function timer(count) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if(Date.now()%2===1) resolve(`正经时间${count}`);
                    reject(`不正经时间${count}`)
                }, 1000);
            });
        }

         timer(1)
        .then(value=>{console.log('成功的回调',value); return timer(2)})
        .then(value=>{console.log('成功的回调',value); return timer(3)})
        .then(value=>{console.log('成功的回调',value); return timer(4)})
        .then(value=>{console.log('成功的回调',value); return timer(5)})
        .then(value=>{console.log('成功的回调',value); return timer(6)})
        // 当前面链式回调任何一个出现错误都会跳到catch这里
        .catch(reason=>{console.log('发现错误正在执行catch的回调',reason);})
```

Promise优势:
1 指定回调函数的方式更加灵活:
旧的:必须在启动异步任务前指定
promise:启动异步任务=>返回`promise`对象=>给`promise`对象绑定回调函数(甚至可以在异步任务之后)再绑定回调函数

 

#### 3.8回调地狱问题终极解决方案 `async/ await`

1 `async/ await`底层实际上依然使用then的链式调用)



2 `async`修饰的函数
函数的返回值为`Promise`对象
`Promise`实例的结果由`async`函数执行的返回值决定

3 `await`表达式
	`await`右侧的表达式一般为`Promise`实例对象，但也可以是其它的值

- 如果表达式是promise对象，await后的返回值是promise成功的值

- 如果表达式是其它值，直接将此值作为await的返回值

注意:
await必须写在`async`函数中，但`async`函数中可以没有`await`
如果await的promise失败了，就会抛出异常，需要通过`try. ..catch`来捕获处理

```js
   function timer(count) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if(Date.now()%2===1) resolve(`还有机会${count}`);
                    reject(`结束了${count}`)
                }, 1000);
            });
        }
        //定义一个立即执行函数 前面用async修饰 前面要加一个;号 表示前面的语句已经结束
        ;(async()=>{
            try {
                let value = await timer(1);
                console.log('等到了',value);

                value = await timer(2);
                console.log('等到了',value);

                value = await timer(3);
                console.log('等到了',value);

                value = await timer(4);
                console.log('等到了',value);

                value = await timer(5);
                console.log('等到了',value);
            } catch (reason) {
                console.log('等不到了',reason);
            }
        })()
```



`await`的原理

若我们使用`async`配合`await`这种写法:
1.表面上不出现任何的回调函数

2.但实际上底层把我们写的代码进行了加工，把回调函数"还原”回来了。

3.最终运行的代码是依然有回调的，只是程序员没有看见。

```js
        async function demo(){
            // 程序员的写法 
            let p = await timer(1);
            console.log(p);
            console.log(10);
            console.log(100);

        }
        /**
         *
         浏览器翻译后的写法
         */
        p.then(value=>{
                console.log(p);
                console.log(10);
                console.log(100);
            })
```

## 4 宏队列与微队列

- 浏览器会先执行主线程中的代码,主线程中代码执行完毕才会再执行异步代码

- 浏览器中有两个异步任务队列 `宏队列`和`微队列`

- 微队列的优先级高于宏队列 ,`主线程`执行完成后会先执行`微队列`的中的代码然后再执行`宏队列`中的代码

- 目前使用`微队列`的异步任务只有promise,其他的异步任务都有`宏队列`所管理

![image-20221202162018509](E:\typora\homework\img\promise\image-20221202162018509.png)

宏队列:[宏任务1，宏任务2.....]

微队列:[微任务1，微任务2.....]

规则:每次要执行宏队列里的‘个任务之前，先看微队列里是否有待执行的微任务

1.如果有，先执行微任务
2.如果没有，按照宏队列里任务的顺序，依次执行

案例

```js
  setTimeout(() => {
         console.log('time1');
         Promise.resolve(5).then(value=>{
            console.log('成功5',value);
            })   
        });
        setTimeout(() => {
         console.log('time2');   
        });
        Promise.resolve(3).then(value=>{
            console.log('成功3',3);
        })
        Promise.resolve(4).then(value=>{
            console.log('成功4',4);
        })
        /**
         * 
         输出

        成功3 3
        成功4 4
        time1
        成功5 5
        time2
        */
```

Promise成神完结撒花 `2022年12月2日16:58:45`
