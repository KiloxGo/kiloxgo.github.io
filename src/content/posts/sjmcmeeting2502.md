---
title: SJMC社团大会2502经验反思
published: 2025-02-06
description: 'Good Experience'
image: ''
tags: [Reflection]
category: 'Reflection'
draft: false 
lang: 'zh_CN'
---

## 1.Ctrl C+V
部长会给你分配上一次社团大会的服务器和这一次社团大会的实例，这样我们就可以轻松愉快的~~在服务端文件的史山上继续拉屎了~~继承前人的工作而减轻工作量了，将上一次的服务端文件压缩打包下载上传到另一个服务端实例文根目录中<sub>~~会不会有一位愿意为技术部温暖大家庭健康工作50年的小登走过来说：前辈!你的服务端文件有点华丽，我来帮你重构简化一下吧~~</sub>

## 2.删除World文件夹，然后用投影模组截地图
勤劳的建筑部师傅会连夜将服务器需要的地图准备好，一般会是SMP2这个玩家非常活跃的服务器(日在线人数不时能突破零)中的一个地标，没有SMP2权限记得找部长要，至于投影模组的使用可以参照这个教程视频：

<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=566650844&bvid=BV1qv4y1472R&cid=1004274913&p=1" scrolling="no" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>

1. 截地图：地图截的很大的话要四处走动加载区块
2. 建个超平坦世界
3. 把投影文件投上去(这个时候我的R9000P停止思考了一会)
4. 提取这个world的文件
5. 传到服务端替代原有的服务器世界
6. 进服务器设置好重生点
```txt
/setworldspawn
```

### 2.5 敲敲策划玻璃，哦内盖，如果没有大会需求的话，瓦塔西，wwwwwwwwww

## 3.添加/删除需求的插件

