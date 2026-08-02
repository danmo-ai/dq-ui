/** Import theme CSS in app entry, e.g. `import '@danqing/dq-tokens/dq-mac.css'` */
export const DQ_TOKENS_VERSION = '0.1.0';

/**
 * Product theme CSS entry files (relative to package root).
 * `glass` / `tauriMacos` / recipes are overlays — not selectable themes.
 */
export const themes = {
  mac: 'dq-mac.css',
  macLight: 'dq-mac-light.css',
  tokyoNight: 'dq-tokyo-night.css',
  nordDark: 'dq-nord-dark.css',
  minimalLight: 'dq-minimal-light.css',
  /** Overlay utilities — import after a palette theme */
  glass: 'dq-glass.css',
  recipeDark: 'dq-recipe-dark.css',
  recipeLight: 'dq-recipe-light.css',
  tauriMacos: 'dq-tauri-macos.css',
} as const;

export type DqThemeId = keyof typeof themes;

/** Kebab-case slug used in localStorage / Settings UI. */
export type DqThemeSlug =
  | 'mac'
  | 'mac-light'
  | 'tokyo-night'
  | 'nord-dark'
  | 'minimal-light';

export interface DqThemeMeta {
  /** CamelCase key matching `themes` / `applyDqTheme` */
  id: Exclude<DqThemeId, 'glass' | 'recipeDark' | 'recipeLight' | 'tauriMacos'>;
  /** Kebab slug for persistence and product Settings */
  slug: DqThemeSlug;
  label: string;
  description: string;
  /** Class added to `<html>` to activate the theme */
  htmlClass: string;
  /** Accent color for preview swatches */
  accent: string;
  /** Whether this is a dark theme (controls the `dark` class on `<html>`) */
  dark: boolean;
  cssFile: string;
}

/** Catalog of selectable product themes (excludes overlays). */
export const THEME_OPTIONS: readonly DqThemeMeta[] = [
  {
    id: 'mac',
    slug: 'mac',
    label: 'macOS',
    description: 'macOS 26 Liquid Glass · 系统蓝暗色',
    htmlClass: 'dq-mac',
    accent: '#0a84ff',
    dark: true,
    cssFile: themes.mac,
  },
  {
    id: 'macLight',
    slug: 'mac-light',
    label: 'macOS Light',
    description: 'macOS 26 Liquid Glass · 系统蓝亮色',
    htmlClass: 'dq-mac-light',
    accent: '#007aff',
    dark: false,
    cssFile: themes.macLight,
  },
  {
    id: 'tokyoNight',
    slug: 'tokyo-night',
    label: 'Tokyo Night',
    description: 'macOS 26 Liquid Glass · 冷蓝海军',
    htmlClass: 'dq-tokyo-night',
    accent: '#7aa2f7',
    dark: true,
    cssFile: themes.tokyoNight,
  },
  {
    id: 'nordDark',
    slug: 'nord-dark',
    label: 'Nord Dark',
    description: 'macOS 26 Liquid Glass · 北极霜色',
    htmlClass: 'dq-nord-dark',
    accent: '#88c0d0',
    dark: true,
    cssFile: themes.nordDark,
  },
  {
    id: 'minimalLight',
    slug: 'minimal-light',
    label: 'Minimal Light',
    description: 'macOS 26 Liquid Glass · 极简纸白',
    htmlClass: 'dq-minimal-light',
    accent: '#0066cc',
    dark: false,
    cssFile: themes.minimalLight,
  },
] as const;

/** Removed theme slugs → fallback for localStorage migration. */
export const REMOVED_THEME_FALLBACKS: Readonly<Record<string, DqThemeSlug>> = {
  'linear-dark': 'mac',
  'china-red-dark': 'mac',
  'shadcn-dark': 'mac',
  catppuccin: 'mac',
  dracula: 'mac',
  'shadcn-light': 'mac-light',
  'catppuccin-latte': 'mac-light',
  'nord-light': 'mac-light',
  'github-light': 'mac-light',
};

