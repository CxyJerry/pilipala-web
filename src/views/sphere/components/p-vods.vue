<script>
import {play_vod} from "@/utils/player";
import {content_page} from "@/api/vod";
import {format_date} from "@/utils/unit";

export default {
  name: "p-vods",
  data() {
    return {
      vod_list: [],
      total: 0,
      page_no: 1,
      page_size: 20,
      loading: false
    }
  },
  methods: {
    play_vod,
    get_vod_page() {
      this.loading = true
      content_page(this.page_no, this.page_size, 'passed', this.$route.params.uid).then(res => {
        let collections = res.data.page
        this.total = res.data.total
        for (let vod of collections) {
          vod.mtime = format_date(vod.mtime, 'MM-DD')
          vod.collectTime = format_date(vod.collectTime, 'yyyy-MM-DD')
          this.vod_list.push(vod)
        }
        this.loading = false
      })
    },
    change_page(no) {
      this.page_no = no
      this.vod_list = []
      this.get_vod_page()
    },
    change_page_size(size) {
      this.page_size = size
      this.page_no = 1
      this.vod_list = []
      this.get_vod_page()
    }
  },
  mounted() {
    this.get_vod_page()
  }
}
</script>

<template>
  <div class="white-card" ref="collect-panel">
    <div style="min-height: 10%;justify-content: center;align-items: center">
      <div
          style="line-height: normal;text-align: center;display: flex;justify-content: center;align-items: center;height: 50px"
          v-if="vod_list.length===0">
        <div style="color: #aeaeae">
          这里啥也没有~
        </div>
      </div>
      <div style="display: grid;grid-template-columns: repeat(5,1fr)">
        <div class="vod-card" v-for="(vod,idx) in vod_list" @click="play_vod(vod)">
          <img :src="`/api/${vod.coverUrl}`" alt=""
               style="width: 100%;aspect-ratio: 16/9;border-radius: 5px"/>
          <div class="vod-title-box">
            <div class="vod-title">
              {{ vod.title }}
            </div>
            <div style="display: flex;flex-direction: row;justify-content: space-between;align-items: center">
              <div style="width: 50px">
                <Icon type="logo-youtube" color="#a9a9a9"/>
                <span style="padding: 5px;font-size: small">{{ vod.viewCount }}</span>
              </div>
              <div style="line-height: 30px">
                {{ vod.mtime }}
              </div>

            </div>
          </div>
        </div>
      </div>
      <Page :total="total" size="small" show-total
            @on-change="change_page"
            @on-page-size-change=""
            @on-prev="change_page"
            @on-next="change_page"/>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/style/index.less";

.white-card {
  background-color: white;
  min-height: 200px;
  flex: 1;
  width: 100%;
  padding: 10px;
  overflow-y: scroll;
  max-height: 80vh;
}

.vod-card {
  display: flex;
  flex-direction: column;
  padding: 15px 15px 15px 10px;
  justify-content: center;
  align-items: center;
}

.vod-title-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%
}

.vod-title {
  flex: 1;
  font-size: medium;
  word-break: break-word;
  word-wrap: break-word;
  overflow-wrap: break-word;
  line-height: 30px;
  overflow: hidden; /* 隐藏溢出的文本 */
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 指定行数 */
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  position: relative; /* 添加相对定位 */
  min-height: 60px; /* 设置最小高度为两行的高度 */
}


.vod-card:hover {
  cursor: pointer;

  .vod-title {
    color: @theme-color;
  }
}
</style>