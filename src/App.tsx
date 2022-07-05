import React from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { ThemeProvider } from '@mui/material';

import Login from './pages/Login';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Header from './components/Header';

import { UserProfile, GithubUserProfile } from './types';
import globalTheme from './Theme';
import Blank from './pages/Blank';
import GitHubRepo from './types/GitHubRepo';

const App: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	
	const path = location.pathname;
	
	const [cookies, setCookie, removeCookie] = useCookies(['user', 'is-auth']);
	const [userProfile, setUserProfile] = React.useState<UserProfile | null>(null);
	const [userRepos, setUserRepos] = React.useState<GitHubRepo[] | []>([]);
	const [loggedUserName, setLoggedUserName] = React.useState<string>(cookies['user']?.split(',')[0] || '');
	const [oauthToken, setOauthToken] = React.useState<string>(cookies['user']?.split(',')[1] || '');
	const [loginErrMessage, setLoginErrMessage] = React.useState<string>('');
	
	const isFocused = React.useCallback((element: Element): boolean => document.activeElement! === element, []);
	
	const getRegisteredUsers = React.useCallback((): string[] => {
		return JSON.parse(localStorage.getItem('registered-users') || '[]');
	}, []);
	
	const saveRegisteredUsers = React.useCallback((logins: string[]): void => {
		localStorage.setItem('registered-users', JSON.stringify(logins));
	}, []);
	
	const addRegisteredUser = React.useCallback((login: string): void => {
		if (!login) return;
		const users = getRegisteredUsers();
		if (users.find(value => value === login)) return;
		saveRegisteredUsers([...users, login]);
	}, [saveRegisteredUsers, getRegisteredUsers]);
	
	const removeRegisteredUser = React.useCallback((login: string): void => {
		saveRegisteredUsers(getRegisteredUsers().filter(value => value !== login));
	}, [saveRegisteredUsers, getRegisteredUsers]);
	
	const setUserProfileCallback = React.useCallback((userName: string, token: string = ''): void => {
		setOauthToken(token);
		setLoggedUserName(userName);
	}, [setLoggedUserName]);
	
	const logOut = React.useCallback((): void => {
		removeCookie('user');
		setLoggedUserName('');
		setUserProfile(null);
		setOauthToken('');
		navigate('/login');
	}, [removeCookie, setLoggedUserName, setUserProfile, setOauthToken]);
	
	React.useEffect(() => {
		if (!loggedUserName && path === '/')
			navigate('/login');
	}, [location]);
	
	React.useEffect(() => {
		// Check if user is already logged in
		if (userProfile || !loggedUserName) return;
		
		(async () => {
			const requestedTimestamp = Date.now();
			
			// Fetch user data
			const profileReq = await fetch(`https://api.github.com/users/${ loggedUserName }`, {
				method: 'GET',
				headers: {
					'Authorization': oauthToken ? `token ${ oauthToken }` : '',
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			});
			
			if (profileReq.ok) {
				const profileRes = await profileReq.json() as GithubUserProfile;
				
				setUserProfile({
						requestedTimestamp,
						auth: !!oauthToken,
						...profileRes
					});
				
				// Fetch user repositories
				const reposReq = await fetch(profileRes.repos_url, {
					method: 'GET',
					headers: {
						'Authorization': oauthToken ? `token ${ oauthToken }` : '',
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					}
				});
				
				if (reposReq.ok) {
					const reposRes = await reposReq.json() as GitHubRepo[];
					
					setUserRepos(reposRes);
				}
				
			} else {
				switch (profileReq.status) {
					case 401:
						setLoginErrMessage('Wrong OAuth token.');
						break;
					case 404:
						setLoginErrMessage(`User ${ loggedUserName } not found.`);
						break;
					default:
						console.warn('Unknown error:', profileReq);
				}
				
				logOut();
			}
		})();
	}, [loggedUserName, userProfile]);
	
	React.useEffect(() => {
		if (userProfile && (path === '/' || path === '/login')) {
			setCookie('user', [userProfile.login, oauthToken].join(','));
			addRegisteredUser(userProfile.login);
			navigate('/profile');
		}
	}, [userProfile, oauthToken]);
	
	return <ThemeProvider theme={ globalTheme }>
		<div className={ 'container' }>
			<Header logOut={ logOut } loggedIn={ !!userProfile }/>
			<Routes>
				<Route path={ '/' } element={ <Blank/> }/>
				<Route path={ 'login' } element={ <Login
					errorMessage={ loginErrMessage }
					isFocused={ isFocused }
					setUserProfile={ setUserProfileCallback }
					addRegisteredUser={ addRegisteredUser }
					removeRegisteredUser={ removeRegisteredUser }
					getRegisteredUsers={ getRegisteredUsers }
				/> }/>
				<Route path={ 'profile' } element={ <Profile userProfile={ userProfile } userRepos={ userRepos }/> }/>
				<Route path={ '*' } element={ <NotFound/> }/>
			</Routes>
		</div>
	</ThemeProvider>;
};

export default App;
