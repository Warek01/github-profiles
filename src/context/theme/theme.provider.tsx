import React from 'react'
import { ThemeProvider as Theming, Theme as currentTheme, CssBaseline } from '@mui/material'

import ThemeContext from './theme.context'
import ThemeContextProps, { Theme } from './theme.types'
import { useLocalStorage } from 'hooks'
import { lightTheme, darkTheme } from 'themes'

const ThemeProvider: React.FC<any> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light')

  const value: ThemeContextProps = {
    theme,
    setTheme,
  }

  let currentTheme: currentTheme

  switch (theme) {
    case 'light':
      currentTheme = lightTheme
      break
    case 'dark':
      currentTheme = darkTheme
      break
  }

  return (
    <Theming theme={currentTheme}>
      <CssBaseline />
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    </Theming>
  )
}

export default React.memo(ThemeProvider)
