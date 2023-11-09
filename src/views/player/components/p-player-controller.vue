<script>
import PPlayerProgress from "@/views/player/components/p-player-progress.vue";
import {double_time_format} from "../../../utils/unit";
import PPopOperator from "@/components/p-pop-operator.vue";
import PAudioProgress from "@/views/player/components/p-volume-progress.vue";

export default {
  components: {PAudioProgress, PPlayerProgress, PPopOperator},
  props: {
    player: Object,
    cur_video_play_time: Number,
    qualities: Array,
    stop: false,
    playback_speed: {
      type: Array,
      default: [0.5, 0.75, 1, 1.25, 1.5, 2]
    },
  },
  data() {
    return {
      stop_play: true,
      show_options: false,
      active_quality_idx: 0,
      active_speed_rate_idx: 2,
      fullscreen: false,
      danmaku: {
        content: '',
        color: '#ffffff'
      }
    }
  },
  mounted() {
    this.stop_play = this.stop
  },
  watch: {
    stop: {
      immediate: true,
      handler: function () {
        this.stop_play = this.stop
      }
    }
  },
  methods: {
    double_time_format,
    on_progress_change(percent) {
      this.player.seek(this.player.video.duration * percent)
    },
    on_pause_click() {
      this.stop_play ? this.player.video.play() : this.player.video.pause()
      this.stop_play = !this.stop_play
    },
    change_quality(idx) {
      this.active_quality_idx = idx
      this.player.switchQuality(idx)
      this.stop_play = false
    },
    change_speed(idx) {
      this.active_speed_rate_idx = idx
      this.player.speed(this.playback_speed[idx])
      this.player.notice(`${this.playback_speed[idx]} 倍速`, 1000)
    },
    change_volume(val) {
      this.player.volume(val)
    },
    full_screen() {
      this.$emit('on-fullscreen-click', this.fullscreen)
      this.fullscreen = !this.fullscreen
    },
    send_danmaku() {
      this.$emit('send-danmaku', this.danmaku)
      this.danmaku = {
        content: '',
        color: '#ffffff'
      }
    },
  },
}

</script>

