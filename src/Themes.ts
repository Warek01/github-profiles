import { createTheme, Zoom } from '@mui/material';
import { blue } from '@mui/material/colors';

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
};

const lightTheme = createTheme({
	palette: {
		mode: 'light'
	},
	components: {
		MuiTooltip: {
			defaultProps: {
				enterDelay: 2000,
				enterNextDelay: 2000,
				placement: 'top',
				TransitionComponent: Zoom
			}
		}
	}
});

const darkTheme = createTheme({
	palette: {
		mode: 'dark'
	},
	components: {
		MuiTooltip: {
			defaultProps: {
				enterDelay: 2000,
				enterNextDelay: 2000,
				placement: 'top',
				TransitionComponent: Zoom
			}
		}
	}
});

export { customScrollbar, darkTheme, lightTheme };
