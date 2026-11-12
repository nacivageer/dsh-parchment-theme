// Executes client.js for real (not just a syntax check) so a typo like a removed
// constant still referenced in the exports cannot ship silently again.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';

const here = path.dirname(fileURLToPath(import.meta.url));
const source = readFileSync(path.join(here, '..', 'client.js'), 'utf8');

// dsh reads a bundle's package.json with JSON.parse, which rejects a leading
// UTF-8 BOM. v0.1.10 shipped one, so the whole bundle was skipped at profile
// load and the app silently fell back to the stock look.
const manifestBytes = readFileSync(path.join(here, '..', 'package.json'));
assert.ok(
  !(manifestBytes[0] === 0xef && manifestBytes[1] === 0xbb && manifestBytes[2] === 0xbf),
  'package.json must not start with a UTF-8 BOM',
);
assert.doesNotThrow(() => JSON.parse(manifestBytes.toString('utf8')), 'package.json must be plain JSON');

let definition;
globalThis.window = { __ModuleLoader__: { load: (value) => { definition = value; } } };

const appended = [];
const htmlAttributes = new Map();
globalThis.document = {
  createElement: () => ({
    dataset: {},
    textContent: '',
    remove() { this.removed = true; },
  }),
  head: { append: (node) => appended.push(node) },
  documentElement: {
    setAttribute: (name, value) => htmlAttributes.set(name, value),
    removeAttribute: (name) => htmlAttributes.delete(name),
  },
};

// The preference store reads Storage; the runner has no browser window, so a
// Map-backed double stands in and also proves the write path.
const storage = new Map();
globalThis.localStorage = {
  getItem: (key) => (storage.has(key) ? storage.get(key) : null),
  setItem: (key, value) => storage.set(key, String(value)),
};

await import('data:text/javascript;base64,' + Buffer.from(source, 'utf8').toString('base64'));

assert.equal(definition?.id, 'dsh-parchment-theme', 'module never registered itself');

// The Client half draws its preference rows with React but renders nothing at
// load time, so the seam only needs the two hooks the rows call.
const reactStub = {
  createElement: () => null,
  useSyncExternalStore: (_subscribe, getSnapshot) => getSnapshot(),
};
const plugin = definition.factory((name) => {
  if (name === 'react') return reactStub;
  if (name === '@deepseek-ai/dsh-client-ui-primitives') return { Switch: () => null };
  throw new Error(`unexpected module request: ${name}`);
});
assert.deepEqual(
  plugin.inject,
  ['theme'],
  'the token layer depends only on the theme service — the UI seats are requested lazily',
);

let layer;
const disposers = [];
const dictionaries = [];
const registrations = [];
const seats = [];
// The real bundle is `immediately: true`, so the settings/header seats are
// requested through ctx.inject instead of a hard `inject` edge; the fake here
// hands them over immediately, the way Cordis would once they exist.
const seat = {
  effect: (fn) => { disposers.push(fn()); },
  locale: { register: (ns, dict) => { dictionaries.push({ ns, dict }); return () => {}; } },
  slots: {
    inject: (name, factory) => { factory(); return () => {}; },
    register: (options, component) => { registrations.push({ options, component }); return () => {}; },
  },
  remote: { session: { openWorkspacePath: async () => ({ ok: true }) } },
};
plugin.apply({
  effect: (fn) => { disposers.push(fn()); },
  theme: { overrideTokens: (id, tokens) => { layer = { id, tokens }; return () => {}; } },
  inject: (deps, callback) => {
    seats.push(deps);
    callback(seat);
    return { dispose: () => {} };
  },
});

assert.equal(layer?.id, 'dsh-parchment-theme');
const names = Object.keys(layer.tokens);
assert.ok(names.length > 100, `expected the full token layer, got ${names.length}`);

for (const [name, modes] of Object.entries(layer.tokens)) {
  assert.equal(typeof modes.light, 'string', `${name} has no light value`);
  assert.equal(typeof modes.dark, 'string', `${name} has no dark value`);
  assert.ok(modes.light.trim() && modes.dark.trim(), `${name} has an empty value`);
}

assert.equal(appended.length, 1, 'exactly one stylesheet should be injected');
const css = appended[0].textContent;

