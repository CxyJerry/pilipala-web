<template>
  <router-view />
  <login-modal />
</template>

<script>
import {defineComponent} from "vue";
import LoginModal from "@/components/login-modal.vue";


export default defineComponent({
  components: { LoginModal },
  methods: {},
  mounted() {},
});
</script>

<style>
#app {
  position: relative;
  padding: 0;
  min-width: 100%;
  min-height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
}
</style>
