import React from 'react';
import { Input, Button, Container, Grid, Card } from '@mui/material';
import { useCookies } from 'react-cookie';
import PrevUsers from '../../components/PrevUsers';

type LoginProps = {
	setUserProfile: (userName: string) => void;
	getRegisteredUsers: () => string[];
	addRegisteredUser: (name: string) => void;
	removeRegisteredUser: (name: string) => void;
};

const Login: React.FC<LoginProps> = ({
	                                     setUserProfile,
	                                     addRegisteredUser,
	                                     getRegisteredUsers,
	                                     removeRegisteredUser
                                     }) => {
	const [cookies, setCookies] = useCookies(['prev-users']);
	
	const [inputText, setInputText] = React.useState<string>('');
	const [isAuth, setIsAuth] = React.useState<boolean>(false);
	
	const onSubmit: React.MouseEventHandler<HTMLButtonElement> = event => {
		const text = inputText.trim();
		if (text.length === 0) return;
		addRegisteredUser(text);
		setUserProfile(text);
		setInputText('');
	};
	
	const onOAuthChange: React.MouseEventHandler<HTMLButtonElement> = event => {
		setIsAuth(prev => !prev);
	};
	
	const onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
		setInputText(prev => event.target.value);
	};
	
	const logFromUser = (userName: string) => {
		setIsAuth(false);
		setUserProfile(userName);
	};
	
	return <>
		<Container sx={ { height: '40vh' } }>
			<Grid container justifyContent={ 'center' }>
				<Card sx={ { width: '300px', marginTop: '30px', padding: '30px 0' } }>
					<Grid container justifyContent={ 'center' } alignItems={ 'center' } flexDirection={ 'column' }>
						<Input
							placeholder={ 'USERNAME' }
							value={ inputText }
							onChange={ onInputChange }
						/>
						<Button onClick={ onOAuthChange } sx={ { margin: '5px 0' } }>
							{ isAuth ? 'hide oauth' : 'oauth key' }
						</Button>
						{ isAuth && <Input placeholder={ 'KEY HERE' }/> }
						<Button onClick={ onSubmit } sx={ { margin: '5px 0 0 0' } }>
							submit
						</Button>
					</Grid>
				</Card>
			</Grid>
		</Container>
		<Container sx={ { height: '50vh' } }>
			<PrevUsers
				logFromUser={ logFromUser }
				addRegisteredUser={ addRegisteredUser }
				removeRegisteredUser={ removeRegisteredUser }
				getRegisteredUsers={ getRegisteredUsers }
				minWidth={ '250px' }
				maxWidth={ '450px' }
				maxHeight={ '250px' }
			/>
		</Container>
	</>;
};

export default Login;

