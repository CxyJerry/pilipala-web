<script>
import {convert_to_count_unit, format_date} from "@/utils/unit";

export default {
  props: {
    vod: {
      type: Object,
      default: {
        cid: "1717215264103239680",
        coverUrl: "file/cover/20231026002325.png",
        title: "测试稿件1",
        gcType: "自制",
        partition: "知识",
        subPartition: "科学科普",
        labels: [
          "程序员杰瑞",
          "Java"
        ],
        desc: "",
        offset: 0,
        viewCount: 0,
        likeCount: 0,
        barrageCount: 0,
        commentCount: 0,
        coinCount: 0,
        collectCount: 0,
        shareCount: 0,
        quality: [
          {
            name: "360p",
            url: "/file/video/1717215264103239680/360p/1"
          },
          {
            name: "480p",
            url: "/file/video/1717215264103239680/480p/1"
          },
          {
            name: "720p",
            url: "/file/video/1717215264103239680/720p/1"
          },
          {
            name: "1080p",
            url: "/file/video/1717215264103239680/1080p/1"
          }
        ],
        onlineCount: 0,
        mtime: 1698251023462
      }

    }
  },
  methods:{
    convert_to_count_unit,
    format_date
  },
  mounted() {
    console.log(this.vod)
  }
}

</script>

<template>
  <div class="vod">
    <div style="width: 40%;margin-right: 5px">
      <img :src="`/api${vod.coverUrl}`" style="width: 100%;height: 100%;border-radius: 5px" alt="">
    </div>
    <div style="display: flex;flex-direction: column">
      <span>{{ vod.title }}</span>
      <div
          style="bottom: 0;display: flex;flex-direction: row;padding: 6px;justify-content: center;align-items: center">
        <!--     观看数     -->
        <div
            style="display: flex;flex-direction: row;align-items: center;padding-left: 3px;padding-right: 3px">
          <Icon type="logo-youtube" color="rgba(140,140,140,0.87)"/>
          <div style="color: rgba(140,140,140,0.87);margin-left: 3px;margin-right: 3px;">
            {{ convert_to_count_unit(vod.viewCount) }}
          </div>
        </div>
        <!--     弹幕数     -->
        <div
            style="display: flex;flex-direction: row;align-items: center;padding-left: 3px;padding-right: 3px">
          <Icon type="ios-list-box" color="rgba(140,140,140,0.87)"/>
          <span style="color: rgba(140,140,140,0.87);margin-left: 3px;margin-right: 3px">{{
              convert_to_count_unit(vod.commentCount)
            }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "@/style/index.less";
.vod {
  line-height: 20px;
  display: flex;
  flex-direction: row;
  align-items: center
}

.vod:hover {
  color: @theme-color;
  cursor: pointer;
}
</style>