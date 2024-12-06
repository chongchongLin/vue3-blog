# 使用 Node.js 14 作为基础镜像
FROM node:14.21.0-alpine

# 设置工作目录
WORKDIR /app

# 首先只复制 package.json 和 package-lock.json（如果存在）
COPY package*.json ./

# 安装依赖
RUN npm install

# 然后再复制其他文件
COPY . .

# 暴露端口
EXPOSE 3000

# 确保使用正确的入口文件路径
CMD ["node", "service/server.js"]