# JS

### JS DOM IPAS

#### 使用className

1. **通过修改元素的className 更改元素的样式 适合样式较多或者功能复杂的情况**
2. 会覆盖原有的类名
3. 如果想要保留原先的类名我们可以用多类名选择器(类名+空格+类名)

```javascript
    <style>
        .change {
            background:purple;
            color:#fff;
            font-size:30px;
            width:100px;
            height:100px;
            margin-top:150px;
        }
    </style>
</head>
<body>
    <div>
        文本
    </div>
    <script>
        var t=document.querySelector('div')
        t.onclick = function(){

            this.className='change'
            //多个类名
			 this.className='first change'
        }
    </script>
</body>
```

**改变之后的样式**

![image-20220831231345416](E:\typora\homework\img\js\image-20220831231345416.png)