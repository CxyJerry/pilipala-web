import Api from "@/api/net";
import {Message} from "view-ui-plus";
import {store} from "@/store";
import {idles} from "@/api/fans";

function login(tel, code) {
    return Api.post('/user/login', {
        tel: tel,
        verifyCode: code
    }).then(res => {
        Message.success({
            content: '登录成功'
        })
        store.commit('set_user_info', res.data)
        store.commit('set_has_login', true)
        store.commit('set_login_modal_visible', false)
        idles()
    })
}

function email_login(email, code) {
    return Api.post('/user/email-login', {
        email: email,
        verifyCode: code
    }).then(res => {
        Message.success({
            content: '登录成功'
        })
        store.commit('set_user_info', res.data)
        store.commit('set_has_login', true)
        store.commit('set_login_modal_visible', false)
        idles()
    })
}


function code(tel) {
    return Api.get('/user/code', {
        params: {
            tel: tel
        }
    })
}

function email_code(email) {
    return Api.get('/user/email-code', {
        params: {
            email: email
        }
    })
}

function logout() {
    Api.get('/user/logout').then(res => {
        localStorage.clear()
        store.commit('set_has_login', false)
        Message.success({
            content: '已登出'
        })
    })
}

function user_info(uid) {
    return Api.get('/user/info', {
        params: {
            uid: uid
        }
    })
}

function user_page(page_no, page_size) {
    return Api.get('/user/page', {
        params: {
            page_no: page_no,
            page_size: page_size
        }
    })
}

export {
    login,
    email_login,
    code,
    email_code,
    logout,
    user_info,
    user_page
}