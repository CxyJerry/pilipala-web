<script>
export default {
  props: {
    active_tab: {
      type: String,
      default: ''
    },
    tabs: {
      type: Array,
      default: []
    }
  },
  data() {
    return {}
  },
  methods: {
    change_tab(name) {
      let tab = this.tabs.filter(e => e.name === name)[0]
      this.$router.replace(tab.path)
    }
  },
  mounted() {
  }
}

</script>

<template>
  <div class="tab-nav">
    <div v-for="(tab,idx) in tabs" class="tab-item" :style="{'--visible':active_tab===tab.name?'visible':'hidden'}"
         @click="change_tab(tab.name)">
      <span :class="{'primary-tab-name':active_tab===tab.name,'black-tab-name':active_tab!==tab.name}"><b>{{
          tab.name
        }}</b></span>
    </div>
  </div>
  <div style="height: 1px;background: #f0f0f0"></div>
</template>

<style lang="less" scoped>
@import "@/style/index.less";

.tab-nav {
  padding-left: 28px;
  padding-top: 28px;
  width: 100%;
  display: flex;
  background: white;
}

.tab-item {
  text-align: center;
  line-height: 20px;
  border-bottom: -2px solid #d7d7d7;
  padding-left: 10px;
  padding-right: 10px;
}

.tab-item:hover {
  cursor: pointer;
  color: @theme-color;
}


.tab-item:after {
  visibility: var(--visible);
  margin-top: 5px;
  content: " ";
  bottom: 0;
  display: block;
  height: 1px;
  border: 2px solid @theme-color;
  transform: scaleX(1);
  transition: .1s;
}

.primary-tab-name {
  color: @theme-color;
}

.black-tab-name {
  color: black;
}
</style>