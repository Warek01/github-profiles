import React from 'react';
import { Input, Button, Grid, Card, Alert } from '@mui/material';
import PrevUsers from '../../components/PrevUsers';

const cardWidth = {
	width: {
		xl: '25vw',
		lg: '25vw',
		md: '35vw',
		sm: '50vw',
		xs: '75vw',
		xxs: '85vw'
	}
};

type LoginProps = {
	userNotFoundLogin: string;
	setUserNotFoundLogin: (login: string) => void;
	setUserProfile: (userName: string) => void;
	getRegisteredUsers: () => string[];
	addRegisteredUser: (name: string) => void;
	removeRegisteredUser: (name: string) => void;
};

const Login: React.FC<LoginProps> = ({
	                                     setUserProfile,
	                                     addRegisteredUser,
	                                     getRegisteredUsers,
	                                     removeRegisteredUser,
	                                     userNotFoundLogin,
	                                     setUserNotFoundLogin
                                     }) => {
	const [inputText, setInputText] = React.useState<string>('');
	const [isAuth, setIsAuth] = React.useState<boolean>(false);
	
	const submit = React.useCallback(() => {
		const text = inputText.trim();
		if (text.length === 0) return;
		addRegisteredUser(text);
		setUserProfile(text);
		setInputText('');
	}, [inputText, addRegisteredUser, setUserProfile, setInputText]);
	
	const disableUserNotFoundAlert = React.useCallback(() => {
		setUserNotFoundLogin('');
	}, [setUserNotFoundLogin]);
	
	const onOAuthChange: React.MouseEventHandler<HTMLButtonElement> = event => {
		setIsAuth(prev => !prev);
	};
	
	const onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
		setInputText(prev => event.target.value);
	};
	
	const logFromUser = React.useCallback((userName: string): void => {
		setIsAuth(false);
		setUserProfile(userName);
	}, [setIsAuth, setUserProfile]);
	
	const handleInputFormKeydown = React.useCallback((event: React.KeyboardEvent<HTMLElement>): void => {
		disableUserNotFoundAlert();
		switch (event.key) {
			case 'Enter':
				submit();
				break;
		}
	}, [disableUserNotFoundAlert]);
	
	const alertElement = userNotFoundLogin.length ? (<Alert sx={ { margin: '10px 0' } } severity={ 'error' }>
		User { userNotFoundLogin } not found
	</Alert>) : (<></>);
	
	const authSectionElement = isAuth ? <Input placeholder={ 'KEY HERE' }/> :
		<Button onClick={ onOAuthChange }>
			oauth key
		</Button>;
	
	return <>
		<Grid container justifyContent={ 'center' } sx={ { height: '40vh', margin: '4vh 0' } }>
			<Card sx={ { ...cardWidth, padding: '30px 0' } } onKeyDown={ handleInputFormKeydown }>
				<Grid
					container
					spacing={ 1 }
					justifyContent={ 'center' }
					alignItems={ 'center' }
					flexDirection={ 'column' }
				>
					<Grid item>
						<Input
							placeholder={ 'USERNAME' }
							value={ inputText }
							onChange={ onInputChange }
						/>
					</Grid>
					<Grid item>
						{ alertElement }
					</Grid>
					<Grid item>
						{ authSectionElement }
					</Grid>
					<Grid item>
						<Button onClick={ submit }>
							submit
						</Button>
					</Grid>
				</Grid>
			</Card>
		</Grid>
		
		<PrevUsers
			logFromUser={ logFromUser }
			addRegisteredUser={ addRegisteredUser }
			removeRegisteredUser={ removeRegisteredUser }
			getRegisteredUsers={ getRegisteredUsers }
			customWidth={ cardWidth }
			maxHeight={ '40vh' }
			margin={ '4vh 0' }
		/>
	</>;
};

export default Login;

