import axios from '../../utils/request'
import * as qs from 'qs'

const baseAPI = import.meta.env.VITE_BASE_API

/**
 * 用户登录
 * @param data
 */
const login = (data: any) => {
    return axios({
        method: 'POST',
        url: baseAPI + '/auth/login',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

const logout = () => {
    return axios({
        method: 'GET',
        url: baseAPI + '/auth/logout'
    })
}
/**
 * 获取验证码
 */
const getCode = () => {
    return axios({
        method: 'GET',
        url: baseAPI + '/auth/getCode'
    })
}

export {
    login, logout, getCode
}