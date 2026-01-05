# 部署指南 | Deployment Guide

本文档提供详细的部署说明，帮助你将 Present Moment Calibrator 部署到各种平台。

## 目录

- [Vercel 部署（推荐）](#vercel-部署推荐)
- [Netlify 部署](#netlify-部署)
- [GitHub Pages](#github-pages)
- [Docker 部署](#docker-部署)
- [传统服务器](#传统服务器)

---

## Vercel 部署（推荐）

Vercel 是最简单、最快速的部署方式，原生支持 Vite 项目。

### 方法 1: 一键部署

1. 点击仓库中的 "Deploy to Vercel" 按钮
2. 登录 Vercel 账号（支持 GitHub/GitLab/Bitbucket）
3. 授权 Vercel 访问你的仓库
4. 等待自动构建完成
5. 访问分配的 URL

### 方法 2: 从 Vercel Dashboard

1. **登录 Vercel**
   - 访问 https://vercel.com
   - 使用 GitHub 账号登录

2. **导入项目**
   ```
   New Project → Import Git Repository → 选择本仓库
   ```

3. **配置项目**
   - Framework Preset: Vite
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
   - Node Version: 18.x

4. **部署**
   - 点击 "Deploy"
   - 首次部署约需 1-2 分钟

### 方法 3: Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署到生产环境
vercel --prod

# 或者仅部署预览
vercel
```

### 配置说明

项目已包含 `vercel.json` 配置文件：

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 自定义域名

1. 在 Vercel Dashboard 中选择你的项目
2. 进入 Settings → Domains
3. 添加你的域名
4. 按照提示配置 DNS 记录

### 环境变量

本项目不需要环境变量，所有数据存储在本地。

---

## Netlify 部署

### 方法 1: 拖拽部署

```bash
# 本地构建
npm install
npm run build

# 手动上传
# 1. 访问 https://app.netlify.com/drop
# 2. 拖拽 dist 文件夹到页面
```

### 方法 2: Git 集成

1. **连接仓库**
   - 登录 Netlify
   - New site from Git
   - 选择 GitHub/GitLab/Bitbucket
   - 授权并选择仓库

2. **构建设置**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

3. **部署**
   - 点击 "Deploy site"

### 方法 3: Netlify CLI

```bash
# 安装 CLI
npm install -g netlify-cli

# 登录
netlify login

# 初始化
netlify init

# 部署
netlify deploy --prod
```

### 配置文件

创建 `netlify.toml`：

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## GitHub Pages

### 准备工作

1. **修改 vite.config.ts**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Present-Moment-Calibrator/', // 你的仓库名
})
```

### 方法 1: GitHub Actions（推荐）

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    permissions:
      contents: write

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 方法 2: 手动部署

```bash
# 构建
npm run build

# 部署到 gh-pages 分支
npx gh-pages -d dist
```

### 启用 GitHub Pages

1. 进入仓库 Settings
2. Pages → Source
3. 选择 gh-pages 分支
4. 保存

访问：`https://yourusername.github.io/Present-Moment-Calibrator/`

---

## Docker 部署

### Dockerfile

创建 `Dockerfile`：

```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```nginx
events {
  worker_connections 1024;
}

http {
  include /etc/nginx/mime.types;
  default_type application/octet-stream;

  server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
      try_files $uri $uri/ /index.html;
    }
  }
}
```

### 构建和运行

```bash
# 构建镜像
docker build -t present-moment-calibrator .

# 运行容器
docker run -d -p 8080:80 present-moment-calibrator

# 访问
open http://localhost:8080
```

### Docker Compose

创建 `docker-compose.yml`：

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

运行：
```bash
docker-compose up -d
```

---

## 传统服务器

### 使用 Nginx

```bash
# 1. 构建项目
npm install
npm run build

# 2. 上传 dist 目录到服务器
scp -r dist/* user@server:/var/www/calibrator/

# 3. 配置 Nginx
```

Nginx 配置：

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/calibrator;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

### 使用 Apache

`.htaccess`：

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 性能优化建议

### 1. 启用压缩

大多数平台默认启用 Gzip/Brotli 压缩。

### 2. CDN 加速

- Vercel/Netlify 自带全球 CDN
- 其他平台可使用 Cloudflare

### 3. 缓存策略

在 `vercel.json` 或 `netlify.toml` 中配置：

```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## 故障排查

### 构建失败

```bash
# 清除缓存重试
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 路由 404

确保配置了 SPA 重写规则（所有路由指向 index.html）

### 白屏

1. 检查浏览器控制台错误
2. 确认 base URL 配置正确
3. 检查 localStorage 是否被禁用

---

## 监控和分析

### Vercel Analytics

```bash
npm install @vercel/analytics
```

```typescript
// src/main.tsx
import { inject } from '@vercel/analytics';
inject();
```

### Google Analytics

在 `index.html` 中添加 GA 代码。

---

## 安全建议

1. **HTTPS**: 所有平台默认支持
2. **CSP**: 可添加 Content Security Policy
3. **本地数据**: 提醒用户定期备份 localStorage

---

## 更新和回滚

### Vercel
- 每次 git push 自动部署
- Dashboard 可回滚到任意历史版本

### GitHub Actions
- 合并到 main 分支自动部署
- 使用 git revert 回滚

---

## 支持

遇到问题？

- 查看项目 Issues
- 参考各平台官方文档
- 检查构建日志

---

祝你部署顺利！🚀
