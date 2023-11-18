<script>
import Commonheader from "@/components/commonheader.vue";
import PreviewVideoCard from "@/components/vertical-preview-video-card.vue";
import {store} from "@/store";
import {search} from "@/api/search";
import PreviewUserCard from "@/components/preview-user-card.vue";
import {theme_color} from "@/style";

export default {
  components: {PreviewUserCard, PreviewVideoCard, Commonheader},
  data() {
    return {
      search_info: {
        type: '视频',
        content: '',
        order_by: "投稿时间",
        page_no: 1,
        page_size: 36,
        total: 0,
        page: [
          {
            type: 'video',
            result: []
          }
        ]
      },
      search_type: [
        "视频",
        "用户"
      ],
      order_by_types: [
        {
          value: "投稿时间",
          label: "投稿时间"
        },
        {
          value: "稿件名称",
          label: "稿件名称"
        }
      ]
    }
  },
  methods: {
    theme_color() {
      return theme_color
    },
    init_search() {
      this.search_info.content = store.state.search_content

    },
    search_(type) {
      this.search_info.type = type
      this.$route.query.key = type
      search(this.search_info.type, this.search_info.content, this.search_info.page_no, 36)
          .then(res => {
            this.search_info.page = res.data.page
            this.search_info.total = res.data.total
            console.log(this.search_info)
          })
    }
  },
  mounted() {
    this.init_search()
    this.search_("视频")
  },
  beforeUnmount() {
    store.commit('set_search_content', '')
  }
}


</script>

<template>
  <commonheader :searchable="false"/>
  <div class="main">
    <!--  搜索框  -->
    <div class="search-input">
      <Input style="width: 50%" v-model="search_info.content" search enter-button placeholder="搜索更多内容"
             @on-search="search_(this.search_info.type)"/>
    </div>
    <!--  操作栏  -->
    <div style="display: flex;flex-direction: row;align-items: center">
      <!--   搜索类型   -->
      <div style="display: flex;flex-direction: row;flex: 1;font-size: large">
        <div v-for="type in search_type" class="search-type"
             :style="{color:search_info.type===type?theme_color():'#5e5e5e'}" @click="search_(type)">
          <span>{{ type }}</span>
        </div>
      </div>
      <!--   排序方式   -->
      <!--      <div style="display: flex;flex-direction: row; align-items: center;font-size: small">-->
      <!--        <span style="white-space: nowrap;padding: 5px">按照</span>-->
      <!--        <Select v-model="search.order_by" size="small" style="font-size: small!important;">-->
      <!--          <Option v-for="type in order_by_types" :value="type.value" :key="type.value">{{ type.label }}</Option>-->
      <!--        </Select>-->
      <!--        <div style="white-space: nowrap;padding: 5px">排序</div>-->
      <!--      </div>-->

    </div>
    <div style="width: 100%;height: 1px;background: rgba(150,150,150,0.44)"></div>
    <!--  分割线  -->
    <!--  结果列表  -->
    <div v-for="result in search_info.page">
      <div v-if="result.type==='video'" class="video-panel">
        <preview-video-card :bvod="vod" v-for="vod in result.result"/>
      </div>
      <div v-if="result.type==='user'" class="video-panel">
        <preview-user-card :user="u" v-for="u in result.result"/>
      </div>
      <div v-if="search_info.total===0"
           style="height: 100%;width: 100%;display: flex;justify-content: center;align-items: center;color: rgba(192,192,192,0.87)">
        <div>这里啥也没有~</div>
      </div>
    </div>

  </div>
</template>

<style lang="less" scoped>
@import "@/style/index.less";
.main {
  display: flex;
  flex-direction: column;
  padding-left: 5%;
  padding-right: 5%;
  flex: 1;
}

.search-input {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10vh;
}

.search-type {
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-type:hover {
  cursor: pointer;
  color: @theme-color;
}

:deep(.ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value) {
  font-size: small;
}

.video-panel {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 10px 20px;
  margin-top: 10px;
}

</style>