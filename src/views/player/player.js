import DPlayer from 'dplayer';
import {get_video, interactive, interactive_info, play_count_submit, thumbnails, time_update} from "@/api/vod";
import Commonheader from "@/components/commonheader.vue";
import {dash} from "@/utils/player";
import {convert_to_count_unit, double_time_format, format_date} from "../../utils/unit";
import PlayerOperator from "@/views/player/player-operator.vue";
import PButton from "@/components/p-button.vue";
import Pfooter from "@/components/pfooter.vue";
import PreviewVodCard from "@/views/player/components/preview-vod-card.vue";
import FollowButton from "@/components/follow-button.vue";
import {theme_color, theme_pink} from "@/style";
import {get_danmaku, send_danmaku} from "@/api/danmaku";
import {store} from "@/store";
import PDanmaku from "@/views/player/components/p-danmaku.vue";
import PPlayer from "@/views/player/components/p-player.vue";
import PVodLabel from "@/components/p-vod-label.vue";
import PCommentPanel from "@/views/player/components/p-comment-panel.vue";
import {recommendPartition} from "@/api/recommend";
import PreviewVideoCard from "@/components/preview-video-card.vue";

export default {
    components: {
        PreviewVideoCard,
        PCommentPanel,
        PVodLabel,
        PPlayer, PDanmaku, FollowButton, PreviewVodCard, Pfooter, PButton, PlayerOperator, Commonheader
    },

    data() {
        return {
            bvod: {
                bvId: "BV22F86C433F4D455D987C449214E7D95D",
                vodList: [],
                mtime: 1698250998007,
                author: {
                    uid: "652e6d71f66ff36c6072bc1c",
                    nickName: "user_d2616177",
                    avatar: null,
                    intro: null
                }
            },
            cur_vod: {},
            danmakus: [],
            author: {},

            player: null,
            recommend_list: [],
            vod_interactive: {}
        };
    },
    methods: {
        interactive,
        double_time_format,
        theme_color() {
            return theme_color
        },
        convert_to_count_unit,
        format_date,
        get_bvod() {
            this.bvod.bvId = this.$route.params.bvid
            get_video(this.bvod.bvId)
                .then(res => {
                    this.bvod = res.data
                    this.author = this.bvod.author

                    for (let vod of res.data.vodList) {
                        let quality = []
                        for (let qn of vod.quality) {
                            qn.type = 'dash'
                            qn.url = `/api${qn.url}`
                            quality.push(qn)
                        }
                        vod.quality = quality
                    }
                    this.cur_vod = this.bvod.vodList[0]
                    this.get_interactive_info()
                    this.request_commend()
                })
        },
        switch_vod(vod) {
            if (vod === this.cur_vod) {
                return
            }
            this.$router.replace({path: `/player/${this.bvod.bvId}`, query: {cid: vod.cid}})
        },
        load_danmakus(danmakus) {
            this.danmakus = danmakus
        },
        request_commend() {
            recommendPartition(this.cur_vod.partition, "投稿时间", 1, 20)
                .then(res => {
                    if (res.data.total > 0) {
                        this.recommend_list = res.data.page
                        console.log(this.recommend_list)
                    }
                }).catch(err => {

            })
        },
        share() {
            navigator.clipboard.writeText(window.location.href)
                .then(() => {
                    interactive('share', this.cur_vod.cid)
                    this.$Message.success("已复制连接")
                })
                .catch(err => {
                    this.$Message.error("复制链接失败")
                });
        },
        get_interactive_info() {
            interactive_info(this.cur_vod.cid).then(res => {
                this.vod_interactive = res.data
            })
        }
    },
    mounted() {
        // 以下为隐藏一些作者的信息和视频播放源 如不需要可删除
        // document.querySelector(".dplayer-menu").remove(); //隐藏右键菜单

        this.get_bvod()
    },

}