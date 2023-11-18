<script>
import {email_code, email_login} from "@/api/user";

export default {
  name: "email-login",
  data() {
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
    const email_validator = (rule, value, callback) => {
      if (!value || !emailPattern.test(value)) {
        callback(new Error('邮箱格式不合法'))
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
        email: '',
        code: '',
        code_btn: {
          disable: false,
          content: '发送验证码'
        }
      },
      validate_rules: {
        email: [{validator: email_validator, trigger: 'blur'}],
        code: [{validator: code_validator, trigger: 'blur'}]
      }
    }
  },
  methods: {
    login() {
      this.$refs["email-login-form"].validate(valid => {
        if (valid) {
          email_login(this.form.email, this.form.code)
              .then(res => {
                this.form.email = ''
                this.form.code = ''
                this.$router.go(0)
              })
        } else {
          this.$Message.error('请正确填写表单')
        }
      })

    },
    send_code() {
      this.$refs['email-login-form'].validateField('email', has_error => {
        if (!has_error) {
          this.form.code_btn.disable = true
          email_code(this.form.email).then(res => {
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
  <Form ref="email-login-form" :model="form" :rules="validate_rules">
    <div>
      <FormItem prop="email">
        <Input placeholder="邮箱" class="input" v-model="form.email" type="text"/>
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