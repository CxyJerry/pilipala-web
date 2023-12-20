<script>
import PButton from "@/components/p-button.vue";
import {store} from "@/store";
import {send_comment} from "@/api/comment";
import Editor from "@tinymce/tinymce-vue";

import Quill from "quill";
import "quill-mention/dist/quill.mention.min.css";
import mention from "quill-mention"; // 引入mention 组件
import {search} from "@/api/search";

export default {
  name: "atable-input",
  components: {PButton, Editor},
  watch: {
    '$store.state.reply_comment': {
      immediate: true,
      handler: function (comment_info, old) {
        console.log(comment_info)
        this.parent = comment_info
      }
    }
  },
  props: {
    cid: String
  },
  data() {
    return {
      parent: null,
      user_list: [],
      timeout: null,
    }
  },
  methods: {
    cancel_reply() {
      this.comment = {
        parent: null,
        content: ''
      }
      store.commit('set_reply_comment', null)
    },
    send_comment() {
      console.log(this.parent)
      let parent_id = this.parent ? this.parent.comment.id : null
      let content = this.get_content_text()
      console.log(content)
      send_comment(this.cid, parent_id, content)
          .then(res => {
            // 触发父组件的事件，更新评论列表，需要回传父评论ID以及评论信息
            this.$emit('on-comment-send', this.parent ? this.parent.comment : null, res.data)
            this.cancel_reply()
            this.clear()
            this.$Message.success('已发送')
          })
    },
    // 获取输入框的文本内容
    get_content_text() {
      let tempElement = document.createElement('div');
      tempElement.innerHTML = this.$refs.editor.innerHTML;

      let mentions = tempElement.querySelectorAll('.mention');

      mentions.forEach(function (mention) {
        let dataId = mention.getAttribute('data-id');
        let replacement = document.createElement('span');
        replacement.textContent = ` @${dataId} `
        mention.parentNode.replaceChild(replacement, mention);
      });

      let outer_divs = tempElement.querySelectorAll('.ql-editor')
      if (outer_divs.length > 0) {
        outer_divs.forEach(div => {
          div.removeAttribute('class')
          div.removeAttribute('data-gramm')
          div.removeAttribute('contenteditable')
          div.removeAttribute('aria-owns')
          div.removeAttribute('data-placeholder')
        })
      }

      let div = tempElement.querySelector('.ql-clipboard')
      if (div) {
        div.parentNode.removeChild(div)
      }
      return tempElement.innerText
    },
    // 清除输入框内容
    clear() {
      const element = document.getElementsByClassName("ql-editor")[0];
      element.textContent = "";
    },
  },

  mounted() {
    new Quill(this.$refs.editor, {
      placeholder: "评论千万条，等你发一条",
      modules: {
        mention: {
          allowedChars: /^[A-Za-z\sÅÄÖåäö\u4e00-\u9fa5]*$/,
          mentionDenotationChars: ["@"], // 通过@拉起人员框
          positioningStrategy: "fixed",
          // 人员框渲染内容
          renderItem: (data) => {
            return data.value;
          },
          // 加载人员框loading
          renderLoading: () => {
            return "";
          },
          source: (searchTerm, renderList, mentionChar) => {
            if (this.timeout) {
              clearTimeout(this.timeout);
            }
            this.timeout = setTimeout(() => {
              if (searchTerm.length === 0 || searchTerm.trim() === 0) {
                return []
              }
              search('用户', searchTerm, 1, 20).then(res => {
                this.user_list = []
                for (let i of res.data.page[0].result) {
                  this.user_list.push({
                    id: i.uid,
                    value: i.nickName
                  })
                }
                renderList(this.user_list);
              })
            }, 500)
          },
        },
      },
    });
  },
  beforeUnmount() {
    store.commit('set_reply_comment', null)
  },
}
</script>

<template>
  <div style="display:flex;flex-direction: column;width: 100%;position: relative">
    <div style="width: 100%;display: flex;flex-direction: row;align-items: center">
      <div class="comment-input-container">
        <div v-show="parent&&parent.comment.author.nickName.length>0"
             style="display: flex;flex-direction: row;align-items: center">
          <div style="flex: 1">
            <div>
              <span>@{{ parent ? parent.comment.author.nickName : '' }}: </span> 说：
              <span v-html="parent ? parent.comment.content : ''"></span>
            </div>
            <div>
              回复:<span>@{{ parent ? parent.comment.author.nickName : '' }}: </span>
            </div>
          </div>
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
        <div style="flex: 1;display: flex">
          <div class="input-container" ref="editor"></div>
        </div>
      </div>
      <div style="width: 10%">
        <p-button @click="send_comment"
                  type="primary">
          <template v-slot:content>发布</template>
        </p-button>
      </div>
    </div>
  </div>


</template>

<style scoped lang="less">
@import "@/style/index.less";

.comment-input-container {
  border: 1px solid #dedede;
  line-height: 30px;
  background: #ebebeb;
  border-radius: 5px;
  margin-left: 10px;
  margin-right: 10px;
  font-size: small;
  flex: 1;
  flex-direction: row;
  overflow: hidden;
  padding: 0 10px;
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

.input-container {
  position: relative;
  display: flex;
  flex: 1;
  border: none;
  outline: none;
  border-radius: 5%;
  min-width: 200px;
}

.input-container /deep/ .ql-editor {
  outline: none;
  padding: 10px;
  font-size: 14px;
  line-height: 1.5;
  display: flex;
  flex: 1;
}

</style>