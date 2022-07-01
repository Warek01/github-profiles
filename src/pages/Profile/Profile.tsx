import * as React from 'react';
import { UserProfile } from '../../types';
import { useNavigate } from 'react-router-dom';

type ProfileProps = {
	userProfile: UserProfile | null;
}

const Profile: React.FC<ProfileProps> = ({ userProfile }) => {
	const navigate = useNavigate();
	
	// If application is loading on '/profile' with no cached username, force location to '/'
	if (!userProfile) location.assign('/');
	
	// If above check was passed, then it is not null
	const user = userProfile!;
	const isAuth = user.auth;
	console.log(user);
	
	return <>
		<h1>{ user.name }. { user.bio }</h1>
	</>;
};

export default Profile;
