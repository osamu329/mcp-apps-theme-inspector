import {
  COLOR_GROUPS,
  TEXT_SCALE,
  HEADING_SCALE,
  FONT_WEIGHTS,
  FONT_FAMILIES,
  BORDER_RADII,
  SHADOWS,
  type ColorGroup,
  type TypeScaleEntry,
} from "../shared/constants";

function getVar(name: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  if (className) e.className = className;
  return e;
}

function sectionTitle(text: string): HTMLElement {
  const h = el("h2", "category-title");
  h.textContent = text;
  return h;
}

function varLabel(varName: string): HTMLElement {
  const row = el("div", "var-meta");
  const name = el("span", "var-name");
  name.textContent = varName;
  row.appendChild(name);
  const val = el("span", "var-value");
  val.textContent = getVar(varName) || "(not set)";
  row.appendChild(val);
  return row;
}

// ─── Color Groups ───────────────────────────────────────────────

function renderColorGroup(parent: HTMLElement, g: ColorGroup) {
  const card = el("div", "color-group-card");
  card.style.background = `var(${g.bg})`;
  card.style.color = `var(${g.text})`;
  card.style.borderColor = `var(${g.border})`;

  // Header with label + description
  const header = el("div", "color-group-header");
  const title = el("strong", "color-group-label");
  title.textContent = g.label;
  header.appendChild(title);
  const desc = el("span", "color-group-desc");
  desc.textContent = g.description;
  header.appendChild(desc);
  card.appendChild(header);

  // Sample mini-components inside the card
  const samples = el("div", "color-group-samples");

  // Alert-like message
  const alert = el("div", "color-group-alert");
  alert.style.borderLeftColor = `var(${g.border})`;
  alert.textContent = `This is a ${g.name} alert message.`;
  samples.appendChild(alert);

  // Badge
  const badge = el("span", "color-group-badge");
  badge.style.background = `var(${g.bg})`;
  badge.style.color = `var(${g.text})`;
  badge.style.borderColor = `var(${g.border})`;
  badge.textContent = g.label;
  samples.appendChild(badge);

  // Focus ring demo (if ring exists)
  if (g.ring) {
    const ringBox = el("button", "color-group-ring");
    ringBox.setAttribute("type", "button");
    ringBox.style.setProperty("--_ring-color", `var(${g.ring})`);
    ringBox.textContent = "Click to focus";
    samples.appendChild(ringBox);
  }

  card.appendChild(samples);

  // Variable details (collapsible feel — always visible for inspector)
  const vars = el("div", "color-group-vars");
  vars.appendChild(varLabel(g.bg));
  vars.appendChild(varLabel(g.text));
  vars.appendChild(varLabel(g.border));
  if (g.ring) vars.appendChild(varLabel(g.ring));
  card.appendChild(vars);

  parent.appendChild(card);
}

function renderColorGroups(container: HTMLElement) {
  const section = el("section", "category");
  section.appendChild(sectionTitle("Color Groups"));

  const grid = el("div", "color-groups-grid");
  for (const g of COLOR_GROUPS) {
    renderColorGroup(grid, g);
  }
  section.appendChild(grid);
  container.appendChild(section);
}

// ─── Typography Scale ───────────────────────────────────────────

function renderTypeScaleEntry(parent: HTMLElement, entry: TypeScaleEntry) {
  const row = el("div", "type-scale-row");

  const samples = el("div", "type-scale-samples");
  const sampleEn = el("div", "type-scale-sample");
  sampleEn.style.fontSize = `var(${entry.sizeVar})`;
  sampleEn.style.lineHeight = `var(${entry.lineHeightVar})`;
  sampleEn.textContent = `${entry.label} — The quick brown fox`;
  samples.appendChild(sampleEn);
  const sampleJa = el("div", "type-scale-sample");
  sampleJa.style.fontSize = `var(${entry.sizeVar})`;
  sampleJa.style.lineHeight = `var(${entry.lineHeightVar})`;
  sampleJa.textContent = `${entry.label} — 素早い茶色の狐が怠惰な犬を飛び越える`;
  samples.appendChild(sampleJa);
  row.appendChild(samples);

  const meta = el("div", "type-scale-meta");
  meta.appendChild(varLabel(entry.sizeVar));
  meta.appendChild(varLabel(entry.lineHeightVar));
  row.appendChild(meta);

  parent.appendChild(row);
}

