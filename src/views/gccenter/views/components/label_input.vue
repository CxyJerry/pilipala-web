<script>
export default {
  data() {
    return {
      input_focus: false,
      labels: [],
      input_value: '',
      max_label_count: 10
    }
  },
  model: {
    prop: 'value',
    event: 'add'
  },
  props: {
    value: {
      type: Array,
      default: []
    }
  },
  methods: {
    input(e) {
      if (e.keyCode === 13) {
        let content = this.input_value
        if (!content) {
          this.$Message.warning('输入不得为空')
          return;
        }
        if (this.labels.includes(content)) {
          this.$Message.warning('该标签已存在')
          return
        }
        if (this.labels.length >= this.max_label_count) {
          this.$Message.error('标签数量已达上限')
          return;
        }
        this.labels.push(content)
        this.change_labels()
        this.input_value = ''
      }
    },
    delete_label(label) {
      this.labels = this.labels.filter(e => e !== label)
    },
    change_labels() {
      this.$emit('add', this.labels)
    }
  },
  created() {
    // console.log(this.labels)
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.labels = val
      }
    }
  }
}

</script>

<template>
  <div :class="{'input-div':!input_focus,'input-div-focus':input_focus}">
    <div>
      <!--   标签块   -->
      <div style="display: flex;flex-wrap:wrap;flex-direction: row;"
           v-if="labels">
        <div class="label-block" v-for="label in labels">
          <span style="height: 100%">{{ label }}</span>
          <div class="label-block-cancel" @click="delete_label(label)">
            <Icon type="ios-close" color="#fff"/>
          </div>
        </div>
      </div>
      <!--   输入块   -->
      <input v-model="input_value" @focusin="input_focus = true" @focusout="input_focus=false" @keydown="input"
             class="input-content"
             placeholder="按回车键Enter创建标签">
    </div>

  </div>

</template>

<style lang="less" scoped>
@import "@/style/index.less";

.input-div {
  display: inline-block;
  position: relative;
  vertical-align: middle;
  line-height: normal;
  width: 100%;
  border: 1px solid #d2d2d2;
  border-radius: 4px;
  outline: none;
}

.input-div:hover {
  border: 1px solid #5cadff;
  border-radius: 4px;
}

.input-div-focus {
  display: inline-block;
  position: relative;
  vertical-align: middle;
  line-height: normal;
  width: 100%;
  box-shadow: 0 0 0 1px #5cadff;
  border: solid 1px #ffffff;
  border-radius: 4px;
  outline: none;
}

.input-content {
  padding: 7px 7px 7px 7px;
  outline: none;
  border: none;
  width: 100%;
  border-radius: 4px;
}

.input-content::-webkit-input-placeholder {
  color: #bebebe;
}

.label-block {
  display: flex;
  height: 100%;
  flex-direction: row;
  line-height: normal;
  font-size: large;
  padding: 3px 5px;
  background: @theme-color;
  color: white;
  margin: 3px;
  border-radius: 2px;
}

.label-block-cancel {
  margin-left: 3px;
}

.label-block-cancel:hover {
  cursor: pointer;
}

</style>