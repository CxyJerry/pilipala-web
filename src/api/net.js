import axios from "axios";
import {Message} from "view-ui-plus";
import {store} from "@/store";

const Api = axios.create({
    baseURL: '/api'
})

function errorHandler(response) {
    response = response.response
    switch (response.status) {
        case 403:
            Message.error({content: '请先登录'})
            store.commit('set_has_login', false)
            store.commit('set_user_info', null)
            store.commit('set_idle_list', [])
            store.commit('set_login_modal_visible', true)
            break
        case 404:
            Message.error({
                content: '错误请求'
            })
            break
        case 500:
            Message.error({
                content: response.data.message
            })
            break
        default:
            console.log("未知请求错误，请检查 net.js")
    }
    return {}
}

function successHandler(response) {
    return response.data
}

Api.interceptors.request.use(config => {
    store.commit('set_has_login', store.state.has_login)
    return config
})
Api.interceptors.response.use(
    res => {
        return Promise.resolve(successHandler(res))
    },
    err => {
        return Promise.reject(errorHandler(err))
    }
)

export default Api