<script>
import {nextTick} from "vue";

export default {
  props: {
    danmakus: Array, // 弹幕数组，包含文本和时间戳信息
    video_current_play_time: Number, // 视频当前播放时间,
    cur_uid: {
      type: String,
      default: ''
    },
    stop: {
      type: Boolean,
      default: false
    },
    speed: {
      type: String,
      default: 'normal'
    }
  },
  data() {
    return {
      waiting: [],
      running: [],
      running_danmaku_id_map: [],
      pre_draw_time: 0,
      pre_video_current_time: 0
    }
  },
  methods: {
    get_speed_value() {
      const danmaku_speed_map = {
        'slow': 15,
        'normal': 10,
        'fast': 5
      }
      return danmaku_speed_map[this.speed] ? danmaku_speed_map[this.speed] : 10
    },
    update_danmaku_speed() {
      let speed = this.get_speed_value()
      for (let danmaku of this.running) {
        danmaku.style['animation'] = `danmaku ${speed}s linear 1`
      }
      for (let danmaku of this.waiting) {
        danmaku.style['animation'] = `danmaku ${speed}s linear 1`
      }
    },
    get_danmaku_top(type) {
      const map = {
        0: {min: 0, max: 30},
        1: {min: 30, max: 60},
        2: {min: 60, max: 90}
      }
      let ratio = map[type] ? map[type] : {min: 0, max: 30}
      ratio = parseInt(((Math.random() * ratio.max) - ratio.min).toString())
      return ratio + '%'
    },
    update_waiting_danmakus(danmakus) {
      this.waiting = []
      for (let danmaku of danmakus) {
        let dan = this.build_danmaku(danmaku)
        this.waiting.push(dan)
      }
    },
    build_danmaku(danmaku) {
      return {
        time: parseInt(danmaku[0]),
        visible: danmaku[1],
        color: '#' + danmaku[2].toString(16),
        author: danmaku[3],
        text: danmaku[4],
        type: danmaku[5] ? danmaku[5] : 0,
        speed: danmaku[6] ? danmaku[6] + 's' : '10s',
        style: {
          color: '#' + danmaku[2].toString(16),
          top: this.get_danmaku_top(danmaku[5] ? danmaku[5] : 0,),
          'animation-play-state': 'paused',
          'animation-duration': `${this.get_speed_value()}s`,
        }
      }
    },
    animationend(danmaku) {
      danmaku.completed = true
    }
  },

  watch: {
    video_current_play_time: {
      immediate: true,
      handler: function () {
        for (let danmaku of this.waiting) {
          // 将每条弹幕计算出一个唯一值，已经在滚动的就不需要再次加入滚动列表了
          const uni_obj = {
            time: danmaku.time,
            color: danmaku.color,
            author: danmaku.author,
            text: danmaku.text,
            type: danmaku.type
          }
          let uni_id = JSON.stringify(uni_obj)
          let sub_res = (this.video_current_play_time - danmaku.time)
          if (sub_res <= 2 && sub_res >= 0 &&
              !this.running_danmaku_id_map.includes(uni_id)) {
            danmaku.style['animation-play-state'] = this.stop ? 'paused' : 'running'
            this.running.push(danmaku)
            this.running_danmaku_id_map.push(uni_id)
          }
        }
      }
    },
    danmakus: {
      immediate: true,
      deep: true,
      handler: function (new_val, old_val) {
        this.update_waiting_danmakus(new_val)
      }
    },
    stop: {
      immediate: true,
      handler: function (new_val, old_val) {
        for (let danmaku of this.running) {
          danmaku.style.animationPlayState =
              new_val ? 'paused' : 'running'
        }
      }
    },
    speed: {
      immediate: true,
      handler: function (new_val, old_val) {
        this.update_danmaku_speed()
      }
    }
  },
  mounted() {
    this.update_waiting_danmakus(this.danmakus)

  }
}
</script>

<template>
  <div class="danmaku-container">
    <div v-for="(danmaku, index) in running" :style="danmaku.style?danmaku.style:{}" :key="index"
         class="danmaku" @animationend="animationend(danmaku)">
      <div :class="{'danmaku-border':danmaku.author===this.cur_uid}">
        {{ danmaku.text }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.danmaku-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
  text-align: start;
}

@keyframes danmaku {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
    //display: none;
  }
}

.danmaku {
  width: 100%;
  position: absolute;
  white-space: nowrap;
  font-size: 16px;
  text-shadow: 2px 2px 2px black;
  transition: transform .1s ease;
  animation: danmaku 10s linear 1;
  animation-fill-mode: forwards;
  display: flex;
  justify-content: start;
}

.danmaku-border {
  position: absolute;
  padding: 5px;
  border: 2px white solid;
  width: auto;
}
</style>