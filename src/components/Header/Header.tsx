import * as React from 'react';
import { Container, Button, Grid, Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Logout, GitHub } from '@mui/icons-material';

type HeaderProps = {
	onLogOut: () => void;
	loggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ onLogOut, loggedIn }) => {
	
	return <Box sx={ { height: '8vh', borderBottom: '1px solid', borderColor: grey[400] } }>
		<Container sx={ { height: '100%' } }>
			<Grid container sx={ { height: '100%' } } alignItems={ 'center' }>
				<GitHub color={ 'primary' } fontSize={ 'large' }/>
				<Button
					onClick={ onLogOut }
					variant={ 'contained' }
					disabled={ !loggedIn }
					size={ 'small' }
					startIcon={ <Logout/> }
				>
					log out
				</Button>
			</Grid>
		</Container>
	</Box>;
};

export default Header;
