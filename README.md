# DanQing UI (`dq-ui`)

Shared **macOS-native desktop** UI for the DanQing product suite (Web + Tauri). **No Element Plus** — Reka UI primitives + Lucide icons.

## Packages

| Package | Description |
|---------|-------------|
| `@danqing/dq-tokens` | Design tokens (`--dq-*`), product themes, glass / Tauri overlays |
| `@danqing/dq-ui` | Primitives (`Dq*`), icons, toast / confirm feedback |
| `@danqing/dq-shell` | App chrome: inspector, pref forms, command palette, desktop host |

## Quick start

```bash
pnpm install
pnpm run build
pnpm run typecheck
# or
make check
```

`make check` runs workspace `build` + `typecheck` and produces publishable `dist` artifacts.

Clone next to Studio so `file:../../dq-ui/packages/*` resolves:

```bash
git clone https://github.com/danqing-ai/dq-ui.git
cd dq-ui && pnpm install
cd ../DanQing-Studio/frontend && npm install && npm run dev
```

Product-side gates (in Studio): `make check-ep-boundary` and `make check-theme-legacy`.

## Themes

`@danqing/dq-tokens` ships a shared spacing / typography base (`dq-typography.css`) plus a **curated set of macOS 26 Liquid Glass** palettes (soft translucent shell + true glass floats). Themes differ by accent/hue only. Type scale is theme-invariant (`caption` 12 / `body` 14 / `title` 16); palettes must not set `font-size` on `html` (rem would compound).

| Theme | Slug | CSS import | `<html>` class | Dark |
|-------|------|------------|----------------|------|
| macOS | `mac` | `dq-mac.css` | `dq-mac` | yes |
| macOS Light | `mac-light` | `dq-mac-light.css` | `dq-mac-light` | no |
| Tokyo Night | `tokyo-night` | `dq-tokyo-night.css` | `dq-tokyo-night` | yes |
| Nord Dark | `nord-dark` | `dq-nord-dark.css` | `dq-nord-dark` | yes |
| Minimal Light | `minimal-light` | `dq-minimal-light.css` | `dq-minimal-light` | no |

**Overlays** (import after a base palette; not selectable themes):

| Overlay | CSS import | Notes |
|---------|------------|-------|
| Recipe dark | `dq-recipe-dark.css` | Shared Liquid Glass shell/glass for dark themes |
| Recipe light | `dq-recipe-light.css` | Shared Liquid Glass shell/glass for light themes |
| Glass | `dq-glass.css` | Frosted surface utilities (`.dq-glass--*`) |
| Tauri macOS | `dq-tauri-macos.css` | Desktop webview chrome (`dq-tauri-macos` on `<html>`) |
| Mobile | `dq-mobile.css` | Phone browser overlay (`dq-mobile` on `<html>`): safe-area, touch targets, chat chrome |

```ts
import '@danqing/dq-tokens/dq-mac.css';
import '@danqing/dq-tokens/dq-recipe-dark.css';
import '@danqing/dq-tokens/dq-recipe-light.css';
import '@danqing/dq-tokens/dq-glass.css';
import '@danqing/dq-tokens/dq-mobile.css'; // phone browsers: also add class `dq-mobile` on <html>
import '@danqing/dq-ui/style.css';
import '@danqing/dq-shell/style.css';
```

Programmatic switching (camelCase id **or** kebab slug; toggles `dark` automatically):

```ts
import { applyDqTheme, THEME_OPTIONS, resolveDqThemeSlug } from '@danqing/dq-tokens';

applyDqTheme('mac');
applyDqTheme('mac-light'); // slug also works
// Settings UI: iterate THEME_OPTIONS for label / accent / dark
// Migrating removed themes: resolveDqThemeSlug(localStorageValue)
```

Local previews: open `packages/tokens/demo/index.html` (gallery) or the per-theme demo pages in the same folder.

## `@danqing/dq-ui`

