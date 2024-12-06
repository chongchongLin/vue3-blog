const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require("fs");
const { executeGitCommand } = require('../common/git');
const { ensurePath, writeJSONResponse } = require('../common/utils');

async function handleGitOperations(projectPath) {
    try {
        const currentBranch = await executeGitCommand('git rev-parse --abbrev-ref HEAD', projectPath);
        if (currentBranch.trim() !== 'develop') {
            throw new Error('当前不在develop分支');
        }

        await executeGitCommand('git pull origin develop', projectPath);
        await executeGitCommand('git add src/favicon.ico', projectPath);
        await executeGitCommand('git commit -m "更新图标"', projectPath);
        await executeGitCommand('git push origin develop', projectPath);

        return '代码推送成功';
    } catch (error) {
        throw new Error(`Git操作失败: ${error.message}`);
    }
}

router.post('/', async (req, res) => {
    const { basePath, faviconPath, appNames, autoPush } = req.body;
    
    try {
        const basePathMessage = ensurePath(basePath);
        writeJSONResponse(res, { type: 'info', message: basePathMessage });

        writeJSONResponse(res, { type: 'info', message: '开始批量替换图标操作...' });

        for (const appName of appNames) {
            const projectName = appName === 'web' ? 'web' : `assc${appName}_frontend`;
            const projectPath = path.join(basePath, projectName);
            const srcPath = path.join(projectPath, 'src');
            const targetFaviconPath = path.join(srcPath, 'favicon.ico');

            try {
                if (!fs.existsSync(projectPath)) {
                    writeJSONResponse(res, { 
                        type: 'warning', 
                        message: `跳过 ${projectName}: 项目目录不存在` 
                    });
                    continue;
                }

                fs.copyFileSync(faviconPath, targetFaviconPath);
                writeJSONResponse(res, { 
                    type: 'success', 
                    message: `图标替换成功: ${projectName}` 
                });

                if (autoPush) {
                    writeJSONResponse(res, { 
                        type: 'info', 
                        message: `开始执行Git操作: ${projectName}` 
                    });

                    const gitResult = await handleGitOperations(projectPath);
                    writeJSONResponse(res, { 
                        type: 'success', 
                        message: `${projectName}: ${gitResult}` 
                    });
                }
            } catch (error) {
                writeJSONResponse(res, { 
                    type: 'error', 
                    message: `操作失败: ${projectName} - ${error.message}` 
                });
            }
        }

        writeJSONResponse(res, { type: 'success', message: '批量替换图标操作完成' });
        res.end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 