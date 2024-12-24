const process = require("child_process");
const path = require("path");
const fs = require("fs");
const express = require('express');
const router = express.Router();

// 执行 Git 命令
async function executeGitCommand(command, cwd) {
    console.log('执行 Git 命令:', command, '在目录:', cwd);
    return new Promise((resolve, reject) => {
        process.exec(command, { cwd }, (error, stdout, stderr) => {
            if (error) {
                console.error('Git 命令执行失败:', error);
                console.error('错误输出:', stderr);
                reject(new Error(stderr));
            } else {
                console.log('Git 命令执行成功:', stdout);
                resolve(stdout.trim());
            }
        });
    });
}

// 获取项目信息
async function getProjectInfo(projectPath, buildPath = '') {
    try {
        console.log('开始获取项目信息:', projectPath);
        
        // 先检查目录是否存在
        if (!fs.existsSync(projectPath)) {
            throw new Error(`项目目录不存在: ${projectPath}`);
        }

        // 检查是否是 Git 仓库
        const isGitRepo = fs.existsSync(path.join(projectPath, '.git'));
        if (!isGitRepo) {
            throw new Error(`不是有效的 Git 仓库: ${projectPath}`);
        }

        // 先拉取最新代码
        console.log('拉取最新代码...');
        await executeGitCommand('git pull', projectPath);
        
        // 获取当前分支
        console.log('获取当前分支...');
        const branch = await executeGitCommand('git rev-parse --abbrev-ref HEAD', projectPath);
        
        // 构建文件路径
        const buildFilePath = buildPath 
            ? path.join(projectPath, buildPath, 'BUILD')
            : path.join(projectPath, 'BUILD');
        
        const appVersionFilePath = buildPath
            ? path.join(projectPath, buildPath, 'APP_VERSION')
            : path.join(projectPath, 'APP_VERSION');
        
        console.log('BUILD 文件路径:', buildFilePath);
        console.log('APP_VERSION 文件路径:', appVersionFilePath);

        // 检查并读取 BUILD 文件
        if (!fs.existsSync(buildFilePath)) {
            throw new Error(`BUILD 文件不存在: ${buildFilePath}`);
        }
        const buildContent = fs.readFileSync(buildFilePath, 'utf8').trim();
        console.log('BUILD 内容:', buildContent);

        // 检查并读取 APP_VERSION 文件
        if (!fs.existsSync(appVersionFilePath)) {
            throw new Error(`APP_VERSION 文件不存在: ${appVersionFilePath}`);
        }
        const appVersion = fs.readFileSync(appVersionFilePath, 'utf8').trim();
        console.log('APP_VERSION 内容:', appVersion);

        // 组合完整版本号
        const version = `v${appVersion}.${buildContent}`;
        console.log('完整版本号:', version);

        return {
            branch,
            version,
            buildPath: buildFilePath,
            appVersionPath: appVersionFilePath
        };
    } catch (error) {
        console.error('获取项目信息失败:', error);
        throw error;
    }
}

// 修改路由处理
router.post('/', async (req, res) => {
    // 设置响应头，指定 UTF-8 编码
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    
    const { basePath, buildPath, appNames } = req.body;
    console.log('basePath:', basePath);
    console.log('buildPath:', buildPath);
    console.log('appNames:', appNames);
    try {
        // 确保基础路径存在
        if (!fs.existsSync(basePath)) {
            throw new Error(`路径不存在: ${basePath}`);
        }

        // 使用 Buffer 来正确处理中文
        const writeJSON = (obj) => {
            const str = JSON.stringify(obj);
            res.write(Buffer.from(str + '\n', 'utf8'));
        };

        // 使用新的写入方法
        writeJSON({ type: 'info', message: '开始获取版本信息...' });

        // 遍历选中的应用
        for (const appName of appNames) {
            const projectName = appName === 'web' ? 'web' : `assc${appName}_frontend`;
            const projectPath = path.join(basePath, projectName);

            try {
                if (!fs.existsSync(projectPath)) {
                    writeJSON({ 
                        type: 'warning', 
                        message: `跳过 ${projectName}: 项目目录不存在` 
                    });
                    continue;
                }

                const { branch, version, buildPath: actualPath } = await getProjectInfo(projectPath, buildPath);
                
                writeJSON({ 
                    type: 'version',
                    appName: projectName,
                    branch,
                    version,
                    buildPath: actualPath
                });

            } catch (error) {
                writeJSON({ 
                    type: 'error', 
                    message: `获取失败: ${projectName} - ${error.message}` 
                });
            }
        }

        writeJSON({ type: 'success', message: '版本信息获取完成' });
        res.end();
    } catch (error) {
        res.status(500).json({ 
            error: error.message,
            type: 'error'
        });
    }
});

module.exports = router; 