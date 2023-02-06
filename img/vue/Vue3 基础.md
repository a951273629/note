# Vue3 基础

## 1创建vue项目

### 1.1使用vue-cli创建一个项目

```shell
##检查vue/cli版本必须4.5以上
vue --version

##如果版本过低升级@vue/cli脚手架版本
npm install -g @vue/cli

##创建项目
vue create vue_test


cd vue_test
## 启动项目
npm run serve
```

### 1.2使用vite创建vue项目

- 说是新一代的前端构建工具
- 优点
  - 开发环境中 无需打包操作,可以快速冷启动
  - 轻量快速的热重载
  - 按需编译，不用等待整个应用编译完成





![image-20221125205735820](E:\typora\homework\img\vue\image-20221125205735820.png)



vite创建命令

```shell
## 创建应用
npm create vite@latest

## cd到目录下
cd my-project

##安装
npm install
##运行
npm run dev

```

## 2 常用Composition组合式 API

vue3中的Vue实例

![image-20221126113314146](E:\typora\homework\img\vue\image-20221126113314146.png)

### 2.1初识setup

```js
  //非响应式的
  setup(props) {
    console.log(props);
    // 定义变量
     let a='11'
     let b ='c'
    // 定义函数
     function hello() {
      alert('欢迎安安安啊')
     }
     return {
      a,
      b,
      hello
     }
  }
```

![image-20221126115618679](E:\typora\homework\img\vue\image-20221126115618679.png)

### 2.2 ref函数

ref作用定义一个响应式的数据



![image-20221126153423164](E:\typora\homework\img\vue\image-20221126153423164.png)



基本数据类型的`.value`

对象类型`.value`

![image-20221126153600689](E:\typora\homework\img\vue\image-20221126153600689.png)

```js
import {ref} from 'vue'
export default {
  name: 'App',
    
  setup(props) {
    console.log(props);
    // 定义响应式的变量
     let a=ref('11')
     let b =ref('c')
     let unions =ref({
      a:1,
      b:2,
      address:'天山人间'
     })
    // 定义函数
     function hello() {
      console.log('这是的a是:',a);
      console.log('这是a.value:',a.value);
      console.log('这是unions.value',unions.value);
      a.value+=a.value;
      b.value+=b.value;
      unions.value.address='上天了啊'
      // alert('欢迎安安安啊')
     }
     return {
      a,
      b,
      unions,
      hello
     }
  }
}
```





![image-20221126154316609](E:\typora\homework\img\vue\image-20221126154316609.png)

### 2.3 reactive 函数

![image-20221126160453610](E:\typora\homework\img\vue\image-20221126160453610.png)

```js
import {reactive} from 'vue'
export default {
  name: 'App',
  //非响应式的
  setup() {
    let p =reactive({
      a:1,
      b:2,
      address:'天上人间',
      hobby:['喝酒','烫头']
    })
    // 定义函数
     function hello() {
      p.a=2;
      p.b+=1
      p.address='灰机'
      p.hobby=['抽烟','睡觉']
      // alert('欢迎安安安啊')
     }
     return {
      p,
      hello
     }
  }
}
```

### 2.4 vue中的响应式原理

#### 2.4.1  vue2中实现响应式

使用`defineProperty`来对对象读取,修改进行拦截

![image-20221126171827165](E:\typora\homework\img\vue\image-20221126171827165.png)



#### 2.4.2 vue3中实现响应式

`proxy`代理

`Reflect`反射

![image-20221126172024026](E:\typora\homework\img\vue\image-20221126172024026.png)

```js
    let person={
        name:'帅哥',
        age:21
    }
    const p =new Proxy(person,{
        //获取属性的调用
        get(target,propName){
            console.log('有人要取这个person',propName);
            return Reflect.get(target,propName)
        },
        //修改属性时调用
        set(target,propName,value){
            console.log(`有人修改了p身上的${propName}属性,现在要去更新界面`);
            // target['propName'] = value
            Reflect.set(target,propName,value)
        },
        //有人读取p的某个属性时调用
        deleteProperty(target,propName){
            console.log(`有人删除了p身上的${propName}属性,要去更新界面`);
            return Reflect.deleteProperty(target,propName)
        }
    })
```

