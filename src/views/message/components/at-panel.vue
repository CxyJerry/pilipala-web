<script>
import {page} from "@/api/msg";

export default {
  name: "at-panel",
  data() {
    return {
      type: 'at',
      page: {
        no: 1,
        size: 10,
        data: [],
        total: 10
      },
      loading: false
    }
  },
  methods: {
    request_messages() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      page(this.type, this.page.no, this.page.size)
          .then((res) => {
            this.loading = false;
            this.page.total = res.data.total;
            this.page.data = this.page.data.concat(res.data.page);
          })
          .catch((err) => {
            this.loading = false;
          });
    },
    register_scroll_listener() {
      // 注册滚动事件
      window.addEventListener('scroll', e => {
        // 滚动到底部时加载更多
        let scrollHeight = document.documentElement.scrollHeight;
        let clientHeight = document.documentElement.clientHeight;
        let scrollTop = document.documentElement.scrollTop;
        if (scrollTop + clientHeight >= scrollHeight) {
          if (this.loading || this.page.no >= Math.ceil(this.page.total / this.page.size)) {
            return;
          }
          this.$Message.info('加载中...')
          this.page.no += 1
          this.request_messages()
        }
      });
    }
  },
  mounted() {
    this.register_scroll_listener()
    this.request_messages()
  }
}
</script>

<template>
  <div class="panel">
    <div v-if="page.total >0" class="card" v-for="message in page.data">
      <div v-html="message.content"></div>
      <div style="height: 1px;width: 100%;background: rgba(197,197,197,0.5)"></div>
    </div>
    <div class="message-otherwise" v-else>
      这里啥也没有~
    </div>
  </div>
</template>

<style scoped lang="less">
.panel {
  width: 100%;
  max-height: 90%;
  overflow-y: auto;
  padding: 1% 2%;
  background: white;
  border-radius: 2px;
  color: #a1a1a1;
  margin-bottom: 3px;
}

.card {
  width: 100%;
  padding: 1% 2%;
  background: white;
  border-radius: 2px;
  color: #a1a1a1;
  margin-bottom: 3px;
  font-size: small;
  line-height: 35px;
}
</style>