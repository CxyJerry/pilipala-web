<script>
import PPlayer from "@/views/player/components/p-player.vue";
import {review, sd_video} from "@/api/vod";
import Commonheader from "@/components/commonheader.vue";
import PButton from "@/components/p-button.vue";

export default {
  name: "review-player",
  components: {PButton, Commonheader, PPlayer},
  methods: {
    get_vod() {
      this.cid = this.$route.params.cid
      sd_video(this.cid)
          .then(res => {
            this.cur_vod = res.data.vodList[0]
            let qn = this.cur_vod.quality[0]
            qn.type = 'dash'
            qn.url = `/api${qn.url}`
          })
    },
    review(status) {
      review(this.cid, status).then(res => {
        this.$Message.success(`审阅成功,状态为 ${status}，2s后返回审核列表`)
        setTimeout(() => {
          this.$router.go(-1)
        }, 2000)
      }).catch(err => {
        this.$Message.error('审阅失败')
      })
    }
  },
  data() {
    return {
      cid: '',
      bvod: {},
      cur_vod: {}
    }
  },
  mounted() {
    this.get_vod()
  }
}
</script>

<template>
  <div class="container">
    <commonheader/>
    <div style="width: 60%;padding: 2%">
      <p-player :cur_vod="cur_vod" :need_operation="false" :need_danmaku="false"/>

      <div style="display: flex;flex-direction: row">
        <p-button type="primary" @click="review('passed')">
          <template v-slot:content>
            审核通过
          </template>
        </p-button>
        <p-button type="pink" @click="review('fail')">
          <template v-slot:content>
            审核不通过
          </template>
        </p-button>
      </div>
    </div>


  </div>


</template>

<style scoped lang="less">
.container {
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>