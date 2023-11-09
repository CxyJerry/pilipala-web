<script>
import PreviewPlayer from "@/components/preview-player.vue";
import {convert_to_count_unit} from "../utils/unit";

export default {
  components: {PreviewPlayer},
  props: {
    bvod: {
      type: Object,
      default: {
        bvId: "BVC501F33177D14514BC694FAF34D4E5ED",
        coverUrl: "file/cover/20231024201948.jpg",
        title: "第三范式",
        desc: "",
        viewCount: 0,
        likeCount: 0,
        barrageCount: 0,
        commentCount: 0,
        coinCount: 0,
        collectCount: 0,
        shareCount: 0,
        author: {
          uid: "652e6d71f66ff36c6072bc1c",
          nickName: "user_d2616177"
        },
        preview: {
          cid: "1716791585003352064",
          name: "预览",
          url: "/file/video/1716791585003352064/预览/1"
        }
      }
    },
    id_suffix: {
      type: String,
      default: ''
    },
    show_partition: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    convert_to_count_unit,
    play_bvod() {
      let route_data = this.$router.resolve({path: `/player/${this.bvod.bvId}`, query: {"cid": this.bvod.preview.cid}})
      window.open(route_data.href, '_blank')
    }
  },
  mounted() {
  }

}
</script>

