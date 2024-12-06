const express = require('express');
const cors = require('cors');
const mulGitCloneRouter = require('./index');

const app = express();
const port = 3000; // 你可以修改这个端口号

// 启用 CORS
app.use(cors());

// 解析 JSON 请求体
app.use(express.json());

// 使用路由
app.use('/api', mulGitCloneRouter);

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: '服务器内部错误' });
});

// 启动服务器
app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
}); 