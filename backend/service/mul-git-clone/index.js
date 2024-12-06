const process = require("child_process");
const path = require("path");
const fs = require("fs");
const express = require('express');
const router = express.Router();
const versionRouter = require('./version');

// 克隆仓库到指定路径，并返回最终的目标路径
async function cloneRepository(repositoryUrl, targetPath, branch) {
    const fileName = path.basename(repositoryUrl, '.git');
    let finalTargetPath = path.join(targetPath, fileName);
    
    if (fs.existsSync(finalTargetPath)) {
        finalTargetPath = `${finalTargetPath}_${Date.now()}`;
    }

    const cloneCommand = `git clone --branch ${branch} ${repositoryUrl} "${finalTargetPath}"`;
    
    return new Promise((resolve, reject) => {
        process.exec(cloneCommand, (error, stdout, stderr) => {
            if (error) {
                reject(new Error(`克隆失败：${stderr}`));
            } else {
                resolve(finalTargetPath);
            }
        });
    });
}

// 在指定目录中执行 npm install
async function installDependencies(directory) {
    const installCommand = `npm install`;
    
    return new Promise((resolve, reject) => {
        process.exec(installCommand, { cwd: directory }, (error, stdout, stderr) => {
            if (error) {
                reject(new Error(`npm install 失败：${stderr}`));
            } else {
                resolve(stdout);
            }
        });
    });
}

// 确保代码存放路径存在
function ensureBasePath(basePath) {
    if (!fs.existsSync(basePath)) {
        fs.mkdirSync(basePath, { recursive: true });
        return `代码存放路径创建成功: ${basePath}`;
    }
    return `代码存放路径已存在: ${basePath}`;
}

// 添加 Git 相关操作函数
async function executeGitCommand(command, cwd) {
    return new Promise((resolve, reject) => {
        process.exec(command, { cwd }, (error, stdout, stderr) => {
            if (error) {
                reject(new Error(stderr));
            } else {
                resolve(stdout);
            }
        });
    });
}

async function handleGitOperations(projectPath) {
    try {
        // 1. 检查当前分支是否为 develop
        const currentBranch = await executeGitCommand('git rev-parse --abbrev-ref HEAD', projectPath);
        if (currentBranch.trim() !== 'develop') {
            throw new Error('当前不在develop分支');
        }

        // 2. 检查是否有未提交的更改
        const status = await executeGitCommand('git status --porcelain', projectPath);
        if (!status.includes('favicon.ico')) {
            throw new Error('没有检测到图标文件更改');
        }

        // 3. 拉取最新代码
        await executeGitCommand('git pull origin develop', projectPath);

        // 4. 提交更改
        await executeGitCommand('git add src/favicon.ico', projectPath);
        await executeGitCommand('git commit -m "更新图标"', projectPath);

        // 5. 推送到远程
        await executeGitCommand('git push origin develop', projectPath);

        return '代码推送成功';
    } catch (error) {
        throw new Error(`Git操作失败: ${error.message}`);
    }
}

// 克隆仓库的路由处理
router.post('/clone', async (req, res) => {
    const { company, appNames, branch, basePath, installDeps } = req.body;
    
    try {
        // 确保代码存放路径存在
        const basePathMessage = ensureBasePath(basePath);
        res.write(JSON.stringify({ type: 'info', message: basePathMessage }) + '\n');

        // 生成仓库URL列表
        const repositoryUrls = appNames.map(appName => 
            `https://tiger-devops-gitea.digiwincloud.com.cn/${company}/assc${appName}_frontend.git`
        );

        // 依次克隆每个仓库
        for (const url of repositoryUrls) {
            try {
                res.write(JSON.stringify({ type: 'info', message: `开始克隆: ${url}` }) + '\n');
                
                const finalPath = await cloneRepository(url, basePath, branch);
                res.write(JSON.stringify({ type: 'success', message: `克隆成功: ${url}` }) + '\n');
                
                // 根据 installDeps 判断是否需要安装依赖
                if (installDeps) {
                    res.write(JSON.stringify({ type: 'info', message: `开始安装依赖: ${finalPath}` }) + '\n');
                    await installDependencies(finalPath);
                    res.write(JSON.stringify({ type: 'success', message: `依赖安装成功: ${finalPath}` }) + '\n');
                }
                
            } catch (error) {
                res.write(JSON.stringify({ type: 'error', message: `处理失败: ${url} - ${error.message}` }) + '\n');
            }
        }
        
        res.end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 替换图标的路由处理
router.post('/replace', async (req, res) => {
    const { basePath, faviconPath, appNames, autoPush } = req.body;
    
    try {
        // 确保基础路径存在
        const basePathMessage = ensureBasePath(basePath);
        res.write(JSON.stringify({ type: 'info', message: basePathMessage }) + '\n');

        res.write(JSON.stringify({ type: 'info', message: '开始批量替换图标操作...' }) + '\n');

        // 遍历选中的应用
        for (const appName of appNames) {
            const projectName = appName === 'web' ? 'web' : `assc${appName}_frontend`;
            const projectPath = path.join(basePath, projectName);
            const srcPath = path.join(projectPath, 'src');
            const targetFaviconPath = path.join(srcPath, 'favicon.ico');

            try {
                // 检查项目目录是否存在
                if (!fs.existsSync(projectPath)) {
                    res.write(JSON.stringify({ 
                        type: 'warning', 
                        message: `跳过 ${projectName}: 项目目录不存在` 
                    }) + '\n');
                    continue;
                }

                // 检查 src 目录是否存在
                if (!fs.existsSync(srcPath)) {
                    res.write(JSON.stringify({ 
                        type: 'warning', 
                        message: `跳过 ${projectName}: src 目录不存在` 
                    }) + '\n');
                    continue;
                }

                // 复制新的图标文件
                fs.copyFileSync(faviconPath, targetFaviconPath);
                res.write(JSON.stringify({ 
                    type: 'success', 
                    message: `图标替换成功: ${projectName}` 
                }) + '\n');

                // 如果开启了自动push，执行Git操作
                if (autoPush) {
                    res.write(JSON.stringify({ 
                        type: 'info', 
                        message: `开始执行Git操作: ${projectName}` 
                    }) + '\n');

                    const gitResult = await handleGitOperations(projectPath);
                    res.write(JSON.stringify({ 
                        type: 'success', 
                        message: `${projectName}: ${gitResult}` 
                    }) + '\n');
                }
            } catch (error) {
                res.write(JSON.stringify({ 
                    type: 'error', 
                    message: `操作失败: ${projectName} - ${error.message}` 
                }) + '\n');
            }
        }

        res.write(JSON.stringify({ type: 'success', message: '批量替换图标操作完成' }) + '\n');
        res.end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 注册版本路由
router.use('/', versionRouter);

module.exports = router;



