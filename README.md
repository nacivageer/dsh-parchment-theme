# 羊皮纸主题 · dsh-parchment-theme

给 DeepSeek Harness Web GUI 换一套旧纸与墨褐的配色：浅色是**羊皮纸**，深色是**墨夜**，跟随系统的明暗自动切换；正文用**思源宋体 CN Medium**，会话标题用**寒蝉活宋体_復 Bold**，整页带一层纸纹。

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
| 代码块 / 行内码 | `#D2CCC2` / `#B9B09C` | `#332C24` / `#2A241D` |

## 四个手段，各管一件事

### 1. token 覆盖层（颜色）

`ctx.theme.overrideTokens(source, { token: { light, dark } })`，114 个 token。

不用 `ctx.theme.register()`：`ThemeDefinition` 只能声明一个 `colorScheme`，而设置页的外观三选一是 ui-theme 里写死的立方体，第三方主题 id 进不去。覆盖层按 token 叠在当前主题上，浅深两套值由当前 colorScheme 选，跟随系统照常。代价是它不占外观设置的位置，**开关就是插件的启停**。

### 2. 插件自有样式表（字号、字体、层级）

`apply` 里插一个 `<style>`，随插件卸载移除。

- **逐组件放字**：全局缩放试过两次都不通。`html{zoom:1.1}` 不改 `window.innerHeight`，左下角账号菜单按未缩放视口判断翻转，直接冲出窗口底部；把 `zoom` 挪到 app 框架、再把框架缩回 `100% / 1.1`，框架会停在 90.9% 不放大。所以改为按组件给字号：侧栏根 `.wtg9ga_root` 14→17px（里面所有标签继承），其余见下。
- **会话标题**：`.an3WzG_crumbCurrent` 14→21px，用「寒蝉活宋体_復 Bold」自带粗体（京華只有一个字重，直接 600 会合成加粗糊边）；`.crumb` 最大宽 220→420px，免得放大后更早省略。
- **工作区层级**：工作区行与里面的会话行共用 `.wnFoaW_title`、都不设字号、都继承侧栏根的字号——这是「第一眼看不出谁是分组」的根源。工作区行抬到 18px + 圆角垫底，里面的会话行 16px；「工作区」那一栏（`GAkraW_sectionHeader`）浅色用灰蓝 `#9BA8AC` 垫底 + 冷墨字 + 半粗，深色改用暖褐 `#5b4a2a` 底 + 金 `#e7c17b` 字，标题与三个图标同色。
- **半价期 chip**：`body .dsh-price-period`（12→15px，高 26→33）。这个插件的样式是组件内渲染的 `<style>`，排在我的样式之后，同权重会输，所以要 `body` 前缀提一级。
- **设置弹窗**：`AnXs9G_panel{zoom:1.15}` 整体放大；组件把字号钉死在 px，zoom 带不动它们，所以面板内按钮、输入/下拉、字段标签与开关行另给 15px（叠 zoom 后约 17.3px）。从设置页点开的列表 portal 到 body，完全不受 zoom 影响，单独补 17px / 行高 25 / 最小高 40。
- **插件市场页**：`body:has([class*="AnXs9G_panel"] [class*="nUhMVa_root"]) [class*="AnXs9G_panel"]{zoom:1}`——`zoom` 会把 `position:fixed` 的悬浮全文一起缩放，提示漂到卡片外；这一页复位为 1，其他设置页保持放大。
- **设置页框线**：面板内把 `--dsw-alias-border-l2/l3/l4` 与 `--dsw-alias-settings-card-stroke` 提到 20/24/30/35%（浅色）、25/30/35/40%（深色），卡片与行分隔不再糊在纸色里。
- **深色悬浮标签**：`--dsw-alias-tooltip-bg` 深色 `#5a4d3e`（原 `#352f28` 与面板 `#302a23` 几乎同色）；`[role="tooltip"]` 另加 1px 浅边和更深的阴影。
- **未激活按钮**：设置页与插件市场里的下拉触发器、outline 按钮（打开配置文件 / 编辑快捷键 / 安装）与未选中的外观卡片，改成 `--dsw-specific-input-major` 填充 + `--dsw-elevation-soft` 外扩阴影，和会话输入框同一套表面；hover、展开、disabled 保留各自状态。
- **深色设置控件**：深色面板下这些未激活的下拉 / outline / stepper / 外观卡片 / 预设卡片改用 `#554c44` 面 + `#6a5f54` 边、去阴影；选中的外观卡片与预设卡片用 `#72664f` + `#8a7a5a`，贴近用户给的图 3。浅色仍走 input-major。
- **自定义控件**：字号大小的 stepper 及其 `_control` 外层（连同 px 单位与展开箭头）与不带 primitives outline/haspopup 类的 action 按钮（`button[class*="_button"]`，如「编辑快捷键」）也补齐同一套填充与阴影；primary / ghost / toolbar / icon / nav / close 排除在外。
- **外观已选**：选中的主题卡片用 `--dsw-specific-bubble` 填充 + `--dsw-alias-button-ghost-active-border` 暖边，不再用浅色的 module 面——否则看起来像「不可用」而不是「已激活」。
- **Agent 预设卡片**：`Wsg8iW_card` 与「让 Agent 帮我创建预设模式」的 `Wsg8iW_creatorButton` 套用外观三张卡片的同一套表面；选中的预设卡片用 bubble 填充 + 暖边。
- **内置插件卡片**：`qgYWUG_card` 的未停用卡片衬底改成按钮同色（浅 `--dsw-specific-input-major`）；深色下再压暗到输入框的 `#302a23`（不是控件面 `#554c44`）。「已停用」卡片用 `:has([data-tone="neutral"])` 排除，保持原来的 disabled 面。
- **账号名渐变**：侧栏账号标签与设置页账号名用 `寒蝉活宋体_復 Bold` + **斜体** + **横向线性**渐变；浅色 `#7e6447 0% → #5f4223 50% → #413432 100%`，深色 `#b78472 0% → #af804a 50% → #bb956c 90–100%`。只做渐变填充，不叠描边/暗影（Photoshop 图层只开了「渐变叠加」）。侧栏 24px、设置页 22px。
- **账号头像**：账号页与侧栏的 user 图标改用用户提供的 `assets/wax-seal.png`（45×45，内嵌 PNG data URI）；侧栏 32px、设置页 40px。DSH 原来的 user glyph 隐藏，图标的米色人形由 PNG 自带。外面再加 `filter: drop-shadow` 的柔和外扩阴影（跟随 PNG 的波浪 alpha，不是方形 box-shadow）；侧栏 trigger 的 `overflow` 放开，让阴影透出。
- **账号弹层**：触发块 `_5Qcc8a_trigger` 14→18px；菜单项（设置 / 意见反馈 / 退出登录）13→16px，行高 24、最小高 40、图标 16px。菜单项是 primitives 共享组件、没有账号专属类名，所以用 `body:has(触发块[aria-expanded="true"])` 门控——只在账号弹层打开时放大，其他菜单维持原尺寸。
- **侧栏时间**：会话行时间 `.wnFoaW_time` 10→13px、行高 20；旁边是 16px 的会话标题，时间不再像脚注。
- **变更卡片**：`HOHHba_*` 整卡抬一档——标题 13→15、文件行 11→13、路径 12→14、增删统计 10→12、展开行 12→13、预览路径 12→14。卡片表面改代码块同色（浅 `#d2ccc2` / 深 `#332c24`），`HOHHba_preview` 与 `_0cITKW_root` 也显式同色，边框加深到浅 `#a89a84` / 深 `#5f5142`。
- **代码块**：`--dsw-alias-markdown-code-block` 浅色 `#d2ccc2` / 深色 `#332c24`（取自已编辑文件卡片的面），并给 `_block_7gxqk_4` 等代码容器加 1px 边框：浅 `#9d8f79` / 深 `#665646`。标题「代码块」用 `猫啃网故障宋` 20px 斜体，正文用 `寒蝉活宋体_復` 16px / 1.8 斜体。

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

