# 小工具导航网站

这是一个可部署的静态导航网站，不依赖后端。当前已放入 PDF 转换、格式转换、图片素材、电子书资源 4 个工具。后续主要修改 `assets/app.js` 顶部的 `tools` 数组即可。

## 本地预览

在当前目录运行：

```bash
python -m http.server 4173
```

然后访问：

```text
http://localhost:4173
```

## 推荐部署方式：Cloudflare Pages

适合做 `nav.example.com` 这种带域名的网站。

如果暂时没有购买域名，推荐先使用 Cloudflare Pages 免费提供的子域名，例如：

```text
https://nav-tamako.pages.dev
```

`nav.tamako.cyou` 这种地址需要拥有 `tamako.cyou` 这个域名后才能配置。没有购买或控制 `tamako.cyou` 的 DNS，就不能直接使用这个地址。

1. 准备一个 GitHub 仓库，把本目录内容提交进去。
2. 进入 Cloudflare Pages，创建项目并连接该仓库。
3. 构建命令留空，输出目录填 `/` 或留默认根目录。
4. 部署成功后会得到一个 `*.pages.dev` 临时域名。
5. 在 Cloudflare Pages 的 Custom domains 中添加你的目标域名，例如 `nav.example.com`。
6. 按平台提示添加 DNS 记录，通常是 CNAME 或由 Cloudflare 自动创建。

### 用脚本部署

本目录已经包含 `deploy-cloudflare.ps1`。在 PowerShell 里进入本目录后运行：

```powershell
.\deploy-cloudflare.ps1
```

脚本会执行 Cloudflare 登录授权，然后把当前目录部署为：

```text
https://nav-tamako.pages.dev
```

## 其他可选平台

### Vercel

直接导入 GitHub 仓库即可。项目是纯静态文件，不需要构建命令。绑定自定义域名时，在 Vercel 的 Domains 页面添加域名，并按页面提示配置 DNS。

### Netlify

上传本目录或连接 GitHub 仓库。`netlify.toml` 已配置发布目录为当前目录。

### GitHub Pages

适合轻量展示。本项目已经包含 GitHub Pages 工作流：`.github/workflows/pages.yml`。

部署步骤：

1. 在 GitHub 创建一个空仓库，例如 `nav-tamako`。
2. 在本目录运行：

```powershell
git init
git branch -M main
git add .
git commit -m "Deploy tool navigation site"
git remote add origin https://github.com/你的用户名/nav-tamako.git
git push -u origin main
```

3. 打开仓库的 Settings → Pages。
4. Source 选择 GitHub Actions。
5. 等 Actions 运行完成后，访问：

```text
https://你的用户名.github.io/nav-tamako/
```

## 需要你提供的信息

要真正绑定成一个带域名的网站，需要这些信息：

1. 你是否已经有域名，例如 `example.com`。
2. 想使用的子域名，例如 `nav.example.com`。
3. 域名在哪个平台管理 DNS，例如 Cloudflare、阿里云、腾讯云、NameSilo 等。
4. 你想用哪个部署平台，推荐 Cloudflare Pages。
5. 最终要放进网站的工具名称、简介、分类和链接。

## 工具数据格式

在 `assets/app.js` 中修改：

```js
{
  id: "tool-id",
  name: "工具名称",
  category: "ai",
  icon: "bot",
  description: "一句话说明这个工具用途。",
  url: "https://example.com",
  tags: ["AI", "写作"]
}
```

分类 ID 当前包括：

- `document`
- `convert`
- `image`
- `ebook`
