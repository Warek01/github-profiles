import { createTheme } from '@mui/material';
import { blue } from '@mui/material/colors';

const globalTheme = createTheme({});

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
