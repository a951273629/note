# Vue后台管理项目

### 项目结构

项目模板地址

https://github.com/PanJiaChen/vue-admin-template



![image-20221212094916004](E:\typora\homework\img\admin_project\image-20221212094916004.png)

**重写login方法**

```js
  // user login
  // login({ commit }, userInfo) {
  //   const { username, password } = userInfo
  //   return new Promise((resolve, reject) => {
  //     login({ username: username.trim(), password: password }).then(response => {
  //       // 成功结构出data
  //       const { data } = response
  //       commit('SET_TOKEN', data.token)
  //       // 用cookie存储token
  //       setToken(data.token)
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },
  
  /**
   * 
   * @param {context中解析出的commit} param0 
   * @param {用户信息} userInfo 
   * @returns 返回成功或者失败的promise
   * 异步方式重写login方法
   */
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    try {
      const response = await login({
        username: username.trim(),
        password: password
      })
      const { data } = response
      commit('SET_TOKEN', data.token)
      // 用cookie存储token
      setToken(data.token)
      return ''
    } catch {
      return Promise.reject(new Error('failed'))
    }
  },
```

获取用户信息 getinfo

```js
  // get user info 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          const { data } = response

          if (!data) {
            return reject('Verification failed, please Login again.')
          }

          const { name, avatar } = data
          // 设置用户的名称 和头像链接
          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

```

退出登录

```js
 // 退出登录
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken() // 移除用户的token
          //st remove  token  first
          resetRouter() // 权限相关 设置路由

          // 退出重置状态
          commit('RESET_STATE') 
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
```



#### 配置侧边栏路由

```js

  {
    // 显示首页的路由
    // 显示一级路由 重定向到二级路由
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        // icon对应svg中的图片
        meta: { title: "首页", icon: "dashboard" },
      },
    ],
  },
  // 商品管理路由相关
  {
    path: "/product",
    component: Layout,
    name: "Product",
    redirect:'trademark',
    meta: { title: "商品管理", icon: "el-icon-s-shop" },
    children: [
      {
        path: "trademark",
        component: () => import("@/views/product/trademark/List"),
        name: "Trademark",
        meta: { title: "品牌管理", icon: "el-icon-apple" },
      },
      {
        path: "attr",
        component: () => import("@/views/product/attr/List"),
        name: "Attr",
        meta: { title: "属性管理", icon: "el-icon-menu" },
      },
      {
        path: "sku",
        component: () => import("@/views/product/sku/List"),
        name: "Sku",
        meta: { title: "Sku管理", icon: "el-icon-ice-cream-round" },
      },
      {
        path: "spu",
        component: () => import("@/views/product/spu/List"),
        name: "Spu",
        meta: { title: "Spu管理", icon: "el-icon-lollipop" },
      },
    ],
  },
```

侧边栏组件代码解释

```htmlw
<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <!-- router-link 返回的是一个router link -->
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <!-- 把图标动态的render渲染到 实例元素身上 -->
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <!-- 递归调用组件生成多级菜单 -->
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>
```

#### 商品列表和分页器

```js
<template lang="">
  <div>
    <el-button type="primary" icon="el-icon-plus" round>添加</el-button>

    <el-table :data="tableData" border style="width: 100%" >
      <el-table-column prop="id" type="index" label="序号" width="80" align="center"> </el-table-column>
      <el-table-column prop="name" label="品牌名称" > </el-table-column>
      <el-table-column prop="" label="平台logo">
        <!--只要有结构改变就要写 作用域插槽 -->
        <template slot-scope="{row,$index}">
            <img :src="row.url" alt="" style=" width:50px; heigh:50px; ">
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="{row,$index}">
          <el-button type="warning" icon='el-icon-edit'>修改</el-button>
          <el-button type='danger' icon='el-icon-delete'>删除</el-button>
        </template>  
      </el-table-column>
    </el-table>
    
    <!--
   
     -->
     <!-- @current-change=""翻页的回调 -->
    <el-pagination
    @size-change="sizeChange"

    @current-change="getPage"

    :current-page="page"
    style="text-align:center"
    :page-sizes="[5, 10, 20]"
    :page-size="limit"
    layout="prev, pager, next, jumper,->, sizes, total"
    :total="total">
  </el-pagination>
  </div>
</template>
<script>
    import tradeApi from '../../../api/product/trademark'
export default {
  data() {
    return {
      tableData: [],
      page:1,
      limit:5,
      total:100
    };
  },
  methods: {
    // 发送获取品牌列表以及分页器翻页的回调
    async getPage(page = 1){
      this.page = page
      const result = await tradeApi.getPageList(this.page,this.limit);
      this.tableData = result.modes.records
      // this.total = this.tableData.length
      console.log(result);
    },
    // 处理修改每页数量的回调函数
    sizeChange(size){
      this.limit =size
      this.getPage()
    }
  },
  mounted() {
    this.getPage();
  },
};
</script>
```

#### 商品增加功能实现

```js

    <!-- dialog 提交表单 -->
    <el-dialog title="增加商品" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="品牌名称" label-width="100px">
          <el-input
            v-model="form.name"
            autocomplete="off"
            style="width: 80%"
          ></el-input>
        </el-form-item>
        <el-form-item label="上传图片" label-width="100px">
          <!-- 文件上传组件 :before-upload上传前回调一般用来校验文件是否合法  :on-success上传成功的回调用来判断文件是否上传成功-->
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="true"
            multiple
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
```

添加提交的方法

```js
    submit() {
      this.dialogFormVisible = false;
      // 模拟发送的服务器上
      this.tableData.push({
        id: this.tableData.length + 1,
        name: this.form.name,
        url: this.form.url,
      });

      this.form = {
        name: "",
        url: ""
      }
    },
```

