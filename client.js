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
      '--dsw-alias-bg-base': '#c0b8a9',
      '--dsw-alias-bg-layer-1': '#c8c1b4',
      '--dsw-alias-bg-layer-2': '#bbb3a1',
      '--dsw-alias-bg-layer-3': '#b4ab97',
      '--dsw-alias-bg-overlay': '#b8b09e',
      '--dsw-alias-bg-module-platform': '#c1b9a8',
      '--dsw-alias-bg-multi-select': '#c3bbaa',
      '--dsw-alias-bg-document-preview': '#b5ac98',
      '--dsw-alias-label-document-preview': '#5b4c3a',
      '--dsw-alias-bg-document-selection': '#a9905a66',
      '--dsw-alias-bg-skeleton': '#3a2c1a0a',
      '--dsw-alias-bg-mask-drop': '#ccc7b9b3',
      '--dsw-specific-sidebar-fill': '#b9b19d',

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
      '--dsw-alias-markdown-placeholder': '#c5bfb1',

      /* ---- brand and buttons: ink-brown primary, paper ghost --------------- */
      '--dsw-alias-brand-primary': '#3a2e20',
      '--dsw-alias-brand-text': '#3a2e20',
      '--dsw-alias-brand-primary-invert': '#f4edde',
      '--dsw-alias-button-primary-fill': '#3a2e20',
      '--dsw-alias-button-primary-hover': '#4e3e2a',
      '--dsw-alias-button-primary-dimmed': '#beb5a1',
      '--dsw-alias-button-contrast-fill': '#4a3b2a',
      '--dsw-alias-button-elevated-fill': '#c7c1b2',
      '--dsw-alias-button-floating-fill': '#c7c1b2',
      '--dsw-alias-button-floating-hover': '#bfb7a5',
      '--dsw-alias-button-ghost-active-fill': '#bbb2a0',
      '--dsw-alias-button-ghost-active-hover': '#b4aa96',
      '--dsw-alias-button-ghost-active-border': '#8c7a60',
      '--dsw-alias-button-info-fill': '#4a6172',
      '--dsw-alias-button-info-hover': '#5d7a8c',

      /* ---- interaction: warm hover rather than blue-grey ------------------- */
      '--dsw-alias-interactive-bg-hover': '#4a3b2a0f',
      '--dsw-alias-interactive-bg-active': '#4a3b2a1a',
      '--dsw-alias-interactive-bg-hover-solid': '#d4cbb7',
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
      '--dsw-alias-markdown-code-block': '#c3bbaa',
      '--dsw-alias-markdown-code-block-banner': '#bdb4a1',
      '--dsw-alias-markdown-inline-code': '#b9b09c',
      '--dsw-alias-markdown-citation': '#c1b8a7',
      '--dsw-alias-markdown-tag': '#b9b09c',
      '--dsw-alias-markdown-code-segment-selected': '#c7c1b2',
      '--dsw-alias-markdown-code-segment-unselected': '#c0b8a9',
      '--dsw-alias-link': '#4a6172',
      '--dsw-alias-turn-trigger-bg': '#c3bbaa',
      '--dsw-alias-turn-trigger-bg-hover': '#4a3b2a0f',
      '--dsw-alias-code-diff-added': '#4c7a5a14',
      '--dsw-alias-code-diff-deleted': '#a33c3114',
      '--dsw-alias-file-diff-added-bg': '#e6ede0',
      '--dsw-alias-file-diff-added-gutter': '#eef2e9',
      '--dsw-alias-file-diff-deleted-bg': '#f3e3dd',
      '--dsw-alias-file-diff-deleted-gutter': '#f7ece7',

      /* ---- composer, bubbles, menus, sidebar-nav -------------------------- */
      '--dsw-specific-bubble': '#b8a987',
      '--dsw-specific-bubble-highlight': '#b1a07a',
      '--dsw-specific-input-major': '#c7c1b2',
      '--dsw-specific-login-input': '#c5bfb1',
      '--dsw-specific-menu': '#c8c1b2f0',
      '--dsw-menu-surface-fill': '#c8c1b2f0',
      '--dsw-alias-menu-group-header-fill': '#d4cdbff0',
      '--dsw-specific-sidebar-nav-item-active': '#beb5a2',
      '--dsw-specific-sidebar-nav-item-active-accent': '#b8ac91',
      '--dsw-specific-selector': '#c1baab',
      '--dsw-specific-tip': '#c5bfb1',

      /* ---- tooltip, toast, switch, scrollbar ------------------------------ */
      '--dsw-alias-tooltip-bg': '#3a2f23',
      '--dsw-alias-toast-bg': '#3a2f23',
      '--dsw-alias-toast-label': '#f4edde',
      '--dsw-alias-switch-thumb': '#fff9ee',
      '--dsw-alias-scrollbar-bg-l1': '#b1a791',
      '--dsw-alias-scrollbar-bg-l2': '#b1a791',
      '--dsw-alias-scrollbar-hover-l1': '#a49982',
      '--dsw-alias-scrollbar-hover-l2': '#a49982',

      /* ---- welcome-screen illustration ------------------------------------ */
      '--dsw-alias-illustration-background': '#c3bbaa',
      '--dsw-alias-illustration-surface': '#c0b8a9',
      '--dsw-alias-illustration-backing': '#afa48e',
      '--dsw-alias-illustration-detail': '#afa48e',
      '--dsw-alias-illustration-inset': '#c0b8a9',
      '--dsw-alias-illustration-shadow': '#c0b8a9',

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
      '--dsw-alias-bg-base': '#221d18',
      '--dsw-alias-bg-layer-1': '#29241e',
      '--dsw-alias-bg-layer-2': '#302a23',
      '--dsw-alias-bg-layer-3': '#373129',
      '--dsw-alias-bg-overlay': '#363029',
      '--dsw-alias-bg-module-platform': '#332d26',
      '--dsw-alias-bg-multi-select': '#302a23',
      '--dsw-alias-bg-document-preview': '#221d18',
      '--dsw-alias-label-document-preview': '#bcb1a0',
      '--dsw-alias-bg-document-selection': '#b6a37a4d',
      '--dsw-alias-bg-skeleton': '#e2dacc1a',
      '--dsw-alias-bg-mask-drop': '#302a23b3',
      '--dsw-specific-sidebar-fill': '#1c1813',

      '--dsw-alias-border-l1': '#e2dacc14',
      '--dsw-alias-border-l2': '#e2dacc26',
      '--dsw-alias-border-l3': '#e2dacc30',
      '--dsw-alias-border-l4': '#e2dacc45',
      '--dsw-alias-border-l2-darkmode-thin': '#e2dacc14',

      /* type: pale ink on the sheet */
      '--dsw-alias-label-primary': '#e6dfd1',
      '--dsw-alias-label-secondary': '#bcb1a0',
      '--dsw-alias-label-tertiary': '#998f81',
      '--dsw-alias-label-caption': '#817568',
      '--dsw-alias-label-dimmed': '#413930',
      '--dsw-alias-label-primary-dimmed': '#efeade',
      '--dsw-alias-label-primary-bluish': '#efeade',
      '--dsw-alias-label-primary-foreground': '#221d18',
      '--dsw-alias-label-primary-inverted': '#302a23',
      '--dsw-alias-menu-icon': '#efeade',
      '--dsw-alias-label-shimmer': '#f0ece280',
      '--dsw-alias-label-deep-diving': '#adbec6',
      '--dsw-alias-label-deep-diving-shimmer': '#adbec659',
      '--dsw-alias-markdown-placeholder': '#332d26',

      '--dsw-alias-brand-primary': '#e6dece',
      '--dsw-alias-brand-text': '#e6dece',
      '--dsw-alias-brand-primary-invert': '#221d18',
      '--dsw-alias-button-primary-fill': '#e6dece',
      '--dsw-alias-button-primary-hover': '#f2ede1',
      '--dsw-alias-button-primary-dimmed': '#413930',
      '--dsw-alias-button-contrast-fill': '#e6dfd1',
      '--dsw-alias-button-elevated-fill': '#332d26',
      '--dsw-alias-button-floating-fill': '#302a23',
      '--dsw-alias-button-floating-hover': '#373129',
      '--dsw-alias-button-ghost-active-fill': '#373129',
      '--dsw-alias-button-ghost-active-hover': '#403930',
      '--dsw-alias-button-ghost-active-border': '#948978',
      '--dsw-alias-button-info-fill': '#a3b4bf',
      '--dsw-alias-button-info-hover': '#b7c6cf',

      '--dsw-alias-interactive-bg-hover': '#e2dacc1a',
      '--dsw-alias-interactive-bg-active': '#e2dacc2e',
      '--dsw-alias-interactive-bg-hover-solid': '#373129',
      '--dsw-alias-interactive-bg-hover-accent': '#a3b4bf40',
      '--dsw-alias-interactive-bg-hover-danger': '#b67d7226',

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

      '--dsw-alias-markdown-code-block': '#28231d',
      '--dsw-alias-markdown-code-block-banner': '#302a23',
      '--dsw-alias-markdown-inline-code': '#2a241d',
      '--dsw-alias-markdown-citation': '#2a241d',
      '--dsw-alias-markdown-tag': '#302a23',
      '--dsw-alias-markdown-code-segment-selected': '#332d26',
      '--dsw-alias-markdown-code-segment-unselected': '#28231d',
      '--dsw-alias-link': '#a3b4bf',
      '--dsw-alias-turn-trigger-bg': '#302a23',
      '--dsw-alias-turn-trigger-bg-hover': '#e2dacc2e',
      '--dsw-alias-code-diff-added': '#8ab9971f',
      '--dsw-alias-code-diff-deleted': '#d07d6b1f',
      '--dsw-alias-file-diff-added-bg': '#243028',
      '--dsw-alias-file-diff-added-gutter': '#1d2620',
      '--dsw-alias-file-diff-deleted-bg': '#3a2822',
      '--dsw-alias-file-diff-deleted-gutter': '#2c1f1a',

      '--dsw-specific-bubble': '#332d26',
      '--dsw-specific-bubble-highlight': '#3d362e',
      '--dsw-specific-input-major': '#302a23',
      '--dsw-specific-login-input': '#29241e',
      '--dsw-specific-menu': '#312b24f0',
      '--dsw-menu-surface-fill': '#312b24f0',
      '--dsw-alias-menu-group-header-fill': '#352f28f0',
      '--dsw-specific-sidebar-nav-item-active': '#332d26',
      '--dsw-specific-sidebar-nav-item-active-accent': '#413930',
      '--dsw-specific-selector': '#332d26',
      '--dsw-specific-tip': '#302a23',

      '--dsw-alias-tooltip-bg': '#5a4d3e',
      '--dsw-alias-toast-bg': '#39322a',
      '--dsw-alias-toast-label': '#f0ece2',
      '--dsw-alias-switch-thumb': '#948978',
      '--dsw-alias-scrollbar-bg-l1': '#413930',
      '--dsw-alias-scrollbar-bg-l2': '#413930',
      '--dsw-alias-scrollbar-hover-l1': '#4e4536',
      '--dsw-alias-scrollbar-hover-l2': '#4e4536',

      '--dsw-alias-illustration-background': '#29241e',
      '--dsw-alias-illustration-surface': '#332d26',
      '--dsw-alias-illustration-backing': '#413930',
      '--dsw-alias-illustration-detail': '#4e4536',
      '--dsw-alias-illustration-inset': '#302a23',
      '--dsw-alias-illustration-shadow': '#302a23',

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
     * one view. Chrome is therefore sized component by component, with the sidebar
 * root's literal `font-size` as the lever every label inside it inherits.
     *
     * The font stack is `var(--dsh-font-family-text, "思源宋体 CN Medium"), …` so a
     * list chosen in Settings → General still wins. The theme's body face is
     * 思源宋体 CN Medium (a real medium weight); the session title uses the
     * 寒蝉活宋体_復 Bold family in STYLE_CSS, so no synthetic bold is involved.
     */
    const TYPE = {
      '--dsh-content-font-size': '18px',
      '--dsh-code-font-size': '13px',
      '--dsh-terminal-font-size': '15px',
      '--dsw-font-family':
        'var(--dsh-font-family-text, "思源宋体 CN Medium"), "思源宋体 CN Medium", "思源宋体 CN", "Source Han Serif CN", "Noto Serif SC", "Songti SC", "SimSun", serif',
    };

    /**
     * The stylesheet carries what a token layer cannot express: chrome sized by
     * component (sidebar, workspace rows, settings panel, account popup), the
     * grain overlay, and the few private fills that do not read alias tokens.
     */
    /**
     * Global scaling was tried twice and dropped. `zoom` on `html` leaves
     * `window.innerHeight` unscaled, so a popover that decides its flip from the
     * viewport (the account menu at the bottom-left) believes there is room below
     * and drops off the window. Putting the zoom on the app frame instead left the
     * frame at 90.9% of the window instead of filling it. So chrome is sized
     * component by component, starting from the sidebar root's literal
     * `font-size`, which every label inside it inherits.
     */
    /**
     * Grain, drawn by the browser instead of shipped as an image: two SVG
     * fractal-noise tiles (fine pulp grain + slow blotches) over the whole frame.
     * `soft-light` modulates light and shade around the mid-grey, so the paper
     * keeps its measured colour instead of darkening under a multiply layer.
     */
    /* One cover-sized tile, no repeat, so no seam can exist at any window size.
       The noise is finer (0.9) than a fixed-frequency tile would be, because the
       cover fill stretches it on large displays; the component transfer pulls the
       mean below mid-grey so `overlay`/`hard-light` land slightly darker than the
       bare paper instead of neutral. */
    const GRAIN_FINE =
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2048' height='2048'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncR type='linear' slope='1' intercept='-0.07'/%3E%3CfeFuncG type='linear' slope='1' intercept='-0.07'/%3E%3CfeFuncB type='linear' slope='1' intercept='-0.07'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='2048' height='2048' filter='url(%23f)' opacity='0.85'/%3E%3C/svg%3E\")";
    const GRAIN_BLOTCH =
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2048' height='2048'%3E%3Cfilter id='b'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.0078125' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncR type='linear' slope='1' intercept='-0.04'/%3E%3CfeFuncG type='linear' slope='1' intercept='-0.04'/%3E%3CfeFuncB type='linear' slope='1' intercept='-0.04'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='2048' height='2048' filter='url(%23b)' opacity='0.45'/%3E%3C/svg%3E\")";
    /* The account avatar seal is the user's own artwork (assets/wax-seal.png),
       embedded as a PNG data URI so the bundle stays a single file. */
    const WAX_SEAL = `url("data:image/png;base64,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")`;
    const STYLE_CSS = `
body [class*="wtg9ga_root"]{font-size:17px}
body [class*="wtg9ga_panelTitle"]{font-size:18px;font-family:"寒蝉活宋体_復","寒蝉活宋体_復 Bold",serif;font-weight:500}
body [class*="wtg9ga_newSessionLabel"]{font-size:20px;line-height:1;font-family:"京華老宋体",serif;font-weight:500}
body [class*="wtg9ga_newSessionContent"]{display:flex;align-items:center;line-height:1}
[class*="wtg9ga_newSession"]:not([class*="Label"]):not([class*="Content"]):not([class*="Shortcut"]){position:relative;display:flex;min-height:46px;align-items:center;justify-content:center}
body [class*="wtg9ga_newSessionShortcut"]{position:absolute;right:12px;top:50%;transform:translateY(-50%)}
body [class*="wtg9ga_newSessionLabelMask"]{display:flex;align-items:center;justify-content:center;height:auto;flex:none}
body [class*="wtg9ga_newSessionContent"]{align-items:center;height:auto}
[class*="wtg9ga_newSession"] svg{width:20px !important;height:20px !important;position:relative;top:-1px}
body::after{content:"";position:fixed;inset:0;pointer-events:none;z-index:2147483646;background-image:${GRAIN_FINE},${GRAIN_BLOTCH};background-size:cover,cover;background-repeat:no-repeat,no-repeat;mix-blend-mode:overlay;opacity:.92}
body[data-ds-dark-theme]::after{mix-blend-mode:hard-light;opacity:.2}
[class*="_projectRow"]{height:40px;background:#b1a791;border-radius:8px}
[class*="_projectRow"]:hover{background:#aaa18a}
[class*="_projectRow"] [class*="_title"]{font-size:18px;line-height:26px;font-family:"思源宋体 CN SemiBold","思源宋体 CN Medium",serif;font-weight:600}
[class*="_sessionRow"]{height:38px}
[class*="_sessionRow"] [class*="_title"]{font-size:16px;line-height:24px}
body [class*="_sessionRow"] [class*="_time"]{font-size:13px;line-height:20px}
body[data-ds-dark-theme] [class*="_projectRow"]{background:#29231c}
body[data-ds-dark-theme] [class*="_projectRow"]:hover{background:#322b23}
body [class*="GAkraW_sectionHeader"]{background:#8e979b;border-radius:8px;color:#26333a;--dsw-alias-label-secondary:#26333a;--dsw-alias-label-tertiary:#33424a;font-weight:600;font-family:"思源宋体 CN SemiBold","Parchment Song","思源宋体 CN",serif;letter-spacing:.04em}
body[data-ds-dark-theme] [class*="GAkraW_sectionHeader"]{background:#192124;color:#a9bcc2;--dsw-alias-label-secondary:#a9bcc2;--dsw-alias-label-tertiary:#8ca0a7}
body [class*="p2k40q_hero"]{color:#a7987f}
body[data-ds-dark-theme] [class*="p2k40q_hero"]{color:#6a5b46}
body [class*="an3WzG_crumb"]{max-width:420px}
body [class*="an3WzG_crumbCurrent"]{font-size:21px;line-height:32px;font-weight:600;font-family:"寒蝉活宋体_復 Bold","寒蝉活宋体_復",serif}
body [class*="dscfja_label"]{font-size:15px;height:26px;line-height:26px;max-width:220px}
body [class*="m2hUqa_seat"]{font-size:15px}
body [class*="m2hUqa_seatLabel"]{font-size:15px}
body [class*="rQbmCW_status"]{font-size:14px}
body [class*="rezYhW_summary"]{font-size:14px;line-height:21px}
[class*="Ag-ohG_label"]{font-size:14px;line-height:21px}
[class*="Ag-ohG_count"]{font-size:14px;line-height:21px}
body .dsh-price-period{font-size:15px;height:33px;padding:0 12px}
[role="dialog"] [class*="_navTitle"],[aria-modal="true"] [class*="_navTitle"]{font-size:18px;line-height:26px}
[role="dialog"] [class*="_title"],[aria-modal="true"] [class*="_title"]{font-size:16px;line-height:22px}
[role="dialog"] [class*="_description"],[aria-modal="true"] [class*="_description"]{font-size:14px;line-height:20px}

body [class*="AnXs9G_panel"]{zoom:1.15}
/* The zoom scales fixed-position tooltips too, so the plugin market's
   hover-to-read bubble drifts away from its card. Drop the zoom on that page. */
body:has([class*="AnXs9G_panel"] [class*="nUhMVa_root"]) [class*="AnXs9G_panel"]{zoom:1}
body [class*="AnXs9G_triggerRow"]{font-size:18px}
body [class*="AnXs9G_triggerLabel"]{font-size:18px;line-height:26px}
/* The panel zoom scales layout, but components that pin their own px font do
   not grow with it. Form controls and their labels go one step up so they read
   at the sidebar's 17px instead of the shipped 13–14px chrome. */
body [class*="AnXs9G_panel"] button,
body [class*="AnXs9G_panel"] input,
body [class*="AnXs9G_panel"] select,
body [class*="AnXs9G_panel"] textarea{font-size:15px}
body [class*="AnXs9G_panel"] [class*="_field_"] [class*="_label_"]{font-size:15px}
body [class*="AnXs9G_panel"] [class*="_toggleRow"]{font-size:15px}
/* Settings cards and row rules are nearly invisible at the shipped 10–16%
   ink; raise the panel's own border ranks without touching the rest of the app. */
body [class*="AnXs9G_panel"]{--dsw-alias-border-l2:#4a3b2a33;--dsw-alias-border-l3:#4a3b2a3d;--dsw-alias-border-l4:#4a3b2a4d;--dsw-alias-settings-card-stroke:#4a3b2a59}
body[data-ds-dark-theme] [class*="AnXs9G_panel"]{--dsw-alias-border-l2:#e2dacc40;--dsw-alias-border-l3:#e2dacc4d;--dsw-alias-border-l4:#e2dacc59;--dsw-alias-settings-card-stroke:#e2dacc66}
/* Inactive controls in the settings panel and plugin market follow the
   composer input: raised-paper fill plus its soft outer elevation. Hover,
   open and disabled states keep their own treatment. */
body [class*="AnXs9G_panel"] button[aria-haspopup]:not(:disabled),
body [class*="AnXs9G_panel"] button[class*="_outline_1ulci_56"]:not(:disabled),
body [class*="AnXs9G_panel"] button[class*="themeCube"]:not([class*="selected"]):not(:disabled){box-shadow:var(--dsw-elevation-soft);--dsw-elevation-stroke-color:var(--dsw-alias-border-l2)}
body [class*="AnXs9G_panel"] button[aria-haspopup]:not(:disabled):not(:hover):not(:active):not([aria-expanded="true"]),
body [class*="AnXs9G_panel"] button[class*="_outline_1ulci_56"]:not(:disabled):not(:hover):not(:active),
body [class*="AnXs9G_panel"] button[class*="themeCube"]:not([class*="selected"]):not(:disabled):not(:hover):not(:active){background:var(--dsw-specific-input-major);border-color:transparent}
/* Custom action buttons (e.g. 编辑快捷键) and the font-size stepper do not use
   the primitives outline/haspopup classes; give them the same raised surface. */
body [class*="AnXs9G_panel"] button[class*="_button"]:not([class*="_primary_"]):not([class*="_ghost_"]):not([class*="_toolbar_"]):not([class*="_icon_"]):not([class*="_outline_"]):not([class*="navCell"]):not([class*="close"]):not(:disabled){box-shadow:var(--dsw-elevation-soft);--dsw-elevation-stroke-color:var(--dsw-alias-border-l2)}
body [class*="AnXs9G_panel"] button[class*="_button"]:not([class*="_primary_"]):not([class*="_ghost_"]):not([class*="_toolbar_"]):not([class*="_icon_"]):not([class*="_outline_"]):not([class*="navCell"]):not([class*="close"]):not(:disabled):not(:hover):not(:active):not([aria-expanded="true"]){background:var(--dsw-specific-input-major);border-color:transparent}
body [class*="AnXs9G_panel"] [class*="_stepper"]{background:var(--dsw-specific-input-major);box-shadow:var(--dsw-elevation-soft);--dsw-elevation-stroke-color:var(--dsw-alias-border-l2)}
/* The font-size control wraps stepper + unit + expander; paint the wrapper so
   the whole control reads as one input instead of only the number box. */
body [class*="AnXs9G_panel"] [class$="_control"]{background:var(--dsw-specific-input-major);box-shadow:var(--dsw-elevation-soft);--dsw-elevation-stroke-color:var(--dsw-alias-border-l2);border-radius:var(--dsw-radius-md)}
body [class*="AnXs9G_panel"] [class$="_control"] [class*="_stepper"]{background:transparent;box-shadow:none}
/* Account avatar: the user's wax-seal artwork is the whole icon; the DSH glyph
   underneath is hidden so the PNG's own cream user mark is the only mark. */
body [class*="_5Qcc8a_avatar"],
body [class*="_identity"] [class*="_avatar"]{border-radius:0;background-color:transparent;background-image:${WAX_SEAL};background-position:center;background-size:contain;background-repeat:no-repeat}
body [class*="_5Qcc8a_avatar"]{width:32px;height:32px}
body [class*="_identity"] [class*="_avatar"]{width:40px;height:40px}
body [class*="_5Qcc8a_avatar"]>*,body [class*="_identity"] [class*="_avatar"]>*{display:none}
/* The trigger clips its label with overflow:hidden; the label already ellipsizes,
   so let the avatar's soft shadow breathe past the row. */
body [class*="_5Qcc8a_trigger"]{overflow:visible}
/* drop-shadow follows the PNG's scalloped alpha, unlike a box shadow. */
body [class*="_5Qcc8a_avatar"],
body [class*="_identity"] [class*="_avatar"]{filter:drop-shadow(0 2px 4px #3a1c1847) drop-shadow(0 5px 10px #3a1c1826)}
body [class*="_identity"] [class*="_avatar"]{filter:drop-shadow(0 3px 6px #3a1c184d) drop-shadow(0 7px 16px #3a1c182b)}
body[data-ds-dark-theme] [class*="_5Qcc8a_avatar"],
body[data-ds-dark-theme] [class*="_identity"] [class*="_avatar"]{filter:drop-shadow(0 2px 4px #00000080) drop-shadow(0 6px 14px #00000059)}
/* Account labels follow the user's mockup: 寒蝉活宋体 regular with a brown-gold
   gradient overlay. Sidebar phone and the Settings account name share it. */
body [class*="_5Qcc8a_trigger"][data-signed-out="false"] [class*="_5Qcc8a_label"],
body [class*="_6qcDqa_identity"] [class*="_6qcDqa_name"]{font-family:"寒蝉活宋体_復 Bold","寒蝉活宋体_復","思源宋体 CN",serif;font-weight:400;font-style:italic;letter-spacing:.02em;background-image:linear-gradient(90deg,#7e6447 0%,#5f4223 50%,#413432 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent}
body [class*="_5Qcc8a_trigger"][data-signed-out="false"] [class*="_5Qcc8a_label"]{font-size:24px;line-height:32px}
body [class*="_6qcDqa_identity"] [class*="_6qcDqa_name"]{font-size:22px;line-height:28px}
/* The active appearance cube needs to read as chosen, not disabled: use the
   user-bubble fill and a warm ink edge instead of the pale module surface. */
body [class*="AnXs9G_panel"] button[class*="themeCube"][class*="selected"]{background:var(--dsw-specific-bubble);border-color:var(--dsw-alias-button-ghost-active-border)}
/* Menus opened from Settings are portaled to body, so the panel zoom never
   reaches them. Match the panel's effective 17px instead of the shipped 13px. */
body:has([class*="AnXs9G_panel"]) [role="menuitem"]{font-size:17px;line-height:25px;min-height:40px}
body:has([class*="AnXs9G_panel"]) [role="menuitem"] svg{width:16px;height:16px}

/* Account popup. Its list is the shared primitives Menu (13px) and carries no
   account-specific class, so key it off the trigger's expanded state: only the
   open account menu grows, not every menu in the app. */
body [class*="_5Qcc8a_trigger"]{font-size:18px}
body:has([class*="_5Qcc8a_trigger"][aria-expanded="true"]) [role="menuitem"]{font-size:16px;line-height:24px;min-height:40px}
body:has([class*="_5Qcc8a_trigger"][aria-expanded="true"]) [role="menuitem"]>span[aria-hidden="true"]:first-child{width:16px;height:16px}
body:has([class*="_5Qcc8a_trigger"][aria-expanded="true"]) [role="menuitem"]>span[aria-hidden="true"]:first-child svg{width:16px;height:16px}
/* Dark tooltips float over brown panels; a hairline edge and a deeper shadow
   keep the bubble from melting into the card behind it. */
body[data-ds-dark-theme] [role="tooltip"]{border:1px solid #e2dacc40;box-shadow:0 8px 24px #00000066}
[class*="V4vHZW_toBottom"]:not([class*="Slot"]){width:42px;height:42px;background:#8d5f5b;color:#fff}
[class*="V4vHZW_toBottom"]:not([class*="Slot"]):hover{background:#7d514d}
[class*="V4vHZW_toBottom"]:not([class*="Slot"]) svg{width:20px !important;height:20px !important;color:#fff}
[class*="_projectRow"] [class*="_title"]{letter-spacing:.02em}
body [class*="K5rwea_root"]{--deliverable-fill:#c8c1b4;--deliverable-hover:#bbb3a1}
body[data-ds-dark-theme] [class*="K5rwea_root"]{--deliverable-fill:#2c241b;--deliverable-hover:#332a1f}
body [class*="HOHHba_card"]{--changes-fill:#c8c1b4;--changes-hover:#bbb3a1}
body[data-ds-dark-theme] [class*="HOHHba_card"]{--changes-fill:#2c241b;--changes-hover:#332a1f}
/* Changed-files card: the shipped 10–13px ranks read as fine print next to the
   18px content, so every rank inside the card goes up one step. */
body [class*="HOHHba_card"] [class*="HOHHba_title"]{font-size:15px;line-height:22px}
body [class*="HOHHba_card"] [class*="HOHHba_stat"]{font-size:12px;line-height:18px}
body [class*="HOHHba_card"] [class*="HOHHba_row"]{font-size:13px;line-height:20px}
body [class*="HOHHba_card"] [class*="HOHHba_path"]{font-size:14px}
body [class*="HOHHba_card"] [class*="HOHHba_toggle"]{font-size:13px;line-height:20px}
body [class*="HOHHba_card"] [class*="HOHHba_previewPath"]{font-size:14px;line-height:20px}
body [class*="lLdGaq_card"]{--plan-card-fill:#c8c1b4;--plan-card-hover:#bbb3a1}
body[data-ds-dark-theme] [class*="lLdGaq_card"]{--plan-card-fill:#2c241b;--plan-card-hover:#332a1f}
body [class*="oT5lKa_card"]{--card-fill:#c8c1b4;--card-hover:#bbb3a1}
body[data-ds-dark-theme] [class*="oT5lKa_card"]{--card-fill:#2c241b;--card-hover:#332a1f}
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
      /** Test seam: palettes, pair builder, layer id and stylesheet. */
      __parchment: { SOURCE, LIGHT, DARK, TYPE, TOKENS, STYLE_CSS, toPairs },
    };
  },
});
