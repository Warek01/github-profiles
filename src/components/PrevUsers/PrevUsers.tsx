import * as React from 'react';
import { Container, IconButton, Button, Stack, Paper, Box, Grid } from '@mui/material';
import { Delete } from '@mui/icons-material';

type PrevUsersProps = {
	logFromUser: (userName: string) => void;
	getRegisteredUsers: () => string[];
	addRegisteredUser: (name: string) => void;
	removeRegisteredUser: (name: string) => void;
}

const PrevUsers: React.FC<PrevUsersProps> = ({
	                                             logFromUser,
	                                             getRegisteredUsers,
	                                             addRegisteredUser,
	                                             removeRegisteredUser
                                             }) => {
	const users = getRegisteredUsers().map(userName => <Paper
		elevation={ 1 }
		key={ userName }
		sx={ { display: 'flex', justifyContent: 'space-between', padding: '0 10px' } }
	>
		<Button
			onClick={ () => {
				logFromUser(userName);
			} }
		>
			<span>
				{ userName }
			</span>
		</Button>
		<IconButton color={ 'primary' }>
			<Delete/>
		</IconButton>
	</Paper>);
	
	return <Container>
		<Grid container justifyContent={ 'center' }>
			<Box p={ 2 } sx={ { maxHeight: '40vh', overflow: 'auto', maxWidth: '400px', minWidth: '200px' } }>
				<Paper sx={ { textAlign: 'center', marginBottom: '10px' } }>
					Previous users
				</Paper>
				<Stack spacing={ 1 }>
					{ users }
				</Stack>
			</Box>
		</Grid>
	</Container>;
};

export default PrevUsers;
