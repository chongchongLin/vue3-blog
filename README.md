# Vue3 Blog

一个基于 Vue 3 开发的现代化博客系统，包含博客展示、管理后台等功能，同时集成了 Git 仓库管理工具。

## 项目概述

本项目是一个全栈博客系统，采用前后端分离架构。前端使用 Vue 3 + Element Plus 开发，后端采用 Node.js + Express 构建。

### 主要功能模块

1. 博客展示
   - 文章列表展示
   - 文章详情页
   - 分类导航
   - 标签云

2. 管理后台
   - 文章管理（CRUD）
   - 分类管理
   - 标签管理
   - 用户管理

3. Git 仓库管理工具
   - 批量克隆仓库
   - 批量替换图标
   - 自动依赖安装
   - 自动代码提交

## 技术栈

### 前端
- Vue 3 (Composition API)
- Vue Router 4
- Element Plus
- Axios
- Vite
- TypeScript

### 后端
- Node.js
- Express
- MongoDB
- Git

## 项目结构

```
├── frontend/                # 前端项目目录
│   ├── src/
│   │   ├── api/            # API 接口
│   │   ├── assets/         # 静态资源
│   │   ├── components/     # 公共组件
│   │   ├── config/         # 配置文件
│   │   ├── layouts/        # 布局组件
│   │   ├── router/         # 路由配置
│   │   ├── services/       # 服务层
│   │   ├── store/          # 状态管理
│   │   ├── styles/         # 样式文件
│   │   ├── utils/          # 工具函数
│   │   ├── views/          # 页面组件
│   │   ├── App.vue         # 根组件
│   │   └── main.ts         # 入口文件
│   ├── public/             # 公共资源
│   ├── index.html          # HTML 模板
│   ├── package.json        # 依赖配置
│   ├── tsconfig.json       # TypeScript 配置
│   └── vite.config.ts      # Vite 配置
│
├── backend/                 # 后端项目目录
│   ├── config/             # 配置文件
│   ├── controllers/        # 控制器
│   ├── models/             # 数据模型
│   ├── routes/             # 路由
│   ├── service/            # 服务层
│   │   └── mul-git-clone/  # Git 相关服务
│   ├── utils/              # 工具函数
│   └── app.js              # 入口文件
```

## 环境要求

- Node.js >= 14.0.0
- MongoDB >= 4.0.0
- Git

## 安装和使用

### 前端

```bash
# 进入前端目录
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### 后端

```bash
# 进入后端目录
cd backend

# 安装依赖
npm install

# 启动服务
npm start
```

## 环境配置

### 开发环境
- 前端服务：http://localhost:8080
- 后端服务：http://localhost:3000
- MongoDB：mongodb://localhost:27017/vue3-blog

### 生产环境
- 网站地址：http://www.waiterlin.top
- API 地址：http://www.waiterlin.top/api

## 部署说明

1. 前端部署
   - 构建生产版本
   - 配置 Nginx
   - 设置反向代理

2. 后端部署
   - 配置环境变量
   - 设置 MongoDB 连接
   - 使用 PM2 管理进程

## 开发指南

### 目录规范
- 组件使用 PascalCase 命名
- 工具函数使用 camelCase 命名
- 样式文件使用 kebab-case 命名

### Git 工作流
- 主分支：main
- 开发分支：develop
- 功能分支：feature/*
- 修复分支：hotfix/*

### 代码规范
- 使用 ESLint 进行代码检查
- 使用 Prettier 进行代码格式化
- 遵循 Vue 3 风格指南

## 测试

```bash
# 运行单元测试
npm run test:unit

# 运行端到端测试
npm run test:e2e
```

## 贡献指南

1. Fork 本仓库
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 更新日志

### v1.0.0 (2024-03-xx)
- 初始版本发布
- 实现基础博客功能
- 集成 Git 仓库管理工具

## 许可证

[MIT License](LICENSE)

## 作者

- Website: http://www.waiterlin.top
- GitHub: [chongchongLin](https://github.com/chongchongLin)

## 致谢

感谢所有为这个项目做出贡献的开发者。