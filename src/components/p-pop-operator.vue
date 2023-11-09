<script>
export default {
  name: "pop-options",
  props: {},
  data() {
    return {
      show: false,
      close_timeout_id: 0,
      in_operation: false,
    }
  },
  methods: {
    close_pop_operation() {
      this.close_timeout_id = setTimeout(() => {
        if (!this.in_operation) {
          this.show = false
          this.in_operation = false
        } else {
          clearTimeout(this.close_timeout_id)
        }
      }, 100)
    }
  }
}
</script>

<template>
  <div class="option-container">
    <div @mouseover="show=true"
         @mouseout="close_pop_operation"
         class="options-div">
      <slot name="value"/>
    </div>
    <div class="options" v-if="show"
         @mouseover="in_operation=true"
         @mouseout="in_operation=false;close_pop_operation()">
      <slot name="content"/>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/style/index.less";

.option-container {
  height: 100%;
  position: relative;
  font-size: small;
  overflow: visible;
  padding-left: 10px;
  padding-right: 10px;
}

.option-container:hover {
  cursor: pointer;
}

.options {
  position: absolute;
  bottom: 20%;
  left: -20%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}


</style>