import shaka from "shaka-player";
import {MediaPlayer} from "dashjs";
import {toRaw} from "vue";

function shakaDash(video, player) {
    let src = video.src
    let playerShaka = new shaka.Player(video)
    playerShaka.load(src)
}

function dash(video, player) {
    MediaPlayer().create().initialize(video, video.src, true)
}

function play_vod(vod) {
    vod = toRaw(vod)
    let bvid = vod.bvId
    this.$router.push('/player/' + bvid)
}

export {
    shakaDash,
    dash,
    play_vod
}