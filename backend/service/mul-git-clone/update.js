const fs = require('fs');
const { exec } = require('child_process');

// 项目列表，只包含项目的根路径
const projects = [
  {
    path: '/Users/wuanchaolin/Desktop/鼎捷/云端/asscpct_frontend'
  },
  
];

const packageRelativePath = '/projects/showcase-app/package.json';
const newVersion = '5.2.0.1008';

// 执行 Git 命令的函数
function execGitCommand(command, options = {}) {
  return new Promise((resolve, reject) => {
    exec(command, options, (error, stdout, stderr) => {
      if (error) {
        reject(`命令执行错误: ${error}\n错误输出: ${stderr}`);
      } else {
        resolve(stdout);
      }
    });
  });
}

// 处理单个项目的版本升级
async function handleProjectUpgrade(project) {
  const { path } = project;
  const packagePath = `${path}${packageRelativePath}`;

  // 读取文件内容
  fs.readFile(packagePath, 'utf8', async (err, data) => {
    if (err) {
      console.error(`读取文件 ${packagePath} 时出错:`, err);
      return;
    }

    try {
      // 解析 JSON 字符串
      const packageJson = JSON.parse(data);
      const version = packageJson.version;

      // 检查当前分支是否为 develop
      const branchName = await execGitCommand('git rev-parse --abbrev-ref HEAD', { cwd: path });
      if (branchName.trim() !== 'develop') {
        console.error(`[${path}] 当前不在 develop 分支，无法执行版本升级`);
        return;
      }

      // 检查是否存在未提交的更改
      const status = await execGitCommand('git status --porcelain', { cwd: path });
      if (status.trim() !== '') {
        console.error(`[${path}] 存在未提交的更改，无法执行版本升级`);
        return;
      }

      // 拉取最新代码
      await execGitCommand('git pull', { cwd: path });
      console.log(`[${path}] 代码拉取完成`);

      // 构建版本升级命令
      const cmd = `npx schematics @webdpt/schematics:update --from=${version} --to=${newVersion}`;
      console.log(`[${path}] 命令:`, cmd);
      
      // 执行版本升级命令
      await execGitCommand(cmd, { cwd: path });
      console.log(`[${path}] 版本升级完成`);

      // 提交和推送代码
      await execGitCommand('git add .', { cwd: path });
      await execGitCommand(`git commit -m "chore: 版本升级为 ${newVersion}"`, { cwd: path });
      await execGitCommand('git push', { cwd: path });
      console.log(`[${path}] 代码推送完成`);

    } catch (error) {
      console.error(`[${path}] 执行过程中出错:`, error);
    }
  });
}

// 迭代处理所有项目
projects.forEach(project => handleProjectUpgrade(project));
