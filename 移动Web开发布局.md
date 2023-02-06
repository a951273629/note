# 移动Web开发布局

### 移动端基础

#### 1.1浏览器现状

**PC端常见浏览器**
360浏览器、谷歌浏览器、火狐浏览器、QQ浏览器、百度浏览器、搜狗浏览器、IE浏览器。

![image-20230114080459412](E:\typora\homework\img\Web移动端\image-20230114080459412.png)

**移动端常见浏览器**
UC浏览器，QQ浏览器，欧明浏览器，百度手机浏览器，360安全浏览器，谷歌浏览器,搜狗手机浏览器,猎豹浏览器，以及其他杂牌浏览器。



**内核**

国内的UC和QQ，百度等手机浏览器都是根据Webkit修改过来的内核，国内尚无自主研发的内核，就像国内的手机操作系统都是基于Android修改开发的一样。
总结:兼容移动端主流浏览器，处理Webkit内核浏览器即可。

#### 1.2手机屏幕现状

- 移动端设备屏幕尺寸非常多，碎片化严重。

- Android设备有多种分辨率:480x800,480x854, 540x960,720x1280，1080x1920等，还有传说中的2K，4k屏。

- 近年来iPhone的碎片化也加剧了，其设备的主要分辨率有∶640x960,640x1136,750x1334,1242x2208等。

- 作为开发者无需关注这些分辨率，因为我们常用的尺寸单位是 px。

#### 1.3 移动端调试方法

