## SQL Serve

###  9 事务和并发

#### 事务

事务分为显示事务和隐式事务

1. 显示事务已Begin Tran语句开始，以Commit Tran语句结束。
2. 如果不使用显式定义事务边界，默认会把每个单独的语句作为一个事务。SQL Server默认在执行完每个语句之后自定提交事务。

- 一致性

如果不使用事务，多条更新语句在执行的时候会出现，一条修改了另一条还没有修改。在还没有完成修改的时候就进行了查询，一些数据拿到了修改后的值，一些数据拿到了修改前的数据。而事务的一致性就是在查询时拿到的数据都是commit提交之后完成修改的数据。

- 隔离性

在事务进行中，从外部的会话是观察不到事务一步一步执行的操作。比如在Begin Transaction开始了一个事务，再启动一个会话进行select语句会查询到旧的数据。等待这个事务Commit提交之后才会查询到新的数据。

- 持久性

将数据写在硬盘上之前，先要修改写入数据库的事务日志中。如果事务已经提交了(电脑发生了意外死机了，突然断电了，数据库关闭了)。在数据库重新之后依然会检查每个事务日志进行recovery(恢复)处理，恢复包括redo(重做)和undo(撤销)。在redo阶段数据库会将已经写入数据库日志的指令进行执行，这个过程也叫做前滚(rolling forward)。undo阶段对于提交还没有记录到日志中的事务，数据库引擎会撤销这些事务，这个过程也叫作rolling back(回滚)

#### 锁

SQL Server使用锁(lock)来实施隔离属性，锁是事务获取的一种控制资源，用于保护数据资源，防止其他的事务对数据进行冲突的访问或者修改。

锁主要两种模式，排他锁(exclusive lock)和共享锁(shared lock)。还有其他类型的锁模式(跟新锁，意向锁，架构锁)这些更高级的锁不做介绍。

##### 排他锁

当进行数据的修改时，事务会为所依赖的数据资源请求排他锁(比如修改某一行数据会为这行数据请求排他锁)。如果有其他事务已经获得了该资源的排他锁，就不能再获取该资源的任何类型的锁(比如拿了排他锁就不能拿共享锁了)。而且这种默认行为不能改变，不能改变修改数据时候的锁模式和时间长度(比如修改数据就必须是排他锁不能改成其他的锁，必须等到提交才是释放这个锁。)

##### 共享锁

在读取数据时，事务默认会给要读的数据加上共享锁，事务提交释放资源的共享锁。这种锁之所以成为共享锁是因为多个事务可以同时持有同一数据资源上的共享锁。

### SQL语句

##### group by 分组

在分组的情况下，select子句会有限制，只能查询整个组的统计情况。

每个组由在GROUP BY子句中指定的各元素决定。

所有聚合函数都忽略NULL，只有COUNT(*)除外。

```sql
SELECT TOP (1000)
      [ParentID],count(*)
  FROM [net_6].[dbo].[CatalogTree]
  group by ParentID
  
  
  
  
    select year(CreatedTime) as 年,count(*) as 总和 from CatalogTree
  group by year(CreatedTime)
  
  
  
  select SeparatorCode,sum(LastSerialNumber)
from CatalogTree
group by SeparatorCode

/*
SeparatorCode	(无列名)
NULL	10000001
-	26300183
*	1000300002
.	100000
/	100000
_	1100000012

*/
```

常用聚合函数 `count() ` `sum()`  `average()` `max()` `min()`

```sql
  select ParentID,count(*) as counts
  from CatalogTree
  group by ParentID
  having COUNT(*)>5
```

使用group by分组之后想要添加一些条件可以使用 having，而不是使用where

##### over开窗函数

over子句使用不必对数据进行分组，能够在同一行中同时返回基础行的列和聚合函数行的列。(相当于group by的灵活加强版，group by分组select除了聚合函数字段只能写分组字段，over想统计哪个分组字段都可以，比group by 更灵活)。

然后可以任意指定数据分布分组

不分组使用over() 会统计from表中所有行

over(partition by 列名) 统计使用这一列分组的数据

