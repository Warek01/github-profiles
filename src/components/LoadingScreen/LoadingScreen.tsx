import React from 'react'
import { CircularProgress, Backdrop } from '@mui/material'

interface LoadingScreenProps {
  open: boolean
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ open }) => {
  return (
    <Backdrop open={open} sx={{ zIndex: 999 }}>
      <CircularProgress size={80} />
    </Backdrop>
  )
}

export default LoadingScreen
