# 羊皮纸主题 · dsh-parchment-theme

给 DeepSeek Harness Web GUI 换一套旧纸与墨褐的配色：浅色是**羊皮纸**，深色是**墨夜**，跟随系统的明暗自动切换；正文用**京華老宋体**（汉字），标点与拉丁回落到思源宋体，整页带一层纸纹。

只叠 token + 一张插件自有样式表，不改 DSH 源码，也不替换任何界面结构。停用插件即复原。

## 效果

| 用途 | 羊皮纸（浅色） | 墨夜（深色） |
|---|---|---|
| 底纸 | `#E0D8C6` | `#241D16` |
| 浮起面 | `#EAE2D2` | `#2C241B` |
| 嵌套面 | `#DBD1BC` | `#332A1F` |
| 三级面 | `#D2C8B1` | `#3B3125` |
| 侧栏 | `#D9CFB7` | `#1E1811` |
| 工作区行垫底 | `#D3C8AD` | `#1A150F` |
| 工作区栏垫底 | `#9BA8AC`（灰蓝） | `#192124` |
| 正文墨色 | `#2A2219` | `#ECE1CB` |
| 用户气泡 | `#D8C69E` | `#372D22` |
| 主按钮 | `#3A2E20` | `#ECE0C8` |
| 链接 / 业务强调 | 靛青 `#4A6172` | `#9CB6C6` |
| 成功 / 错误 / 警告 | 苔绿 `#4C7A5A` / 朱砂 `#A33C31` / 赭 `#A9772B` | 同色提亮 |
| 代码块 / 行内码 | `#E4DBC7` / `#D9CEB6` | `#2B231A` / `#2D2419` |

## 四个手段，各管一件事

### 1. token 覆盖层（颜色）

`ctx.theme.overrideTokens(source, { token: { light, dark } })`，110 个 token。

不用 `ctx.theme.register()`：`ThemeDefinition` 只能声明一个 `colorScheme`，而设置页的外观三选一是 ui-theme 里写死的立方体，第三方主题 id 进不去。覆盖层按 token 叠在当前主题上，浅深两套值由当前 colorScheme 选，跟随系统照常。代价是它不占外观设置的位置，**开关就是插件的启停**。

### 2. 插件自有样式表（字号、字体、层级）

`apply` 里插一个 `<style>`，随插件卸载移除。

- **逐组件放字**：全局缩放试过两次都不通。`html{zoom:1.1}` 不改 `window.innerHeight`，左下角账号菜单按未缩放视口判断翻转，直接冲出窗口底部；把 `zoom` 挪到 app 框架、再把框架缩回 `100% / 1.1`，框架会停在 90.9% 不放大。所以改为按组件给字号：侧栏根 `.wtg9ga_root` 14→15px（里面所有标签继承），其余见下。
- **会话标题**：`.an3WzG_crumbCurrent` 14→17px，并用「思源宋体 CN SemiBold」真半粗（京華只有一个字重，直接 600 会合成加粗糊边）；`.crumb` 最大宽 220→360px，免得放大后更早省略。
- **工作区层级**：工作区行与里面的会话行共用 `.wnFoaW_title`、都不设字号、都继承侧栏根的 14px——这是「第一眼看不出谁是分组」的根源。工作区行抬到 16px + 圆角垫底；「工作区」那一栏（`GAkraW_sectionHeader`）用灰蓝 `#9BA8AC` 垫底 + 冷墨字 + 半粗。
- **半价期 chip**：`body .dsh-price-period`（12→14px，高 26→30）。这个插件的样式是组件内渲染的 `<style>`，排在我的样式之后，同权重会输，所以要 `body` 前缀提一级。

### 3. 组件私有变量（那些「白块」）

有些组件不读 alias 层，直接把中性灰写进自己的变量，浅色下就是纯白卡片。已按类名后缀全部接住：

