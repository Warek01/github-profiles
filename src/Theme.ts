import { createTheme } from '@mui/material';
import { blue } from '@mui/material/colors';
import {Zoom} from '@mui/material';

const globalTheme = createTheme({
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

export default globalTheme;

export const customScrollbar = {
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
