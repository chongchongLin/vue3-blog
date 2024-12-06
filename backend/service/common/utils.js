const fs = require("fs");
const path = require("path");

// 确保路径存在
function ensurePath(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        return `路径创建成功: ${dirPath}`;
    }
    return `路径已存在: ${dirPath}`;
}

// 统一的响应写入方法
function writeJSONResponse(res, obj) {
    const str = JSON.stringify(obj);
    res.write(Buffer.from(str + '\n', 'utf8'));
}

module.exports = {
    ensurePath,
    writeJSONResponse
}; 