const SLUG_TO_META = Object.fromEntries(
  THEME_OPTIONS.map((opt) => [opt.slug, opt]),
) as Record<DqThemeSlug, DqThemeMeta>;

const ID_TO_META = Object.fromEntries(
  THEME_OPTIONS.map((opt) => [opt.id, opt]),
) as Record<DqThemeMeta['id'], DqThemeMeta>;

/** Root `<html>` class to activate a theme. Overlays return null for glass. */
export const themeRootClasses: Record<DqThemeId, string | null> = {
  mac: 'dq-mac',
  macLight: 'dq-mac-light',
  tokyoNight: 'dq-tokyo-night',
  nordDark: 'dq-nord-dark',
  minimalLight: 'dq-minimal-light',
  glass: null,
  recipeDark: null,
  recipeLight: null,
  tauriMacos: 'dq-tauri-macos',
};

/** npm import paths for theme CSS bundles. */
export const themeImportPaths: Record<DqThemeId, string> = {
  mac: '@danqing/dq-tokens/dq-mac.css',
  macLight: '@danqing/dq-tokens/dq-mac-light.css',
  tokyoNight: '@danqing/dq-tokens/dq-tokyo-night.css',
  nordDark: '@danqing/dq-tokens/dq-nord-dark.css',
  minimalLight: '@danqing/dq-tokens/dq-minimal-light.css',
  glass: '@danqing/dq-tokens/dq-glass.css',
  recipeDark: '@danqing/dq-tokens/dq-recipe-dark.css',
  recipeLight: '@danqing/dq-tokens/dq-recipe-light.css',
  tauriMacos: '@danqing/dq-tokens/dq-tauri-macos.css',
};

const ALL_THEME_ROOT_CLASSES = Object.values(themeRootClasses).filter(
  (value): value is string => value != null,
);

function resolveThemeMeta(
  themeIdOrSlug: DqThemeId | DqThemeSlug,
): DqThemeMeta | null {
  if (themeIdOrSlug in ID_TO_META) {
    return ID_TO_META[themeIdOrSlug as DqThemeMeta['id']];
  }
  if (themeIdOrSlug in SLUG_TO_META) {
    return SLUG_TO_META[themeIdOrSlug as DqThemeSlug];
  }
  return null;
}

/**
 * Apply a DanQing theme on `<html>` (browser / Tauri webview).
 * Accepts camelCase ids (`macLight`) or kebab slugs (`mac-light`).
 * Toggles `dark` for product themes; overlays only add their class when applicable.
 */
export function applyDqTheme(
  themeIdOrSlug: DqThemeId | DqThemeSlug,
  root: HTMLElement = document.documentElement,
): void {
  const meta = resolveThemeMeta(themeIdOrSlug);
  if (meta) {
    root.classList.remove(...ALL_THEME_ROOT_CLASSES);
    root.classList.toggle('dark', meta.dark);
    root.classList.add(meta.htmlClass);
    return;
  }

  if (themeIdOrSlug === 'glass' || themeIdOrSlug === 'recipeDark' || themeIdOrSlug === 'recipeLight') {
    return;
  }
  if (themeIdOrSlug === 'tauriMacos') {
    root.classList.add('dq-tauri-macos');
  }
}

/** Lookup theme metadata by camelCase id or kebab slug. */
export function getDqThemeMeta(
  themeIdOrSlug: DqThemeId | DqThemeSlug,
): DqThemeMeta | null {
  return resolveThemeMeta(themeIdOrSlug);
}

export function isDqThemeSlug(value: string): value is DqThemeSlug {
  return value in SLUG_TO_META;
}

/** Resolve a stored slug, migrating removed themes to curated fallbacks. */
export function resolveDqThemeSlug(value: string | null | undefined): DqThemeSlug {
  if (value && isDqThemeSlug(value)) {
    return value;
  }
  if (value && value in REMOVED_THEME_FALLBACKS) {
    return REMOVED_THEME_FALLBACKS[value];
  }
  return 'mac';
}
