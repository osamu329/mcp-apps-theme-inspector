function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  if (className) e.className = className;
  return e;
}

function section(title: string): HTMLElement {
  const s = el("section", "preview-section");
  const h = el("h2", "preview-section-title");
  h.textContent = title;
  s.appendChild(h);
  return s;
}

function renderTypography(container: HTMLElement) {
  const s = section("Typography");

  const h1 = el("div", "preview-h1");
  h1.textContent = "Heading 1 — 3XL";
  s.appendChild(h1);

  const h1ja = el("div", "preview-h1");
  h1ja.textContent = "見出し1 — 3XL";
  s.appendChild(h1ja);

  const h2 = el("div", "preview-h2");
  h2.textContent = "Heading 2 — 2XL";
  s.appendChild(h2);

  const h2ja = el("div", "preview-h2");
  h2ja.textContent = "見出し2 — 2XL";
  s.appendChild(h2ja);

  const h3 = el("div", "preview-h3");
  h3.textContent = "Heading 3 — XL";
  s.appendChild(h3);

  const h3ja = el("div", "preview-h3");
  h3ja.textContent = "見出し3 — XL";
  s.appendChild(h3ja);

  const body = el("p", "preview-body");
  body.textContent =
    "Body text using the primary text color. This demonstrates the default reading experience with the host theme.";
  s.appendChild(body);

  const bodyJa = el("p", "preview-body");
  bodyJa.textContent =
    "本文テキスト。ホストテーマによるデフォルトの読書体験を示しています。日本語の長文がどのように表示されるかを確認できます。";
  s.appendChild(bodyJa);

  const secondary = el("p", "preview-secondary");
  secondary.textContent =
    "Secondary text for supplemental information, labels, and captions.";
  s.appendChild(secondary);

  const secondaryJa = el("p", "preview-secondary");
  secondaryJa.textContent =
    "補足情報やラベル、キャプション向けのセカンダリテキスト。";
  s.appendChild(secondaryJa);

  const code = el("pre", "preview-code");
  code.textContent = `const theme = app.getHostContext();\nconsole.log("Theme:", theme);`;
  s.appendChild(code);

  container.appendChild(s);
}

function renderCards(container: HTMLElement) {
  const s = section("Cards");

  const stack = el("div", "card-stack");

  const levels = [
    { cls: "card-primary", label: "Primary background", labelJa: "プライマリ背景" },
    { cls: "card-secondary", label: "Secondary background", labelJa: "セカンダリ背景" },
    { cls: "card-tertiary", label: "Tertiary background", labelJa: "ターシャリ背景" },
  ] as const;

  for (const { cls, label, labelJa } of levels) {
    const card = el("div", `card ${cls}`);
    const title = el("div", "card-title");
    title.textContent = label;
    card.appendChild(title);
    const text = el("div", "card-text");
    text.textContent = `This card uses var(--color-background-${cls.replace("card-", "")}).`;
    card.appendChild(text);
    const textJa = el("div", "card-text");
    textJa.textContent = `${labelJa}を使用したカードです。`;
    card.appendChild(textJa);
    stack.appendChild(card);
  }

  s.appendChild(stack);
  container.appendChild(s);
}

function renderBadges(container: HTMLElement) {
  const s = section("Status Badges");
  const row = el("div", "badge-row");

  const types = [
    { key: "info", en: "Info", ja: "情報" },
    { key: "success", en: "Success", ja: "成功" },
    { key: "warning", en: "Warning", ja: "警告" },
    { key: "danger", en: "Danger", ja: "危険" },
  ] as const;

  for (const { key, en, ja } of types) {
    const badge = el("span", `badge badge-${key}`);
    badge.textContent = en;
    row.appendChild(badge);
    const badgeJa = el("span", `badge badge-${key}`);
    badgeJa.textContent = ja;
    row.appendChild(badgeJa);
  }

  s.appendChild(row);
  container.appendChild(s);
}

function renderButtons(container: HTMLElement) {
  const s = section("Buttons");
  const list = el("div", "button-list");

  const buttons = [
    { cls: "btn-primary", ring: "--color-ring-primary", label: "Primary / 送信", disabled: false },
    { cls: "btn-ghost", ring: "--color-ring-primary", label: "Ghost / キャンセル", disabled: false },
    { cls: "btn-info", ring: "--color-ring-info", label: "Info / 情報", disabled: false },
    { cls: "btn-success", ring: "--color-ring-success", label: "Success / 成功", disabled: false },
    { cls: "btn-warning", ring: "--color-ring-warning", label: "Warning / 警告", disabled: false },
    { cls: "btn-danger", ring: "--color-ring-danger", label: "Danger / 削除", disabled: false },
    { cls: "btn-disabled", ring: "", label: "Disabled / 無効", disabled: true },
  ] as const;

  for (const b of buttons) {
    const row = el("div", "button-list-item");
    const btn = el("button", `btn ${b.cls}`);
    btn.textContent = b.label;
    btn.type = "button";
    if (b.disabled) btn.disabled = true;
    if (b.ring) btn.style.setProperty("--_ring-color", `var(${b.ring})`);
    row.appendChild(btn);
    const label = el("span", "button-list-label");
    label.textContent = b.cls.replace("btn-", "");
    row.appendChild(label);
    list.appendChild(row);
  }

  s.appendChild(list);
  container.appendChild(s);
}

function renderBorderedList(container: HTMLElement) {
  const s = section("Bordered List");
  const list = el("div", "bordered-list");

  const items = [
    "First list item / リスト項目 1",
    "Second list item / リスト項目 2",
    "Third list item / リスト項目 3",
    "Fourth list item / リスト項目 4",
  ];

  for (const text of items) {
    const item = el("div", "bordered-list-item");
    item.textContent = text;
    list.appendChild(item);
  }

  s.appendChild(list);
  container.appendChild(s);
}

function renderRings(container: HTMLElement) {
  const s = section("Focus Rings");
  const row = el("div", "ring-demo");

  const ringVars = [
    "primary",
    "secondary",
    "inverse",
    "info",
    "danger",
    "success",
    "warning",
  ] as const;

  for (const name of ringVars) {
    const box = el("button", "ring-box");
    box.type = "button";
    box.style.setProperty("--_ring-color", `var(--color-ring-${name})`);
    box.textContent = name;
    row.appendChild(box);
  }

  s.appendChild(row);
  container.appendChild(s);
}

export function renderPreview(container: HTMLElement) {
  renderTypography(container);
  renderCards(container);
  renderBadges(container);
  renderButtons(container);
  renderBorderedList(container);
  renderRings(container);
}
