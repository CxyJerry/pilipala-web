<script>
import Commonheader from "@/components/commonheader.vue";
import {recommendPartition} from "@/api/recommend";
import PreviewVideoCard from "@/components/preview-video-card.vue";
import Pfooter from "@/components/pfooter.vue";

export default {
  components: {Pfooter, PreviewVideoCard, Commonheader},
  data() {
    return {
      page: {
        partition: '',
        no: 1,
        size: 36,
        order_by: '投稿时间',
        data: [],
        total: 0
      },
      loading: false,
      order_by_types: [
        {
          value: "投稿时间",
          label: "投稿时间"
        },
        {
          value: "稿件名称",
          label: "稿件名称"
        }
      ]


    }
  },
  methods: {
    request_recommends() {
      this.loading = true
      recommendPartition(
          this.page.partition,
          this.page.order_by,
          this.page.no,
          this.page.size).then(res => {
        this.page.data = res.data.page
        this.page.total = res.data.total
        this.loading = false
      }).catch(err => {
        this.loading = false
      })
    },
    change_order_by() {
      this.page.no = 1
      this.request_recommends()
    },
    handleScroll() {
      // 滚动条位置
      let scrollY = window.scrollY
      // 窗口高度
      let windowHeight = window.innerHeight
      // 文档总高度
      let documentHeight = document.body.scrollHeight

      if (scrollY + windowHeight + 100 >= documentHeight && !this.loading) {
        if (this.page.no * this.page.size < this.page.total) {
          this.page.no += 1
          this.request_recommends()
        }
      }
    }
  },
  watch: {
    '$route.params': {
      immediate: true,
      handler: function (new_val, old_val) {
        if (new_val.partition !== old_val.partition) {
          this.$router.go(0)
        }
      }
    }
  },
  mounted() {
    this.page.partition = this.$route.params.partition
    this.request_recommends()
    document.addEventListener('scroll', this.handleScroll)
  }
}
</script>

<template>
  <div style="min-height: 100vh">
    <commonheader/>
    <div class="main">
      <div style="flex: 1">
        <div
            style="font-size: 20px;font-weight: bold;padding-left: 6%;padding-right:6%;display: flex;flex-direction: row;align-items: center">
          <div style="flex: 1">{{ page.partition }}</div>
          <div style="display: flex;flex-direction: row;font-size: small;justify-content: center;align-items: center">
            <span>按照</span>
            <div style="padding: 10px">
              <Select v-model="page.order_by" @on-change="change_order_by">
                <Option v-for="type in order_by_types" :value="type.value" :key="type.value">{{ type.label }}</Option>
              </Select>
            </div>
            <span>排序</span>

          </div>
        </div>
        <div style=" width: 100%;height: 1px;background: rgba(192, 192, 192, 0.57)"></div>
        <!--   视频列表   -->
        <div class="card-panel">
          <preview-video-card :bvod="bvod" v-for="bvod in page.data"/>
        </div>
        <!--   到底提示语   -->
        <div style="display: flex;flex-direction: row;justify-content: center;align-items: center;padding: 30px">
          <div>
            <span style="color: rgba(135,135,135,0.76)">到底了，没有更多了~</span>
          </div>
        </div>
      </div>
    </div>
    <pfooter/>
  </div>

</template>

<style scoped>
.main {
  padding-top: 3%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.card-panel {
  margin-top: 20px;
  padding-left: 6%;
  padding-right: 6%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  flex: 1;
  width: 100%;
  gap: 10px 20px;
}
</style>