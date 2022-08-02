import React from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import { ThemeProvider, CssBaseline, Snackbar } from '@mui/material'

import { Blank, NotFound, Login } from './pages'
import { Header, PrivateRoute, LoadingScreen } from './components'

// const Login = React.lazy(() => import('./pages/Login'))
const Profile = React.lazy(() => import('./pages/Profile'))

import { UserProfile } from './types'
import { darkTheme, lightTheme } from './themes'
import { useLocalStorage } from './hooks'
import { fetchUserProfile } from './utils'

export interface SnackbarContextProps {
	show: (message: string) => void
	showThenHide: (message: string, delay?: number) => void
	hide: () => void
}

export const snackbarContext = React.createContext<SnackbarContextProps>({} as SnackbarContextProps)

export interface UserContextProps {
	/** Inside private routes profile is NOT null */
	profile?: UserProfile
	setProfile: (value: (((val: (UserProfile | undefined)) =>
			(UserProfile | undefined))
		| UserProfile
		| undefined)) => void
}

export const userContext = React.createContext<UserContextProps>({} as UserContextProps)

const App: React.FC = () => {
	const navigate = useNavigate()
	const location = useLocation()
	
	const path = location.pathname
	
	const [loginUserName, setLoginUserName] = React.useState<string>('')
	const [oauthToken, setOauthToken] = React.useState<string>('')
	const [loginErrMessage, setLoginErrMessage] = React.useState<string>('')
	const [snackbarMessage, setSnackbarMessage] = React.useState<string>('')
	const [isLoading, setIsLoading] = React.useState<boolean>(false)
	
	const [registeredUsers, setRegisteredUsers] = useLocalStorage<string[]>('registered-users', [])
	const [userProfile, setUserProfile] = useLocalStorage<UserProfile | undefined>('user-profile', undefined)
	const [isDarkTheme, switchTheme] = useLocalStorage<boolean>('dark-theme', false)
	
	const isFocused = React.useCallback((element: Element): boolean => document.activeElement! === element, [])
	
	const saveRegisteredUsers = React.useCallback((logins: string[]) => setRegisteredUsers(logins),
		[])
	
	const showSnackbar = React.useCallback((message: string): void => {
		setSnackbarMessage(message)
	}, [])
	
	const hideSnackbar = React.useCallback((): void => {
		setSnackbarMessage('')
	}, [])
	
	const showSnackbarThenHide = React.useCallback((message: string, delay: number = 2000): void => {
		showSnackbar(message)
		setTimeout(hideSnackbar, delay)
	}, [])
	
	const addRegisteredUser = React.useCallback((login: string): void => {
		if (!login) return
		const users = registeredUsers
		if (users.find(user => user === login)) return
		saveRegisteredUsers([...users, login])
	}, [])
	
	const removeRegisteredUser = React.useCallback((login: string) => saveRegisteredUsers(registeredUsers.filter(user => user !== login)),
		[])
	
	const handleOnLogin = React.useCallback((userName: string, token: string = ''): void => {
		setOauthToken(token)
		setLoginUserName(userName)
	}, [])
	
	const logOut = React.useCallback((): void => {
		setUserProfile(undefined)
		setLoginUserName('')
		setOauthToken('')
		hideSnackbar()
		navigate('/login')
	}, [])
	
	const updateUserProfile = React.useCallback((): void => {
		if (!userProfile) return
		
		setIsLoading(true);
		
		(async () => {
			const userData = await fetchUserProfile(userProfile.login, userProfile.authToken) as UserProfile
			
			setIsLoading(false)
			setUserProfile(userData)
			
			console.log('Profile updated,', userData.login)
		})()
	}, [userProfile])
	
	React.useEffect(() => {
		if (!loginUserName && path === '/')
			navigate('/login')
	}, [location])
	
	React.useEffect(() => {
			if (userProfile || !loginUserName) return;
			
			(async () => {
				console.log(`Fetching ${ loginUserName }`)
				setIsLoading(true)
				const userData = await fetchUserProfile(loginUserName, oauthToken)
				hideSnackbar()
				
				if (typeof userData === 'object') {
					setUserProfile(userData)
					setLoginErrMessage('')
				} else switch (userData) {
					case 401:
						setLoginErrMessage('Wrong OAuth token.')
						break
					case 403:
						setLoginErrMessage('Forbidden: Too many requests')
						break
					case 404:
						setLoginErrMessage(`User ${ loginUserName } not found.`)
						break
					default:
						console.warn('Unknown error:', userData)
						
						setLoginUserName('')
						setOauthToken('')
				}
				
				setIsLoading(false)
			})()
		}, [loginUserName]
	)
	
	React.useEffect(() => {
		if (userProfile && (path === '/' || path === '/login')) {
			addRegisteredUser(userProfile.login)
			navigate('/profile')
			showSnackbarThenHide(`Profile fetched in ${ userProfile.elapsedMs } ms`)
		}
	}, [userProfile])
	
	React.useEffect(() => {
		return () => {
		}
	}, [])
	
	return (
		<ThemeProvider theme={ isDarkTheme ? darkTheme : lightTheme }>
			<CssBaseline />
			<div id='app'>
				<snackbarContext.Provider
					value={ { show: showSnackbar, hide: hideSnackbar, showThenHide: showSnackbarThenHide } }>
					<userContext.Provider value={ { profile: userProfile, setProfile: setUserProfile } }>
						<Header
							logOut={ logOut }
							loggedIn={ !!userProfile }
							isDarkTheme={ isDarkTheme }
							switchTheme={ () => switchTheme(prev => !prev) }
							updateUserProfile={ updateUserProfile }
						/>
						<React.Suspense fallback={ <LoadingScreen open={ true } /> }>
							<Routes>
								<Route path='/' element={ <Blank /> } />
								<Route path='login' element={
									<PrivateRoute condition={ !userProfile } redirect='/profile'>
										<Login
											errorMessage={ loginErrMessage }
											isFocused={ isFocused }
											onLogin={ handleOnLogin }
											removeRegisteredUser={ removeRegisteredUser }
											registeredUsers={ registeredUsers }
										/>
									</PrivateRoute>
								} />
								<Route path='profile' element={
									<PrivateRoute condition={ !!userProfile } redirect='/login'>
										<Profile />
									</PrivateRoute>
								} />
								<Route path='*' element={ <NotFound /> } />
							</Routes>
						</React.Suspense>
						{ /* Backdrop to start when profile is loading */ }
						<LoadingScreen open={ isLoading } />
						{ /* Snackbar controlled by snackbarContext */ }
						<Snackbar message={ snackbarMessage } open={ !!snackbarMessage } />
					</userContext.Provider>
				</snackbarContext.Provider>
			</div>
		</ThemeProvider>
	)
}

export default App
