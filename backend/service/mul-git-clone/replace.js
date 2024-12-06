const fs = require("fs");
const path = require("path");

function replaceFavicon(projectDirectory, faviconPath) {
    const targetFaviconPath = path.join(projectDirectory, 'src', 'favicon.ico');
    
    if (!fs.existsSync(targetFaviconPath)) {
        console.log(`目标图标文件不存在：${targetFaviconPath}`);
        return;
    }

    fs.copyFile(faviconPath, targetFaviconPath, (error) => {
        if (error) {
            console.log(`替换图标失败：${error}`);
        } else {
            console.log(`替换图标成功：${targetFaviconPath}`);
        }
    });
}

module.exports = replaceFavicon;