### 2.5 ref和reactive 对比

![image-20221126172556984](E:\typora\homework\img\vue\image-20221126172556984.png)

### 2.6setup的注意点

![image-20221126180913468](E:\typora\homework\img\vue\image-20221126180913468.png)

### 2.7 computed计算属性 与监视属性

#### 2.7.1 computed

![image-20221126201359838](E:\typora\homework\img\vue\image-20221126201359838.png)

#### 2.7.2 watch 监视

![image-20221126204324978](E:\typora\homework\img\vue\image-20221126204324978.png)



![image-20221126205606178](E:\typora\homework\img\vue\image-20221126205606178.png)

#### 2.7.3 watchEffect 函数

- watch的套路是：既要指明监视的属性，也要指明监视的回调。

- watchEffect的套路是：不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性。

- watchEffect有点像computed：

  - 但computed注重的计算出来的值（回调函数的返回值），所以必须要写返回值。
  - 而watchEffect更注重的是过程（回调函数的函数体），所以不用写返回值。

```js
//watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调。
watchEffect(()=>{
    const x1 = sum.value
    const x2 = person.age
    console.log('watchEffect配置的回调执行了')
})
```

### 2.8 生命周期

- Vue3.0中可以继续使用Vue2.x中的生命周期钩子，但有有两个被更名：
  - ```beforeDestroy```改名为 ```beforeUnmount```
  - ```destroyed```改名为 ```unmounted```
- Vue3.0也提供了 Composition API 形式的生命周期钩子，与Vue2.x中钩子对应关系如下：
  - `beforeCreate`===>`setup()`
  - `created`=======>`setup()`
  - `beforeMount` ===>`onBeforeMount`
  - `mounted`=======>`onMounted`
  - `beforeUpdate`===>`onBeforeUpdate`
  - `updated` =======>`onUpdated`
  - `beforeUnmount` ==>`onBeforeUnmount`
  - `unmounted` =====>`onUnmounted`



生命周期图

![lifecycle.16e4c08e](E:\typora\homework\img\vue\lifecycle.16e4c08e.png)

### 9.自定义hook函数

- 什么是hook？—— 本质是一个函数，把setup函数中使用的Composition API进行了封装。

- 类似于vue2.x中的mixin。

- 自定义hook的优势: 复用代码, 让setup中的逻辑更清楚易懂。



定义一个`usePoint.js`

```js
import {reactive,onMounted,onBeforeUnmount} from 'vue'
export default function (){
	//实现鼠标“打点”相关的数据
	let point = reactive({
		x:0,
		y:0
	})

	//实现鼠标“打点”相关的方法
	function savePoint(event){
		point.x = event.pageX
		point.y = event.pageY
		console.log(event.pageX,event.pageY)
	}

	//实现鼠标“打点”相关的生命周期钩子
	onMounted(()=>{
		window.addEventListener('click',savePoint)
	})

	onBeforeUnmount(()=>{
		window.removeEventListener('click',savePoint)
	})

	return point
}

```



在其他组件中引用就可以使用了

```vue
<template>
	<h2>当前求和为：{{sum}}</h2>
	<button @click="sum++">点我+1</button>
	<hr>
	<h2>当前点击时鼠标的坐标为：x：{{point.x}}，y：{{point.y}}</h2>
</template>

<script>
	import {ref} from 'vue'
	import usePoint from '../hooks/usePoint'
	export default {
		name: 'Demo',
		setup(){
			//数据
			let sum = ref(0)
			let point = usePoint()
			

			//返回一个对象（常用）
			return {sum,point}
		}
	}
</script>

```

