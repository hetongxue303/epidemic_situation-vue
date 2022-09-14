import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import NProgress from '../plugins/nProgress'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/user'
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@views/error/404.vue')
    },
    {
        path: '/user',
        name: 'login',
        meta: {
            title: '用户登录',
            keepAlive: true,
            requireAuth: false
        },
        component: () => import('@views/Login.vue')
    },
    {
        path: '/',
        name: 'layout',
        component: () => import('@layout/Index.vue'),
        redirect: '/dashboard',
        meta: {
            keepAlive: true,
            requireAuth: true
        },
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                meta: {
                    title: '仪表盘',
                    keepAlive: true,
                    requireAuth: true
                },
                component: () => import('@views/dashboard/Index.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    // 如果请求地址为/user 或 不需要授权 放行
    // if (to.path === '/user' || !to.meta.requireAuth) {
    //     next()
    //     // 如果localStorage 或 store中存在token 放行
    // } else if (localStorage.getItem('Authorization')) {
    //     next()
    //     // 否则要求登录
    // } else {
    //     next('/user')
    // }
    next()
})

router.afterEach(() => {
    NProgress.done()
})

export default router