<p align="center">
<a href="" target="_blank">
    <img src="assets/images/icon.png" width="300" alt="">
</a>
</p>

<h1 align="center">Pilipala</h1>
<p align="center">
<span><strong>噼里啪啦视频弹幕网</strong></span><br/>
</p>
<div align="center">
    <a href="https://github.com/CxyJerry/pilipala"><img alt="后端" src="https://img.shields.io/badge/github-%E5%90%8E%E7%AB%AF-red"></a> 
    <a href="https://github.com/CxyJerry/pilipala-web"><img alt="前端" src="https://img.shields.io/badge/github-%E5%89%8D%E7%AB%AF-red"></a>
    <a href="https://github.com/CxyJerry/pilipala/blob/master/LICENSE" target="_blank">
        <img alt="开源协议" src="https://img.shields.io/badge/%E5%BC%80%E6%BA%90%E5%8D%8F%E8%AE%AE-GPL-blue">
    </a>
    <a href="https://github.com/CxyJerry/pilipala-web/actions/workflows/docker-image.yml"><img src="https://github.com/CxyJerry/pilipala-web/actions/workflows/docker-image.yml/badge.svg"></a>
   <a href="https://pilipala.cloud">
      <img alt="Static Badge" src="https://img.shields.io/badge/%E4%BD%93%E9%AA%8C-%E9%93%BE%E6%8E%A5-gold">
   </a>
</div>

## 项目介绍

噼里啪啦视频弹幕网是一个专注于做视频点播的前端Web项目，通过对 [Dplayer](https://github.com/DIYgod/DPlayer) 的魔改，
集成 [dash.js](https://github.com/Dash-Industry-Forum/dash.js) 实现 Dash 视频播放。本项目持续更新中！

## 体验地址

#### <a href="https://pilipala.cloud">https://pilipala.cloud</a>


## 环境搭建

### 开发环境

1. npm 导入依赖

```
npm install
```

2. npm 运行服务

```
npm run serve
```

### 测试环境

1. 构建镜像

   `docker build . -t pilipala-web`

2. 运行镜像

   `docker run -p 80:8888 pilipala-web`

### 加入社群

<img src="assets/images/qrcode.png" alt="" style="zoom:50%;" />