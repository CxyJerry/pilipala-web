<script>
import Commonheader from "@/components/commonheader.vue";
import {user_info} from "@/api/user";
import {content_page} from "@/api/vod";
import {format_date} from "@/utils/unit";
import Pfooter from "@/components/pfooter.vue";
import {toRaw} from "vue";
import FollowButton from "@/components/follow-button.vue";

export default {
  components: {FollowButton, Pfooter, Commonheader},
  data() {
    return {
      user: {
        uid: '',
        info: {}
      },
      page: {
        no: 1,
        size: 36,
        total: 0,
        vod_type: 'passed',
        data: []
      },
      loading: false
    }
  },
  methods: {
    init_uid() {
      this.user.uid = this.$route.params.uid
      user_info(this.user.uid).then(res => {
        this.user.info = res.data
      })
    },
    request_page() {
      this.loading = true
      content_page(this.page.no, this.page.size, this.page.vod_type, this.user.uid)
          .then(res => {
            this.loading = false
            this.page.data = res.data.page
            this.page.total = res.data.total
            for (let bvod of this.page.data) {
              bvod.mtime = format_date(bvod.mtime)
            }
          })
          .catch(err => {
          })
    },
    change_page_no(no) {
      this.page.no = no
      this.request_page()
    },
    change_page_size(size) {
      this.page.size = size
      this.page.no = 1
      this.request_page()
    },
    play_vod(vod) {
      vod = toRaw(vod)
      let bvid = vod.bvId
      this.$router.push('/player/' + bvid)
    },

  },
  mounted() {
    this.init_uid()
    this.request_page()
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
          <span style="font-size: large">{{ user.info.nickName }}</span>
          <span style="font-size: 12px;color: #e8e8e8">{{
              user.info.intro ? user.info.intro : '这个用户很懒，这里啥也没有'
            }}</span>
        </div>
        <!--    粉丝信息    -->
        <div style="flex:1;display: flex;align-items: end;justify-content: end;flex-direction: column">
          <follow-button class="follow-btn" style="margin-bottom:  5px" :user="user.info"/>
          <div style="display: flex;flex-direction: row">
              <span style="padding-left: 5px;padding-right: 5px;font-size: small;color: #e8e8e8">关注数：{{
                  user.info.followCount
                }}</span>
            <span style="padding-left: 5px;padding-right: 5px;font-size: small;color: #e8e8e8">粉丝数: {{
                user.info.fansCount
              }}</span>
          </div>

        </div>
      </div>

      <div class="vod-panel">
        <!--   vod list   -->
        <div style="display: flex;flex-direction: column;flex: 1;height: 100%;position: relative">
          <div style="min-height: 10%;justify-content: center;align-items: center">
            <div
                style="line-height: normal;text-align: center;display: flex;justify-content: center;align-items: center;height: 50px"
                v-if="page.data.length===0">
              <div style="color: #aeaeae">
                这里啥也没有~
              </div>
            </div>
            <div>
              <div class="vod-card" v-for="(vod,idx) in page.data" @click="play_vod(page.data[idx])">
                <img :src="`/api/${vod.coverUrl}`" alt=""
                     style="height: 96px;width: 154px;border-radius: 5px"/>
                <div style="margin-left: 2%;display: flex;flex-direction: column;justify-content: center">
                  <div class="vod-title">
                    {{ vod.title }}
                  </div>
                  <div style="line-height: 30px">
                    {{ vod.mtime }}
                  </div>
                  <div style="display: flex;flex-direction: row">
                    <div style="width: 50px">
                      <Icon type="logo-youtube" color="#a9a9a9"/>
                      <span style="padding: 5px;font-size: small">{{ vod.viewCount }}</span>
                    </div>
                    <div style="width: 50px">
                      <Icon type="md-thumbs-up" color="#a9a9a9"/>
                      <span style="padding: 5px;font-size: small">{{ vod.likeCount }}</span>
                    </div>
                    <div style="width: 50px">
                      <Icon type="ios-list-box" color="#a9a9a9"/>
                      <span style="padding: 5px;font-size: small">{{ vod.barrageCount }}</span>
                    </div>
                    <div style="width: 50px">
                      <Icon type="ios-text" color="#a9a9a9"/>
                      <span style="padding: 5px;font-size: small">{{ vod.commentCount }}</span>
                    </div>
                    <div style="width: 50px">
                      <Icon type="md-beer" color="#a9a9a9"/>
                      <span style="padding: 5px;font-size: small">{{ vod.coinCount }}</span>
                    </div>
                    <div style="width: 50px">
                      <Icon type="md-star" color="#a9a9a9"/>
                      <span style="padding: 5px;font-size: small">{{ vod.collectCount }}</span>
                    </div>
                    <div style="width: 50px">
                      <Icon type="ios-redo" color="#a9a9a9"/>
                      <span style="padding: 5px;font-size: small">{{ vod.shareCount }}</span>
                    </div>
                  </div>
                </div>
                <div style="flex: 1;align-items: center;justify-content: end;display: flex">
                  <div v-if="vod.status==='fail'">
                    <Button icon="">申诉</Button>
                    <Button icon="">删除</Button>
                  </div>
                  <div v-else-if="vod.status==='passed'">
                    <Button icon="">编辑</Button>
                    <Button icon="">数据</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Page @on-change="change_page_no" @on-prev="change_page_no" @on-next="change_page_no"
                @on-page-size-change="change_page_size"
                :model-value="page.no" :page-size="page.size" style="bottom: 0" :total="page.total"
                size="small"
                show-elevator show-sizer/>
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
  margin-left: 20%;
  margin-right: 20%;
  min-height: 100vh;
}

.info {
  min-height: 120px;
  height: 20%;
  background: @theme-color;
  display: flex;
  flex-direction: row;
  color: white;
  padding: 10px;
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

.vod-panel {
  margin-top: 2%;
  background: white;
  padding: 10px;
  flex: 1;
}

.vod-card {
  display: flex;
  flex-direction: row;
  padding: 15px 15px 15px 10px
}

.vod-title {
  font-size: large;
  line-height: 30px
}

.vod-card:hover {
  cursor: pointer;

  .vod-title {
    color: @theme-color;
  }
}

.follow-btn {
  background: @theme-pink;
}

.follow-btn:hover {
  cursor: pointer;
}

</style>