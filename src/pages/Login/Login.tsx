import * as React from 'react'
import { Input, Button, Grid, Card, Alert, IconButton, Collapse } from '@mui/material'
import { Close } from '@mui/icons-material'

import { snackbarContext } from '../../App'

import LoginUsersList from './LoginUsersList'

type LoginProps = {
	errorMessage: string
	isFocused: (element: Element) => boolean
	onLogin: (userName: string, token: string) => void
	registeredUsers: string[]
	removeRegisteredUser: (name: string) => void
};

const Login: React.FC<LoginProps> = ({
	                                     errorMessage,
	                                     isFocused,
	                                     onLogin,
	                                     registeredUsers,
	                                     removeRegisteredUser
                                     }) => {
	const snackbar = React.useContext(snackbarContext)
	
	const cardWidth = React.useMemo(() =>
		({
			width: {
				xl: '25vw',
				lg: '25vw',
				md: '35vw',
				sm: '50vw',
				xs: '75vw',
				xxs: '85vw'
			}
		}), [])
	
	const [inputText, setInputText] = React.useState<string>('')
	const [oauthToken, setOauthToken] = React.useState<string>('')
	const [oauthInputShown, setOauthInputShown] = React.useState<boolean>(false)
	const [errorShown, setErrorShown] = React.useState<boolean>(false)
	
	const oauthInputRef = React.useRef<HTMLInputElement>(null)
	const loginInputRef = React.useRef<HTMLInputElement>(null)
	
	const submit = React.useCallback(() => {
		const text = inputText.trim()
		const token = oauthToken.trim()
		if (!text || (oauthInputShown && !token)) return
		onLogin(text, token)
	}, [inputText, oauthToken])
	
	const onLoginInputChange = React.useCallback(() => {
		setInputText(loginInputRef.current!.value)
	}, [loginInputRef])
	
	const onOauthTokenChange = React.useCallback(() => {
		setOauthToken(oauthInputRef.current!.value)
	}, [oauthInputRef])
	
	const logFromUser = React.useCallback((userName: string, token: string = ''): void => {
		snackbar.show(`Loading ${ userName }`)
		onLogin(userName, token) // Must implement auth
	}, [snackbar])
	
	const reset = React.useCallback((): void => {
		setOauthToken('')
		setInputText('')
		loginInputRef.current!.focus()
	}, [loginInputRef])
	
	const handleInputFormKeydown = React.useCallback((event: React.KeyboardEvent<HTMLElement>): void => {
		switch (event.key) {
			case 'Enter':
				event.preventDefault()
				submit()
				break
			case 'Escape': {
				event.preventDefault()
				if (isFocused(oauthInputRef.current!) && !oauthInputRef.current!.value) {
					setOauthInputShown(false)
				}
				break
			}
		}
	}, [oauthToken, submit])
	
	const errorElement: JSX.Element = (
		<Collapse in={ errorShown }>
			<Alert severity='error' action={
				<IconButton
					size='small'
					onClick={ () => setErrorShown(false) }
				>
					<Close fontSize='inherit' />
				</IconButton>
			}>
				{ errorMessage }
			</Alert>
		</Collapse>
	)
	
	const authSectionElement: JSX.Element = (
		oauthInputShown ?
			<Input
				type='password'
				autoComplete='off'
				inputRef={ oauthInputRef }
				placeholder='KEY HERE'
				value={ oauthToken }
				onChange={ onOauthTokenChange }
			/>
			: <Button onClick={ () => setOauthInputShown(true) }>
				oauth key
			</Button>
	)
	
	React.useEffect(() => {
		if (oauthInputShown)
			oauthInputRef.current!.focus()
		else
			setOauthToken('')
	}, [oauthInputShown])
	
	React.useEffect(() => setErrorShown(!!errorMessage), [errorMessage])
	
	return (
		<>
			<Grid container justifyContent='center' sx={ { height: '40vh', margin: '4vh 0' } }>
				<Card sx={ { ...cardWidth, padding: '30px 0' } } onKeyDown={ handleInputFormKeydown }>
					<Grid
						container
						spacing={ 1 }
						justifyContent='center'
						alignItems='center'
						flexDirection='column'
					>
						<Grid item>
							<Input
								type='text'
								autoComplete='off'
								placeholder='USERNAME'
								inputRef={ loginInputRef }
								value={ inputText }
								onChange={ onLoginInputChange }
							/>
						</Grid>
						<Grid item>
							{ errorElement }
						</Grid>
						<Grid item>
							{ authSectionElement }
						</Grid>
						<Grid item>
							<Button onClick={ submit }>
								submit
							</Button>
						</Grid>
						<Grid item>
							<Button onClick={ reset }>
								reset
							</Button>
						</Grid>
					</Grid>
				</Card>
			</Grid>
			
			<LoginUsersList
				logFromUser={ logFromUser }
				removeRegisteredUser={ removeRegisteredUser }
				registeredUsers={ registeredUsers }
				customWidth={ cardWidth }
				maxHeight='40vh'
				margin='4vh 0'
			/>
		</>
	)
}

export default Login
