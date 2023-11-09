<script>
import PButton from "@/components/p-button.vue";
import {store} from "@/store";
import {follow, idles} from "@/api/fans";

export default {
  components: {PButton},
  props: {
    user: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      cur_user: {},
      idle_uid_list: [],
      button_class: {}
    }
  },
  methods: {
    init_idle_uid_list() {
      this.idle_uid_list = store.state.idle_list.map(user => user.uid)
    },
    init_cur_user() {
      this.cur_user = store.state.user_info
    },
    followed() {
      return this.idle_uid_list.includes(this.user.uid)
    },
    is_self() {
      return this.cur_user !== null ? this.user.uid === this.cur_user.uid : false
    },
    follow() {
      follow(this.user.uid)
          .then(res => {
            // 如果关注过，将这个 uid 从列表中删除
            if (this.followed()) {
              this.idle_uid_list = this.idle_uid_list.filter(e => e !== this.user.uid)
              this.$Message.success('已取消关注')
            }
            // 如果还没有关注过，将这个 uid 添加到列表中
            else {
              this.idle_uid_list.push(this.user.uid)
              this.$Message.success('已关注')
            }
            idles()
            store.commit('set_user_info', res.data)
          })
    },
    button_name() {
      if (this.is_self()) {
        return 'self'
      } else {
        return this.followed() ? '已关注' : '关注'
      }

    }
  },
  mounted() {
    this.init_idle_uid_list()
    this.init_cur_user()
  }
}


</script>

<template>
  <p-button type="primary" size="small" @click="follow"
            :class="{
        'follow-btn': !this.followed(),
        'unfollow-btn': this.followed(),
        'self-btn': this.is_self()
      }">
    <template v-if="!is_self()" v-slot:icon>
      <svg v-if="followed()" t="1698499488634" class="icon" viewBox="0 0 1024 1024" version="1.1"
           xmlns="http://www.w3.org/2000/svg"
           p-id="2388" width="12" height="12">
        <path
            d="M887.904 298.208c-12.864-12.064-33.152-11.488-45.216 1.408L415.936 753.984l-233.12-229.696c-12.608-12.416-32.864-12.288-45.28 0.32-12.416 12.576-12.256 32.864 0.352 45.248l256.48 252.672c0.096 0.096 0.224 0.128 0.32 0.224s0.128 0.224 0.224 0.32c2.016 1.92 4.448 3.008 6.784 4.288 1.152 0.672 2.144 1.664 3.36 2.144 3.776 1.472 7.776 2.24 11.744 2.24 4.192 0 8.384-0.832 12.288-2.496 1.312-0.544 2.336-1.664 3.552-2.368 2.4-1.408 4.896-2.592 6.944-4.672 0.096-0.096 0.128-0.256 0.224-0.352 0.064-0.096 0.192-0.128 0.288-0.224L889.28 343.424c12.16-12.832 11.488-33.088-1.376-45.216z"
            fill="#ffffff" p-id="2389"></path>
      </svg>
      <svg v-else t="1698410111417" class="icon" viewBox="0 0 1024 1024" version="1.1"
           xmlns="http://www.w3.org/2000/svg"
           p-id="3468" width="12" height="12">
        <path
            d="M874.666667 469.333333H554.666667V149.333333c0-23.466667-19.2-42.666667-42.666667-42.666666s-42.666667 19.2-42.666667 42.666666v320H149.333333c-23.466667 0-42.666667 19.2-42.666666 42.666667s19.2 42.666667 42.666666 42.666667h320v320c0 23.466667 19.2 42.666667 42.666667 42.666666s42.666667-19.2 42.666667-42.666666V554.666667h320c23.466667 0 42.666667-19.2 42.666666-42.666667s-19.2-42.666667-42.666666-42.666667z"
            fill="#ffffff" p-id="3469"></path>
      </svg>
    </template>
    <template v-slot:content>{{ button_name() }}</template>
  </p-button>
</template>

<style scoped lang="less">
@import "@/style/index.less";

.follow-btn {
  background: @theme-color;
}

.unfollow-btn {
  background: #969696;
}

.self-btn {
  color: white;
  pointer-events: none;
}
</style>