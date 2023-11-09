<script>
export default {
  name: "p-vod-label"
}
</script>

<template>
  <div class="container">
    #
    <slot/>
  </div>
</template>

<style scoped lang="less">
@import "@/style/index.less";

.container {
  border-radius: 10px;
  padding: 3px 5px;
  background: #aeaeae;
  white-space: nowrap;
  font-size: small;
  color: white;
  margin: 3px;
}

.container:hover {
  background: @theme-color;
  cursor: pointer;
}
</style>