// Page-level zoom misplaced viewport-flipped popovers. The settings modal keeps
// one zoom, but its plugin-market page drops it: the zoom also scales
// fixed-position hover tooltips away from the card they belong to.
const cssNoComments = css.replace(/\/\*[\s\S]*?\*\//g, '');
const zoomRules = [...cssNoComments.matchAll(/([^{}]+)\{[^}]*zoom\s*:/g)].map((m) => m[1].trim());
assert.deepEqual(
  zoomRules,
  [
    'body [class*="AnXs9G_panel"]',
    'body:has([class*="AnXs9G_panel"] :is([class*="nUhMVa_root"],[data-plugin-tab])) [class*="AnXs9G_panel"] [role="tooltip"]',
  ],
  'every Settings page keeps one zoom; only the plugin market bubble cancels it',
);

// Settings cards and row rules need a visible stroke on paper.
assert.match(
  css,
  /body \[class\*="AnXs9G_panel"\]\{[^}]*--dsw-alias-settings-card-stroke:/,
  'settings cards get a visible stroke',
);

// Inactive settings controls copy the composer input's raised fill + soft elevation.
assert.match(
  css,
  /button\[aria-haspopup\][^}]*box-shadow:var\(--dsw-elevation-soft\)/,
  'settings dropdowns use the composer elevation',
);
assert.match(
  css,
  /button\[class\*="themeCube"\]\[class\*="selected"\]\{background:var\(--dsw-specific-bubble\)/,
  'the selected appearance cube uses the bubble fill',
);
assert.match(
  css,
  /\[class~="Wsg8iW_card"\]\[class~="Wsg8iW_cardActive"\]\{background:var\(--dsw-specific-bubble\)/,
  'the selected agent preset card uses the bubble fill',
);
// The active preset card is the lightest surface in the grid (#72664f), where the
// shipped secondary / tertiary ink falls to 2.7:1 and 1.8:1; that card lifts its
// own ranks, the others keep the shipped ink.
assert.match(
  css,
  /\[data-ds-dark-theme\][^{]*Wsg8iW_cardActive[^{]*Wsg8iW_cardName[^{]*\{color:#f8f4ea\}/,
  'the active preset card lifts its title ink',
);
assert.match(
  css,
  /\[data-ds-dark-theme\][^{]*Wsg8iW_cardActive[^{]*Wsg8iW_cardDesc[^{]*\{color:#f4efe4\}/,
  'the active preset card lifts its description ink',
);
assert.match(
  css,
  /\[data-ds-dark-theme\][^{]*Wsg8iW_cardActive[^{]*Wsg8iW_helpButton[^{]*\{color:#eee6d7\}/,
  'the active preset card lifts its footer actions',
);
assert.match(css, /\[class~="Wsg8iW_creatorButton"\]/, 'the custom preset button uses the raised surface');
assert.match(
  css,
  /button\[class\*="_button"\][^}]*box-shadow:var\(--dsw-elevation-soft\)/,
  'custom settings buttons use the composer elevation',
);
assert.match(
  css,
  /\[class\*="_stepper"\]\{background:var\(--dsw-specific-input-major\)/,
  'the font-size stepper uses the composer fill',
);
assert.match(
  css,
  /\[class\$="_control"\]\{background:var\(--dsw-specific-input-major\)/,
  'the font-size control wrapper uses the composer fill',
);
assert.match(
  css,
  /\[class\*="_identity"\] \[class\*="_avatar"\]\{[^}]*background-image:url\("data:image\/png;base64,/,
  'the account avatar uses the user pixel seal',
);
assert.match(css, /\[class\*="_5Qcc8a_avatar"\]\{width:32px;height:32px\}/, 'the sidebar seal is 32px');
assert.match(css, /\[class\*="_identity"\] \[class\*="_avatar"\]\{width:40px;height:40px\}/, 'the settings seal is 40px');
assert.match(
  css,
  /body\[data-ds-dark-theme\] \[class\*="AnXs9G_panel"\]\{--dsw-specific-input-major:#554c44\}/,
  'the dark settings panel uses the fig3 control surface',
);
assert.match(
  css,
  /\[data-ds-dark-theme\][^{]*themeCube[^{]*selected[^{]*\{background:#72664f/,
  'the dark selected appearance cube uses the olive fill',
);
assert.match(
  css,
  /\[class\*="_5Qcc8a_avatar"\][^{]*\{[^}]*filter:drop-shadow/,
  'the wax seals get a soft outward shadow',
);
assert.match(
  css,
  /\[class\*="_5Qcc8a_label"\][^{]*\{[^}]*background-image:linear-gradient/,
  'the sidebar account label gets the mockup gradient',
);
assert.match(
  css,
  /\[class\*="_6qcDqa_name"\][^{]*\{[^}]*font-family:"寒蝉活宋体_復/,
  'the settings account name uses 寒蝉活宋体_復',
);
// The account section's fine print (masked phone, 更多账号信息, the balance row
// label, 更多) inherits 13px; the panel zoom only lifts it to ~15px.
assert.match(
  css,
  /body \[class\*="_6qcDqa_status"\],\s*body \[class\*="_6qcDqa_accountInfo"\],\s*body \[class\*="_6qcDqa_balanceCard"\] \[class\*="_6qcDqa_row"\]>span:first-child,\s*body \[class\*="_6qcDqa_secondary"\]\{font-size:17px;line-height:26px\}/,
  'the account section fine print sits on the panel body rank',
);
// 查询用量 takes the selected appearance cube's surface; 充值 keeps the ink primary.
assert.match(
  css,
  /\[class\*="_6qcDqa_balanceCard"\] a\[class\*="_6qcDqa_linkButton"\]:not\(\[class\*="_6qcDqa_primary"\]\)\{background:var\(--dsw-specific-bubble\);border:1px solid var\(--dsw-alias-button-ghost-active-border\)/,
  'the usage action uses the selected appearance cube surface',
);
assert.match(
  css,
  /\[data-ds-dark-theme\][^{]*_6qcDqa_balanceCard[^{]*_6qcDqa_linkButton[^{]*\{background:#72664f/,
  'the dark usage action uses the dark selected cube surface',
);
assert.match(
  css,
  /linear-gradient\(90deg,#b78472 0%,#af804a 50%,#bb956c 90%,#bb956c 100%\)/,
  'the dark account label gets its own gradient',
);
assert.match(
  css,
  /body\[data-ds-dark-theme\] \[class\*="GAkraW_sectionHeader"\]\{background:#5b4a2a;color:#e7c17b/,
  'the dark workspace header uses the gold-on-brown palette',
);
assert.match(
  css,
  /body:not\(\[data-ds-dark-theme\]\) \[class\*="_block_"\]\:has\(\[data-code-block-banner\]\)[^{]*\{[^}]*border:1px solid #9d8f79/,
  'code blocks get a visible light frame',
);
assert.match(
  css,
  /body\[data-ds-dark-theme\] \[class\*="_block_"\]\:has\(\[data-code-block-banner\]\)[^{]*\{[^}]*border:1px solid #665646/,
  'code blocks get a visible dark frame',
);
assert.match(
  css,
  /\[class\*="_infostring_"\][^{]*\{[^}]*猫啃网故障宋[^}]*font-style:italic/,
  'the code block banner uses 猫啃网故障宋 italic',
);
assert.match(
  css,
  /\[class\*="_language_1mqf1_30"\][^}]*猫啃网故障宋/,
  'the code block title uses 猫啃网故障宋',
);
assert.match(
  css,
  /\[class\*="HOHHba_card"\]\{--changes-fill:#d2ccc2[^}]*border-color:#a89a84/,
  'the changed-files card uses the warm code-block surface',
);
assert.match(
  css,
  /\[class\*="HOHHba_preview"\],[^{]*\[class\*="_0cITKW_root"\]\{background:#d2ccc2/,
  'the changed-files diff surface is explicit warm paper',
);
assert.match(
  css,
  /\[class\*="_preview_l6gf9_51"\][^{]*\{background:#d2ccc2/,
  'the floating preview surface uses the warm paper surface',
);
assert.match(
  css,
  /\[class~="qgYWUG_card"\]:not\(:has\(\[data-tone="neutral"\]\)\)\{background:var\(--dsw-specific-input-major\)/,
  'plugin inventory cards use the button surface except the disabled one',
);
assert.match(
  css,
  /body\[data-ds-dark-theme\] \[class\*="AnXs9G_panel"\] \[class~="qgYWUG_card"\]:not\(:has\(\[data-tone="neutral"\]\)\)\{background:#302a23\}/,
  'dark plugin inventory cards match the composer input surface',
);
assert.match(
  css,
  /body\[data-ds-dark-theme\] \[class\*="AnXs9G_panel"\] \[class~="qgYWUG_card"\]:has\(\[data-tone="neutral"\]\)\{background:var\(--dsw-alias-bg-layer-1\)\}/,
  'the dark disabled plugin card matches the search box surface',
);
assert.match(
  css,
  /\[class\*="_block_"\]\:has\(\[data-code-block-banner\]\) :where\(pre\)\{[^}]*寒蝉活宋体_復[^}]*font-style:italic/,
  'the code block body uses 寒蝉活宋体_復 italic',
);

// Dark tooltips need an edge so they do not melt into the brown panels.
assert.match(css, /body\[data-ds-dark-theme\] \[role="tooltip"\]/, 'dark tooltips get an edge');
// The unpositioned-tooltip guard was removed on purpose: 0.2.2 renders the
// stuck bubble at coordinates that are not 0px, so the CSS never matched while
// still suggesting the case was handled. The fix belongs in the tooltip
// component; keeping a dead selector here would read as coverage.
assert.doesNotMatch(
  css,
  /\[role="tooltip"\][^{]*\{[^}]*display:none/,
  'no CSS guard pretends to cover the stuck tooltip',
);

// The shipped 新会话 glyph is a ⊕ icon in the sidebar button and the workspace
// row; the quill artwork replaces both, painted as a mask so it follows the
// button's ink colour and the data URI is carried once.
assert.match(css, /--dsh-quill-mask:url\("data:image\/png;base64,/, 'the quill mask is embedded once');
assert.match(
  css,
  /\[class\*="wtg9ga_newSessionContent"\]>svg\{display:none\}/,
  'the sidebar new-session glyph is hidden',
);
assert.match(
  css,
  /\[class\*="_projectRow"\] \[class\*="_rowActions"\] button:not\(\[data-context-menu-trigger\]\)::before/,
  'the quill replaces only the workspace row new-session button',
);
// Composer chrome (tool row, hero chips, + palette) goes one step up with the
// 18px content.
assert.match(css, /\[class\*="GRgSLq_add"\]\{width:32px;height:32px\}/, 'the composer + button grows');
assert.match(css, /\[class\*="GRgSLq_select"\]\{font-size:17px/, 'the composer selects grow');
assert.match(css, /\[class\*="GRgSLq_accessory"\] button\{font-size:17px/, 'the hero chips grow');
assert.match(
  css,
  /body \[class\*="_86kJGG_trigger"\],\s*body \[class\*="_86kJGG_triggerLabel"\],\s*body \[class\*="WOwLGG_workspace"\],\s*body \[class\*="WOwLGG_workspaceLabel"\]\{font-size:17px;line-height:24px\}/,
  'the permission and workspace pickers share the toolbar rank',
);
assert.match(
  css,
  /\[class\*="m2hUqa_itemName"\]\{font-size:18px;line-height:26px\}/,
  'the preset menu option names grow',
);
assert.match(
  css,
  /\[class\*="m2hUqa_itemDesc"\]\{font-size:14px;line-height:20px;color:var\(--dsw-alias-label-secondary\)\}/,
  'the preset option descriptions grow and use the secondary ink',
);
assert.match(
  css,
  /\[class\*="AnXs9G_navCell"\]\{font-family:"寒蝉活宋体_復"/,
  'the settings nav uses the display face',
);
assert.match(css, /--dsh-hourglass-mask:url\("data:image\/png;base64,/, 'the hourglass mask is embedded');
assert.match(
  css,
  /\[class\*="V4vHZW_older"\] button:not\(:disabled\)::before\{[^}]*var\(--dsh-hourglass-mask\)/,
  'load-earlier paints the hourglass before its label',
);
// 0.2.2 renders every state label of the load-earlier button in one grid cell
// and hides the inactive ones with visibility; those spans still take width, so
// the flex row has to drop them or the visible label drifts off-centre.
assert.match(
  css,
  /\[class\*="V4vHZW_older"\] button \[class\*="historyHidden"\]\{display:none\}/,
  'inactive load-earlier states are removed from the flex row',
);

// Two labels carry their own ink: the creator preset (chip, preset menu, session
// header) and the full-access permission (trigger and its menu row). CSS cannot
// match text, so the Client half tags them with data-dsh-accent first.
assert.match(
  css,
  /body\{--dsh-creator-ink:#386b9a;--dsh-full-access-ink:#a85418\}/,
  'light mode carries the blue creator ink and orange full-access ink',
);
assert.match(
  css,
  /body\[data-ds-dark-theme\]\{--dsh-creator-ink:#e7c15c;--dsh-full-access-ink:#df8f3f\}/,
  'dark mode carries the yellow creator ink and orange full-access ink',
);
assert.match(
  css,
  /\[data-dsh-accent="creator"\] \[class\*="m2hUqa_seatLabel"\]/,
  'the tagged preset chip paints its label',
);
assert.match(
  css,
  /\[class\*="m2hUqa_itemName"\]\[data-dsh-accent="creator"\]/,
  'the tagged preset menu row paints its name',
);
assert.match(
  css,
  /\[class\*="dscfja_label"\]\[data-dsh-accent="creator"\]\{color:var\(--dsh-creator-ink\)\}/,
  'the tagged session-header label paints its name',
);
assert.match(
  css,
  /\[class\*="_86kJGG_trigger"\]\[data-dsh-accent="full-access"\]\{color:var\(--dsh-full-access-ink\)\}/,
  'the tagged permission trigger paints its icon and label',
);
assert.match(
  css,
  /\[role="menuitem"\]\[data-dsh-accent="full-access"\] \[class\*="_itemLabel"\]/,
  'the tagged permission menu row paints its label',
);
assert.match(
  css,
  /\[role="menuitem"\]\[data-dsh-accent="full-access"\] \[class\*="_check"\]\{color:var\(--dsh-full-access-ink\)\}/,
  'the full-access check follows the orange ink',
);
assert.match(
  css,
  /\[role="menuitem"\]\[data-dsh-accent="creator"\] \[class\*="_check"\]\{color:var\(--dsh-creator-ink\)\}/,
  'the creator check follows the creator ink',
);
// 退出登录 is a plain menu row; it takes the primitives danger ink.
assert.match(
  css,
  /\[role="menuitem"\]\[data-dsh-accent="danger"\] \[class\*="_itemLabel"\]\{color:var\(--dsw-alias-state-error-primary\)\}/,
  'the sign-out row uses the danger ink',
);
// Light-mode diff rows read as a green wash: the marker green deepens and the
// row ink goes a step darker; dark mode keeps the shipped values.
assert.match(
  css,
  /body:not\(\[data-ds-dark-theme\]\)\{--dsw-alias-file-diff-added-marker:#2f6b3a;--dsw-alias-file-diff-deleted-marker:#8e2420\}/,
  'the light diff markers are deepened',
);
assert.equal(
  layer.tokens['--dsw-alias-file-diff-added-bg'].light,
  '#c2c6b1',
  'the light diff fill is lighter than the ink',
);
assert.equal(
  layer.tokens['--dsw-alias-file-diff-deleted-bg'].light,
  '#d9b9af',
  'the light deleted fill is lighter than the ink',
);
// The chat turn-trigger banner (自动化任务 …) sits on the changed-files card's
// sheet instead of a beige that barely separated from the paper.
assert.equal(
  layer.tokens['--dsw-alias-turn-trigger-bg'].light,
  layer.tokens['--dsw-alias-markdown-code-block'].light,
  'the turn-trigger banner shares the changed-files card surface',
);
assert.equal(
  layer.tokens['--dsw-alias-turn-trigger-bg'].dark,
  layer.tokens['--dsw-alias-markdown-code-block'].dark,
  'the dark turn-trigger banner shares the changed-files card surface',
);
// Hovering used to swap the sheet for a 6% ink wash, which read as a dark drop
// over the expanded body; it lifts to the paper-white chip instead.
assert.equal(
  layer.tokens['--dsw-alias-turn-trigger-bg-hover'].light,
  '#e4e1db',
  'the hovered turn-trigger banner lifts to the paper-white chip',
);
assert.match(
  css,
  /body:not\(\[data-ds-dark-theme\]\) \[class\*="0cITKW_text"\]\{color:#17110b\}/,
  'the light diff row ink is darker',
);
// The delivered-file card shipped a 13px title and a 10px summary.
assert.match(css, /\[class~="K5rwea_fileName"\]\{font-size:17px;line-height:24px\}/, 'the file card title grows');
assert.match(css, /\[class~="K5rwea_description"\]\{font-size:14px;line-height:20px\}/, 'the file card summary grows');
assert.equal(typeof plugin.__parchment.paintAccents, 'function', 'the accent painter is exposed for tests');

// The schedule_create transcript card shipped on the stock near-white sheet; it
// takes the well tone, a stronger second line and a cream 打开 chip.
assert.match(
  css,
  /\[class\*="oT5lKa_card"\]\{--card-fill:var\(--dsw-alias-bg-layer-3\)/,
  'the scheduled-task card uses the well tone',
);
assert.match(
  css,
  /\[class\*="oT5lKa_frequency"\]\{font-size:12px;line-height:18px;color:var\(--dsw-alias-label-secondary\)\}/,
  'the scheduled-task frequency line uses the secondary ink',
);
assert.match(
  css,
  /\[class\*="oT5lKa_openButton"\][^{]*\{[^}]*background:#d2ccc3/,
  'the scheduled-task open action sits on a warm greige chip',
);
assert.match(
  css,
  /\[data-ds-dark-theme\] \[class\*="oT5lKa_openButton"\][^{]*\{background:#564f47/,
  'the dark scheduled-task open action sits on a taupe chip',
);
// An expanded turn-trigger prints the raw notice; it reads as body copy.
assert.match(
  css,
  /\[class\*="hSzSIW_content"\]\{font-size:16px;line-height:26px;font-style:italic\}/,
  'the expanded turn-trigger body uses 16px italic body type',
);

// 自动化任务 (the task-manager page) shipped its own 14/13 type scale and a
// hairline-outlined search well. It now takes the Settings column's ranks,
// pre-multiplied by that panel's 1.15 zoom, and the composer's raised surface.
assert.match(
  css,
  /\[class\*="olCj9W_pageHeading"\] h1\{font-size:21px;line-height:30px;font-weight:600/,
  'the task-manager heading uses the settings page-title rank',
);
assert.match(
  css,
  /\[class\*="olCj9W_rowTitle"\]\{font-size:18px;line-height:27px;font-weight:400\}/,
  'a task row reads as a settings 栏目名',
);
assert.match(
  css,
  /\[class\*="olCj9W_rowSummary"\],\s*body \[class\*="olCj9W_metadata"\]\{font-size:16px;line-height:22px;color:var\(--dsw-alias-label-secondary\)\}/,
  'a task summary reads as a settings 摘要',
);
assert.match(
  css,
  /\[class\*="olCj9W_filterTab"\]\{height:36px;padding:0 13px;font-size:18px/,
  'the status filters take the 栏目名 rank',
);
assert.match(
  css,
  /\[class\*="olCj9W_searchField"\]\{[^}]*border-radius:var\(--dsw-radius-lg\);background:var\(--dsw-specific-input-major\);box-shadow:var\(--dsw-elevation-soft\)/,
  'the task search field takes the composer input surface',
);
assert.match(
  css,
  /\[class\*="olCj9W_searchField"\]:focus-within\{border-color:var\(--dsw-alias-state-business-primary\)\}/,
  'the borderless search field still marks focus',
);

// The 插件 panel is a main-column page (no Settings zoom) and takes the same
// ranks: page title = Settings page-title step, card names = 栏目名, one-liners
// = 摘要. Its status switch is scoped to its own tab row.
assert.match(
  css,
  /\[data-plugin-header-part="title"\],\s*body \[data-plugin-panel\] \[class\*="V7pFBG_pageTitle"\]\{font-size:21px;line-height:30px;font-weight:600/,
  'the Plugins page title uses the settings page-title rank',
);
assert.match(
  css,
  /\[data-plugin-panel\] \[data-plugin-group\] h3\{font-size:18px;line-height:27px\}/,
  'the Plugins group heading reads as a 栏目名',
);
assert.match(
  css,
  /\[data-plugin-panel\] \[class\*="V7pFBG_cardTitle"\]\{font-size:18px;line-height:27px;font-weight:400\}/,
  'a plugin card name reads as a 栏目名',
);
assert.match(
  css,
  /\[data-plugin-panel\] \[class\*="V7pFBG_cardDesc"\]\{font-size:16px;line-height:22px;color:var\(--dsw-alias-label-secondary\)\}/,
  'a plugin card one-liner reads as a 摘要',
);
assert.match(
  css,
  /\[data-plugin-panel\] \[data-plugin-header-part="tabs"\] button\{height:34px;padding:0 18px;font-size:18px;line-height:27px\}/,
  'the Plugins status switch is scoped to its own tab row',
);

// The sidebar 更多 list is its own menu, not a row menu, and kept the 13px
// primitives items. Its list carries a moreMenu class that only exists while open.
assert.match(
  css,
  /body \[class\*="wtg9ga_moreMenu"\] \[role="menuitem"\]\{font-size:16px;line-height:24px;min-height:40px\}/,
  'the sidebar 更多 list uses the sidebar menu rank',
);

// dshmarket renders in two hosts: the Settings panel zooms it 1.15, the main
// column does not, so the sidebar copy carries the same ranks scaled by 1.15 —
// gated off while a Settings panel is on screen, which already carries the zoom.
assert.match(
  css,
  /body:not\(:has\(\[class\*="AnXs9G_panel"\]\)\) \[class~="nUhMVa_title"\]\{font-size:21px;line-height:30px;font-weight:600\}/,
  'the main-column market title takes the 插件 page-title rank',
);
assert.match(
  css,
  /body:not\(:has\(\[class\*="AnXs9G_panel"\]\)\) \[class~="nUhMVa_tab"\],\s*body:not\(:has\(\[class\*="AnXs9G_panel"\]\)\) \[class~="nUhMVa_nm"\]/,
  'market tabs and card names take the 栏目名 rank',
);
assert.match(
  css,
  /body:not\(:has\(\[class\*="AnXs9G_panel"\]\)\) \[class~="nUhMVa_desc"\],\s*body:not\(:has\(\[class\*="AnXs9G_panel"\]\)\) \[class~="nUhMVa_recentDesc"\]\{font-size:16px;line-height:22px;color:var\(--dsw-alias-label-secondary\)\}/,
  'market summaries take the 摘要 rank and the secondary ink',
);
assert.match(
  css,
  /\[class\*="nUhMVa_head"\] button:not\(\[class~="nUhMVa_tab"\]\):not\(\[data-chip\]\)/,
  'the market header controls are sized by hand',
);
assert.doesNotMatch(
  css,
  /body:not\(\[data-ds-dark-theme\]\) \[class\*="nUhMVa_/,
  'the market scale is not keyed on the colour scheme',
);

const family = layer.tokens['--dsw-font-family'];
assert.ok(family, 'the font stack must be part of the layer');
assert.match(family.light, /思源宋体 CN/, 'body text uses 思源宋体 CN');
assert.match(family.light, /^var\(--dsh-font-family-text/, 'a font chosen in Settings still wins');
assert.match(css, /寒蝉活宋体_復 Bold/, 'the session title uses the real Bold family, not synthesis');

// The account popup is the shared primitives menu, which has no account class of
// its own; sizing it must therefore be gated on the trigger's open state so the
// rest of the app's menus keep their shipped size.
assert.match(
  css,
  /body:has\(\[class\*="_5Qcc8a_trigger"\]\[aria-expanded="true"\]\) \[role="menuitem"\]/,
  'the account menu is sized only while its trigger is open',
);

// The workspace / session row ⋯ menus are the same 13px primitives list. Gate on
// the row's own open trigger, addressed by the business attribute data-row-key,
// so menus elsewhere in the app keep the shipped scale.
assert.match(
  css,
  /body:has\(\[data-row-key\] button\[aria-haspopup="menu"\]\[aria-expanded="true"\]\) \[role="menuitem"\]\{font-size:16px/,
  'sidebar row menus grow only while their own trigger is open',
);

// The path/creation hover card hardcodes a neutral dark surface (#2C2C2E) and
// white ink in both modes. It takes the 工作区 section bar's palette instead of a
// warm tint (a beige card read as noise and collided with the idle-status dot),
// gated on .hoverContent so the diff preview card sharing the class is untouched.
assert.match(
  css,
  /body:not\(\[data-ds-dark-theme\]\) \[class\*="_card_"\]:has\(\[class\*="hoverContent"\]\)\{--dsw-alias-hovercard-bg:#8e979b/,
  'the hover card borrows the light workspace-bar surface',
);
assert.match(
  css,
  /body\[data-ds-dark-theme\] \[class\*="_card_"\]:has\(\[class\*="hoverContent"\]\)\{--dsw-alias-hovercard-bg:#5b4a2a/,
  'the hover card borrows the dark workspace-bar surface',
);
// 0.2.2 also routes the card's ink through palette variables; the slot rows and
// icons inside the card read them, so the card carries the inks too.
assert.equal(
  layer.tokens['--dsw-alias-card-fill'].light,
  layer.tokens['--dsw-alias-bg-layer-1'].light,
  'generic cards sit on the raised sheet',
);
assert.equal(
  layer.tokens['--dsw-alias-card-fill'].dark,
  layer.tokens['--dsw-alias-bg-layer-2'].dark,
  'dark generic cards sit on the warm raised step',
);
assert.equal(
  layer.tokens['--dsw-alias-settings-card-fill'].light,
  layer.tokens['--dsw-alias-bg-layer-1'].light,
  'settings cards keep the raised-sheet fill instead of the shipped white',
);
assert.equal(
  layer.tokens['--dsw-alias-settings-card-fill'].dark,
  layer.tokens['--dsw-alias-bg-layer-2'].dark,
  'dark settings cards keep the warm raised step',
);
assert.match(
  css,
  /\[class\*="_card_"\]:has\(\[class\*="hoverContent"\]\)\{[^}]*--dsw-alias-hovercard-label-primary:#26333a/,
  'the light hover card carries its ink as a palette variable',
);
// The schedule slot inside the same card hardcodes white/grey for the shipped
// dark bubble; it follows the card ink as well.
assert.match(
  css,
  /body\[data-ds-dark-theme\] \[class\*="hoverContent"\] \[class\*="DBgHeW_taskName"\]\{color:#e7c17b\}/,
  'the dark hover-card task name uses the hover title ink',
);
assert.match(
  css,
  /body:not\(\[data-ds-dark-theme\]\) \[class\*="hoverContent"\] \[class\*="DBgHeW_taskTiming"\]/,
  'the light hover-card task timing uses the hover body ink',
);
// New-session hero: display face for the headline, 工作区 palette for the badge.
assert.match(
  css,
  /\[class\*="WOwLGG_headline"\]\{font-family:"寒蝉活宋体_復"/,
  'the hero headline uses 寒蝉活宋体_復',
);
assert.match(
  css,
  /\[class\*="WOwLGG_previewBadge"\]\{background:#8e979b;color:#26333a/,
  'the light preview badge uses the workspace bar surface and ink',
);
assert.match(
  css,
  /body\[data-ds-dark-theme\] \[class\*="WOwLGG_previewBadge"\]\{background:#5b4a2a;color:#e7c17b/,
  'the dark preview badge uses the workspace bar surface and ink',
);
assert.match(
  css,
  /\[class\*="WOwLGG_previewBadge"\]\{[^}]*font-family:var\(--ds-font-family-code\)/,
  'the preview badge keeps the product code font, not the display face',
);
assert.match(
  css,
  /\[class\*="hoverContent"\] \[class\*="hoverTitle"\]\{color:#26333a\}/,
  'the hover card title uses the workspace bar ink',
);

// The settings panel zoom cannot grow components that pin px sizes, so form
// controls inside the panel need their own rule.
assert.match(css, /body \[class\*="AnXs9G_panel"\] button,/, 'settings form controls get their own size');
assert.match(
  css,
  /body:has\(\[class\*="AnXs9G_panel"\]\) \[role="menuitem"\]/,
  'menus opened from Settings match the panel scale',
);

// The shipped timestamp is 10px — unreadable next to a 16px session title.
assert.match(css, /body \[class\*="_sessionRow"\] \[class\*="_time"\]/, 'sidebar timestamps get a readable size');

// The changed-files card ships 10–13px ranks; they need to sit with the body text.
assert.match(
  css,
  /body \[class\*="HOHHba_card"\] \[class\*="HOHHba_path"\]/,
  'changed-files card rows get a readable size',
);

const seam = plugin.__parchment;
assert.ok(seam && seam.LIGHT && seam.DARK && seam.TOKENS);
assert.equal(Object.keys(seam.TYPE).length, 1, 'only the type face is layered now');
// Settings → 字号大小 writes these three; a token here would pin the rendered
// size while the control kept displaying the user's (ignored) value.
for (const name of ['--dsh-content-font-size', '--dsh-code-font-size', '--dsh-terminal-font-size']) {
  assert.equal(layer.tokens[name], undefined, `${name} must stay with the Settings control`);
  assert.equal(seam.LIGHT[name], undefined, `${name} must not reappear in the light palette`);
}

// ---- preference switches (Settings → General) -------------------------------
// Defaults mirror the shipped app: the 0.2.2 whale stays on, the folder button
// 0.2.2 removed stays off, so installing the theme changes no behaviour until
// the user flips a switch.
assert.deepEqual(
  { ...seam.PREF_DEFAULTS },
  { homeWhale: true, openFolder: false, codeItalic: true },
  'preference defaults follow the shipped app',
);
assert.equal(htmlAttributes.has(seam.HIDE_WHALE_ATTR), false, 'a fresh load hides nothing');
assert.equal(htmlAttributes.has(seam.UPRIGHT_CODE_ATTR), false, 'a fresh load keeps code italic');
assert.match(
  css,
  /html\[data-parchment-hide-whale\] \[data-home-whale\]\{display:none\}/,
  'the whale rule is opt-in behind the attribute',
);
assert.match(css, /\.dsh-parchment-switch\[data-on\]\{background:#8a7a5a/, 'the switch draws its on state');
assert.match(css, /\.dsh-parchment-openFolder\{/, 'the folder shortcut keeps icon-button metrics');

// Toggling the whale rewrites <html> (no reload) and persists the choice.
seam.setPref('homeWhale', false);
assert.equal(htmlAttributes.get(seam.HIDE_WHALE_ATTR), '', 'turning the whale off marks <html>');
assert.deepEqual(
  JSON.parse(storage.get(seam.PREF_KEY)),
  { homeWhale: false, openFolder: false, codeItalic: true },
);
seam.setPref('homeWhale', true);
assert.equal(htmlAttributes.has(seam.HIDE_WHALE_ATTR), false, 'turning it back on removes the mark');

// The code-italic switch uses the same attribute mechanism.
seam.setPref('codeItalic', false);
assert.equal(htmlAttributes.get(seam.UPRIGHT_CODE_ATTR), '', 'turning italic off marks <html>');
assert.match(
  css,
  /html\[data-parchment-upright-code\] body \[class\*="_block_"\]/,
  'the upright rule is opt-in behind the attribute',
);
seam.setPref('codeItalic', true);
assert.equal(htmlAttributes.has(seam.UPRIGHT_CODE_ATTR), false, 'turning it back on removes the mark');

// A stored value survives a reload; a corrupt one falls back to defaults.
storage.set(seam.PREF_KEY, JSON.stringify({ homeWhale: false, openFolder: true, codeItalic: false }));
seam.loadPrefs(true);
assert.deepEqual(
  { ...seam.snapshotPrefs() },
  { homeWhale: false, openFolder: true, codeItalic: false },
  'stored preferences load',
);
storage.set(seam.PREF_KEY, 'not json');
seam.loadPrefs(true);
assert.deepEqual(
  { ...seam.snapshotPrefs() },
  { homeWhale: false, openFolder: true, codeItalic: false },
  'a corrupt value keeps the last good state',
);

// Both rows are General-section entries; the shortcut is a session utility.
assert.deepEqual(
  registrations.map((entry) => [entry.options.name, entry.options.id, entry.options.order]),
  [
    ['settings.general.item', 'parchment-home-whale', 30],
    ['settings.general.item', 'parchment-open-folder', 31],
    ['settings.general.item', 'parchment-code-italic', 12],
    ['conversation.session.header.utilities', 'parchment-open-folder', -10],
  ],
  'the three rows and the header shortcut register where expected',
);
assert.ok(
  registrations.every((entry) => typeof entry.component === 'function'),
  'every registration carries a render function',
);
// The code-italic row rides the font group's fold: hidden while it is closed,
// visible when its expander opens, and visible by default so a hash change
// cannot strand the switch.
assert.match(css, /\.dsh-parchment-codeItalic\{display:block\}/, 'the folded row defaults to visible');
assert.match(
  css,
  /body:has\(\[class\*="_7qxJPq_row"\]\) \.dsh-parchment-codeItalic\{display:none\}/,
  'the folded row hides while the font group is collapsed',
);
assert.match(
  css,
  /body:has\(\[class\*="_7qxJPq_row"\] \[class\*="_expander"\]\[aria-expanded="true"\]\) \.dsh-parchment-codeItalic\{display:block\}/,
  'the folded row appears when the font group expands',
);
assert.deepEqual(seats, [['slots', 'locale']], 'the UI seats are requested lazily, not as hard inject edges');
assert.equal(dictionaries.length, 1, 'one dictionary registration');
assert.ok(dictionaries[0].dict.zh['setting.whale.title'], 'the whale row has zh copy');
assert.ok(dictionaries[0].dict.en['setting.folder.desc'], 'the folder row has en copy');

console.log(`smoke ok: ${names.length} tokens, stylesheet ${css.length} chars`);
