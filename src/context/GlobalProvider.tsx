import React from 'react'

import { UserProfileProvider } from './user-profile'
import { ThemeProvider } from './theme'
import { SnackbarProvider } from './snackbar'

interface GlobalProviderProps {
  children: React.ReactNode
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <SnackbarProvider>
        <UserProfileProvider>{children}</UserProfileProvider>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default React.memo(GlobalProvider)
