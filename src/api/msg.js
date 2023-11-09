import Api from './net'
import { store } from "@/store";

function unread_count() {
    return Api.get('/msg/unread/count')
}

function page(no, size) {
    return Api.get('/msg/page', {
        params: {
            page_no: no,
            page_size: size
        }
    })
}

function read(messageId) {
    return Api.put(`/msg/read/${messageId}`, {}, {})
}

export {
    unread_count,
    page,
    read
}

