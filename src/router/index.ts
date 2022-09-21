import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import NProgress from '../plugins/nProgress'
import {defineAsyncComponent} from 'vue'
import {useUserStore} from "../store/modules/user";
import {updateRouter} from "../utils/permission/permission";

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


let WHITE_LIST = '/login'
let AUTHORIZATION_KEY = 'Authorization'
router.beforeEach((to, from, next) => {
    NProgress.start()


    if (useUserStore().getRouters) {
        let routers = useUserStore().getRouters
        routers.forEach(item => {
            router.addRoute({
                name: item.name,
                path: item.path,
                meta: {
                    title: item.title,
                    icon: item.icon,
                    roles: item.roles,
                    keepAlive: item.keepAlive,
                    requireAuth: item.requireAuth
                },
                component: () => defineAsyncComponent(() => import(/* @vite-ignore */item.component)),
                children: []
            })
            if (item.children) {
                let children = item.children
                children.forEach(cItem => {
                    router.addRoute(item.name, {
                        name: cItem.name,
                        path: cItem.path,
                        meta: {
                            title: cItem.title,
                            icon: cItem.icon,
                            roles: cItem.roles,
                            keepAlive: cItem.keepAlive,
                            requireAuth: cItem.requireAuth
                        },
                        component: () => defineAsyncComponent(() => import(/* @vite-ignore */cItem.component)),
                        children: []
                    })
                })
            }
        })
    }
    console.log(router.getRoutes())


    // 如果请求地址为白名单 或 不需要授权 则放行(完全不需要权限)
    if (WHITE_LIST.indexOf(to.path) !== -1 || !to.meta.requireAuth) {
        next();
        // 如果localStorage 或 store中存在token 放行(已登录 需要token才能放行)
    } else if (localStorage.getItem(AUTHORIZATION_KEY)) {
        next();
        // 否则要求登录(未登录状态)
    } else {
        next(WHITE_LIST[0]);
    }
})

router.afterEach((to, from, failure) => {
    NProgress.done()
})

export default router