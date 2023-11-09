<script>

import {Tree} from "view-ui-plus";

export default {
  components: {Tree},
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      enable_tree: false,
      content: '',
      current_selected_node: null,
    }
  },
  methods: {
    show_tree() {
      this.enable_tree = !this.enable_tree
    },
    select_change(node, item) {
      if (item.children) {
        item.selected = false
        item.expand = !item.expand
      } else {
        this.content = item.title
        this.enable_tree = false
        this.$emit('on-selected', item)
      }
    },

  }
}

</script>

<template>
  <div class="container" @focusout="enable_tree=false">
    <div ref="input" @click="show_tree()">
      <div class="input">
        <div style="flex: 1">
          <div v-if="content">{{ content }}</div>
          <div style="color: #c7c7c7" v-else>请选择</div>
        </div>

        <div>
          <Icon v-if="!enable_tree" class="icon" type="ios-arrow-down"/>
          <Icon v-else class="icon" type="ios-arrow-up"/>
        </div>
      </div>
    </div>
    <div class="tree"
         :style="enable_tree?{display:'block',maxHeight:'200px'}:{display: 'none',maxHeight: 0}">
      <Tree @on-select-change="select_change" :data="data" select-node></Tree>
    </div>

  </div>

</template>

<style lang="less" scoped>
@import "@/style/index.less";
.container {
  position: relative;
  border-radius: 10px;
  min-width: 200px;
}

.input {
  outline: none;
  border: #e4e4e4 solid 1px;
  padding: 3px 8px;
  border-radius: 5px;
  line-height: 30px;
  display: flex;
  flex-direction: row;
}

.input:hover {
  border: @theme-color solid 1px;
  cursor: pointer;
}

.icon {
  transition: transform .5s ease;
}

.tree {
  margin-top: 5px;
  width: 100%;
  display: none;
  overflow-y: scroll;
  max-height: 0;
  transition: height .5s ease-out;
  position: absolute;
  z-index: 99;
  background: white;
  box-shadow: #eeeeee 0 0 0 1px;
  border: #e6e6e6 solid 1px;
  padding: 0 10px;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: #e6e6e6;
}

::-webkit-scrollbar-thumb {
  background: #c9c9c9;
  border-radius: 6px;
}

::-webkit-scrollbar-thumb:hover {
  background: #afafaf;
}
</style>