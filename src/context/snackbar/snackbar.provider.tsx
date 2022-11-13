import React from 'react'

import SnackbarContext from './snackbar.context'
import SnackbarContextProps from './snackbar.types'

const SnackbarProvider: React.FC<any> = ({ children }) => {
  const [snackbarMessage, setSnackbarMessage] = React.useState<string>('')

  const showSnackbar = React.useCallback((message: string): void => {
    setSnackbarMessage(message)
  }, [])

  const hideSnackbar = React.useCallback((): void => {
    setSnackbarMessage('')
  }, [])

  const showSnackbarThenHide = React.useCallback((message: string, delay: number = 2000): void => {
    showSnackbar(message)
    setTimeout(hideSnackbar, delay)
  }, [])

  const value: SnackbarContextProps = {
    showSnackbarThenHide,
    hideSnackbar,
    showSnackbar,
    snackbarMessage,
  }

  return <SnackbarContext.Provider value={value}>{children}</SnackbarContext.Provider>
}

export default React.memo(SnackbarProvider)