function renderTypography(container: HTMLElement) {
  // Font families
  const famSection = el("section", "category");
  famSection.appendChild(sectionTitle("Font Families"));
  for (const f of FONT_FAMILIES) {
    const row = el("div", "font-family-row");
    const sample = el("div", "font-family-sample");
    sample.style.fontFamily = `var(${f.varName})`;
    sample.textContent = `${f.label}: The quick brown fox jumps over the lazy dog. 0123456789`;
    const sampleJa = el("div", "font-family-sample");
    sampleJa.style.fontFamily = `var(${f.varName})`;
    sampleJa.textContent = `いろはにほへと散りぬるを。色は匂へど散りぬるを。`;
    row.appendChild(sampleJa);
    row.appendChild(sample);
    row.appendChild(varLabel(f.varName));
    famSection.appendChild(row);
  }
  container.appendChild(famSection);

  // Font weights
  const weightSection = el("section", "category");
  weightSection.appendChild(sectionTitle("Font Weights"));
  const weightRow = el("div", "font-weight-grid");
  for (const w of FONT_WEIGHTS) {
    const box = el("div", "font-weight-box");
    const sample = el("div", "font-weight-sample");
    sample.style.fontWeight = `var(${w.varName})`;
    sample.textContent = `${w.label}: Aa Bb 漢字`;
    box.appendChild(sample);
    box.appendChild(varLabel(w.varName));
    weightRow.appendChild(box);
  }
  weightSection.appendChild(weightRow);
  container.appendChild(weightSection);

  // Heading scale
  const headingSection = el("section", "category");
  headingSection.appendChild(sectionTitle("Heading Scale"));
  for (const entry of HEADING_SCALE) {
    renderTypeScaleEntry(headingSection, entry);
  }
  container.appendChild(headingSection);

  // Text scale
  const textSection = el("section", "category");
  textSection.appendChild(sectionTitle("Text Scale"));
  for (const entry of TEXT_SCALE) {
    renderTypeScaleEntry(textSection, entry);
  }
  container.appendChild(textSection);
}

// ─── Visual: Radius, Shadow ────────────────────────────────────

function renderRadiiAndShadows(container: HTMLElement) {
  // Border radius
  const radiusSection = el("section", "category");
  radiusSection.appendChild(sectionTitle("Border Radius"));
  const radiusGrid = el("div", "visual-grid");
  for (const v of BORDER_RADII) {
    const item = el("div", "visual-item");
    const box = el("div", "radius-box");
    box.style.borderRadius = `var(${v})`;
    item.appendChild(box);
    const label = el("div", "visual-label");
    label.textContent = v.replace("--border-radius-", "");
    item.appendChild(label);
    const val = el("div", "visual-value");
    val.textContent = getVar(v) || "(not set)";
    item.appendChild(val);
    radiusGrid.appendChild(item);
  }
  radiusSection.appendChild(radiusGrid);
  container.appendChild(radiusSection);

  // Border width
  const bwSection = el("section", "category");
  bwSection.appendChild(sectionTitle("Border Width"));
  const bwRow = el("div", "var-row");
  const bwBox = el("div", "bw-box");
  bwBox.style.borderWidth = "var(--border-width-regular)";
  bwRow.appendChild(bwBox);
  bwRow.appendChild(varLabel("--border-width-regular"));
  bwSection.appendChild(bwRow);
  container.appendChild(bwSection);

  // Shadows
  const shadowSection = el("section", "category");
  shadowSection.appendChild(sectionTitle("Shadows"));
  const shadowGrid = el("div", "visual-grid");
  for (const v of SHADOWS) {
    const item = el("div", "visual-item");
    const box = el("div", "shadow-box");
    box.style.boxShadow = `var(${v})`;
    item.appendChild(box);
    const label = el("div", "visual-label");
    label.textContent = v.replace("--shadow-", "");
    item.appendChild(label);
    const val = el("div", "visual-value");
    val.textContent = getVar(v) || "(not set)";
    item.appendChild(val);
    shadowGrid.appendChild(item);
  }
  shadowSection.appendChild(shadowGrid);
  container.appendChild(shadowSection);
}

// ─── Entry point ────────────────────────────────────────────────

export function renderVariables(container: HTMLElement) {
  renderColorGroups(container);
  renderTypography(container);
  renderRadiiAndShadows(container);
}
