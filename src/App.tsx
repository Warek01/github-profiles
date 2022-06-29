import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import Login from './pages/Login';
import Profile from './pages/Profile';
import Header from './components/Header';

import { UserProfile } from './types';

const App: React.FC = () => {
	const navigate = useNavigate();
	
	const [cookies, setCookie, removeCookie] = useCookies(['user-name', 'is-auth', 'registered-users']);
	const [userProfile, setUserProfile] = React.useState<UserProfile | null>(null);
	const [name, setName] = React.useState<string>(cookies['user-name']);
	
	React.useEffect(() => {
		if (!name || name.length === 0) return;
		// Fetch user profile on App load
		axios.get(`https://api.github.com/users/${ name }`)
			.then(res => {
				setUserProfile(res.data);
			})
			.catch((err: Error) => {
				console.error(err);
			});
	}, [name]);
	
	React.useEffect(() => {
		if (userProfile) {
			navigate('/profile');
			setCookie('user-name', name);
		}
	}, [userProfile]);
	
	const getRegisteredUsers = (): string[] => {
		return cookies['registered-users'] ? cookies['registered-users'].split(',') : [];
	};
	
	const addRegisteredUser = (userName: string) => {
		const users: string[] = cookies['registered-users'] ? cookies['registered-users'].split(',') : [];
		users.push(userName);
		setCookie('registered-users', users.join(','));
	};
	
	const removeRegisteredUser = (userName: string) => {
	
	};
	
	const setUserProfileCallback = (userName: string) => {
		setName(userName);
	};
	
	const onLogOut = () => {
		removeCookie('user-name');
		setName('');
		setUserProfile(null);
	};
	
	return <div className={ 'container' }>
		<Header onLogOut={ onLogOut } loggedIn={ !!userProfile }/>
		<Routes>
			<Route path={ '/' } element={ <Login
				setUserProfile={ setUserProfileCallback }
				addRegisteredUser={ addRegisteredUser }
				removeRegisteredUser={ removeRegisteredUser }
				getRegisteredUsers={ getRegisteredUsers }
			/> }/>
			<Route path={ '/profile' } element={ <Profile userProfile={ userProfile }/> }/>
		</Routes>
	</div>;
};

export default App;
