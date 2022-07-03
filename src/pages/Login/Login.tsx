import React from 'react';
import { Input, Button, Grid, Card, Alert, IconButton } from '@mui/material';
import PrevUsers from '../../components/PrevUsers';
import { Close } from '@mui/icons-material';


type LoginProps = {
	errorMessage: string;
	isFocused: (element: Element) => boolean;
	setUserProfile: (userName: string, token: string) => void;
	getRegisteredUsers: () => string[];
	addRegisteredUser: (name: string) => void;
	removeRegisteredUser: (name: string) => void;
};

const Login: React.FC<LoginProps> = ({
	                                     errorMessage,
	                                     isFocused,
	                                     setUserProfile,
	                                     addRegisteredUser,
	                                     getRegisteredUsers,
	                                     removeRegisteredUser
                                     }) => {
	const cardWidth = React.useMemo(() => {
		return {
			width: {
				xl: '25vw',
				lg: '25vw',
				md: '35vw',
				sm: '50vw',
				xs: '75vw',
				xxs: '85vw'
			}
		};
	}, []);
	
	const [inputText, setInputText] = React.useState<string>('');
	const [oauthToken, setOauthToken] = React.useState<string>('');
	const [oauthInputShown, setOauthInputShown] = React.useState<boolean>(false);
	const [errorShown, setErrorShown] = React.useState<boolean>(!!errorMessage);
	
	const oauthInputRef = React.useRef<HTMLInputElement>(null);
	const loginInputRef = React.useRef<HTMLInputElement>(null);
	
	const submit = React.useCallback(() => {
		const text = inputText.trim();
		if (!text) return;
		setUserProfile(text, oauthToken);
	}, [inputText, setUserProfile, oauthToken]);
	
	const onLoginInputChange = React.useCallback(() => {
		setInputText(loginInputRef.current!.value);
	}, [setInputText, loginInputRef]);
	
	const onOauthTokenChange = React.useCallback(() => {
		setOauthToken(oauthInputRef.current!.value);
	}, [oauthInputRef, setOauthToken]);
	
	const logFromUser = React.useCallback((userName: string): void => {
		setUserProfile(userName, ''); // Must implement auth
	}, [setUserProfile]);
	
	const handleInputFormKeydown = React.useCallback((event: React.KeyboardEvent<HTMLElement>): void => {
		switch (event.key) {
			case 'Enter':
				submit();
				break;
			case 'Escape': {
				if (isFocused(oauthInputRef.current!) && oauthInputRef.current!.value) {
					setOauthInputShown(false);
				}
				break;
			}
		}
	}, [oauthToken, submit, setOauthInputShown]);
	
	const errorElement = <Alert severity={ 'error' }
	                            action={ <IconButton onClick={ () => setErrorShown(false) }><Close/></IconButton> }>
		{ errorMessage }
	</Alert>;
	
	const authSectionElement = oauthInputShown ? <Input
			autoComplete={ 'off' }
			inputRef={ oauthInputRef }
			placeholder={ 'KEY HERE' }
			id={ 'oauth-input' }
			value={ oauthToken }
			onChange={ onOauthTokenChange }
		/> :
		<Button onClick={ () => setOauthInputShown(true) }>
			oauth key
		</Button>;
	
	React.useEffect(() => {
		if (oauthInputShown) {
			oauthInputRef.current!.focus();
		} else {
			setOauthToken('');
		}
	}, [oauthInputShown]);
	
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
							autoComplete={ 'off' }
							inputRef={ loginInputRef }
							placeholder={ 'USERNAME' }
							value={ inputText }
							onChange={ onLoginInputChange }
						/>
					</Grid>
					<Grid item>
						{ errorShown && errorElement }
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

