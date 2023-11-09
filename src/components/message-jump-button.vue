<template>
  <Poptip trigger="hover" @on-popper-show="request_messages" :transfer="true">
    <jump-button class="pop">
      <svg
          t="1697402104703"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2357"
          :width="size"
          :height="size"
      >
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

    <template #content>
      <div class="list-content" ref="listContent" @scroll="handleScroll">
        <List>
          <ListItem v-for="msg in page.data">
            <ListItemMeta :title="msg.sender.nickName">
              <template #avatar>
                <div class="avatar-img">
                  <!--    实际头像    -->
                  <img
                      :src="msg.sender.avatar"
                      alt=""
                      v-if="msg.sender && msg.sender.avatar"
                  />
                  <!--    候补头像    -->
                  <div
                      style="
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      background-color: white;
                      border-radius: 9999px;
                    "
                      v-else
                  >
                    <svg
                        t="1698170965279"
                        class="icon"
                        viewBox="0 0 1034 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="3884"
                        width="38"
                        height="38"
                    >
                      <path
                          d="M977.92 512.47616C977.92 766.68416 771.59936 972.8 517.0688 972.8 262.57408 972.8 56.32 766.68416 56.32 512.47616c0-195.1232 121.46176-361.8304 292.99712-428.82048C401.14176 62.7456 457.76384 51.2 517.08416 51.2c59.392 0 115.96288 11.53536 167.84384 32.45568C856.448 150.65088 977.92 317.35808 977.92 512.47616zM339.968 415.40096c0 77.57312 39.75168 144.73216 97.536 177.6128 23.9616 13.63456 50.944 21.49376 79.5648 21.49376 27.62752 0 53.66784-7.35232 77.0048-20.06016 59.14624-32.24576 100.17792-100.22912 100.17792-179.03616 0-109.7216-79.4624-199.03488-177.1776-199.03488-97.65376-0.01024-177.1008 89.29792-177.1008 199.01952z m178.97472 527.56992c134.62528 0 254.72-61.90592 333.43488-158.7968-9.29792-76.42624-83.77344-141.48608-189.184-173.93664-39.808 35.80928-90.67008 57.35424-146.13504 57.35424-56.69376 0-108.5952-22.7072-148.79232-60.07296-102.53312 29.2608-177.63328 88.94976-195.24608 160.47104 78.11072 106.10688 204.0064 174.98112 345.92256 174.98112z"
                          fill="#bfbfbf"
                          p-id="3885"
                      ></path>
                    </svg>
                  </div>
                </div>
              </template>
              <template #description>
                <div class="content">
                  {{ msg.content }}
                </div>
              </template>
            </ListItemMeta>
          </ListItem>
        </List>
      </div>
    </template>
  </Poptip>
</template>

<script>
import JumpButton from "@/components/jump-button.vue";
import {store} from "@/store";
import {page} from "@/api/msg";
import {unread_count} from "@/api/msg";

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
        store.commit("set_unread_count", res.data);
      });
    },
    request_messages() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      if (this.page.data.length < this.page.total) {
        page(this.page.no, this.page.size)
            .then((res) => {
              this.loading = false;
              this.page.total = res.data.total;
              this.page.data = this.page.data.concat(res.data.page);
              this.get_unread_msg_count();
              this.page.no += 1;
            })
            .catch((err) => {
              this.loading = false;
            });
      }
    },
    handleScroll() {
      const listContent = this.$refs.listContent;
      const scrollHeight = listContent.scrollHeight;
      const clientHeight = listContent.clientHeight;
      const scrollTop = listContent.scrollTop;
      const scrollPercent = (scrollTop + clientHeight) / scrollHeight;
      if (scrollPercent >= 0.7) {
        this.request_messages();
      }
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
