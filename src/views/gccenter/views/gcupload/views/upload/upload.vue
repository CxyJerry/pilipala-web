<script>
import upload from '@/views/gccenter/views/gcupload/views/upload/upload'

export default upload
</script>

<template>
  <div style="width: 100%;display: flex;height: 100%;flex-direction: column">
    <div>
      <tabs :tabs="tabs" v-if="!start_upload" :active_tab="'视频投稿'"/>
    </div>
    <!--  选取视频部分  -->
    <div class="upload-panel" v-if="!start_upload">
      <Upload
          accept="video/*"
          :multiple="false"
          type="drag"
          action="#"
          :before-upload="before_auto_upload">
        <div
            style="padding: 60px 0;display: flex;width: 100%;height: 60%;flex-direction: column;justify-content: center;align-items: center">
          <Icon type="ios-cloud-upload-outline" size="40" class="theme-icon"></Icon>
          <p style="margin: 5px">拖拽此处也可上传</p>
          <div style="margin: 10px;padding: 5px" class="post-btn">
                <span>
                  上传视频
                </span>
          </div>
          <div style="margin: 5px;display: flex;align-items: center">
            当前审核队列
            <div style="visibility: hidden">&nbsp;</div>
            <div style="background: #45818e;color: white;padding: 2px;font-size: 12px;border-radius: 3px">&nbsp;常规&nbsp;</div>
          </div>
          <span style="font-size: small">（目前仅支持100MB以内视频稿件，请注意您的稿件大小）</span>
        </div>
      </Upload>
      <div style="text-align: center;margin-top: 30px">
        <span class="notify">禁止发布的视频内容</span>
        <span class="notify">视频大小</span>
        <span class="notify">视频格式</span>
        <span class="notify">视频码率</span>
      </div>
      <div style="text-align: center;margin-top: 30px">
              <span class="notify">上传视频，表示您已同意&nbsp;<a href="#">噼里啪啦用户协议</a>&nbsp;与&nbsp;<a
                  href="#">噼里啪啦社区公约</a>&nbsp;,请勿上传涩情，反动等违法视频</span>
      </div>
    </div>
    <!--  表单部分  -->
    <div class="form-panel" v-else>
      <!--   进度条板块   -->
      <div class="progress-panel">
        <!--   文件名   -->
        <div style="padding: 20px 20px 10px;line-height: 20px;font-size: 20px;overflow: hidden">{{
            origin_filename
          }}
        </div>
        <div style="height: 1px;background: #f0f0f0;margin-top: 5px;margin-bottom: 5px"></div>
        <!--   进度条   -->
        <div style="width: 100%;display: flex;flex-direction: row;padding: 10px">
          <div style="width: 30px;">
            <img src="../../../../../../assets/video_file.png" alt="" style="width: 30px;height: 30px;"/>
          </div>
          <div style="flex: 1;display: flex;flex-direction: column;margin-left: 10px">
            <div style="display: flex;flex-direction: row;width: 100%;height: 60%">
              <!--       上传状态       -->
              <div style="display: flex;flex-direction: row" v-if="upload_status==='completed'">
                <div>
                  <Icon type="ios-checkmark-circle" size="20" color="#00cc00"/>
                </div>
                <div style="padding-left: 5px">
                <span style="font-size: 8px;line-height: 20px;color: #00cc00">
                  上传完成
                </span>
                </div>
              </div>
              <div style="display: flex;flex-direction: row" v-else-if="upload_status==='uploading'">
                <div style="padding-left: 5px">
                <span style="font-size: 8px;line-height: 20px;color: #00a1d6">
                  {{ uploading_text }}
                </span>
                </div>
              </div>
              <div style="display: flex;flex-direction: row" v-else-if="upload_status==='pausing'">
                <div>
                  <Icon type="ios-pause" size="20" color="#00a1d6"/>
                </div>
                <div style="padding-left: 5px">
                <span style="font-size: 8px;line-height: 20px;color: #00a1d6">
                  暂停中
                </span>
                </div>
              </div>
              <div style="display: flex;flex-direction: row" v-else>
                <div>
                  <Icon type="ios-close-circle" size="20" color="#ee0000"/>
                </div>
                <div style="padding-left: 5px">
                <span style="font-size: 8px;line-height: 20px;color: #ee0000">
                  上传失败
                </span>
                </div>

              </div>
              <!--       操作       -->
              <div class="refresh-btn" @click="refresh_file" v-if="upload_status==='completed'">
                <Icon type="md-refresh-circle" size="20" color="#00a1d6" style="transform: rotate(45deg)"/>
                <div style="padding-left:5px;">
                  <span style="line-height: 20px">更换视频</span>
                </div>
              </div>
              <div class="refresh-btn" v-else-if="upload_status==='uploading'" @click="this.upload_status='pausing'">
                <Icon type="ios-pause" size="20" color="#00a1d6"/>
                <div style="padding-left:5px;">
                  <span style="line-height: 20px">暂停上传</span>
                </div>
              </div>
              <div class="refresh-btn" v-else-if="upload_status==='pausing'" @click="this.upload_status='uploading'">
                <Icon type="ios-play" size="20" color="#00a1d6"/>
                <div style="padding-left:5px;">
                  <span style="line-height: 20px">继续上传</span>
                </div>
              </div>
              <div class="refresh-btn" v-else @click="refresh_file">
                <Icon type="ios-play" size="20" color="#00a1d6"/>
                <div style="padding-left:5px;">
                  <span style="line-height: 20px">重新上传</span>
                </div>
              </div>
            </div>
            <div style="width: 100%;">
              <div style="visibility: hidden;height: 5px;">&nbsp;</div>
              <div style="height: 2px;width: 100%;background-color: #cbcbcb">
                <div style="background-color: #00cc00;height: 2px" :style="{width:upload_percent}"></div>
              </div>
            </div>

          </div>

        </div>
      </div>
      <!--   表单板块   -->
      <div style="margin-top: 30px;background: white;padding: 10px;flex: 1">
        <div>
          <span style="font-size: 16px;padding-left: 6%"><b>基本设置</b></span>
        </div>
        <Form ref="post-form" style="display: flex;flex-direction: column" :model="form_data" :rules="rules" inline>
          <!--    封面    -->
          <FormItem prop="cover_url">
            <div class="form-item">
              <div class="form-item-label">
                <div><span style="color: red">*&nbsp;</span>封面</div>
              </div>
              <div class="form-item-content">
                <div style="width: 200px;height: 150px">
                  <Upload
                      style=""
                      accept="image/*"
                      :multiple="false"
                      :before-upload="before_auto_upload_cover"
                      type="drag"
                      action="#">
                    <div
                        style="background:#f6f6f6;padding:10px;display: flex;width: 100%;height: 60%;flex-direction: column;justify-content: center;align-items: center">
                      <div v-if="!form_data.cover_url">
                        <Icon type="ios-cloud-upload-outline" size="30" style="color: #00a1d6;"></Icon>
                        <p style="margin: 5px">上传封面</p>
                      </div>
                      <div v-else>
                        <img :src="`/api/${form_data.cover_url}`" alt="" style="width: 154px;height: 96px"/>
                      </div>
                    </div>
                  </Upload>
                </div>
              </div>
            </div>
          </FormItem>
          <!--    标题    -->
          <FormItem prop="title">
            <div class="form-item">
              <div class="form-item-label">
                <div><span style="color: red">*&nbsp;</span>标题</div>
              </div>
              <div class="form-item-content">
                <Input v-model="form_data.title" placeholder="清晰明了表明内容两点的标题会更受观众欢迎哟！"/>
              </div>
            </div>
          </FormItem>
          <!--    类型    -->
          <FormItem prop="gc_type">
            <div class="form-item">
              <div class="form-item-label">
                <div><span style="color: red">*&nbsp;</span>类型</div>
              </div>
              <div class="form-item-content">
                <RadioGroup v-model="form_data.gc_type">
                  <Radio label="自制"></Radio>
                  <Radio label="转载"></Radio>
                </RadioGroup>
              </div>
            </div>
          </FormItem>
          <!--    分区    -->
          <FormItem prop="partition">
            <div class="form-item">
              <div class="form-item-label">
                <div><span style="color: red">*&nbsp;</span>分区</div>
              </div>
              <div class="form-item-content">
                <!--                <TreeSelect v-model="form_data.partition" :data="partition_tree" v-width="200"/>-->
                <tree-selector :data="partition_tree" @on-selected="partition_selected"></tree-selector>
              </div>
            </div>
          </FormItem>
          <!--    标签    -->
          <FormItem prop="labels">
            <div class="form-item">
              <div class="form-item-label">
                <div><span style="color: red">*&nbsp;</span>标签</div>
              </div>
              <div class="form-item-content">
                <label_input :value="form_data.labels" @add="labels=>form_data.labels=labels" style="width: 100%"/>
              </div>
            </div>
          </FormItem>
          <!--    简介    -->
          <FormItem prop="desc">
            <div class="form-item">
              <div class="form-item-label">
                <div>简介</div>
              </div>
              <div class="form-item-content">
                <textarea_input :value="form_data.desc" @change_value="desc=>this.form_data.desc=desc"
                                style="width: 100%;"></textarea_input>
              </div>
            </div>
          </FormItem>

          <!--    操作    -->
          <div class="form-item">
            <div class="form-item-label">
              <div>&nbsp;</div>
            </div>
            <div class="form-item-content">
              <div style="padding-right: 15px">
                <div class="btn save-btn">存草稿</div>
              </div>
              <div style="padding-right: 15px">
                <div class="btn post-btn" @click="post">
                  立即投稿
                </div>

              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>

