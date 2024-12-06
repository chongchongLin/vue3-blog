const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require("fs");
const { executeGitCommand } = require('../common/git');
const { writeJSONResponse } = require('../common/utils');

async function getProjectInfo(projectPath, buildPath = '') {
    try {
        // ... 保持原有的 getProjectInfo 逻辑 ...
    } catch (error) {
        console.error('获取项目信息失败:', error);
        throw error;
    }
}

router.post('/', async (req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    
    const { basePath, buildPath, appNames } = req.body;
    
    try {
        // ... 保持原有的路由处理逻辑 ...
    } catch (error) {
        res.status(500).json({ 
            error: error.message,
            type: 'error'
        });
    }
});

module.exports = router; 