| 组件 | 私有变量 | 原值 | 现在 |
|---|---|---|---|
| 变更卡片 | `--changes-fill` | `neutral-50` / `neutral-850` | `#EAE2D2` / `#2C241B` |
| 交付文件组 | `--deliverable-fill` | 同上 | 同上 |
| 计划卡片 | `--plan-card-fill` | 同上 | 同上 |
| 定时任务卡片 | `--card-fill` | 同上 | 同上 |
| 侧栏 guide 指南针 | `--dsw-static-neutral-200` | 中性灰 | `#B0A086` / `#6A5B46` |

### 4. 纸纹

不是素材图，是浏览器现画的：两层 SVG `feTurbulence` 分形噪声（细颗粒 260px 平铺 + 斑驳 900px 平铺），`stitchTiles` 保证无缝，`mix-blend-mode: overlay` 调制明暗而不压暗纸色。

嫌颗粒粗细改 `baseFrequency`，嫌浓淡改 `::after` 的 `opacity`（浅 .8 / 深 .6）。

### 5. 正文阶梯

`--dsh-content-font-size: 16px` / `--dsh-code-font-size: 12px` / `--dsh-terminal-font-size: 14px`。DSH 用 `calc(当前 - 14px)` 从这三个值推出整条标题/正文阶梯，所以写在这里是整条一起动。

## 字体

```css
--dsw-font-family: var(--dsh-font-family-text, "Parchment Song"), "Parchment Song", "思源宋体 CN", …, serif
@font-face{font-family:"Parchment Song";src:local("京華老宋体"),local("KingHwa_OldSong");unicode-range:U+3400-4DBF,U+4E00-9FFF,…}
```

- 京華老宋体把全角标点（`「」（）`）画成大约四分之一个字身——木刻本的旧习惯，16px 下细到像缺字。`@font-face` + `unicode-range` 把这套字限定在汉字，标点、数字、拉丁落到思源宋体 CN。
- 栈里**不能**再出现裸的 `"京華老宋体"`：它排在 `Parchment Song` 后面，标点会顺着列表又找回去。
- `--dsh-font-family-text` 是设置里「文本字体」写进去的值，presenter 先写它、后写令牌，所以设置里选了别的字体仍然优先。

## 装与停

```text
plugin_manager install_bundle → <本目录绝对路径>
停用：plugin_manager set_bundle / set_plugin（enabled: false）
```

改过 `client.js` 后**刷新页面**才生效。

## 已知边界

- 外观设置里仍只有 明 / 暗 / 跟随系统，本主题不占位。
- 没有全局缩放：正文以外的零碎控件比「全面 +10%」小一点，需要哪处大就单独加一条规则（每处都可控，也不会把弹层搞歪）。
- 开着主题时，设置里的字号档位与 `Ctrl +/−` 不生效（令牌覆盖在 presenter 之后写入）。
- **整条顶栏染色做不到**：Windows 下窗口用 `titleBarStyle:"hidden"` + `titleBarOverlay`，右侧窗口按钮区由系统绘制、颜色来自主进程 `main.js`，CSS 碰不到；强行染左侧拖拽条会在按钮处留一道接缝。
- **三处系统绘制的东西改不到**：① 标题栏右侧的窗口按钮区（Electron `titleBarOverlay`，颜色来自主进程 `main.js`）；② 顶栏「应用 / 编辑」菜单（Electron 原生菜单模板，文案只在 `lib/main.js` 与 preload 里）；③ 文字的选区右键菜单（Chromium 原生，底色纯白 `#FFFFFF`，而 DSH 自己的菜单走 `--dsw-menu-surface-fill`，会被主题染色）。它们只跟随明暗，不跟随配色。
- 类名选择器按**语义后缀**匹配（`[class*="_projectRow"]` 之类），DSH 换哈希前缀不失效；但组件改名就要重找。
- 合成加粗问题：京華只有一个字重，凡是需要「真粗」的地方（工作区栏、会话标题）都换成了带真实字重的思源半粗。

## 许可

MIT。京華老宋体、思源宋体等字体由各自授权方提供，本仓不分发字体文件；纸纹由运行时 SVG 噪声生成，不含任何素材图片。
