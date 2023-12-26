<script>
import Swiper from "@/views/index/components/swiper.vue";
import {partitions, recommendPartition, recommends} from "@/api/recommend";
import PreviewPlayer from "@/components/preview-player.vue";
import PreviewVideoCard from "@/components/vertical-preview-video-card.vue";

export default {
  components: {PreviewVideoCard, VideoCard: PreviewVideoCard, PreviewPlayer, Swiper},
  data() {
    return {
      feed: {
        swiper: [],
        first: []
      },
      partition_feed: [],
      partition_loading: false,
      show_anchor: false,
      refreshing: false,
      partitions: [],
      partitions_requesting: false,
      requested_partition: [],
      offsetWidth: window.innerWidth - 50
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scroll);
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.scroll);
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.offsetWidth = window.innerWidth - 50;
    },
    scroll(e) {
      let pageHeight = document.body.clientHeight || document.documentElement.clientHeight
      let scrollTop = window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.show_anchor = scrollTop > pageHeight / 10

      let scrollY = window.scrollY; // 获取滚动条的垂直位置
      let innerHeight = window.innerHeight; // 获取窗口的可视高度
      let scrollHeight = document.body.scrollHeight; // 获取页面的总高度

      // 计算滚动条与底部的距离
      let distanceToBottom = scrollHeight - (scrollY + innerHeight);
      if (distanceToBottom < 100) {
        this.request_partition_recommend()
      }


    },
    scrollTop() {
      window.scrollTo({top: 0, behavior: 'smooth'})
    },
    request_recommends() {
      this.scrollTop()
      this.refreshing = true
      setTimeout(() => {
        this.refreshing = false
      }, 500)
      this.partitions = this.requested_partition
      this.requested_partition = []
      this.partition_feed = []
      recommends(6, 6, 5)
          .then(res => {
            this.feed = res.data
          })
      this.request_partition_recommend()

    },
    request_partitions() {
      partitions().then(async res => {
        this.partitions = Object.keys(res.data)
        await this.$nextTick(() => {
        })
        this.request_partition_recommend()
      })
    },
    request_partition_recommend() {
      if (this.partition_loading) {
        return
      }
      this.partition_loading = true
      let load_count = 0

      let that = this
      let loop = setInterval(() => {
        if (that.partitions.length > 0 && load_count < 3) {
          if (that.partitions_requesting) {
            return;
          }
          that.partitions_requesting = true
          recommendPartition(that.partitions[0], "投稿时间", 1, 5)
              .then(res => {
                this.partitions_requesting = false
                if (res.data.total > 0) {
                  this.partition_feed.push({
                    partition: that.partitions[0],
                    value: res.data.page
                  })
                  load_count++
                }
                this.requested_partition.push(that.partitions.shift())
              }).catch(err => {
            that.partitions_requesting = false
          })
        } else {
          clearInterval(loop)
        }
      })
      this.partition_loading = false
    },
  },
  beforeMount() {
    this.request_partitions()
    this.request_recommends()

  }
}

</script>

