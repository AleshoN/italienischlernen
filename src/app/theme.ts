export type Theme = 'light' | 'dark' | 'system'

export function applyTheme(theme: Theme) {
  const resolved =
    theme === 'system'
      ? matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : theme
  document.documentElement.dataset.theme = resolved
}
