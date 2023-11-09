<script>
import {store} from "@/store";
import PButton from "@/components/p-button.vue";
import {get_comment, send_comment} from "@/api/comment";
import PComment from "@/views/player/components/p-comment.vue";

export default {
  name: "p-comment-panel",
  components: {PComment, PButton},
  props: {
    cid: String,
  },
  data() {
    return {
      user_info: {},
      page: {
        data: [],
        no: 1,
        size: 36,
        total: 0
      },
      comment: {
        parent_comment_id: '',
        parent_comment_author_name: '',
        content: ''
      }
    }
  },
  methods: {
    send_comment() {
      send_comment(this.cid, this.comment.parent_comment_id, this.comment.content)
          .then(res => {
            if (this.comment.parent_comment_id && this.comment.parent_comment_id.length > 0) {
              this.comment.child.unshift(res.data)
            } else {
              this.page.data.unshift(res.data)
            }

            this.cancel_reply()
            this.$Message.success('已发送')
          })
    },
    get_comments() {
      if (!this.cid) {
        return
      }
      get_comment(this.cid, "", this.page.no, this.page.size)
          .then(res => {
            this.page.total = res.data.total
            this.page.data.push.apply(this.page.data, res.data.page)
          })
    },
    cancel_reply() {
      this.comment = {
        parent_comment_id: '',
        parent_comment_author_name: '',
        content: ''
      }
      store.commit('set_reply_comment', null)
    }
  },
  watch: {
    cid: {
      immediate: true,
      handler: function () {
        this.get_comments()
      }
    },
    '$store.state.reply_comment': {
      immediate: true,
      handler: function (comment_info, old) {
        console.log(comment_info)
        this.comment.parent_comment_id = comment_info.comment.id
        this.comment.parent_comment_author_name = comment_info.comment.author.nickName
        this.comment.child = comment_info.child
        store.commit('set_reply_comment', null)
      }
    }
  },
  mounted() {
    this.user_info = store.state.user_info
  },
  beforeUnmount() {
    store.commit('set_reply_comment', null)
  }
}
</script>

<template>
  <div class="container">
    <div style="font-size: 20px;padding: 10px;font-weight: bold">评论</div>
    <div style="padding: 5px;display: flex;flex-direction: row;align-items: center;width: 100%">
      <!--  头像  -->
      <div class="avatar-img">
        <!--    实际头像    -->
        <img :src="user_info.avatar" alt="" v-if="user_info&&user_info.avatar">
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
      <!--   评论输入区   -->
      <div style="width: 100%;display: flex;flex-direction: row;align-items: center">
        <div class="comment-input_container">
          <div v-show="comment.parent_comment_author_name.length>0"
               style="display: flex;flex-direction: row;align-items: center">
            <div style="flex: 1">回复: @{{ comment.parent_comment_author_name }}</div>
            <div style="display: flex;justify-content: end;align-items: center;" class="cancel-reply"
                 @click="cancel_reply">
              <svg t="1699102472468" class="icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" p-id="2325" width="16" height="16">
                <path
                    d="M512 928c-229.76 0-416-186.24-416-416s186.24-416 416-416 416 186.24 416 416-186.24 416-416 416zM702.752 390.688c7.808-7.808 7.808-20.512 0-28.32l-42.496-42.464c-7.808-7.808-20.512-7.808-28.32 0l-120.352 120.352-120.352-120.352c-7.808-7.808-20.512-7.808-28.32 0l-42.496 42.464c-7.808 7.808-7.808 20.512 0 28.32l120.384 120.384-120.384 120.32c-7.808 7.808-7.808 20.512 0 28.32l42.496 42.496c7.808 7.808 20.512 7.808 28.32 0l120.352-120.384 120.352 120.384c7.808 7.808 20.512 7.808 28.32 0l42.496-42.496c7.808-7.808 7.808-20.512 0-28.32l-120.384-120.32 120.384-120.384z"
                    p-id="2326"></path>
              </svg>
            </div>
          </div>

          <input v-model="comment.content" class="comment-input" @keyup.enter=send_comment
                 placeholder="评论千万条，等你发一条"/>
        </div>
        <div style="width: 10%">
          <p-button @click="send_comment"
                    :disable="comment.content.length===0"
                    type="primary">
            <template v-slot:content>发布</template>
          </p-button>
        </div>

      </div>
    </div>
    <div style="width: 100%">
      <!--   评论列表   -->
      <div style="display: flex;flex-direction: column;width: 100%;padding: 5px">
        <!--    空屏承包    -->
        <div v-if="page.data.length===0"
             style="height: 100px;display: flex;align-items: center;justify-content: center;color: #c0c0c0;width: 100%">
          这里是一片无人开拓的荒地~
        </div>
        <!--    列表    -->
        <p-comment :comment="comment" :cid="cid" v-for="comment in this.page.data"/>

      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/style/index.less";

.container {
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
}

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

.comment-input_container {
  border: 1px solid #dedede;
  line-height: 30px;
  background: #ebebeb;
  border-radius: 5px;
  padding: 0 10px;
  margin-left: 10px;
  margin-right: 10px;
  font-size: small;
  flex: 1;
  flex-direction: row;
}

.comment-input {
  outline: none;
  border-radius: 5px;
  border: none;
  background: #ebebeb;
  width: 100%;
}

.cancel-reply {
  fill: #8a8a8a;
}

.cancel-reply:hover {
  fill: @theme-color;
  cursor: pointer;
}
</style>