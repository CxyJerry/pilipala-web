<script>

export default {
  props: {
    type: {
      type: String,
      default: "default"
    },
    size: {
      type: String,
      default: 'normal'
    },
    jumpable: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      size_map: {
        'small': {
          padding: '2px 10px',
          'font-size': 'small',
          'border-radius': '5px'
        },
        'normal': {
          padding: '3px 16px',
          'font-size': 'normal',
          'border-radius': '8px'
        },
        'large': {
          padding: '10px 20px',
          'font-size': 'large',
          'border-radius': '12px'
        }
      },
      button_class: {
        'jumpable-container': this.jumpable,
        'container': !this.jumpable,
        'default': this.type === 'default',
        'primary': this.type === 'primary',
        'pink': this.type === 'pink',
        'disable': this.disable
      }
    }
  },
  methods: {
    style() {
      return this.size_map[this.size]
    }
  },
  mounted() {
  },
  watch: {
    disable: {
      immediate: true,
      handler: function () {
        this.button_class = {
          'jumpable-container': this.jumpable,
          'container': !this.jumpable,
          'default': this.type === 'default',
          'primary': this.type === 'primary',
          'pink': this.type === 'pink',
          'disable': this.disable
        }
      }
    }
  }
}

</script>

<template>
  <div :class="button_class" :style="style()">
    <slot name="icon" />
    <slot name="content" />
  </div>
</template>

<style lang="less" scoped>
@import "@/style/index.less";

.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 3px 10px;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
}

.container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0);
  transition: background-color 0.3s ease;
  pointer-events: none;
}

.jumpable-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 3px 10px;
  color: white;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.container:hover {
  cursor: pointer;
}

.container:hover::before {
  background-color: rgba(255, 255, 255, 0.2);
}

.jumpable-container:hover {
  cursor: pointer;
  animation: jump 0.5s ease;
}

@keyframes jump {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-5px);
  }
}

.default {
  background: white;
}

.primary {
  background: @theme-color;
}

.pink {
  background: @theme-pink;
}

.disable {
  pointer-events: none;
}

.disable:hover {
  pointer-events: none;
}
</style>