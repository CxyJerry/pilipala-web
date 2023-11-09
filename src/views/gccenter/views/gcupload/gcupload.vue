<script>


export default {
  components: {},
  data() {
    return {}
  },
  methods: {},
  created() {
  }
}
</script>

<template>
  <div style="margin-top: 50px;height: 100%;width: 70%">
    <div style="height: 100%">
      <router-view/>
    </div>

  </div>

</template>

<style lang="less" scoped>
@import "@/style/index.less";

.post-btn {
  width: 150px;
  border-radius: 3px;
  background: @theme-color;
  color: white;
  line-height: 30px;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
}

.post-btn:hover {
  cursor: pointer;
}

.notify {
  color: #969696;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 8px;
}
</style>