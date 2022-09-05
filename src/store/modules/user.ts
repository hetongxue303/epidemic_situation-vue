import {defineStore} from 'pinia'

interface userStoreTypes {

}

const useUserStore = defineStore('user', {
    state: (): userStoreTypes => {
        return {}
    },
    getters: {},
    actions: {}
})

export {
    useUserStore
}