```sql
  select CatalogTypeName,SeparatorCode,LastSerialNumber,
  sum(LastSerialNumber) over() as totalSum,
  sum(LastSerialNumber) over(partition by SeparatorCode) as partSum
  from CatalogTree
  /**
CatalogTypeName	SeparatorCode	LastSerialNumber	totalSum	partSum
编码物料_BOM	NULL	10000001	2136800198	10000001
铁定	-	1000000	2136800198	26300183
DBOM	-	100002	2136800198	26300183
EBOM	-	100001	2136800198	26300183
MBOM	-	100008	2136800198	26300183
LBOM	-	11	2136800198	26300183
测试第五级	-	100001	2136800198	26300183
*/
```

##### in

```sql
select * from CatalogTree where CatalogTypeCode in ('2','3','4')
```

##### 日期计算

字符串方式表示日期,可以使用八位字符串表示一个日期

```sql
select CatalogTypeName,CatalogTypeCode from CatalogTree where CreatedTime>='20210101'

select CatalogTypeName,CatalogTypeCode from CatalogTree where CreatedTime>=cast('20210101' as datetime)

select datepart(year,getdate()) ,datepart(month,getdate()),datepart(day,getdate())

-- 日期的加减法
select dateadd(month,3,getdate())


-- 减法
select datediff(year,'19850901',getdate())
```

##### 内连接 左连接 右连接

左连接把左边剩余没有参与连接的记录添加到查询的结果中，右连接即把右边的表没有参与连接的记录添加到查询结果中。



```sql
select ct.CatalogTypeName,
sum(InitialSerialNumber) over(partition by ct.SeparatorCode) as 'count'
from CatalogTree as ct
left join Catalog_Record as cr
on ct.ID=cr.ItemId
/*

CatalogTypeName	count
编码物料_BOM	10000000
铁定	27600011
DBOM	27600011
EBOM	27600011
MBOM	27600011
LBOM	27600011
测试第五级	27600011
测试第六级	27600011
*/
```



#### 子查询

##### 独立子查询

每个子查询所属于的外部查询，独立子查询独立于SQL语句外部。调试起来比较方便，因为子查询代码可以独立出来单独运行，并且确保他能够正确实现默认功能。



独立标量子查询是返回单个值的子查询，而不顾他是不是独立子查询。标量子查询可以出现在外部查询中期望使用单个值的任何地方(WHERE , SELECT,等等)。

```sql
-- 独立标量子查询
declare @maxId as int = (select max(orderid) from orders);

select orderid,orderdate,empid,custid
from orders
where orderid =@maxId

-- 合并为一句
select orderid,orderdate,empid,custid
from orders
where orderid =(select max(orderid) from orders);


```

对于有效的子查询，他的返回值不能超过一个。如果标量子返回了多个值，在运行时可能会失败

##### 独立多值子查询

多值子查询是在一个列中返回多个值的子查询，而不管子查询是不是独立的。一些谓词(例如IN谓词)可以处理多值子查询。IN谓词的格式是：

```sql
<表达式> IN <多值子查询>

-- 多值子查询
select orderid
from orders
where empid IN (select empid from employees as e 
               where lastName like N'D%')
```

使用IN之后，对于任何数量的ID返回值(0 个，1个，或者多个)都是有效的。

在很多情况下既可以使用子查询又可以使用连接解决问题，他们没有谁更好的说法。因为在一些情况下数据库引擎对这两种查询的编译解释可能会是一样的。在一些情况下又不一样。

```sql
-- 和上面多值子查询同样效果的 连接查询
select o.orderid
from employees as e
join orders as o
on e.empid=o.empid
where e.lastname like N'D%'
```

##### 相关子查询

相关子查询就是引用了外部查询中出现的表的列。说明子查询要依赖于外部的查询，不能单独调用它。

```sql
-- 相关子查询
select custid,orderid,orderdate,empid
from orders as o1
where orderid =(
	select max(o2.orderid) from orders as o2
	where o2.custid=o1.custid)
```

相关子查询要依赖于外部查询，这使得他比独立子查询更难调试，因为无法把子查询部分分离出来单独运行。

##### EXISTS谓词

支持一个名为EXISTS的谓词，他的输入是一个子查询；如果子查询能够返回任何行，则该谓词返回TRUE，否则返回FALSE。

