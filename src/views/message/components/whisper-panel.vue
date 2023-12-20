<script>
import {page} from "@/api/msg";

export default {
  name: "whisper-panel",
  methods: {
    request_messages() {
      console.log(this.loading)
      if (this.loading) {
        console.log('loading')
        return;
      }
      console.log('start load')
      this.loading = true;

      page(this.selected_menu.value, this.page.no, this.page.size)
          .then((res) => {
            console.log(res)
            this.loading = false;
            this.page.total = res.data.total;
            this.page.data = this.page.data.concat(res.data.page);
          })
          .catch((err) => {
            this.loading = false;
          });

    },
  }
}
</script>

<template>

</template>

<style scoped lang="less">

</style>