<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <i-icon type="ios-bug" size="120" color="#fff"></i-icon>
      <h1>很抱歉，你访问的页面不存在</h1>
      <p>请返回首页或检查URL是否正确。</p>
      <router-link to="/" class="home-link">返回首页</router-link>
    </div>
  </div>
</template>

<script>
import {Button, Icon} from 'view-ui-plus';

export default {
  components: {
    'i-icon': Icon,
    'router-link': Button
  }
};
</script>

<style lang="less" scoped>
@import "@/style/index.less";

.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
}

.not-found-content {
  text-align: center;
  background-color: @theme-color;
  color: #ffffff;
  padding: 50px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

p {
  font-size: 16px;
  margin-bottom: 30px;
}

.home-link {
  background-color: #ffffff;
  color: @theme-color;
  border: 1px solid @theme-color;
}
</style>
