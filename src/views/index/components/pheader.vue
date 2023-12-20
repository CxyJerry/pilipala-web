<script>
import Commonheader from "@/components/commonheader.vue";
import SearchInput from "@/components/search-input.vue";
import JumpButton from "@/components/jump-button.vue";
import Logo from "@/components/logo.vue";
import PButton from "@/components/p-button.vue";
import PAvatar from "@/components/p-avatar.vue";
import MessageJumpButton from '@/components/message-jump-button.vue';

export default {
  components: {PAvatar, PButton, Logo, JumpButton, SearchInput, Commonheader, MessageJumpButton},
  data() {
    return {
      menus: [
        {
          name: "首页",
          path: "/",
        },
        {
          name: "番剧",
          path: "/partition/番剧",
        },
        {
          name: "游戏",
          path: "/partition/游戏",
        },
      ],
      channels: [
        {
          name: "番剧",
          path: "#",
        },
        {
          name: "国创",
          path: "#",
        },
        {
          name: "综艺",
          path: "#",
        },
        {
          name: "动画",
          path: "#",
        },
        {
          name: "鬼畜",
          path: "#",
        },
        {
          name: "舞蹈",
          path: "#",
        },
        {
          name: "娱乐",
          path: "#",
        },
        {
          name: "科技",
          path: "#",
        },
        {
          name: "美食",
          path: "#",
        },
        {
          name: "汽车",
          path: "#",
        },
        {
          name: "运动",
          path: "#",
        },
        {
          name: "VLOG",
          path: "#",
        },
        {
          name: "电影",
          path: "#",
        },
        {
          name: "电视剧",
          path: "#",
        },
        {
          name: "纪录片",
          path: "#",
        },
        {
          name: "游戏",
          path: "#",
        },
        {
          name: "音乐",
          path: "#",
        },
        {
          name: "影视",
          path: "#",
        },
        {
          name: "知识",
          path: "#",
        },
        {
          name: "资讯",
          path: "#",
        },
        {
          name: "生活",
          path: "#",
        },
        {
          name: "时尚",
          path: "#",
        },
        {
          name: "动物圈",
          path: "#",
        },
        {
          name: "更多",
          path: "#",
        },
      ],
      show_common_header: false,
      header_observer: null,

      search_content: "",
      unread_msg_count: 0,
    };
  },
  methods: {
    init_header_observer() {
      const main_header = this.$refs["main-header"];
      this.header_observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          this.show_common_header = !entry.isIntersecting;
        });
      });
      this.header_observer.observe(main_header);
    },
  },
  mounted() {
    this.init_header_observer();
  },
  beforeUnmount() {
    this.header_observer.unobserve(this.$refs["main-header"]);
  },

};
</script>

