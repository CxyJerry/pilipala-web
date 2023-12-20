import {createRouter, createWebHashHistory} from 'vue-router';
import {store} from '@/store';
import {accessible_paths} from '@/api/permission';

function check_route(routes, path, accessible_paths) {
    let accessible = false
    for (let idx in routes) {
        let r = routes[idx]
        let cur_path = path + r.path
        if (r.children) {
            let check_res = check_route(r.children, cur_path, accessible_paths)
            if (!r.meta) {
                r.meta = {}
            }
            r.meta.allow = check_res
        } else {

            if (!r.meta) {
                r.meta = {}
            }
            r.meta.allow = r.meta.allow || accessible_paths.includes(cur_path);

        }
        accessible = accessible || r.meta.allow

    }
    return accessible
}

const routes = [
    {
        path: '/404',
        name: 'not-found',
        meta: {
            allow: true
        },
        component: () => import('../views/404/404.vue')
    },
    {
        path: '/',
        name: 'index',
        component: () => import('../views/index/index.vue')
    },
    {
        path: '/about',
        name: 'about',
        meta: {
            allow: true
        },
        component: () => import('../views/about/about.vue')
    },
    {
        path: '/gccenter/',
        name: 'gccenter',
        meta: {auth: true},
        component: () => import('../views/gccenter/gccenter.vue'),
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('../views/gccenter/views/home/home.vue')
            },
            {
                path: '_apply',
                name: '_apply',
                component: () => import('../views/gccenter/views/apply/apply.vue')
            },
            {
                path: 'gcupload/',
                name: 'gcupload',
                component: () => import('../views/gccenter/views/gcupload/gcupload.vue'),
                children: [
                    {
                        path: 'upload',
                        name: 'upload',
                        component: () => import('../views/gccenter/views/gcupload/views/upload/upload.vue')
                    },
                    {
                        path: 'text',
                        name: 'text',
                        component: () => import('../views/gccenter/views/gcupload/views/text.vue')
                    },
                ]
            },
            {
                path: 'cmanager/',
                name: 'cmanager',
                component: () => import('../views/gccenter/views/cmanager/cmanager.vue'),
                children: [
                    {
                        path: 'vod-manager',
                        name: 'vod-manager',
                        component: () => import('../views/gccenter/views/cmanager/views/vodmanager.vue')
                    },
                    {
                        path: '',
                        redirect: '/gccenter/cmanager/vod-manager'
                    }
                ]
            },
            {
                path: 'review',
                name: 'review',
                component: () => import('../views/gccenter/views/review/review.vue')
            },
            {
                path: '',
                redirect: '/gccenter/gcupload/upload'
            }
        ]
    },
    {
        path: '/manage/',
        meta: {
            allow: true
        },
        name: 'manage',
        component: () => import('../views/manage/p-manage.vue'),
        children: [
            {
                path: 'permission',
                name: 'permission',
                component: () => import('../views/manage/views/permission.vue')
            },
            {
                path: 'role',
                name: 'role',
                component: () => import('../views/manage/views/role.vue')
            },
            {
                path: 'user',
                name: 'user',
                component: () => import('../views/manage/views/user.vue')
            },
            {
                path: 'p-path',
                name: 'p-path',
                component: () => import('../views/manage/views/p-path.vue')
            },
            {
                path: 'apply',
                name: 'apply',
                component: () => import('../views/manage/views/apply.vue')
            },
            {
                path: 'message-template',
                name: 'message-template',
                meta: {
                    allow: true
                },
                component: () => import('../views/manage/views/message-template.vue')
            },
            {
                path: '',
                redirect: '/manage/permission'
            }
        ]
    },
    {
        path: '/player/:bvid',
        name: 'player',
        component: () => import('../views/player/player.vue')
    },
    {
        path: '/review-player/:cid',
        name: 'review-player',
        component: () => import('../views/player/review-player.vue')
    },
    {
        path: '/partition/:partition',
        name: 'partition',
        component: () => import('../views/partition/partition.vue')
    },
    {
        path: '/search/',
        name: 'search',
        component: () => import('../views/search/search.vue')
    },
    {
        path: '/sphere/:uid',
        name: 'mysphere',
        component: () => import('@/views/sphere/sphere.vue')
    },
    {
        path: '/message',
        name: 'message',
        meta: {
            allow: true
        },
        component: () => import('@/views/message/message-center.vue')
    },
];

async function createDynamicRouter() {
    let accessible = []
    try {
        accessible = (await accessible_paths()).data
    } catch (e) {
        console.log(e)
    }

    check_route(routes, '', accessible)

    store.commit('set_accessible_paths', accessible)

    let router = createRouter({
        history: createWebHashHistory(),
        routes: routes
    });
    router.beforeEach((to, from, next) => {
        const hasLogin = store.state.has_login;
        if (to.matched.some(record => record.meta.auth) && !hasLogin) {
            store.commit('set_login_modal_visible', true);
        } else {
            if (!to.meta.allow) {
                if (['/gccenter/gcupload/upload'].includes(to.path)) {
                    next("/gccenter/_apply")
                } else {
                    next("/404")
                }

            } else {
                next();
            }
        }
    });
    return router
}

let router = await createDynamicRouter()

export default router;
