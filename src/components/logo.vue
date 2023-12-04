<script setup></script>

<template>
  <router-link to="/">
    <div class="logo">PiliPala</div>
  </router-link>
</template>

<style lang="less" scoped>
@import "@/style/index.less";

.logo {
  font-size: 36px;
  font-weight: 800;
  font-family: "Source Han Sans CN Regular", serif;
  color: #fff;
  border-radius: 10px;
  padding: 0 76px;
  min-height: 60px;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.logo:hover {
  cursor: pointer;
}
</style>
