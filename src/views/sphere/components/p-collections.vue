<script>
import {user_collection} from "@/api/user";
import {format_date} from "@/utils/unit";
import {play_vod} from "@/utils/player";

export default {
  name: "p-collections",
  props: {
    uid: String
  },
  data() {
    return {
      collections: [],
      offset: 0,
      size: 20,
      loading: false
    }
  },
  methods: {
    play_vod,
    request_collections() {
      if (this.loading) {
        console.log('已经在请求了')
        return
      }
      console.log('请求数据')
      this.loading = true
      user_collection(this.uid, this.offset, this.size)
          .then(res => {
            let collections = res.data
            for (let vod of collections) {
              vod.mtime = format_date(vod.mtime, 'MM-DD')
              vod.collectTime = format_date(vod.collectTime, 'yyyy-MM-DD')
              this.collections.push(vod)
            }
            this.loading = false
          })
          .catch(err => {
            console.log('123')
            this.loading = false
          })
    },
    set_scroll_event() {
      this.$refs["collect-panel"].addEventListener('scroll', e => {
        const target = e.target;
        const scrollTop = target.scrollTop;
        const scrollHeight = target.scrollHeight;
        const clientHeight = target.clientHeight;

        if (scrollTop >= (3 / 4) * (scrollHeight - clientHeight)) {
          if (!this.loading) {
            this.offset += this.size
            this.request_collections()
          }
        }
      })
    }
  },
  mounted() {
    this.set_scroll_event()
  },
  watch: {
    uid: {
      immediate: true,
      handler: function () {
        if (this.uid === '') {
          return
        }
        this.request_collections()
      }
    }
  },
}
</script>

<template>
  <div class="white-card" ref="collect-panel">
    <div style="min-height: 10%;justify-content: center;align-items: center">
      <div
          style="line-height: normal;text-align: center;display: flex;justify-content: center;align-items: center;height: 50px"
          v-if="collections.length===0">
        <div style="color: #aeaeae">
          这里啥也没有~
        </div>
      </div>
      <div style="display: grid;grid-template-columns: repeat(5,1fr)">
        <div class="vod-card" v-for="(vod,idx) in collections" @click="play_vod(vod)">
          <img :src="`/api/${vod.coverUrl}`" alt=""
               style="width: 100%;aspect-ratio: 16/9;border-radius: 5px"/>
          <div class="vod-title-box">
            <div class="vod-title">
              {{ vod.title }}
            </div>
            <div style="display: flex;flex-direction: row;justify-content: space-between;align-items: center">
              <div style="line-height: 30px;color: #919191">
                收藏于：{{ vod.collectTime }}
              </div>
            </div>
          </div>
        </div>
      </div>
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