import {
  App,
  applyDocumentTheme,
  applyHostStyleVariables,
  applyHostFonts,
  type McpUiStyles,
} from "@modelcontextprotocol/ext-apps";
import { renderVariables } from "./variables-view";
import { renderPreview } from "./preview-view";

const contentEl = document.getElementById("content")!;
const tabs = document.querySelectorAll<HTMLButtonElement>(".tab");
const themeToggle = document.getElementById("theme-toggle")!;
let currentTab = "variables";
let currentTheme: "light" | "dark" = "light";

// --- Host context helpers ---

type HostCtx = { theme?: string; styles?: { variables?: McpUiStyles; css?: { fonts?: string } } };

function applyHostContext(ctx: HostCtx) {
  if (ctx.theme) {
    currentTheme = ctx.theme as "light" | "dark";
    applyDocumentTheme(currentTheme);
    updateThemeToggleLabel();
  }
  if (ctx.styles?.variables) applyHostStyleVariables(ctx.styles.variables);
  if (ctx.styles?.css?.fonts) applyHostFonts(ctx.styles.css.fonts);
}

function updateThemeToggleLabel() {
  themeToggle.textContent = currentTheme === "light" ? "Dark" : "Light";
}

// --- Tab switching ---

function switchTab(tab: string) {
  currentTab = tab;
  tabs.forEach((t) => {
    const isActive = t.dataset.tab === tab;
    t.classList.toggle("active", isActive);
    t.setAttribute("aria-selected", String(isActive));
  });
  renderCurrentTab();
}

function clearElement(el: HTMLElement) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

function renderCurrentTab() {
  clearElement(contentEl);
  if (currentTab === "variables") {
    renderVariables(contentEl);
  } else {
    renderPreview(contentEl);
  }
}

tabs.forEach((t) => {
  t.addEventListener("click", () => switchTab(t.dataset.tab!));
});

// --- Theme toggle ---

themeToggle.addEventListener("click", () => {
  currentTheme = currentTheme === "light" ? "dark" : "light";
  applyDocumentTheme(currentTheme);
  updateThemeToggleLabel();
  renderCurrentTab();
});

updateThemeToggleLabel();

// --- Init ---

async function init() {
  renderCurrentTab();

  try {
    const app = new App({ name: "theme-inspector", version: "1.0.0" });

    app.onhostcontextchanged = (params) => {
      applyHostContext(params as HostCtx);
      renderCurrentTab();
    };

    // Permissive transport for sandbox iframe compatibility
    const transport = {
      onclose: undefined as (() => void) | undefined,
      onerror: undefined as ((err: Error) => void) | undefined,
      onmessage: undefined as ((msg: unknown) => void) | undefined,
      async start() {
        window.addEventListener("message", (e: MessageEvent) => {
          if (e.data?.jsonrpc) this.onmessage?.(e.data);
        });
      },
      async send(msg: unknown) {
        window.parent.postMessage(msg, "*");
      },
      async close() {
        this.onclose?.();
      },
    };

    await app.connect(transport);

    // Apply initial host context (styles.variables + styles.css.fonts)
    const ctx = app.getHostContext() as HostCtx | undefined;
    if (ctx) applyHostContext(ctx);

    // Re-render with resolved CSS variables
    renderCurrentTab();
  } catch {
    // Running outside MCP host — render with whatever CSS vars are available
  }
}

init();
