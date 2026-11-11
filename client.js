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
      '--dsw-alias-markdown-code-block': '#d2ccc2',
      '--dsw-alias-markdown-code-block-banner': '#c8c1b5',
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
      /* Diff fills were matched to the mockup at #babda4 / #c1c3ae, but at body
         size the tint blended with the serif strokes into one coloured block;
         both rows now sit a step lighter than the mockup so the dark ink stays
         separable. The markers keep their hue but go darker to stay legible on
         the lighter fill. */
      '--dsw-alias-file-diff-added-bg': '#c2c6b1',
      '--dsw-alias-file-diff-added-gutter': '#cacdbb',
      '--dsw-alias-file-diff-deleted-bg': '#d9b9af',
      '--dsw-alias-file-diff-deleted-gutter': '#e0c7bc',

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

      '--dsw-alias-markdown-code-block': '#332c24',
      '--dsw-alias-markdown-code-block-banner': '#3a322a',
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
    /* New-session glyph artwork (assets/quill-icon.png), embedded as a PNG data
       URI and painted through a CSS mask so it takes the button's own ink colour
       in either palette. */
    const QUILL = `url("data:image/png;base64,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")`;

    /* 加载更早 glyph (assets/hourglass-icon.png): same mask trick as the quill, so
       the hourglass takes the button's ink colour in either palette. */
    const HOURGLASS = `url("data:image/png;base64,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")`;

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
/* The shipped 新会话 glyph is a ⊕ icon in three places (sidebar button, wide
   sidebar, workspace row). Swap it for the user's quill drawing: hide the svg and
   paint the parent with the PNG as a mask, so the shape takes currentColor and
   stays dark ink on paper / pale ink at night. The mask value lives in a custom
   property so the data URI is carried once instead of four times. */
body{--dsh-quill-mask:${QUILL};--dsh-hourglass-mask:${HOURGLASS}}
body [class*="wtg9ga_newSessionContent"]>svg{display:none}
body [class*="wtg9ga_newSessionContent"]::before{content:"";display:block;flex:none;width:15px;height:22px;background-color:currentColor;-webkit-mask:var(--dsh-quill-mask) center/contain no-repeat;mask:var(--dsh-quill-mask) center/contain no-repeat}
body [class*="_projectRow"] [class*="_rowActions"] button:not([data-context-menu-trigger]) svg{display:none}
body [class*="_projectRow"] [class*="_rowActions"] button:not([data-context-menu-trigger])::before{content:"";display:inline-block;vertical-align:middle;width:13px;height:19px;background-color:currentColor;-webkit-mask:var(--dsh-quill-mask) center/contain no-repeat;mask:var(--dsh-quill-mask) center/contain no-repeat}
body::after{content:"";position:fixed;inset:0;pointer-events:none;z-index:2147483646;background-image:${GRAIN_FINE},${GRAIN_BLOTCH};background-size:cover,cover;background-repeat:no-repeat,no-repeat;mix-blend-mode:overlay;opacity:.92}
body[data-ds-dark-theme]::after{mix-blend-mode:hard-light;opacity:.2}
/* Diff rows in 羊皮纸: at body size the vivid marker (#01a241) plus thin serif
   strokes on the olive fill read as a green wash. Deepen both the marker and
   the row ink so the +/numbers stay green but legible; 墨夜 is unchanged. */