<template>
  <div class="feed-card " :class="{'show-card':show_partition}">
    <div class="feed-img-card" @click="play_bvod">
      <div style="position: relative;width: 100%;height: 100%;">
        <img :src="`/api/${bvod.coverUrl}`" alt=""
             style="width: 100%;height: 100%;position: relative; border: rgba(213,213,213,0.84) 1px solid;border-radius: 10px;object-fit: cover"/>

        <div
            style="position: absolute;bottom: 0;display: flex;flex-direction: row;padding: 6px;justify-content: center;align-items: center">
          <!--     观看数     -->
          <div
              style="display: flex;flex-direction: row;align-items: center;padding-left: 3px;padding-right: 3px;">
            <Icon type="logo-youtube" color="rgba(224,224,224,0.73)"/>
            <div style="color: rgba(224,224,224,0.73);margin-left: 3px;margin-right: 3px;">
              {{ convert_to_count_unit(bvod.viewCount) }}
            </div>
          </div>
          <!--     弹幕数     -->
          <div
              style="display: flex;flex-direction: row;align-items: center;padding-left: 3px;padding-right: 3px">
            <Icon type="ios-list-box" color="rgba(224,224,224,0.73)"/>
            <span style="color: rgba(224,224,224,0.73);margin-left: 3px;margin-right: 3px">{{
                convert_to_count_unit(bvod.commentCount)
              }}</span>
          </div>
        </div>
      </div>
      <div style="position: absolute;top: 0;left: 0;right: 0;bottom: 0;z-index: 1;border-radius: 10px">
        <preview-player style="width: 100%;height: 100%;border-radius: 10px" :preview="bvod.preview"
                        :id_suffix="id_suffix"/>
      </div>
    </div>
    <div :style="show_partition?{paddingLeft:'10px'}:{}">
      <div class="title" @click="play_bvod">
        {{ bvod.title }}
      </div>
      <div style="display: flex;flex-direction: row;align-items: center">
        <svg t="1697462085076" class="icon" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg"
             p-id="15642" width="16" height="16">
          <path
              d="M512 0.745631C230.270757 0.745631 0.745631 230.270757 0.745631 512c0 281.729243 229.525126 511.254369 511.254369 511.254369 281.729243 0 511.254369-229.525126 511.254369-511.254369C1023.254369 230.270757 793.729243 0.745631 512 0.745631z m0 962.311456c-248.752466 0-451.057087-202.304621-451.057087-451.057087 0-248.752466 202.304621-451.057087 451.057087-451.057087 248.752466 0 451.057087 202.304621 451.057087 451.057087 0 248.752466-202.304621 451.057087-451.057087 451.057087z"
              fill="#cdcdcd" p-id="15643"></path>
          <path
              d="M634.134369 518.243417c-25.480699-19.22734-59.700194-30.222913-89.913165-38.464621l-2.753864-0.745631V354.403417l4.503611 0.994175c26.723417 5.994874 51.697087 17.736078 72.674175 34.219495 2.246835 1.749748 5.249243 2.753864 8.251651 2.246835a10.935922 10.935922 0 0 0 7.486136-4.245126l22.229747-28.721709a11.075107 11.075107 0 0 0-1.749747-15.479301c-30.222913-24.476583-67.18633-39.717282-109.896078-45.463611l-3.24101-0.497088v-45.950757c0-6.243417-5.000699-11.234175-11.244116-11.234175h-40.214369c-6.243417 0-11.234175 4.990757-11.234175 11.234175v46.954874l-3.250951 0.497087c-35.462214 5.497786-65.436583 19.22734-86.41367 40.214369-20.728544 20.728544-31.962718 47.203417-31.962719 76.919301 0 60.197282 33.205437 92.657087 118.624932 116.139495l2.753864 0.745631v138.617787l-4.49367-0.994175c-30.72-6.99899-60.942913-22.229748-84.673864-42.709748a12.258175 12.258175 0 0 0-8.738796-2.753864 10.40901 10.40901 0 0 0-7.744621 4.49367l-21.722719 30.222913c-3.250951 4.49367-2.753864 10.995573 1.491263 14.73367 30.72 28.73165 72.177087 46.457786 122.88 52.701204l3.250951 0.497087v44.956583c0 6.243417 4.990757 11.234175 11.234175 11.234174h40.214369c6.243417 0 11.234175-4.990757 11.234174-11.234174v-43.445437l3.250952-0.258486c40.462913-4.245126 72.425631-17.487534 95.162408-39.210252 22.726835-21.73266 34.965126-51.955573 34.965126-86.920699-0.248544-36.207845-13.490951-63.686835-40.96-84.663923z m-92.915573 30.72l5.000699 1.491263c29.725825 9.494369 63.686835 24.983612 63.686835 59.45165a57.244583 57.244583 0 0 1-14.485126 37.957592c-11.234175 12.74532-27.976078 21.235573-49.708738 25.232156l-4.49367 0.745631V548.963417zM422.832466 410.594175c0-27.717592 18.740194-48.446136 51.2-56.439301l4.752155-1.25266v108.643417l-5.000699-1.739806c-21.722718-6.99899-50.951456-20.231456-50.951456-49.21165z"
              fill="#cdcdcd" p-id="15644"></path>
        </svg>
        <span class="nickname" @click="this.$router.push(`/sphere/${bvod.author.uid}`)">{{
            bvod.author.nickName
          }}</span>
      </div>
    </div>
    <!--   分区显示     -->
    <div class="partition" v-if="show_partition"
         @click="this.$router.push(`/partition/${bvod.partition}`)">
      <span style="border-radius: 5px;background: white;padding: 2px 5px">
        {{ bvod.partition }}
      </span>

    </div>
  </div>
</template>

<style lang="less" scoped>
@import "@/style/index.less";

.feed-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
}

.show-card {
  border: #dddddd 1px solid;
  border-radius: 10px;
  box-shadow: 0 8px 8px 0 #dddddd;
}

.feed-card:hover {
  cursor: pointer;
}

.feed-img-card {
  background: #bba77e;
  border-radius: 10px;
  min-height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.title {
  padding-top: 5px;
  line-height: 25px;
  height: 50px;
  width: 200px; /* 设置文本容器的宽度 */
  overflow: hidden; /* 隐藏溢出的文本 */
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 指定行数 */
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  font-size: medium;
  font-family: "Source Han Sans CN Regular", serif;
  font-weight: 500;
}

.title:hover {
  cursor: pointer;
  color: @theme-color;
}

.nickname {
  padding-left: 10px;
  color: #aeaeae
}

.nickname:hover {
  color: @theme-color;
}

.partition {
  position: absolute;
  top: 0;
  left: 0;
  padding: 16px;
  font-weight: bold;
  z-index: 1;
  width: 100%;
  height: 100%
}

.partition:hover {
  color: @theme-color;
}
</style>