<template>
  <div class="player-controller-container">
    <p-player-progress :duration="this.player?this.player.video.duration:0"
                       :cur_video_play_time="cur_video_play_time"
                       :buffered="this.player?this.player.video.buffered:0"
                       @on-progress-change="on_progress_change"/>
    <div class="operation-container">
      <!--   暂停按钮   -->
      <div class="pause" @click="on_pause_click">
        <svg v-if="!stop_play" t="1698751279430" class="icon" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg"
             p-id="6775" width="18" height="18">
          <path
              d="M341.332992 142.222336c47.128576 0 85.334016 38.20544 85.334016 85.332992v568.889344c0 47.128576-38.20544 85.332992-85.334016 85.332992-47.127552 0-85.332992-38.20544-85.332992-85.332992V227.555328c0-47.128576 38.20544-85.332992 85.332992-85.332992z m341.334016 0c47.127552 0 85.332992 38.20544 85.332992 85.332992v568.889344c0 47.128576-38.20544 85.332992-85.332992 85.332992-47.128576 0-85.334016-38.20544-85.334016-85.332992V227.555328c0-47.128576 38.20544-85.332992 85.334016-85.332992z"
              fill="#ffffff" p-id="6776"></path>
        </svg>
        <svg v-else t="1698753248848" class="icon" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg"
             p-id="7847" width="18" height="18">
          <path
              d="M810.4 465.8 253.6 134.4c-6.8-4-13.8-6.4-21.8-6.4-21.8 0-39.6 18-39.6 40L192 168l0 688 0.2 0c0 22 17.8 40 39.6 40 8.2 0 15-2.8 22.4-6.8l556.2-331c13.2-11 21.6-27.6 21.6-46.2C832 493.4 823.6 477 810.4 465.8z"
              p-id="7848" fill="#ffffff"></path>
        </svg>
      </div>
      <!--   时间   -->
      <div class="time">
        <div>{{ double_time_format(cur_video_play_time) }}</div>
        <div>&nbsp;/&nbsp;</div>
        <div>{{ double_time_format(player.video.duration) }}</div>
      </div>
      <!--   中间占位   -->
      <div style="flex: 1;display: flex;align-items: center;justify-content: center">
        <div style="width: 60%">
          <Input v-if="fullscreen" @on-enter="send_danmaku" v-model="danmaku.content" search enter-button="发送"
                 size="small"
                 placeholder="发个友善的弹幕见证当下"/>
        </div>

      </div>
      <!--   清晰度   -->
      <p-pop-operator>
        <template v-slot:value>
          {{ qualities[active_quality_idx].name }}
        </template>
        <template v-slot:content>
          <ul class="option-list">
            <li v-for="(qn,idx) in qualities"
                :class="{'option':active_quality_idx!==idx,'active-option':active_quality_idx===idx}"
                @click="change_quality(idx)">
              {{ qn.name }}
            </li>
          </ul>
        </template>
      </p-pop-operator>
      <!--   倍速   -->
      <p-pop-operator>
        <template v-slot:value>
          倍速
        </template>
        <template v-slot:content>
          <ul class="option-list">
            <li v-for="(speed,idx) in playback_speed"
                :class="{'option':active_speed_rate_idx!==idx,'active-option':active_speed_rate_idx===idx}"
                style="text-align: center"
                @click="change_speed(idx)">
              {{ speed }}x
            </li>
          </ul>
        </template>
      </p-pop-operator>
      <!--   音量   -->
      <p-pop-operator>
        <template v-slot:value>
          音量
        </template>
        <template v-slot:content>
          <p-audio-progress @on-volume-change="change_volume"/>
        </template>
      </p-pop-operator>
      <!--   全屏   -->
      <div class="fullscreen-option" @click="full_screen">
        <svg t="1698840273490" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="12166" width="14" height="14">
          <path
              d="M938.666667 85.333333v853.333334H85.333333V85.333333h853.333334zM85.333333 0a85.333333 85.333333 0 0 0-85.333333 85.333333v853.333334a85.333333 85.333333 0 0 0 85.333333 85.333333h853.333334a85.333333 85.333333 0 0 0 85.333333-85.333333V85.333333a85.333333 85.333333 0 0 0-85.333333-85.333333H85.333333z"
              p-id="12167"></path>
          <path
              d="M213.333333 597.333333a42.666667 42.666667 0 0 1 42.666667 42.666667v128h128a42.666667 42.666667 0 1 1 0 85.333333H256a85.333333 85.333333 0 0 1-85.333333-85.333333v-128a42.666667 42.666667 0 0 1 42.666666-42.666667zM810.666667 597.333333a42.666667 42.666667 0 0 0-42.666667 42.666667v128h-128a42.666667 42.666667 0 1 0 0 85.333333h128a85.333333 85.333333 0 0 0 85.333333-85.333333v-128a42.666667 42.666667 0 0 0-42.666666-42.666667zM810.666667 426.666667a42.666667 42.666667 0 0 1-42.666667-42.666667V256h-128a42.666667 42.666667 0 1 1 0-85.333333h128a85.333333 85.333333 0 0 1 85.333333 85.333333v128a42.666667 42.666667 0 0 1-42.666666 42.666667zM213.333333 426.666667a42.666667 42.666667 0 0 0 42.666667-42.666667V256h128a42.666667 42.666667 0 0 0 0-85.333333H256a85.333333 85.333333 0 0 0-85.333333 85.333333v128a42.666667 42.666667 0 0 0 42.666666 42.666667z"
              p-id="12168"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/style/index.less";

.player-controller-container {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: visible;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1% 2.5%;
  background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
}

.operation-container {
  display: flex;
  flex-direction: row;
  padding-top: 1.5%;
}

.pause {
  display: flex;
  align-items: center;
}

.pause:hover {
  cursor: pointer;
}

.time {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  font-size: small;
}

.option-container {
  height: 100%;
  position: relative;
  font-size: small;
  overflow: visible;
  padding-left: 10px;
  padding-right: 10px;
}

.option-container:hover {
  cursor: pointer;
}

.options {
  position: absolute;
  bottom: 0;
  left: -50%;
  float: left;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.option-list {
  margin-bottom: 30%;
  list-style-type: none;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
}

.option {
  padding: 5px 10px;
  white-space: nowrap;
  min-width: 80px;
  max-width: 120px;
}

.active-option {
  padding: 5px 10px;
  white-space: nowrap;
  min-width: 80px;
  max-width: 120px;
  color: @theme-color;
}

.active-option:hover {
  cursor: pointer;
  color: @theme-color;
  background: rgba(255, 255, 255, 0.33);
}

.option:hover {
  cursor: pointer;
  color: @theme-color;
  background: rgba(255, 255, 255, 0.33);
}


.options-div {
  font-size: small;
}

.options-div:hover {
  cursor: pointer;
  color: @theme-color;
}

.fullscreen-option {
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  fill: white;
}

.fullscreen-option:hover {
  cursor: pointer;
  fill: @theme-color;
}
</style>