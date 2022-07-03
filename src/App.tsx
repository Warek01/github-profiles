import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { ThemeProvider } from '@mui/material';
import axios, { AxiosError } from 'axios';

import Login from './pages/Login';
import Profile from './pages/Profile';
import Header from './components/Header';

import { UserProfile, GitHubHttpError } from './types';
import globalTheme from './Theme';

const App: React.FC = () => {
	const navigate = useNavigate();
	
	const [cookies, setCookie, removeCookie] = useCookies(['user', 'is-auth']);
	const [userProfile, setUserProfile] = React.useState<UserProfile | null>(null);
	const [loggedUserName, setLoggedUserName] = React.useState<string>(cookies['user']?.split(',')[0] || '');
	const [oauthToken, setOauthToken] = React.useState<string>(cookies['user']?.split(',')[1] || '');
	const [loginErrMessage, setLoginErrMessage] = React.useState<string>('');
	
	const isFocused = React.useCallback((element: Element) => document.activeElement! === element, []);
	
	const getRegisteredUsers = React.useCallback((): string[] => {
		return JSON.parse(localStorage.getItem('registered-users') || '[]');
	}, []);
	
	const saveRegisteredUsers = React.useCallback((logins: string[]): void => {
		localStorage.setItem('registered-users', JSON.stringify(logins));
	}, []);
	
	const addRegisteredUser = React.useCallback((login: string): void => {
		const users = getRegisteredUsers();
		if (users.find(value => value === login)) return;
		saveRegisteredUsers([...users, login]);
	}, []);
	
	const removeRegisteredUser = React.useCallback((login: string): void => {
		saveRegisteredUsers(getRegisteredUsers().filter(value => value !== login));
	}, []);
	
	const setUserProfileCallback = React.useCallback((userName: string, token: string = '') => {
		setOauthToken(token);
		setLoggedUserName(userName);
	}, [setLoggedUserName]);
	
	const logOut = React.useCallback(() => {
		removeCookie('user');
		setLoggedUserName('');
		setUserProfile(null);
	}, [removeCookie, setLoggedUserName, setUserProfile]);
	
	React.useEffect(() => {
		if (userProfile || !loggedUserName) return;
		
		const requestedTimestamp = Date.now();
		
		(async () => {
			const req = await fetch(`https://api.github.com/users/${ loggedUserName }`, {
				method: 'GET',
				headers: {
					'Authorization': oauthToken ? `token ${ oauthToken }` : '',
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			});
			
			if (req.ok) {
				const res = await req.json();
				
				setUserProfile(obj => {
					return {
						requestedTimestamp,
						auth: !!oauthToken,
						...res
					};
				});
			} else {
				switch (req.status) {
					case 401:
						setLoginErrMessage('Wrong OAuth token.');
						break;
					case 404:
						setLoginErrMessage(`User ${ loggedUserName } not found.`);
						break;
					default:
						console.warn('Unknown error:', req);
				}
				
				setLoggedUserName('');
				setUserProfile(null);
			}
		})();
	}, [loggedUserName, userProfile]);
	
	React.useEffect(() => {
		if (userProfile) {
			setCookie('user', [userProfile.login, oauthToken].join(','));
			addRegisteredUser(userProfile.login);
			navigate('/profile');
		}
	}, [userProfile, oauthToken]);
	
	return <ThemeProvider theme={ globalTheme }>
		<div className={ 'container' }>
			<Header onLogOut={ logOut } loggedIn={ !!userProfile }/>
			<Routes>
				<Route path={ '/' } element={ <Login
					errorMessage={ loginErrMessage }
					isFocused={ isFocused }
					setUserProfile={ setUserProfileCallback }
					addRegisteredUser={ addRegisteredUser }
					removeRegisteredUser={ removeRegisteredUser }
					getRegisteredUsers={ getRegisteredUsers }
				/> }/>
				<Route path={ '/profile' } element={ <Profile
					userProfile={ userProfile }
				/> }/>
			</Routes>
		</div>
	</ThemeProvider>;
};

export default App;
