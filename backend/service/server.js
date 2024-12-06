const express = require('express');
const cors = require('cors');

// 导入各个服务的路由
const gitCloneRouter = require('./git-clone');
const iconReplaceRouter = require('./icon-replace');
const versionCheckRouter = require('./version-check');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 添加测试路由
app.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
});

// 注册路由
app.use('/api/clone', gitCloneRouter);
app.use('/api/replace', iconReplaceRouter);
app.use('/api/version', versionCheckRouter);

// 添加路由日志中间件
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: '服务器内部错误' });
});

app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
}); 