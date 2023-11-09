import shaka from "shaka-player";
import {MediaPlayer} from "dashjs";

function shakaDash(video, player) {
    let src = video.src
    let playerShaka = new shaka.Player(video)
    playerShaka.load(src)
}

function dash(video, player) {
    MediaPlayer().create().initialize(video, video.src, true)
}

export {
    shakaDash,
    dash
}