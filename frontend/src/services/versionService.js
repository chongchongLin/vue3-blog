import request from '@/utils/request'

class VersionService {
    async getLatestVersions(params, onLogCallback) {
        try {
            const response = await request({
                url: '/version',
                method: 'post',
                data: params,
                responseType: 'text'
            })

            const lines = response.data.split('\n')
            for (const line of lines) {
                if (line) {
                    try {
                        const log = JSON.parse(line)
                        onLogCallback(log)
                    } catch (error) {
                        console.error('解析日志失败:', error)
                    }
                }
            }
        } catch (error) {
            throw new Error(`获取版本号失败: ${error.message}`)
        }
    }
}

export default new VersionService() 