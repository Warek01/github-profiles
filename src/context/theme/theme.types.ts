export type Theme = 'light' | 'dark'

export default interface ThemeContextProps {
  theme: Theme
  setTheme: (value: Theme | ((val: Theme) => Theme)) => void
}
