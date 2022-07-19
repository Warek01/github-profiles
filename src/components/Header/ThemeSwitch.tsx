import * as React from 'react'
import { GitHub, LightMode, DarkMode } from '@mui/icons-material'
import { FormControlLabel, Switch, Box } from '@mui/material'

type ThemeSwitchProps = {
	isDarkTheme: boolean
	switchTheme: () => void
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ isDarkTheme, switchTheme }) => {
	const themeIcon: JSX.Element = isDarkTheme ?
		<DarkMode fontSize={ 'small' } /> : <LightMode fontSize={ 'small' } />
	
	return <Box>
		<GitHub color={ 'primary' } fontSize={ 'large' } />
		<FormControlLabel control={
			<Switch
				onChange={ () => switchTheme() }
				checked={ isDarkTheme }
			/> }
		                  label={ themeIcon }
		                  sx={ { marginLeft: '10px' } }
		/>
	</Box>
}

export default ThemeSwitch
