import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import dotenv from 'dotenv'

const resolve = (dir) => {
    return path.join(__dirname, './', dir)
}

// 插件配置
const pluginList = [
    vue()
]

export default defineConfig({
    root: './',
    publicDir: 'public',
    base: './',
    mode: 'development',
    plugins: pluginList,
    
    resolve: {
        alias: {
            '@': resolve('src'),
        }
    },
    
    optimizeDeps: {
        include: ['videojs-contrib-hls', 'vue-video-player']
    },
    
    css: {
        preprocessorOptions: {
            scss: {
                javascriptEnabled: true,
                additionalData: `@use "@/common/mixin.scss" as *;`
            },
        },
    },
    
    // 开发服务器配置
    server: {
        host: '0.0.0.0',
        port: 3101,
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',  // Docker 容器地址
                changeOrigin: true,
                secure: false
            }
        }
    },

    // 生产构建配置
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        terserOptions: {
            compress: {
                drop_console: true,  // 移除 console
                drop_debugger: true  // 移除 debugger
            }
        }
    },

    // 环境变量配置
    define: {
        'process.env': process.env
    }
})