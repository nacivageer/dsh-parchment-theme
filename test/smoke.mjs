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

// The two regressions this theme already paid for.
assert.ok(!/zoom\s*:/.test(css), 'no zoom rules: they misplace viewport-flipped popovers');

const family = layer.tokens['--dsw-font-family'];
assert.ok(family, 'the font stack must be part of the layer');
assert.match(family.light, /思源宋体 CN/, 'body text uses 思源宋体 CN');
assert.match(family.light, /^var\(--dsh-font-family-text/, 'a font chosen in Settings still wins');
assert.match(css, /寒蝉活宋体_復 Bold/, 'the session title uses the real Bold family, not synthesis');

const seam = plugin.__parchment;
assert.ok(seam && seam.LIGHT && seam.DARK && seam.TOKENS);
assert.equal(Object.keys(seam.TYPE).length, 4);

console.log(`smoke ok: ${names.length} tokens, stylesheet ${css.length} chars`);
