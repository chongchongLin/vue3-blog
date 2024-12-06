import axios from 'axios'
import { ElMessage } from 'element-plus'
import config from '@/config'

// 创建 axios 实例
const request = axios.create({
    baseURL: config.baseURL,  // 使用配置的baseURL
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
})

// 响应拦截器
request.interceptors.response.use(
    response => response,
    error => {
        const message = error.response?.data?.error || error.message || '请求失败'
        ElMessage.error(message)
        return Promise.reject(error)
    }
)

export default request 