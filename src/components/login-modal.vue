<script>
import {Button, Form, FormItem, Input} from 'view-ui-plus';
import {code, login} from "@/api/user";
import {store} from "@/store";
import PhoneLogin from "@/components/phone-login.vue";
import EmailLogin from "@/components/email-login.vue";

export default {
  components: {EmailLogin, PhoneLogin, FormItem, Form, Button, Input},
  data() {

    return {
      value: '',
      modal: {
        show: false,
      },

    }
  },
  methods: {
    init_modal_show() {
      this.modal.show = store.state.login_modal_visible
    },
    invisible_login_modal(visible) {
      if (!visible) {
        this.modal.show = false
        store.commit('set_login_modal_visible', false)
      }

    }
  },
  watch: {
    '$store.state.login_modal_visible'() {
      this.modal.show = this.$store.state.login_modal_visible
    }
  },
  mounted() {
    this.init_modal_show()
  }
}
</script>

<template>
  <Modal
      title="Title"
      v-model="modal.show"
      :footer-hide="true"
      @on-visible-change="invisible_login_modal"
      @on-cancel="invisible_login_modal"
      class-name="vertical-center-modal">
    <template #header>
      <p class="notify">PiliPala 登录</p>
    </template>
    <div class="container">
      <div class="title">
        欢迎登录 PiliPala
      </div>
      <Tabs value="手机号登录">
        <TabPane label="手机号登录" name="手机号登录">
          <phone-login/>
        </TabPane>
        <TabPane label="邮箱登录" name="邮箱登录">
          <email-login/>
        </TabPane>
      </Tabs>

    </div>

  </Modal>
</template>

<style lang="less" scoped>
@import "@/style/index.less";

.notify {
  color: @theme-color;
}

.title {
  font-size: 30px;
  text-align: center;
  padding: 10px;
}

.container {
  color: @theme-color;
  justify-content: center;
  padding: 20px;
  align-items: center;
}

.input {
  margin: 5px
}
</style>