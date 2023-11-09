<script>
import {format_date} from "@/utils/unit";
import {get_comment} from "@/api/comment";
import {store} from "@/store";

export default {
  name: "p-comment",
  methods: {
    format_date,
    show_child() {
      if (this.loading) {
        return
      }
      this.loading = true
      if (Math.max(0, (this.page.no - 1)) * this.page.size > this.page.total) {
        return;
      }
      get_comment(this.cid, this.comment.id, this.page.no, this.page.size)
          .then(res => {
            this.loading = false
            this.page.no += 1
            this.page.total = res.data.total
            this.page.data.push.apply(this.page.data, res.data.page)
          }).catch(err => {
        this.loading = false
      })
    },
    reply() {
      let comment_info = {
        comment: this.comment,
        child: this.page.data
      }
      store.commit('set_reply_comment', comment_info)
    }
  },
  data() {
    return {
      page: {
        no: 1,
        size: 36,
        data: [],
        total: 10
      },
      loading: false
    }
  },
  props: {
    comment: Object,
    cid: String
  },
  mounted() {
  }
}
</script>

<template>
  <div class="comment-container">
    <!--  头像  -->
    <div class="avatar-img">
      <!--    实际头像    -->
      <img :src="comment.author.avatar" alt="" v-if="comment.author&&comment.author.avatar">
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
    <div class="content">
      <div class="nickname">
        {{ comment.author.nickName }}
      </div>
      <div class="comment">
        {{ comment.content }}<span @click="reply">回复</span>
      </div>
      <div class="time">
        {{ format_date(comment.date) }}
      </div>
    </div>
  </div>
  <div style="margin-left: 5%">
    <div class="child-comment">
      <p-comment :comment="c" :cid="cid" v-for="c in page.data"
                 v-if="page.total>0"/>
    </div>

    <div class="show-reply" v-show="comment.hasChild&&(page.total - page.data.length>0)">
      <span @click="show_child">点击展开回复</span>
    </div>
  </div>

</template>

<style scoped lang="less">
@import "@/style/index.less";

.comment-container {
  display: flex;
  flex-direction: row;
  align-items: center;
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

.content {
  margin-left: 10px;
  padding: 5px;
  display: flex;
  flex-direction: column;
}

.time {
  font-size: small;
  color: #cdcdcd;
}

.comment {
  span {
    font-size: small;
    color: #cdcdcd;
    padding-left: 10px;
    padding-right: 10px;
  }

  span:hover {
    color: @theme-color;
    cursor: pointer;
  }
}

.show-reply {
  font-size: small;
  color: #cdcdcd;
  padding-left: 3%;

  span:hover {
    color: @theme-color;
    cursor: pointer;
  }
}

.nickname {
  color: @theme-pink;
  margin-bottom: 3%;
}

.child-comment {
  padding-left: 10px
}

</style>