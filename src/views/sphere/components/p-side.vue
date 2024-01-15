<script>
import {Divider} from "view-ui-plus";
import {user_info} from "@/api/user";

export default {
  name: "p-side",
  components: {Divider},
  props: {
    uid: String
  },
  data() {
    return {
      user: {}
    }
  },
  methods: {
    get_user_info() {
      user_info(this.uid).then(res => {
        this.user = res.data
      })
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
  </div>
  <div class="white-card">
    <div
        style="display: flex;flex-direction: row;justify-content: space-between;width: 100%;align-items: center;flex: 1">
      <div>
        个人资料
      </div>
      <div style="flex: 1;justify-content: flex-end;display: flex">
        <div class="modify-btn">修改资料</div>
      </div>
    </div>
    <Divider/>
    <div style="flex: 4">
      <p>UID: {{ user.uid }}</p>
      <p>昵称: {{ user.nickName }}</p>
    </div>
  </div>
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