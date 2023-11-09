<script>
import {theme_color} from "@/style";

export default {
  props: {
    'color-from': {
      type: String,
      default: '#ababab'
    },
    'color-to': {
      type: String,
      default: theme_color
    },

  },

}

</script>

<template>
  <div class="opera">
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
@import "@/style/index.less";
.opera {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border: 1px #d7d7d7 solid;
  border-radius: 9999px;
  height: 35px;
  width: 35px;
  margin: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  background-color: rgba(246, 245, 245, 0.59);
}

@keyframes jump {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.opera:hover {
  animation: jump 0.5s ease;
  fill: @theme-color;
  border: @theme-color 1px solid;
  cursor: pointer;
}
</style>