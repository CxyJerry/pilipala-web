<script>
import Tabs from "@/views/gccenter/views/components/tabs.vue";

export default {
  components: {Tabs},
  data() {
    return {

      tabs: [
        {
          name: '视频投稿',
          path: '/gccenter/gcupload/upload'
        },
        {
          name: '专栏投稿',
          path: '/gccenter/gcupload/text'
        },
        {
          name: '音频投稿',
          path: '/gccenter/gcupload/#'
        },
      ]
    }
  }
}
</script>

<template>
  <div style="width: 100%;display: flex;height: 100%;flex-direction: column">
    <div>
      <tabs :tabs="tabs" active_tab="专栏投稿"/>
    </div>
  </div>
</template>

<style scoped>

</style>