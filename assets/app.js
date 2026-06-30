const feedbackIssueUrl = "https://github.com/Tamako325/nav-tamako/issues/new";

const categories = [
  { id: "all", name: "全部工具", icon: "layout-grid" },
  { id: "document", name: "PDF 文档", icon: "file-text" },
  { id: "convert", name: "格式转换", icon: "repeat-2" },
  { id: "image", name: "图片素材", icon: "image" },
  { id: "ebook", name: "电子书资源", icon: "book-open" },
];

const tools = [
  {
    id: "ilovepdf",
    name: "iLovePDF",
    category: "document",
    icon: "file-output",
    description: "在线处理 PDF，支持 PDF 转换、合并、拆分、压缩等常用操作。",
    url: "https://www.ilovepdf.com/",
    tags: ["PDF", "转换", "文档"],
  },
  {
    id: "aconvert",
    name: "Aconvert",
    category: "convert",
    icon: "refresh-cw",
    description: "在线格式转换工具，支持文档、图片、音频、视频等多种文件格式。",
    url: "https://www.aconvert.com/cn/",
    tags: ["格式转换", "文件", "在线工具"],
  },
  {
    id: "vcg",
    name: "视觉中国",
    category: "image",
    icon: "image-search",
    description: "图片搜索与正版视觉素材库，可用于查找图片、插画和创意素材。",
    url: "https://www.vcg.com/",
    tags: ["图片", "素材", "搜索"],
  },
  {
    id: "z-library",
    name: "Z-Library",
    category: "ebook",
    icon: "book-open-text",
    description: "电子书资源检索与下载网站，可用于查找学习资料和电子书。",
    url: "https://zh.dfj101.ru/",
    tags: ["电子书", "学习", "下载"],
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

function getCategory(id) {
  return categories.find((category) => category.id === id);
}

function toolMatches(tool) {
  const query = normalize(state.query);
  const haystack = normalize(
    [tool.name, tool.description, tool.category, ...(tool.tags || [])].join(" ")
  );

  if (state.category !== "all" && tool.category !== state.category) return false;
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

  elements.categoryNav.innerHTML = categories
    .map((category) => {
      const count = category.id === "all" ? tools.length : counts[category.id] || 0;
      return `
        <button class="category-button ${state.category === category.id ? "active" : ""}"
          type="button" data-category="${escapeHtml(category.id)}">
          <i data-lucide="${escapeHtml(category.icon)}" aria-hidden="true"></i>
          <span>${escapeHtml(category.name)}</span>
          <small>${count}</small>
        </button>
      `;
    })
    .join("");
}

function renderSections() {
  const visible = getVisibleTools();
  const grouped = visible.reduce((acc, tool) => {
    acc[tool.category] = acc[tool.category] || [];
    acc[tool.category].push(tool);
    return acc;
  }, {});

  const renderedCategories = categories.filter(
    (category) => category.id !== "all" && grouped[category.id]?.length
  );

  elements.sections.innerHTML = renderedCategories
    .map((category) => {
      const categoryTools = grouped[category.id];
      return `
        <section class="tool-section" id="section-${escapeHtml(category.id)}">
          <div class="section-head">
            <div class="section-title">
              <i data-lucide="${escapeHtml(category.icon)}" aria-hidden="true"></i>
              <h2>${escapeHtml(category.name)}</h2>
            </div>
            <span class="section-count">${categoryTools.length} 个工具</span>
          </div>
          <div class="tool-grid">
            ${categoryTools.map(renderToolCard).join("")}
          </div>
        </section>
      `;
    })
    .join("");

  elements.emptyState.hidden = visible.length !== 0;
}

function renderToolCard(tool) {
  const available = hasUrl(tool);
  const favorite = state.favorites.has(tool.id);
  const urlLabel = available ? tool.url : "链接待补充";
  const tags = (tool.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");

  return `
    <article class="tool-card ${available ? "" : "is-empty"}">
      <div class="card-top">
        <span class="tool-icon"><i data-lucide="${escapeHtml(tool.icon || "link")}" aria-hidden="true"></i></span>
        <div>
          <h3 title="${escapeHtml(tool.name)}">${escapeHtml(tool.name)}</h3>
          <span class="url" title="${escapeHtml(urlLabel)}">${escapeHtml(urlLabel)}</span>
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
  elements.categoryCount.textContent = String(categories.length - 1);
  elements.favoriteCount.textContent = String(state.favorites.size);

  const category = getCategory(state.category);
  const label = category?.name || "全部分类";
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