`--dsh-content-font-size: 18px` / `--dsh-code-font-size: 13px` / `--dsh-terminal-font-size: 15px`。DSH 用 `calc(当前 - 14px)` 从这三个值推出整条标题/正文阶梯，所以写在这里是整条一起动。

## 字体

```css
--dsw-font-family: var(--dsh-font-family-text, "思源宋体 CN Medium"), "思源宋体 CN Medium", "思源宋体 CN", …, serif
```

- 正文用**思源宋体 CN Medium**（真 Medium 字重，不靠合成加粗）。最初用的是京華老宋体（更"旧刻"），但它是刻本字，横画是发丝级，小字号下笔画太细、看着发浅，朋友的直观评价就是"字不是小，是太浅"；后来试过寒蝉，最终正文落在思源宋体 CN Medium，笔画更实，18px 下不发虚。
- 会话主标题用**寒蝉活宋体_復 Bold**（家族自带粗体）；工作区行与「工作区」分组标题用**思源宋体 CN SemiBold**。两者都有真实字重，避免 CJK 合成加粗糊边。
- 京華的替代方案也试过：`@font-face` + `unicode-range` 把京華限定在汉字、标点交给思源（它把全角标点画得极细，远看像缺字）。换字体后这层补丁不再需要，已删除。
- `--dsh-font-family-text` 是设置里「文本字体」写进去的值，presenter 先写它、后写令牌，所以设置里选了别的字体仍然优先。
- 寒蝉是字体家族名（繁体「復」），和 Windows 注册名一致；没装时整条栈落到思源宋体，不会变无衬线。

