import Api from './net'
import {store} from "@/store";

function follow(up_uid) {
    return Api.put(`/fans/put`, {}, {
        params: {
            up_uid: up_uid
        }
    })
}

function idles() {
    Api.get('/fans/idles').then(res => {
        console.log(res.data)
        store.commit('set_idle_list', res.data)
    })
}

export {
    follow,
    idles
}