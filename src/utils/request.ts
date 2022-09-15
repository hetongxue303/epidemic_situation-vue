import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'
import {ElMessage, ElNotification} from 'element-plus'
import {useRouter} from 'vue-router'
import * as nProgress from 'nprogress'
import {useUserStore} from "../store/modules/user";

axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 5000,
    withCredentials: true
})

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

axios.interceptors.request.use((config: AxiosRequestConfig) => {
    nProgress.start()
    // 判断用户是否登录 若已登录则每次请求都加上token信息在头部
    if (useUserStore().getAuthorization && localStorage.getItem('Authorization') && config.headers) {
        config.headers.Authorization = useUserStore().getAuthorization
    }
    return config;
}, ((error: any) => {
    ElNotification.error('请求错误！')
    return Promise.reject(error);
}))

axios.interceptors.response.use((response: AxiosResponse) => {
    nProgress.done()
    switch (response.status as number) {
        case 401: {
            ElMessage.warning('请先登录')
            const router = useRouter()
            router.push('/user')
            break
        }
        case 403: {
            ElMessage.warning('拒绝访问')
            break
        }
    }
    return response;
}, ((error: any) => {
        ElNotification.error('响应错误！')
        return Promise.reject(error);
    }
))

export default axios