const feedbackIssueUrl = "https://github.com/Tamako325/nav-tamako/issues/new";

const categories = [
  { id: "document", name: "PDF 文档", icon: "file-text" },
  { id: "convert", name: "格式转换", icon: "repeat-2" },
  { id: "reverse-image", name: "以图搜图", icon: "scan-search" },
  { id: "image", name: "图片/视频资源", icon: "images" },
  { id: "ebook", name: "电子书资源", icon: "book-open" },
  { id: "game", name: "游戏资源", icon: "gamepad-2" },
  { id: "anime", name: "在线动漫", icon: "sparkles" },
  { id: "video", name: "影视追剧", icon: "clapperboard" },
  { id: "comic", name: "漫画阅读", icon: "panels-top-left" },
  { id: "novel", name: "看轻小说", icon: "book-open-text" },
];

const categoryGroups = [
  {
    id: "all",
    name: "全部工具",
    icon: "layout-grid",
    children: categories.map((category) => category.id),
  },
  {
    id: "utility",
    name: "实用工具",
    icon: "wrench",
    children: ["document", "convert", "reverse-image"],
  },
  {
    id: "resources",
    name: "素材资源",
    icon: "palette",
    children: ["image", "ebook", "game"],
  },
  {
    id: "anime-media",
    name: "动漫影视",
    icon: "clapperboard",
    children: ["anime", "video", "comic", "novel"],
  },
];

const categoryById = new Map(categories.map((category) => [category.id, category]));
const categoryGroupById = new Map(categoryGroups.map((group) => [group.id, group]));
const parentGroupByCategory = new Map();

categoryGroups
  .filter((group) => group.id !== "all")
  .forEach((group) => {
    group.children.forEach((categoryId) => {
      parentGroupByCategory.set(categoryId, group);
    });
  });

