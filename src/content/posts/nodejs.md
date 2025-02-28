---
title: Nodejs&npm安装(已改用nvm)
published: 2025-01-17
description: 'Nodejs'
image: ''
tags: [Reflection]
category: 'Reflection'
draft: false 
lang: 'zh_CN'
---

# 1.前往官网下载

[点击跳转GET IT!](https://nodejs.org/en/about/previous-releases)

# 2.编辑环境变量

摁Windows键搜索编辑系统环境变量<br>

环境变量->系统变量的Path<br>

把你安装的目录路径塞进去

``` txt
H:\node-v18.20.5-win-x64\node-v18.20.5-win-x64
```

装完可以cmd输入测试一下

```txt
npm -v
```

# 3.在node-v18.20.5-win-x64文件夹新建global和cache文件夹以便管理

命名为node_global和node_cache<br>

cmd输入

```txt
npm config set prefix "node_global的路径"
npm config set cache "node_cache的路径"
```
再康康路径改对了没
```txt
npm config list
```
# 4.把node_global也丢进环境变量



