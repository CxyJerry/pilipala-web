<script>
import {content_page} from "@/api/vod";
import {format_date} from "@/utils/unit";
import {toRaw} from "vue";
import {user_coin, user_collection, user_likes} from "@/api/user";
import PSide from "@/views/sphere/components/p-side.vue";
import {store} from "@/store";

export default {
  name: "p-main",
  components: {PSide},
  props: {
    uid: String
  },
  data() {
    return {
      page: {
        no: 1,
        size: 5,
        total: 0,
        vod_type: 'passed',
        data: []
      },
      collections: [],
      coins: [],
      likes: []
    }
  },
  methods: {
    request_vods() {
      this.loading = true
      content_page(this.page.no, this.page.size, this.page.vod_type, this.uid)
          .then(res => {
            this.loading = false
            this.page.data = res.data.page
            this.page.total = res.data.total
            for (let bvod of this.page.data) {
              bvod.mtime = format_date(bvod.mtime, 'MM-DD')
            }
          })
          .catch(err => {
          })
    },
    request_collections() {
      console.log(this.uid)
      user_collection(this.uid, 0, 5)
          .then(res => {
            this.collections = res.data
            for (let vod of this.collections) {
              vod.mtime = format_date(vod.mtime, 'MM-DD')
              vod.collectTime = format_date(vod.collectTime, 'yyyy-MM-DD')
            }
          })
          .catch(err => {
          })
    },
    request_coins() {
      user_coin(this.uid, 0, 10)
          .then(res => {
            this.coins = res.data
            for (let vod of this.coins) {
              vod.mtime = format_date(vod.mtime, 'MM-DD')
              vod.coinTime = format_date(vod.coinTime, 'yyyy-MM-DD')
            }
          })
          .catch(err => {
          })
    },
    request_likes() {
      user_likes(this.uid, 0, 10)
          .then(res => {
            this.likes = res.data
            for (let vod of this.likes) {
              vod.mtime = format_date(vod.mtime, 'MM-DD')
              vod.likeTime = format_date(vod.likeTime, 'yyyy-MM-DD')
            }
          })
          .catch(err => {
          })
    },
    change_page_no(no) {
      this.page.no = no
      this.request_vods()
    },
    change_page_size(size) {
      this.page.size = size
      this.page.no = 1
      this.request_vods()
    },
    play_vod(vod) {
      vod = toRaw(vod)
      let bvid = vod.bvId
      this.$router.push('/player/' + bvid)
    },
    more_data(type) {
      console.log('click more: ', type)
      this.$emit('moreData', type)
    },
    self() {
      let userInfo = store.state.user_info;
      return userInfo && userInfo.uid === this.uid
    }
  },
  watch: {
    uid: {
      immediate: true,
      handler: function () {
        if (this.uid === '') {
          return
        }
        this.request_vods()
        this.request_collections()
        this.request_coins()
        this.request_likes()
      }
    }
  },
  mounted() {
  }
}
</script>

