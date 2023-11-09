import Api from './net'

function get_danmaku(cid) {
    return Api.get('/danmaku/v3/', {
        params: {
            id: cid
        }
    })
}

function send_danmaku(author, color, cid, content, time, type = 0) {
    return Api.post('/danmaku/v3/', {
        author: author,
        color: color,
        id: cid,
        text: content,
        time: time,
        type: type,
    });
}

export {
    send_danmaku,
    get_danmaku
}