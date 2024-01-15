<script>
import Commonheader from "@/components/commonheader.vue";
import {user_info} from "@/api/user";
import {content_page} from "@/api/vod";
import {format_date} from "@/utils/unit";
import Pfooter from "@/components/pfooter.vue";
import {toRaw} from "vue";
import FollowButton from "@/components/follow-button.vue";
import PMain from "@/views/sphere/components/p-main.vue";
import PSide from "@/views/sphere/components/p-side.vue";
import PCollections from "@/views/sphere/components/p-collections.vue";
import PVods from "@/views/sphere/components/p-vods.vue";

export default {
  components: {PVods, PCollections, PSide, PMain, FollowButton, Commonheader},
  data() {
    return {
      user: {
        uid: '',
        info: {
          followCount: 0,
          fansCount: 0,
          likeCount: 0,
          viewCount: 0,
        }
      },
      loading: false,
      tabs: [
        {
          tab_name: '主页',
          icon: require('@/assets/main.svg')
        },
        {
          tab_name: '动态',
          icon: require('@/assets/dynamic.svg')
        },
        {
          tab_name: '稿件',
          icon: require('@/assets/vod.svg')
        },
        {
          tab_name: '收藏',
          icon: require('@/assets/collect.svg'),
        }
      ],
      active_tab: '主页'
    }
  },
  methods: {
    init_uid() {
      this.user.uid = this.$route.params.uid
      user_info(this.user.uid).then(res => {
        this.user.info = res.data
      })
    },
    change_tab(tab) {
      this.active_tab = tab.tab_name
    },
    more_data(type) {
      if (type === '收藏' || type === '稿件') {
        this.active_tab = type
      }
    }
  },
  mounted() {
    this.init_uid()
  }
}

</script>

