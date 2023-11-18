<script>
import player from "@/views/player/player";

export default player
</script>

<template>
  <commonheader/>
  <div
      style="display: flex;flex-direction: column;padding-left: 5%;padding-top:20px;padding-right:5%;flex: 1;">
    <!--  头部  -->
    <div style="display: flex;flex-direction: row;padding-bottom: 10px">
      <!--   视频标题   -->
      <div style="display: flex;flex-direction: column;padding-top: 10px;justify-content: end">
        <div><span style="font-weight: bold;line-height: 30px;font-size: 18px">{{ cur_vod.title }}</span>
        </div>
        <div style="display: flex;flex-direction: row">
          <!--     观看数     -->
          <div
              style="display: flex;flex-direction: row;align-items: center;padding-left: 3px;padding-right: 3px">
            <Icon type="logo-youtube" color="rgba(204,204,204,0.89)"/>
            <div style="color: rgba(204,204,204,0.89);margin-left: 3px;margin-right: 3px;">
              {{ convert_to_count_unit(cur_vod.viewCount) }}
            </div>
          </div>
          <!--     弹幕数     -->
          <div
              style="display: flex;flex-direction: row;align-items: center;padding-left: 3px;padding-right: 3px">
            <Icon type="ios-list-box" color="rgba(204,204,204,0.89)"/>
            <span style="color: rgba(204,204,204,0.89);margin-left: 3px;margin-right: 3px">{{
                convert_to_count_unit(cur_vod.commentCount)
              }}</span>
          </div>
          <!--     投稿时间     -->
          <div style="padding-left: 3px;padding-right: 3px">
            <span style="color: rgba(204,204,204,0.89)"> {{ format_date(cur_vod.mtime) }}</span>
          </div>
          <!--      版权声明     -->
          <div style="padding-left: 3px;padding-right: 3px;justify-content: end;display: flex;align-items: center">
            <div style="display: flex;justify-content: center">
              <svg t="1698168152692" class="icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg"
                   p-id="2320" width="16" height="16">
                <path
                    d="M511.175727 162.355715c-192.325283 0-349.669868 157.343561-349.669868 349.669868 0 192.276165 157.344584 349.619726 349.669868 349.619726s349.669868-157.343561 349.669868-349.619726C860.845595 319.699276 703.502034 162.355715 511.175727 162.355715M231.470327 512.024559c0-153.886833 125.890198-279.758612 279.7054-279.758612 62.945611 0 122.361839 20.974707 171.375136 59.46637l-391.670447 391.594723C252.46857 634.386398 231.470327 574.947657 231.470327 512.024559M511.175727 791.729959c-62.952774 0-122.360815-20.973684-171.329087-59.438741l391.617236-391.617236c38.465057 48.940642 59.416228 108.407012 59.416228 171.3516C790.881127 665.862273 665.036977 791.729959 511.175727 791.729959"
                    p-id="2321" fill="rgba(255,0,0,0.73)"></path>
              </svg>
            </div>
            <span style="color: rgba(204,204,204,0.89);font-size: small">未经作者授权，禁止转载</span>
          </div>
        </div>
      </div>
      <!--   up 主信息   -->
      <div style="flex: 1;justify-content: end;display: flex;align-items: center">
        <div style="padding: 10px">
          <div v-if="author.avatar">
            <img :src="author.avatar" alt=""
                 style="width: 50px;height: 50px;border-radius: 9999px;border:1px solid #adadad"/>
          </div>
          <div v-else>
            <div style="width: 50px;height: 50px;background: white;border-radius: 9999px;border:1px solid #adadad">
              <svg t="1698170965279" class="icon" viewBox="0 0 1034 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" p-id="3884" width="48" height="48">
                <path
                    d="M977.92 512.47616C977.92 766.68416 771.59936 972.8 517.0688 972.8 262.57408 972.8 56.32 766.68416 56.32 512.47616c0-195.1232 121.46176-361.8304 292.99712-428.82048C401.14176 62.7456 457.76384 51.2 517.08416 51.2c59.392 0 115.96288 11.53536 167.84384 32.45568C856.448 150.65088 977.92 317.35808 977.92 512.47616zM339.968 415.40096c0 77.57312 39.75168 144.73216 97.536 177.6128 23.9616 13.63456 50.944 21.49376 79.5648 21.49376 27.62752 0 53.66784-7.35232 77.0048-20.06016 59.14624-32.24576 100.17792-100.22912 100.17792-179.03616 0-109.7216-79.4624-199.03488-177.1776-199.03488-97.65376-0.01024-177.1008 89.29792-177.1008 199.01952z m178.97472 527.56992c134.62528 0 254.72-61.90592 333.43488-158.7968-9.29792-76.42624-83.77344-141.48608-189.184-173.93664-39.808 35.80928-90.67008 57.35424-146.13504 57.35424-56.69376 0-108.5952-22.7072-148.79232-60.07296-102.53312 29.2608-177.63328 88.94976-195.24608 160.47104 78.11072 106.10688 204.0064 174.98112 345.92256 174.98112z"
                    fill="#bfbfbf" p-id="3885"></path>
              </svg>
            </div>
          </div>
        </div>
        <div style="display: flex;flex-direction: column;justify-content: start;width: 20%">
          <span class="nickname" @click="this.$router.push(`/sphere/${author.uid}`)">{{
              author.nickName
            }}</span>
          <span
              style="white-space: nowrap;text-overflow: ellipsis;overflow:hidden;font-size: small;color: rgba(177,177,177,0.87)">{{
              author.intro ? author.intro : '这个人很懒，这里啥也没有'
            }}</span>

          <follow-button :user="author"/>
        </div>
      </div>
    </div>
    <!--  播放器  -->
    <div style="display: flex;flex-direction: row;flex: 1">
      <div style="padding-right: 2%;flex: 1;">
        <p-player :cur_vod="cur_vod" @danmaku-loaded="load_danmakus"></p-player>
        <!--  操作栏  -->
        <div style="display: flex;flex-direction: row;padding: 10px">
          <!--   点赞   -->
          <div :class="{'active-operation-icon':vod_interactive.liked,'operation-icon':!vod_interactive.liked}"
               @click="interactive('like',cur_vod.cid)&&get_interactive_info()">
            <svg t="1698847767122" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="2382" width="25" height="25">
              <path
                  d="M64 483.04V872c0 37.216 30.144 67.36 67.36 67.36H192V416.32l-60.64-0.64A67.36 67.36 0 0 0 64 483.04zM857.28 344.992l-267.808 1.696c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-68.832-155.488-137.568-145.504-60.608 8.8-67.264 61.184-67.264 126.816v59.264c0 76.064-63.84 140.864-137.856 148L256 416.96v522.4h527.552a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824z"
                  p-id="2383"></path>
            </svg>
            <span>{{ cur_vod.likeCount }}</span>
          </div>
          <!--   投币   -->
          <div :class="{'active-operation-icon':vod_interactive.coined,'operation-icon':!vod_interactive.coined}"
               @click="interactive('coin',cur_vod.cid)&&get_interactive_info()">
            <svg t="1698847805965" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="3861" width="25" height="25">
              <path d="M511.609097 961.619254" p-id="3862"></path>
              <path
                  d="M751.884462 249.701039l-11.94403 0c-9.277294-59.402925-60.517305-104.903212-122.523521-104.903212-27.836999 0-53.445236 9.272177-74.15286 24.742521-24.149003-40.692794-68.40188-68.056002-119.153774-68.056002-50.500161 0-94.559633 27.096125-118.788453 67.455321-13.730723-6.181793-28.91761-9.702989-44.953841-9.702989-54.017264 0-98.815563 39.065737-107.934245 90.465384L125.635395 249.702062c-34.505885 0-62.478983 27.973098-62.478983 62.478983l0 20.12741c0 34.505885 27.973098 62.478983 62.478983 62.478983l626.25009 0c34.505885 0 62.478983-27.973098 62.478983-62.478983l0-20.12741C814.363446 277.673114 786.390347 249.701039 751.884462 249.701039z"
                  p-id="3863"></path>
              <path
                  d="M881.70211 484.034065l-119.445416-8.6848 0-50.15019L115.263164 425.199075l0 418.516886c0 42.98807 35.172057 78.160127 78.160127 78.160127l490.673276 0c42.98807 0 78.160127-35.172057 78.160127-78.160127l0-21.069875 119.445416-8.6848c42.98807 0 78.160127-35.172057 78.160127-78.160127L959.862237 562.194192C959.862237 519.206122 924.69018 484.034065 881.70211 484.034065zM315.182402 800.548812c0 22.091134-18.074657 40.164768-40.165792 40.164768-22.091134 0-40.165792-18.074657-40.165792-40.164768L234.850819 546.527374c0-22.091134 18.074657-40.165792 40.165792-40.165792 22.091134 0 40.165792 18.074657 40.165792 40.165792L315.182402 800.548812zM478.92572 800.548812c0 22.091134-18.074657 40.164768-40.165792 40.164768s-40.165792-18.074657-40.165792-40.164768L398.594137 546.527374c0-22.091134 18.074657-40.165792 40.165792-40.165792s40.165792 18.074657 40.165792 40.165792L478.92572 800.548812zM642.668015 800.548812c0 22.091134-18.074657 40.164768-40.165792 40.164768-22.091134 0-40.165792-18.074657-40.165792-40.164768L562.336432 546.527374c0-22.091134 18.074657-40.165792 40.165792-40.165792 22.091134 0 40.165792 18.074657 40.165792 40.165792L642.668015 800.548812zM899.045103 704.316074c0 26.869974-21.98471 48.853661-48.854685 48.853661l-87.933725 8.6848L762.256694 536.140817l87.933725 8.6848c26.869974 0 48.854685 21.98471 48.854685 48.853661L899.045103 704.316074z"
                  p-id="3864"></path>
            </svg>
            <span>{{ cur_vod.coinCount }}</span>
          </div>
          <!--   收藏   -->
          <div :class="{'active-operation-icon':vod_interactive.collected,'operation-icon':!vod_interactive.collected}"
               @click="interactive('collect',cur_vod.cid)&&get_interactive_info()">
            <svg t="1698848097286" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="13308" width="25" height="25">
              <path
                  d="M335.008 916.629333c-35.914667 22.314667-82.88 10.773333-104.693333-25.557333a77.333333 77.333333 0 0 1-8.96-57.429333l46.485333-198.24a13.141333 13.141333 0 0 0-4.021333-12.864l-152.16-132.586667c-31.605333-27.52-35.253333-75.648-8.234667-107.733333a75.68 75.68 0 0 1 51.733333-26.752L354.848 339.2c4.352-0.362667 8.245333-3.232 10.026667-7.594667l76.938666-188.170666c16.032-39.2 60.618667-57.92 99.52-41.461334a76.309333 76.309333 0 0 1 40.832 41.461334l76.938667 188.16c1.781333 4.373333 5.674667 7.253333 10.026667 7.605333l199.712 16.277333c41.877333 3.413333 72.885333 40.458667 69.568 82.517334a76.938667 76.938667 0 0 1-26.08 51.978666l-152.16 132.586667c-3.541333 3.082667-5.141333 8.074667-4.021334 12.853333l46.485334 198.24c9.621333 41.013333-15.36 82.336-56.138667 92.224a75.285333 75.285333 0 0 1-57.525333-9.237333l-170.976-106.24a11.296 11.296 0 0 0-12.010667 0l-170.986667 106.24z"
                  p-id="13309"></path>
            </svg>
            <span>{{ cur_vod.collectCount }}</span>
          </div>
          <!--   转发   -->
          <div class="operation-icon" @click="share">
            <svg t="1698848171080" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="16187" width="25" height="25">
              <path
                  d="M1014.88968 411.786477l-364.412811-400.854093c-14.576512-14.576512-36.441281-14.576512-51.017794 0C584.882562 25.508897 584.882562 32.797153 584.882562 47.373665l0 211.359431c-298.818505 0-583.060498 247.800712-583.060498 546.619217 0 80.170819 36.441281 182.206406 72.882562 218.647687 43.729537-225.935943 269.66548-400.854093 510.177936-400.854093 0 21.864769 0 218.647687 0 218.647687 0 7.288256 0 14.576512 7.288256 29.153025 14.576512 14.576512 43.729537 7.288256 51.017794 0l364.412811-393.565836C1022.177936 462.80427 1022.177936 448.227758 1022.177936 440.939502 1022.177936 433.651246 1022.177936 419.074733 1014.88968 411.786477z"
                  p-id="16188"></path>
            </svg>
            <span>{{ cur_vod.collectCount }}</span>
          </div>
        </div>
        <!--  标签栏  -->
        <div style="display: flex;flex-direction: row;padding:3px 10px">
          <p-vod-label v-for="label in cur_vod.labels">
            {{ label }}
          </p-vod-label>
        </div>
        <!--  评论  -->
        <p-comment-panel :cid="cur_vod.cid"/>
      </div>
      <!--   右侧操作栏   -->
      <div class="opera">
        <!-- 弹幕列表 -->
        <div style="background: #f3f3f3;width: 100%;padding: 10px 20px;border-radius: 10px">

          <span style="font-weight: bold;line-height: 30px;">弹幕列表</span>
          <div style="display: flex;flex-direction: column;overflow-y: scroll;max-height: 300px;position: relative">
            <div style="padding: 5px 10px;display: flex;flex-direction: row;font-size: small;">
              <div style="">时间</div>
              <div style="flex: 1;padding-left: 15%">弹幕内容</div>
            </div>

            <div style="padding: 5px 10px;display: flex;flex-direction: row;font-size: small"
                 v-for="danmaku in danmakus">
              <div style="">{{ double_time_format(danmaku[0]) }}</div>
              <div style="flex: 1;padding-left: 15%">{{ danmaku[danmaku.length - 1] }}</div>
            </div>
          </div>
        </div>
        <!--    正片列表    -->
        <div
            style="background: rgba(243,243,243,0.84);width: 100%;padding: 10px 20px;border-radius: 10px;margin-top: 10px"
            v-if="bvod.vodList.length>1">
          <span style="font-weight: bold">正片</span>
          <div
              style="display: flex;flex-direction: column;max-height: 200px;overflow-y: scroll;padding: 10px 0;">
            <preview-vod-card :vod="vod" v-for="vod in bvod.vodList"
                              :style="{color:cur_vod===vod?theme_color():'#6e6e6e'}"
                              @click="switch_vod(vod)"/>
          </div>
        </div>
        <!--    推荐列表    -->
        <div style="display: flex;flex-direction: column;flex: 1;margin-top: 5%;width: 100%;height: 100%">
          <horizontal-preview-video-card style="width: 100%;" v-for="(bvod,idx) in recommend_list" :bvod="bvod"
                                         :id_suffix="bvod.partition" :show_partition="false"/>
        </div>
      </div>

    </div>

  </div>

  <pfooter/>
</template>

<style lang="less" scoped>
@import "@/style/index.less";


.opera {
  width: 20%;
}

.nickname {
  font-size: 16px;
  font-weight: bold;
  color: @theme-pink;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden
}

.nickname:hover {
  cursor: pointer;
}

.operation-icon {
  padding: 5px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  fill: #989898;

  span {
    padding-left: 5px;
    color: #858585
  }
}

.active-operation-icon {
  padding: 5px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  fill: @theme-color;

  span {
    padding-left: 5px;
    color: #858585
  }
}

.active-operation-icon :hover {
  cursor: pointer;
  fill: @theme-color;
}

.operation-icon:hover {
  cursor: pointer;
  fill: @theme-color;
}
</style>