### 10.toRef

- 作用：创建一个 ref 对象，其value值指向另一个对象中的某个属性。
- 语法：```const name = toRef(person,'name')```
- 应用:   要将响应式对象中的某个属性单独提供给外部使用时。


- 扩展：```toRefs``` 与```toRef```功能一致，但可以批量创建多个 ref 对象，语法：```toRefs(person)```

## 三、其它 Composition API

### 1.shallowReactive 与 shallowRef

- shallowReactive：只处理对象最外层属性的响应式（浅响应式）。
- shallowRef：只处理基本数据类型的响应式, 不进行对象的响应式处理。

- 什么时候使用?
  -  如果有一个对象数据，结构比较深, 但变化时只是外层属性变化 ===> shallowReactive。
  -  如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来替换 ===> shallowRef。

### 2.readonly 与 shallowReadonly

- readonly: 让一个响应式数据变为只读的（深只读）。
- shallowReadonly：让一个响应式数据变为只读的（浅只读）。
- 应用场景: 不希望数据被修改时。

### 3.toRaw 与 markRaw

- toRaw：
  - 作用：将一个由```reactive```生成的<strong style="color:orange">响应式对象</strong>转为<strong style="color:orange">普通对象</strong>。
  - 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新。
- markRaw：
  - 作用：标记一个对象，使其永远不会再成为响应式对象。
  - 应用场景:
    1. 有些值不应被设置为响应式的，例如复杂的第三方类库等。
    2. 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能。

### 4.customRef

- 作用：创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。

- 实现防抖效果：

  ```vue
  <template>
  	<input type="text" v-model="keyword">
  	<h3>{{keyword}}</h3>
  </template>
  
  <script>
  	import {ref,customRef} from 'vue'
  	export default {
  		name:'Demo',
  		setup(){
  			// let keyword = ref('hello') //使用Vue准备好的内置ref
  			//自定义一个myRef
  			function myRef(value,delay){
  				let timer
  				//通过customRef去实现自定义
  				return customRef((track,trigger)=>{
  					return{
  						get(){
  							track() //告诉Vue这个value值是需要被“追踪”的
  							return value
  						},
  						set(newValue){
  							clearTimeout(timer)
  							timer = setTimeout(()=>{
  								value = newValue
  								trigger() //告诉Vue去更新界面
  							},delay)
  						}
  					}
  				})
  			}
  			let keyword = myRef('hello',500) //使用程序员自定义的ref
  			return {
  				keyword
  			}
  		}
  	}
  </script>
  ```

  ### 5.provide 与 inject

  

  ![image-20221127172808559](E:\typora\homework\img\vue\image-20221127172808559.png)

  - 作用：实现<strong style="color:#DD5145">祖与后代组件间</strong>通信

  - 套路：父组件有一个 `provide` 选项来提供数据，后代组件有一个 `inject` 选项来开始使用这些数据

  - 具体写法：

    1. 祖组件中：

       ```js
       import {provide} from 'vue'
       
       setup(){
       	......
           let car = reactive({name:'奔驰',price:'40万'})
           provide('car',car)
           ......
       }
       ```

    2. 后代组件中：

       ```js
       import {inject} from 'vue'
       
       setup(props,context){
       	......
           const car = inject('car')
           return {car}
       	......
       }
       ```

  ### 6.响应式数据的判断

  - isRef: 检查一个值是否为一个 ref 对象
  - isReactive: 检查一个对象是否是由 `reactive` 创建的响应式代理
  - isReadonly: 检查一个对象是否是由 `readonly` 创建的只读代理
  - isProxy: 检查一个对象是否是由 `reactive` 或者 `readonly` 方法创建的代理



### 7组合式API的优势 Composition API

![image-20221127182300723](E:\typora\homework\img\vue\image-20221127182300723.png)

## 五、新的组件

### 1.Fragment

