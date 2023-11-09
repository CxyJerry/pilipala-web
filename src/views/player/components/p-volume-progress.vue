<template>
  <div class="progress-container">
    <div class="progress-div" @mousedown="start_drag">
      <div>{{ show_value }}</div>
      <!-- 外层容器条 -->
      <div class="progress" ref="progress">
        <!-- 进度滑块 -->
        <div class="slider"></div>
        <!-- 内层进度条 -->
        <div class="active_progress" :style="active_progress.style"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "p-audio-progress",
  data() {
    return {
      slider: {
        dragging: false,
        position_y: 0,
        start_y: 0,
        start_position_y: 0
      },
      active_progress: {
        style: {
          height: 0
        }
      },
      show_value: 0
    };
  },
  methods: {
    init_volume() {
      let volume = localStorage.getItem('dplayer-volume') || 0
      this.active_progress.style.height = parseInt((volume * 100).toString()) + '%'
      this.show_value = parseInt((volume * 100).toString())
    },
    start_drag(e) {
      this.slider.dragging = true;
      this.slider.start_y = e.clientY;
      this.slider.start_position_y = this.slider.position_y;
      document.addEventListener("mousemove", this.dragging);
      document.addEventListener("mouseup", this.end_drag);
    },
    dragging(e) {
      if (this.slider.dragging) {
        const offsetY = this.slider.start_y - e.clientY;
        this.slider.position_y = this.slider.start_position_y + offsetY;
        this.updateVolume();
      }
    },
    end_drag() {
      this.slider.dragging = false;
      document.removeEventListener("mousemove", this.dragging);
      document.removeEventListener("mouseup", this.end_drag);
    },
    updateVolume() {
      const progressHeight = this.$refs.progress.clientHeight;
      if (this.slider.position_y < 0) {
        this.slider.position_y = 0;
      } else if (this.slider.position_y > progressHeight) {
        this.slider.position_y = progressHeight;
      }
      this.active_progress.style.height =
          (this.slider.position_y / progressHeight) * 100 + "%";
      const volume_percent = parseInt((this.slider.position_y / progressHeight * 100).toString()) / 100;
      this.show_value = parseInt((volume_percent * 100).toString())
      this.$emit("on-volume-change", volume_percent);
    },
  },
  mounted() {
    this.init_volume()
  }
};
</script>

<style scoped lang="less">
@import "@/style/index.less";

.progress-container {
  width: 60px;
  height: 100px;
  display: flex;
  align-items: end;
  justify-content: center;

}

.progress-div {
  flex-direction: column;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 40%;
  padding: 15%;
  background: rgba(0, 0, 0, 0.5);
}

.progress {
  width: 3px;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 999px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  position: relative;
}

.active_progress {
  width: 3px;
  border-radius: 999px;
  height: 20%;
  background: @theme-color;
}

.slider {
  width: 10px;
  height: 10px;
  margin-bottom: -5px;
  border-radius: 999px;
  background: @theme-color;

  cursor: pointer;
}

.slider:hover {
  width: 12px;
  height: 12px;
}
</style>