这次删除了Meeting2409中的[`plugins/charter-1.0-SNAPSHOT.jar`点击下载](https://wwvg.lanzoub.com/iXNUe2mumz3a)，因为没有进入游戏给予玩家一本社团章程的需求，后人干了什么事记得在文档里写一写，尽量详细<sub>还有大家拖进服务端的ZIP解压完其实可以删掉的</sub>

## 4.PPT播放的配置(一般会有这个需求)

<details>
<summary>大致原理</summary> 
通过minecraft:item_display生成一个展示实体，然后结合资源包中的图片，通过<em>CustomModelData</em>来指定自定义的模型纹理，通过模型纹理来展示PPT图片，利用指令来切换
</details>

### 4.5 你先别急，策划还在摇人

> 宣傳部花了五年寫一個PPT，剛出版，講到很多跟我無關又完全正確的事情。大多讚美我的做人原則，無非想多打一會兒遊戲！我宣布這個部門永遠是MC社的部門 <br>
>發自我的手機

技术部负责人一般不需要负责PPT的制作，可以拿上一次的PPT测试一下,测试可以本地测试把包放在.minecraft/resourcepacks里面<br><br>
大会建筑中会有一个大讲台,如下(Height:29 blocks;Width: 16 blocks)

<div>
<img src='/clubmeeting/pad.png' >
</div>

#### PPT处理(使用的是16:9)

转化成图片，操作如下

#### 资源包配置(只提要改的地方)
1. `assets\minecraft\models\item\barrier.json`
<div>
<img src='/clubmeeting/barriermodify.png' >
</div>

2. `assets\slide\models\item\slide_01.json`
增减slide_n.json的数量并修改编号

3. `assets\slide\textures\item\slide_01.png`
把PPT图片重新命名为slide_n.png丢进这个路径,注意会区分后缀大小写是png不是PNG

#### 数据包配置

1. `data\slide\functions\next_page.mcfunction`
```txt
execute if score ppt slide matches 18.. run scoreboard players set ppt slide 1
execute if score ppt image matches 250218.. run scoreboard players set ppt image 250201
```
其中`18`、`250218`、`250201`可进行修改，逻辑是每当向后翻页到最后的页数编号+1时，回到第一页，以实现向后方向的循环

2. `data\slide\functions\previous_page.mcfunction`
```txt
execute if score ppt slide matches ..0 run scoreboard players set ppt slide 17
execute if score ppt image matches ..250200 run scoreboard players set ppt image 250217
```
同上，实现向前方向的循环

3. 其他照抄往年

#### 指令生成
1. 生成展示实体，可在MCSM控制台执行
```txt
/summon minecraft:item_display 231 -27 341 {item:
{id:"minecraft:barrier",Count:1b,tag:{CustomModelData:250201}},Tags:
["slide"]}
```
`232 -29 341`替换为展示实体生成的坐标<br>
`{CustomModelData:250201}`中`250201`替换为`assets\minecraft\models\item\barrier.json`中对应的值<br>
关于展示实体坐标，其位于PPT宽的中线上,而且生成在墙面内才能贴合墙面
<div>
<img src='/clubmeeting/pptposition1.png' >
</div>

2. 缩放展示实体,调整至合适大小
```txt
/data modify entity @e[tag=slide,limit=1,sort=nearest] transformation.scale
set value [28.5f,28.5f,28.5f]
```
`[28.5f,28.5f,28.5f]`中`28.5f`为缩放倍数

3. 调整展示实体位置
4. 调整展示实体朝向(如果需要的话)<br>
Facing west其他朝向问AI
```txt
/data modify entity @e[tag=slide,limit=1,sort=nearest] transformation.right_rotation set value [0.0f, 0.7071f, 0.0f, 0.7071f]
```

<div>
<img src='/clubmeeting/pptresult.png' >
</div>

5. 设置计分板
```txt
/scoreboard objectives add slide dummy "Slide"
/scoreboard objectives add image dummy "Image"
/scoreboard players set ppt slide 1
/scoreboard players set ppt image 250201
/scoreboard objectives setdisplay sidebar slide
```
编号看着资源包里的改

6. 修改告示牌，设置点击事件
```txt
/data merge block -727 65 11208 {front_text:{messages:
['{"text":"=========="}','{"text":"Page","clickEvent":
{"action":"run_command","value":"/function
slide:previous_page"}}','{"text":"Up"}','{"text":"=========="}']},back_text:
{messages:['{"text":""}','{"text":""}','{"text":""}','{"text":""}']}}
```
将`223, -43, 342`的告示牌修改，调用`/functionslide:previous_page`

```txt
/data merge block -727 65 11206 {front_text:{messages:
['{"text":"=========="}','{"text":"Page","clickEvent":
{"action":"run_command","value":"/function slide:next_page"}}','{"text":"
Down"}','{"text":"=========="}']},back_text:{messages:
['{"text":""}','{"text":""}','{"text":""}','{"text":""}']}}
```
与上同理
<div>
<img src='/clubmeeting/signclick.png' >
</div>
<hr>

## 0215计划有变，版本从以往的1.20.1变为1.21.3，开始基础的搭建服务器教程

During the painful process,what problems had i solved?

1. 指令数据包没有生效（不是哥们），请教了伟大的Kimi老师后我发现1.21.3服务端文件中的datapack中的function文件夹名是没有s的！

2. 原本的资源包为甚么说版本不兼容！怎么办，只有改pack.mcmeta！搜索发现1.21.3对应的"pack_format"为42！哈哈哈有救了！（其实不改也没大问题

3. 卧槽为甚么面板输指令报错？！对指令长达60秒的排错后发现控制台输指令不能带/，WOWWWW，终于能summon出PPT了

4. Input:

```
summon minecraft:item_display -718 80 11207 {item:{id:"minecraft:barrier",Count:1b,tag:{CustomModelData:250201}},Tags:["slide"]}
```

让我们看看PPT如何诞生的吧，艹，怎么纹理是个红红的禁止符号，我也变得红红的，这时modist大大挺身而出，挽大厦于将倾，tell me是高版本的问题，很快啊，我马上改用

```
summon minecraft:item_display -718 80 11207 {item: {id: "minecraft:barrier", count: 1, components: {"minecraft:custom_model_data": 250201}}, Tags:["slide"]}
```

那很好了，PPT纹理出来了

5. `“オラオラオラオラ！”`(疯狂戳换页告示牌)，怎么没动静，`『The World』!`绝对是时停！不可能有错的！看了看summon指令发现是对象属性变了，得改数据包指令

```
execute store result entity @e[tag=slide,limit=1,sort=nearest] item.tag.CustomModelData int 1 run scoreboard players get ppt image
```

↓

```
execute store result entity @e[tag=slide,limit=1,sort=nearest] item.components.minecraft:custom_model_data int 1 run scoreboard players get ppt image
```

ok搞定，`“やれやれだぜ…”`

### 添加小游戏数据包的过程

此次大会较为特殊，使用SMP2原汁原味的地图加上小游戏数据包的玩法，并以社团大会为先导。<br>

1. 提取小游戏数据包文件（如果小游戏自带地图），数据包在`版本名\datapacks`
2. 打包上传到服务端上面，可能会有Bug等不兼容的情况发生，这时要仔细阅读数据包中的指令，尝试理解每个mcfunction的功能
 - 如`gen_entities.mcfunction`，直接生成了小游戏原来的交互实体
 - `find_playzone.mcfunction:line19~29`我的理解是将玩家分布的范围大小
 - `coords.mcfunction`删除line-12,直接删除了坐标显示的部分≈修复兼容BUG

### 颁奖大会Special:添加领奖时的粒子效果

使用指令如下

```
summon
```

## 整合包的配置

1. 整合包可以整个版本游戏打包，应该照顾各种人群考虑周到，至少包含以下：`自带启动器PCL或HMCL`、`JDK`（HMCL中可以填包里的相对路径）、`SJMC皮肤站验证`、`游戏内大会服务器列表`、`资源包`、`默认选中资源包`
2. 打包前记得删除自己皮肤站验证的账户

## 服务端

1. 上传资源包，开启强制启用资源包
2. 相关的服务器抗压测试

## 致谢
- 感谢部长Day酱的指导❤
- 感谢modist佬在PPT指令方面的指导
- 感谢stya老师在小游戏方面的指导
- 感谢Wouffengard在搭建过程中的帮助
- 感谢XOTaiChi制作的PPT
- 感谢咖啡协助测试服务器并提出意见<br>
这个世界对笨蛋的包容度还挺高的XWX,相关文件可以找我索要

## 输入一个6位数字查询我的精神状态

<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        .hidden-view {
            display: none;
            margin-top: 20px;
            padding: 10px;
        }
        .shitgame {
            width: 100%;
            height: 100%;
        }
    </style>
</head>
<body>
    <div>
        <input type="text" id="numberInput" placeholder="请输入数字">
        <button class="mybutton" onclick="checkNumber()">Submit</button>
    </div>
    <div id="hiddenView" class="hidden-view">
    <img class="shitgame" src='/clubmeeting/psc.png' >
    </div>
    <script>
        const presetNumber = 114514;
        function checkNumber() {
            const inputNumber = document.getElementById('numberInput').value;
            const hiddenView = document.getElementById('hiddenView');
            if (parseInt(inputNumber) === presetNumber) {
                hiddenView.style.display = 'block';
            } else {
                hiddenView.style.display = 'none';
                alert('输入的数字不正确，请重试！');
            }
        }
    </script>
</body>
</html>