#### 商品修改

拷贝深拷贝和浅拷贝
拷贝必然出现新的地址开辟新的空间,也就是说有不同的数据存储位置深拷贝和浅拷贝
谈的其实是拷贝的东西是什么?
==如果据贝对象拷贝的是地址,那么就是浅持贝，考贝的是对象里面的值,就是深拷贝==
深浅拷贝其实针对对象数据类型出现的`基本数据类型`不存在什么深浅拷贝

##### 深拷贝的三种方式



1. 递归遍历
2. JSON中的parse和stringify方法

```js
function deepClone(obj) {
  var _obj = JSON.stringify(obj) //  对象转成字符串
  var objClone = JSON.parse(_obj) //  字符串转成对象
  return objClone
}
var a = [0, 1, [2, 3], 4]
b = deepClone(a)
a[0] = 6
a[2][0] = 7
console.log(a) //  [6,1,[7,3],4]
console.log(b) //  [0,1,[2,3],4]
```



3) query的$.extend方法

```js
var a = [0,1,[2,3],4];
b = $.extend(true,[],a);
a[0] = 1;
a[2][0] = 7;
console.log(a);   //  [1,1,[7,3],4];
console.log(b);   //  [0,1,[2,3],4];
 
//$.extend参数：
//第一个参数是布尔值，是否深复制
//第二个参数是目标对象，其他对象的成员属性将被附加到该对象上
//第三个及以后的参数是被合并的对象
```



删除

```js
else{
        // 有id说明是更新
        for (let i = 0; i < this.tableData.length; i++) {
          if(this.tableData[i].id == this.form.id){
            console.log('相同修改',this.form);
            // 更新数组才能被vue监测到
            this.$set(this.tableData,i,deepCopy(this.form));
          }  
        }
        this.$message.success(`修改成功:${this.form.name}`)
      }
```

#### 删除操作

```js
  //模板中传来的row是一件商品的对象       
<el-button
            type="danger"
            icon="el-icon-delete"
            @click="showDelete(row)"
            >删除</el-button 


// 删除操作
    showDelete(row) {
      let tip = this.$confirm("此操作将删除该选项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      });
      tip.then(
        (value) => {
          console.log("删除的id", row.id);
          this.tableData.forEach((item, index) => {
            if (item.id === row.id) {
              console.log("直接删除", item);
              this.tableData.splice(index, 1);
            }
          });

          this.$message({
            type: "success",
            message: "删除成功!",
          });
        },
        (reason) => {
          this.$message({
            type: "error",
            message: "已取消删除",
          });
        }
      );
    },
  },
```



### 三级联动的选项列表

![image-20221218100713227](E:\typora\homework\img\admin_project\image-20221218100713227.png)

```html
        <el-form :inline="true" :model="formInline" class="demo-form-inline" >
            <el-form-item label="一级分类">
              <el-select v-model="formInline.cateId1" placeholder="请选择" @change='changeCategory1'>
                <el-option :label="item.name" :value="item.id" v-for="(item, index) in cateList_1" :key="item.id"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="二级分类">
                <el-select v-model="formInline.cateId2" placeholder="请选择"  @change='changeCategory2'>
                  <el-option :label="item.name" :value="item.id" v-for="(item, index) in cateList_2" :key="item.id"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="三级分类">
                <el-select v-model="formInline.cateId3" placeholder="请选择">
                  <el-option :label="item.name" :value="item.id" v-for="(item, index) in cateList_3" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
          </el-form>
```

#### 获取数据

```js
data() {
    return {
      formInline: {
          cateId1:'',
          cateId2:'',
          cateId3:''
        },
      cateList_1: [],
      cateList_2: [],
      cateList_3: []
    }
  },
  methods: {
    async getCategory_1(){


      let re = await  this.$API.attr.getCategory_1();
      this.cateList_1=re.list1
    },
    async changeCategory1(){
      this.formInline.cateId2=''
      this.formInline.cateId3=''
      this.cateList_3=[]
      // 1改变清空2 和3
      let re =  await this.$API.attr.getCategory_2();
      console.log('list2',re);
      this.cateList_2 = re.list1;
      }
    ,
    async changeCategory2(){
      // 2改变清空3的id
      this.formInline.cateId3=''

      let re = await this.$API.attr.getCategory_3();
      this.cateList_3 = re.list1;
    }
  },
  mounted() {
    this.getCategory_1();
  },
```





​	

####  商品属性值的模式添加（添加属性和修改属性是一样的）

一个属性值要不是新添加的，要不是已经存在的，新添加属性值显示input，已经存在的属性值显示span，而且              可以切换，证明每个属性值都
两个模式，这两个模式叫编辑模式和查看模式	

```html
                  <template slot-scope="{row,$index}">
                    <!-- 使用v-if控制是否显示编辑框 -->
                    <el-input v-if="row.isEdit" v-model="row.attrValue" placeholder="请输入内容" size="normal"></el-input>
                    <span v-else>{{row.attrValue}}</span>
                  </template>
                </el-table-column>
```

通过`row.isEdit`来控制

给每个属性值对象添加模式标识数据，用于确定这个属性值当前是input还是span
对于添加每个属性值的时候，都添加一个属性isEdit：true，代表添加的属性值是编辑模式
在修改属性的时候，遍历每个已有的属性值对象都添加一个属性isEdit = false,这里必须使用$set才能响应式
上面我们的表格当中不能直接写死是一个input，每个属性值根据isEdit决定是input还是span  使用vif

```js
      // 要用深度copy
      row.attrListName.forEach(item => {
        // 这里用push方法添加的数据一定是响应式的 和$set效果一样 和在created之前的数据一样都有响应式
        this.attrFrom.attrList.push({
          attrValue:item,
          isEdit:false
        }) 
      });
```

