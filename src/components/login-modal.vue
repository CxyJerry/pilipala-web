<script>
import {Button, Form, FormItem, Input} from 'view-ui-plus';
import {code, login} from "@/api/user";
import {store} from "@/store";

export default {
  components: {FormItem, Form, Button, Input},
  data() {
    const phonePattern = /^[1][3,4,5,6.7,8,9][0-9]{9}$/
// let num = 18045216903
// console.log(res.test(num))
    const phone_validator = (rule, value, callback) => {
      if (!value || value.length !== 11 || !phonePattern.test(value)) {
        callback(new Error('请输入正确的手机号'))
      }
      callback()
    }
    const code_validator = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入验证码'))
      }
      callback()
    }
    return {
      value: '',
      modal: {
        show: false,
        tel: '',
        code: '',
        code_btn: {
          disable: false,
          content: '发送验证码'
        }
      },
      validate_rules: {
        tel: [{validator: phone_validator, trigger: 'blur'}],
        code: [{validator: code_validator, trigger: 'blur'}]
      }
    }
  },
  methods: {
    login() {
      this.$refs["login-form"].validate(valid => {
        if (valid) {
          login(this.modal.tel, this.modal.code)
              .then(res => {
                this.modal.tel = ''
                this.modal.code = ''
                this.$router.go(0)
              })
        } else {
          this.$Message.error('请正确填写表单')
        }
      })

    },
    send_code() {
      code(this.modal.tel).then(res => {
        let loop = setInterval(() => {
          if (count > 0) {
            this.modal.code_btn.content = `(${count})s后可重新发送`
            this.modal.code_btn.disable = true
            count -= 1;
          } else {
            this.modal.code_btn.content = '发送验证码'
            this.modal.code_btn.disable = false
            clearInterval(loop)
          }
        }, 1000)
        this.$Message.success('验证码已发送')
        let count = 60

      })
    },
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
      <Form ref="login-form" :model="modal" :rules="validate_rules">
        <div>
          <FormItem prop="tel">
            <Input placeholder="手机号" class="input" v-model="modal.tel" type="text"/>
          </FormItem>

          <FormItem prop="code">
            <div style="display: flex;flex-direction: row;justify-content: center;align-items: center">
              <Input placeholder="验证码" class="input" v-model="modal.code" type="text"/>
              <Button :disabled="modal.code_btn.disable" @click="send_code">{{ modal.code_btn.content }}</Button>
            </div>
          </FormItem>


          <div style="padding: 10px;display: flex;justify-content: center;align-items: center">
            <Button style="width: 30%" type="primary" @click="login">登录</Button>
          </div>
        </div>
      </Form>
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