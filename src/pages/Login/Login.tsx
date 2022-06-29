import React from 'react';
import { Input, Button, Container } from '@mui/material';
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
			<Input placeholder={ 'USER NAME' } value={ inputText } onChange={ onInputChange }/>
			<br/>
			<Button onClick={ onOAuthChange }>
				{ isAuth ? 'hide oauth' : 'oauth key' }
			</Button>
			<br/>
			{ isAuth && <>
				<Input placeholder={ 'KEY HERE' }/>
				<br/>
			</> }
			<Button onClick={ onSubmit }>
				submit
			</Button>
		</Container>
		<PrevUsers
			logFromUser={ logFromUser }
			addRegisteredUser={ addRegisteredUser }
			removeRegisteredUser={ removeRegisteredUser }
			getRegisteredUsers={ getRegisteredUsers }
		/>
	</>;
};

export default Login;

