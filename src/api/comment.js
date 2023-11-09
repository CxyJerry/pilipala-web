import Api from './net'

function send_comment(cid, parent_id, content) {
    return Api.post('/comment/post', {
        cid: cid,
        parentCommentId: parent_id,
        content: content
    })
}

function get_comment(cid, parent_comment_id, page_no, page_size) {
    return Api.get('/comment/get', {
        params: {
            cid: cid,
            parent_comment_id: parent_comment_id,
            page_no: page_no,
            page_size: page_size
        }
    })
}

export {
    send_comment,
    get_comment
}