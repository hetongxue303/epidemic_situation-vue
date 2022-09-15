import {RouteRecordRaw, useRouter} from 'vue-router'
import {IMenu, IRouter} from './types'
import {useUserStore} from '../../store/modules/user'
import {defineAsyncComponent} from 'vue'

const userStore = useUserStore()

let generateRoute = (routerList: Array<IRouter>): Array<RouteRecordRaw> => {
    let routers: Array<RouteRecordRaw> = []
    // 循环遍历后台路由数据
    routerList.forEach(item => {
        // 将对应数据设置在 RouteRecordRaw
        let route: RouteRecordRaw = {
            name: item.name,
            path: item.path,
            // 在 vue3+vite 中使用这种方式会报警告 需要使用 defineAsyncComponent 引入
            // component: () => import(item.component),
            component: () => defineAsyncComponent(() => import(/* @vite-ignore */item.component)),
            meta: {
                title: item.meta.title,
                icon: item.meta.icon,
                roles: item.meta.roles,
                keepAlive: item.meta.keepAlive,
                requireAuth: item.meta.requireAuth,
            },
            children: item.children == null ? [] : generateRoute(item.children as Array<IRouter>)
        }
        // 添加到 RouteRecordRaw 列表
        routers.push(route)
    })
    return routers
}

// 更新路由
const updateRouter = (routerList: Array<IRouter>) => {
    let router = useRouter()
    generateRoute(routerList).forEach(item => {
        router.addRoute(item)
    })
}

// 生菜菜单
let generateMenu = (routersList: Array<IMenu>): Array<IMenu> => {
    let routers: Array<IMenu> = [
        {
            name: '首页',
            path: '/dashboard',
            icon: 'location'
        }
    ]
    routersList.forEach(item => {
        routers.push(item)
    })
    return routers
}

// 更新菜单
const updateMenu = (routersList: Array<IMenu>) => userStore.saveMenus(generateMenu(routersList))


export {
    updateMenu, updateRouter
}