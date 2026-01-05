# 🚀 快速部署到 Vercel

3个步骤，5分钟内上线你的当下刻度！

## 步骤 1: Fork 仓库

点击 GitHub 页面右上角的 "Fork" 按钮

## 步骤 2: 连接 Vercel

1. 访问 [vercel.com](https://vercel.com)
2. 点击 "Sign Up" 或 "Log In"
3. 使用 GitHub 账号登录
4. 授权 Vercel 访问你的 GitHub

## 步骤 3: 导入并部署

1. 在 Vercel Dashboard 点击 "Add New Project"
2. 选择你 Fork 的 `Present-Moment-Calibrator` 仓库
3. 点击 "Import"
4. **无需修改任何配置**（已包含 vercel.json）
5. 点击 "Deploy"

✅ 完成！等待 1-2 分钟构建完成

## 你会得到：

- 🌐 一个公开的 URL（例如：`your-project.vercel.app`）
- 🔄 自动部署（每次 git push 都会自动更新）
- 🌍 全球 CDN 加速
- 🔒 免费的 HTTPS 证书
- 📊 可选的分析统计

## 可选：自定义域名

1. 在 Vercel 项目页面点击 "Settings"
2. 选择 "Domains"
3. 添加你的域名（例如：`calibrator.yourdomain.com`）
4. 按照提示配置 DNS

## 本地测试

在部署前想本地测试？

```bash
# 克隆你的 fork
git clone https://github.com/YOUR_USERNAME/Present-Moment-Calibrator.git
cd Present-Moment-Calibrator

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 在浏览器打开 http://localhost:5173
```

## 需要帮助？

- 查看详细文档：[DEPLOY.md](./DEPLOY.md)
- 访问 [Vercel 文档](https://vercel.com/docs)
- 提交 Issue 到仓库

---

**提示**：首次部署后，你的 URL 会类似 `present-moment-calibrator-abc123.vercel.app`。你可以在 Vercel Dashboard 中重命名项目来获得更简洁的 URL。

祝你校准顺利！✨
