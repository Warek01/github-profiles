import React from 'react'

import SnackbarContextProps from './snackbar.types'

const SnackbarContext = React.createContext<SnackbarContextProps>({} as SnackbarContextProps)

export default SnackbarContext
