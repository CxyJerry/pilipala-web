<script>
import {dynamics} from "@/api/fans";
import {store} from "@/store";
import {format_date} from "@/utils/unit";

export default {
  name: "p-dynamic",
  data() {
    return {
      dynamic_list: [],
      page_no: 1,
      page_size: 10,
      total: 10,
      loading: false,
      user_info: {}
    }
  },
  methods: {
    format_date,
    get_dynamics() {
      if (this.loading) {
        return
      }
      this.loading = true
      dynamics(null, this.page_no, this.page_size).then(res => {
        this.dynamic_list = res.data.page
        this.total = res.data.total
        this.loading = false
      }).catch(err => {
        ths.loading = false
      })
    },
    add_scroll_event() {
      window.addEventListener('scroll', e => {
        const target = e.target;
        const scrollTop = target.scrollTop;
        const scrollHeight = target.scrollHeight;
        const clientHeight = target.clientHeight;

        if (scrollTop >= (3 / 4) * (scrollHeight - clientHeight)) {
          if (!this.loading) {
            this.page_no += 1
            this.get_dynamics()
          }
        }
      })
    }
  },
  mounted() {
    this.get_dynamics()
    this.add_scroll_event()
    this.user_info = store.state.user_info
  }
}
</script>

<template>
  <div style="width: 100%;display: flex;flex-direction: row;margin: 0 10%">
    <div style="flex: 2">
      <div class="card" style="display: flex;flex-direction: column;">
        <!--   头像 & 昵称     -->
        <div style="display: flex;flex-direction: row;flex: 1;align-items: center;padding: 10px 20px">
          <img style="border-radius: 360px;width: 50px;height: 50px"
               :src="`/api/${user_info.avatar}`" alt=""/>
          <div style="font-weight: bold;padding: 10px">{{ user_info.nickName }}</div>
        </div>
        <!--    统计数据    -->
        <div style="width: 100%;display: grid;grid-template-columns: repeat(3,1fr);flex: 2;align-items: center">
          <div class="statistics">
            <div>
              {{ user_info.followCount }}
            </div>
            <div style="color: #919191">
              关注
            </div>
          </div>
          <div class="statistics">
            <div>
              {{ user_info.fansCount }}
            </div>
            <div style="color: #919191">
              粉丝
            </div>
          </div>
          <div class="statistics">
            <div>
              {{ user_info.followCount }}
            </div>
            <div style="color: #919191;">
              动态
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="flex: 5;margin: 0 10px">
      <div class="card" v-if="dynamic_list.length===0"
           style="display: flex;align-items: center;justify-content: center;color: #c3c3c3">
        这里啥也没有~
      </div>
      <div v-else class="card" v-for="dynamic_ in dynamic_list">
        <div>
          <div style="display: flex;flex-direction: row;align-items: center">
            <img style="width: 40px;height: 40px;border-radius: 360px" :src="`/api/${dynamic_.userVO.avatar}`" alt=""/>
            <div style="margin-left: 10px">
              <div style="font-weight: bolder">
                {{ dynamic_.userVO.nickName }}
              </div>
              <div style="font-size: smaller">
                {{ format_date(dynamic_.ctime) }} 投稿了视频
              </div>
            </div>
          </div>
          <div style="height: 150px;margin: 10px">
            <div
                style="display: flex;flex-direction: row;border-radius: 10px;border: 1px solid #eaeaea;height: 100%">
              <div style="position:relative;flex: 1">
                <img style="height: 150px;border-radius: 10px;position:relative;"
                     :src="`/api/${dynamic_.vodVO.coverUrl}`" alt=""/>
              </div>
              <div style="flex: 2;display: flex;flex-direction: column;height: 100%;padding: 10px">
                <div style="flex: 1">
                  {{ dynamic_.vodVO.title }}
                </div>
                <div style="display: flex;flex-direction: row;position: relative;bottom: 0">
                  <div style="padding: 10px">
                    <Icon type="logo-youtube" color="#919191"/>
                    {{ dynamic_.vodVO.viewCount }}
                  </div>
                  <div style="padding: 10px">
                    <Icon type="ios-list-box" color="#919191"/>
                    {{ dynamic_.vodVO.viewCount }}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>

    <div style="flex: 2">
      <div class="card">
        话题卡片 - 待补充
      </div>

    </div>
  </div>

</template>

<style scoped lang="less">
.card {
  border-radius: 10px;
  background: white;
  min-height: 150px;
  margin-bottom: 10px;
  padding: 10px;
}

.statistics {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
}
</style>