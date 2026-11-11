# 羊皮纸主题 · dsh-parchment-theme

给 DeepSeek Harness Web GUI 换一套旧纸与墨褐的配色：浅色是**羊皮纸**，深色是**墨夜**，跟随系统的明暗自动切换；正文用**京華老宋体**（汉字），标点与拉丁回落到思源宋体。

只叠 token + 一张插件自有样式表，不动布局结构，也不改 DSH 源码。停用插件即复原。

## 效果

| 用途 | 羊皮纸（浅色） | 墨夜（深色） |
|---|---|---|
| 底纸 | `#E9E1CE` | `#241D16` |
| 浮起面 | `#F1EADA` | `#2C241B` |
| 嵌套面 | `#E4DBC6` | `#332A1F` |
| 三级面 | `#DCD2BB` | `#3B3125` |
| 侧栏 | `#E2D8C1` | `#1E1811` |
| 正文墨色 | `#2A2219` | `#ECE1CB` |
| 次级 / 三级文字 | `#5B4C3A` / `#7B6A54` | `#C3B299` / `#A0907A` |
| 主按钮 | `#3A2E20` | `#ECE0C8` |
| 链接 / 业务强调 | 靛青 `#4A6172` | `#9CB6C6` |
| 成功 / 错误 / 警告 | 苔绿 `#4C7A5A` / 朱砂 `#A33C31` / 赭 `#A9772B` | 同色提亮 |
| 代码块 / 行内码 | `#EDE5D2` / `#E2D8C1` | `#2B231A` / `#2D2419` |
| 用户气泡 | `#E7DCC2` | `#372D22` |
| 选区 | 蜜色 `#C6A96A66` | 同 |

## 三种手段，各管一件事

### 1. token 覆盖层（颜色）

`ctx.theme.overrideTokens(source, { token: { light, dark } })`。

不用 `ctx.theme.register()`：`ThemeDefinition` 只能声明一个 `colorScheme`，而且设置页的外观三选一是 ui-theme 里写死的立方体（明/暗/跟随系统），第三方主题 id 进不去那个列表——注册了也无处可点。覆盖层按 token 叠在当前主题上，浅深两套值由当前 colorScheme 选，跟随系统照常工作。代价是它不出现在外观设置里，**开关就是插件的启停**。

覆盖 110 个 token / 色：`--dsw-alias-*` 全族，加上 design-platform.css 里没走 alias 的字面色（菜单 `#F8F9FAF0`、阴影 `#0000000D` 这类）。

### 2. 插件自有样式表（字号、字体、层级）

`apply` 里插一个 `<style>`，随插件卸载一起移除：

```css
html{zoom:1.1}
@font-face{font-family:"Parchment Song";src:local("京華老宋体"),local("KingHwa_OldSong");
           unicode-range:U+3400-4DBF,U+4E00-9FFF,U+F900-FAFF,U+20000-2FA1F}
[class*="_projectRow"]{font-size:16px}
[class*="_projectRow"] [class*="_title"]{letter-spacing:.02em}
```

- **缩放**：`zoom` 是 Chromium 实现页面缩放用的同一机制，字号、行高、图标、点击区一起长。之前试过改 `--dsw-font-*` 那一族，结果只有「恰好用 token 的组件」跟着变，侧栏根节点是字面量 `font-size:14px`，纹丝不动，一屏里出现三种字号，看着像叠字。
- **字体**：京華老宋体把全角标点（`「」（）`）画成大约四分之一个字身——木刻本的旧习惯，16px 下细到像缺字。`@font-face` + `unicode-range` 把这套字限定在汉字，标点、数字、拉丁落到思源宋体 CN。注意栈里**不能**再出现裸的 `"京華老宋体"`：它排在 `Parchment Song` 后面，标点会顺着列表又找回去。
- **层级**：工作区行与里面的会话行共用同一个文本类、都不设字号，都继承侧栏根的 14px——这是「第一眼看不出谁是分组」的根源。只把工作区行抬到 16px，会话行不动。属性选择器按类名后缀匹配，DSH 换哈希前缀不失效。

### 3. 正文字号阶梯

`--dsh-content-font-size: 16px` / `--dsh-code-font-size: 12px` / `--dsh-terminal-font-size: 14px`。

presenter 从设置里读这三个值写进 body，而 gradient-shadow-text.css 用 `calc(var(--dsh-content-font-size, 14px) - 14px)` 推出整条标题/正文阶梯——所以写在这里是整条阶梯一起动，不是只有正文变大。

## 字体

```css
--dsw-font-family: var(--dsh-font-family-text, "Parchment Song"), "Parchment Song", "思源宋体 CN", …, serif
```

`--dsh-font-family-text` 是设置里「文本字体」写进去的值，presenter 先写它、后写令牌，所以**设置里选了别的字体，仍然是你的优先**；没选才落到京華。

- 字体名 `京華老宋体`（繁体「華」）与 Windows 注册名一致；英文名 `KingHwa_OldSong` 作为 `local()` 兜底。
- 没装这个字体时整条栈落到思源宋体，仍是宋体，不会变无衬线。
- 代码块不跟着换，仍是等宽字体。
- 京華只有一个字重，界面上凡是 `font-weight ≥ 500` 都是 Chromium 合成加粗，CJK 上会糊——工作区名靠**字号**拉层级，没敢再加粗。

## 装与停

```text
plugin_manager install_bundle → <本目录绝对路径>
停用：plugin_manager set_bundle / set_plugin（enabled: false）
```

安装或改过 `client.js` 后**刷新页面**才生效（client 模块不就地热更新）。

## 已知边界

- 外观设置里仍只有 明 / 暗 / 跟随系统，本主题不占位。
- 开着主题时，设置里的字号档位与 `Ctrl +/−` 不生效（令牌覆盖在 presenter 之后写入）。
- 没有纸纹（噪点/斑驳）：纯色不压字、不改布局。
- 没有替换产品图标（`ThemeDefinition.icons` 只对注册主题生效）。
- DSH 升级后若某个 token 改名，缺的那几个退回默认色，不会报错。

## 许可

MIT。京華老宋体、思源宋体等字体由各自授权方提供，本仓不分发字体文件。
