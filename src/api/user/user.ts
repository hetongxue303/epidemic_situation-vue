import axios from '../../utils/request'
import * as qs from 'qs'

const baseAPI = import.meta.env.VITE_BASE_API

export const user = (data: any) => {
    return axios({
        method: 'POST',
        url: baseAPI + '/auth/login',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export const getCode=()=>{
    return axios({
        method:'GET',
        url:baseAPI+'/auth/getCode',
    })
}