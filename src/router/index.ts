import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import NProgress from '../plugins/nProgress'
import {defineAsyncComponent} from 'vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => defineAsyncComponent(() => import(/* @vite-ignore */'@views/error/404.vue'))
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '用户登录',
            keepAlive: true,
            requireAuth: false
        },
        component: () => defineAsyncComponent(() => import(/* @vite-ignore */'@views/Login.vue'))
    },
    {
        path: '/',
        name: 'layout',
        component: () => defineAsyncComponent(() => import(/* @vite-ignore */'@layout/Index.vue')),
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
                component: () => defineAsyncComponent(() => import(/* @vite-ignore */'@views/dashboard/Index.vue'))
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
    if (to.path === '/login' || !to.meta.requireAuth) {
        next()
        // 如果localStorage 或 store中存在token 放行
    } else if (localStorage.getItem('Authorization')) {
        next()
        // 否则要求登录
    } else {
        next('/login')
    }
})

router.afterEach(() => {
    NProgress.done()
})

export default router