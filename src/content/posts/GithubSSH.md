---
title: GithubSSH配置连接(防遗忘)
published: 2025-01-17
description: 'GithubSSH'
image: ''
tags: [Reflection]
category: 'Reflection'
draft: false 
lang: 'zh_CN'
---

> 防止日后我把电脑数据洗了忘了怎么配置

# 1. 生成新的ssh密钥

打开Gitbash输入以下代码

```shell
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

# 2.把SSH密钥添加到ssh-agent

先查看SSH是否正常运行

```shell
eval
ssh-agent -s
```

添加SSH到账户

```shell
ssh-agent bash
ssh-add ~/.ssh/id_rsa
```

# 3.把密钥添加到Github账户

查看并复制公钥

```shell
cat ~/.ssh/id_rsa.pub
```

ssh-rsa开头，邮箱结尾的一大串<br>
添加到Github Settings里面即可
