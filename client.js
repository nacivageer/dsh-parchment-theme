/**
 * dsh-parchment-theme — Client half: 「羊皮纸」/「墨夜」token layer.
 *
 * The theme is NOT a registered ThemeDefinition. Registering one cannot be
 * selected from Settings (the Appearance row is a fixed light/dark/system cube
 * set), so the plugin stacks an override layer instead:
 * `ctx.theme.overrideTokens(source, { token: { light, dark } })`. The layer
 * composes per token over whatever the user picked, so `system` still follows
 * the OS scheme — light gives 羊皮纸, dark gives 墨夜 — and disabling the plugin
 * restores the shipped palette with no residue.
 *
 * Tokens are the `--dsw-alias-*` family declared on `body` by the ui-theme
 * stylesheets plus the few literal-hex surfaces, shadows, and menu fills that
 * design-platform.css does not route through an alias. Values are deliberately
 * picked at the same alpha / luminance step as the shipped palette: the theme
 * changes hue and type, not contrast weight.
 */

window.__ModuleLoader__.load({
  id: 'dsh-parchment-theme',
  factory() {
    /** Layer identity; also what the Theme inspector shows as this layer's origin. */
    const SOURCE = 'dsh-parchment-theme';

    /** 羊皮纸 — aged paper with warm-brown ink. */
    const LIGHT = {
      /* ---- surfaces: paper, raised sheets, nested wells, sidebar ---------- */
      '--dsw-alias-bg-base': '#e9e1ce',
      '--dsw-alias-bg-layer-1': '#f1eada',
      '--dsw-alias-bg-layer-2': '#e4dbc6',
      '--dsw-alias-bg-layer-3': '#dcd2bb',
      '--dsw-alias-bg-overlay': '#e2d8c2',
      '--dsw-alias-bg-module-platform': '#ebe3d0',
      '--dsw-alias-bg-multi-select': '#ede5d3',
      '--dsw-alias-bg-document-preview': '#ddd3bd',
      '--dsw-alias-label-document-preview': '#5b4c3a',
      '--dsw-alias-bg-document-selection': '#c6a96a66',
      '--dsw-alias-bg-skeleton': '#3a2c1a0a',
      '--dsw-alias-bg-mask-drop': '#f7f1e3b3',
      '--dsw-specific-sidebar-fill': '#e2d8c1',

      /* ---- borders: same alphas as shipped, warm hue ---------------------- */
      '--dsw-alias-border-l1': '#4a3b2a0a',
      '--dsw-alias-border-l2': '#4a3b2a1a',
      '--dsw-alias-border-l3': '#4a3b2a1f',
      '--dsw-alias-border-l4': '#4a3b2a29',
      '--dsw-alias-border-l2-darkmode-thin': '#4a3b2a1a',

      /* ---- type: ink-brown ranks ------------------------------------------ */
      '--dsw-alias-label-primary': '#2a2219',
      '--dsw-alias-label-secondary': '#5b4c3a',
      '--dsw-alias-label-tertiary': '#7b6a54',
      '--dsw-alias-label-caption': '#9c8b72',
      '--dsw-alias-label-dimmed': '#cfc3ac',
      '--dsw-alias-label-primary-dimmed': '#3a2f23',
      '--dsw-alias-label-primary-bluish': '#3a2f23',
      '--dsw-alias-label-primary-foreground': '#f4edde',
      '--dsw-alias-label-primary-inverted': '#fff9ee',
      '--dsw-alias-menu-icon': '#4a3b2a',
      '--dsw-alias-label-shimmer': '#3a2c1a4d',
      '--dsw-alias-label-deep-diving': '#4a6172',
      '--dsw-alias-label-deep-diving-shimmer': '#4a617233',
      '--dsw-alias-markdown-placeholder': '#efe8d7',

      /* ---- brand and buttons: ink-brown primary, paper ghost --------------- */
      '--dsw-alias-brand-primary': '#3a2e20',
      '--dsw-alias-brand-text': '#3a2e20',
      '--dsw-alias-brand-primary-invert': '#f4edde',
      '--dsw-alias-button-primary-fill': '#3a2e20',
      '--dsw-alias-button-primary-hover': '#4e3e2a',
      '--dsw-alias-button-primary-dimmed': '#e7decb',
      '--dsw-alias-button-contrast-fill': '#4a3b2a',
      '--dsw-alias-button-elevated-fill': '#f4edde',
      '--dsw-alias-button-floating-fill': '#f4edde',
      '--dsw-alias-button-floating-hover': '#ebe3d1',
      '--dsw-alias-button-ghost-active-fill': '#e4dbc6',
      '--dsw-alias-button-ghost-active-hover': '#dcd2bb',
      '--dsw-alias-button-ghost-active-border': '#8c7a60',
      '--dsw-alias-button-info-fill': '#4a6172',
      '--dsw-alias-button-info-hover': '#5d7a8c',

      /* ---- interaction: warm hover rather than blue-grey ------------------- */
      '--dsw-alias-interactive-bg-hover': '#4a3b2a0f',
      '--dsw-alias-interactive-bg-active': '#4a3b2a1a',
      '--dsw-alias-interactive-bg-hover-solid': '#ebe3d1',
      '--dsw-alias-interactive-bg-hover-accent': '#4a61721f',
      '--dsw-alias-interactive-bg-hover-danger': '#a33c310d',

      /* ---- semantic states: muted like pigment on paper -------------------- */
      '--dsw-alias-state-business-primary': '#4a6172',
      '--dsw-alias-state-business-tertiary': '#dde3e2',
      '--dsw-alias-state-success-primary': '#4c7a5a',
      '--dsw-alias-state-success-secondary': '#6c9a78',
      '--dsw-alias-state-success-tertiary': '#e3ebdd',
      '--dsw-alias-state-error-primary': '#a33c31',
      '--dsw-alias-state-error-secondary': '#c06a5c',
      '--dsw-alias-state-warn-primary': '#a9772b',
      '--dsw-alias-state-warn-secondary': '#c39a54',
      '--dsw-alias-state-warn-tertiary': '#f0e4c9',
      '--dsw-alias-state-warn-label': '#8f6320',
      '--dsw-alias-state-idle-primary': '#c9bca2',
      '--dsw-alias-state-done-primary': '#6b5b8a',

      /* ---- markdown, code, diffs ------------------------------------------ */
      '--dsw-alias-markdown-code-block': '#ede5d2',
      '--dsw-alias-markdown-code-block-banner': '#e6dcc6',
      '--dsw-alias-markdown-inline-code': '#e2d8c1',
      '--dsw-alias-markdown-citation': '#eae2cf',
      '--dsw-alias-markdown-tag': '#e2d8c1',
      '--dsw-alias-markdown-code-segment-selected': '#f4edde',
      '--dsw-alias-markdown-code-segment-unselected': '#e9e1ce',
      '--dsw-alias-link': '#4a6172',
      '--dsw-alias-turn-trigger-bg': '#ede5d2',
      '--dsw-alias-turn-trigger-bg-hover': '#4a3b2a0f',
      '--dsw-alias-code-diff-added': '#4c7a5a14',
      '--dsw-alias-code-diff-deleted': '#a33c3114',
      '--dsw-alias-file-diff-added-bg': '#e6ede0',
      '--dsw-alias-file-diff-added-gutter': '#eef2e9',
      '--dsw-alias-file-diff-deleted-bg': '#f3e3dd',
      '--dsw-alias-file-diff-deleted-gutter': '#f7ece7',

      /* ---- composer, bubbles, menus, sidebar-nav -------------------------- */
      '--dsw-specific-bubble': '#e7dcc2',
      '--dsw-specific-bubble-highlight': '#ded1b4',
      '--dsw-specific-input-major': '#f4edde',
      '--dsw-specific-login-input': '#efe8d7',
      '--dsw-specific-menu': '#f3ecdcf0',
      '--dsw-menu-surface-fill': '#f3ecdcf0',
      '--dsw-alias-menu-group-header-fill': '#f5eee0f0',
      '--dsw-specific-sidebar-nav-item-active': '#e7ddc7',
      '--dsw-specific-sidebar-nav-item-active-accent': '#e0d3b5',
      '--dsw-specific-selector': '#ebe3d0',
      '--dsw-specific-tip': '#efe8d7',

      /* ---- tooltip, toast, switch, scrollbar ------------------------------ */
      '--dsw-alias-tooltip-bg': '#3a2f23',
      '--dsw-alias-toast-bg': '#3a2f23',
      '--dsw-alias-toast-label': '#f4edde',
      '--dsw-alias-switch-thumb': '#fff9ee',
      '--dsw-alias-scrollbar-bg-l1': '#d8cdb6',
      '--dsw-alias-scrollbar-bg-l2': '#d8cdb6',
      '--dsw-alias-scrollbar-hover-l1': '#c9bca2',
      '--dsw-alias-scrollbar-hover-l2': '#c9bca2',

      /* ---- welcome-screen illustration ------------------------------------ */
      '--dsw-alias-illustration-background': '#ede5d2',
      '--dsw-alias-illustration-surface': '#e9e1ce',
      '--dsw-alias-illustration-backing': '#d5c8ae',
      '--dsw-alias-illustration-detail': '#d5c8ae',
      '--dsw-alias-illustration-inset': '#e9e1ce',
      '--dsw-alias-illustration-shadow': '#e9e1ce',

      /* ---- elevation: warm-brown shadow instead of neutral black ---------- */
      '--dsw-shadow-lv1': '0 2px 4px 0 #3a2c1a0d',
      '--dsw-shadow-lv1-blur': '0 4px 12px 0 #3a2c1a05',
      '--dsw-shadow-lv2': '0 4px 12px 0 #3a2c1a05, 0 2px 8px 0 #3a2c1a0a',
      '--dsw-shadow-lv3': '0 0 1px 0 #3a2c1a33, 0 0 4px 0 #3a2c1a05, 0 12px 32px 0 #3a2c1a14',
    };

    /**
     * 墨夜 — the same paper at night: warm dark brown with pale ink type.
     * Lifted one step from the first pass (`#1b1611` base read as plain black)
     * and spread across 14 luminance steps, so raised surfaces separate from
     * the sheet instead of melting into it.
     */
    const DARK = {
      /* surfaces: sheet, then three visibly raised steps, then the sidebar desk */
      '--dsw-alias-bg-base': '#241d16',
      '--dsw-alias-bg-layer-1': '#2c241b',
      '--dsw-alias-bg-layer-2': '#332a1f',
      '--dsw-alias-bg-layer-3': '#3b3125',
      '--dsw-alias-bg-overlay': '#3a3025',
      '--dsw-alias-bg-module-platform': '#372d22',
      '--dsw-alias-bg-multi-select': '#332a1f',
      '--dsw-alias-bg-document-preview': '#241d16',
      '--dsw-alias-label-document-preview': '#c3b299',
      '--dsw-alias-bg-document-selection': '#c6a96a4d',
      '--dsw-alias-bg-skeleton': '#e8dcc61a',
      '--dsw-alias-bg-mask-drop': '#332a1fb3',
      '--dsw-specific-sidebar-fill': '#1e1811',

      '--dsw-alias-border-l1': '#e8dcc614',
      '--dsw-alias-border-l2': '#e8dcc626',
      '--dsw-alias-border-l3': '#e8dcc630',
      '--dsw-alias-border-l4': '#e8dcc645',
      '--dsw-alias-border-l2-darkmode-thin': '#e8dcc614',

      /* type: pale ink on the sheet */
      '--dsw-alias-label-primary': '#ece1cb',
      '--dsw-alias-label-secondary': '#c3b299',
      '--dsw-alias-label-tertiary': '#a0907a',
      '--dsw-alias-label-caption': '#877662',
      '--dsw-alias-label-dimmed': '#463a2b',
      '--dsw-alias-label-primary-dimmed': '#f4ecd9',
      '--dsw-alias-label-primary-bluish': '#f4ecd9',
      '--dsw-alias-label-primary-foreground': '#241d16',
      '--dsw-alias-label-primary-inverted': '#332a1f',
      '--dsw-alias-menu-icon': '#f4ecd9',
      '--dsw-alias-label-shimmer': '#f4edde80',
      '--dsw-alias-label-deep-diving': '#a6c0cd',
      '--dsw-alias-label-deep-diving-shimmer': '#a6c0cd59',
      '--dsw-alias-markdown-placeholder': '#372d22',

      '--dsw-alias-brand-primary': '#ece0c8',
      '--dsw-alias-brand-text': '#ece0c8',
      '--dsw-alias-brand-primary-invert': '#241d16',
      '--dsw-alias-button-primary-fill': '#ece0c8',
      '--dsw-alias-button-primary-hover': '#f6efdd',
      '--dsw-alias-button-primary-dimmed': '#463a2b',
      '--dsw-alias-button-contrast-fill': '#ece1cb',
      '--dsw-alias-button-elevated-fill': '#372d22',
      '--dsw-alias-button-floating-fill': '#332a1f',
      '--dsw-alias-button-floating-hover': '#3b3125',
      '--dsw-alias-button-ghost-active-fill': '#3b3125',
      '--dsw-alias-button-ghost-active-hover': '#45392b',
      '--dsw-alias-button-ghost-active-border': '#9c8a70',
      '--dsw-alias-button-info-fill': '#9cb6c6',
      '--dsw-alias-button-info-hover': '#b0c8d6',

      '--dsw-alias-interactive-bg-hover': '#e8dcc61a',
      '--dsw-alias-interactive-bg-active': '#e8dcc62e',
      '--dsw-alias-interactive-bg-hover-solid': '#3b3125',
      '--dsw-alias-interactive-bg-hover-accent': '#9cb6c640',
      '--dsw-alias-interactive-bg-hover-danger': '#c9715f26',

      '--dsw-alias-state-business-primary': '#9cb6c6',
      '--dsw-alias-state-business-tertiary': '#2f3a42',
      '--dsw-alias-state-success-primary': '#8ab997',
      '--dsw-alias-state-success-secondary': '#a6cbb1',
      '--dsw-alias-state-success-tertiary': '#263329',
      '--dsw-alias-state-error-primary': '#d07d6b',
      '--dsw-alias-state-error-secondary': '#e09a8b',
      '--dsw-alias-state-warn-primary': '#d3aa68',
      '--dsw-alias-state-warn-secondary': '#e0c088',
      '--dsw-alias-state-warn-tertiary': '#40331f',
      '--dsw-alias-state-warn-label': '#d3aa68',
      '--dsw-alias-state-idle-primary': '#75684f',
      '--dsw-alias-state-done-primary': '#a695c2',

      '--dsw-alias-markdown-code-block': '#2b231a',
      '--dsw-alias-markdown-code-block-banner': '#332a1f',
      '--dsw-alias-markdown-inline-code': '#2d2419',
      '--dsw-alias-markdown-citation': '#2d2419',
      '--dsw-alias-markdown-tag': '#332a1f',
      '--dsw-alias-markdown-code-segment-selected': '#372d22',
      '--dsw-alias-markdown-code-segment-unselected': '#2b231a',
      '--dsw-alias-link': '#9cb6c6',
      '--dsw-alias-turn-trigger-bg': '#332a1f',
      '--dsw-alias-turn-trigger-bg-hover': '#e8dcc62e',
      '--dsw-alias-code-diff-added': '#8ab9971f',
      '--dsw-alias-code-diff-deleted': '#d07d6b1f',
      '--dsw-alias-file-diff-added-bg': '#243028',
      '--dsw-alias-file-diff-added-gutter': '#1d2620',
      '--dsw-alias-file-diff-deleted-bg': '#3a2822',
      '--dsw-alias-file-diff-deleted-gutter': '#2c1f1a',

      '--dsw-specific-bubble': '#372d22',
      '--dsw-specific-bubble-highlight': '#41362a',
      '--dsw-specific-input-major': '#332a1f',
      '--dsw-specific-login-input': '#2c241b',
      '--dsw-specific-menu': '#352b20f0',
      '--dsw-menu-surface-fill': '#352b20f0',
      '--dsw-alias-menu-group-header-fill': '#392f24f0',
      '--dsw-specific-sidebar-nav-item-active': '#372d22',
      '--dsw-specific-sidebar-nav-item-active-accent': '#463a2b',
      '--dsw-specific-selector': '#372d22',
      '--dsw-specific-tip': '#332a1f',

      '--dsw-alias-tooltip-bg': '#392f24',
      '--dsw-alias-toast-bg': '#3d3226',
      '--dsw-alias-toast-label': '#f4edde',
      '--dsw-alias-switch-thumb': '#9c8a70',
      '--dsw-alias-scrollbar-bg-l1': '#463a2b',
      '--dsw-alias-scrollbar-bg-l2': '#463a2b',
      '--dsw-alias-scrollbar-hover-l1': '#55462f',
      '--dsw-alias-scrollbar-hover-l2': '#55462f',

      '--dsw-alias-illustration-background': '#2c241b',
      '--dsw-alias-illustration-surface': '#372d22',
      '--dsw-alias-illustration-backing': '#463a2b',
      '--dsw-alias-illustration-detail': '#55462f',
      '--dsw-alias-illustration-inset': '#332a1f',
      '--dsw-alias-illustration-shadow': '#332a1f',

      '--dsw-shadow-lv1': '0 2px 4px 0 #120c0666',
      '--dsw-shadow-lv1-blur': '0 4px 12px 0 #120c0640',
      '--dsw-shadow-lv2': '0 4px 12px 0 #120c0640, 0 2px 8px 0 #120c0666',
      '--dsw-shadow-lv3': '0 0 1px 0 #120c06aa, 0 0 4px 0 #120c0640, 0 12px 32px 0 #120c0680',
    };

    /**
     * Content text and the text font, shared by both palettes.
     *
     * The presenter writes `--dsh-content-font-size` and `--dsh-code-font-size`
     * from the Settings steppers, and gradient-shadow-text.css derives every
     * markdown step from them with `calc(var(--dsh-content-font-size, 14px) -
     * 14px)`. Writing those two here scales headings, body, tables, bubbles and
     * code as one ladder; `--dsh-terminal-font-size` does the same for the
     * sidebar terminal.
     *
     * Interface chrome is NOT handled here: the sidebar root carries a literal
     * `font-size: 14px`, so token overrides reach only the parts that happen to
     * read `--dsw-font-*`, and growing chrome that way produced mixed sizes in
     * one view. `SCALE` below zooms the whole document instead.
     *
     * The font stack is `var(--dsh-font-family-text, "Parchment Song"), …` so a
     * list chosen in Settings → General still wins; otherwise the theme supplies
     * 京華老宋体 through the `Parchment Song` @font-face, which is restricted to
     * CJK ideographs (see STYLE_CSS).
     */
    const TYPE = {
      '--dsh-content-font-size': '16px',
      '--dsh-code-font-size': '12px',
      '--dsh-terminal-font-size': '14px',
      '--dsw-font-family':
        'var(--dsh-font-family-text, "Parchment Song"), "Parchment Song", "思源宋体 CN", "Source Han Serif CN", "Noto Serif SC", "Songti SC", "SimSun", serif',
    };

    /**
     * Whole-document scale plus the two rules a token layer cannot express.
     *
     * `zoom` is the mechanism Chromium itself uses for page zoom, so layout,
     * line heights, icons and hit targets grow together and nothing can overflow
     * a row sized for the old font.
     *
     * The @font-face keeps 京華老宋体 to CJK ideographs only. The face draws its
     * full-width punctuation (「」（）) at roughly a quarter of the em box — an old
     * woodblock habit that reads as a missing glyph at UI sizes — so punctuation,
     * Latin and digits fall through to 思源宋体 CN, which draws them at normal size.
     *
     * The workspace row is the one place where the shipped hierarchy puts a group
     * label and the sessions inside it at the same 14px; one step up marks the
     * group without touching the rows underneath.
     */
    const SCALE = 1.1;
    const STYLE_CSS = `
html{zoom:${SCALE}}
@font-face{font-family:"Parchment Song";src:local("京華老宋体"),local("KingHwa_OldSong"),local("KingHwa_OldSong Regular");unicode-range:U+3400-4DBF,U+4E00-9FFF,U+F900-FAFF,U+20000-2FA1F}
[class*="_projectRow"]{font-size:16px}
[class*="_projectRow"] [class*="_title"]{letter-spacing:.02em}
[class*="K5rwea_root"]{--deliverable-fill:#f1eada;--deliverable-hover:#e4dbc6}
body[data-ds-dark-theme] [class*="K5rwea_root"]{--deliverable-fill:#2c241b;--deliverable-hover:#332a1f}
`;

    /**
     * Fold the palettes into the `{ light, dark }` pairs overrideTokens wants.
     * A name present in only one palette would go unreadable when the user flips
     * color scheme, so gaps are reported instead of silently filled.
     */
    function toPairs(light, dark) {
      const names = new Set([...Object.keys(light), ...Object.keys(dark)]);
      const pairs = {};
      const gaps = [];
      for (const name of names) {
        const l = light[name];
        const d = dark[name];
        if (l === undefined || d === undefined) {
          gaps.push(name);
          continue;
        }
        pairs[name] = { light: l, dark: d };
      }
      if (gaps.length > 0) console.warn(`[${SOURCE}] tokens missing one palette: ${gaps.join(', ')}`);
      return pairs;
    }

    const TOKENS = toPairs({ ...LIGHT, ...TYPE }, { ...DARK, ...TYPE });

    return {
      inject: ['theme'],
      apply(ctx) {
        ctx.effect(
          () => ctx.theme.overrideTokens(SOURCE, TOKENS),
          'parchment: token layer',
        );
        ctx.effect(() => {
          const style = document.createElement('style');
          style.dataset.parchmentStyle = '';
          style.textContent = STYLE_CSS;
          document.head.append(style);
          return () => style.remove();
        }, 'parchment: document style');
      },
      /** Test seam: palettes, pair builder, layer id, scale and stylesheet. */
      __parchment: { SOURCE, LIGHT, DARK, TYPE, TOKENS, SCALE, STYLE_CSS, toPairs },
    };
  },
});
