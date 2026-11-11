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
      '--dsw-alias-bg-base': '#e0d8c6',
      '--dsw-alias-bg-layer-1': '#eae2d2',
      '--dsw-alias-bg-layer-2': '#dbd1bc',
      '--dsw-alias-bg-layer-3': '#d2c8b1',
      '--dsw-alias-bg-overlay': '#d8ceb8',
      '--dsw-alias-bg-module-platform': '#e2d9c5',
      '--dsw-alias-bg-multi-select': '#e4dbc7',
      '--dsw-alias-bg-document-preview': '#d4c9b2',
      '--dsw-alias-label-document-preview': '#5b4c3a',
      '--dsw-alias-bg-document-selection': '#c6a96a66',
      '--dsw-alias-bg-skeleton': '#3a2c1a0a',
      '--dsw-alias-bg-mask-drop': '#efe8d9b3',
      '--dsw-specific-sidebar-fill': '#d9cfb7',

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
      '--dsw-alias-markdown-placeholder': '#e6dfcf',

      /* ---- brand and buttons: ink-brown primary, paper ghost --------------- */
      '--dsw-alias-brand-primary': '#3a2e20',
      '--dsw-alias-brand-text': '#3a2e20',
      '--dsw-alias-brand-primary-invert': '#f4edde',
      '--dsw-alias-button-primary-fill': '#3a2e20',
      '--dsw-alias-button-primary-hover': '#4e3e2a',
      '--dsw-alias-button-primary-dimmed': '#ded3bc',
      '--dsw-alias-button-contrast-fill': '#4a3b2a',
      '--dsw-alias-button-elevated-fill': '#e8e1d0',
      '--dsw-alias-button-floating-fill': '#e8e1d0',
      '--dsw-alias-button-floating-hover': '#dfd6c1',
      '--dsw-alias-button-ghost-active-fill': '#dbd0bb',
      '--dsw-alias-button-ghost-active-hover': '#d2c7b0',
      '--dsw-alias-button-ghost-active-border': '#8c7a60',
      '--dsw-alias-button-info-fill': '#4a6172',
      '--dsw-alias-button-info-hover': '#5d7a8c',

      /* ---- interaction: warm hover rather than blue-grey ------------------- */
      '--dsw-alias-interactive-bg-hover': '#4a3b2a0f',
      '--dsw-alias-interactive-bg-active': '#4a3b2a1a',
      '--dsw-alias-interactive-bg-hover-solid': '#dfd6c1',
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
      '--dsw-alias-markdown-code-block': '#e4dbc7',
      '--dsw-alias-markdown-code-block-banner': '#ddd2bc',
      '--dsw-alias-markdown-inline-code': '#d9ceb6',
      '--dsw-alias-markdown-citation': '#e1d8c4',
      '--dsw-alias-markdown-tag': '#d9ceb6',
      '--dsw-alias-markdown-code-segment-selected': '#e8e1d0',
      '--dsw-alias-markdown-code-segment-unselected': '#e0d8c6',
      '--dsw-alias-link': '#4a6172',
      '--dsw-alias-turn-trigger-bg': '#e4dbc7',
      '--dsw-alias-turn-trigger-bg-hover': '#4a3b2a0f',
      '--dsw-alias-code-diff-added': '#4c7a5a14',
      '--dsw-alias-code-diff-deleted': '#a33c3114',
      '--dsw-alias-file-diff-added-bg': '#e6ede0',
      '--dsw-alias-file-diff-added-gutter': '#eef2e9',
      '--dsw-alias-file-diff-deleted-bg': '#f3e3dd',
      '--dsw-alias-file-diff-deleted-gutter': '#f7ece7',

      /* ---- composer, bubbles, menus, sidebar-nav -------------------------- */
      '--dsw-specific-bubble': '#d8c69e',
      '--dsw-specific-bubble-highlight': '#cfbb8e',
      '--dsw-specific-input-major': '#e8e1d0',
      '--dsw-specific-login-input': '#e6dfcf',
      '--dsw-specific-menu': '#e9e1d0f0',
      '--dsw-menu-surface-fill': '#e9e1d0f0',
      '--dsw-alias-menu-group-header-fill': '#ebe4d4f0',
      '--dsw-specific-sidebar-nav-item-active': '#ded3bd',
      '--dsw-specific-sidebar-nav-item-active-accent': '#d7c9aa',
      '--dsw-specific-selector': '#e2dac8',
      '--dsw-specific-tip': '#e6dfcf',

      /* ---- tooltip, toast, switch, scrollbar ------------------------------ */
      '--dsw-alias-tooltip-bg': '#3a2f23',
      '--dsw-alias-toast-bg': '#3a2f23',
      '--dsw-alias-toast-label': '#f4edde',
      '--dsw-alias-switch-thumb': '#fff9ee',
      '--dsw-alias-scrollbar-bg-l1': '#cfc3aa',
      '--dsw-alias-scrollbar-bg-l2': '#cfc3aa',
      '--dsw-alias-scrollbar-hover-l1': '#c0b398',
      '--dsw-alias-scrollbar-hover-l2': '#c0b398',

      /* ---- welcome-screen illustration ------------------------------------ */
      '--dsw-alias-illustration-background': '#e4dbc7',
      '--dsw-alias-illustration-surface': '#e0d8c6',
      '--dsw-alias-illustration-backing': '#ccc0a6',
      '--dsw-alias-illustration-detail': '#ccc0a6',
      '--dsw-alias-illustration-inset': '#e0d8c6',
      '--dsw-alias-illustration-shadow': '#e0d8c6',

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

      '--dsw-alias-tooltip-bg': '#352f28',
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
     * The stylesheet carries what a token layer cannot express.
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
    const STYLE_CSS = `
[class*="wtg9ga_root"]{font-size:15px}
@font-face{font-family:"Parchment Song";src:local("京華老宋体"),local("KingHwa_OldSong"),local("KingHwa_OldSong Regular");unicode-range:U+3400-4DBF,U+4E00-9FFF,U+F900-FAFF,U+20000-2FA1F}
body::after{content:"";position:fixed;inset:0;pointer-events:none;z-index:2147483646;background-image:${GRAIN_FINE},${GRAIN_BLOTCH};background-size:cover,cover;background-repeat:no-repeat,no-repeat;mix-blend-mode:overlay;opacity:.55}
body[data-ds-dark-theme]::after{mix-blend-mode:hard-light;opacity:.2}
[class*="_projectRow"]{font-size:16px;background:#cfc4aa;border-radius:8px}
[class*="_projectRow"]:hover{background:#c7bca1}
body[data-ds-dark-theme] [class*="_projectRow"]{background:#29231c}
body[data-ds-dark-theme] [class*="_projectRow"]:hover{background:#322b23}
[class*="GAkraW_sectionHeader"]{background:#a6b1b5;border-radius:8px;color:#26333a;--dsw-alias-label-secondary:#26333a;--dsw-alias-label-tertiary:#33424a;font-weight:600;font-family:"思源宋体 CN SemiBold","Parchment Song","思源宋体 CN",serif;letter-spacing:.04em}
body[data-ds-dark-theme] [class*="GAkraW_sectionHeader"]{background:#192124;color:#a9bcc2;--dsw-alias-label-secondary:#a9bcc2;--dsw-alias-label-tertiary:#8ca0a7}
[class*="p2k40q_hero"]{color:#b0a086}
body[data-ds-dark-theme] [class*="p2k40q_hero"]{color:#6a5b46}
[class*="an3WzG_crumb"]{max-width:360px}
[class*="an3WzG_crumbCurrent"]{font-size:17px;line-height:26px;font-weight:600;font-family:"思源宋体 CN SemiBold","Parchment Song",serif}
[class*="dscfja_label"]{font-size:14px;height:24px;line-height:24px;max-width:220px}
[class*="m2hUqa_seat"]{font-size:15px}
[class*="m2hUqa_seatLabel"]{font-size:15px}
[class*="rQbmCW_status"]{font-size:14px}
[class*="rezYhW_summary"]{font-size:13px;line-height:20px}
[class*="Ag-ohG_label"]{font-size:13px;line-height:20px}
[class*="Ag-ohG_count"]{font-size:13px;line-height:20px}
body .dsh-price-period{font-size:14px;height:30px;padding:0 11px}
[class*="_projectRow"] [class*="_title"]{letter-spacing:.02em}
[class*="K5rwea_root"]{--deliverable-fill:#eae2d2;--deliverable-hover:#dbd1bc}
body[data-ds-dark-theme] [class*="K5rwea_root"]{--deliverable-fill:#2c241b;--deliverable-hover:#332a1f}
[class*="HOHHba_card"]{--changes-fill:#eae2d2;--changes-hover:#dbd1bc}
body[data-ds-dark-theme] [class*="HOHHba_card"]{--changes-fill:#2c241b;--changes-hover:#332a1f}
[class*="lLdGaq_card"]{--plan-card-fill:#eae2d2;--plan-card-hover:#dbd1bc}
body[data-ds-dark-theme] [class*="lLdGaq_card"]{--plan-card-fill:#2c241b;--plan-card-hover:#332a1f}
[class*="oT5lKa_card"]{--card-fill:#eae2d2;--card-hover:#dbd1bc}
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
