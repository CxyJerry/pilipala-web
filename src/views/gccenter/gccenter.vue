<script>

import {store} from "@/store";

export default {
  computed: {
    store() {
      return store
    }
  },
  data() {
    return {
      menus: [
        // {
        //   icon: require("../../assets/home.png"),
        //   name: '首页',
        //   path: '/gccenter/home',
        //   active: true
        // },
        {
          icon: require("../../assets/content_manager.png"),
          name: '创作申请',
          path: '/gccenter/_apply',
        },
        {
          icon: require("../../assets/content_manager.png"),
          name: '内容管理',
          path: '/gccenter/cmanager/vod-manager',
        },
        {
          icon: require("../../assets/content_manager.png"),
          name: '内容审核',
          path: '/gccenter/review',
        }
      ]
    }
  },
  methods: {
    menu_clicked_handler(menu) {
      this.menus.forEach(m => m.active = false)
      menu.active = true
      this.$router.push(menu.path)
    },
    check_menu() {
      let cur_path = this.$router.currentRoute.value.path
      for (let m of this.menus) {
        m.active = !!cur_path.startsWith(m.path);
      }
      this.menus = this.menus.filter(m => store.state.accessible_paths.includes(m.path))
      if (store.state.accessible_paths.includes('/gccenter/gcupload/upload')) {
        this.menus = this.menus.filter(m => m.path !== '/gccenter/_apply')
      }
    }
  },
  mounted() {
    this.check_menu()

  }
}
</script>

<template>
  <div style="width: 100%;min-height:100%;background: #f5f7f9;display: flex;flex-direction: column;flex: 1">
    <div class="header-style">
      <div><span class="home-btn" @click="this.$router.push('/')"><b>PiliPala 创作中心</b></span></div>
      <div style="text-align: end;flex: 1">用户信息</div>
    </div>
    <div class="body-style">
      <div class="nav-style">
        <div class="post-btn" v-if="store.state.accessible_paths.includes('/gccenter/gcupload/upload')"
             @click="this.$router.push('/gccenter/gcupload/upload')">
          <div style="width: 20px;margin: 2%">
            <img :src="require('../../assets/upload.png')" style="width: 20px;" alt=""/>
          </div>
          <span>
            投稿
          </span>
        </div>
        <div style="margin-top: 10px">
          <div :class="{'nav-item-style':!menu.active,'nav-active-item-style':menu.active}" v-for="menu in menus"
               @click="menu_clicked_handler(menu)">
            <div><img :src="menu.icon" style="width: 18px" alt=""/></div>
            <div style="visibility: hidden;width: 20px">&nbsp;&nbsp;</div>
            <div><span>{{ menu.name }}</span></div>
          </div>
        </div>

      </div>
      <div style="flex: 1;display: flex;justify-content: center;align-items: center">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "@/style/index.less";

.header-style {
  display: flex;
  flex-direction: row;
  width: 100%;
  line-height: 20px;
  padding: 20px;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.body-style {
  display: flex;
  flex-direction: row;
  flex: 1
}

.nav-style {
  margin-top: 1px;
  width: 200px;
  background: #ffffff;
  min-height: 100%;
  padding: 30px 30px 0 30px;
}

.nav-item-style {
  display: flex;
  flex-direction: row;
  padding: 15px 0 0 0;
}

.nav-active-item-style {
  display: flex;
  flex-direction: row;
  padding: 15px 0 0 0;
  color: @theme-color;
}

.nav-item-style:hover {
  cursor: pointer;
}


.post-btn {
  border-radius: 3px;
  background: @theme-color;
  color: white;
  line-height: 30px;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
}

.post-btn:hover {
  cursor: pointer;
}

.home-btn {
  color: @theme-color;
  font-size: 25px;
  margin-left: 15px;
  padding: 5px
}

.home-btn:hover {
  cursor: pointer;
}
</style>