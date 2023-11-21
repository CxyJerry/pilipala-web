<script setup>

</script>

<template>
  <!--   footer   -->
  <div class="footer">
    <div class="footer-container">
      <div>
        <span>pilipala 感谢您的使用</span>
      </div>
      <div class="filling">
        <span>©2023 pilipala.cloud 版权所有</span>
        <span><a href="https://beian.miit.gov.cn" target="_blank">ICP证: 闽ICP备2023021082号</a></span>
        <span>代理域名注册服务机构：烟台帝思普</span>
        <br/>
      </div>
    </div>

  </div>
</template>

<style lang="less" scoped>
@import "@/style/index.less";

.footer {
  width: 100%;
  background: @theme-color;
  height: 5vh;
  justify-content: center;
  align-items: center;
  display: flex;
  color: white;
  bottom: 0;
  position: relative;
  flex-direction: column;
}

.footer-container {
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.filling > span {
  margin: 5px;
  font-size: small;
}

a {
  color: white;
}

a:hover {
  text-decoration: underline;
}
</style>