<template>
  <div class="feed">
    <div class="feed2">
      <!--  推荐板块  -->
      <div class="first-feed-panel">
        <!--   轮播   -->
        <div style="grid-row: span 2;grid-column: span 2;">
          <swiper :swiper="feed.swiper"/>
        </div>
        <preview-video-card v-for="feed in feed.first" :bvod="feed" :id_suffix="'first_feed'"/>

      </div>
      <!--  分类推荐  -->
      <div class="first-feed-panel" :class="{ 'empty-feed-panel': type }" v-for="type in partition_feed">
        <preview-video-card style="width: 100%;height: 100%" v-for="(bvod, idx) in type.value" :bvod="bvod"
                            :id_suffix="bvod.partition" :show_partition="idx === type.value.length - 1"/>
      </div>

      <!--  右侧刷新按钮  -->
      <div style="position: absolute;margin-left:0;z-index: 2;left:100%;transform: translate(10px);top:0;">
        <div class="refresh-btn" @click="request_recommends">
          <div class="refresh-icon" :class="{ 'rotation-animation': refreshing }" style="margin-bottom: 6px;">
            <svg t="1697409301924" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="8547" width="16" height="16">
              <path
                  d="M126.4 870.4c-17.6 0-32-14.4-32-32V665.6c0-17.6 14.4-32 32-32s32 14.4 32 32v172.8c0 17.6-14.4 32-32 32zM897.6 390.4c-17.6 0-32-14.4-32-32V185.6c0-17.6 14.4-32 32-32s32 14.4 32 32v172.8c0 17.6-14.4 32-32 32z"
                  fill="#bfbfbf" p-id="8548"></path>
              <path
                  d="M512 960c-184 0-347.2-110.4-416-281.6-6.4-16 1.6-35.2 17.6-41.6 16-6.4 35.2 1.6 41.6 17.6C214.4 801.6 353.6 896 512 896s297.6-94.4 356.8-241.6c6.4-16 25.6-24 41.6-17.6 16 6.4 24 25.6 17.6 41.6C859.2 849.6 696 960 512 960zM897.6 390.4c-12.8 0-24-8-30.4-20.8C809.6 222.4 670.4 128 512 128S214.4 222.4 155.2 369.6c-6.4 16-25.6 24-41.6 17.6-16-6.4-24-25.6-17.6-41.6C164.8 174.4 328 64 512 64s347.2 110.4 416 281.6c6.4 16-1.6 35.2-17.6 41.6-4.8 1.6-8 3.2-12.8 3.2z"
                  fill="#bfbfbf" p-id="8549"></path>
            </svg>
          </div>

          <span style="font-size: 13px;">换一换</span>
        </div>
      </div>
    </div>
  </div>
  <div class="outside">
    <div class="outside-inner">
      <!--  锚点  -->
      <div :style="{
        left: `${offsetWidth}px`,
        position: `fixed`,
        bottom: '30px',
        display: 'flex',
        textAlign: 'center',
        flexDirection: 'column'
      }" v-if="show_anchor">
        <div class="refresh-batch" @click="request_recommends">
          <div class="refresh-icon" :class="{ 'rotation-animation': refreshing }">
            <svg t="1697409301924" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="8547" width="22" height="22">
              <path
                  d="M126.4 870.4c-17.6 0-32-14.4-32-32V665.6c0-17.6 14.4-32 32-32s32 14.4 32 32v172.8c0 17.6-14.4 32-32 32zM897.6 390.4c-17.6 0-32-14.4-32-32V185.6c0-17.6 14.4-32 32-32s32 14.4 32 32v172.8c0 17.6-14.4 32-32 32z"
                  fill="#ffffff" p-id="8548"></path>
              <path
                  d="M512 960c-184 0-347.2-110.4-416-281.6-6.4-16 1.6-35.2 17.6-41.6 16-6.4 35.2 1.6 41.6 17.6C214.4 801.6 353.6 896 512 896s297.6-94.4 356.8-241.6c6.4-16 25.6-24 41.6-17.6 16 6.4 24 25.6 17.6 41.6C859.2 849.6 696 960 512 960zM897.6 390.4c-12.8 0-24-8-30.4-20.8C809.6 222.4 670.4 128 512 128S214.4 222.4 155.2 369.6c-6.4 16-25.6 24-41.6 17.6-16-6.4-24-25.6-17.6-41.6C164.8 174.4 328 64 512 64s347.2 110.4 416 281.6c6.4 16-1.6 35.2-17.6 41.6-4.8 1.6-8 3.2-12.8 3.2z"
                  fill="#ffffff" p-id="8549"></path>
            </svg>
          </div>

        </div>
        <div class="anchor" @click="scrollTop">
          <Icon type="md-arrow-dropup" size="22"/>
          <span>顶部</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "@/style/index.less";

.feed {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 60px;
  margin: 0 auto;
  max-width: calc(1980px + 2 * 60px);
}

.feed2 {
  position: relative;
}

.first-feed-panel {
  justify-content: space-between;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 30px 10px;
  grid-gap: 30px 10px;
  width: 100%;
}

.empty-feed-panel {
  min-height: 150px;
}

@keyframes zebra {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 100% 100%;
  }
}


.refresh-btn {
  writing-mode: vertical-lr;
  text-orientation: mixed;
  border: #f1f1f1 1px solid;
  border-radius: 8px;
  padding: 9px;
  width: 40px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.refresh-btn:hover {
  cursor: pointer;
  background: #f5f5f5;
}

.anchor {
  border-radius: 10px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  padding: 3px 6px;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.anchor:hover {
  background: #d9d9d9;
  cursor: pointer;
}

.refresh-batch {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background: @theme-color;
  border-radius: 10px;
  padding: 6px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.refresh-batch:hover {
  background: #018ebd;
  cursor: pointer;
}

@keyframes rotate_720 {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(270deg);
  }

}

.refresh-icon {
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rotation-animation {
  animation: rotate_720 .5s ease-in-out;
}

.outside {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  background-color: transparent;
  transform: translateZ(0);
  pointer-events: none;
  padding: 0 60px;

}

.outside-inner {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>