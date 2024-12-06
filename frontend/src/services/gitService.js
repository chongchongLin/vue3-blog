import request from '@/utils/request'

class GitService {
    // 处理流式响应的通用方法
    async handleStreamResponse(response, onLogCallback) {
        // axios 会自动处理 response.data
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
    }

    // 克隆仓库
    async cloneRepositories(params, onLogCallback) {
        try {
            const response = await request({
                url: '/clone',
                method: 'post',
                data: params,
                // 设置响应类型为文本，因为我们需要手动处理流式响应
                responseType: 'text'
            })

            await this.handleStreamResponse(response, onLogCallback)
        } catch (error) {
            throw new Error(`克隆仓库失败: ${error.message}`)
        }
    }

    // 替换图标
    async replaceIcons(params, onLogCallback) {
        try {
            const response = await request({
                url: '/replace',
                method: 'post',
                data: params,
                responseType: 'text'
            })

            await this.handleStreamResponse(response, onLogCallback)
        } catch (error) {
            throw new Error(`替换图标失败: ${error.message}`)
        }
    }
}

export default new GitService() 