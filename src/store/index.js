import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

const store = new Vuex.Store({
    state: {
        has_login: false,
        login_modal_visible: true,
        search_content: '',
        idle_list: [],
        user_info: null,
        reply_comment: null,
        unread_msg_count: 0,
        accessible_paths: []
    },
    mutations: {
        updateData(state, newData) {
            state.data = newData;
            // 将状态保存到localStorage
            localStorage.setItem('state', JSON.stringify(state));
        },
        set_has_login(state, status) {
            state.has_login = status
        },
        set_search_content(state, search_content) {
            state.search_content = search_content
        },
        set_login_modal_visible(state, login_modal_visible) {
            state.login_modal_visible = login_modal_visible
        },
        set_idle_list(state, idle_uid_list) {
            state.idle_list = idle_uid_list
        },
        set_user_info(state, user_info) {
            state.user_info = user_info
        },
        set_reply_comment(state, comment) {
            state.reply_comment = comment
        },
        set_unread_count(state, unread_count) {
            state.unread_msg_count = unread_count
        },
        set_accessible_paths(state, accessible_paths) {
            state.accessible_paths = accessible_paths
        }
    },
    getters: {},
    actions: {},
    modules: {},
    plugins: [createPersistedState()]
})

export {
    store
}