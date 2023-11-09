<script>
import {store} from "@/store";

export default {
  data() {
    return {
      search_content: ''
    }
  },
  methods: {
    search() {
      store.commit('set_search_content', this.search_content)
      this.$router.push({
        path: '/search'
      })
    },
    init_search_content() {
      this.search_content = store.state.search_content
    },
  },
  mounted() {
    this.init_search_content()
  }
}

</script>

<template>
  <Input placeholder="搜索更多内容" v-model="search_content" style="max-width: 30%" size="large"
         @on-enter="search">
    <template #suffix>
      <Icon type="ios-search"/>
    </template>
  </Input>
</template>

<style scoped>

</style>