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

// 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

const App: React.FC = () => {
	const navigate = useNavigate();
	
	const [cookies, setCookie, removeCookie] = useCookies(['user-name', 'is-auth']);
	const [userProfile, setUserProfile] = React.useState<UserProfile | null>(null);
	const [loggedUserName, setLoggedUserName] = React.useState<string>(cookies['user-name'] || '');
	const [userNotFoundLogin, setUserNotFoundLogin] = React.useState<string>('');
	
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
	
	const setUserProfileCallback = React.useCallback((userName: string) => {
		setLoggedUserName(userName);
	}, [setLoggedUserName]);
	
	const logOut = React.useCallback(() => {
		removeCookie('user-name');
		setLoggedUserName('');
		setUserProfile(null);
	}, [removeCookie, setLoggedUserName, setUserProfile]);
	
	React.useEffect(() => {
		if (userProfile || !loggedUserName.length) return;
		// Fetch user profile on App load
		axios.get(`https://api.github.com/users/${ loggedUserName }`)
			.then(res => {
				setUserProfile(res.data);
			})
			.catch((err: AxiosError) => {
				if (err.response?.status === 404)
					setUserNotFoundLogin(loggedUserName);
				else
					console.log('axios err:', err);
			});
	}, [loggedUserName, userProfile]);
	
	React.useEffect(() => {
		if (userProfile) {
			setCookie('user-name', userProfile.login);
			navigate('/profile');
		}
	}, [userProfile]);
	
	return <ThemeProvider theme={ globalTheme }>
		<div className={ 'container' }>
			<Header onLogOut={ logOut } loggedIn={ !!userProfile }/>
			<Routes>
				<Route path={ '/' } element={ <Login
					setUserNotFoundLogin={ setUserNotFoundLogin }
					userNotFoundLogin={ userNotFoundLogin }
					setUserProfile={ setUserProfileCallback }
					addRegisteredUser={ addRegisteredUser }
					removeRegisteredUser={ removeRegisteredUser }
					getRegisteredUsers={ getRegisteredUsers }
				/> }/>
				<Route path={ '/profile' } element={ <Profile userProfile={ userProfile }/> }/>
			</Routes>
		</div>
	</ThemeProvider>;
};

export default App;
