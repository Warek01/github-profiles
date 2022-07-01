import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { ThemeProvider } from '@mui/material';
import axios, { AxiosError } from 'axios';

import Login from './pages/Login';
import Profile from './pages/Profile';
import Header from './components/Header';

import { UserProfile } from './types';
import globalTheme from './Theme';

const App: React.FC = () => {
	const navigate = useNavigate();
	
	const [cookies, setCookie, removeCookie] = useCookies(['user', 'is-auth']);
	const [userProfile, setUserProfile] = React.useState<UserProfile | null>(null);
	const [loggedUserName, setLoggedUserName] = React.useState<string>(cookies['user']?.split(',')[0] || '');
	const [userNotFoundLogin, setUserNotFoundLogin] = React.useState<string>('');
	const [oauthToken, setOauthToken] = React.useState<string>(cookies['user']?.split(',')[1] || '');
	const [wrongOauthToken, setWrongOauthToken] = React.useState<boolean>(false);
	
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
		// Fetch user profile on App load
		const requestedTimestamp = Date.now();
		axios.get(`https://api.github.com/users/${ loggedUserName }`, {
			headers: {
				'Authorization': oauthToken ? `token ${ oauthToken }` : ''
			}
		})
			.then(res => {
				setUserProfile(obj => {
					return {
						requestedTimestamp,
						auth: !!oauthToken,
						...res.data
					};
				});
			})
			.catch((err: AxiosError) => {
				switch (err.response!.status) {
					case 401: // Unauthorized
						setWrongOauthToken(true);
						break;
					case 404: // Not found
						setUserNotFoundLogin(loggedUserName);
						break;
					default:
						console.log('axios err:', err);
				}
			});
	}, [loggedUserName, userProfile]);
	
	React.useEffect(() => {
		if (userProfile) {
			console.log(oauthToken);
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
					wrongOauthToken={ wrongOauthToken }
					isFocused={ isFocused }
					setUserNotFoundLogin={ setUserNotFoundLogin }
					userNotFoundLogin={ userNotFoundLogin }
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