const tools = [
  {
    id: "ilovepdf",
    name: "iLovePDF",
    category: "document",
    icon: "file-output",
    favicon: "https://www.ilovepdf.com/favicon.ico",
    description: "在线处理 PDF，支持 PDF 转换、合并、拆分、压缩等常用操作。",
    url: "https://www.ilovepdf.com/",
    tags: ["PDF", "转换", "文档"],
  },
  {
    id: "smallpdf",
    name: "Smallpdf",
    category: "document",
    icon: "file-check-2",
    description: "PDF 压缩、转换、合并、签名和编辑工具，适合日常文档处理。",
    url: "https://smallpdf.com/cn",
    tags: ["PDF", "压缩", "编辑"],
  },
  {
    id: "pdf24",
    name: "PDF24 Tools",
    category: "document",
    icon: "file-cog",
    description: "免费的 PDF 工具合集，包含压缩、拆分、合并、转换和 OCR。",
    url: "https://tools.pdf24.org/zh/",
    tags: ["PDF", "OCR", "合并"],
  },
  {
    id: "sejda",
    name: "Sejda",
    category: "document",
    icon: "file-pen-line",
    description: "在线 PDF 编辑器，可添加文字、签名、表单、页面和注释。",
    url: "https://www.sejda.com/",
    tags: ["PDF", "编辑", "签名"],
  },
  {
    id: "adobe-acrobat",
    name: "Adobe Acrobat",
    category: "document",
    icon: "file-type-2",
    description: "Adobe 官方在线 PDF 工具，支持转换、压缩、签名和整理页面。",
    url: "https://www.adobe.com/acrobat/online.html",
    tags: ["PDF", "Adobe", "转换"],
  },
  {
    id: "aconvert",
    name: "Aconvert",
    category: "convert",
    icon: "refresh-cw",
    favicon: "https://www.aconvert.com/favicon.ico",
    description: "在线格式转换工具，支持文档、图片、音频、视频等多种文件格式。",
    url: "https://www.aconvert.com/cn/",
    tags: ["格式转换", "文件", "在线工具"],
  },
  {
    id: "cloudconvert",
    name: "CloudConvert",
    category: "convert",
    icon: "cloud-cog",
    description: "支持文档、图片、音频、视频、电子书等多类型格式转换。",
    url: "https://cloudconvert.com/",
    tags: ["格式转换", "文件", "云端"],
  },
  {
    id: "convertio",
    name: "Convertio",
    category: "convert",
    icon: "arrow-left-right",
    description: "在线文件转换平台，覆盖文档、图片、音频、视频和字体格式。",
    url: "https://convertio.co/zh/",
    tags: ["格式转换", "文件", "批量"],
  },
  {
    id: "zamzar",
    name: "Zamzar",
    category: "convert",
    icon: "replace-all",
    description: "老牌在线格式转换服务，适合临时转换常见文件类型。",
    url: "https://www.zamzar.com/",
    tags: ["格式转换", "文档", "媒体"],
  },
  {
    id: "online-convert",
    name: "Online-Convert",
    category: "convert",
    icon: "refresh-ccw",
    description: "多媒体格式转换工具，可转换图片、音频、视频、文档和电子书。",
    url: "https://www.online-convert.com/",
    tags: ["格式转换", "视频", "音频"],
  },
  {
    id: "vcg",
    name: "视觉中国",
    category: "image",
    icon: "image-search",
    favicon: "https://vcg00.cfp.cn/static/img/logo.svg",
    iconWide: true,
    description: "图片搜索与正版视觉素材库，可用于查找图片、插画和创意素材。",
    url: "https://www.vcg.com/",
    tags: ["图片", "素材", "搜索"],
  },
  {
    id: "tinypng",
    name: "TinyPNG",
    category: "image",
    icon: "image-down",
    description: "图片压缩工具，适合压缩 PNG、JPEG 和 WebP 以减小体积。",
    url: "https://tinypng.com/",
    tags: ["图片", "压缩", "WebP"],
  },
  {
    id: "squoosh",
    name: "Squoosh",
    category: "image",
    icon: "sliders-horizontal",
    description: "浏览器里的图片压缩和格式转换工具，可细调压缩参数。",
    url: "https://squoosh.app/",
    tags: ["图片", "压缩", "格式"],
  },
  {
    id: "remove-bg",
    name: "remove.bg",
    category: "image",
    icon: "wand-sparkles",
    description: "在线抠图工具，可快速移除人物、商品和物体背景。",
    url: "https://www.remove.bg/",
    tags: ["图片", "抠图", "背景"],
  },
  {
    id: "pexels",
    name: "Pexels",
    category: "image",
    icon: "images",
    description: "免费图片和视频素材库，适合查找可商用视觉素材。",
    url: "https://www.pexels.com/zh-cn/",
    tags: ["图片", "视频", "素材"],
  },
  {
    id: "z-library",
    name: "Z-Library",
    category: "ebook",
    icon: "book-open-text",
    favicon: "https://zh.dfj101.ru/favicon.ico",
    description: "电子书资源检索与下载网站，可用于查找学习资料和电子书。",
    url: "https://zh.dfj101.ru/",
    tags: ["电子书", "学习", "下载"],
  },
  {
    id: "project-gutenberg",
    name: "Project Gutenberg",
    category: "ebook",
    icon: "library-big",
    description: "公共版权电子书项目，提供大量经典文学和历史文献。",
    url: "https://www.gutenberg.org/",
    tags: ["电子书", "公版", "英文"],
  },
  {
    id: "open-library",
    name: "Open Library",
    category: "ebook",
    icon: "book-marked",
    description: "开放图书馆项目，可检索书籍信息并借阅部分数字馆藏。",
    url: "https://openlibrary.org/",
    tags: ["电子书", "图书馆", "检索"],
  },
  {
    id: "internet-archive",
    name: "Internet Archive",
    category: "ebook",
    icon: "archive",
    description: "互联网档案馆，收录图书、网页、音视频和历史资料。",
    url: "https://archive.org/",
    tags: ["电子书", "档案", "资料"],
  },
  {
    id: "wikibooks",
    name: "Wikibooks",
    category: "ebook",
    icon: "book-open-check",
    description: "维基教科书项目，包含开放协作编写的学习资料和教材。",
    url: "https://zh.wikibooks.org/",
    tags: ["电子书", "教材", "学习"],
  },
  {
    id: "yandex-images",
    name: "Yandex.Images",
    category: "reverse-image",
    icon: "scan-search",
    description: "以图搜图效果很强，适合查找相似图片、来源和高清版本。",
    url: "https://yandex.ru/images/",
    tags: ["以图搜图", "图片", "来源"],
  },
  {
    id: "baidu-image-search",
    name: "百度识图",
    category: "reverse-image",
    icon: "image-search",
    description: "中文环境下好用的图片识别搜索，可查相似图片和商品信息。",
    url: "https://image.baidu.com/?fr=shitu",
    tags: ["以图搜图", "中文", "识别"],
  },
  {
    id: "saucenao",
    name: "SauceNAO",
    category: "reverse-image",
    icon: "scan-line",
    description: "适合查找插画、动漫图和作品出处，二次元图片效果突出。",
    url: "https://saucenao.com/",
    tags: ["以图搜图", "插画", "动漫"],
  },
  {
    id: "trace-moe",
    name: "trace.moe",
    category: "reverse-image",
    icon: "film",
    description: "通过动漫截图识别番剧、集数和大致时间点。",
    url: "https://trace.moe/",
    tags: ["以图搜图", "动漫", "截图"],
  },
  {
    id: "weread",
    name: "微信读书",
    category: "ebook",
    icon: "book-open",
    description: "腾讯官方阅读平台，适合在线阅读和管理个人书架。",
    url: "https://weread.qq.com/",
    tags: ["电子书", "阅读", "正版"],
  },
  {
    id: "ituring-free-books",
    name: "图灵社区免费书",
    category: "ebook",
    icon: "code-2",
    description: "图灵社区免费计算机书籍，可在线阅读编程和技术资料。",
    url: "https://www.ituring.com.cn/book?tab=free",
    tags: ["电子书", "计算机", "免费"],
  },
  {
    id: "shidian-guji",
    name: "识典古籍",
    category: "ebook",
    icon: "scroll-text",
    description: "古籍在线阅读平台，适合查找古文献、经典和传统资料。",
    url: "https://www.shidianguji.com/",
    tags: ["电子书", "古籍", "资料"],
  },
  {
    id: "iconfont",
    name: "iconfont",
    category: "image",
    icon: "icons",
    description: "阿里巴巴矢量图标库，适合查找图标、插画和 SVG 素材。",
    url: "https://www.iconfont.cn/",
    tags: ["素材", "图标", "SVG"],
  },
  {
    id: "yesicon",
    name: "Yesicon",
    category: "image",
    icon: "badge-check",
    description: "免费矢量图标库，集合多个开源图标集，可快速搜索下载。",
    url: "https://yesicon.app/",
    tags: ["素材", "图标", "开源"],
  },
  {
    id: "font-100",
    name: "100font",
    category: "image",
    icon: "type",
    description: "免费字体下载站，适合查找可商用中文字体资源。",
    url: "https://www.100font.com/",
    tags: ["素材", "字体", "商用"],
  },
  {
    id: "giphy",
    name: "GIPHY",
    category: "image",
    icon: "image-play",
    description: "动图搜索与制作平台，适合查找 GIF 表情和动态图素材。",
    url: "https://giphy.com/",
    tags: ["素材", "GIF", "动图"],
  },
  {
    id: "poki",
    name: "Poki",
    category: "game",
    icon: "gamepad-2",
    favicon: "https://poki.com/favicon.ico",
    description: "在线小游戏平台，包含休闲、动作、益智等类型的网页游戏。",
    url: "https://poki.com/zh",
    tags: ["游戏", "在线", "休闲"],
  },
  {
    id: "bilibili",
    name: "哔哩哔哩",
    category: "anime",
    icon: "tv",
    description: "综合视频与番剧平台，可观看番剧、国创、动画和纪录片。",
    url: "https://www.bilibili.com/",
    tags: ["动漫", "番剧", "视频"],
  },
  {
    id: "yuc-anime-list",
    name: "YuC's AnimeList",
    category: "anime",
    icon: "calendar-days",
    description: "动漫新番表和放送平台信息，适合追踪每季新番。",
    url: "https://yuc.wiki/",
    tags: ["动漫", "新番", "追番"],
  },
  {
    id: "hazx-bangumi",
    name: "Hazx 新番表",
    category: "anime",
    icon: "calendar-check",
    description: "动漫新番追番表，方便查看更新日期和季度放送信息。",
    url: "https://hmacg.cn/bangumi/",
    tags: ["动漫", "新番", "时间表"],
  },
  {
    id: "miluxing-anime",
    name: "新番列表",
    category: "anime",
    icon: "list-video",
    description: "新番资料库，可查询番剧资料、播放状态和相关信息。",
    url: "https://www.miluxing.com/",
    tags: ["动漫", "资料", "新番"],
  },
  {
    id: "aowu-anime",
    name: "嗷呜动漫",
    category: "anime",
    icon: "sparkles",
    description: "在线动漫站点，可用于查找和观看热门动漫内容。",
    url: "https://www.aowu.tv/",
    tags: ["动漫", "在线", "追番"],
  },
  {
    id: "mwcy-anime",
    name: "喵物次元",
    category: "anime",
    icon: "play-square",
    description: "在线动漫资源站，适合查找番剧和动画内容。",
    url: "https://www.mwcy.net/",
    tags: ["动漫", "在线", "资源"],
  },
  {
    id: "dmmiku-anime",
    name: "异世界动漫",
    category: "anime",
    icon: "monitor-play",
    description: "在线动漫网站，可用于搜索和观看动漫内容。",
    url: "https://www.dmmiku.com/",
    tags: ["动漫", "在线", "观看"],
  },
  {
    id: "cctv-video",
    name: "央视片库",
    category: "video",
    icon: "clapperboard",
    description: "央视电视剧、动画片和纪录片片库，内容来源稳定。",
    url: "https://tv.cctv.com/yxg",
    tags: ["影视", "央视", "纪录片"],
  },
  {
    id: "bilibili-documentary",
    name: "哔哩纪录片",
    category: "video",
    icon: "film",
    description: "B 站纪录片专题，可观看人文、自然、历史等纪录片。",
    url: "https://www.bilibili.com/documentary/",
    tags: ["影视", "纪录片", "B站"],
  },
  {
    id: "dyg2024",
    name: "电影狗",
    category: "video",
    icon: "search",
    description: "聚合影视搜索引擎，适合查找电影和剧集资源线索。",
    url: "https://www.dyg2024.com/",
    tags: ["影视", "搜索", "电影"],
  },
  {
    id: "douban-scout",
    name: "瓣影寻踪",
    category: "video",
    icon: "radar",
    description: "豆瓣电影佳片筛选工具，适合按评分、类型和年代找片。",
    url: "https://douban-scout.kfstorm.com/",
    tags: ["影视", "豆瓣", "筛选"],
  },
  {
    id: "komiic",
    name: "Komiic 漫画",
    category: "comic",
    icon: "panels-top-left",
    description: "在线漫画阅读站点，可搜索和阅读漫画内容。",
    url: "https://komiic.cc/",
    tags: ["漫画", "在线", "阅读"],
  },
  {
    id: "dm5",
    name: "动漫屋",
    category: "comic",
    icon: "book-image",
    description: "在线漫画阅读站，分类和漫画条目较丰富。",
    url: "https://www.dm5.com/",
    tags: ["漫画", "在线", "阅读"],
  },
  {
    id: "dogemanga",
    name: "漫画狗",
    category: "comic",
    icon: "search-check",
    description: "漫画搜索与在线阅读工具，适合快速找漫画条目。",
    url: "https://dogemanga.com/",
    tags: ["漫画", "搜索", "阅读"],
  },
  {
    id: "comic-walker",
    name: "ComicWalker",
    category: "comic",
    icon: "book-open",
    description: "日本漫画阅读平台，适合浏览日文原版漫画内容。",
    url: "https://comic-walker.com/",
    tags: ["漫画", "日文", "阅读"],
  },
  {
    id: "lightnovel-fun",
    name: "轻之国度",
    category: "novel",
    icon: "messages-square",
    description: "轻小说论坛与资料社区，适合查找轻小说相关信息。",
    url: "https://www.lightnovel.fun/",
    tags: ["轻小说", "论坛", "资料"],
  },
  {
    id: "wenku8",
    name: "轻小说文库",
    category: "novel",
    icon: "book-open-text",
    description: "轻小说在线阅读站，支持按作品和作者查找内容。",
    url: "https://www.wenku8.net/index.php",
    tags: ["轻小说", "在线", "阅读"],
  },
  {
    id: "gedoor-reader",
    name: "开源阅读",
    category: "novel",
    icon: "book-copy",
    description: "自定义书源小说阅读器项目，适合搭配书源管理阅读。",
    url: "https://gedoor.github.io/",
    tags: ["小说", "阅读器", "开源"],
  },
];

