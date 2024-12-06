const process = require("child_process");

// Git 相关的公共方法
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

module.exports = {
    executeGitCommand
}; 