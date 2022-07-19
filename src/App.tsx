import React from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'

import Login from './pages/Login'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import Blank from './pages/Blank'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'

import { UserProfile, GithubUserProfile, GitHubRepo } from './types'

import { darkTheme, lightTheme } from './Themes'

import { useLocalStorage } from './hooks'

import { fetchUserProfile } from './utils'

const App: React.FC = () => {
	const navigate = useNavigate()
	const location = useLocation()
	
	const path = location.pathname
	
	const [loginUserName, setLoginUserName] = React.useState<string>('')
	const [oauthToken, setOauthToken] = React.useState<string>('')
	const [loginErrMessage, setLoginErrMessage] = React.useState<string>('')
	
	const [registeredUsers, setRegisteredUsers] = useLocalStorage<string[]>('registered-users', [])
	const [userProfile, setUserProfile] = useLocalStorage<UserProfile | null>('user-profile', null)
	const [isDarkTheme, switchTheme] = useLocalStorage<boolean>('dark-theme', false)
	
	const isFocused = React.useCallback((element: Element): boolean => document.activeElement! === element, [])
	
	const saveRegisteredUsers = React.useCallback((logins: string[]) => setRegisteredUsers(logins),
		[setRegisteredUsers])
	
	const addRegisteredUser = React.useCallback((login: string): void => {
		if (!login) return
		const users = registeredUsers
		if (users.find(user => user === login)) return
		saveRegisteredUsers([...users, login])
	}, [saveRegisteredUsers, registeredUsers])
	
	const removeRegisteredUser = React.useCallback((login: string) => saveRegisteredUsers(registeredUsers.filter(user => user !== login)),
		[saveRegisteredUsers, registeredUsers])
	
	const setUserProfileCallback = React.useCallback((userName: string, token: string = ''): void => {
		setOauthToken(token)
		setLoginUserName(userName)
	}, [setLoginUserName, setOauthToken])
	
	const logOut = React.useCallback((): void => {
		setUserProfile(null)
		setLoginUserName('')
		setOauthToken('')
		navigate('/login')
	}, [setUserProfile])
	
	const updateUserProfile = React.useCallback(() => {
		if (!userProfile) return
		(async () => {
			const userData = await fetchUserProfile(userProfile.login, userProfile.authToken) as UserProfile
			setUserProfile(userData)
			
			console.log('Profile updated,', userData.login)
		})()
	}, [userProfile, setUserProfile])
	
	React.useEffect(() => {
		if (!loginUserName && path === '/')
			navigate('/login')
	}, [location])
	
	React.useEffect(() => {
		// Check if user is already logged in
		if (userProfile || !loginUserName) return;
		
		(async () => {
			console.log(`Fetching ${ loginUserName }`)
			
			const userData = await fetchUserProfile(loginUserName, oauthToken)
			
			if (typeof userData === 'object')
				setUserProfile(userData)
			else switch (userData) {
				case 401:
					setLoginErrMessage('Wrong OAuth token.')
					break
				case 403:
					setLoginErrMessage('403: Forbidden')
					break
				case 404:
					setLoginErrMessage(`User ${ loginUserName } not found.`)
					break
				default:
					console.warn('Unknown error:', userData)
					
					setLoginUserName('')
					setOauthToken('')
			}
		})()
	}, [loginUserName])
	
	React.useEffect(() => {
		if (userProfile && (path === '/' || path === '/login')) {
			addRegisteredUser(userProfile.login)
			navigate('/profile')
		}
	}, [userProfile])
	
	return <ThemeProvider theme={ isDarkTheme ? darkTheme : lightTheme }>
		<CssBaseline />
		<div id={ 'app' }>
			<Header
				logOut={ logOut }
				loggedIn={ !!userProfile }
				isDarkTheme={ isDarkTheme }
				switchTheme={ () => switchTheme(prev => !prev) }
				updateUserProfile={ updateUserProfile }
			/>
			<Routes>
				<Route path={ '/' } element={ <Blank /> } />
				<Route path={ 'login' } element={
					<PrivateRoute condition={ !userProfile } redirect={ '/profile' }>
						<Login
							errorMessage={ loginErrMessage }
							isFocused={ isFocused }
							setUserProfile={ setUserProfileCallback }
							removeRegisteredUser={ removeRegisteredUser }
							registeredUsers={ registeredUsers }
						/>
					</PrivateRoute>
				} />
				<Route path={ 'profile' } element={
					<PrivateRoute condition={ !!userProfile } redirect={ '/login' }>
						<Profile userProfile={ userProfile! } />
					</PrivateRoute>
				} />
				<Route path={ '*' } element={ <NotFound /> } />
			</Routes>
		</div>
	</ThemeProvider>
}

export default App
