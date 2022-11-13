import React from 'react'

import UserContextProps from './theme.types'

const ThemeContext = React.createContext<UserContextProps>({
  theme: 'light',
  setTheme: () => undefined,
})

export default ThemeContext
