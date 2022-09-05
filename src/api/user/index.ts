import axios from '../../utils/request'
import * as qs from 'qs'

const baseAPI = import.meta.env.VITE_BASE_API

const login = (data: any) => {
    return axios({
        method: 'POST',
        url: baseAPI + '/login',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export {
    login
}