<script>
import {code, login} from "@/api/user";

export default {
  name: "phone-login",
  data() {
    const phonePattern = /^[1][3,4,5,6.7,8,9][0-9]{9}$/
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
      form: {
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
      this.$refs["tel-login-form"].validate(valid => {
        if (valid) {
          login(this.form.tel, this.form.code)
              .then(res => {
                this.form.tel = ''
                this.form.code = ''
                this.$router.go(0)
              })
        } else {
          this.$Message.error('请正确填写表单')
        }
      })

    },
    send_code() {
      this.$refs['tel-login-form'].validateField('tel', has_error => {
        this.form.code_btn.disable = true
        if (!has_error) {
          code(this.form.tel).then(res => {
            let loop = setInterval(() => {
              if (count > 0) {
                this.form.code_btn.content = `(${count})s后可重新发送`
                count -= 1;
              } else {
                this.form.code_btn.content = '发送验证码'
                this.form.code_btn.disable = false
                clearInterval(loop)
              }
            }, 1000)
            this.$Message.success('验证码已发送')
            let count = 60
          }).catch(err => {
            this.form.code_btn.disable = false
          })
        }
      })

    },
  }
}
</script>

<template>
  <Form ref="tel-login-form" :model="form" :rules="validate_rules">
    <div>
      <FormItem prop="tel">
        <Input placeholder="手机号" class="input" v-model="form.tel" type="text"/>
      </FormItem>

      <FormItem prop="code">
        <div style="display: flex;flex-direction: row;justify-content: center;align-items: center">
          <Input placeholder="验证码" class="input" v-model="form.code" type="text"/>
          <Button :disabled="form.code_btn.disable" @click="send_code">{{ form.code_btn.content }}</Button>
        </div>
      </FormItem>
      <div style="padding: 10px;display: flex;justify-content: center;align-items: center">
        <Button style="width: 30%" type="primary" @click="login">登录</Button>
      </div>
    </div>
  </Form>
</template>

<style scoped lang="less">

</style>