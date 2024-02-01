<script>
export default {
  props: {
    duration: Number,
    cur_video_play_time: Number,
    buffered: Object
  },
  data() {
    return {
      played: {
        style: {
          width: 0
        }
      },
      loaded: {
        style: {
          width: 0
        }
      },
      slider: {
        dragging: false,
        position_x: 0,
        start_x: 0,
        offset_x: 0,
        left: 0,
      }
    }
  },
  watch: {
    cur_video_play_time: {
      immediate: true,
      handler: function () {
        this.played.style.width = parseInt((this.cur_video_play_time / this.duration * 10000).toString()) / 100 + '%'
      }
    },
    buffered: {
      immediate: true,
      handler: function () {
        try {
          let buffered_length = this.buffered.end(0) | 0
          this.loaded.style.width = parseInt(((buffered_length / this.duration) * 10000).toString()) / 100 + '%'
        } catch (ignored) {
        }

      }
    }
  },
  methods: {
    slider_drag_start(event) {
      this.slider.start_x = event.clientX
      this.slider.offset_x = this.slider.start_x - this.slider.position_x
      this.slider.dragging = true

      document.addEventListener('mousemove', this.slider_dragging)
      document.addEventListener('mouseup', this.slider_drag_end)
    },
    slider_dragging(event) {
      if (this.slider.dragging) {
        this.slider.position_x = event.clientX - this.slider.offset_x
        const container_width = this.$refs.progress.clientWidth
        this.slider.position_x = Math.max(0,
            Math.min(
                container_width,
                this.slider.position_x
            )
        )
        // 重新计算进度条长度
        this.played.style.width = parseInt((this.slider.position_x / this.$refs.progress.clientWidth * 10000).toString()) / 100 + '%'
      }
    },
    slider_drag_end() {
      this.slider.dragging = false
      document.removeEventListener('mousemove', this.slider_dragging)
      document.removeEventListener('mouseup', this.slider_drag_end)
      this.played.style.width = parseInt((this.slider.position_x / this.$refs.progress.clientWidth * 10000).toString()) / 100 + '%'
      let played_percent = parseInt((this.slider.position_x / this.$refs.progress.clientWidth * 100).toString()) / 100
      this.$emit('on-progress-change', played_percent)
    },
    progress_click(event) {
      this.slider.position_x = event.offsetX
      this.played.style.width = parseInt((this.slider.position_x / this.$refs.progress.clientWidth * 10000).toString()) / 100 + '%'
      let played_percent = parseInt((this.slider.position_x / this.$refs.progress.clientWidth * 100).toString()) / 100
      this.$emit('on-progress-change', played_percent)
    }
  }
}

</script>

<template>
  <div class="progress-container" ref="progress" @click="progress_click">
    <!--    播放进度条    -->
    <div class="played-progress-container">
      <div class="played-progress" :style="played.style">

      </div>
      <div ref="slider" class="slider" @mousedown="slider_drag_start"
           @mouseup="slider_drag_end">
        <svg t="1698745553121" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="3269"
             width="16" height="16">
          <path
              d="M712.832 65.856a42.688 42.688 0 0 0-60.352 0L512 206.336 414.144 108.48a42.688 42.688 0 0 0-60.288 60.352l76.48 76.48h-6.08c-78.4 0-140.544 0-189.12 6.4-50.048 6.528-90.496 20.288-122.432 51.264-32 31.04-46.08 70.4-52.864 118.976-6.528 47.232-6.528 107.52-6.528 183.68v4.672c0 76.16 0 136.512 6.528 183.744 6.784 48.64 20.928 87.936 52.864 118.976 31.936 30.976 72.384 44.8 122.432 51.264 48.64 6.4 110.72 6.4 189.12 6.4h175.488c78.4 0 140.48 0 189.12-6.4 50.048-6.528 90.496-20.288 122.432-51.264 32-31.04 46.08-70.4 52.864-118.976 6.528-47.232 6.528-107.52 6.528-183.68v-4.736c0-76.16 0-136.448-6.528-183.68-6.72-48.64-20.928-87.936-52.864-118.976-31.936-30.976-72.384-44.8-122.432-51.328-48.64-6.336-110.72-6.336-189.12-6.336h-6.08l119.168-119.168a42.688 42.688 0 0 0 0-60.288z"
              p-id="3270"></path>
        </svg>
      </div>
    </div>
    <!--   数据加载进度条   -->
    <div class="loaded-progress" :style="loaded.style">
    </div>
  </div>

</template>

<style scoped lang="less">
@import "@/style/index.less";

.progress-container {
  position: relative;
  width: 100%;
  height: 3px;
  background: rgba(168, 167, 167, 0.99);
  border-radius: 999px;
}

.progress-container:hover {
  cursor: pointer;
}

.played-progress {
  position: relative;
  width: 0;
  background: @theme-color;
  height: 100%;
  max-width: 100%;
  z-index: 1;
  overflow: hidden;
  fill: #000000;
  display: flex;
  justify-content: end;
  align-items: center;
}


.played-progress:hover {
  cursor: pointer;
}

.played-progress-container {
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.loaded-progress {
  width: 0;
  height: 100%;
  background: #d2d2d2;
  display: block;
  position: relative;
  max-width: 100%;
}

.slider {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  position: relative;
  fill: @theme-color;
  margin-left: -6px;
  margin-right: -6px;
  z-index: 1;
}

.slider:hover {
  cursor: pointer;
}
</style>