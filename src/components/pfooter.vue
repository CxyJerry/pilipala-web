<script setup>

import router from "@/router";
</script>

<template>
  <!--   footer   -->
  <div class="footer">
    <div class="footer-container">
      <div class="filling">
        <span class="item" @click="">
          <Poptip title="" placement="top" trigger="hover">
            <template #content>
              <img style="width: 300px" src="@/assets/qrcode.png" alt="">
            </template>
            加入我们
          </Poptip>
        </span>
        <span class="item">|</span>
        <span class="item" @click="router.push('/about')">
            关于我们
        </span>
        <span class="item">|</span>
        <span class="item">联系我们</span>
        <span class="item">|</span>
        <span class="item">隐私政策</span>
        <span class="item">|</span>
        <span class="item">用户协议</span>
        <span class="item">|</span>
        <span class="item">社区公约</span>
      </div>
      <!--   备案信息   -->
      <div>
        <div class="filling">
          <span>版权：©2023 pilipala.cloud 版权所有</span>
          <span><a href="https://beian.miit.gov.cn" target="_blank">ICP证: 闽ICP备2023021082号</a></span>
          <br/>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "@/style/index.less";

.footer {
  padding: 10px;
  width: 100%;
  background: @theme-color;
  justify-content: start;
  align-items: flex-start;
  display: flex;
  color: white;
  bottom: 0;
  position: relative;
  flex-direction: column;
}

.footer-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: @theme-color;
}

.filling {
  display: flex;
  flex-direction: row;
}

.filling > span {
  margin: 5px;
  font-size: small;
}

.filling > span:hover {
  margin: 5px;
  cursor: pointer;
  color: @theme-pink;
  font-size: small;
}

a {
  color: white;
}

a:hover {
  text-decoration: underline;
  color: @theme-pink;
}

.item {
  padding: 0 10px;
}
</style>