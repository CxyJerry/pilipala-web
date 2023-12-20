<script>
import SearchInput from "@/components/search-input.vue";
import JumpButton from "@/components/jump-button.vue";
import PButton from "@/components/p-button.vue";
import PAvatar from "@/components/p-avatar.vue";
import { store } from "@/store";
import MessageJumpButton from "./message-jump-button.vue";

export default {
  components: { PAvatar, PButton, JumpButton, SearchInput, MessageJumpButton },
  props: {
    searchable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      unread_msg_count: 0,
    };
  },
  methods: {},
  mounted() {
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

<template>
  <div style="height: 64px">
    <div class="header">
      <div class="header-container">
        <div class="index" @click="this.$router.push('/')">PiliPala</div>
        <div class="menu-item jump-text" @click="this.$router.push('/')">
          首页
        </div>
        <div class="menu-item jump-text" @click="this.$router.push('/partition/番剧')">
          番剧
        </div>
        <div class="menu-item jump-text" @click="this.$router.push('/partition/游戏')">
          游戏
        </div>
        <div style="flex: 1; display: flex; justify-content: center">
          <SearchInput v-show="searchable"></SearchInput>
        </div>
        <div style="display: flex; flex-direction: row; justify-content: center">
          <!--    头像    -->
          <div style="
              width: 45px;
              height: 45px;
              border-radius: 360px;
              background: white;
              margin-right: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
            ">
            <p-avatar />
          </div>
          <!--    消息    -->
          <message-jump-button :size="15" />


          <!--    创作中心    -->
          <jump-button @click="this.$router.push('/gccenter/')">
            <svg t="1697471086466" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="17913" width="15" height="15">
              <path
                d="M512.051944 0.000347a364.040555 364.040555 0 0 0-364.474452 362.860352c0 84.072107 45.941137 166.616893 90.389664 246.454153a859.326624 859.326624 0 0 1 61.405267 124.684975c12.895453 35.961479 22.823043 69.215434 31.587786 98.581662C362.999249 939.493995 388.165342 1024 512.051944 1024s149.087407-84.245666 181.022312-190.91519c8.677963-29.244736 18.674977-62.377199 31.622498-98.390746a873.975026 873.975026 0 0 1 61.214352-124.459347c44.500595-80.201736 90.511156-163.145707 90.511155-247.356662A364.040555 364.040555 0 0 0 512.051944 0.000347z m0 954.454456c-35.996191 0-56.528252-8.851522-72.686619-32.97626h145.49473c-16.175723 24.142094-36.72514 32.993616-72.808111 32.993616z m96.446883-85.044039H415.743909a928.507346 928.507346 0 0 1-5.762167-17.355926h204.296608c-1.978576 6.109286-3.887727 11.854098-5.779523 17.33857z m21.451925-68.6774a26.172737 26.172737 0 0 0-6.213422-0.833085H394.101069c-3.349694-11.142505-6.820879-22.562704-10.639183-34.711852H640.867629c-3.939795 12.35742-7.49776 24.124738-10.916877 35.527581z m94.867493-224.082365a1081.170074 1081.170074 0 0 0-59.565539 118.992231H359.198301a1057.11476 1057.11476 0 0 0-60.103573-120.050942c-40.126902-72.079162-81.572854-146.60551-81.572853-212.696877a294.582137 294.582137 0 0 1 589.146919 0c-0.052068 66.264927-41.619511 141.225172-81.850549 213.738232zM500.371406 142.839621A215.66474 215.66474 0 0 0 284.51575 357.792768a34.902768 34.902768 0 0 0 69.805536 0 145.911273 145.911273 0 0 1 146.05012-145.442662 34.76392 34.76392 0 1 0 0-69.527841z"
                p-id="17914"></path>
            </svg>
          </jump-button>
          <!--    投稿    -->
          <p-button style="margin-left: 10px" @click="this.$router.push('/gccenter/gcupload/upload')" :type="`pink`"
            size="normal" :jumpable="true">
            <template v-slot:icon>
              <img src="@/assets/upload.png" style="width: 20px; height: 20px; margin: 5px" alt="" />
            </template>
            <template v-slot:content>投稿</template>
          </p-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "@/style/index.less";

.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.index {
  color: @theme-color;
  font-size: 20px;
  line-height: 25px;
  font-family: "Source Han Sans CN Regular", serif;
}

.index:hover {
  cursor: pointer;
}

.header-container {
  display: flex;
  flex-direction: row;
  margin: 5px;
  justify-content: center;
  align-items: center;
}

.menu-item {
  text-align: center;
  min-width: 50px;
  line-height: 25px;
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

.post-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
  background: @theme-pink;
  padding: 0 30px;
  border-radius: 10px;
  margin-left: 10px;
  margin-right: 10px;
}

.post-btn:hover {
  cursor: pointer;
  background: #ff8ead;
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
</style>
