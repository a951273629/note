# Git

[TOC]



### 1. Git简介

#### 1.1 什么是Git

Git 是一个开源的[分布式](https://so.csdn.net/so/search?q=分布式&spm=1001.2101.3001.7020)版本控制系统，用于敏捷高效地处理项目。
Git是Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放[源码](https://so.csdn.net/so/search?q=源码&spm=1001.2101.3001.7020)的版本控制软件。
Git的诞生很有趣，[康康](https://www.liaoxuefeng.com/wiki/896043488029600/896202815778784)

#### 1.2 集中式vs分布式

`集中式版本控制系统`：版本库集中存放在 **中央服务器** ，工作时从中央服务器获取最新版，干完再推送到中央服务器。最大毛病在于必须 **联网** 工作，网速成为大问题。例：CVS、SVN

![central-repo](E:\typora\homework\img\1.png)

`分布式版本控制系统`：

那分布式版本控制系统与集中式版本控制系统有何不同呢？首先，分布式版本控制系统根本没有“中央服务器”，每个人的电脑上都是一个完整的版本库，这样，你工作的时候，就不需要联网了，因为版本库就在你自己的电脑上。既然每个人电脑上都有一个完整的版本库，那多个人如何协作呢？比方说你在自己电脑上改了文件A，你的同事也在他的电脑上改了文件A，这时，你们俩之间只需把各自的修改推送给对方，就可以互相看到对方的修改了。

没有“中央服务器”，每个人的电脑都是一个完整的版本库，修改后只需要把修改推送给对方，即可看到对方的修改。相比之下 **安全** 性更高，因为中央服务器出问题所有人就没法干活。例：Git、促使Git诞生的BitKeeper、Mercurial和Bazaar
分布式版本控制系统通常也有一台充当“中央服务器”的电脑，但这个服务器的作用仅仅是用来方便“交换”大家的修改

![distributed-repo](E:\typora\homework\img\git\2.png)

### 2. Git安装

#### 2.1 Linux

输入`git`，查看是否安装git
若未安装
`sudo apt-get install git`（Debian或Ubuntu系统）

#### 2.2 Windows

[Git官网下载](https://git-scm.com/downloads)，然后按默认选项安装即可。

安装完成后，在开始菜单里找到“Git”->“Git Bash”，蹦出一个类似命令行窗口的东西，就说明Git安装成功！
输入

安装完成后，还需要最后一步设置，在命令行输入：

```sh
git config --global user.name "Name"
git config --global user.email "Your Email"
```

`--global`参数表示机器上所有Git仓库都使用这个配置

**Git可以安装在哪些操作系统上?**

linux macOs Solaris Windows Raspberry pi

### 3. 创建版本库

#### 3.1 版本库

什么是版本库？`版本库`又名`仓库`（repository）
可以简单理解成一个目录，这个目录里面的所有文件都可以被Git管理起来，每个文件的修改、删除，Git都能跟踪，以便任何时刻都可以追踪历史，或者在将来某个时刻可以“还原”。



#### 3.2 创建

1、创建一个空目录
注意：目录名不要含中文

```sh
#在git base中切换目录
cd C:/Users/xiaoming/Desktop
#创建一个空目录
mkdir git
#切换到这个目录
cd git

pwd
```

` pwd` 显示我们当前目录位于 `/c/Users/xiaoming/Desktop/git`

 如果你使用Windows系统，为了避免遇到各种莫名其妙的问题，请确保目录名（包括父目录）==不包含中文==。

2、`git init`
初始化仓库，使目录变成Git可管理的仓库
此时会多出一个.git目录，用来跟踪管理版本库的，不要乱改，否则会破坏仓库

如果你没有看到`.git`目录，那是因为这个目录默认是隐藏的，用`ls -ah`命令就可以看见。



==千万不要使用==Windows自带的**记事本**编辑任何文本文件。原因是Microsoft开发记事本的团队使用了一个非常弱智的行为来保存UTF-8编码的文件，他们自作聪明地在每个文件开头添加了0xefbbbf（十六进制）的字符，你会遇到很多不可思议的问题，比如，网页第一行可能会显示一个“?”，明明正确的程序一编译就报语法错误，等等，都是由记事本的弱智行为带来的。



注意：所有的版本控制系统只能跟踪`文本文件`的改动，对于图片、视频具体改了什么是不知道的，而且也没法跟踪word文件的改动，==因为word是二进制格式==



3、编写一个readme.txt文件

4、`git add`

```sh
#把文件添加到仓库
git add readme.txt
# 也可以添加多个文件
git add file2.txt file3.txt
#也可添加所有文件
git add .
```

5、`git commit`

```sh
git commit -m "一次帅气的提交"
```

把文件提交到仓库

`-m` 后输入的是本次提交的说明
用`add`添加不同文件，`commit`一次提交文件



为什么Git添加文件需要`add`，`commit`一共两步呢？因为`commit`可以一次提交很多文件，所以你可以多次`add`不同的文件。

#### 小结

现在总结一下学的两点内容：

初始化一个Git仓库，使用`git init`命令。

添加文件到Git仓库，分两步：

1. 使用命令`git add <file>`，注意，可反复多次使用，添加多个文件；
2. 使用命令`git commit -m <message>`，完成。



### 4. 时光穿梭机



#### 4.1 状态查看

我们继续修改`readme.txt`文件



要随时掌握工作区的状态，使用`git status`命令。可以了解当前仓库是否有文件被修改或是否有将被提交的修改

如果`git status`告诉你有文件被修改过，用`git diff`可以查看修改内容。



在知道知道了对`readme.txt`作了什么修改后，再把它提交到仓库就放心多了，提交修改和提交新文件是一样的两步.

`git add readme.txt`

`git commit -m "修改了...."`



#### 4.2 版本回退

Git也是一样，每当你觉得文件修改到一定程度的时候，就可以“保存一个快照”，这个快照在Git中被称为`commit`。一旦你把文件改乱了，或者误删了文件，还可以从最近的一个`commit`恢复，然后继续工作，而不是把几个月的工作成果全部丢失。

`git log` 查看历史提交记录

![image-20230202112909640](E:\typora\homework\img\git\image-20230202112909640.png)

`git log --pretty=oneline` 简略记录

![image-20230202112850192](E:\typora\homework\img\git\image-20230202112850192.png)

关于输出，有一大串commit id（版本号），防止多人在同一版本库内工作起冲突

每提交一个新版本，实际上Git就会把它们自动串成一条时间线

启动时光穿梭机！

```sh
git reset --hard HEAD^
```

![image-20230202113331304](E:\typora\homework\img\git\image-20230202113331304.png)

回退到上一个版本
`HEAD`表示当前版本，多一个 `^`代表回退多一个版本，如`HEAD^^` 回退到上上个版本
`HEAD~100` 回退100个版本

但是回退后再`git log`就看不到从此之后的版本了，好比回到过去却回不来了
别急，只要当前窗口没关，往上找到之前git log里往后的`commit id`就可以了
再次`git reset --hard id号`

```sh
git reset --hard 9670ebfef
```

![image-20230202113451070](E:\typora\homework\img\git\image-20230202113451070.png)

版本号没必要写全，前几位就可以了，Git会自动去找。当然也不能只写前一两位，因为Git可能会找到多个版本号，就无法确定是哪一个了。

Git的版本回退速度非常快，因为Git在内部有个指向当前版本的`HEAD`指针，当你回退版本的时候，Git仅仅是把HEAD从指向`append GPL`：

```ascii
┌────┐
│HEAD│
└────┘
   │
   └──▶ ○ append GPL
        │
        ○ add distributed
        │
        ○ wrote a readme file
```

改为指向`add distributed`：

```ascii
┌────┐
│HEAD│
└────┘
   │
   │    ○ append GPL
   │    │
   └──▶ ○ add distributed
        │
        ○ wrote a readme file
```

当然，关了也是有后悔药吃的，`git reflog`即可看到之前所有操作的版本号。在git内部其实并没有把版本删掉，只是用HEAD指针指向当前版本，然后更新工作区文件，所以看不到此后的版本

![image-20230202113657151](E:\typora\homework\img\git\image-20230202113657151.png)

#### 4.3 工作区和暂存区

![工作区与版本库关系](E:\typora\homework\img\git\4.png)
`工作区 Working Directory`：电脑的工作目录，不含.git目录(我们的git文件目录就是一个工作区)

![image-20230202113858548](E:\typora\homework\img\git\image-20230202113858548.png)

`版本库 Repository`：.git目录

`暂存库`：版本库下stage（或者叫index)的文件
版本库还包含Git为我们自动创建的第一个分支`master`，和指向master的指针`HEAD`

![image-20230202114138086](E:\typora\homework\img\git\image-20230202114138086.png)

前面讲了我们把文件往Git版本库里添加的时候，是分两步执行的：

第一步是用`git add`把文件添加进去，实际上就是把文件修改添加到暂存区；

第二步是用`git commit`提交更改，实际上就是把暂存区的所有内容提交到当前分支。



总之，git add 命令实际上就是把要提交的所有修改放到暂存区（Stage），然后，执行git commit就可以一次性把暂存区的所有修改提交到分支

一旦提交后，如果你又没有对工作区做任何修改，那么工作区就是“干净”的

```sh
$ git status
On branch master
nothing to commit, working tree clean
```

![”干净“的工作区](E:\typora\homework\img\git\3.png)

#### 4.4 管理修改

为什么Git比其他版本控制系统设计得优秀，因为Git跟踪并管理的是修改，而非文件。

现在，假定你已经完全掌握了暂存区的概念。下面，我们要讨论的就是，为什么Git比其他版本控制系统设计得优秀，因为Git跟踪并管理的是修改，而非文件。

你会问，什么是修改？比如你新增了一行，这就是一个修改，删除了一行，也是一个修改，更改了某些字符，也是一个修改，删了一些又加了一些，也是一个修改，甚至创建一个新文件，也算一个修改。



**错误提交**

第一次修改 -> `git add` -> 第二次修改 -> `git commit`
`git status`，此时只会发现第一次修改的记录，而第二次修改并没提交

你看，我们前面讲了，Git管理的是修改，当你用`git add`命令后，在工作区的第一次修改被放入暂存区，准备提交，但是，在工作区的第二次修改并没有放入暂存区，所以，`git commit`只负责把暂存区的修改提交了，也就是第一次的修改被提交了，第二次的修改不会被提交。



**正确提交**

用`git diff HEAD -- filename`命令可以查看工作区和版本库里面最新版本的区别，第二次修改并没被提交

因此，流程应如下：
第一次修改 -> `git add` -> 第二次修改 -> `git add` -> `git commit`



#### 4.5 撤销修改

1、情况一

Git会告诉你，`git checkout -- file`可以丢弃工作区的修改：

```sh
git checkout -- readme.txt
```

把readme.txt文件在工作区的修改全部撤销，这里有两种情况：
一种是readme.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
一种是readme.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。
总之，就是让这个文件回到最近一次`git commit`或`git add`时的状态。
注意：`git checkout -- file`命令中的`--`很重要，没有`--`，就变成了“切换到另一个分支”的命令



2、情况二

现在假定是凌晨3点，你不但写了一些胡话，还`git add`到暂存区了：

```sh
$ cat readme.txt

看一下看一下
看的非常的多了
有了第三行
大多
xiaoming@DESKTOP-M4BQM23 MINGW64 ~/Desktop/git (master)

$ git add readme.txt
```

在`commit`之前，你发现了这个问题。用`git status`查看一下，修改只是添加到了暂存区，还没有提交：

```sh
$ git status

On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   readme.txt
```

`git reset HEAD <file>`把暂存区的修改撤销掉（unstage），重新放回工作区
git reset命令既可以回退版本，也可以把暂存区的修改回退到工作区。当我们用HEAD时，表示最新的版本

```sh
$ git reset HEAD readme.txt

#Unstaged changes after reset:
#M       readme.txt
```

然后使用 `git checkout -- readme.txt` 再丢弃工作区的修改

再使用`git status`  整个世界终于清静了！

```sh
$ git status

On branch master
nothing to commit, working tree clean
```

3、情况三
从暂存区提交到版本库
需要参考 4.2 版本回退

4、情况四
推送到远程
没法在本地解救了

### 小结

场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令`git checkout -- file`。

场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令`git reset HEAD <file>`，就回到了场景1，第二步按场景1操作。

场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，参考[版本回退](https://www.liaoxuefeng.com/wiki/896043488029600/897013573512192)一节，不过前提是没有推送到远程库。



#### 4.6 删除文件

通常直接在文件管理器中把没用的文件删了,这个时候，Git知道你删除了文件，因此，工作区和版本库就不一致了，`git status`命令会立刻告诉你哪些文件被删除了：

```sh
git status

On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   test.txt

Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        deleted:    test.txt

```

现在你有两个选择，一是确实要从版本库中删除该文件，那就用命令`git rm`删掉，并且`git commit`：

```sh
$ git rm test.txt
rm 'test.txt'


$ git commit -m "删除了文件"
On branch master
nothing to commit, working tree clean
```

删除工作区和版本库的同一文件
在工作区`git rm`后`git commit`

==小提示==：先手动删除文件，然后使用`git rm <file>`和`git add <file>`效果是一样的。



另一种情况是删错了，因为版本库里还有呢，所以可以很轻松地把误删的文件恢复到最新版本：

```sh
$ git checkout -- test.txt
```

 ==注意==：从来没有被添加到版本库就被删除的文件，是无法恢复的！



### 5. 远程仓库

以上的功能基本上和集中式版本控制SVN一样，但Git的杀手级功能在于：`远程仓库`
Github网站可以提供免费的Git仓库托管服务的远程仓库

由于本地GIt仓库和Github仓库之间的传输是通过SSH加密的，需要进行设置：



**1、打开`Git Bash`创建SSH Key**
Git Bash打开，需要把邮件地址换成你自己的邮件地址，然后一路回车，使用默认值即可，由于这个Key也不是用于军事目的，所以也无需设置密码。

```sh
ssh-keygen -t rsa -C "youremail@example.com"
```

![image-20230202182225153](E:\typora\homework\img\git\image-20230202182225153.png)

如果一切顺利的话，可以在用户主目录里找到`.ssh`目录，里面有`id_rsa`和`id_rsa.pub`两个文件，这两个就是SSH Key的秘钥对，`id_rsa`是私钥，不能泄露出去，`id_rsa.pub`是公钥，可以放心地告诉任何人。

![image-20230202182214320](E:\typora\homework\img\git\image-20230202182214320.png)



**2、github 添加公钥**
登陆GitHub，打开“Account settings”，“SSH Keys”页面：
然后，点“Add SSH Key”，填上任意`Title`，在Key文本框里粘贴`id_rsa.pub`文件的内容。`id_rsa.pub`是公钥，可以放心地告诉任何人。

为什么GitHub需要SSH Key呢？因为GitHub需要识别出你推送的提交确实是你推送的，而不是别人冒充的，而Git支持SSH协议，所以，GitHub只要知道了你的公钥，就可以确认只有你自己才能推送。
当然，GitHub允许你添加多个Key

![image-20230202182526406](E:\typora\homework\img\git\image-20230202182526406.png)

如果你不想让别人看到Git库，有两个办法，一个是交点保护费，让GitHub把公开的仓库变成私有的，这样别人就看不见了（不可读更不可写）。另一个办法是自己动手，搭一个Git服务器，因为是你自己的Git服务器，所以别人也是看不见的。这个方法我们后面会讲到的，相当简单，公司内部开发必备。



#### 5.1 添加远程仓库

1、登陆GitHub，然后，在右上角找到“Create repository”按钮，创建一个新的仓库
在Repository name填入仓库名，其他保持默认设置，点击“Create repository”按钮，就成功地创建了一个新的Git仓库

![创建新仓库](E:\typora\homework\img\git\image-20230202182944703.png)

![image-20230202183153945](E:\typora\homework\img\git\image-20230202183153945.png)

在Repository name填入`git`(仓库的名字)，其他保持默认设置，点击“Create repository”按钮，就成功地创建了一个新的Git仓库：

![image-20230202183354810](E:\typora\homework\img\git\image-20230202183354810.png)

**2、关联Github仓库**

目前，在GitHub上的这个`git`仓库还是空的，GitHub告诉我们，可以从这个仓库克隆出新的仓库，也可以把一个已有的本地仓库与之关联，然后，把本地仓库的内容推送到GitHub仓库。

现在，我们根据GitHub的提示，在本地的`git`仓库下运行命令：在本地仓库下运行

```sh
$ git remote add origin git@github.com:a951273629/git.git
```

上面的`a951273629`替换成你自己的GitHub账户名。



添加后，远程库的名字就是`origin`，这是Git默认的叫法，也可以改成别的，但是`origin`这个名字一看就知道是远程库,下一步，就可以把本地库的所有内容推送到远程库上：

```sh
git push -u origin master
```

把本地库的内容推送到远程，用`git push`命令，实际上是把当前分支`master`推送到远程

由于远程库是空的，我们第一次推送`master`分支时，加上了`-u`参数，Git不但会把本地的`master`分支内容推送的远程新的`master`分支，还会把本地的`master`分支和远程的`master`分支关联起来，在以后的推送或者拉取时就可以==简化命令==。



**推送成功后，可以立刻在GitHub页面中看到远程库的内容已经和本地一模一样：**

![image-20230202184202931](E:\typora\homework\img\git\image-20230202184202931.png)

从现在起，只要本地作了提交，就可以通过命令：

```sh
$ git push origin master
```

把本地`master`分支的最新修改推送至GitHub，现在，你就拥有了真正的分布式版本库！

**SSH警告**

当你第一次使用Git的`clone`或者`push`命令连接GitHub时，会得到一个警告：

```sh
The authenticity of host 'github.com (xx.xx.xx.xx)' can't be established.
RSA key fingerprint is xx.xx.xx.xx.xx.
Are you sure you want to continue connecting (yes/no)?
```

这是因为Git使用SSH连接，而SSH连接在第一次验证GitHub服务器的Key时，需要你确认GitHub的Key的指纹信息是否真的来自GitHub的服务器，输入`yes`回车即可。



**3、删除远程库**

如果添加的时候地址写错了，或者就是想删除远程库，可以用`git remote rm <name>`命令。使用前，建议先用`git remote -v`查看远程库信息：

```sh
$ git remote -v
origin  git@github.com:michaelliao/learn-git.git (fetch)
origin  git@github.com:michaelliao/learn-git.git (push
```

然后，根据名字删除，比如删除`origin`：

```sh
$ git remote rm origin
```

此处的“删除”其实是解除了本地和远程的绑定关系，并不是物理上删除了远程库。远程库本身并没有任何改动。要真正删除远程库，需要登录到GitHub，在后台页面找到删除按钮再删除。

##### 小结

要关联一个远程库，使用命令`git remote add origin git@server-name:path/repo-name.git`；

关联一个远程库时必须给远程库指定一个名字，`origin`是默认习惯命名；

关联后，使用命令`git push -u origin master`第一次推送master分支的所有内容；

此后，每次本地提交后，只要有必要，就可以使用命令`git push origin master`推送最新修改；

分布式版本系统的最大好处之一是在本地工作完全不需要考虑远程库的存在，也就是有没有联网都可以正常工作，而SVN在没有联网的时候是拒绝干活的！当有网络的时候，再把本地提交推送一下就完成了同步，真是太方便了！



#### 5.2 从远程库克隆

远程库已经准备好了，下一步是用命令`git clone`克隆一个本地库：

在新的文件夹克隆

```sh
$ git clone git@github.com:a951273629/git.git


Cloning into 'git'...
remote: Enumerating objects: 13, done.
remote: Counting objects: 100% (13/13), done.
remote: Compressing objects: 100% (6/6), done.
Receiving objects: 100% (13/13), done.
remote: Total 13 (delta 3), reused 13 (delta 3), pack-reused 0
Resolving deltas: 100% (3/3), done.
```

如果有多个人协作开发，那么每个人各自从远程克隆一份就可以了。

你也许还注意到，GitHub给出的地址不止一个，还可以用`https://github.com/michaelliao/gitskills.git`这样的地址。实际上，Git支持多种协议，默认的`git://`使用ssh，但也可以使用`https`等其他协议。

使用`https`除了速度慢以外，还有个最大的麻烦是每次推送都必须输入口令，但是在某些只开放http端口的公司内部就无法使用`ssh`协议而只能用`https`。



##### 小结

要克隆一个仓库，首先必须知道仓库的地址，然后使用`git clone`命令克隆。

Git支持多种协议，包括`https`，但`ssh`协议速度最快。





### 6. 分支管理

分支在实际中有什么用呢？假设你准备开发一个新功能，但是需要两周才能完成，第一周你写了50%的代码，如果立刻提交，由于代码还没写完，不完整的代码库会导致别人不能干活了。如果等代码全部写完再一次提交，又存在丢失每天进度的巨大风险。

现在有了分支，就不用怕了。你创建了一个属于你自己的分支，别人看不到，还继续在原来的分支上正常工作，而你在自己的分支上干活，想提交就提交，直到开发完毕后，再一次性合并到原来的分支上，这样，既安全，又不影响别人工作。

Git的分支是与众不同的，无论创建、切换和删除分支，Git在1秒钟之内就能完成！无论你的版本库是1个文件还是1万个文件



#### 6.1 创建与合并分支

初始只有一条时间线，在Git里，这个分支叫主分支，即`master`分支。`HEAD`严格来说不是指向提交，而是指向master，master才是指向提交的，所以，HEAD指向的就是当前分支

一开始的时候，master分支是一条线，Git用master指向最新的提交，再用HEAD指向master，就能确定当前分支，以及当前分支的提交点
![在这里插入图片描述](E:\typora\homework\img\git\20210404215718829.png)

当我们创建新的分支，例如`dev`时，Git新建了一个指针叫`dev`，指向`master`相同的提交，再把`HEAD`指向dev，就表示当前分支在`dev`上![在这里插入图片描述](E:\typora\homework\img\git\5.png)
Git创建一个分支很快，因为除了增加一个dev指针，改改HEAD的指向，工作区的文件都没有任何变化！

从现在开始，对工作区的修改和提交就是针对dev分支了，比如新提交一次后，dev指针往前移动一步，而master指针不变![在这里插入图片描述](E:\typora\homework\img\git\6.png)

假如我们在dev上的工作完成了，就可以把dev合并到master上。Git怎么合并呢？最简单的方法，就是直接把master指向dev的当前提交，就完成了合并
![在这里插入图片描述](E:\typora\homework\img\git\7.png)

合并完分支后，甚至可以删除dev分支。删除dev分支就是把`dev`指针给删掉，删掉后，我们就剩下了一条`master`分支
![在这里插入图片描述](E:\typora\homework\img\git\20210404220111726.png)

**1、首先，我们创建`dev`分支，然后切换到`dev`分支：**

```sh
git checkout -b dev

#Switched to a new branch 'dev'
```

`git checkout`命令加上`-b`参数表示创建并切换，相当于以下两条命令：

```sh
git branch dev
git checkout dev

#Switched to a  branch 'dev'
```



**2、然后，用`git branch`命令查看当前分支：**

```sh
git branch

* dev
  master
```

`git branch`命令会列出所有分支，当前分支前面会标一个`*`号。

然后，我们就可以在`dev`分支上正常提交，比如对`readme.txt`做个修改，加上一行

然后提交：

```sh
$ git add readme.txt 
$ git commit -m "最后一次提交了"

[dev b9b06cf] 最后一次提交了
 1 file changed, 2 insertions(+), 1 deletion(-)
```

现在，`dev`分支的工作完成，我们就可以切换回`master`分支：

```sh
$ git checkout master

Switched to branch 'master'
```


此时发现刚才添加的内容不见了，是因为提交的是在`dev`分支上，而`master`分支此刻的提交点并没有变
![在这里插入图片描述](E:\typora\homework\img\git\8.png)

**3、合并分支**

现在，我们把`dev`分支的工作成果合并到`master`分支上：

```sh
$ git merge dev

Updating f3d2871..b9b06cf
Fast-forward
 readme.txt | 3 ++-
 1 file changed, 2 insertions(+), 1 deletion(-)

```

`git merge`命令用于合并指定分支到当前分支。合并后，再查看`readme.txt`的内容，就可以看到，和`dev`分支的最新提交是完全一样的。

注意到上面的`Fast-forward`信息，Git告诉我们，这次合并是“快进模式”，也就是直接把`master`指向`dev`的当前提交，所以合并速度非常快。

当然，也不是每次合并都能`Fast-forward`，我们后面会讲其他方式的合并。

**4、删除分支**

合并完成后，就可以放心地删除`dev`分支了：

```sh
git branch -d dev

# Deleted branch dev (was b9b06cf).
```

删除后，查看`branch`，就只剩下`master`分支了：

```sh
$ git branch
* master
```

因为创建、合并和删除分支非常快，所以Git鼓励你使用分支完成某个任务，合并后再删掉分支，这和直接在`master`分支上工作效果是一样的，但过程更安全。



**新版本Git的另一种创建并切换分支方式 switch**

我们注意到切换分支使用`git checkout <branch>`，而前面讲过的撤销修改则是`git checkout -- <file>`，同一个命令，有两种作用，确实有点令人迷惑。

实际上，切换分支这个动作，用`switch`更科学。因此，最新版本的Git提供了新的`git switch`命令来切换分支：

创建并切换到新的`dev`分支，可以使用：

```sh
git switch -c dev
```

直接切换到已有的`master`分支，可以使用：

```sh
$ git switch master
```

使用新的`git switch`命令，比`git checkout`要更容易理解。



##### **小结**

Git鼓励大量使用分支：

查看分支：`git branch`

创建分支：`git branch <name>`

切换分支：`git checkout <name>`或者`git switch <name>`

创建+切换分支：`git checkout -b <name>`或者`git switch -c <name>`

合并某分支到当前分支：`git merge <name>`

删除分支：`git branch -d <name>`



#### 6.2 解决冲突

人生不如意之事十之八九，合并分支往往也不是一帆风顺的。

```sh
# 准备新的feature1分支：
git switch -c feature1

#在feature1分支修改readme.txt 最后一行

git add readme.txt

git commit -m "feature1分支上的一次帅气提交"

#切换到master分支：
git switch master

#在master分支修改readme.txt 最后一行

git add readme.txt

git commit -m "master分支上的一次帅气提交"
```

现在，`master`分支和`feature1`分支各自都分别有新的提交:

![在这里插入图片描述](E:\typora\homework\img\git\9.png)



当master和feature1分支下都各有修改且不同并提交，Git无法执行“快速合并”，只能试图把各自的修改合并起来，但这种合并就可能会有冲突。

```sh
$ git merge feature1

Auto-merging readme.txt
CONFLICT (content): Merge conflict in readme.txt
Automatic merge failed; fix conflicts and then commit the resul
```

果然冲突了！Git告诉我们，`readme.txt`文件存在冲突，必须手动解决冲突后再提交。`git status`也可以告诉我们冲突的文件：

可以通过`git status`查看冲突文件:

```sh
$ git status

On branch master
You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)
        both modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

存在冲突，必须手动解决冲突后再提交
打开`readme.txt`冲突文件，会有`<<<<<<<`，`=======`，`>>>>>>>`标记出不同分支的内容

![image-20230202203018149](E:\typora\homework\img\git\image-20230202203018149.png)

修改后再提交即可

```sh
$ git add readme.txt

#xiaoming@DESKTOP-M4BQM23 MINGW64 ~/Desktop/git (master|MERGING)

$ git commit -m "解决冲突后的提交"

#[master 65647a2] 解决冲突后的提交
```

现在，`master`分支和`feature1`分支变成了下图所示：

![image-20230202203629194](E:\typora\homework\img\git\image-20230202203629194.png)

用带参数的`git log`也可以看到分支的合并情况

```sh
git log --graph --pretty=oneline --abbrev-commit
```

![image-20230202203748526](E:\typora\homework\img\git\image-20230202203748526.png)

最后，删除`feature1`分支：

```sh
$ git branch -d feature1

Deleted branch feature1 (was 14096d0).
```

##### 小结

当Git无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成。

解决冲突就是把Git合并失败的文件手动编辑为我们希望的内容，再提交。

用`git log --graph`命令可以看到分支合并图。



#### 6.3 分支管理策略

通常，合并分支时，如果可能，Git会用`Fast forward`模式，但这种模式下，删除分支后，会丢掉分支信息。

如果要强制禁用`Fast forward`模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息。

下面我们实战一下`--no-ff`方式的`git merge`：

```sh
#首先，仍然创建并切换`dev`分支：
$ git switch -c dev
Switched to a new branch 'dev'

# 修改readme.txt文件，并提交一个新的commit：
$ git add readme.txt 
$ git commit -m "最近的提交"

[master 622ca01] 最近的提交
 1 file changed, 1 insertion(+)

#现在，我们切换回master：
$ git switch master
Switched to branch 'master'
```

准备合并`dev`分支，请注意`--no-ff`参数，表示禁用`Fast forward`：

```sh
git merge --no-ff -m "merge with no-ff" dev
```

`--no-ff`参数，表示禁用`Fast forward`
`-m`参数，把commit描述写进去

不使用`Fast forward`模式，merge后就像这样
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210404222851514.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTUxODI1Mw==,size_16,color_FFFFFF,t_70)

##### 分支策略

在实际开发中，我们应该按照几个基本原则进行分支管理：

首先，master分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；

那在哪干活呢？干活都在dev分支上，也就是说，dev分支是不稳定的，到某个时候，比如1.0版本发布时，再把dev分支合并到master上，在master分支发布1.0版本；

你和你的小伙伴们每个人都在dev分支上干活，每个人都有自己的分支，时不时地往dev分支上合并就可以了。

所以，团队合作的分支看起来就像这样：

![在这里插入图片描述](E:\typora\homework\img\git\2021040422301221.png)

合并分支时，加上`--no-ff`参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而`fast forward`合并就看不出来曾经做过合并



##### 小结

Git分支十分强大，在团队开发中应该充分应用。

合并分支时，加上`--no-ff`参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而`fast forward`合并就看不出来曾经做过合并。





#### 6.4 Bug分支

开发中，bug若家常便饭，每一个bug都可以通过一个新的临时分支来修复，修复后再合并分支，然后删除临时分支

**1、`git stash` 保存现场**
但如果此时你正在进行的工作还没有提交，可以通过`git stash`来把当前工作现场“储藏”起来，等以后恢复现场继续工作
保存现场后，`git status`查看工作区，是干净的

**2、创建临时分支**

接下来，确定在哪个分支上修复bug，就切换到哪个分支上创建临时分支

假定需要在`master`分支上修复，就从`master`创建临时分支：

```sh
$ git switch master
Switched to branch 'master'

$ git checkout -b issue-101
Switched to a new branch 'issue-101'

#现在修复bug，需要把“大麦咬”改为“压脉带”，然后提交：
$ git add readme.txt

$ git commit -m "修改压脉带"

#[issue-101 31c8305] 修改压脉带
# 1 file changed, 1 insertion(+), 1 deletion(-)



```

**3、修复完成后**
切换回原分支，完成合并，之后删除临时分支

```sh
$ git switch master
#Switched to branch 'master'

$ git merge issue-101
#Updating f89690d..31c8305
#Fast-forward
# readme.txt | 2 +-
# 1 file changed, 1 insertion(+), 1 deletion(-)
```



**4、恢复工作现场**
查看保存的工作现场`git stash list`

```sh
$ git stash list

stash@{0}: WIP on dev: 94082ed 合并
```

恢复方法有二
**方法一：**`git stash apply`恢复，但恢复后stash内容并不删除，用`git stash drop`来删除

**方法二：**`git stash pop`，恢复同时删除

你可以多次stash，恢复的时候，先用`git stash list`查看，然后恢复指定的stash，用命令：
`git stash apply stash@{0}`

![image-20230202211716797](E:\typora\homework\img\git\image-20230202211716797.png)

再用`git stash list`查看，就看不到任何stash内容了：



**5、`cherry-pick`**
假设在主分支上修复bug，但dev分支是早期从主分支上分出来的，所以也存在bug
可以通过`cherry-pick`命令去复制某个特定的提交到当前分支，而不需要去重复操作修改一次

`git cherry-pick <commit>`
`<commit>`是修复bug所做的提交的commit

另外也可以在dev分支上做修复而不去创建临时分支，然后再在主分支上“重放”



##### 小结

修复bug时，我们会通过创建新的bug分支进行修复，然后合并，最后删除；

当手头工作没有完成时，先把工作现场`git stash`一下，然后去修复bug，修复后，再`git stash pop`，回到工作现场；

在master分支上修复的bug，想要合并到当前dev分支，可以用`git cherry-pick <commit>`命令，把bug提交的修改“复制”到当前分支，避免重复劳动。



#### 6.5 Feature分支

软件开发中，总有无穷无尽的新的功能要不断添加进来。

添加一个新功能时，你肯定不希望因为一些实验性质的代码，把主分支搞乱了，所以，每添加一个新功能，最好新建一个feature分支，在上面开发，完成后，合并，最后，删除该feature分支。

当合并前突然要销毁所有所做的，`git branch -d feature`是销毁不了的，必须使用
`git branch -D feature`
强行删除



#### 6.6 多人协作

当你从远程仓库克隆时，实际上Git自动把本地的`master`分支和远程的`master`分支对应起来了，并且，远程仓库的默认名称是`origin`。

查看远程库信息`git remote`

```sh
$ git remote

origin
```

更详细信息`git remote -v`

```js
$ git remote -v
origin  git@github.com:a951273629/git.git (fetch)
origin  git@github.com:a951273629/git.git (push)
```

(fetch)可抓取，(push)可推送

##### **1、推送分支**

将本地提交推送到远程库，推送时要指定本地分支

```sh
git push origin master
```

推送其他分支的话，修改master为其他分支名。比如`dev`，就改成：

```sh
$ git push origin dev
```

- `master`分支是主分支，因此要时刻与远程同步；
- `dev`分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；
- `bug`分支只用于在本地修复bug，就没必要推到远程了，除非老板要看看你每周到底修复了几个bug；
- `feature`分支是否推到远程，取决于你是否和你的小伙伴合作在上面开发。

##### **2、抓取分支**

多人协作时，大家都会往`master`和`dev`分支上推送各自的修改。

现在，模拟一个你的小伙伴，可以在另一台电脑（注意要把SSH Key添加到GitHub）或者同一台电脑的另一个目录下克隆：

```sh
$ git clone git@github.com:michaelliao/learngit.git

Cloning into 'learngit'...
remote: Counting objects: 40, done.
remote: Compressing objects: 100% (21/21), done.
remote: Total 40 (delta 14), reused 40 (delta 14), pack-reused 0
Receiving objects: 100% (40/40), done.
Resolving deltas: 100% (14/14), done.
```

当你的小伙伴从远程库clone时，默认情况下，你的小伙伴只能看到本地的`master`分支。不信可以用`git branch`命令看看：

```sh
$ git branch
* master
```

当其他小伙伴clone远程库时，默认情况下只能看到`master`分支，若要在`dev`分支上开发，就要创建远程`origin`的`dev`分支到本地

```sh
git checkout -b dev origin/dev
```

1. 在`dev`上修改后，把`dev`分支`push`到远程

2. 此时你也对同样的文件作了修改，试图推送但失败。

3. 推送失败，因为你的小伙伴的最新提交和你试图推送的提交有冲突，解决办法也很简单，Git已经提示我们，先用`git pull`把最新的提交从`origin/dev`抓下来，然后，在本地合并，解决冲突，再推送：

4. `git pull`也失败了，原因是没有指定本地`dev`分支与远程`origin/dev`分支的链接，根据提示，设置`dev`和`origin/dev`的链接

5. 设置`dev`和`origin/dev`的链接

```sh
git branch --set-upstream-to=origin/dev dev
```

设置后在`git pull`就可以了

然后手动解决冲突，提交，`push`

##### **3、多人协作的工作模式通常是这样：**

1. 首先，可以试图用`git push origin <branch-name>`推送自己的修改；
2. 如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并；
3. 如果合并有冲突，则解决冲突，并在本地提交；
4. 没有冲突或者解决掉冲突后，再用`git push origin <branch-name>`推送就能成功！

如果`git pull`提示`no tracking information`，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream-to <branch-name> origin/<branch-name>`。

这就是多人协作的工作模式，一旦熟悉了，就非常简单。

##### 小结

- 查看远程库信息，使用`git remote -v`；
- 本地新建的分支如果不推送到远程，对其他人就是不可见的；
- 从本地推送分支，使用`git push origin branch-name`，如果推送失败，先用`git pull`抓取远程的新提交；
- 在本地创建和远程分支对应的分支，使用`git checkout -b branch-name origin/branch-name`，本地和远程分支的名称最好一致；
- 建立本地分支和远程分支的关联，先使用`git pull`把最新提交拉取下来。使用`git branch --set-upstream-to=origin/dev dev`；
- 从远程抓取分支，使用`git pull`，如果有冲突，要先处理冲突。

#### 6.7 Rebase

在上一节我们看到了，多人在同一个分支上协作时，很容易出现冲突。即使没有冲突，后push的童鞋不得不先pull，在本地合并，然后才能push成功。

每次合并再push后，分支变成了这样：

![image-20230202220218381](E:\typora\homework\img\git\image-20230202220218381.png)

多人协作下，Git的提交历史将不是条干净的直线，对我们查看历史提交的变化带来麻烦，因为分叉的提交需要多方对比

```
git rebase

操作可以把本地未push的分叉提交历史整理成直线
```

缺点是本地的分叉提交已经被修改过了



### 7. 标签管理

发布一个版本时，通常先在版本库打一个标签（tag）来唯一确定打标签时刻的版本。
将来需要取某个标签版本时可将打标签时刻的历史版本取出来。相当于版本库的一个快照。

标签是指向某个commit的指针（跟分支很像，但是分支可以移动，标签不能移动）
创建和删除标签都是瞬间完成的

**Git有commit，为什么还要引入tag？**

“请把上周一的那个版本打包发布，commit号是6a5819e...”

“一串乱七八糟的数字不好找！”

如果换一个办法：

“请把上周一的那个版本打包发布，版本号是v1.2”

“好的，按照tag v1.2查找commit就行！”

所以，tag就是一个让人容易记住的有意义的名字，它跟某个commit绑在一起。

#### 7.1 创建标签

**1、切换到打标签的分支**
**2、打标签**

```sh
git tag v1.0
```

`v1.0`为标签

`git tag`查看所有标签

标签默认打在最新提交的commit上
若要打在历史commit上
先 找到历史提交的commit id，然后打上就可以了：

```sh
git log --pretty=oneline --abbrev-commit
```

查看历史提交的commit id

然后

```sh
git tag v0.9 <commit id>
```

创建带有说明的标签，用`-a`指定标签名，`-m`指定说明文字

```sh
git tag -a v0.1 -m "version 0.1 released" <commit id>
```

**3、查看标签信息**
标签不是按时间顺序列出，而是按字母排序的。可以用`git show <tagname>`查看标签信息

![image-20230203100342080](E:\typora\homework\img\git\image-20230203100342080.png)

##### 小结

- 命令`git tag <tagname>`用于新建一个标签，默认为`HEAD`，也可以指定一个commit id；
- 命令`git tag -a <tagname> -m "blablabla..."`可以指定标签信息；
- 命令`git tag`可以查看所有标签。

#### 7.2 操作标签

**1、删除标签**
`git tag -d v0.1`

```sh
$ git tag -d v1.0
Deleted tag 'v1.0' (was 94082ed)
```

**2、推送标签到远程**
创建的标签只存储在本地，不会自动推送到远程
`git push origin <tagname>`

![image-20230203101851323](E:\typora\homework\img\git\image-20230203101851323.png)

一次性推送全部尚未推送到远程的本地标签
`git push origin --tags`

![image-20230203101921181](E:\typora\homework\img\git\image-20230203101921181.png)

**3、删除远程标签**
先删除本地标签

```sh
$ git tag -d v0.9
```

然后。 从远程删除。删除命令也是push，但是格式如下：
`git push origin :refs/tags/v0.1`

```sh
$ git push origin :refs/tags/v0.9

To github.com:a951273629/git.git
 - [deleted]         v0.9
```

登陆GitHub查看是否删除

##### 小结

- 命令`git push origin <tagname>`可以推送一个本地标签；
- 命令`git push origin --tags`可以推送全部未推送过的本地标签；
- 命令`git tag -d <tagname>`可以删除一个本地标签；
- 命令`git push origin :refs/tags/<tagname>`可以删除一个远程标签。

### 8. 使用Github

GitHub作为免费的远程仓库，如果是个人的开源项目，放到GitHub上是完全没有问题的。GitHub还是一个开源协作社区，通过GitHub，既可以让别人参与你的开源项目，也可以参与别人的开源项目。

参与一个开源项目，在项目主页点“Fork”就可以clone到自己账号，然后从自己的账号下clone到本地，这样才能推送修改。

如何参与一个开源项目呢？比如人气极高的bootstrap项目，这是一个非常强大的CSS框架，你可以访问它的项目主页https://github.com/twbs/bootstrap，点“Fork”就在自己的账号下克隆了一个bootstrap仓库，然后，从自己的账号下clone：

```sh
git clone git@github.com:michaelliao/bootstrap.git
```

开始本地添加一个文件并且提交推送

```sh
git add learn.txt

git commit -m "一次学习提交"

#如果第一次推送到远程要添加-u 让本地分支和远端分支关联
git push -u origin master
```

如果直接从他人仓库克隆下来，由于没有权限，是推送不成功的。

修改项目后推送到自己仓库，然后发起pull request，看对方是否接受你的修改

![image-20230203103604097](E:\typora\homework\img\git\image-20230203103604097.png)

##### 小结

- 在GitHub上，可以任意Fork开源仓库；
- 自己拥有Fork后的仓库的读写权限；
- 可以推送pull request给官方仓库来贡献代码。





### 10. 自定义Git

除了配置`user.name`和`user.email`，Git还有许多配置项

如让Git显示颜色
`git config --global color.ui true`

#### 10.1 忽略特殊文件

有时需要把某些文件放到Git工作目录下，但又不能提交，比如数据库密码的配置等等。在每次`git status`都会显示`Untracked files ...`

可以在Git工作区的根目录下创建一个特殊的`.gitignore`文件，然后把要忽略的文件名填进去，Git就会自动忽略这些文件

不需要从头写`.gitignore`文件，GitHub已经为我们准备了各种配置文件，只需要组合一下就可以使用了。所有配置文件可以直接在线浏览：https://github.com/github/gitignore

忽略文件的原则是：

忽略操作系统自动生成的文件，比如缩略图等；
忽略编译生成的中间文件、可执行文件等，也就是如果一个文件是通过另一个文件自动生成的，那自动生成的文件就没必要放进版本库，比如Java编译产生的.class文件；
忽略你自己的带有敏感信息的配置文件，比如存放口令的配置文件。

1、创建.gitignore文件
2、添加隐藏的文件名
如

```
# Windows:
Thumbs.db
ehthumbs.db
Desktop.ini

# Python:
*.py[cod]
*.so
*.egg
*.egg-info
dist
build

# My configurations:
db.ini
deploy_key_rsa
12345678910111213141516
```

`#`注释

被忽略的文件想添加到GIt
`git add -f file`
强制添加

3、例外规则

```
# 排除所有.开头的隐藏文件:
.*
# 排除所有.class文件:
*.class

# 不排除.gitignore和App.class:
!.gitignore
!App.class
12345678
```

4、添加`.gitignore`到版本库
当有`.*`规则时要添加`!.gitignore`
`.gitignore`文件本身要放到版本库里，并且可以对`.gitignore`做版本管理！

5、检查规则
`git check-ignore`

如

```sh
$ git check-ignore -v App.class

.gitignore:3:*.class	App.class
```

`.gitignore`的第3行规则忽略了该文件

#### 10.2 配置别名

`git config --global alias.st status`
将`status`用`st`代替

```
co` `checkout`
`ci` `commit`
`br` `branch`
`unstage` `'reset HEAD'`
`last` `'log -1'`
`lg` `"log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

每个仓库的Git配置文件都放在.git/config文件中

```
[core]
    repositoryformatversion = 0
    filemode = true
    bare = false
    logallrefupdates = true
    ignorecase = true
    precomposeunicode = true
[remote "origin"]
    url = git@github.com:michaelliao/learngit.git
    fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
    remote = origin
    merge = refs/heads/master
[alias]
    last = log -1
123456789101112131415
```

别名就在`[alias]`后面，要删除别名，直接把对应的行删掉即可

当前用户的Git配置文件放在用户主目录下的一个隐藏文件`.gitconfig`中

```
[alias]
    co = checkout
    ci = commit
    br = branch
    st = status
[user]
    name = Your Name
    email = your@email.com
12345678
```

## 10.3 搭建Git服务器

GitHub就是一个免费托管开源代码的远程仓库。但是对于某些视源代码如生命的商业公司来说，既不想公开源代码，又舍不得给GitHub交保护费，那就只能自己搭建一台Git服务器作为私有仓库使用。

搭建Git服务器需要准备一台运行Linux的机器，强烈推荐用Ubuntu或Debian，这样，通过几条简单的`apt`命令就可以完成安装。

1、安装git

```
sudo apt-get install git
1
```

2、创建git用户，来运行git服务

```
sudo adduser git
```

3、创建证书登陆
收集所有需要登录的用户的公钥，就是他们自己的`id_rsa.pub`文件，把所有公钥导入到`/home/git/.ssh/authorized_keys`文件里，一行一个。

4、初始化Git仓库
先选定一个目录为Git仓库，假定是`/srv/sample.git`，在`/srv`目录下输入命令

```
sudo git init --bare sample.git
```

Git就会创建一个裸仓库，裸仓库没有工作区，因为服务器上的Git仓库纯粹是为了共享，所以不让用户直接登录到服务器上去改工作区，并且服务器上的Git仓库通常都以`.git`结尾。然后，把owner改为`git`

```
sudo chown -R git:git sample.git
```

5、禁用shell登陆
出于安全考虑，第二步创建的git用户不允许登录shell，这可以通过编辑/etc/passwd文件完成。找到类似下面的一行

```
git:x:1001:1001:,,,:/home/git:/bin/bash
```

改为

```
git:x:1001:1001:,,,:/home/git:/usr/bin/git-shell
```

这样，`git`用户可以正常通过ssh使用git，但无法登录shell，因为我们为git用户指定的`git-shell`每次一登录就自动退出

6、克隆远程仓库

```
$ git clone git@server:/srv/sample.git
Cloning into 'sample'...
warning: You appear to have cloned an empty repository.
```

**管理公钥**
如果团队很小，把每个人的公钥收集起来放到服务器的/home/git/.ssh/authorized_keys文件里就是可行的。如果团队有几百号人，就没法这么玩了，这时，可以用[Gitosis](https://github.com/res0nat0https://github.com/sitaramc/gitoliter/gitosis)来管理公钥。

**管理权限**
有很多不但视源代码如生命，而且视员工为窃贼的公司，会在版本控制系统里设置一套完善的权限控制，每个人是否有读写权限会精确到每个分支甚至每个目录下。因为Git是为Linux源代码托管而开发的，所以Git也继承了开源社区的精神，不支持权限控制。不过，因为Git支持钩子（hook），所以，可以在服务器端编写一系列脚本来控制提交等操作，达到权限控制的目的。[Gitolite](https://github.com/sitaramc/gitolite)就是这个工具