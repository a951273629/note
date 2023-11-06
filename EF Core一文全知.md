### EF Core一文全知

##### 什么是EF core

微软官方的 ORM 框架。ORM (object relational mapping)，对象关系映射中的“对象”指的就是C#中的对象，而“关系”指的是关系数据库，“映射”指的是在关系数据库和 C#对象之间搭建一座“桥梁”。同样是ORM框架还有Dapper，还有java的Hiberante框架。

**ORM只是对 ADONET 的封装，ORM底层仍然是通过ADONET 访问数据库的**

EFCore和Dapper相比，Dapper更轻量级一些，许多场景需要自己手写SQL。

##### 使用EF Core

首先安装这两个微软提供的Nuget包

- Microsoft.EntityFrameworkCore.SqlServer
- Microsoft.EntityFrameworkCore.Tools

创建一个实现了` IEntityTypeConfguration `接口的实体类的配置类 BookEntityConfig它用于配置实体类和数据库表的对应关系

在 Configure 方法中对实体类和数据库表的关系做详细的配置。其中builder.ToTable("T Books")表示这个实体类对应数据库中名字为T Books的表。这里没有配置各个属性在数据库中的列名和数据类型，EF Core将会默认把属性的名字作为列名，并且根据属性的类型来推断数据库表中各列的数据类型。

```c#
 //实体类到数据库表的对应配置fluent api形式
public class EntityConfigBook : IEntityTypeConfiguration<Book>
    {
        void IEntityTypeConfiguration<Book>.Configure(EntityTypeBuilder<Book> builder)
        {
            builder.ToTable("T_Books");
            //设置主键
            builder.HasKey(b => b.Id);
            builder.Property(e => e.Title).HasMaxLength(50).IsRequired();
            builder.Property(e => e.AuthorName).HasMaxLength(20).IsRequired();
            //builder.ToTable("T_Books");
        }
    }
    
// 实体类
    internal class Book
    {
        public long Id { get; set; }//主键
        public string Title { get; set; }//标题
        public DateTime PubTime { get; set; }//发布日期
        // 用Data Annotion 注解配置字段忽略不映射到数据库中
        [NotMapped]
        public double Price { get; set; }//单价
        public string AuthorName { get; set; }//作者名字
    }
```

继承自 DbContext的类叫作“上下文”，OnConfiguring 方法用于对程序要连接的数据库进行配置，其中conmStr变量的值表示程序要连接本地SQLServer 数据库中名字为 demol的数据库如果要连接其他服务器中的SOL Server 数据库或者指定数据库的用户名、密码，请查询微软文档中关于连接字符串的格式要求。

```c#
public class TestDbContext : DbContext
    {
        internal DbSet<Book> books { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string connStr = "Server=.;Database=demo1;Trusted_Connection=True";
            optionsBuilder.UseSqlServer(connStr);

            //改变打印输出流
            optionsBuilder.LogTo(Console.WriteLine);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
```

​		在传统软件开发的流程中，数据库表的创建是由开发人员手工完成的，而在使用EF Core 的时候，我们可以从实体类的定义中自动生成数据库表。这样开发人员可以专注于实体类模型的创建，而创建数据库表这样的事情就交给 EF Core 完成。==这种先创建实体类再生成数据库表的开发模式叫作“模型驱动开发”，区别于先创建数据库表后创建实体类的“数据驱动开发”==。EF Core这种根据实体类生成数据库表的操作也被叫作==“迁移”(migration)==。

使用EF Core生成数据库工具 

- 在包管理器控制台执行 `Add-Migration InitCreate` 生成迁移脚本
- 在包管理器控制台执行 `Update-database` 通过迁移脚本生成数据库表

注意：执行 `Add-Migration InitCreate` ，要选择迁移的项目为执行项目，控制台也要选择为当前执行的项目并且保证Main函数可以正常执行