## 装与停

```text
plugin_manager install_bundle → <本目录绝对路径>
停用：plugin_manager set_bundle / set_plugin（enabled: false）
```

改过 `client.js` 后**刷新页面**才生效。

## 已知边界

- 外观设置里仍只有 明 / 暗 / 跟随系统，本主题不占位。
- 没有页面级全局缩放（试过两次，见上）；唯一的局部 `zoom` 是设置弹窗的 1.15（插件市场页例外，见上）。其余零碎控件需要哪处大就单独加一条规则，每处可控，也不会把弹层搞歪。
- 开着主题时，设置里的字号档位与 `Ctrl +/−` 不生效（令牌覆盖在 presenter 之后写入）。
- **整条顶栏染色做不到**：Windows 下窗口用 `titleBarStyle:"hidden"` + `titleBarOverlay`，右侧窗口按钮区由系统绘制、颜色来自主进程 `main.js`，CSS 碰不到；强行染左侧拖拽条会在按钮处留一道接缝。
- **三处系统绘制的东西改不到**：① 标题栏右侧的窗口按钮区（Electron `titleBarOverlay`，颜色来自主进程 `main.js`）；② 顶栏「应用 / 编辑」菜单（Electron 原生菜单模板，文案只在 `lib/main.js` 与 preload 里）；③ 文字的选区右键菜单（Chromium 原生，底色纯白 `#FFFFFF`，而 DSH 自己的菜单走 `--dsw-menu-surface-fill`，会被主题染色）。它们只跟随明暗，不跟随配色。
- 类名选择器按**语义后缀**匹配（`[class*="_projectRow"]` 之类），DSH 换哈希前缀不失效；但账号弹层与设置面板用了当前构建的哈希（`_5Qcc8a_*`、`AnXs9G_*`），DSH 升级换哈希后这两处需要重扫。
- 合成加粗问题：京華只有一个字重；凡是需要「真粗」的地方都换成了带真实字重的家族——工作区栏与分组标题用思源宋体 CN SemiBold，会话主标题用寒蝉活宋体_復 Bold。

## 许可

MIT。京華老宋体、思源宋体等字体由各自授权方提供，本仓不分发字体文件；纸纹由运行时 SVG 噪声生成，不含任何素材图片。