Primitives built on Reka UI + Lucide. Use `Dq*` in templates only; only this package may import `reka-ui` directly.

**Layout / display:** `DqStack`, `DqRow`, `DqCol`, `DqText`, `DqEmpty`, `DqAlert`, `DqTag`, `DqCountBadge`, `DqProgress`, `DqTooltip`, `DqCollapse` / `DqCollapseItem`, `DqAppBar`, `DqMessageBubble`, `DqActionCard`

**Actions:** `DqButton`, `DqIconButton`, `DqDropdown` / `DqDropdownMenu` / `DqDropdownItem`

**Forms:** `DqInput`, `DqSelect` / `DqOption` (`size="sm"` for compact chips; `variant="ghost"` for borderless toolbars), `DqSlider`, `DqSwitch`, `DqCheckbox` / `DqCheckboxGroup`, `DqInputNumber`, `DqDatePicker`

**Size API:** compact controls use `size="sm"`; touch / mobile use `size="lg"` (44px). Applies to Button / IconButton / Input (and Select / Segmented / Tag / Switch / Checkbox / DatePicker / Text for `sm`).

**Navigation:** `DqSegmented` (`size="sm"`), `DqSectionTabs` / `DqSectionTabTrigger` / `DqSectionTabPanel`

**Agent utilities (tokens):** import `@danqing/dq-tokens/dq-agent.css` for `.dq-prose`, `.dq-code-block`, `.dq-status-dot`, `.dq-kbd`, sidebar row helpers.

**Overlays:** `DqDialog`, `DqDrawer`

**Icons / feedback:** `DqIcon`, `registerDqIcons`, named Lucide re-exports; `toast`, `confirm`, `installDanQingFeedback`

## `@danqing/dq-shell`

App chrome on top of `@danqing/dq-ui` (re-exports primitives, icons, and feedback):

- **Inspector:** `DqInspectorStack`, `DqInspectorSection`, `DqInspectorList` / `DqInspectorListItem`, `DqInspectorKv`, `DqInspectorCallout`, `DqInspectorEmpty`
- **Preferences:** `DqPrefForm`, `DqPrefPane`, `DqPrefRow`, `DqSurfaceCard`
- **Agent chrome:** `DqToolCard` (scannable tool rows), `DqPillTabs` (compact workspace tabs)
- **Desktop:** `DqDesktopHost`, `DqCommandPalette`, `useDqDesktopExperience`, `useDqWindowActivity`
- **Commands:** `useDqCommandActions` / `createDqDefaultCommandActions`, `createDqCommandRegistry` / `useDqCommandRegistry`, `useDqRegisterCommands`, `useDqRecentCommands`

Built-in desktop shortcuts via `useDqDesktopExperience`: `mod+k` palette, `mod+,` preferences, `mod+w` close, `mod+1..9` tab switch.

```vue
<script setup lang="ts">
import { computed } from 'vue';
import {
  DqDesktopHost,
  useDqRegisterCommands,
  type DqCommandAction,
} from '@danqing/dq-shell';

const featureCommands = computed<DqCommandAction[]>(() => [
  {
    id: 'feature.new-item',
    title: 'Create Item',
    shortcut: 'mod+n',
    run: () => {
      // feature action
    },
  },
]);

useDqRegisterCommands(featureCommands);
</script>

<template>
  <DqDesktopHost />
</template>
```

## Conventions

- Prefer `--dq-space-xs…xl` over local `--space-*` aliases.
- Use `applyDqTheme` / `THEME_OPTIONS` instead of a private theme class list.
- Focus rings: `--dq-focus-ring`; hover fills: `.dq-hoverable` — do not invent `0 0 0 2px` rings in product CSS.
- Product apps: wrap feedback via `@/utils/feedback`; templates use `Dq*` only.
- Style changes: tokens + `Dq*`, not third-party component-library overrides.

## Repository

https://github.com/danqing-ai/dq-ui