```sql
select custid,companyname from Customers as c
where country = N'spain'
and exists(
	select * from Orders as O 
	where O.custid = C.custid)
```

使用exists 谓词一个好处是类似于英语语言来直观表达结果。(使用select 常数 from orders)效率更高，但是相比于select * 可读性会变得更差。



### SQL 性能优化

#### 索引

##### 什么是索引?

减少磁盘I/O和逻辑读次数的最佳方法之一是使用索引。索引允许SQLServer 在表里查找数据而不需要扫描整个表。数据库里的一个索引与书籍里的索引相似。例如，希望在本书中查找一个短语 Table Scan。如果没有本书后面的索引，必须翻遍整本书来查找所需要的文本。有了索引，就可以知道所需要的信息所在的位置。
在调整数据库性能时，在用于查询的不同列上创建索引来帮助SQL Server 快速地查找数据。

- 类似词典:词典是按照字母顺序排列的一个不同单词的列表。索引可以以相似的风格存储。数据被排序，但是仍然会有重复。索引根据被称为聚簇索引的索引顺序来排列存储数据。因为SOLServer 保存数据的方式，所以这是数据库设计中最重要的索引之一。
- 类似书籍索引:可以不改变表的设计而创建一个排序的列表，这与书籍索引的创建方式类似。正如书籍的关键字索引列出不同部分中的关键字以及引用书籍正文的页数那样。这种类型被称为非聚簇索引。

SQL Server会自动为类型约束创建索引(例如，primary key unique)

##### 索引的好处

​	SOLServer即使没有索引也应该能够查找数据。当没有聚簇索引存在以建立数据的存储顺序时，存储引擎将简单地遍历整个表以查找所需的。没有聚簇索引的表被称为堆表(Heaptable)。堆(Heap)只是一堆未经加工的数据，以行标识符作为指向存储位置的指针。这里面的数据没有顺序，也不能搜索，只能逐行地遍历这些数据，这一过程被称为扫描(scan)。当存在一个聚簇索引时，非聚簇索引上的指针由聚簇索引中所定义的值组成。这就是聚簇索引为什么这么重要。

​	因为页面的空间有限，所以一行包含的列数越少，它就能保存越多的行。非聚簇索引通常不包含所有表列，它一般只包含有限数量的列。因此，一个页面将能包含比表行(包含所有的列)本身更多行的非聚簇索引。因此，SQLServer 能够从表现一个非聚簇索引的页面中读到比从表现包含该列的表的页面上更多的值。

​	非聚簇索引的另一个好处是，它有一个独立于数据表的结构，所以可以被放置在不同的文件组，使用不同的I/0路径。这意味着SOLServer 可以并行访问索引和表，使查找更快速。

​	索引用B-树结构存储信息，所以查找特定行所需的读操作被最小化了。后面的例子说明了B-树结构的好处。

##### 索引开销

​	索引给性能带来的好处有一定的代价。有索引的表需要更多的存储和内存空间以容纳表的数据页面之外的索引页面。数据操纵查询(INSERT、UPDATE和DELETE 语句，或者创建、读取、更新、删除[CRUD]中的 CUD 部分)可能花费更长的时间，需要更多的处理时间以维护不断变化的表的索引。如果一个INSERT 语句添加一行到表中，那么它也必须添加一行到索引结构中。如果索引是一个聚簇索引，开销更大，因为行必须以正确的顺序添加到数据页面，这可能需要其他数据行被重新定位到新行输入位置的下面。UPDATE和DELETE数据操纵查询以相似的风格修改索引页面。

​	设计索引时，将从两个角度去进行操作:对于现有的已经处于生产状态的系统，这里需要测量索引的总体影响;对于战术性的方法，这里所担心的是查询立刻带来的好处，一般是在开始设计系统时。当必须处理现有的系统时，应该确保索引给性能带来的好处超过处理资源的额外成本

#### 索引设计

- 检查WHERE子句和连接条件列;
- 使用窄索引;
- 检查列的唯一性;
- 检查列的数据类型:
- 考虑列顺序;
- 考虑索引类型(聚簇vs.非聚簇)。