<template>
  <div style="background: #e8e8e8;height: 100%">
    <commonheader style="position: relative"/>
    <div class="main">
      <div class="info">
        <!--  头像  -->
        <div class="avatar-img">
          <!--    实际头像    -->
          <img :src="user.info.avatar" alt="" v-if="user.info&&user.info.avatar">
          <!--    候补头像    -->
          <div
              style="display: flex;justify-content: center;align-items: center;background-color: white;border-radius: 9999px"
              v-else>
            <svg t="1698170965279" class="icon" viewBox="0 0 1034 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="3884" width="48" height="48">
              <path
                  d="M977.92 512.47616C977.92 766.68416 771.59936 972.8 517.0688 972.8 262.57408 972.8 56.32 766.68416 56.32 512.47616c0-195.1232 121.46176-361.8304 292.99712-428.82048C401.14176 62.7456 457.76384 51.2 517.08416 51.2c59.392 0 115.96288 11.53536 167.84384 32.45568C856.448 150.65088 977.92 317.35808 977.92 512.47616zM339.968 415.40096c0 77.57312 39.75168 144.73216 97.536 177.6128 23.9616 13.63456 50.944 21.49376 79.5648 21.49376 27.62752 0 53.66784-7.35232 77.0048-20.06016 59.14624-32.24576 100.17792-100.22912 100.17792-179.03616 0-109.7216-79.4624-199.03488-177.1776-199.03488-97.65376-0.01024-177.1008 89.29792-177.1008 199.01952z m178.97472 527.56992c134.62528 0 254.72-61.90592 333.43488-158.7968-9.29792-76.42624-83.77344-141.48608-189.184-173.93664-39.808 35.80928-90.67008 57.35424-146.13504 57.35424-56.69376 0-108.5952-22.7072-148.79232-60.07296-102.53312 29.2608-177.63328 88.94976-195.24608 160.47104 78.11072 106.10688 204.0064 174.98112 345.92256 174.98112z"
                  fill="#bfbfbf" p-id="3885"></path>
            </svg>
          </div>
        </div>
        <!--   昵称     -->
        <div style="display: flex;flex-direction: column;padding-left: 5px">
          <span style="font-size: x-large">{{ user.info.nickName }}</span>
          <span style="font-size: 12px;color: white">{{
              user.info.intro ? user.info.intro : '这个用户很懒，这里啥也没有'
            }}</span>
        </div>
        <div style="padding: 10px">
          <follow-button class="follow-btn" style="margin-bottom:  5px" :user="user.info"/>
        </div>
      </div>
      <div style="background: white;padding: 0 10px;display: flex;align-items: center">
        <!--    选项卡    -->
        <div style="line-height: 50px;display: flex;flex-direction: row">
          <div :class="{'tab-item':active_tab!==tab.tab_name,'tab-item-active':active_tab===tab.tab_name}"
               v-for="tab in tabs" @click="change_tab(tab)">
            <div style="display: flex;align-items: center;justify-content: center;flex-direction: row">
              <img :src="tab.icon" alt="">
              <span style="margin: 5px">
              {{ tab.tab_name }}
            </span>
            </div>
          </div>

        </div>
        <!--    粉丝信息    -->
        <div
            style="flex:1;display: flex;align-items: end;justify-content: end;flex-direction: column;font-size: smaller">
          <div style="display: flex;flex-direction: row">
            <div style="padding-left: 5px;padding-right: 5px;color: #a5a5a5;">
              关注数
              <div style="display: flex;align-items: center;justify-content: center">
                {{ user.info.followCount ? user.info.followCount : 0 }}
              </div>
            </div>
            <div style="padding-left: 5px;padding-right: 5px;color: #a5a5a5">
              粉丝数
              <div style="display: flex;align-items: center;justify-content: center">
                {{ user.info.fansCount ? user.info.fansCount : 0 }}
              </div>
            </div>
            <div style="padding-left: 5px;padding-right: 5px;color: #a5a5a5">
              点赞数
              <div style="display: flex;align-items: center;justify-content: center">
                {{ user.info.likeCount ? user.info.likeCount : 0 }}
              </div>
            </div>
            <div style="padding-left: 5px;padding-right: 5px;color: #a5a5a5">
              播放数
              <div style="display: flex;align-items: center;justify-content: center">
                {{ user.info.viewCount ? user.info.viewCount : 0 }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="data-panel">
        <div v-show="active_tab==='主页'">
          <p-main :uid="this.user.uid" @moreData="more_data"/>
        </div>
        <div v-show="active_tab==='稿件'" class="panel">
          <p-vods :uid="this.user.uid"/>
        </div>
        <div v-show="active_tab==='收藏'" class="panel">
          <p-collections :uid="this.user.uid"/>
        </div>


      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/style/index.less";

.main {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 5%;
  margin-right: 5%;
  min-height: 100vh;
}

.info {
  height: 15vh;
  background-image: url("@/assets/sphere_bg.jpeg");
  display: flex;
  flex-direction: row;
  color: white;
  padding: 10px 20px;
  align-items: end;

  .avatar {
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 360px;
    background: white;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .avatar-img {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

}

.data-panel {
  margin-top: 1%;
  flex: 1;
  display: flex;
  flex-direction: row;
}

.follow-btn {
  background: @theme-pink;
}

.follow-btn:hover {
  cursor: pointer;
}

.tab-item {
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.tab-item:hover {
  cursor: pointer;
  color: @theme-color;
}

.tab-item:after {
  bottom: 0;
  content: "";
  height: 3px;
  width: 100%;
  background: white;
}

.tab-item:hover:after {
  bottom: 0;
  content: "";
  height: 3px;
  width: 100%;
  background: @theme-color;
}

.tab-item-active {
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  color: @theme-color;
}

.tab-item-active:after {
  bottom: 0;
  content: "";
  height: 3px;
  width: 100%;
  background: @theme-color;
}

.panel {
  flex: 1;
  display: flex;
  width: 100%
}

/* Webkit 浏览器的滚动条样式 */
::-webkit-scrollbar {
  width: 8px; /* 滚动条的宽度 */
}

::-webkit-scrollbar-track {
  background: #f1f1f1; /* 滚动条轨道的背景颜色 */
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: #888; /* 滚动条滑块的背景颜色 */
}

::-webkit-scrollbar-thumb:hover {
  background: @theme-color; /* 滚动条滑块在悬停时的背景颜色 */
}


* {
  scrollbar-width: thin; /* 可选值有 'auto', 'thin', 'none' */
  scrollbar-color: #888 @theme-color; /* 滑块颜色 和 轨道颜色 */
}

</style>