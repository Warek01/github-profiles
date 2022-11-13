import React from 'react'
import { GitHub, LightMode, DarkMode } from '@mui/icons-material'
import { FormControlLabel, Switch, Box } from '@mui/material'
import { ThemeContext } from '../../context/theme'

const ThemeSwitch: React.FC = () => {
  const { theme, setTheme } = React.useContext(ThemeContext)
  const themeIcon: JSX.Element = theme === 'dark' ? <DarkMode fontSize="small" /> : <LightMode fontSize="small" />

  return (
    <Box>
      <GitHub color="primary" fontSize="large" />
      <FormControlLabel
        control={<Switch onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')} checked={theme === 'dark'} />}
        label={themeIcon}
        sx={{ marginLeft: '10px' }}
      />
    </Box>
  )
}

export default ThemeSwitch