- 在Vue2中: 组件必须有一个根标签
- 在Vue3中: 组件可以没有根标签, 内部会将多个标签包含在一个Fragment虚拟元素中
- 好处: 减少标签层级, 减小内存占用

### 2.Teleport

- 什么是Teleport？—— `Teleport` 是一种能够将我们的<strong style="color:#DD5145">组件html结构</strong>移动到指定位置的技术。

  ```vue
  <teleport to="移动位置">
  	<div v-if="isShow" class="mask">
  		<div class="dialog">
  			<h3>我是一个弹窗</h3>
  			<button @click="isShow = false">关闭弹窗</button>
  		</div>
  	</div>
  </teleport>
  ```

### 3.Suspense

- 等待异步组件时渲染一些额外内容，让应用有更好的用户体验

- 使用步骤：

  - 异步引入组件

    ```js
    import {defineAsyncComponent} from 'vue'
    const Child = defineAsyncComponent(()=>import('./components/Child.vue'))
    ```

  - 使用```Suspense```包裹组件，并配置好```default``` 与 ```fallback```

    ```vue
    <template>
    	<div class="app">
    		<h3>我是App组件</h3>
    		<Suspense>
    			<template v-slot:default>
    				<Child/>
    			</template>
    			<template v-slot:fallback>
    				<h3>加载中.....</h3>
    			</template>
    		</Suspense>
    	</div>
    </template>
    ```

## 六、其他

### 1.全局API的转移

- Vue 2.x 有许多全局 API 和配置。

  - 例如：注册全局组件、注册全局指令等。

    ```js
    //注册全局组件
    Vue.component('MyButton', {
      data: () => ({
        count: 0
      }),
      template: '<button @click="count++">Clicked {{ count }} times.</button>'
    })
    
    //注册全局指令
    Vue.directive('focus', {
      inserted: el => el.focus()
    }
    ```

- Vue3.0中对这些API做出了调整：

  - 将全局的API，即：```Vue.xxx```调整到应用实例（```app```）上

    | 2.x 全局 API（```Vue```） | 3.x 实例 API (`app`)                        |
    | ------------------------- | ------------------------------------------- |
    | Vue.config.xxxx           | app.config.xxxx                             |
    | Vue.config.productionTip  | <strong style="color:#DD5145">移除</strong> |
    | Vue.component             | app.component                               |
    | Vue.directive             | app.directive                               |
    | Vue.mixin                 | app.mixin                                   |
    | Vue.use                   | app.use                                     |
    | Vue.prototype             | app.config.globalProperties                 |

### 2.其他改变

- data选项应始终被声明为一个函数。

- 过度类名的更改：

  - Vue2.x写法

    ```css
    .v-enter,
    .v-leave-to {
      opacity: 0;
    }
    .v-leave,
    .v-enter-to {
      opacity: 1;
    }
    ```

  - Vue3.x写法

    ```css
    .v-enter-from,
    .v-leave-to {
      opacity: 0;
    }
    
    .v-leave-from,
    .v-enter-to {
      opacity: 1;
    }
    ```

- <strong style="color:#DD5145">移除</strong>keyCode作为 v-on 的修饰符，同时也不再支持```config.keyCodes```

- <strong style="color:#DD5145">移除</strong>```v-on.native```修饰符

  - 父组件中绑定事件

    ```vue
    <my-component
      v-on:close="handleComponentEvent"
      v-on:click="handleNativeClickEvent"
    />
    ```

  - 子组件中声明自定义事件

    ```vue
    <script>
      export default {
        emits: ['close']
      }
    </script>
    ```

- <strong style="color:#DD5145">移除</strong>过滤器（filter）

  > 过滤器虽然这看起来很方便，但它需要一个自定义语法，打破大括号内表达式是 “只是 JavaScript” 的假设，这不仅有学习成本，而且有实现成本！建议用方法调用或计算属性去替换过滤器。

- ......
