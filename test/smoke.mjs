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
globalThis.document = {
  createElement: () => ({
    dataset: {},
    textContent: '',
    remove() { this.removed = true; },
  }),
  head: { append: (node) => appended.push(node) },
};

await import('data:text/javascript;base64,' + Buffer.from(source, 'utf8').toString('base64'));

assert.equal(definition?.id, 'dsh-parchment-theme', 'module never registered itself');

const plugin = definition.factory();
assert.deepEqual(plugin.inject, ['theme'], 'the layer needs the theme service');

let layer;
const disposers = [];
plugin.apply({
  effect: (fn) => { disposers.push(fn()); },
  theme: { overrideTokens: (id, tokens) => { layer = { id, tokens }; return () => {}; } },
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
assert.deepEqual(zoomRules, [
  'body [class*="AnXs9G_panel"]',
  'body:has([class*="AnXs9G_panel"] [class*="nUhMVa_root"]) [class*="AnXs9G_panel"]',
], 'zoom stays on the settings modal, except on the plugin market page');

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
  /body:not\(\[data-ds-dark-theme\]\) \[class\*="_block_7gxqk_4"\][^{]*\{[^}]*border:1px solid #9d8f79/,
  'code blocks get a visible light frame',
);
assert.match(
  css,
  /body\[data-ds-dark-theme\] \[class\*="_block_7gxqk_4"\][^{]*\{[^}]*border:1px solid #665646/,
  'code blocks get a visible dark frame',
);
assert.match(
  css,
  /\[class\*="_infostring_7gxqk_45"\][^{]*\{[^}]*猫啃网故障宋[^}]*font-style:italic/,
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
  /\[class\*="_preview_bgejw_52"\]\{background:#d2ccc2/,
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
  /\[class\*="_block_7gxqk_4"\] :where\(pre\)\{[^}]*寒蝉活宋体_復[^}]*font-style:italic/,
  'the code block body uses 寒蝉活宋体_復 italic',
);

// Dark tooltips need an edge so they do not melt into the brown panels.
assert.match(css, /body\[data-ds-dark-theme\] \[role="tooltip"\]/, 'dark tooltips get an edge');

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
assert.match(css, /\[class\*="GRgSLq_select"\]\{font-size:15px/, 'the composer selects grow');
assert.match(css, /\[class\*="GRgSLq_accessory"\] button\{font-size:16px/, 'the hero chips grow');
assert.match(css, /--dsh-hourglass-mask:url\("data:image\/png;base64,/, 'the hourglass mask is embedded');
assert.match(
  css,
  /\[class\*="V4vHZW_older"\] button::before\{[^}]*var\(--dsh-hourglass-mask\)/,
  'load-earlier paints the hourglass before its label',
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
assert.match(
  css,
  /body:not\(\[data-ds-dark-theme\]\) \[class\*="0cITKW_text"\]\{color:#17110b\}/,
  'the light diff row ink is darker',
);
// The delivered-file card shipped a 13px title and a 10px summary.
assert.match(css, /\[class~="K5rwea_fileName"\]\{font-size:17px;line-height:24px\}/, 'the file card title grows');
assert.match(css, /\[class~="K5rwea_description"\]\{font-size:14px;line-height:20px\}/, 'the file card summary grows');
assert.equal(typeof plugin.__parchment.paintAccents, 'function', 'the accent painter is exposed for tests');

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
  /body:not\(\[data-ds-dark-theme\]\) \[class\*="_card_bgejw_9"\]:has\(\[class\*="hoverContent"\]\)\{--dsw-hovercard-bg:#8e979b/,
  'the hover card borrows the light workspace-bar surface',
);
assert.match(
  css,
  /body\[data-ds-dark-theme\] \[class\*="_card_bgejw_9"\]:has\(\[class\*="hoverContent"\]\)\{--dsw-hovercard-bg:#5b4a2a/,
  'the hover card borrows the dark workspace-bar surface',
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
assert.equal(Object.keys(seam.TYPE).length, 4);

console.log(`smoke ok: ${names.length} tokens, stylesheet ${css.length} chars`);
