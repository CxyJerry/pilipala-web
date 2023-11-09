<script setup></script>

<template>
  <router-link to="/">
    <div class="logo">PiliPala</div>
  </router-link>
</template>

<style lang="less" scoped>
@import "@/style/index.less";

.logo {
  font-size: 20px;
  font-family: "Source Han Sans CN Regular", serif;
  background: white;
  color: @theme-color;
  border-radius: 10px;
  padding: 0 5px;
}

.logo:hover {
  cursor: pointer;
}
</style>
