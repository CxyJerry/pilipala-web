<script>
import Commonheader from "@/components/commonheader.vue";
import {page, unread_count} from "@/api/msg";
import SystemPanel from "@/views/message/components/system-panel.vue";
import ReplyPanel from "@/views/message/components/reply-panel.vue";
import AtPanel from "@/views/message/components/at-panel.vue";
import LikePanel from "@/views/message/components/like-panel.vue";
import WhisperPanel from "@/views/message/components/whisper-panel.vue";

export default {
  name: "message",
  components: {WhisperPanel, LikePanel, AtPanel, ReplyPanel, SystemPanel, Commonheader},
  data() {
    return {
      menus: [
        {
          name: '回复我的',
          value: 'reply'
        },
        {
          name: '@ 我的',
          value: 'at'
        },
        {
          name: '收到的赞',
          value: 'like'
        },
        {
          name: '系统通知',
          value: 'system'
        },
        // {
        //   name: '我的消息',
        //   value: 'whisper'
        // }
      ],
      selected_menu: null,
      unread_count_map: {}
    }
  },
  methods: {
    selected(menu) {
      if (this.selected_menu === menu) {
        return
      }
      this.selected_menu = menu
      this.big_message_card_animation()
    },
    get_unread_msg_count() {
      unread_count().then((res) => {
        for (let unread of res.data) {
          this.unread_count_map[unread.type] = unread.count
        }
      });
    },
    big_message_card_animation() {
      let keyframes = [
        {
          opacity: 0,
          position: 'relative',
          transform: 'rotateX(-180deg)',
          top: '0'
        },
        {
          opacity: 0.5,
          position: 'relative',
          top: '20%'
        },
        {
          opacity: 1,
          position: 'relative',
          transform: 'rotateX(0deg)',
          top: '0'
        },
      ]
      let options = {
        duration: 200,
        iterations: 1,
        direction: 'normal',
        easing: 'ease-in-out'
      }
      this.$refs["big-message-card"].animate(keyframes, options)
    },
  },
  mounted() {
    this.selected(this.menus[3])
    this.get_unread_msg_count()
  }
}
</script>

<template>
  <div class="page">
    <img src="@/assets/star2.jpeg" alt="" class="background">
    <commonheader/>
    <div class="main">
      <!--    左侧菜单栏    -->
      <div class="menu-div">
        <div class="logo">
          <Icon style="margin-right: 5px" type="ios-paper-plane"/>
          消息中心
        </div>
        <div @click="selected(menu)"
             :class="{'menu':this.selected_menu!==menu,'selected-menu':this.selected_menu===menu}" v-for="menu in menus"
             :key="menu.name">
          <div style="position:relative;display: flex;flex-direction: row;align-items: center">
            <div :class="{'marker':this.selected_menu!==menu,'selected-marker':this.selected_menu===menu}"></div>
            <span>{{ menu.name }}</span>
            <div class="notification-badge" v-if="unread_count_map[menu.value] > 0">
              {{ unread_count_map[menu.value] > 99 ? '99+' : unread_count_map[menu.value] }}
            </div>
          </div>
        </div>
      </div>
      <!--   右侧内容栏   -->
      <div class="message-panel">
        <!--    标题栏    -->
        <div class="card">
          {{ selected_menu ? selected_menu.name : '' }}
        </div>
        <!--    消息栏    -->
        <div ref="big-message-card" style="margin-top: 1%;max-height: 90%;overflow-y: auto">
          <ReplyPanel v-if="selected_menu.value==='reply'"/>
          <AtPanel v-else-if="selected_menu.value==='at'"/>
          <LikePanel v-else-if="selected_menu.value==='like'"/>
          <SystemPanel v-else-if="selected_menu.value==='system'"/>
          <WhisperPanel v-else-if="selected_menu.value==='whisper'"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/style/index.less";

.page {
  height: 100vh;
  width: 100%;
  margin-bottom: -40px;
}

.background {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  opacity: 1;
}

.main {
  height: 100%;
  margin-left: 15%;
  margin-right: 15%;
  display: flex;
  flex-direction: row;
}

.menu-div {
  width: 20%;
  height: 100%;
  background-color: white;
  padding: 2%;
  display: flex;
  flex-direction: column;
  opacity: 0.8;
}

.menu {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  font-weight: bold;
  line-height: 40px;
}

.menu:hover {
  cursor: pointer;
  color: @theme-color;
}

.selected-menu {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  font-weight: bold;
  line-height: 40px;
  color: @theme-color;
  cursor: pointer;
}

.content-div {
  flex: 1;
}

.card {
  width: 100%;
  padding: 1% 2%;
  background: white;
  border-radius: 2px;
  color: #a1a1a1;
}

.message-panel {
  padding: 1%;
  flex: 1;
  background: rgba(255, 255, 255, 0.3);
}

.message-otherwise {
  display: flex;
  height: 100px;
  flex: 1;
  justify-content: center;
  align-items: center;
  color: #a1a1a1;
}

.logo {
  padding: 10px;
  font-weight: bolder;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  font-size: medium;
}

.notification-badge {
  position: absolute;
  width: 15px;
  height: 15px;
  top: 0;
  right: -18px;
  background-color: red;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: small;
}

.notification-badge::before {
  content: '';
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid #f00;
  bottom: 0;
  left: -15%;
  rotate: 128deg;
  position: absolute;
}

.marker {
  width: 3px;
  height: 3px;
  aspect-ratio: 1;
  border-radius: 100%;
  background: black;
  content: '';
  padding: 3px;
  margin: 5px 10px
}

.selected-marker {
  width: 3px;
  height: 3px;
  aspect-ratio: 1;
  border-radius: 100%;
  background: @theme-color;
  content: '';
  padding: 3px;
  margin: 5px 10px
}
</style>