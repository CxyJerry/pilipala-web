<script>
import {Poptip} from "view-ui-plus";
import {logout} from "@/api/user";
import PButton from "@/components/p-button.vue";
import {store} from "@/store";

export default {
  components: {PButton, Poptip},
  data() {
    return {
      user_info: {},
    }
  },
  methods: {
    init_user_info() {
      this.user_info = store.state.user_info
    },
    logout() {
      logout()
      store.commit('set_user_info', null)
      this.$router.go(0)
    },
    login() {
      store.commit('set_login_modal_visible', true)
    }
  },
  mounted() {
    this.init_user_info()
  }
}

</script>

<template>
  <div class="avatar">
    <Poptip trigger="hover" placement="bottom"
            style="display: flex;justify-content: center;align-items: center;min-width: 15%;max-width: 30%">
      <!--  头像  -->
      <div class="avatar-img" @click="this.$router.push(`/sphere/${user_info.uid}`)">
        <!--    实际头像    -->
        <img :src="`/api/${user_info.avatar}`" style="width: 50px;height: 50px" alt="" v-if="user_info&&user_info.avatar">
        <!--    候补头像    -->
        <div
            style="display: flex;justify-content: center;align-items: center;background-color: white;border-radius: 9999px"
            v-else>
          <svg t="1698170965279" class="icon" viewBox="0 0 1034 1024" version="1.1"
               xmlns="http://www.w3.org/2000/svg" p-id="3884" width="38" height="38">
            <path
                d="M977.92 512.47616C977.92 766.68416 771.59936 972.8 517.0688 972.8 262.57408 972.8 56.32 766.68416 56.32 512.47616c0-195.1232 121.46176-361.8304 292.99712-428.82048C401.14176 62.7456 457.76384 51.2 517.08416 51.2c59.392 0 115.96288 11.53536 167.84384 32.45568C856.448 150.65088 977.92 317.35808 977.92 512.47616zM339.968 415.40096c0 77.57312 39.75168 144.73216 97.536 177.6128 23.9616 13.63456 50.944 21.49376 79.5648 21.49376 27.62752 0 53.66784-7.35232 77.0048-20.06016 59.14624-32.24576 100.17792-100.22912 100.17792-179.03616 0-109.7216-79.4624-199.03488-177.1776-199.03488-97.65376-0.01024-177.1008 89.29792-177.1008 199.01952z m178.97472 527.56992c134.62528 0 254.72-61.90592 333.43488-158.7968-9.29792-76.42624-83.77344-141.48608-189.184-173.93664-39.808 35.80928-90.67008 57.35424-146.13504 57.35424-56.69376 0-108.5952-22.7072-148.79232-60.07296-102.53312 29.2608-177.63328 88.94976-195.24608 160.47104 78.11072 106.10688 204.0064 174.98112 345.92256 174.98112z"
                fill="#bfbfbf" p-id="3885"></path>
          </svg>
        </div>
      </div>
      <!--   弹窗内容   -->
      <template #title>
        <div v-if="user_info" @click="this.$router.push(`/sphere/${user_info.uid}`)">
          <!--    用户名    -->
          <div class="pop-menu">
            <div class="username">{{ user_info.nickName }}</div>
          </div>
          <!--    关注/被关注信息    -->
          <div style="display: grid;grid-template-columns: repeat(2,1fr);color: black">
            <div style="display: flex;flex-direction: column;align-items: center;justify-content: center">
              <div style="font-size: large">{{ user_info.followCount }}</div>
              <div style="color: #9b9b9b;font-size: small">关注</div>
            </div>
            <div style="display: flex;flex-direction: column;align-items: center;justify-content: center">
              <div style="font-size: large">{{ user_info.fansCount }}</div>
              <div style="color: #9b9b9b;font-size: small">粉丝</div>
            </div>
          </div>
        </div>

      </template>

      <template #content>
        <!--    退出登录    -->
        <div style="display: flex;flex-direction: row;align-items: center;justify-content: center" @click="logout"
             v-if="user_info">
          <svg t="1698404596556" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="2340" width="16" height="16">
            <path
                d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5-32.6 32.5-70.5 58.1-112.7 75.9-43.6 18.4-90 27.8-137.9 27.8-47.9 0-94.3-9.4-137.9-27.8-42.2-17.8-80.1-43.4-112.7-75.9-32.6-32.5-58.1-70.4-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-0.4-12.3-6.7-12.3z"
                p-id="2341" fill="#8a8a8a"></path>
            <path
                d="M956.9 505.7L815 393.7c-5.3-4.2-13-0.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112c4.1-3.2 4.1-9.4 0-12.6z"
                p-id="2342" fill="#8a8a8a"></path>
          </svg>
          <div style="margin-left: 5%;color: black;font-size: small">退出登录</div>
        </div>
        <!--    去登录    -->
        <div v-else>
          <p-button class="to_login" @click="login">
            <template v-slot:content>
              登录
            </template>
          </p-button>
        </div>
      </template>
    </Poptip>
  </div>
</template>

<style lang="less" scoped>
@import "@/style/index.less";

.avatar {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 360px;
  background: white;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-img {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes jump {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes scaleUp {
  0% {
    scale: 100%;
  }
  100% {
    scale: 150%
  }
}

.avatar:hover {
  fill: @theme-color;
  border: @theme-color 1px solid;
  cursor: pointer;

  .avatar-img {
    scale: 150%;
    animation: scaleUp 0.3s ease;
  }
}

.pop-menu {
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10%;
}

.username {
  font-size: 18px;
}

.to_login {
  color: black;
}

.to_login:hover {
  color: @theme-color
}
</style>