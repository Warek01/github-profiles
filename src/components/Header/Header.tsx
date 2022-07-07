import * as React from 'react';
import { Container, Button, Grid, Box, Switch, FormControlLabel } from '@mui/material';
import { LightMode, DarkMode, Logout, GitHub } from '@mui/icons-material';
import { grey } from '@mui/material/colors';

type HeaderProps = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	logOut: () => void;
	loggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ setTheme, logOut, loggedIn, theme }) => {
	const themeIcon: JSX.Element = theme === 'light' ? <LightMode fontSize={ 'small' }/> :
		<DarkMode fontSize={ 'small' }/>;
	
	return <Box sx={ { height: '8vh', borderBottom: '1px solid', borderColor: grey[400] } }>
		<Container sx={ { height: '100%' } }>
			<Grid container sx={ { height: '100%' } } alignItems={ 'center' }>
				<GitHub color={ 'primary' } fontSize={ 'large' }/>
				<Button
					onClick={ logOut }
					variant={ 'contained' }
					disabled={ !loggedIn }
					size={ 'small' }
					startIcon={ <Logout/> }
				>
					log out
				</Button>
				<FormControlLabel control={ <Switch
					onChange={ () => setTheme(theme === 'light' ? 'dark' : 'light') }
					checked={ theme === 'dark' }
				/> }
				                  label={ themeIcon }/>
			</Grid>
		</Container>
	</Box>;
};

export default Header;
