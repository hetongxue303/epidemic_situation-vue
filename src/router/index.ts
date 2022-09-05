import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import NProgress from '../plugins/nProgress'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../views/error/404.vue')
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '用户登录',
            keepAlive: true,
            requireAuth: false
        },
        component: () => import('@views/login.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
})

router.afterEach(() => {
    NProgress.done()
})

export default router