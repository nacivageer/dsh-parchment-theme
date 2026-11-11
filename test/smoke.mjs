// Executes client.js for real (not just a syntax check) so a typo like a removed
// constant still referenced in the exports cannot ship silently again.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';

const here = path.dirname(fileURLToPath(import.meta.url));
const source = readFileSync(path.join(here, '..', 'client.js'), 'utf8');

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

// Dark tooltips need an edge so they do not melt into the brown panels.
assert.match(css, /body\[data-ds-dark-theme\] \[role="tooltip"\]/, 'dark tooltips get an edge');

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
