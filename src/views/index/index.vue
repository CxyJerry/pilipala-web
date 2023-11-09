<script>
import Pheader from "@/views/index/components/pheader.vue";
import Pmain from "@/views/index/components/pmain.vue";
import Pfooter from "@/components/pfooter.vue";

export default {
  components: {Pfooter, Pmain, Pheader},
}

</script>

<template>
  <div style="width: 100%;padding-bottom: 50px;flex: 1">
    <pheader/>
    <pmain/>
  </div>
  <pfooter/>
</template>

<style scoped>

</style>