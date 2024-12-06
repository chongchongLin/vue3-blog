const env = process.env.NODE_ENV || 'development'

const config = {
    development: {
        baseURL: '/api'  // 开发环境使用代理
    },
    production: {
        baseURL: 'http://www.waiterlin.top/api'  // 生产环境使用实际域名
    }
}

export default config[env] 