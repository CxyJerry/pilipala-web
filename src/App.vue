<template>
  <router-view/>
  <login-modal/>
  <pfooter/>
</template>

<script>
import {defineComponent} from "vue";
import LoginModal from "@/components/login-modal.vue";
import Pfooter from "@/components/pfooter.vue";


export default defineComponent({
  components: {Pfooter, LoginModal},
  methods: {},
  mounted() {
  },
});
</script>

<style>
#app {
  position: relative;
  padding: 0;
  min-width: 100%;
  content: '';
  display: flex;
  flex-direction: column;
}

body {
  margin: 0;
  padding: 0;
}
</style>
