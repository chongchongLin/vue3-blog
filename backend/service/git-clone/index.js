const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require("fs");
const { executeGitCommand } = require('../common/git');
const { ensurePath, writeJSONResponse } = require('../common/utils');

// 克隆仓库到指定路径，并返回最终的目标路径
async function cloneRepository(repositoryUrl, targetPath, branch) {
    const fileName = path.basename(repositoryUrl, '.git');
    let finalTargetPath = path.join(targetPath, fileName);
    
    if (fs.existsSync(finalTargetPath)) {
        finalTargetPath = `${finalTargetPath}_${Date.now()}`;
    }

    const cloneCommand = `git clone --branch ${branch} ${repositoryUrl} "${finalTargetPath}"`;
    
    return executeGitCommand(cloneCommand, process.cwd());
}

// 在指定目录中执行 npm install
async function installDependencies(directory) {
    const installCommand = `npm install`;
    return executeGitCommand(installCommand, directory);
}

router.post('/', async (req, res) => {
    const { company, appNames, branch, basePath, installDeps } = req.body;
    
    try {
        const basePathMessage = ensurePath(basePath);
        writeJSONResponse(res, { type: 'info', message: basePathMessage });

        const repositoryUrls = appNames.map(appName => 
            `https://tiger-devops-gitea.digiwincloud.com.cn/${company}/assc${appName}_frontend.git`
        );

        for (const url of repositoryUrls) {
            try {
                writeJSONResponse(res, { type: 'info', message: `开始克隆: ${url}` });
                
                const finalPath = await cloneRepository(url, basePath, branch);
                writeJSONResponse(res, { type: 'success', message: `克隆成功: ${url}` });
                
                if (installDeps) {
                    writeJSONResponse(res, { type: 'info', message: `开始安装依赖: ${finalPath}` });
                    await installDependencies(finalPath);
                    writeJSONResponse(res, { type: 'success', message: `依赖安装成功: ${finalPath}` });
                }
                
            } catch (error) {
                writeJSONResponse(res, { type: 'error', message: `处理失败: ${url} - ${error.message}` });
            }
        }
        
        res.end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 