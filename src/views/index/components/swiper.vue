<script>
export default {
  props: {
    swiper: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      swiper_data: [],
      swiper_style: {
        transform: 'none',
        transition: '0.5s'
      },
      active_idx: 0
    }
  },
  methods: {
    move_to(idx) {
      this.active_idx = idx
      this.swiper_style.transform = `translateX(-${idx}00%)`
    },
    move_to_right() {
      if (this.active_idx === this.swiper_data.length - 1) {
        this.active_idx = 0
        this.swiper_style.transition = 'none'
        this.swiper_style.transform = `translateX(-100%)`
        setTimeout(() => {
          this.swiper_style.transition = '0.5s'
          this.move_to(this.active_idx + 1)
        }, 0)
      } else {
        this.move_to(this.active_idx + 1)
      }
    },
    move_to_left() {
      if (this.active_idx === 0) {
        this.active_idx = this.swiper_data.length - 2
        this.swiper_style.transition = 'none'
        this.swiper_style.transform = `translateX(-${this.swiper_data.length - 1}00%)`
        setTimeout(() => {
          this.swiper_style.transition = '0.5s'
          this.move_to(this.active_idx - 1)
        }, 0)
      } else {
        this.move_to(this.active_idx - 1)
      }

    },
    init() {
      let first = this.swiper[0]
      let last = this.swiper[this.swiper.length - 1]
      this.swiper_data = this.swiper.slice()
      this.swiper_data.unshift(last)
      this.swiper_data.push(first)
      this.move_to(1)
      setInterval(() => {
        this.move_to_right()
      }, 3000)
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    swiper() {
      this.swiper_data = this.swiper
    }
  }
}

</script>

<template>
  <div class="swiper">
    <!--  卡片内容  -->
    <div class="swiper-container" :style="swiper_style">
      <div class="swiper-card" v-for="i in swiper_data" style="background: white"
           @click="this.$router.push(`/player/${i.bvId}`)">
        <img :src="`/api/${i.coverUrl}`" alt="" style="width: 100%;height: 100%">
        <div>{{ i }}</div>
      </div>

    </div>
    <!--  操作栏  -->
    <div
        style="position: absolute;bottom: 0;right: 0;display: flex;flex-direction: row;width: 100%;padding:5%;align-items: center">
      <div style="display: flex;flex-direction: row">
        <div class="check_point"
             :style="{background:this.active_idx===idx?'#fff':'rgba(255, 255, 255, 0.35)'}"
             v-for="idx in this.swiper.length" @click="move_to(idx)">
          &nbsp;
        </div>
      </div>
      <div style="display: flex;flex-direction: row;flex: 1;justify-content: end">
        <div class="check_btn" @click="move_to_left">
          <Icon type="ios-arrow-back" color="#fff"/>
        </div>
        <div class="check_btn" @click="move_to_right">
          <Icon type="ios-arrow-forward" color="#fff"/>
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>
.swiper-container {
  width: 100%;
  height: 100%;
}

.swiper:hover {
  cursor: pointer;
}

.swiper {
  border-radius: 10px;
  width: 100%;
  aspect-ratio: 4/3;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
}

.swiper-card {
  border-radius: 10px;
  background: #bba77e;
  display: inline-block;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 30px;
}

@keyframes swiper-animation {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-100%);
  }
}

.check_btn {
  padding: 5px 10px;
  background: rgba(255, 255, 255, 0.35);
  border-radius: 10px;
}

.check_btn:hover {
  cursor: pointer;
}

.check_point {
  border-radius: 360px;
  height: 10px;
  width: 10px;
  margin: 3px;
}

.check_point:hover {
  cursor: pointer;
}
</style>