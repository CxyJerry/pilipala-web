<template>
  <jump-button @click="$router.push('/message')">
    <svg t="1697402104703"
         class="icon"
         viewBox="0 0 1024 1024"
         version="1.1"
         xmlns="http://www.w3.org/2000/svg"
         p-id="2357"
         :width="size"
         :height="size">
      <path
          d="M128 224v512a64.810667 64.810667 0 0 0 64 64h640a64.810667 64.810667 0 0 0 64-64v-512H128z m0-64h768a64.810667 64.810667 0 0 1 64 64v512c-0.64 36.010667-13.141333 66.176-37.504 90.496-24.32 24.32-54.485333 36.821333-90.496 37.504h-640c-36.010667-0.64-66.176-13.141333-90.496-37.504-24.32-24.32-36.821333-54.485333-37.504-90.496v-512A64.810667 64.810667 0 0 1 128 160z m776.021333 64l-247.04 283.008c-18.645333 20.693333-40.490667 36.693333-65.493333 48a190.378667 190.378667 0 0 1-79.488 16.981333 190.378667 190.378667 0 0 1-79.488-16.981333 196.949333 196.949333 0 0 1-65.493333-48L119.978667 224h784z m-699.008 0l210.986667 240.981333c11.989333 13.994667 26.325333 24.661333 43.008 32 16.64 7.338667 34.346667 11.008 52.992 11.008 18.688 0 36.309333-3.669333 52.992-11.008 16.64-7.338667 30.976-18.005333 43.008-32l210.986667-240.981333H205.013333z"
          fill-opacity=".96"
          p-id="2358"
      ></path>
    </svg>
    <div class="notification-badge" v-if="unread_msg_count > 0">
      {{ unread_msg_count }}
    </div>
  </jump-button>
</template>

<script>
import JumpButton from "@/components/jump-button.vue";
import {store} from "@/store";
import {page, unread_count} from "@/api/msg";

export default {
  components: {JumpButton},
  props: {
    size: {
      type: Number,
      default: 22
    },
    fill: {
      type: String,
      default: 'rgb(78, 78, 78)'
    }
  },
  data() {
    return {
      unread_msg_count: 0,
      page: {
        no: 1,
        size: 36,
        total: 10,
        data: [],
      },
      loading: false,
    };
  },
  methods: {
    get_unread_msg_count() {
      unread_count().then((res) => {
        let count = 0;
        for (let unread of res.data) {
          count += unread.count
        }
        store.commit("set_unread_count", count);
      });
    },
  },
  mounted() {
    this.get_unread_msg_count();
  },
  watch: {
    "$store.state.unread_msg_count": {
      immediate: true,
      handler: function () {
        this.unread_msg_count = store.state.unread_msg_count;
      },
    },
  },
};
</script>

<style lang="less" scoped>
@import "@/style/index.less";

.notification-badge {
  position: absolute;
  width: 15px;
  height: 15px;
  top: -5px;
  right: -5px;
  background-color: red;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: small;
}

.pop {
  background: white;
}

.content {
  white-space: pre-wrap;
  overflow-wrap: break-word;
  width: 260px;
  font-size: small;
}

.list-content {
  overflow-y: scroll;
  max-height: 30vh;
}
</style>
