<script>
import DPlayer from "dplayer";
import {dash} from "@/utils/player";
import {theme_color} from "@/style";

export default {
  props: {
    preview: {
      type: Object,
      default: {
        cid: '',
        name: '',
        url: '/api/file/video/1716360510653378560/预览/1'
      }
    },
    id_suffix: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loaded: false,
      player: null
    }
  },
  methods: {
    init_player() {
      let id = `dplayer-${this.preview.cid}-${this.id_suffix}`
      let el = document.getElementById(id)
      let options = {
        container: el,
        autoplay: true,
        theme: theme_color,
        lang: 'zh-cn',
        hotkey: false,
        muted: true,
        mutex: false,
        volume: 0,
        video: {
          url: `/api${this.preview.url}`,
          type: 'dash',
          customType: {
            dash: dash
          }

        }
      }

      this.player = new DPlayer(options);
      this.loaded = true
    },
    hover() {
      if (!this.loaded) {
        this.init_player()
      }
    },
    hover_out() {
      this.player.destroy()
      this.loaded = false
    }
  },
  beforeUnmount() {
    if (this.player) {
      this.player.destroy()
    }
  }

}

</script>

<template>
  <div style="overflow: hidden" @mouseenter="hover" @mouseleave="hover_out">
    <div :id="`dplayer-${preview.cid}-${id_suffix}`" style="width: 100%;height: 100%"></div>
  </div>

</template>

<style lang="css" scoped>


:deep(.dplayer-icons) {
  display: none;
}


</style>