<script>
import {upload_cover} from "@/api/vod";

export default {
  name: "p-cover-upload",
  props: {
    cover_url: ''
  },
  data() {
    return {
      cropper: {
        show: false,
        img: '',
        output_size: 1,
        output_type: 'png',
        info: true,
        can_scale: true,
        auto_crop: true,
        fixed: true,
        fixed_number: [16, 9],
        fixed_box: true,
        can_move_box: true,
        can_move: true,
        original: false,
        center_box: true,
        mode: '100px',
        fill_color: '#000000',
      },
      _cover_url: ''
    }
  },
  methods: {
    before_auto_upload_cover(file) {
      let img_reader = new FileReader()
      img_reader.readAsDataURL(file)
      img_reader.onload = e => {
        this.cropper.img = e.target.result
        this.cropper.show = true
      }
      return false
    },
    upload_cover(file) {
      upload_cover(file).then(res => {
        this._cover_url = res.data
        this.$emit('coverUpdate', res.data)
      })
    },
    upload() {
      console.log('crop end,handle data starting ')
      this.$refs.cropper.getCropBlob(data => {
        console.log(data)
        this.upload_cover(data)
      })
    }
  }
}
</script>

<template>
  <div style="width: auto;height: auto">
    <Upload accept="image/*"
            :multiple="false"
            :before-upload="before_auto_upload_cover"
            type="drag"
            action="#">
      <div class="cover-container">
        <div v-if="!_cover_url">
          <Icon type="ios-cloud-upload-outline" size="30" style="color: #00a1d6;"></Icon>
          <p style="margin: 5px">上传封面</p>
        </div>
        <div v-else>
          <img :src="`/api/${_cover_url}`" alt="" style="width: 154px;height: 96px"/>
        </div>
      </div>
    </Upload>


    <Modal
        v-model="cropper.show"
        title="封面截取"
        width="50%"
        @on-ok="upload"
    >
      <div style="width:100%;aspect-ratio:16/9;position:relative;">
        <vue-cropper
            ref="cropper"
            :img="cropper.img"
            :output-size="cropper.output_size"
            :output-type="cropper.output_type"
            :info="cropper.info"
            :can-scale="cropper.can_scale"
            :auto-crop="cropper.auto_crop"
            :fixed="cropper.fixed"
            :fixed-number="cropper.fixed_number"
            :fixed-box="cropper.fixed_box"
            :can-move-box="cropper.can_move_box"
            :can-move="cropper.can_move"
            :mode="cropper.mode"
            :original="cropper.original"
            :fill-color="cropper.fill_color"
        ></vue-cropper>
      </div>

    </Modal>
  </div>

</template>

<style scoped lang="less">
.cover-container {
  background: #f6f6f6;
  padding: 10px;
  display: flex;
  width: 100%;
  height: 60%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>