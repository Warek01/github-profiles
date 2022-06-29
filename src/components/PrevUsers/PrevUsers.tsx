import * as React from 'react';
import { IconButton, Button, Stack, Paper, Box, Grid } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { customScrollbar } from '../../Theme';

type PrevUsersProps = {
	logFromUser: (userName: string) => void;
	getRegisteredUsers: () => string[];
	addRegisteredUser: (name: string) => void;
	removeRegisteredUser: (name: string) => void;
	maxHeight: string;
	maxWidth: string;
	minWidth: string;
}

const PrevUsers: React.FC<PrevUsersProps> = ({
	                                             logFromUser,
	                                             getRegisteredUsers,
	                                             addRegisteredUser,
	                                             removeRegisteredUser,
	                                             maxHeight,
	                                             maxWidth,
	                                             minWidth
                                             }) => {
	const users = getRegisteredUsers().map(userName => <Paper
		elevation={ 1 }
		key={ userName }
		sx={ { display: 'flex', justifyContent: 'space-between', padding: '0 10px' } }
	>
		<Button onClick={ () => logFromUser(userName) }>
			<span>
				{ userName }
			</span>
		</Button>
		<IconButton color={ 'primary' } onClick={ () => removeRegisteredUser(userName) }>
			<Delete/>
		</IconButton>
	</Paper>);
	
	return <Grid container justifyContent={ 'center' } hidden={ !users.length }>
		<Box p={ 1 } sx={ { overflow: 'auto', maxWidth, minWidth, maxHeight, ...customScrollbar } }>
			<Paper sx={ { textAlign: 'center', marginBottom: '10px' } }>
				Previous users
			</Paper>
			<Stack spacing={ 2 }>
				{ users }
			</Stack>
		</Box>
	</Grid>;
};

export default PrevUsers;