![](https://xiaoming-1258871044.cos.ap-shanghai.myqcloud.com/EFCore/1698224625294.png?q-sign-algorithm=sha1&q-ak=AKIDeSgHL6COFF_IRI_1DuvFhBYu9QqnvtjkuSKmVgwMIwE_qoo464md-XcwzGFYwq3c&q-sign-time=1698291997;1698295597&q-key-time=1698291997;1698295597&q-header-list=host&q-url-param-list=ci-process&q-signature=3a8687eb40c194abb93b84842a2f36fbf64bfb2c&x-cos-security-token=ZU4X9lUAloYqMK3Ceqjp2UqCMuX29Oja34cc81c69c358d148731f24c4401620cPdClBoCTmGy-Ia0rDLR8MVF3jNWV7jyIzNaQAU-q_cL0U2zDc_YLQjGDaV5kRNvkeZYX4mqNqSgdPdqnJLIZLE6wJ_pmTmX66-so9taR-5k5w5gkDWA9Aduts9O5E8mjxU9vx2b189BCIUg_zInDkH2sO5p5CrT0sj0YG97yGWQ_oNxZy81qOyodV3f5SoFq&ci-process=originImage)

##### 增加数据

由于 TestDbContext 的父类 DbContext 实现了 IDisposable 接口，因此 TestDbContext 对象，需要使用using代码块进行资源的释放。

```c#
using TestDbContext ctx = new TestDbContext();
var b1 = new Book{ AuthorName = "杨中科", Title = "零基础趣学C语言", 
    Price = 59.8, PubTime = new DateTime(2019, 3, 1) };
var b2 = new Book{ AuthorName = "Robert Sedgewick", Title = "算法(第4版)", 
    Price = 99, PubTime = new DateTime(2012, 10, 1) };
var b3 = new Book{ AuthorName = "吴军", Title = "数学之美", 
    Price = 69, PubTime = new DateTime(2020, 5, 1) };

ctx.Books.Add(b1);
ctx.Books.Add(b2);
ctx.Books.Add(b3);

await ctx.SaveChangesAsync();
```

##### 查询数据

因为==DbSet实现了`IEnumerable<T>`接口，所以我们可以使用linQ语句来操作数据库==

使用 LINQ 进行更复杂的数据查询。通过Single、FirstOrDefault 等方法进行数据查询。

```c#
using TestDbContext ctx = new TestDbContext();
Console.WriteLine("***所有书籍***");
foreach (Book b in ctx.Books)
{
    Console.WriteLine($"Id={b.Id},Title={b.Title},Price={b.Price}");
}
Console.WriteLine("***所有价格高于80元的书籍***");
IEnumerable<Book> books2 = ctx.Books.Where(b => b.Price > 80);
foreach (Book b in books2)
{
    Console.WriteLine($"Id={b.Id},Title={b.Title},Price={b.Price}");
}


//使用Single FirstOrDefault
using TestDbContext ctx = new TestDbContext();
Book b1 = ctx.Books.Single(b => b.Title == "零基础趣学C语言");
Console.WriteLine($"Id={b1.Id},Title={b1.Title},Price={b1.Price}");
Book? b2 = ctx.Books.FirstOrDefault(b => b.Id == 9);
if (b2 == null)
{
    Console.WriteLine("没有Id=9的数据");
}
else
{
    Console.WriteLine($"Id={b2.Id},Title={b2.Title},Price={b2.Price}");
}
```

##### 修改删除数据

们首先需要把要修改的数据查询出来，然后对查询出来的数据进行修改，再执行SaveChangesAsync 保存修改即可。

```c#
using TestDbContext ctx = new TestDbContext();
var b = ctx.Books.Single(b => b.Title == "数学之美");
b.AuthorName = "Jun Wu";
await ctx.SaveChangesAsync();
```

##### 删除数据

把待删除的数据查询出来，然后调用 DbSet 或者DbContext的 Remove方法把数据删除，再执行 SaveChangesAsync方法保存结果到数据库。

```c#

using TestDbContext ctx = new TestDbContext();
var b = ctx.Books.Single(b => b.Title == "数学之美");
ctx.Remove(b);//也可以写成ctx.Books.Remove(b);
await ctx.SaveChangesAsync();

```

#### 实体类配置

##### Data Annotion 注解形式(.net中称为特性)

DataAnnotation(数据注释)指的是可以使用NET 提供的Attribute对实体类属性等进行标注的方式来实现实体类配置。

```c#
//表名为Book
[Table("T_Books")]
public class Book
{
    public long Id { get; set; }//主键
    [MaxLength(50)]
    [Required]
    public string Title { get; set; }//标题
    //不映射到数据库中
    [NotMapped]
    public DateTime PubTime { get; set; }//发布日期
    public double Price { get; set; }//单价
    //最大长度20 不能为空
    [MaxLength(20)]
    [Required]
    public string AuthorName { get; set; }//作者名字
}
```

##### Fluent API 映射配置

- Flent API能够更好地进行职责分离实体类只负责进行抽象的描述，不涉及与数据库相关的细节，所有和数据库相关的细节被放到配置类中，这样我们能更方便地进行大型项目的管理。
- Fluent API的功能更强大。Fluent API 几乎能实现 Data Annotation 的所有功能，而 DataAnnotation则不支持 FluentAPI的一些功能。

日常开发先使用 Data Annotation，因为 Data Annotation 的使用更简单。在 Data
Annotation 无法实现的地方，再使用FluentAPI进行配置

**Fluent API基本的配置**

- 视图与实体类映射

可以用下面的代码把 blogsView 这个数据库中的视图和 Blog实体类进行映射

```c#
modelBuilder.Entity<Blog>().Toview("blogsView");
```

- 排除属性映射

默认情况下，一个实体类的所有属性都会映射到数据库表中，如果想让 EF Core 忽略一个
属性，就可以用 Ignore 配置。比如下面的代码表示把 Blog 实体类中的 Name2 属性排除:

```c#
modelBuilder,Entity<Bloq>().Ignore (b => b. Name2);
```

- 数据库表列名

数据库表中的列名默认和属性名一样，我们可以使用 HasColumnName 方法配置一个不同的列名。比如 Blog 实体类中有一个属性 BlogId，默认的数据库表中的列名就是 BlogId，我们可以用如下的代码把对应的数据库表中的列名改为 blog id:

```c#
modelBuilder.Entity<Blog>(),Property(b =>b.BlogId).HasColumnName("blog_id");
```

- 列数据类型
  EF Core 默认会根据实体类的属性类型、最大长度等确定字段的数据类型，我们可以使用HasColumnType为列指定数据类型。
  比如 EF Core在SQLServer 数据库中对于string类型的属性,默认生成nvarchar类型的列我们可以通过下面的代码把列的数据类型改为 varchar

```
builder.Property(e => e.Title) .HasColumnType("varchar(200)")
```

- 主键
  EFCore 默认把名字为Id 或者“实体类型+Id”的属性作为主键，我们可以用 HasKey 配置其他属性作为主键。比如下面的代码把Number 列作为主键，为了保持项目命名的统一以及代码的简洁，这里建议开发人员采用默认的 Id 作为主键。

```c#
modelBuilder.Entity<student>().HasKey(c => c.Number);
```

- 索引

EF Core 中可以用 HasIndex 方法配置索引，如下代码就是将 Blog 实体类的 Url 属性定义为索引:

```c#
modelBuilder.Entity<Blog>() .HasIndex(b => b.Url);
```

EFCore 也支持多个属性组成的复合索引,只要给 HasIndex 方法传递由一个或多个属性的名字组成的匿名类对象即可。如下代码就是将 Person实体类的 FirstName

```c#
modelBuilder,Entity<Person>(),HasIndex(p => new ( p.FirstName， plastName ));
```


默认情况下，EF Core 中定义的索引不是唯一索引，我们可以用`IsUnique` 方法把索引配置为唯一索引。我们还可以用`IsClustered` 方法把索引设置为聚集索引。

##### 主键类型

- 自增long类型

自增 long 类型的使用非常简单，所有主流数据库系统都内置了对自增列的支持，新插入的数据会由数据库自动赋予一个新增的、不重复的主键值。自增 long 类型占用磁盘空间小，==可读性强，但是自增 long 类型的主键在数据库迁移以及分布式系统(如分库分表、数据库集群)中使用起来比较麻烦，而且在高并发插入的时候性能比较差==。
由于自增列的值一般都是由数据库生成的，因此无法提前获得新增数据行的主键值，我们需要把数据保存到数据库之后才能获得主键的值。EF Core 会在把数据保存到数据库之后，把自增主键的值自动赋值给主键属性

- Guid类型

Guid 算法使用网卡的MAC(medium access control，介质访问控制)地址、时间戳等信息生成一个全球唯一的ID。==由于 Guid 的全球唯一性，它适用于分布式系统，在进行多数据库数据合并的时候很方便，适用于高并发插入输入==，因此我们也可以用 Guid 类型作为主键。

#### 关系配置

EF Core 支持一对多、多对多、一对一等关系。

##### 一对多

对多是常见的实体类间的关系。比如文章和评论的关系就是一对多的关系，也就是一篇文章对应多条评论。下面通过文章和评论这两个实体类来讲解一对多关系的配置

```c#
// 一
public class Article
{
	public long Id { get; set; }//主键
	public string Title { get; set; }//标题
	public string Content { get; set; }//内容
	public List<Comment> Comments { get; set; } = new List<Comment>(); //此文章的若干条评论
}

// 多
public class Comment
{
	public long Id { get; set; }
	public Article Article { get; set; }
	public long ArticleId { get; set; }
	public string Message { get; set; }
}

```

在上面的实体类中，我们看到文章的实体类Article 中定义了一个 Comment 类型的 List属性,因为一篇文章可能有多条评论;评论的实体类 Comment 中定义了一个Article 类型的属性,因为一条评论只能属于一篇文章。

在一对多中的配置可以有：

```c#
// Comment 实体类配置中
HasOne(...).WithMany(...);
// Article 实体类配置中
HasMany(...).WithOne(...);
```

具体一对多的配置

```c#
//一对多的 多端配置
class CommentConfig : IEntityTypeConfiguration<Comment>
{
	public void Configure(EntityTypeBuilder<Comment> builder)
	{
		builder.ToTable("T_Comments");
		builder.HasOne<Article>(c => c.Article).WithMany(a => a.Comments)
			.IsRequired().HasForeignKey(c => c.ArticleId);
		builder.Property(c => c.Message).IsRequired().IsUnicode();
	}
}


//一对多的 一端配置
class ArticleConfig : IEntityTypeConfiguration<Article>
{
	public void Configure(EntityTypeBuilder<Article> builder)
	{
		builder.ToTable("T_Articles");
		//也可以在一对多的一端配置  “一对多关系”
		//builder.HasMany(c => c.Comments).WithOne(a=>a.Article).IsRequired();
		builder.Property(a => a.Content).IsRequired().IsUnicode();
		builder.Property(a => a.Title).IsRequired().IsUnicode().HasMaxLength(255);
	}
}
```

**一对多数据的插入**

```c#
Article a1 = new Article();
a1.Title = "微软发布.NET 6大版本的首个预览";
a1.Content = "微软昨日在一篇官网博客文章中宣布了 .NET 6 首个预览版本的到来。";
Comment c1 = new Comment() { Message = "支持" };
Comment c2 = new Comment() { Message = "微软太牛了" };
a1.Comments.Add(c1);
a1.Comments.Add(c2);
using TestDbContext ctx = new TestDbContext();
ctx.Articles.Add(a1);
```

**一对多数据的获取**

​		==C#代码被翻译成了使用 Left Join 语句对TArticles 和TComments 表进行关联音询的SOL语句。起到关联查询作用的就是 Include 方法==，它用来生成对其他关联实体类的查询操作。

​		Include方法是定义在MicrosoftEntityFrameworkCore 命名空间中的扩展方法因此在使用这个方法之前，需要在代码中添加对 MicrosoftEntityFrameworkCore 命名空间的引用。

```c#
using TestDbContext ctx = new TestDbContext();
Article a = ctx.Articles.Include(a => a.Comments).Single(a => a.Id == 1);
Console.WriteLine(a.Title);
foreach (Comment c in a.Comments)
{
	Console.WriteLine(c.Id + ":" + c.Message);
}
```

##### 一对一

​		在一对一关系中，把关系放到哪一方的实体类的配置中都可以。这里把关系的配置放到了 Order 类的配置中。这里的配置同样遵守 HasXXX(...).WithYYY(..)的模式，由于双方都是一端，因此使用 HasOne(...).WithOne(...)进行配置。由于在一对一关系中，必须显式地指定外键配置在哪个实体类中，因此我们通过 HasForeignKey 方法声明外键对应的属性。

```c#

class Delivery
{
	public long Id { get; set; }
	public string CompanyName { get; set; }//快递公司名
	public String Number { get; set; }//快递单号
	public Order Order { get; set; }//订单
	public long OrderId { get; set; }//指向订单的外键
}

class Order
{
	public long Id { get; set; }
	public string Name { get; set; }//商品名
	public string Address { get; set; }//收货地址
	public Delivery? Delivery { get; set; }//快递信息
}

class DeliveryConfig : IEntityTypeConfiguration<Delivery>
{
	public void Configure(EntityTypeBuilder<Delivery> builder)
	{
		builder.ToTable("T_Deliveries");
		builder.Property(d => d.CompanyName).IsUnicode().HasMaxLength(10);
		builder.Property(d => d.Number).HasMaxLength(50);
	}
}

class OrderConfig : IEntityTypeConfiguration<Order>
{
	public void Configure(EntityTypeBuilder<Order> builder)
	{
		builder.ToTable("T_Orders");
		builder.Property(o => o.Address).IsUnicode();
		builder.Property(o => o.Name).IsUnicode();
		builder.HasOne<Delivery>(o => o.Delivery).WithOne(d => d.Order)
			.HasForeignKey<Delivery>(d => d.OrderId);
	}
}
```

##### 多对多

​		同样地，多对多的关系配置可以放到任何一方的配置类中，这里把关系配置代码放到了Student 类的配置中。这里同样采用的是 HasXXX(..).WithYYY(.)的模式，由于是多对多，关系的两端都是“多”，因此关系配置使用的是 HasMany(...).WithMany(...)。一对多和一对一都只要在表中增加外键列即可，但是在多对多关系中，我们必须引入一张额外的数据库表保存两张表之间的对应关系。在EF Core 中，使用UsingEntity(->j.ToTable (T_Students_Teachers"))的方式配置中间表。

```c#
// Student.cs
public class Student
{
	public long Id { get; set; }
	public string Name { get; set; }
	public List<Teacher> Teachers { get; set; } = new List<Teacher>();
}
// Teacher.cs
public class Teacher
{
	public long Id { get; set; }
	public string Name { get; set; }
	public List<Student> Students { get; set; } = new List<Student>();
}


//StudentConfig.cs
 public class StudentConfig : IEntityTypeConfiguration<Student>
    {
        public void Configure(EntityTypeBuilder<Student> builder)
        {
            builder.ToTable("T_Students");
            builder.Property(s => s.Name).IsUnicode().HasMaxLength(255);
            builder.HasMany(s => s.Teachers).WithMany(t => t.Students).UsingEntity(j => j.ToTable("T_Join"));
        }
    }
    
  // TeacherConfig.cs
class TeacherConfig : IEntityTypeConfiguration<Teacher>
{
	public void Configure(EntityTypeBuilder<Teacher> builder)
	{
		builder.ToTable("T_Teachers");
		builder.Property(s => s.Name).IsUnicode().HasMaxLength(20);
	}
}
//TestDbContext.cs
class TestDbContext : DbContext
{
    public DbSet<Student> Students { get; set; }
    public DbSet<Teacher> Teachers { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        string connStr = "Server=.;Database=demo1;Trusted_Connection=True";
        optionsBuilder.UseSqlServer(connStr);
        optionsBuilder.LogTo(Console.WriteLine);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(this.GetType().Assembly);
    }
}


//Program.cs
//新增数据
Student s1 = new Student { Name = "tom" };
Student s2 = new Student { Name = "lily" };
Student s3 = new Student { Name = "lucy" };
Student s4 = new Student { Name = "tim" };
Student s5 = new Student { Name = "lina" };
Teacher t1 = new Teacher { Name = "杨中科" };
Teacher t2 = new Teacher { Name = "罗翔" };
Teacher t3 = new Teacher { Name = "刘晓艳" };
t1.Students.Add(s1);
t1.Students.Add(s2);
t1.Students.Add(s3);
t2.Students.Add(s1);
t2.Students.Add(s3);
t2.Students.Add(s5);
t3.Students.Add(s2);
t3.Students.Add(s4);
using TestDbContext ctx = new TestDbContext();
ctx.AddRange(t1, t2, t3);
ctx.AddRange(s1, s2, s3, s4, s5);
await ctx.SaveChangesAsync(); 


//查询数据
using TestDbContext ctx = new TestDbContext();
foreach (var t in ctx.Teachers.Include(t => t.Students))
{
	Console.WriteLine($"老师{t.Name}");
	foreach (var s in t.Students)
	{
		Console.WriteLine($"---{s.Name}");
	}
}
```

对上面的代码执行迁移，可以发现数据库中增加了 3 张数据库表

![](https://xiaoming-1258871044.cos.ap-shanghai.myqcloud.com/EFCore/1698289093389.png?q-sign-algorithm=sha1&q-ak=AKIDDsBcEofuRzgPSb6Y0aW1Vx9VldxE8ViCjDVZ82xDElau97c5hCQ3mm4tfOTMvtwa&q-sign-time=1698292142;1698295742&q-key-time=1698292142;1698295742&q-header-list=host&q-url-param-list=ci-process&q-signature=e304e054127b804f4bef374c0a0c370753cf4e37&x-cos-security-token=5gZ3Y45HeYKetj6IfwjKhgAv4t1UB4Kad056e275e28f1fb248977feb8e391830wgGDUbhOcsIDdXo5rG7CCMZ6-IAR5EteAyBUI_Pkg5dsu3w6eDghvou5OGRqnx5WCO_fgRPL0ZAWU6dJhRttcWb21A09WBfg10WGYdJy3zyPiHpryBd7Km6V_6B9tpMFaPByDFwTL0dnVXkDzIWg_IR3Fctlha6r2CMDL6Bu3C00GZ7Le1ZEhhixJee8Q3x1&ci-process=originImage)

##### 单向双向属性导航

在上面的例子中都是`双向数据导航`

A可以拿到B，B也可以拿到A。称为双向数据导航

双向导航让我们可以通过任何一方的对象获取对方的信息，但是有时候我们不方便声明双向导航。比如在大部分系统中，基础的“用户”实体类会被非常多的其他实体类引用，比如“请假单”中会有“申请者”“审批者”等“用户”实体类型的属性，“报销单”中会有“创建者“责任财务人员”“主管”等“用户”实体类型的属性，因此系统中会有几十个甚至上百个实体类都有“用户”实体类型的属性，但是“用户”实体类不需要为每个实体类都声明一个导航属性。这种情况下，我们就需要一种只在“多端”声明导航属性，而不需要在“一端”声明导航属性的单向导航机制。
这种单向导航属性的配置其实很简单，只要在WithMany 方法中不指定属性即可。

```csharp
//LeaveConfig.cs
class LeaveConfig : IEntityTypeConfiguration<Leave>
{
	public void Configure(EntityTypeBuilder<Leave> builder)
	{
		builder.ToTable("T_Leaves");
		builder.HasOne<User>(l => l.Requester).WithMany();
		builder.HasOne<User>(l => l.Approver).WithMany();
		builder.Property(l => l.Remarks).HasMaxLength(1000).IsUnicode();
	}
}
```

##### IQueryable延迟查询和服务端评估

- 服务端评估

Queryable 中定义的 Where 方法则支持把 LINQ查询转换为SQL语。因此，在使用EF Core的时候，为了避免“客户端评估”，我们要尽量调用 IQueryable 版本的方法。

IEnumberable会将 表中所有的数据都加载到应用程序内存中，然后在内存中讲行数据的过滤，这就是“客户端评估”。

IQueryable 会在数据服务器上执行有查询条件的SQL。

- 延迟查询

IQueryable在执行Where语句时并没有立即执行

==在遍历IQueryable才会立即执行查询，除了遍历方法之外还有。还有 ToArray、ToList、Min、Max、Count 等立即执行方法;GroupBy、OrderBy、Include、Skip、Take 等方法是非立即执行方法==。判断一个方法是否是立即执行方法的简单方式是:一个方法的返回值类型如果是 IQucryable 类型，这个方法一般就是非立即执行方法，否则这个方法就是立即执行方法。

- IQueryable的复用

IQueryable 是一个待查询的逻辑，因此它是可以被重复使用的

##### EF core分页查询

学习LINQ的时候我们知道可以使用Skip(n)方法实现“跳过n条数据”可以使用Take(n)方法实现“取最多n条数据”，这两个方法配合起来就可以分页获取数据，比如 ==Skip(3).Take(8)==就是“获取从第3条开始的最多8 条数据”。

在使用分页查询的时候有一个问题需要注意，那就是尽量显式地==指定排序规则==，因为如果不指定排序规则，那么数据库的查询计划对于数据的排序可能是不确定的

```c#
OutputPage(1, 5);
Console.WriteLine("******");
OutputPage(2, 5);
void OutputPage(int pageIndex, int pageSize)
{
	using TestDbContext ctx = new TestDbContext();
	IQueryable<Book> books = ctx.Books.Where(b => !b.Title.Contains("张三"));
	long count = books.LongCount();//总条数
	long pageCount = (long)Math.Ceiling(count * 1.0 / pageSize);//页数
	Console.WriteLine("页数：" + pageCount);
    
    //分好页的数据
	var pagedBooks = books.Skip((pageIndex - 1) * pageSize).Take(pageSize);
	foreach (var b in pagedBooks)
	{
		Console.WriteLine(b.Id + "," + b.Title);
	}
}
```

OutputPage方法的 pagelndex 参数代表页码，pageSize 参数代表页大小。在OutputPage方法中，我们首先把查询规则 books 创建出来，然后使用 LongCount 方法获取满足条件的数据的总条数。使用 countX1pageSize 可以计算出数据总页数，考虑到有可能最后一页不满，因此我们用 Ceiling 方法获得整数类型的总页数。由于 pageIndex 的序号是从 1开始的，因此我们要使用 Skip 方法跳过(pageldex -1) X pageSize 条数据，再获取最多pageSize 条数据就可以获取正确的分页数据了。

##### EF Core性能优化

EF Corc 默认采用“快照更改跟踪”实现实体类改变的检测。在上下文首次跟踪一个实体类的时候，EF Core 会创建这个实体类的快照，当执行 SaveChanges 等方法的时候，EF Core 将会把存储的快照中的值与实体类的当前值进行比较，以确定哪些属性值被更改了
实体类的改变并不只有“属性值改变”这样一种情况，实体类被删除等也属于改变。实体类有如下5种可能的状态。

-  已添加(Added):上下文正在跟踪此实体类，但数据库中尚不存在此实体类
- 未改变(Unchanged):上下文正在跟踪此实体类，此实体类存在于数据库中，其属0性值和从数据库中读取到的值一致，未发生改变。
- 已修改(Modifed):上下文正在跟踪此实体类，此实体类存在于数据库中，并且其部分属性值已被修改。

- 已删除(Deleted):上下文正在跟踪此实体类，此实体类存在于数据库中，但在下次调用SaveChanges 时要从数据库中删除对应数据。
- 分离(Detached):上下文未跟踪该实体类。

EF Core 默认会对通过上下文查询出来的所有实体类进行跟踪，以便于在执行 SaveChanges 的时候把实体类的改变同步到数据库中。上下文不仅会跟踪对象的状态改变，还会通过快照的方式记录实体类的原始值，这是比较消耗资源的。

AsNoTracking 禁用跟踪

如果开发人员能够确认通过上下文查询出来的对象只是用来展示，不会发生状态改变，那么可以使用AsNoTracking方法告诉IQueryable 在查询的时候“禁用跟踪”

Find和FindAsync方法

当使用 EF Core 从数据库中根据 Id 获取数据的时候，除了可以使用ctxBooks.Single(b->b.Id--id)之外我们还可以使用同步的 Find方法或者异步的 FindAsync方
法，比如: Book b = ctxBooks.Find(2)。Find 或者 FindAsync方法(以下简称为 Find)会先在上下文查找这个对象是否已经被跟踪如果对象已经被跟踪，就直接返回被跟踪的对象，只有在本地没有找到这个对象时，EF Core才去数据库查询，而 Single 方法则一直都是执行一次数据库查询。因此用 Fid 方法有可能减少一次数据库查询，性能更好。但是如果在对象被跟踪之后，数据库中对应的数据已经被其他程序修改了，则Find 方法可能会返回旧数据