- Chrome DevTools(谷歌浏览器）的模拟手机调试

- 搭建本地web服务器，手机和服务器一个局域网内，通过手机访问服务器使用外网服务器

- 直接P或域名访问

### 视口

视口( viewport）就是浏览器显示页面内容的屏幕区域。视口可以分为布局视口、视觉视口和理想视口

#### 2.1 布局视口layout viewport

- 一般移动设备的浏览器都默认设置了一个布局视口，用于解决早期的PC端页面在手机上显示的问题。

- iOS, Android基本都将这个视口分辨率设置为980px，所以PC上的网页大多都能在手机上呈现，只不过元素看上去很小，一般默认可以通过手动缩放网页。
- ![image-20230114084357010](E:\typora\homework\img\Web移动端\image-20230114084357010.png)

#### 2.2视觉视口visual viewport

- 字面意思，它是用户正在看到的网站的区域。注意:是网站的区域。

- 我们可以通过缩放去操作视觉视口，但不会影响布局视口，布局视口仍保持原来的宽度。

![image-20230114084259198](E:\typora\homework\img\Web移动端\image-20230114084259198.png)

#### 2.3理想视口ideal viewport

- 为了使网站在移动端有最理想的浏览和阅读宽度而设定

- 理想视口，对设备来讲，是最理想的视口尺寸


- 需要手动添写meta视口标签通知浏览器操作

- meta视口标签的主要目的:布局视口的宽度应该与理想视口的宽度一致，简单理解就是设备有多宽，我们布局的视口就多宽

#### 2.4 meta 视口标签

```html
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
```

![image-20230114195034501](E:\typora\homework\img\Web移动端\image-20230114195034501.png)

#### 2.5 标准的viewport设置

- 视口宽度和设备保持一致

- 视口的默认缩放比例1.0

- 不允许用户自行缩放

- 最大允许的缩放比例1.0

- 最小允许的缩放比例1.0

### 3 二倍图

#### 3.1物理像素&物理像素比

- 物理像素点指的是屏幕显示的最小颗粒，是物理真实存在的。这是厂商在出厂时就设置好了,比如苹果6\7\8是 750*1334

- 我们开发时候的1px不是一定等于1个物理像素的

- PC端页面，1个px等于1个物理像素的，但是移动端就不尽相同

- 一个px的能显示的物理像素点的个数，称为物理像素比或屏幕像素比

![image-20230114200002492](E:\typora\homework\img\Web移动端\image-20230114200002492.png)

1. 物理像素就是我们说的分辨率iPhone8的物理像素是750

2. 在iPhone8里面1px开发像素=2个物理像素

#### 3.2多倍图

- 对于一张50px*50px的图片,在手机Retina屏中打开，按照刚才的物理像素比会放大倍数，这样会造成图片模糊

- 在标准的viewport设置中，使用倍图来提高图片质量，解决在高清设备中的模糊问题

- 通常使用二倍图，因为iPhone 6\7\8的影响,但是现在还存在3倍图4倍图的情况，这个看实际开发公司需求

- 背景图片注意缩放问题

```css
        img {
            /* 原始图片大小100px * 100px 二倍图*/
            width: 50px;
            height: 50px;
        }
```

#### 3.3 背景缩放 background-size

background-size属性规定背景图像的尺寸

```css
background size:背景图片宽度背景图片高度;
```

- 单位:长度|百分比| cover |contain;
- cover把背景图像扩展至足够大，以使背景图像完全覆盖背景区域。
- contain把图像图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域

cover

![image-20230114202544882](E:\typora\homework\img\Web移动端\image-20230114202544882.png)

contain

![image-20230114202601382](E:\typora\homework\img\Web移动端\image-20230114202601382.png)

### 移动端开发选择

#### 4.1移动端主流方案

单独制作移动端页面

响应式页面兼容移动端

#### 4.2单独移动端页面

![image-20230114204800362](E:\typora\homework\img\Web移动端\image-20230114204800362.png)

#### 4.3响应式兼容PC移动端

![image-20230114205006761](E:\typora\homework\img\Web移动端\image-20230114205006761.png)

### 6 移动端常见布局

移动端布局和以前我们学习的PC端有所区别

**单独制作移动端页面**

- 流式布局(百分比布局)

- flex弹性布局(强烈推荐)

- less+rem+媒体查询布局

- 混合布局

**响应式页面兼容移动端**

- 媒体查询

- bootstarp



#### 6.1 流式布局(百分比布局)

- 流式布局,就是百分比布局，也称非固定像素布局。

- 通过盒子的宽度设置成百分比来根据屏幕的宽度来进行伸缩，不受固定像素的限制，内容向两侧填充

- 流式布局方式是移动web开发H用的比较常见的布局方式。

![image-20230115091105071](E:\typora\homework\img\Web移动端\image-20230115091105071.png)

- max-width最大宽度( max-height最大高度)

- min-width最小宽度( min-height最小高度)





### 7 flex布局(非常重要)

#### 7.1体验

flex是flexible Box的缩写，意为"弹性布局”，用来为盒状模型提供最大的灵活性，任何一个容器都可以指定为flex布局。

```css
      div {
        display: flex;
        width: 80%;
        height: 300px;
        background-color: pink;
      }
      span {
        width: 200px;
        height: 100px;
        background-color: red;
      }
```

![image-20230115094435473](E:\typora\homework\img\Web移动端\image-20230115094435473.png)

#### 7.2布局原理



采用Flex布局的元素，称为Flex容器(flex container )，简称"容器"。它的所有子元素自动成为容器成员,称为Flex项目(flex item )，简称"项目”。

- 体验中div就是flex父容器。
- 体验中span就是子容器flex项目

- 子容器可以横向排列也可以纵向排列

![image-20230115094451881](E:\typora\homework\img\Web移动端\image-20230115094451881.png)

总结flex布局原理:
		就是通过给父盒子添加flex属性，来控制子盒子的位置和排列方式

### 8 flex布局-父相常见属性

#### 8.1 justify-content 设置主轴上的子元素排列方式

justify-content属性定义了项目在主轴上的对齐方式

注意:使用这个属性之前一定要确定好主轴是哪个

```css
    
/*父元素 flex布局是添加在父盒子身上的*/
div {
        display: flex;
        /* 默认主轴就是row 横向排列    column纵向排列*/
        /* flex-direction: row; */
        flex-direction: column;
        /* 设置主轴元素的排列方式 */
        justify-content: space-between;
      }
/*子元素*/
      span {
        width: 200px;
        height: 100px;
        background-color: red;
      }
```

**横向**  flex-direction: row;

![image-20230115101151980](E:\typora\homework\img\Web移动端\image-20230115101151980.png)

**纵向**        flex-direction: column;

![image-20230115101120728](E:\typora\homework\img\Web移动端\image-20230115101120728.png)

justify-content常用属性值

| 属性值        | 说明                                      |
| ------------- | ----------------------------------------- |
| flex-start    | 默认值从头部开始如果主轴是x轴，则从左到右 |
| flex-end      | 从尾部开始排列                            |
| center        | 在主轴居中对齐(如果主轴是x轴则水平居中)   |
| space-around  | 分剩余空间                                |
| space-between | 先两边贴边再平分剩余空间(重要)            |

#### 8.2 flex-wrap 设置元素是否换行

默认情况下，项目都排在一条线(又称”轴线”)上。flex-wrap属性定义，flex布局中默认是不换行的。

| 属性值 | 说明          |
| ------ | ------------- |
| nowrap | 默认值,不换号 |
| wrap   | 换行          |

```css
      div {
        display: flex;
        width: 80%;
        height: 600px;
        background-color: pink;
        /* 默认主轴就是row 横向排列 */
        flex-direction: row;
        /* 装不下之后再起一行显示 */
        flex-wrap: wrap;
      }
```

![image-20230115180349332](E:\typora\homework\img\Web移动端\image-20230115180349332.png)

#### 8.3 align-items 设置侧轴上的子元素排列方式(单行)

该属性是控制子项在侧轴(默认是y轴）上的排列方式在子项为单项的时候使用

| 属性值     | 说明     |
| ---------- | -------- |
| flex-start | 从上到下 |
| flex-end   | 从下到上 |
| center     | 垂直居中 |
| stretch    | 拉伸     |

```css
      div {
        display: flex;
        width: 80%;
        height: 600px;
        background-color: pink;
        /* 默认主轴是x轴  主轴居中 */
        justify-content: center;
        /* 侧轴居中 默认侧轴是y轴 */
        align-items: center;
      }
```



![image-20230115181238189](E:\typora\homework\img\Web移动端\image-20230115181238189.png)

#### 8.4 align-content设置侧轴上的子元素的排列方式(多行)

设置子项在侧轴上的排列方式并且只能用于子项出现换行的情况(多行），在单行下是没有效果的。

| 属性值        | 说明                                  |
| ------------- | ------------------------------------- |
| flex-start    | 默认值在侧轴的头部开始排列            |
| flex-end      | 在侧轴的尾部开始排列                  |
| center        | 在侧轴中间显示                        |
| space-around  | 子项在侧轴平分剩余空间                |
| space-between | 子项在侧轴先分布在两头,再平分剩余空间 |
| stretch       | 设置子项元素高度平分父元素高度        |

```css
      div {
        display: flex;
        width: 80%;
        height: 600px;
        background-color: pink;
        /* 换行 */
        flex-wrap: wrap;
        /* y轴平分贴边 */
        align-content: space-between;
      }
```

目前align-content:center 对单行元素也有效

![image-20230115182415481](E:\typora\homework\img\Web移动端\image-20230115182415481.png)



#### 8.5 flex-flow

flex-flow属性是flex-direction和flex-wrap属性的复合属性



```css
      div {
        display: flex;
        width: 80%;
        height: 600px;
        background-color: pink;
        /* 把设置主轴方向和是否换行(环列) 简写 */
        flex-flow: column wrap;
      }
```

![image-20230115183501662](E:\typora\homework\img\Web移动端\image-20230115183501662.png)



- flex-direction:设置主轴的方向
- justify-content:设置主轴上的子元素排列方式

- flex-wrap∶设置子元素是否换行
- align-content:设置侧轴上的子元素的排列方式(多行)

- align-items:设置侧轴上的子元素排列方式(单行)


- flex-flow :复合属性,相当于同时设置了flex-direction和flex-wrap



### 9 flex布局-子项常见属性

#### 9.1 flex 属性

flex属性定义子项目分配剩余空间，用flex来表示占多少份数。

```css
.item {
	flex: <nurnber>;/* default 0*/
}
```

flex属性为子元素添加，按照比例来分配父元素的空间。非常直观

```html

      .father {
        display: flex;
        width: 800px;
        height: 300px;
        margin: auto;
        background-color: pink;
      }
      .father > div {
        flex: 1;
        background-color: blue;
        margin: 5px;
      }
      .father .son {
        flex: 2;
        background-color: red;
      }


    <div class="father">
      <div class="son">1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>

```



![image-20230115185113389](E:\typora\homework\img\Web移动端\image-20230115185113389.png)

#### 9.2 align-self 控制子项自己在侧轴上的排列方式

align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。

默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

```css
      .sign {
        /* 设置自己在侧轴排列方式 */
        align-self: flex-end;
      }
```

**其他副轴元素居中 自己反向排列**

```css
      div {
        width: 600px;
        height: 200px;
        background-color: pink;
        display: flex;
        /* 设置侧轴居中排列方式 */
        align-items: center;
      }
      div span {
        width: 100px;
        height: 30%;
        background-color: red;
      }
      .sign {
        /* 设置自己在侧轴排列方式 */
        align-self: flex-end;
      }
```

![image-20230115195512687](E:\typora\homework\img\Web移动端\image-20230115195512687.png)

## 2 携程网案例flex布局

### 2.3 nav模块

布局思路

![image-20230116200126640](E:\typora\homework\img\Web移动端\image-20230116200126640.png)

html

```html
    <div class="local-nav">
      <div>
        <a href="" title="景点.玩乐">
          <span class="nav-icon"></span><span>景点.玩乐</span>
        </a>
      </div>
      <div>
        <a href="" title="周边游">
          <span class="nav-icon nav-icon_2"></span><span>周边游</span>
        </a>
      </div>
      <div>
        <a href="" title="美食林">
          <span class="nav-icon nav-icon_3"></span><span>美食林</span>
        </a>
      </div>
      <div>
        <a href="" title="一日游">
          <span class="nav-icon nav-icon_4"></span><span>一日游</span>
        </a>
      </div>
      <div>
        <a href="" title="当地攻略">
          <span class="nav-icon nav-icon_5"></span><span>当地攻略</span>
        </a>
      </div>
    </div>
```

css

```css
/* nav模块 */
.local-nav div{
    flex: 1;
    /* background-color: pink; */
}

.local-nav{
    display: flex;
    justify-content:space-between;
    margin: 3px;
    background-color: white;
    height: 64px;
    width: 100%;
    border-radius: 5px;
}
.local-nav a {
    margin-top: 8px;
    /*副轴居中对齐*/
    align-items:center;
    flex-direction: column;
    display: flex;
}
.nav-icon{
 
    background: url(../img/localnav_bg.png) no-repeat 0px 0px;
    width: 32px;
    height: 32px;
    /* 宽度一般 高度auto 二倍精灵图 */
    background-size: 32px auto;
}
.nav-icon_2{
    background: url(../img/localnav_bg.png) no-repeat 0px -32px;
    background-size: 32px auto;
}

.nav-icon_3{
    background: url(../img/localnav_bg.png) no-repeat 0px -64px;
    background-size: 32px auto;
}

.nav-icon_4{
    background: url(../img/localnav_bg.png) no-repeat 0px -96px;
    background-size: 32px auto;
}
.nav-icon_5{
    background: url(../img/localnav_bg.png) no-repeat 0px -128px;
    background-size: 32px auto;
}
```

页面效果

![image-20230116200148359](E:\typora\homework\img\Web移动端\image-20230116200148359.png)

#### 2.4 nav 主导航栏

```html
    <!-- nav主导航栏 -->
    <nav>
      <div class="nav-common">
        <div class="nav-item">
          <a href="#" class="clear">海外酒店</a>
        </div>
        <div class="nav-item">
          <a href="#">海外酒店</a><a href="#">特价酒店</a>
        </div>
        <div class="nav-item">
          <a href="#">团购</a><a href="#">名宿.客栈</a>
        </div>
      </div>
      <div class="nav-common">
        <div class="nav-item">
          <a href="#" class="clear">海外酒店</a>
        </div>
        <div class="nav-item">
          <a href="#">海外酒店</a><a href="#">特价酒店</a>
        </div>
        <div class="nav-item">
          <a href="#">团购</a><a href="#">名宿.客栈</a>
        </div>
      </div>
      <div class="nav-common">
        <div class="nav-item">
          <a href="#" class="clear">海外酒店</a>
        </div>
        <div class="nav-item">
          <a href="#">海外酒店</a><a href="#">特价酒店</a>
        </div>
        <div class="nav-item">
          <a href="#">团购</a><a href="#">名宿.客栈</a>
        </div>
      </div>
    </nav>
```

css

```css
/* nav主导航 */
nav {
    /* 页面圆角才能看见 */
    overflow: hidden;
    width: 100%;
    border-radius: 8px;
    margin-top: 5px;
}
.nav-common{
    height: 88px;
    width: 100%;
    /* background-color: pink; */
    display: flex;
    /* margin-top: 8px; */
}
.nav-common:nth-child(1){
    /* 渐变色 */
    background: -webkit-linear-gradient(left,#FA5A55,#FA994D);
}
.nav-common:nth-child(2){
    /* 渐变色 */
    background: -webkit-linear-gradient(left,#4B90ED,#53bced);
}
.nav-common:nth-child(3){
    /* 渐变色 */
    background: -webkit-linear-gradient(left,#34c2a9,#6cd559);
}

.nav-common:nth-child(2){
    margin: 4px 0;
}
.nav-item{
    flex-direction: column;
    display: flex;
    flex: 1;
 
    /* background-color: red; */
    
}
.nav-item a {
    color: #fff;
    /* 文字阴影 */
    text-shadow: 1px 1px rgba(0, 0, 0, .3);
    text-align: center;
    line-height: 44px;
    flex: 1;
}
.nav-item .clear {
    border-bottom: 0px solid #fff!important;

}
.nav-item a:first-child{
    border-bottom: 1px solid #fff;
}
.nav-item:first-child a{
    background: url(../img/hotel.png) no-repeat bottom center;
    background-size: 121px auto;
}
/* 选择前两个元素 */
.nav-item:nth-child(-n+2){
    border-right: 1px solid #fff;
}

```

## 3 rem适配布局(重要)

1. 页面布局文字能否随着屏幕大小变化而变化?

2. 流式布局和flex布局主要针对于宽度布局，那高度如何设置?

3. 怎么样让屏幕发生变化的时候元素高度和宽度等比例缩放?

#### 3.1.1 rem基础

**rem单位**

rem (root em)是一个相对单位,类似于em , em是父元素字体大小。

不同的是rem的基准是相对于html元素的字体大小。

比如，根元素( html ）设置font-size=12px;非根元素设置width:2rem;则换成px表示就是24px。

**em是相对于父元素来说的**

```css
      div {
        font-size: 12px;
      }
      p {
        width: 10em;
        height: 10em;
        background-color: pink;
      }
```

![image-20230118190147132](E:\typora\homework\img\Web移动端\image-20230118190147132.png)

**rem是相对于html来说的**

```css
      html {
        font-size: 14px;
      }
      p {
        width: 10rem;
        height: 10rem;
        background-color: pink;
      }
```



![image-20230118190405119](E:\typora\homework\img\Web移动端\image-20230118190405119.png)

**rem的优点就是可以通过修改html里面的文字大小来改变页面中元素的大小可以整体控制**

## 4 媒体查询

媒体查询( Media Query )是CSS3新语法。

### 4.1 什么是媒体查询

- 使用@media查询，可以针对不同的媒体类型定义不同的样式

- ==@media可以针对不同的屏幕尺寸设置不同的样式==

- 当你重置浏览器大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页

- 面目前针对很多苹果手机、Android手机，平板等设备都用得到多媒体查询

### 4.2语法规范

#### 4.2.1 mediatype 查询类型

| 值    | 解释说明                         |
| ----- | -------------------------------- |
| all   | 用于所有设备                     |
| print | 用于打印机和打印预览             |
| scree | 用于电脑屏幕,平板电脑,只能手机等 |

#### 4.2.2媒体特性

每种媒体类型都具体各自不同的特性，根据不同媒体类型的媒体特性设置不同的展示风格。我们暂且了解三个。注意他们要加小括号包含

| 值        | 解释说明                           |
| --------- | ---------------------------------- |
| width     | 定义输出设备中页面可见区域的宽度   |
| min-width | 定义输出设备中页面最小可见区域宽度 |
| max-width | 定义输出设备中页面最大可见区域宽度 |



```css
        /* 媒体查询可以根据屏幕尺寸的的改变同时改变不同的样式 */
/*在不超过800px时屏幕为粉色*/
      @media screen and (max-width: 800px) {
        body {
          background-color: pink;
        }
      }
/*屏幕不超过500px为红色*/
      @media screen and (max-width: 500px) {
        body {
          background-color: red;
        }
      }
```

### 4.3媒体查询+rem实现元素动态变化

```html
    <style>
      .top {
        height: 2rem;
        font-size: 0.4rem;
        background-color: green;
        color: #fff;
      }
      @media screen and (min-width: 320px) {
        html {
          font-size: 50px;
        }
      }
      @media screen and (min-width: 640px) {
        html {
          font-size: 100px;
        }
      }
    </style>



    <div class="top">购物车</div>
```

rem单位是跟着html来走的，有了rem页面元素可以设置不同大小尺寸媒体查询可以根据不同设备宽度来修改样式
媒体查询+rem 就可以实现不同设备宽度，实现页面元素大小的动态变化

#### 4.4 引入资源

当样式比较繁多的时候，我们可以针对不同的媒体使用不同stylesheets (样式表)。

原理，就是直接在link中判断设备的尺寸，然后引用不同的css文件。

语法

```html
  <link rel="stylesheet" media="media and|not|only (media feature)" href="index.css">
```

示例

当我们屏幕大于等于640px以上的,我们让div一行显示2个

当我们屏幕小于640我们让div一行显示一个

一个建议:我们媒体查询最好的方法是从小到大

![image-20230119192903061](E:\typora\homework\img\Web移动端\image-20230119192903061.png)



## 5 less基础

### 5.1 维护css的弊端

CSS是一门非程序式语言，没有变量、函数、SCOPE(作用域）等概念。

- CSS需要书写大量看似没有逻辑的代码,CSS冗余度是比较高的。

- 不方便维护及扩展,不利时复用。
- CSS没有很好的计算能力
- 非前端开发工程师来讲，往往会因为缺少CSS编写经验而很难写出组织良好且易于维护的CSS代码项目。

### 5.2 less介绍

Less (Leaner Style Sheets的缩写）是一门CSS扩展语言，也成为CSS预处理器。
做为CSS的一种形式的扩展，它并没有减少CSS的功能，而是在现有的CSS语法上，为CSS加入程序式语言的特性。

它在CSS的语法基础之上，引入了变量，Mixin(混入），运算以及函数等功能，大大简化了CSS的编写，并且降低了CSS的维护成本，就像它的名称所说的那样，Less可以让我们用更少的代码做更多的事情。

**总结:Less是一门CSS预处理语言，它扩展了CSS动态特性**

### 5.3 less使用

我们首先新建一个后缀名为less的文件，在这个less文件里面书写less语句。

#### 5.3.1 less变量

变量是指没有固定的值，可以改变的。因为我们CSS中的一些颜色和数值等经常使用。

语法

```less
@变量名:值;
```

- 必须有@为前缀

- 不能包含特殊字符

- 不能以数字开头

- 大小写敏感

```less
@color:pink;
@font14:14px;
div {
    background-color: @color;
}
li {
    background-color: @color;
}
a{
    font-size: @font14;
}
```



#### 5.3.2 less编译

vscode less插件

Easy LESS插件用来把less文件编译为css文件

![image-20230119200853478](E:\typora\homework\img\Web移动端\image-20230119200853478.png)

#### 5.3.3 less嵌套

```less
// less处理子元素
div {
    width: 200px;
    height: 200px;
    background-color: @color;
    a {
        color: red;
    }
}

//less 伪类选择器的使用

a{
    color: blue;
    &:hover{
        color: purple;
    }
}
```

如果遇见(交集|伪类|伪元素选择器)

内层选择器的前面没有&符号，则它被解析为父选择器的后代

如果有&符号，它就被解析为父元素自身或父元素的伪类。

#### 5.3.4 less运算

```less
@width:100px+10;
div {
    width: @width+100;
    height: @width;
    background-color: pink;
}
```

- 乘号(*)和除号(/)的写法
- 运算符中间左右有个空格隔开1px + 5
- 对于两个不同的单位的值之间的运算，运算结果的值取第一个值的单位

- 如果两个值之间只有一个值有单位，则运算结果就取该单位

```less
@width:100px+10;
div {
    width: @width+100;
    //最后height的值就是rem
    height: (300rem / @width);
    background-color: pink;
}
```

## 6 rem 适配方案

1. 让一些不能等比自适应的元素，达到当设备尺寸发生改变
   的时候，等比例适配当前设备。

2. 使用媒体查询根据不同设备按比例设置html的字体大小，
   然后页面元素使用rem做尺寸单位，当html字体大小变化
   元素尺寸也会发生变化,从而达到等比缩放的适配

### 6.1 rem实际开发适配方案

按照设计稿与设备宽度的比例，动态计算并设置html根标签的font-size 大小;(媒体查询)

CSS中，设计稿元素的宽、高、相对位置等取值，按照同等比例换算为rem为单位的值;

### 6.2rem 适配方案技术使用

![image-20230120090906774](E:\typora\homework\img\Web移动端\image-20230120090906774.png)

### 6.3 动态设置html标签font-size大小

- 假设设计稿是750px
- 假设我们把整个屏幕划分为15等份(划分标准不一可以是20份也可以是10等份)

- 每一份作为html字体大小，这里就是50px
- 那么在320px设备的时候，字体大小为320/15就是21.33px
- 用我们页面元素的大小除以不同的html字体大小会发现他们比例还是相同的

- 比如我们以750为标准设计稿
- 一个100*100像素的页面元素在750屏幕下，就是100/50转换为rem 是 2rem *2 rem比例是1比1
- 320屏幕下，html字体大小为21.33则2rem = 42.66px此时宽和高都是 42.66 但是宽和高的比例还是1比1

- 但是已经能实现不同屏幕下页面元素盒子等比例缩放的效果

### 6.4苏宁首页案例

#### 6.4.1设置公共 common.less文件

- 新建common.less设置好最常见的屏幕尺寸，利用媒体查询设置不同的htm字体大小，因为除了首页其他页面也需要

- 我们关心的尺寸有320px、360px、375px、384px、400px、414px、424px、480px、540px、720px、750px

- 划分的份数我们定为15等份
- 因为我们pc端也可以打开我们苏宁移动端首页，我们默认html字体大小为50px，注意这句话写到最上面

`common.less`

```less
// 分成15份
@single:15;
html {
    font-size: 50px;
}
@media screen and (min-width:320px) {
    html {
        font-size: (320px/@single);
    }
}

@media screen and (min-width:375px) {
    html {
        font-size: (375px/@single);
    }
}
@media screen and (min-width:400px) {
    html {
        font-size: (400px/@single);
    }
}
@media screen and (min-width:424px) {
    html {
        font-size: (424px/@single);
    }
}
@media screen and (min-width:480px) {
    html {
        font-size: (480px/@single);
    }
}
@media screen and (min-width:540px) {
    html {
        font-size: (540px/@single);
    }
}
@media screen and (min-width:720px) {
    html {
        font-size: (720px/@single);
    }
}
@media screen and (min-width:750px) {
    html {
        font-size: (750px/@single);
    }
}
```

`index.less`

```less
// 导入样式文件
@import url(common.less);

```

#### 6.4.2 search 搜索栏

`index.less`

```less
// 导入样式文件
@import url(common.less);
body {
    min-width: 320px;
    width: 15rem;
    margin: 0 auto;
    line-height: 1.5;
    a{
        text-decoration: none;
    }

}
 @fontSize:50;
.search-content{
    display: flex;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 15rem;
    // 页面元素rem计算公式 页面元素的px /html字体大小
    height: (88rem / @fontSize);
    background-color: #ffc001;
    .classify{
        width: (44rem / @fontSize);
        height: (70rem / @fontSize);
        background-color: pink;
        margin: (10rem / @fontSize) (25rem / @fontSize) (13rem / @fontSize) (24rem / @fontSize);
        background: url(../img/classify.png) no-repeat;
        // 跟着盒子同时缩放
        background-size: (44rem / @fontSize) (70rem / @fontSize);
    }
    .search{
        flex: 1;
        input{

            // 取消蓝色边框
            font-size: (25rem / @fontSize);
            padding-left: (55rem / @fontSize);
            width: 100%;
            color: #757575;
            outline: none;
            margin-top: (10rem / @fontSize);
            border: 0;
            height: (66rem / @fontSize);
            border-radius: (33rem / @fontSize);
            background-color: #fff2cc;
        }
    }
    .login{
        width: (75rem/@fontSize);
        height: (70rem/@fontSize);
        // background-color: red;
        margin: (10rem / @fontSize);
        font-size: (25rem / @fontSize);
        text-align: center;
        line-height:  (70rem/@fontSize);
        color: white;
    }
}
```

`index.html`

```html
    <div class="search-content">
      <a href="#" class="classify"></a>
      <div class="search">
        <form action="">
          <input type="search" value="文字是,哒哒哒" />
        </form>
      </div>
      <a href="#" class="login">登录</a>
    </div>
```

### 6.5 简洁高效的rem适配方案 flexible.js

- 手机淘宝团队出的简洁高效移动端适配库
- 我们再也不需要在写不同屏幕的媒体查询，因为里面js做了处理
- 它的原理是把当前设备划分为10等份，但是不同设备下，比例还是一致的。

- 我们要做的，就是确定好我们当前设备的html文字大小就可以了
- 比如当前设计稿是750px，那么我们只需要把html文字大小设置为75px(750px/10)就可以里面页面元素rem值:页面元素的px值/75
- 剩余的，让flexible.js来去算

### 6.6 VScode px转rem插件 cssrem

![image-20230121114332559](E:\typora\homework\img\Web移动端\image-20230121114332559.png)

**更改我们默认的fontSize字体大小**

![image-20230121114259951](E:\typora\homework\img\Web移动端\image-20230121114259951.png)
