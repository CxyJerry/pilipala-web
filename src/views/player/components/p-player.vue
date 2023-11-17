<script>
import PlayerOperator from "@/views/player/player-operator.vue";
import {get_danmaku, send_danmaku} from "@/api/danmaku";
import PDanmaku from "@/views/player/components/p-danmaku.vue";
import {theme_color} from "@/style";
import {dash} from "@/utils/player";
import DPlayer from "dplayer";
import {play_count_submit, thumbnails, time_update} from "@/api/vod";
import {store} from "@/store";
import PButton from "@/components/p-button.vue";
import PPlayerController from "@/views/player/components/p-player-controller.vue";

export default {
  computed: {
    store() {
      return store
    }
  },
  components: {PPlayerController, PButton, PDanmaku, PlayerOperator,},
  props: {
    cur_vod: {
      type: Object,
      default: {}
    },
    need_operation: {
      type: Boolean,
      default: true
    },
    need_danmaku: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      user_info: {},
      thumbnails: [],
      current_time: 0,
      stop: false,
      danmaku: {
        danmakus: [],
        speed: 'normal',
        fullscreen: false
      },
      player: null,
      playback_speed: [0.5, 0.75, 1, 1.25, 1.5, 2],
      show_operation_bar: false,
      close_operation_timeout_id: 0,
      in_operation: false,
      pre_update_time_event_tick: new Date().getTime(),
    }
  },
  methods: {
    send_danmaku(danmaku) {
      let hex_color = '0xfff'
      let digit_color = parseInt(hex_color, 16)
      let time = this.player.video.currentTime
      send_danmaku(store.state.user_info === null ? null : store.state.user_info.uid, digit_color, this.cur_vod.cid, danmaku.content, time, 0)
          .then(res => {
            this.$Message.success('已发送')
            // this.danmaku.danmakus.push([
            //       this.current_time,
            //       0,
            //       digit_color,
            //       store.state.user_info.uid,
            //       danmaku.content
            //     ]
            // )
          })
    },
    setup_realtime_sse() {
      if (!this.need_danmaku) {
        return
      }
      let that = this
      const event_source = new EventSource(`/api/danmaku/subscription/${this.cur_vod.cid}`)
      event_source.onopen = function (e) {
        console.log('建立连接')
        console.log(e)
      }
      event_source.onmessage = function (event) {
        console.log(event.data)
        let new_danmaku = JSON.parse(event.data)
        that.danmaku.danmakus.push(new_danmaku)
      }

      event_source.onerror = function (e) {
        console.log(e)
      }
    },
    setup_on_play() {
      if (!this.player) {
        return
      }
      this.player.on('play', e => {
        this.stop = false
      })
    },
    setup_on_pause() {
      if (!this.player) {
        return
      }
      this.player.on('pause', (e) => {
        this.stop = true
      })
    },
    setup_playing() {
      if (!this.player) {
        return
      }
      this.player.on('playing', e => {
        this.stop = false
      })
    },
    setup_time_update() {
      let canSubmitPlayCountLimit = 0
      // 播放时间更新
      this.player.on('timeupdate', () => {
        let time = this.player.video.currentTime
        // 修改当前时间，触发弹幕调整
        this.current_time = parseInt(time)
        let now = new Date().getTime()
        // 每2秒上报一次
        if (now - this.pre_update_time_event_tick >= 2000) {
          this.pre_update_time_event_tick = now
          time_update(this.cur_vod.bvId, this.cur_vod.cid, parseInt(time))
          canSubmitPlayCountLimit += 1
          // 视频连续上报10次播放时间，播放数+1
          if (canSubmitPlayCountLimit === 10) {
            play_count_submit(this.cur_vod.cid)
          }
        }
      })

    },
    fullscreen(full) {
      if (!full) {
        this.$refs.playerContainer.requestFullscreen()
      } else {
        document.exitFullscreen()
      }
    },
    init_player() {
      // 初始化状态下，cur_vod 没有数据，不需要获取缩略图，也不需要获取弹幕
      if (!this.cur_vod || !this.cur_vod.cid) {
        return
      }
      this.get_thumbnails()
      this.get_danmakus()

      let options = {
        container: document.getElementById('dplayer'),
        autoplay: true,
        theme: theme_color,
        mutex: false,
        lang: 'zh-cn',
        video: {
          quality: this.cur_vod.quality,
          defaultQuality: 0,
          customType: {
            dash: dash
          }
        },
      }
      this.player = new DPlayer(options);

      // 已看位置跳跃
      let seeked = false
      this.player.on('canplaythrough', () => {
        if (!seeked && this.cur_vod.offset) {
          seeked = true
          this.player.seek(this.cur_vod.offset)
        }
      })

      this.setup_time_update()

      this.setup_on_play()

      this.setup_on_pause()

      this.setup_playing()
    },

    get_danmakus() {
      get_danmaku(this.cur_vod.cid).then(res => {
        this.danmaku.danmakus = res.data
        this.setup_realtime_sse()
        this.$emit('danmaku-loaded', this.danmaku.danmakus)
      })
    },
    get_thumbnails() {
      thumbnails(this.cur_vod.cid).then(res => {
        this.thumbnails = res.data

      })
    },
    on_progress_change(percent) {
      let duration = this.player.video.duration
      this.player.seek(duration * percent)
    },
    operation_bar_show() {
      this.show_operation_bar = true
      this.close_operation_bar()
    },
    close_operation_bar() {
      this.close_operation_timeout_id = setTimeout(() => {
        if (this.in_operation) {
          clearTimeout(this.close_operation_timeout_id)
        } else {
          this.show_operation_bar = false
        }
      }, 5000)
    }

  },
  watch: {
    'cur_vod': {
      deep: true,
      immediate: true,
      handler: function () {
        if (this.player) {
          this.player.destroy()
        }
        this.init_player()
      }
    },
  },
  mounted() {
    this.operation_bar_show()
  }
}


</script>

<template>
  <div class="player-container" ref="playerContainer" @mouseover="operation_bar_show">
    <div style="background: black;flex: 1;position: relative">
      <!--   dplayer   -->
      <div id="dplayer" style="aspect-ratio: 16/9;">
      </div>
      <transition>
        <p-player-controller v-show="show_operation_bar" @mouseover="in_operation=true"
                             @mouseout="in_operation=false"
                             :stop="stop" :player="player"
                             :cur_video_play_time="current_time"
                             :qualities="cur_vod.quality"
                             :playback_speed="playback_speed"
                             @on-progress-change="on_progress_change"
                             @on-fullscreen-click="fullscreen"
                             @send-danmaku="send_danmaku"
        />
      </transition>

      <p-danmaku :danmakus="danmaku.danmakus"
                 :video_current_play_time="current_time" :stop="stop"
                 :speed="danmaku.speed"
                 :cur_uid="store.state.user_info?store.state.user_info.uid:null"/>
    </div>
    <!--   操作栏   -->
    <player-operator v-if="need_operation" @send="send_danmaku" :danmakuCount="danmaku.danmakus.length"
                     :vod="cur_vod"/>
  </div>
</template>

<style scoped lang="less">
.player-container {
  aspect-ratio: 16/9;
  min-width: 640px;
  max-width: 1920px;
  min-height: 360px;
  max-height: 1080px;
  display: flex;
  flex-direction: column;
  margin-bottom: 5%;
}

:deep(.dplayer-controller) {
  display: none;
}

</style>