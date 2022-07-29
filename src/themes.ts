import { createTheme, Grow, Components } from '@mui/material'
import { blue } from '@mui/material/colors'

const componentsOverride: Components = {
	MuiTooltip: {
		defaultProps: {
			enterDelay: 1000,
			enterNextDelay: 1000,
			placement: 'top',
			arrow: true,
			title: 'undefined',
			TransitionComponent: Grow
		}
	}
}

const customScrollbar = {
	'&::-webkit-scrollbar': {
		width: '8px'
	},
	'&::-webkit-scrollbar-thumb': {
		backgroundColor: 'primary.main',
		borderRadius: '4px'
	},
	'&::-webkit-scrollbar-thumb:hover': {
		backgroundColor: 'primary.light'
	},
	'&::-webkit-scrollbar-track': {
		backgroundColor: blue[100],
		borderRadius: '4px'
	}
}

const lightTheme = createTheme({
	palette: {
		mode: 'light'
	},
	components: componentsOverride
})

const darkTheme = createTheme({
	palette: {
		mode: 'dark'
	},
	components: componentsOverride
})

export { customScrollbar, darkTheme, lightTheme }