<template>
  <div ref="main-header" class="header">
    <!--  顶部菜单  -->
    <div class="header-bar">
      <logo/>
      <!--   操作栏   -->
      <div
          class="menu-item jump-text"
          v-for="menu in menus"
          :key="menu"
          @click="this.$router.push(menu.path)"
      >
        {{ menu.name }}
      </div>
      <!--   搜索框   -->
      <div
          style="flex: 1; display: flex; justify-content: center; font-size: 18px"
      >
        <SearchInput/>
      </div>
      <div style="display: flex; flex-direction: row; align-items: center">
        <!--    头像    -->
        <p-avatar/>
        <!--    消息    -->
        <message-jump-button class="message"></message-jump-button>
        <!--    创作中心    -->
        <jump-button @click="this.$router.push('/gccenter/')">
          <svg
              t="1697402898129"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="7529"
              width="22"
              height="22"
          >
            <path
                d="M512.051944 0.000347a364.040555 364.040555 0 0 0-364.474452 362.860352c0 84.072107 45.941137 166.616893 90.389664 246.454153a859.326624 859.326624 0 0 1 61.405267 124.684975c12.895453 35.961479 22.823043 69.215434 31.587786 98.581662C362.999249 939.493995 388.165342 1024 512.051944 1024s149.087407-84.245666 181.022312-190.91519c8.677963-29.244736 18.674977-62.377199 31.622498-98.390746a873.975026 873.975026 0 0 1 61.214352-124.459347c44.500595-80.201736 90.511156-163.145707 90.511155-247.356662A364.040555 364.040555 0 0 0 512.051944 0.000347z m0 954.454456c-35.996191 0-56.528252-8.851522-72.686619-32.97626h145.49473c-16.175723 24.142094-36.72514 32.993616-72.808111 32.993616z m96.446883-85.044039H415.743909a928.507346 928.507346 0 0 1-5.762167-17.355926h204.296608c-1.978576 6.109286-3.887727 11.854098-5.779523 17.33857z m21.451925-68.6774a26.172737 26.172737 0 0 0-6.213422-0.833085H394.101069c-3.349694-11.142505-6.820879-22.562704-10.639183-34.711852H640.867629c-3.939795 12.35742-7.49776 24.124738-10.916877 35.527581z m94.867493-224.082365a1081.170074 1081.170074 0 0 0-59.565539 118.992231H359.198301a1057.11476 1057.11476 0 0 0-60.103573-120.050942c-40.126902-72.079162-81.572854-146.60551-81.572853-212.696877a294.582137 294.582137 0 0 1 589.146919 0c-0.052068 66.264927-41.619511 141.225172-81.850549 213.738232zM500.371406 142.839621A215.66474 215.66474 0 0 0 284.51575 357.792768a34.902768 34.902768 0 0 0 69.805536 0 145.911273 145.911273 0 0 1 146.05012-145.442662 34.76392 34.76392 0 1 0 0-69.527841z"
                p-id="7530"
            ></path>
          </svg>
        </jump-button>

        <!--    投稿    -->
        <p-button
            style="margin-left: 10px"
            size="normal"
            type="pink"
            jumpable
            @click="this.$router.push('/gccenter/gcupload/upload')"
        >
          <template v-slot:icon>
            <img
                src="@/assets/upload.png"
                style="width: 20px; height: 20px; margin: 5px"
                alt=""
            />
          </template>
          <template v-slot:content>
            <span>投稿</span>
          </template>
        </p-button>
      </div>
    </div>
    <!--  渠道  -->
    <!--    <div class="header-channel">-->
    <!--      <div class="header-channel-container">-->
    <!--        <div class="channel-item" v-for="channel in channels" @click="this.$router.push(channel.path)">-->
    <!--          {{ channel.name }}-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
  <div ref="common-header" v-show="show_common_header">
    <commonheader/>
  </div>
</template>

<style lang="less" scoped>
@import "@/style/index.less";

.header {
  justify-content: center;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  height: 120px;
  background-image: url("@/assets/sky.webp");
}

.header-bar {
  color: white;
  display: flex;
  flex-direction: row;
  padding: 20px;
  align-items: center;
}

.header-banner {
  color: white;
  padding-top: 30px;
  padding-left: 50px;
  padding-bottom: 20px;
  position: relative;

  top: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: end;
}

.header-banner:hover {
  cursor: pointer;
}

.header-channel {
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 1%;
}

.header-channel-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}

.channel-item {
  line-height: 14px;
  padding: 10px 25px;
  margin: 5px;
  background: #f3f3f3;
  border-radius: 5px;
  justify-content: space-between;
  text-align: center;
}

.channel-item:hover {
  cursor: pointer;
  background: #e5e5e5;
}

.menu-item {
  font-size: 15px;
  min-width: 50px;
  text-align: center;
}

.menu-item:hover {
  cursor: pointer;
}

.jump-text {
  transition: all 0.3s ease;
  cursor: pointer;
}

@keyframes jump {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.jump-text:hover {
  animation: jump 0.5s ease;
}

.opera {
  fill: @theme-color;
  background-color: white;
}

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

.message {
  fill: @theme-color !important;
}
</style>