</template>

<style lang="less" scoped>
@import "@/style/index.less";

.upload-panel {
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  padding-left: 20%;
  padding-right: 20%;
  width: 100%;
  height: 100%;
  background: white;
}

.form-panel {
  margin: 10px;
  width: 100%;
  height: 100%;
  line-height: 50px;
  display: flex;
  flex-direction: column;
}

.form-item {
  display: flex;
  flex-direction: row;
}

.form-item-label {
  width: 20%;
  display: flex;
  align-items: center !important;
  padding-left: 5%;
}

.form-item-content {
  flex: 1;
  display: flex;
  align-items: center;
  padding-right: 20%;
}

:deep(.ivu-input) {
  padding: 15px 10px 15px 10px;
}

.progress-panel {
  background: white;
}

.theme-icon {
  color: @theme-color;
}

.refresh-btn {
  flex: 1;
  font-size: 8px;
  color: @theme-color;
  line-height: 20px;
  display: flex;
  justify-content: end
}

.refresh-btn:hover {
  cursor: pointer;
}

.btn {
  line-height: normal;
  border-radius: 10px;
  text-align: center;
  padding: 10px 15px;
}

.btn:hover {
  cursor: pointer;
}

.post-btn {
  background: @theme-color;
  color: white;
}

.save-btn {
  background: white;
  border: 1px solid #b9b9b9;
  color: black;
}

</style>