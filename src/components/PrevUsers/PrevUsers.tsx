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
	customWidth: object;
	margin: string;
}

const PrevUsers: React.FC<PrevUsersProps> = ({
	                                             logFromUser,
	                                             getRegisteredUsers,
	                                             addRegisteredUser,
	                                             removeRegisteredUser,
	                                             maxHeight = '400px',
	                                             customWidth = {},
	                                             margin = '0'
                                             }) => {
	const [deletedUser, setDeletedUser] = React.useState<string>('');
	
	const users = getRegisteredUsers().map(login => <Paper
		key={ login }
		sx={ { display: 'flex', justifyContent: 'space-between', padding: '0 10px' } }
	>
		<Button onClick={ () => {
			logFromUser(login);
		} }>
			<span>
				{ login }
			</span>
		</Button>
		<IconButton color={ 'primary' } onClick={ () => {
			setDeletedUser(login);
			removeRegisteredUser(login);
		} }>
			<Delete/>
		</IconButton>
	</Paper>);
	
	const noUsersElement = <Paper
		key={ 'empty' }
		sx={ { display: 'flex', justifyContent: 'center', width: '50%', margin: '0 auto' } }
	>
		None
	</Paper>;
	
	return <Grid container justifyContent={ 'center' } sx={ { margin, maxHeight } }>
		<Box p={ 1 } sx={ { overflow: 'auto', maxHeight, ...customWidth, ...customScrollbar } }>
			<Stack spacing={ 2 }>
				<Paper sx={ { textAlign: 'center' } } elevation={ 2 }>
					Previous users
				</Paper>
				{ users.length ? users : noUsersElement }
			</Stack>
		</Box>
	</Grid>;
};

export default PrevUsers;
