<script>
export default {
  data() {
    return {
      focus: false,
      content: ''
    }
  },
  model: {
    prop: 'content',
    event: 'change_value'
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },

  methods: {},
  created() {
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.content = val
      }
    },
    content: function (nval, oval) {
      this.$emit('change_value', nval)
    }
  }
}
</script>

<template>
  <div :class="{'textarea-div':!focus,'textarea-div-focus':focus}">
    <textarea v-model="content" class="textarea" @focusin="focus=true"
              @focusout="focus=false"></textarea>
  </div>

</template>

<style scoped>
.textarea-div {
  border: solid 1px #c9c9c9;
  display: flex;
  padding: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 3px;
}

.textarea-div:hover {
  border: solid 1px #5cadff;
}

.textarea-div-focus {
  border: white 1px solid;
  box-shadow: 0 0 0 1px #5cadff;
  display: flex;
  padding: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 3px;
}

.textarea {
  resize: none;
  border: none;
  outline: none;
  line-height: normal;
  width: 100%;
  border-radius: 3px;
}
</style>