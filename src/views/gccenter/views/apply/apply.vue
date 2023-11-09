<script>
import PButton from "@/components/p-button.vue";
import app from "@/App.vue";
import {apply} from "@/api/permission";

export default {
  name: "apply",
  computed: {
    app() {
      return app
    }
  },
  components: {PButton},
  methods: {
    apply() {
      apply().then(res => {
        this.$Message.success("已提交申请，请耐心等待！")
      }).catch(err => {
        this.$router.replace("/")
      })
    }
  }
}
</script>

<template>
  <div style="width: 200px;display: flex;flex-direction: column;align-items: center;justify-content: center">
    <span style="margin: 10%">
      您还没有成为创作者~
    </span>
    <div style="display: flex;flex-direction: row;align-items: center">
      快来
      <div style="padding: 5px">
        <p-button type="primary" @click="apply">
          <template v-slot:content>
            申请
          </template>
        </p-button>
      </div>
      加入吧！
    </div>

  </div>
</template>

<style scoped lang="less">

</style>