body:not([data-ds-dark-theme]){--dsw-alias-file-diff-added-marker:#2f6b3a;--dsw-alias-file-diff-deleted-marker:#8e2420}
body:not([data-ds-dark-theme]) [class*="0cITKW_text"]{color:#17110b}
/* Code fences: the shipped fill sat almost on the paper; use the raised card
   surface and a visible 1px frame in both palettes. */
body:not([data-ds-dark-theme]) [class*="_block_7gxqk_4"],
body:not([data-ds-dark-theme]) [class*="_card_1mqf1_1"],
body:not([data-ds-dark-theme]) [class*="_block_15hvo_1"],
body:not([data-ds-dark-theme]) [class*="_block_74wpx_1"]{border:1px solid #9d8f79;box-sizing:border-box}
body[data-ds-dark-theme] [class*="_block_7gxqk_4"],
body[data-ds-dark-theme] [class*="_card_1mqf1_1"],
body[data-ds-dark-theme] [class*="_block_15hvo_1"],
body[data-ds-dark-theme] [class*="_block_74wpx_1"]{border:1px solid #665646;box-sizing:border-box}
/* Code fences use the user's serif pairing: 猫啃网故障宋 for the banner,
   寒蝉活宋体_復 for the body. Sizes are picked for the DSH scale (not PS pt). */
body [class*="_block_7gxqk_4"] [data-code-block-banner],
body [class*="_block_7gxqk_4"] [class*="_infostring_7gxqk_45"],
body [class*="_block_7gxqk_4"] [class*="_language_1mqf1_30"],
body [class*="_block_7gxqk_4"] [class*="_title_1mqf1_36"]{font-family:"猫啃网故障宋","MaokenGlitchSerif","Maoken Glitch Serif","寒蝉活宋体_復",serif;font-size:20px;line-height:28px;font-weight:400;font-style:italic;letter-spacing:.02em}
body [class*="_block_7gxqk_4"] :where(pre){font-family:"寒蝉活宋体_復","思源宋体 CN",serif;font-size:16px;line-height:1.8;font-style:italic}
body [class*="_block_7gxqk_4"] :where(pre) code{font:inherit}
[class*="_projectRow"]{height:40px;background:#b1a791;border-radius:8px}
[class*="_projectRow"]:hover{background:#aaa18a}
[class*="_projectRow"] [class*="_title"]{font-size:18px;line-height:26px;font-family:"思源宋体 CN SemiBold","思源宋体 CN Medium",serif;font-weight:600}
[class*="_sessionRow"]{height:38px}
[class*="_sessionRow"] [class*="_title"]{font-size:16px;line-height:24px}
body [class*="_sessionRow"] [class*="_time"]{font-size:13px;line-height:20px}
body[data-ds-dark-theme] [class*="_projectRow"]{background:#29231c}
body[data-ds-dark-theme] [class*="_projectRow"]:hover{background:#322b23}
body [class*="GAkraW_sectionHeader"]{background:#8e979b;border-radius:8px;color:#26333a;--dsw-alias-label-secondary:#26333a;--dsw-alias-label-tertiary:#33424a;font-weight:600;font-family:"思源宋体 CN SemiBold","Parchment Song","思源宋体 CN",serif;letter-spacing:.04em}
body[data-ds-dark-theme] [class*="GAkraW_sectionHeader"]{background:#5b4a2a;color:#e7c17b;--dsw-alias-label-primary:#e7c17b;--dsw-alias-label-secondary:#e7c17b;--dsw-alias-label-tertiary:#e7c17b;--dsw-alias-menu-icon:#e7c17b}
body [class*="p2k40q_hero"]{color:#a7987f}
body[data-ds-dark-theme] [class*="p2k40q_hero"]{color:#6a5b46}
body [class*="an3WzG_crumb"]{max-width:420px}
body [class*="an3WzG_crumbCurrent"]{font-size:21px;line-height:32px;font-weight:600;font-family:"寒蝉活宋体_復 Bold","寒蝉活宋体_復",serif}
body [class*="dscfja_label"]{font-size:15px;height:26px;line-height:26px;max-width:220px}
body [class*="m2hUqa_seat"]{font-size:15px}
body [class*="m2hUqa_seatLabel"]{font-size:15px}
/* Two semantic accents, per the reference images: only the creator preset name
   (chip, menu row, session-header label) and only the full-access permission
   carry a colour of their own; every other label keeps the theme ink, and the
   chevrons stay neutral. CSS cannot match text, so the Client half marks the
   matching elements with data-dsh-accent (see paintAccents below). */
body{--dsh-creator-ink:#386b9a;--dsh-full-access-ink:#a85418}
body[data-ds-dark-theme]{--dsh-creator-ink:#e7c15c;--dsh-full-access-ink:#df8f3f}
body [data-dsh-accent="creator"] [class*="m2hUqa_seatIcon"],
body [data-dsh-accent="creator"] [class*="m2hUqa_seatLabel"],
body [class*="m2hUqa_itemName"][data-dsh-accent="creator"],
body [class*="dscfja_label"][data-dsh-accent="creator"]{color:var(--dsh-creator-ink)}
body [class*="dscfja_label"][data-dsh-accent="creator"] [class*="dscfja_icon"]{opacity:1}
body [class*="_86kJGG_trigger"][data-dsh-accent="full-access"]{color:var(--dsh-full-access-ink)}
body [role="menuitem"][data-dsh-accent="full-access"] [class*="_itemIcon"],
body [role="menuitem"][data-dsh-accent="full-access"] [class*="_itemLabel"],
body [role="menuitem"][data-dsh-accent="full-access"] [class*="_check"]{color:var(--dsh-full-access-ink)}
body [role="menuitem"][data-dsh-accent="creator"] [class*="_check"]{color:var(--dsh-creator-ink)}
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
/* Dark Settings follow the user's fig3: lighter warm control surfaces, no glow. */
body[data-ds-dark-theme] [class*="AnXs9G_panel"]{--dsw-specific-input-major:#554c44}
body[data-ds-dark-theme] [class*="AnXs9G_panel"] button[aria-haspopup]:not(:disabled),
body[data-ds-dark-theme] [class*="AnXs9G_panel"] button[class*="_outline_1ulci_56"]:not(:disabled),
body[data-ds-dark-theme] [class*="AnXs9G_panel"] button[class*="themeCube"]:not([class*="selected"]):not(:disabled),
body[data-ds-dark-theme] [class*="AnXs9G_panel"] button[class*="_button"]:not([class*="_primary_"]):not([class*="_ghost_"]):not([class*="_toolbar_"]):not([class*="_icon_"]):not([class*="_outline_"]):not([class*="navCell"]):not([class*="close"]):not(:disabled),
body[data-ds-dark-theme] [class*="AnXs9G_panel"] [class*="_stepper"],
body[data-ds-dark-theme] [class*="AnXs9G_panel"] [class$="_control"],
body[data-ds-dark-theme] [class*="AnXs9G_panel"] [class~="Wsg8iW_card"]:not([class~="Wsg8iW_cardActive"]):not([class~="Wsg8iW_cardBroken"]),
body[data-ds-dark-theme] [class*="AnXs9G_panel"] [class~="Wsg8iW_creatorButton"]{box-shadow:none;border-color:#6a5f54}
body[data-ds-dark-theme] [class*="AnXs9G_panel"] button[class*="themeCube"][class*="selected"],
body[data-ds-dark-theme] [class*="AnXs9G_panel"] [class~="Wsg8iW_card"][class~="Wsg8iW_cardActive"]{background:#72664f;border-color:#8a7a5a;box-shadow:none}
/* Plugin inventory cards use the same control surface as the buttons, except
   the disabled card (its state tag is the only tone=neutral tag in the grid). */
body [class*="AnXs9G_panel"] [class~="qgYWUG_card"]:not(:has([data-tone="neutral"])){background:var(--dsw-specific-input-major)}
body[data-ds-dark-theme] [class*="AnXs9G_panel"] [class~="qgYWUG_card"]:not(:has([data-tone="neutral"])){background:#302a23}
body[data-ds-dark-theme] [class*="AnXs9G_panel"] [class~="qgYWUG_card"]:has([data-tone="neutral"]){background:var(--dsw-alias-bg-layer-1)}
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
body[data-ds-dark-theme] [class*="_5Qcc8a_trigger"][data-signed-out="false"] [class*="_5Qcc8a_label"],
body[data-ds-dark-theme] [class*="_6qcDqa_identity"] [class*="_6qcDqa_name"]{background-image:linear-gradient(90deg,#b78472 0%,#af804a 50%,#bb956c 90%,#bb956c 100%)}
body [class*="_5Qcc8a_trigger"][data-signed-out="false"] [class*="_5Qcc8a_label"]{font-size:24px;line-height:32px}
body [class*="_6qcDqa_identity"] [class*="_6qcDqa_name"]{font-size:22px;line-height:28px}
/* The active appearance cube needs to read as chosen, not disabled: use the
   user-bubble fill and a warm ink edge instead of the pale module surface. */
body [class*="AnXs9G_panel"] button[class*="themeCube"][class*="selected"]{background:var(--dsw-specific-bubble);border-color:var(--dsw-alias-button-ghost-active-border)}
/* Agent preset cards + the custom-preset button mirror the Appearance cubes:
   unselected = raised input surface, selected = bubble fill + warm edge. */
body [class*="AnXs9G_panel"] [class~="Wsg8iW_card"]:not([class~="Wsg8iW_cardActive"]):not([class~="Wsg8iW_cardBroken"]):not(:hover){background:var(--dsw-specific-input-major);border-color:transparent}
body [class*="AnXs9G_panel"] [class~="Wsg8iW_card"]:not([class~="Wsg8iW_cardActive"]):not([class~="Wsg8iW_cardBroken"]){box-shadow:var(--dsw-elevation-soft);--dsw-elevation-stroke-color:var(--dsw-alias-border-l2)}
body [class*="AnXs9G_panel"] [class~="Wsg8iW_card"][class~="Wsg8iW_cardActive"]{background:var(--dsw-specific-bubble);border-color:var(--dsw-alias-button-ghost-active-border);box-shadow:none}
/* The active preset card is the lightest surface in the grid (#72664f), where the
   shipped ink ranks fall to 2.7:1 (description) and 1.8:1 (id / footer). Lift the
   card's own ranks one step so they clear 4.5:1 on that fill; the other cards
   keep their shipped ink, which sits fine on #2a231c. */
body[data-ds-dark-theme] [class*="AnXs9G_panel"] [class~="Wsg8iW_card"][class~="Wsg8iW_cardActive"] [class~="Wsg8iW_cardName"]{color:#f8f4ea}
body[data-ds-dark-theme] [class*="AnXs9G_panel"] [class~="Wsg8iW_card"][class~="Wsg8iW_cardActive"] [class~="Wsg8iW_cardDesc"]{color:#f4efe4}
body[data-ds-dark-theme] [class*="AnXs9G_panel"] [class~="Wsg8iW_card"][class~="Wsg8iW_cardActive"] [class~="Wsg8iW_cardId"]{color:#ded4c1}
body[data-ds-dark-theme] [class*="AnXs9G_panel"] [class~="Wsg8iW_card"][class~="Wsg8iW_cardActive"] [class~="Wsg8iW_helpButton"],
body[data-ds-dark-theme] [class*="AnXs9G_panel"] [class~="Wsg8iW_card"][class~="Wsg8iW_cardActive"] [class~="Wsg8iW_iconButton"]{color:#eee6d7}
body [class*="AnXs9G_panel"] [class~="Wsg8iW_creatorButton"]:not(:disabled){box-shadow:var(--dsw-elevation-soft);--dsw-elevation-stroke-color:var(--dsw-alias-border-l2);border:.5px solid transparent;border-radius:var(--dsw-radius-xl)}
body [class*="AnXs9G_panel"] [class~="Wsg8iW_creatorButton"]:not(:disabled):not(:hover){background:var(--dsw-specific-input-major)}
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
/* Sidebar row menus (workspace ⋯, session ⋯) are the shared primitives list the
   account popup uses, but ship at 13px — fine print on a 17px sidebar. Size
   them only while the row's own trigger is open, so menus elsewhere keep the
   shipped scale; data-row-key is a business attribute, not a build hash. */
body:has([data-row-key] button[aria-haspopup="menu"][aria-expanded="true"]) [role="menuitem"]{font-size:16px;line-height:24px;min-height:40px}
body:has([data-row-key] button[aria-haspopup="menu"][aria-expanded="true"]) [role="menuitem"] [class*="_itemIcon"]{width:16px;height:16px}
body:has([data-row-key] button[aria-haspopup="menu"][aria-expanded="true"]) [role="menuitem"] [class*="_itemIcon"] svg{width:16px;height:16px}
/* The sidebar path/creation hover card is a HoverCard whose surface and ink are
   hardcoded neutral dark (#2C2C2E on #fff), so light mode showed the same dark
   bubble as dark mode. It borrows the 工作区 section bar's palette instead of a
   warm tint: a beige card collided with the idle-status dot and read as noise
   next to the paper. Light = grey-blue bar with navy ink, dark = brown bar with
   gold ink. */
body:not([data-ds-dark-theme]) [class*="_card_bgejw_9"]:has([class*="hoverContent"]){--dsw-hovercard-bg:#8e979b;border:1px solid #77848a}
body:not([data-ds-dark-theme]) [class*="hoverContent"] [class*="hoverTitle"]{color:#26333a}
body:not([data-ds-dark-theme]) [class*="hoverContent"] [class*="hoverPath"],
body:not([data-ds-dark-theme]) [class*="hoverContent"] [class*="hoverTime"],
body:not([data-ds-dark-theme]) [class*="hoverContent"] [class*="hoverStatus"]{color:#2f3d45}
body[data-ds-dark-theme] [class*="_card_bgejw_9"]:has([class*="hoverContent"]){--dsw-hovercard-bg:#5b4a2a;border:1px solid #6d5834}
body[data-ds-dark-theme] [class*="hoverContent"] [class*="hoverTitle"]{color:#e7c17b}
body[data-ds-dark-theme] [class*="hoverContent"] [class*="hoverPath"],
body[data-ds-dark-theme] [class*="hoverContent"] [class*="hoverTime"],
body[data-ds-dark-theme] [class*="hoverContent"] [class*="hoverStatus"]{color:#d3ad6b}
/* Composer chrome ships at 12-13px beside 18px content; lift the tool row, the
   hero chips and the + command palette one step so they read with the input. */
body [class*="GRgSLq_add"]{width:32px;height:32px}
body [class*="GRgSLq_add"] svg{width:18px;height:18px}
body [class*="GRgSLq_select"]{font-size:15px;line-height:22px;height:32px;padding-right:24px;background-size:14px 14px;background-position:right 6px center}
body [class*="GRgSLq_primary"]{width:38px;height:38px}
body [class*="GRgSLq_primary"] svg{width:20px;height:20px}
body [class*="GRgSLq_accessory"] button{font-size:16px;min-height:32px}
body [class*="GRgSLq_accessory"] button svg{width:18px;height:18px}
body [class*="j99sVW_row"]{font-size:15px;gap:8px;padding:7px 9px}
body [class*="j99sVW_badge"]{font-size:10px;line-height:12px}
body [class*="j99sVW_detail"]{font-size:13px}
body [class*="j99sVW_status"],body [class*="j99sVW_search"]{font-size:14px}
body:has([class*="GRgSLq_add"][aria-expanded="true"]) [role="menuitem"]{font-size:15px;line-height:22px;min-height:36px}
body:has([class*="GRgSLq_add"][aria-expanded="true"]) [role="menuitem"] [class*="_itemIcon"]{width:18px;height:18px}
[class*="V4vHZW_toBottom"]:not([class*="Slot"]){width:42px;height:42px;background:#8d5f5b;color:#fff}
[class*="V4vHZW_toBottom"]:not([class*="Slot"]):hover{background:#7d514d}
[class*="V4vHZW_toBottom"]:not([class*="Slot"]) svg{width:20px !important;height:20px !important;color:#fff}
/* 加载更早 ships as a bare <button> with no class of its own, so it renders as a
   UA control (13px, browser button face). Give it the sidebar 新会话 button's
   shape and type scale: 46px tall, 20px 京華老宋体 on the raised button fill. */
body [class*="V4vHZW_older"] button{display:inline-flex;align-items:center;justify-content:center;gap:10px;height:46px;min-height:46px;padding:0 24px;font-size:20px;line-height:26px;font-family:"京華老宋体",serif;font-weight:500;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-button-elevated-fill);border:.5px solid var(--dsw-alias-border-l3);border-radius:var(--dsw-radius-md);cursor:pointer}
body [class*="V4vHZW_older"] button::before{content:"";display:inline-block;flex:none;width:16px;height:24px;background-color:currentColor;-webkit-mask:var(--dsh-hourglass-mask) center/contain no-repeat;mask:var(--dsh-hourglass-mask) center/contain no-repeat}
body [class*="V4vHZW_older"] button:hover{background:var(--dsw-alias-button-floating-hover)}
body [class*="V4vHZW_older"] button:disabled{opacity:.6;cursor:default}
[class*="_projectRow"] [class*="_title"]{letter-spacing:.02em}
body [class*="K5rwea_root"]{--deliverable-fill:#c8c1b4;--deliverable-hover:#bbb3a1}
body[data-ds-dark-theme] [class*="K5rwea_root"]{--deliverable-fill:#2c241b;--deliverable-hover:#332a1f}
/* The delivered-file card ships 13px title + 10px summary; the summary was
   unreadable next to the 18px transcript. One step up, card grows to fit. */
body [class~="K5rwea_file"]{height:auto;min-height:66px;padding:10px 12px}
body [class~="K5rwea_fileName"]{font-size:17px;line-height:24px}
body [class~="K5rwea_description"]{font-size:14px;line-height:20px}
body [class*="HOHHba_card"]{--changes-fill:#d2ccc2;--changes-hover:#c8c1b4;background:#d2ccc2;border-color:#a89a84}
body[data-ds-dark-theme] [class*="HOHHba_card"]{--changes-fill:#332c24;--changes-hover:#3a322a;background:#332c24;border-color:#5f5142}
body [class*="HOHHba_preview"],
body [class*="_0cITKW_root"]{background:#d2ccc2}
body[data-ds-dark-theme] [class*="HOHHba_preview"],
body[data-ds-dark-theme] [class*="_0cITKW_root"]{background:#332c24}
/* The expanded diff is a HoverCard preview, not the card itself: its own
   _preview_bgejw_52 surface used bg-layer-1 and stayed grey in light mode.
   The preview content does not always carry [data-changed-files], so style
   the preview surface directly instead of gating on the card attribute. */
body [class*="_preview_bgejw_52"]{background:#d2ccc2}
body[data-ds-dark-theme] [class*="_preview_bgejw_52"]{background:#332c24}
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

    /** The labels that carry an accent ink, in the app's zh and en copy. */
    const squash = (value) => value.replace(/\s+/g, '');
    const CREATOR_LABELS = new Set(['创造模式', 'Creator mode'].map(squash));
    const FULL_ACCESS_LABELS = new Set(['完全权限', 'Full access'].map(squash));
    const ACCENT_ATTR = 'data-dsh-accent';
    /** Classes worth rescanning for; a mutation elsewhere never schedules a pass. */
    const ACCENT_SCOPE = '[class*="m2hUqa_"], [class*="dscfja_"], [class*="_86kJGG_trigger"]';

    /**
     * Mark the elements whose *text* is one of the accent labels. The document
     * stylesheet then colours them, so the rule stays independent of build
     * hashes for the value it paints.
     */
    function paintAccents(root) {
      const mark = (element, matches, value) => {
        if (matches) element.setAttribute(ACCENT_ATTR, value);
        else element.removeAttribute(ACCENT_ATTR);
      };
      const text = (element) => squash(element.textContent);
      for (const seat of root.querySelectorAll('[class*="m2hUqa_seat"]')) {
        if (seat.tagName !== 'BUTTON') continue;
        const label = seat.querySelector('[class*="m2hUqa_seatLabel"]');
        mark(seat, label !== null && CREATOR_LABELS.has(text(label)), 'creator');
      }
      for (const name of root.querySelectorAll('[class*="m2hUqa_itemName"]')) {
        mark(name, CREATOR_LABELS.has(text(name)), 'creator');
      }
      for (const label of root.querySelectorAll('[class*="dscfja_label"]')) {
        mark(label, CREATOR_LABELS.has(text(label)), 'creator');
      }
      for (const trigger of root.querySelectorAll('button[class*="_86kJGG_trigger"]')) {
        const label = trigger.querySelector('[class*="_86kJGG_triggerLabel"]');
        mark(trigger, label !== null && FULL_ACCESS_LABELS.has(text(label)), 'full-access');
      }
      // The permission menu repeats the same names as plain primitives items.
      // Tagging the row itself lets its check mark follow the same ink.
      for (const item of root.querySelectorAll('[role="menuitem"]')) {
        const name = item.querySelector('[class*="m2hUqa_itemName"]');
        const label = item.querySelector('[class*="_itemLabel"]');
        if (name !== null && CREATOR_LABELS.has(text(name))) {
          mark(item, true, 'creator');
        } else {
          mark(item, label !== null && FULL_ACCESS_LABELS.has(text(label)), 'full-access');
        }
      }
    }

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
        // CSS cannot match text, so the accent labels are tagged in the DOM and
        // repainted as the chip, the preset menu and the session header change.
        ctx.effect(() => {
          if (typeof MutationObserver === 'undefined' || document.body === null) return;
          paintAccents(document);
          let queued = false;
          const schedule = () => {
            if (queued) return;
            queued = true;
            const run = () => {
              queued = false;
              paintAccents(document);
            };
            if (typeof requestAnimationFrame === 'function') requestAnimationFrame(run);
            else setTimeout(run, 50);
          };
          const relevantClass = (element) => /(?:m2hUqa_|dscfja_|_86kJGG_trigger)/.test(
            element.getAttribute('class') ?? '',
          );
          const relevant = (node) => {
            const element = node !== null && node.nodeType === 3 ? node.parentElement : node;
            if (element === null || element === undefined || element.nodeType !== 1) return false;
            if (relevantClass(element)) return true;
            return element.querySelector?.(ACCENT_SCOPE) != null;
          };
          const observer = new MutationObserver((records) => {
            for (const record of records) {
              if (record.type === 'characterData' ? relevant(record.target) : (
                relevant(record.target) || [...record.addedNodes].some(relevant)
              )) {
                schedule();
                return;
              }
            }
          });
          observer.observe(document.body, { childList: true, subtree: true, characterData: true });
          return () => observer.disconnect();
        }, 'parchment: accent marks');
      },
      /** Test seam: palettes, pair builder, layer id, stylesheet and the accent painter. */
      __parchment: { SOURCE, LIGHT, DARK, TYPE, TOKENS, STYLE_CSS, toPairs, paintAccents },
    };
  },
});