<template>
  <div style="display: flex;flex-direction: row">
    <div style="display: flex;flex-direction: column;flex: 4;height: 100%;position: relative;background: white">
      <!--  我的视频  -->
      <div>
        <div style="padding: 10px;font-size: large;display: flex;width: 100%;align-items: center">
          <span>{{ self() ? '我' : 'TA ' }}的视频</span>
          <div style="flex: 1;font-size: small;flex-direction: row;display: flex">
            <div class="tab-item">最新发布</div>
            <div class="tab-item">最多播放</div>
            <div class="tab-item">最新收藏</div>
          </div>
          <div style="font-size: x-small">
            <div class="more-btn" @click="more_data('稿件')">
              <span>更多</span>
              <svg t="1704721901125" class="icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg"
                   p-id="3227" width="15" height="15">
                <path
                    d="M383.291616 808.954249c-5.175883 0-10.353812-1.950422-14.338566-5.862521-8.064676-7.919367-8.182356-20.877493-0.26299-28.942169l273.602402-278.620695L368.69006 216.907145c-7.919367-8.064676-7.801686-21.022803 0.26299-28.942169 8.065699-7.918343 21.022803-7.80271 28.942169 0.26299l287.685141 292.960285c7.818059 7.961322 7.818059 20.717857 0 28.67918L397.895219 802.826692C393.887952 806.907637 388.591319 808.954249 383.291616 808.954249z"
                    p-id="3228" fill="#bfbfbf"></path>
              </svg>
            </div>
          </div>
        </div>
        <div style="min-height: 10%;justify-content: center;align-items: center">
          <div
              style="line-height: normal;text-align: center;display: flex;justify-content: center;align-items: center;height: 50px"
              v-if="page.data.length===0">
            <div style="color: #aeaeae">
              这里啥也没有~
            </div>
          </div>
          <div style="display: grid;grid-template-columns: repeat(5,1fr)">
            <div class="vod-card" v-for="(vod,idx) in page.data" @click="play_vod(page.data[idx])">
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
        </div>
      </div>
      <Divider/>
      <!--  收藏夹  -->
      <div>
        <div style="padding: 10px;font-size: large;display: flex;width: 100%;align-items: center">
          <span>{{ self() ? '我' : 'TA ' }}的收藏夹</span>
          <div style="flex: 1;font-size: small;flex-direction: row;display: flex">
            <span>&nbsp;</span>
          </div>
          <div style="font-size: x-small">
            <div class="more-btn" @click="more_data('收藏')">
              <span>更多</span>
              <svg t="1704721901125" class="icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg"
                   p-id="3227" width="15" height="15">
                <path
                    d="M383.291616 808.954249c-5.175883 0-10.353812-1.950422-14.338566-5.862521-8.064676-7.919367-8.182356-20.877493-0.26299-28.942169l273.602402-278.620695L368.69006 216.907145c-7.919367-8.064676-7.801686-21.022803 0.26299-28.942169 8.065699-7.918343 21.022803-7.80271 28.942169 0.26299l287.685141 292.960285c7.818059 7.961322 7.818059 20.717857 0 28.67918L397.895219 802.826692C393.887952 806.907637 388.591319 808.954249 383.291616 808.954249z"
                    p-id="3228" fill="#bfbfbf"></path>
              </svg>
            </div>
          </div>
        </div>
        <div style="min-height: 10%;justify-content: center;align-items: center">
          <div
              style="line-height: normal;text-align: center;display: flex;justify-content: center;align-items: center;height: 50px"
              v-if="page.data.length===0">
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
      <Divider/>
      <!--  最近投币的视频  -->
      <div>
        <div style="padding: 10px;font-size: large;display: flex;width: 100%;align-items: center">
          <span>最近投币的视频</span>
          <div style="flex: 1;font-size: small;flex-direction: row;display: flex">
            <span>&nbsp;</span>
          </div>
        </div>
        <div style="min-height: 10%;justify-content: center;align-items: center">
          <div
              style="line-height: normal;text-align: center;display: flex;justify-content: center;align-items: center;height: 50px"
              v-if="page.data.length===0">
            <div style="color: #aeaeae">
              这里啥也没有~
            </div>
          </div>
          <div style="display: grid;grid-template-columns: repeat(5,1fr)">
            <div class="vod-card" v-for="(vod,idx) in coins" @click="play_vod(vod)">
              <img :src="`/api/${vod.coverUrl}`" alt=""
                   style="width: 100%;aspect-ratio: 16/9;border-radius: 5px"/>
              <div class="vod-title-box">
                <div class="vod-title">
                  {{ vod.title }}
                </div>
                <div style="display: flex;flex-direction: row;justify-content: space-between;align-items: center">
                  <div style="line-height: 30px;color: #919191">
                    投币时间：{{ vod.coinTime }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Divider/>
      <!--  最近点赞的视频  -->
      <div>
        <div style="padding: 10px;font-size: large;display: flex;width: 100%;align-items: center">
          <span>最近点赞的视频</span>
          <div style="flex: 1;font-size: small;flex-direction: row;display: flex">
            <span>&nbsp;</span>
          </div>
        </div>
        <div style="min-height: 10%;justify-content: center;align-items: center">
          <div
              style="line-height: normal;text-align: center;display: flex;justify-content: center;align-items: center;height: 50px"
              v-if="page.data.length===0">
            <div style="color: #aeaeae">
              这里啥也没有~
            </div>
          </div>
          <div style="display: grid;grid-template-columns: repeat(5,1fr)">
            <div class="vod-card" v-for="(vod,idx) in likes" @click="play_vod(vod)">
              <img :src="`/api/${vod.coverUrl}`" alt=""
                   style="width: 100%;aspect-ratio: 16/9;border-radius: 5px"/>
              <div class="vod-title-box">
                <div class="vod-title">
                  {{ vod.title }}
                </div>
                <div style="display: flex;flex-direction: row;justify-content: space-between;align-items: center">
                  <div style="line-height: 30px;color: #919191">
                    点赞于：{{ vod.likeTime }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="info-card">
      <p-side :uid="this.uid"/>
    </div>
  </div>

</template>

<style scoped lang="less">
@import "@/style/index.less";

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

.tab-item {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.tab-item:before {
  position: relative;
  content: "";
  width: 0;
  height: 0;
  bottom: -85%;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid white;
}

.tab-item:after {
  position: relative;
  width: 100%;
  height: 2px;
  content: "";
  bottom: -5%;
  background: white;
}

.tab-item:hover:before {
  position: relative;
  content: "";
  width: 0;
  height: 0;
  bottom: -85%;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid @theme-color;
}

.tab-item:hover:after {
  position: relative;
  width: 100%;
  height: 2px;
  content: "";
  bottom: -5%;
  background: @theme-color;
}

.tab-item:hover {
  cursor: pointer;
  color: @theme-color;
}

.more-btn {
  border: #ebebeb solid 1px;
  border-radius: 5px;
  padding: 4px 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.more-btn:hover {
  cursor: pointer;
  color: @theme-color;
}


.info-card {
  margin-left: 1%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 5px;
}
</style>