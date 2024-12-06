const config = {
    development: {
        port: 3000,
        mongodb: {
            uri: 'mongodb://localhost:27017/vue3-blog'
        },
        git: {
            workspacePath: '/workspace'  // Docker 容器中的工作目录
        }
    },
    production: {
        port: process.env.PORT || 3000,
        mongodb: {
            uri: process.env.MONGODB_URI || 'mongodb://mongo:27017/vue3-blog'
        },
        git: {
            workspacePath: process.env.GIT_WORKSPACE || '/workspace'
        }
    }
}

module.exports = config[process.env.NODE_ENV || 'development'] 