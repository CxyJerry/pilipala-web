<script>

export default {
  data() {
    return {
      menus: [
        {
          icon: require("../../assets/content_manager.png"),
          name: '权限管理',
          path: '/manage/permission',
        },
        {
          icon: require("../../assets/content_manager.png"),
          name: '角色管理',
          path: '/manage/role',
        },
        {
          icon: require("../../assets/content_manager.png"),
          name: '路径管理',
          path: '/manage/p-path',
        },
        {
          icon: require("../../assets/content_manager.png"),
          name: '用户管理',
          path: '/manage/user',
        },
        {
          icon: require("../../assets/content_manager.png"),
          name: '申请管理',
          path: '/manage/apply',
        },
        {
          icon: require("../../assets/content_manager.png"),
          name: '消息模板',
          path: '/manage/message-template',
        },


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
        if (cur_path.startsWith(m.path)) {
          m.active = true
        } else {
          m.active = false
        }
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
      <div><span class="home-btn" @click="this.$router.push('/')"><b>PiliPala 管理中心</b></span></div>
    </div>
    <div class="body-style">
      <div class="nav-style">

        <div style="margin-top: 10px">
          <div :class="{'nav-item-style':!menu.active,'nav-active-item-style':menu.active}" v-for="menu in menus"
               @click="menu_clicked_handler(menu)">
            <div><img :src="menu.icon" style="width: 18px" alt=""/></div>
            <div style="visibility: hidden;width: 20px">&nbsp;&nbsp;</div>
            <div><span>{{ menu.name }}</span></div>
          </div>
        </div>

      </div>
      <div style="flex: 1;display: flex;justify-content: center;align-items: center;padding: 1%">
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