const validToolIds = new Set(tools.map((tool) => tool.id));

const state = {
  category: "all",
  filter: "all",
  query: "",
  favorites: new Set(
    JSON.parse(localStorage.getItem("nav:favorites") || "[]").filter((id) =>
      validToolIds.has(id)
    )
  ),
};

const elements = {
  categoryNav: document.querySelector("#categoryNav"),
  sections: document.querySelector("#sections"),
  searchInput: document.querySelector("#searchInput"),
  emptyState: document.querySelector("#emptyState"),
  toolCount: document.querySelector("#toolCount"),
  categoryCount: document.querySelector("#categoryCount"),
  favoriteCount: document.querySelector("#favoriteCount"),
  activeMeta: document.querySelector("#activeMeta"),
  segments: Array.from(document.querySelectorAll(".segment")),
  feedbackOpen: document.querySelector("#feedbackOpen"),
  feedbackClose: document.querySelector("#feedbackClose"),
  feedbackCancel: document.querySelector("#feedbackCancel"),
  feedbackDialog: document.querySelector("#feedbackDialog"),
  feedbackForm: document.querySelector("#feedbackForm"),
  feedbackType: document.querySelector("#feedbackType"),
  feedbackTarget: document.querySelector("#feedbackTarget"),
  feedbackDetail: document.querySelector("#feedbackDetail"),
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

function hasUrl(tool) {
  return Boolean(tool.url && tool.url.trim() && tool.url.trim() !== "#");
}

function getFaviconUrl(tool) {
  if (tool.favicon) return tool.favicon;
  if (!hasUrl(tool)) return "";

  try {
    return `${new URL(tool.url).origin}/favicon.ico`;
  } catch {
    return "";
  }
}

function getCategory(id) {
  return categoryById.get(id) || categoryGroupById.get(id);
}

function getParentGroup(categoryId) {
  return parentGroupByCategory.get(categoryId);
}

function getCategoryIdsForSelection(id) {
  if (id === "all") return categories.map((category) => category.id);
  const group = categoryGroupById.get(id);
  if (group) return group.children;
  if (categoryById.has(id)) return [id];
  return [];
}

function getCategoryLabel(id) {
  if (id === "all") return "全部工具";

  const category = categoryById.get(id);
  if (category) {
    const group = getParentGroup(id);
    return group ? `${group.name} / ${category.name}` : category.name;
  }

  return categoryGroupById.get(id)?.name || "全部分类";
}

function toolMatches(tool) {
  const query = normalize(state.query);
  const category = getCategory(tool.category);
  const parentGroup = getParentGroup(tool.category);
  const haystack = normalize(
    [
      tool.name,
      tool.description,
      tool.category,
      category?.name,
      parentGroup?.name,
      ...(tool.tags || []),
    ].join(" ")
  );
  const selectedCategoryIds = getCategoryIdsForSelection(state.category);

  if (state.category !== "all" && !selectedCategoryIds.includes(tool.category)) return false;
  if (state.filter === "favorites" && !state.favorites.has(tool.id)) return false;
  if (state.filter === "empty" && hasUrl(tool)) return false;
  if (query && !haystack.includes(query)) return false;
  return true;
}

function getVisibleTools() {
  return tools.filter(toolMatches);
}

function saveFavorites() {
  localStorage.setItem("nav:favorites", JSON.stringify(Array.from(state.favorites)));
}

function renderCategoryNav() {
  const counts = tools.reduce((acc, tool) => {
    acc[tool.category] = (acc[tool.category] || 0) + 1;
    return acc;
  }, {});

  const renderNavButton = (item, count, extraClass = "") => `
    <button class="category-button ${extraClass} ${state.category === item.id ? "active" : ""}"
      type="button" data-category="${escapeHtml(item.id)}">
      <i data-lucide="${escapeHtml(item.icon)}" aria-hidden="true"></i>
      <span>${escapeHtml(item.name)}</span>
      <small>${count}</small>
    </button>
  `;

  const allGroup = categoryGroupById.get("all");
  const allButton = renderNavButton(allGroup, tools.length, "category-root");
  const groupButtons = categoryGroups
    .filter((group) => group.id !== "all")
    .map((group) => {
      const groupCount = group.children.reduce((sum, categoryId) => sum + (counts[categoryId] || 0), 0);
      const containsActive = group.children.includes(state.category);
      const childButtons = group.children
        .map((categoryId) => {
          const category = categoryById.get(categoryId);
          return renderNavButton(category, counts[categoryId] || 0, "category-child");
        })
        .join("");

      return `
        <div class="category-group">
          ${renderNavButton(
            group,
            groupCount,
            `category-parent ${containsActive ? "contains-active" : ""}`
          )}
          <div class="category-children">
            ${childButtons}
          </div>
        </div>
      `;
    })
    .join("");

  elements.categoryNav.innerHTML = allButton + groupButtons;
}

function renderSections() {
  const visible = getVisibleTools();
  const grouped = visible.reduce((acc, tool) => {
    acc[tool.category] = acc[tool.category] || [];
    acc[tool.category].push(tool);
    return acc;
  }, {});

  const selectedCategoryIds = new Set(getCategoryIdsForSelection(state.category));
  const renderedGroups = categoryGroups
    .filter((group) => group.id !== "all")
    .map((group) => {
      const children = group.children
        .filter((categoryId) => selectedCategoryIds.has(categoryId))
        .map((categoryId) => ({
          category: categoryById.get(categoryId),
          tools: grouped[categoryId] || [],
        }))
        .filter((child) => child.tools.length);

      return {
        ...group,
        children,
        count: children.reduce((sum, child) => sum + child.tools.length, 0),
      };
    })
    .filter((group) => group.children.length);

  const renderToolSection = ({ category, tools: categoryTools }) => `
    <section class="tool-section" id="section-${escapeHtml(category.id)}">
      <div class="section-head">
        <div class="section-title">
          <i data-lucide="${escapeHtml(category.icon)}" aria-hidden="true"></i>
          <h3>${escapeHtml(category.name)}</h3>
        </div>
        <span class="section-count">${categoryTools.length} 个工具</span>
      </div>
      <div class="tool-grid">
        ${categoryTools.map(renderToolCard).join("")}
      </div>
    </section>
  `;

  elements.sections.innerHTML = renderedGroups
    .map(
      (group) => `
        <section class="group-section" id="group-${escapeHtml(group.id)}">
          <div class="group-head">
            <div class="group-title">
              <i data-lucide="${escapeHtml(group.icon)}" aria-hidden="true"></i>
              <h2>${escapeHtml(group.name)}</h2>
            </div>
            <span class="group-count">${group.count} 个工具</span>
          </div>
          <div class="subsection-list">
            ${group.children.map(renderToolSection).join("")}
          </div>
        </section>
      `
    )
    .join("");

  elements.emptyState.hidden = visible.length !== 0;
}

function renderToolCard(tool) {
  const available = hasUrl(tool);
  const favorite = state.favorites.has(tool.id);
  const tags = (tool.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
  const faviconUrl = getFaviconUrl(tool);
  const fallbackIcon = escapeHtml(tool.icon || "link");
  const iconStyle = tool.iconBg ? ` style="background: ${escapeHtml(tool.iconBg)};"` : "";
  const iconClass = `tool-icon has-favicon${tool.iconWide ? " is-wide" : ""}`;
  const icon = faviconUrl
    ? `
        <span class="${iconClass}"${iconStyle}>
          <img class="tool-favicon" src="${escapeHtml(faviconUrl)}" alt="" loading="lazy" referrerpolicy="no-referrer"
            onerror="this.closest('.tool-icon').classList.add('favicon-failed'); this.remove();" />
          <i data-lucide="${fallbackIcon}" aria-hidden="true"></i>
        </span>
      `
    : `<span class="tool-icon"><i data-lucide="${fallbackIcon}" aria-hidden="true"></i></span>`;

  return `
    <article class="tool-card ${available ? "" : "is-empty"}">
      <div class="card-top">
        ${icon}
        <div>
          <h3 title="${escapeHtml(tool.name)}">${escapeHtml(tool.name)}</h3>
        </div>
        <button class="favorite-button ${favorite ? "active" : ""}" type="button"
          data-favorite="${escapeHtml(tool.id)}" aria-label="收藏 ${escapeHtml(tool.name)}">
          <i data-lucide="star" aria-hidden="true"></i>
        </button>
      </div>
      <p class="description">${escapeHtml(tool.description)}</p>
      <div class="tag-row">${tags}</div>
      <div class="card-actions">
        <a class="open-link ${available ? "" : "disabled"}" href="${available ? escapeHtml(tool.url) : "#"}"
          target="_blank" rel="noopener noreferrer">
          <span>${available ? "打开" : "待补充"}</span>
          <i data-lucide="${available ? "external-link" : "circle-dashed"}" aria-hidden="true"></i>
        </a>
        <button class="report-button" type="button" data-report="${escapeHtml(tool.name)}">
          <i data-lucide="flag" aria-hidden="true"></i>
          <span>反馈</span>
        </button>
      </div>
    </article>
  `;
}

function renderStats() {
  elements.toolCount.textContent = String(tools.length);
  elements.categoryCount.textContent = String(categories.length);
  elements.favoriteCount.textContent = String(state.favorites.size);

  const label = getCategoryLabel(state.category);
  const filterLabel = {
    all: "全部",
    favorites: "收藏",
    empty: "待补充",
  }[state.filter];
  elements.activeMeta.textContent = `${label} · ${filterLabel}`;
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function render() {
  renderCategoryNav();
  renderSections();
  renderStats();
  refreshIcons();
}

function openFeedback(target = "") {
  elements.feedbackTarget.value = target;
  elements.feedbackType.value = target ? "工具打不开" : elements.feedbackType.value;
  if (typeof elements.feedbackDialog.showModal === "function") {
    elements.feedbackDialog.showModal();
  } else {
    elements.feedbackDialog.setAttribute("open", "");
  }
  elements.feedbackTarget.focus();
}

function closeFeedback() {
  elements.feedbackDialog.close();
}

function submitFeedback() {
  const type = elements.feedbackType.value.trim();
  const target = elements.feedbackTarget.value.trim() || "未填写";
  const detail = elements.feedbackDetail.value.trim() || "未填写";
  const title = `[${type}] ${target}`;
  const body = [
    "## 反馈类型",
    type,
    "",
    "## 相关工具或功能",
    target,
    "",
    "## 详细说明",
    detail,
    "",
    "## 页面地址",
    window.location.href,
  ].join("\n");

  const url = new URL(feedbackIssueUrl);
  url.searchParams.set("title", title);
  url.searchParams.set("body", body);
  window.open(url.toString(), "_blank", "noopener,noreferrer");
  closeFeedback();
}

function bindEvents() {
  elements.categoryNav.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    state.category = button.dataset.category;
    render();
  });

  elements.sections.addEventListener("click", (event) => {
    const favoriteButton = event.target.closest("[data-favorite]");
    if (favoriteButton) {
      const id = favoriteButton.dataset.favorite;
      if (state.favorites.has(id)) {
        state.favorites.delete(id);
      } else {
        state.favorites.add(id);
      }
      saveFavorites();
      render();
      return;
    }

    const reportButton = event.target.closest("[data-report]");
    if (reportButton) {
      openFeedback(reportButton.dataset.report);
    }
  });

  elements.searchInput.addEventListener("input", (event) => {
    state.query = event.target.value;
    renderSections();
    renderStats();
    refreshIcons();
  });

  elements.segments.forEach((button) => {
    button.addEventListener("click", () => {
      elements.segments.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      state.filter = button.dataset.filter;
      renderSections();
      renderStats();
      refreshIcons();
    });
  });

  elements.feedbackOpen.addEventListener("click", () => openFeedback());
  elements.feedbackClose.addEventListener("click", closeFeedback);
  elements.feedbackCancel.addEventListener("click", closeFeedback);
  elements.feedbackDialog.addEventListener("click", (event) => {
    if (event.target === elements.feedbackDialog) closeFeedback();
  });
  elements.feedbackForm.addEventListener("submit", (event) => {
    event.preventDefault();
    submitFeedback();
  });
}

bindEvents();
render();
