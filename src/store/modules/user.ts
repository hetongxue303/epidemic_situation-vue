import {defineStore} from 'pinia'

interface userStoreTypes {
    Authorization: string,// token信息
    menus: Array<any>,// 菜单列表
    collapse: boolean// 折叠面板
}

export const useUserStore = defineStore('user', {
    state: (): userStoreTypes => {
        return {
            Authorization: localStorage.getItem('Authorization') || '',
            menus: [],
            collapse: false
        }
    },
    getters: {
        // 获取折叠面板信息
        getCollapse(state) {
            return state.collapse
        },
        // 获取token信息
        getAuthorization(state) {
            return state.Authorization
        },
        // 获取菜单列表
        getMenus(state) {
            return state.menus
        }
    },
    actions: {
        // 存储折叠面板信息
        saveCollapse(status: boolean) {
            this.collapse = status
        },
        // 存储token信息
        saveAuthorization(authorization: string) {
            localStorage.setItem('Authorization', authorization)
            this.Authorization = authorization
        },
        // 清空token信息
        clearAuthorization() {
            localStorage.removeItem('Authorization')
            this.Authorization = ''
        },
        // 用户注销登录(清除信息)
        userLogout() {
            this.clearAuthorization()
            this.menus = []
            this.collapse = false
        },
        // 存储菜单列表
        saveMenus(menus: Array<any>) {
            this.menus = menus
        },
        // 清空菜单列表
        clearMenus() {
            localStorage.removeItem('menus')
            this.menus = []
        }
    }
})