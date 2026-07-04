# 小工具导航网站

这是一个纯静态的小工具导航网站，不依赖后端。当前版本包含工具分类、搜索、收藏、反馈入口、网站图标展示和宽屏自适应布局。

线上地址：

```text
https://nav-tamako.pages.dev/
```

## 文件结构

```text
.
├── index.html              # 页面结构
├── assets/
│   ├── app.js              # 工具数据、分类、渲染和交互逻辑
│   └── styles.css          # 页面样式和响应式布局
├── package.json            # 本地检查脚本
├── deploy-cloudflare.ps1   # Cloudflare Pages 部署脚本
├── netlify.toml            # Netlify 静态部署配置
├── vercel.json             # Vercel 静态部署配置
└── README.md
```

## 本地预览

在项目目录运行：

```powershell
python -m http.server 4173
```

然后访问：

```text
http://localhost:4173
```

## 语法检查

```powershell
npm run check
```

## 当前分类结构

当前一级分类和子分类在 `assets/app.js` 顶部维护。

- 实用工具：PDF 文档、格式转换、以图搜图
- 素材资源：图片/视频资源、电子书资源、游戏资源
- 动漫影视：在线动漫、影视追剧、漫画阅读、看轻小说

工具入口保存在 `assets/app.js` 的 `tools` 数组中。新增工具时，复制下面格式并修改字段即可：

```js
{
  id: "tool-id",
  name: "工具名称",
  category: "image",
  icon: "image",
  favicon: "https://example.com/favicon.ico",
  description: "一句话说明这个工具用途。",
  url: "https://example.com",
  tags: ["标签1", "标签2"]
}
```

`category` 需要填写已有子分类 ID，例如：

```text
document, convert, reverse-image, image, ebook, game, anime, video, comic, novel
```

## 部署到 Cloudflare Pages

项目已经部署到 Cloudflare Pages 项目 `nav-tamako`。如果要重新部署当前目录：

```powershell
npx wrangler pages deploy . --project-name nav-tamako --branch main
```

也可以运行：

```powershell
.\deploy-cloudflare.ps1
```

## 其他部署平台

这个项目是纯静态页面，也可以直接部署到 Vercel、Netlify 或 GitHub Pages。

- Vercel：导入仓库即可，构建命令留空。
- Netlify：`netlify.toml` 已配置发布目录为当前目录。
- GitHub Pages：可使用 `.github/workflows/pages.yml` 工作流。
