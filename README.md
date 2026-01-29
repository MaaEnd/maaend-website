# MaaEnd Website

<div align="center">
  <img src="public/MaaEnd-Tiny-512.png" alt="MaaEnd Logo" width="200" />
  
  <h3>MaaEnd 终末地小助手 - 官方网站</h3>
  
  <p>
    <strong>高精度自动化助手。专为「明日方舟：终末地」重度作战和最大化效率而设计。</strong>
  </p>

  <p>
    <a href="https://github.com/MaaEnd/MaaEnd/releases">
      <img src="https://img.shields.io/github/v/release/MaaEnd/MaaEnd?style=flat-square" alt="Release" />
    </a>
    <a href="https://github.com/MaaEnd/MaaEnd/stargazers">
      <img src="https://img.shields.io/github/stars/MaaEnd/MaaEnd?style=flat-square" alt="Stars" />
    </a>
    <a href="https://github.com/MaaEnd/MaaEnd/blob/main/LICENSE">
      <img src="https://img.shields.io/github/license/MaaEnd/MaaEnd?style=flat-square" alt="License" />
    </a>
  </p>

  <p>
    <a href="https://maaend.com">🌐 访问网站</a>
    ·
    <a href="https://github.com/MaaEnd/MaaEnd">📦 核心项目</a>
    ·
    <a href="https://github.com/MaaEnd/MaaEnd/releases">⬇️ 下载</a>
  </p>
</div>

---

## ✨ 项目简介

这是 **MaaEnd 终末地小助手**的官方网站仓库，采用现代化的技术栈构建，提供产品介绍、功能展示、版本下载等功能。

MaaEnd 是一个基于 AI 图像识别技术的《明日方舟：终末地》高级自动化助手，支持：
- 🎯 实时作战辅助
- 🧩 自动解谜
- 💰 自动贸易
- 📐 蓝图导入
- 📅 日常自动化
- 💻 跨平台支持（Windows/Android）

## 🚀 技术栈

- **框架**: [Next.js 16](https://nextjs.org/) (App Router)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式**: [Tailwind CSS v4](https://tailwindcss.com/)
- **动画**: [Framer Motion](https://www.framer.com/motion/)
- **3D**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + [Three.js](https://threejs.org/)
- **国际化**: [i18next](https://www.i18next.com/) + [react-i18next](https://react.i18next.com/)
- **主题**: [next-themes](https://github.com/pacocoursey/next-themes)
- **图标**: [Lucide React](https://lucide.dev/)
- **包管理**: [pnpm](https://pnpm.io/)
- **代码规范**: ESLint + Prettier + Husky + lint-staged

## 📦 快速开始

### 环境要求

- Node.js 20.x 或更高版本
- pnpm 10.x

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看效果。

### 构建生产版本

```bash
pnpm build
```

### 启动生产服务器

```bash
pnpm start
```

## 📁 项目结构

```
maaend-website/
├── app/                      # Next.js App Router 目录
│   ├── components/           # React 组件
│   │   ├── hero/            # Hero 区域子组件
│   │   │   ├── BackgroundLayer.tsx
│   │   │   └── InteractiveModelOptimized.tsx
│   │   ├── ui/              # 通用 UI 组件
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Logo.tsx
│   │   ├── About.tsx        # 关于区域
│   │   ├── Features.tsx     # 功能特性区域
│   │   ├── Footer.tsx       # 页脚
│   │   ├── Header.tsx       # 页头
│   │   ├── Hero.tsx         # 首屏英雄区
│   │   └── ThemeToggle.tsx  # 主题切换
│   ├── globals.css          # 全局样式
│   ├── layout.tsx           # 根布局
│   ├── page.tsx             # 首页
│   └── providers.tsx        # 全局 Provider
├── locales/                 # 国际化资源
│   ├── en.json             # 英文
│   └── zh.json             # 简体中文
├── public/                  # 静态资源
│   └── MaaEnd-Tiny-512.png # Logo
├── .github/workflows/       # CI/CD 配置
│   └── deploy.yml          # 自动部署
├── i18n.ts                 # i18n 配置
├── next.config.ts          # Next.js 配置
├── tailwind.config.ts      # Tailwind 配置
├── tsconfig.json           # TypeScript 配置
└── package.json            # 项目配置
```

## 🎨 核心功能

### 🌍 国际化支持

- 支持中文（简体）和英文
- 基于 `i18next` 实现
- 自动检测浏览器语言
- 语言切换实时生效

### 🌓 深色模式

- 支持浅色/深色主题切换
- 基于 `next-themes` 实现
- 主题状态持久化
- 平滑过渡动画

### 🎭 交互式 3D 模型

- 基于 Three.js 的粒子系统
- 鼠标交互效果
- 性能优化（降帧、防抖）
- 响应式适配

### 📥 智能下载系统

- 自动检测用户操作系统和架构
- 从 GitHub API 获取最新版本
- 支持多平台下载（Windows x64/ARM64, macOS, Linux）
- Mirror 酱 CDN 加速下载

### ⚡ 性能优化

- 图片懒加载和优化
- 动画性能优化
- 代码分割
- 静态资源缓存

## 🛠️ 开发指南

### 代码规范

项目使用 ESLint 和 Prettier 进行代码规范检查：

```bash
# 运行 ESLint 检查
pnpm lint

# 自动修复 ESLint 问题
pnpm lint:fix

# 格式化代码
pnpm format

# 检查代码格式
pnpm format:check
```

### Git Commit 规范

项目使用 Husky 和 lint-staged 进行 Git Hooks 管理，每次提交前会自动：
- 运行 ESLint 检查和自动修复
- 运行 Prettier 格式化
- 检查暂存文件

### 添加新语言

1. 在 `locales/` 目录创建新的语言文件（如 `ja.json`）
2. 复制 `en.json` 或 `zh.json` 的结构
3. 翻译所有文本内容
4. 在 `i18n.ts` 中注册新语言

### 修改样式主题

主题颜色定义在 `app/globals.css` 中，主要颜色变量：
- `--primary`: 主色调（金色）
- `--secondary`: 辅助色（青色）
- `--background`: 背景色
- `--foreground`: 前景色

## 🚀 部署

### 自动部署

项目配置了 GitHub Actions 自动部署流程（`.github/workflows/deploy.yml`），当推送到主分支时会自动触发部署。

### 手动部署

#### Vercel（推荐）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/MaaEnd/maaend-website)

#### 其他平台

```bash
# 构建项目
pnpm build

# 输出目录为 .next/
# 可以部署到任何支持 Node.js 的托管平台
```

### 环境变量

目前项目不需要额外的环境变量配置。

## 🤝 贡献指南

欢迎贡献代码、报告问题或提出建议！

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'feat: add some amazing feature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### Commit Message 规范

- `feat`: 新功能
- `fix`: 修复 Bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具链更新

## 📄 开源协议

本项目采用 [AGPL-3.0](LICENSE) 开源协议。

## 🔗 相关链接

- [MaaEnd 核心项目](https://github.com/MaaEnd/MaaEnd)
- [官方网站](https://maaend.com)
- [用户 QQ 群](https://qm.qq.com/q/aUfJ1lYwFW): 1062010346
- [开发 QQ 群](https://qm.qq.com/q/4EFslUfWwH): 1072587329

## 💖 致谢

- 感谢所有为 MaaEnd 项目做出贡献的开发者
- 感谢《明日方舟：终末地》为我们带来的精彩游戏体验
- 感谢开源社区提供的优秀工具和库

---

<div align="center">
  <sub>Built with ❤️ by MaaEnd Team</sub>
</div>
