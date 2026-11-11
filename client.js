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
    /* An original wax-seal backdrop for the account avatar: a scalloped crimson
       disc (84-point outline, no reference image) with a pressed inner ring and
       a single top-left gloss. The DSH user glyph stays on top in cream. */
    const WAX_SEAL_SVG = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><defs><radialGradient id='w' cx='36%' cy='28%' r='80%'><stop offset='0' stop-color='#c96a56'/><stop offset='.35' stop-color='#a63b31'/><stop offset='.72' stop-color='#82251f'/><stop offset='1' stop-color='#5f1714'/></radialGradient><radialGradient id='p' cx='42%' cy='36%' r='70%'><stop offset='0' stop-color='#a53c32'/><stop offset='.7' stop-color='#8a2a23'/><stop offset='1' stop-color='#6e1d19'/></radialGradient><filter id='s' x='-20%' y='-20%' width='140%' height='140%'><feDropShadow dx='0' dy='1.2' stdDeviation='1.1' flood-color='#3a0c0a' flood-opacity='.45'/></filter></defs><path d='M 60.22 32.00 L 60.41 34.13 L 59.48 36.14 L 57.80 37.89 L 57.11 39.75 L 55.99 41.42 L 55.02 43.08 L 56.09 45.91 L 56.25 48.54 L 54.11 49.63 L 51.51 50.10 L 49.02 50.34 L 47.77 51.77 L 47.45 54.67 L 45.98 56.21 L 44.05 57.02 L 42.34 58.34 L 40.03 58.04 L 37.71 57.01 L 35.77 57.00 L 33.93 57.77 L 32.00 60.12 L 29.78 61.56 L 27.86 59.47 L 26.22 57.34 L 24.39 56.67 L 22.58 56.00 L 20.41 56.07 L 18.15 55.99 L 16.24 55.11 L 14.13 54.40 L 13.27 52.18 L 13.75 48.94 L 12.51 47.54 L 9.86 47.09 L 7.53 46.13 L 5.88 44.58 L 6.26 42.10 L 7.04 39.70 L 6.34 37.86 L 6.38 35.86 L 6.29 33.93 L 4.30 32.00 L 3.17 29.84 L 3.80 27.75 L 5.65 25.99 L 8.33 24.70 L 8.67 22.84 L 7.26 20.09 L 7.66 17.95 L 8.84 16.21 L 10.09 14.53 L 12.30 13.72 L 14.29 12.91 L 16.07 12.03 L 17.60 10.87 L 18.02 7.78 L 19.15 5.31 L 21.76 5.92 L 24.27 6.93 L 26.35 7.24 L 28.19 6.73 L 29.97 4.91 L 32.00 4.20 L 34.07 4.33 L 36.25 3.79 L 38.12 5.20 L 39.44 7.88 L 41.16 8.67 L 43.41 8.31 L 46.11 7.56 L 48.57 7.70 L 49.24 10.38 L 49.65 12.97 L 51.17 14.21 L 52.25 15.85 L 53.65 17.24 L 55.95 18.17 L 57.59 19.68 L 58.67 21.53 L 58.15 23.93 L 56.11 26.50 L 56.65 28.28 L 59.15 29.97 Z' fill='url(#w)' filter='url(#s)'/><path d='M 60.22 32.00 L 60.41 34.13 L 59.48 36.14 L 57.80 37.89 L 57.11 39.75 L 55.99 41.42 L 55.02 43.08 L 56.09 45.91 L 56.25 48.54 L 54.11 49.63 L 51.51 50.10 L 49.02 50.34 L 47.77 51.77 L 47.45 54.67 L 45.98 56.21 L 44.05 57.02 L 42.34 58.34 L 40.03 58.04 L 37.71 57.01 L 35.77 57.00 L 33.93 57.77 L 32.00 60.12 L 29.78 61.56 L 27.86 59.47 L 26.22 57.34 L 24.39 56.67 L 22.58 56.00 L 20.41 56.07 L 18.15 55.99 L 16.24 55.11 L 14.13 54.40 L 13.27 52.18 L 13.75 48.94 L 12.51 47.54 L 9.86 47.09 L 7.53 46.13 L 5.88 44.58 L 6.26 42.10 L 7.04 39.70 L 6.34 37.86 L 6.38 35.86 L 6.29 33.93 L 4.30 32.00 L 3.17 29.84 L 3.80 27.75 L 5.65 25.99 L 8.33 24.70 L 8.67 22.84 L 7.26 20.09 L 7.66 17.95 L 8.84 16.21 L 10.09 14.53 L 12.30 13.72 L 14.29 12.91 L 16.07 12.03 L 17.60 10.87 L 18.02 7.78 L 19.15 5.31 L 21.76 5.92 L 24.27 6.93 L 26.35 7.24 L 28.19 6.73 L 29.97 4.91 L 32.00 4.20 L 34.07 4.33 L 36.25 3.79 L 38.12 5.20 L 39.44 7.88 L 41.16 8.67 L 43.41 8.31 L 46.11 7.56 L 48.57 7.70 L 49.24 10.38 L 49.65 12.97 L 51.17 14.21 L 52.25 15.85 L 53.65 17.24 L 55.95 18.17 L 57.59 19.68 L 58.67 21.53 L 58.15 23.93 L 56.11 26.50 L 56.65 28.28 L 59.15 29.97 Z' transform='translate(32 32) scale(.9) translate(-32 -32)' fill='none' stroke='#4f110f' stroke-width='1.4' opacity='.65'/><circle cx='32' cy='32' r='19.5' fill='url(#p)' stroke='#5f1512' stroke-width='1.2'/><circle cx='32' cy='32' r='16.5' fill='none' stroke='#d98b76' stroke-width='.7' opacity='.3'/><ellipse cx='24.5' cy='21' rx='9.5' ry='5.2' fill='#f0a58e' opacity='.22' transform='rotate(-28 24.5 21)'/></svg>`;
    const WAX_SEAL = `url("data:image/svg+xml,${encodeURIComponent(WAX_SEAL_SVG)}")`;
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
/* Account avatar: the wax seal is the backdrop; the DSH user glyph stays. The
   sidebar account block has its own avatar class outside the settings panel. */
body [class*="_5Qcc8a_avatar"],
body [class*="_identity"] [class*="_avatar"]{border-radius:0;color:#f7e8d2;background-color:transparent;background-image:${WAX_SEAL};background-position:center;background-size:contain;background-repeat:no-repeat}
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
