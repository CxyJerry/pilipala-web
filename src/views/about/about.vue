<script setup>
import TreeSelector from "@/components/tree-selector.vue";
import PPlayerController from "@/views/player/components/p-player-controller.vue";

</script>

<template>
  <div style="resize: horizontal;height: 100px;background: red;width: 50px;overflow: hidden;max-width: 100%"></div>
  <p-player-controller :duration="100" :cur_video_play_time="20" :buffered="{end:(time)=>{return 100}}"/>
</template>

<style lang="less" scoped>
@import "@/style/index.less";
</style>