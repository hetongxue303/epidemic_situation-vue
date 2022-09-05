import {defineStore} from 'pinia'

interface mainStoreTypes {

}

export const useMainStore = defineStore('main', {
    state: (): mainStoreTypes => {
        return {}
    },
    getters: {},
    actions: {}
})