<script>
import {Divider} from "view-ui-plus";
import {update_user_info, user_info} from "@/api/user";
import PCoverUpload from "@/views/gccenter/views/gcupload/views/upload/components/p-cover-upload.vue";
import {store} from "@/store";

export default {
  name: "p-side",
  components: {PCoverUpload, Divider},
  props: {
    uid: String
  },
  data() {
    const notBlank = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('该字段不得为空'));
      }
      callback();
    };
    return {
      user: {},
      modal: {
        visible: false,
        nickName: '',
        intro: '',
        avatar: '',
        announcement: '',
      },
      ruleCustom: {
        nickName: [
          {validator: notBlank, trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    get_user_info() {
      user_info(this.uid).then(res => {
        this.user = res.data
      })
    },
    open_modal() {
      let user_info = store.state.user_info;
      console.log('打开弹框', user_info)
      this.modal = {
        visible: true,
        nickName: user_info.nickName,
        intro: user_info.intro,
        avatar: user_info.avatar,
        announcement: user_info.announcement
      }
    },
    submit_update_info() {
      console.log(this.modal)
      update_user_info(this.modal.nickName,
          this.modal.avatar,
          this.modal.intro,
          this.modal.announcement)
          .then(res => {
            // this.$message.success('修改成功')
            this.close_modal()
            let user_info = res.data
            console.log('用户信息', user_info)
            store.commit('set_user_info', user_info)
          }).catch(err => {
        console.log(err)
      })
    },
    update_avatar_url(url) {
      this.modal.avatar = url
      console.log(url)
    },
    close_modal() {
      this.modal = {
        visible: false,
        nickName: '',
        intro: '',
        avatar: '',
        announcement: '',
      }
    }

  },
  watch: {
    uid: {
      immediate: true,
      handler: function () {
        this.get_user_info()
      }
    }
  }
}
</script>

<template>
  <div class="white-card">
    <div>
      公告
    </div>
    <div style="flex: 1;font-size: smaller;color: #acacac;padding: 5px">
      {{ user.announcement }}
    </div>
  </div>
  <div class="white-card">
    <div
        style="display: flex;flex-direction: row;justify-content: space-between;width: 100%;align-items: center;flex: 1">
      <div>
        个人资料
      </div>
      <div style="flex: 1;justify-content: flex-end;display: flex" @click="open_modal">
        <div class="modify-btn">修改资料</div>
      </div>
    </div>
    <Divider style="margin: 10px 0"/>
    <div style="flex: 4">
      <p style="padding: 5px 0">UID: {{ user.uid }}</p>
      <p style="padding: 5px 0">昵称: {{ user.nickName }}</p>
    </div>
  </div>
  <Modal
      v-model="modal.visible"
      title="用户信息修改"
      @on-ok="submit_update_info"
      @on-cancel="close_modal"
  >
    <Form ref="modal" :model="modal" :rules="ruleCustom" :label-width="80">
      <FormItem label="头像" prop="avatar">
        <p-cover-upload :fixed_number="[1,1]" :text="'上传头像'" :cover_url="modal.avatar"
                        @coverUpdate="update_avatar_url"/>
      </FormItem>
      <FormItem label="昵称" prop="nickName">
        <Input type="text" v-model="modal.nickName"></Input>
      </FormItem>
      <FormItem label="个性签名" prop="intro">
        <Input type="text" v-model="modal.intro"></Input>
      </FormItem>
      <FormItem label="公告" prop="announcement">
        <Input type="text" v-model="modal.announcement"></Input>
      </FormItem>
    </Form>
  </Modal>
</template>

<style scoped lang="less">
@import "@/style/index.less";

.white-card {
  background: white;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 8px 8px 0 #dddddd;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  min-height: 150px;
  margin-bottom: 10px;
}

.modify-btn {
  font-size: xx-small;
  border: #ebebeb solid 1px;
  border-radius: 5px;
  padding: 4px 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.modify-btn:hover {
  cursor: pointer;
  color: @theme-color;
}

p {
  font-size: smaller;
  color: #919191;
}
</style>