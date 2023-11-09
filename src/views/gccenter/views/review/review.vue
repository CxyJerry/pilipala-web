<script>
import Tabs from "@/views/gccenter/views/components/tabs.vue";
import {content_page, review_page} from "@/api/vod";
import {format_date} from "@/utils/unit";
import {toRaw} from "vue";

export default {
  components: {Tabs},
  data() {
    return {
      vod_types: {
        handing: {
          name: 'handling',
          count: 0
        },
        passed: {
          name: 'passed',
          count: 0
        },
        fail: {
          name: 'fail',
          count: 0
        }
      },
      page: {
        no: 1,
        size: 10,
        total: 0,
        vod_type: 'handing',
        data: []
      }
    }
  },
  methods: {
    change_type(type) {
      this.page.vod_type = type
      this.page.no = 1
      this.request_page()
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
    request_page() {
      review_page(this.page.no, this.page.size, this.page.vod_type)
          .then(res => {
            console.log(res)
            this.page.data = res.data.page
            this.page.total = res.data.total
            for (let bvod of this.page.data) {
              bvod.mtime = format_date(bvod.mtime)
            }
          })
          .catch(err => {
          })
    },
    review_vod(vod) {
      vod = toRaw(vod)

      this.$router.push('/review-player/' + vod.cid)
    }

  },
  created() {
    this.request_page()
  }
}

</script>

<template>
  <div style="width: 100%;display: flex;height: 100%;flex-direction: column">
    <div class="data-panel">
      <!-- vod tabs -->
      <div>
        <div style="display: flex;flex-direction: row;align-items: center;padding-top: 5px">
          <div class="sub-tab" :class="{'tab-active':page.vod_type==='handing','tab':page.vod_type!=='handing'}"
               @click="change_type('handing')">
            进行中&nbsp;{{ vod_types.handing.count ? vod_types.handing.count : '' }}
          </div>
          <Divider type="vertical"/>
          <div class="sub-tab" :class="{'tab-active':page.vod_type==='passed','tab':page.vod_type!=='passed'}"
               @click="change_type('passed')">
            已通过&nbsp;{{ vod_types.passed.count ? vod_types.passed.count : '' }}
          </div>
          <Divider type="vertical"/>
          <div class="sub-tab" :class="{'tab-active':page.vod_type==='fail','tab':page.vod_type!=='fail'}"
               @click="change_type('fail')">
            未通过&nbsp;{{ vod_types.fail.count ? vod_types.fail.count : '' }}
          </div>
        </div>
      </div>
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
            <div class="vod-card" v-for="(vod,idx) in page.data" @click="review_vod(page.data[idx])">
              <img :src="`/api/${vod.coverUrl}`" alt=""
                   style="height: 96px;width: 154px;border-radius: 5px"/>
              <div style="margin-left: 2%;display: flex;flex-direction: column;justify-content: center">
                <div class="vod-title">
                  {{ vod.title }}
                </div>
                <div style="line-height: 30px">
                  {{ vod.mtime }}
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
</template>

<style lang="less" scoped>
@import "@/style/index.less";

.tab {
}

.tab-active {
  color: @theme-color !important;
}

.tab-active:hover {
  cursor: pointer;
  color: @theme-color !important;
}

.tab:focus {
  color: @theme-color;
}

.tab:hover {
  color: @theme-color;
  cursor: pointer;
}

.main-tab {
  padding-left: 10px;
  padding-right: 10px
}

.sub-tab {
  padding-left: 10px;
  padding-right: 10px;
  color: #a4a4a4;
}

.data-panel {
  flex: 1;
  background: white;
  padding-left: 3%;
  padding-right: 3%;
  padding-top: 20px;
  height: 100%;
  display: flex;
  flex-direction: column
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
</style>