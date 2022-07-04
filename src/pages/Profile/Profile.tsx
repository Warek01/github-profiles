import * as React from 'react';
import { UserProfile } from '../../types';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Avatar } from '@mui/material';
import { LocationOnOutlined, PersonOutlined, InfoOutlined } from '@mui/icons-material';
import GitHubRepo from '../../types/GitHubRepo';

type ProfileProps = {
	userProfile: UserProfile | null;
	userRepos: GitHubRepo[];
}

const Profile: React.FC<ProfileProps> = ({ userProfile, userRepos }) => {
	console.log(userRepos);
	const navigate = useNavigate();
	
	React.useEffect(() => {
		if (userProfile) {
		
		} else {
			navigate('/');
		}
	}, []);
	
	if (userProfile) {
		const user = userProfile;
		const isAuth = user.auth;
		
		return <Container>
			<Grid container spacing={ 0 } sx={ { height: '92vh' } }>
				{ /* Main Profile */ }
				<Grid
					item
					container={ true }
					xs={ 3 }
					display={ 'flex' }
					flexDirection={ 'column' }
				>
					<Grid item display={ 'flex' } justifyContent={ 'center' }>
						<Avatar
							src={ user.avatar_url || '' }
							alt={ user.login }
							sx={ { width: '128px', height: '128px' } }
						>
							{ user.login[0] }
						</Avatar>
					</Grid>
					<Grid item>
						{ user.name } @{ user.login }
					</Grid>
					<Grid item>
						<InfoOutlined sx={ { fontSize: '1em', marginRight: '5px' } }/>
						{ user.bio }
					</Grid>
					<Grid item>
						<PersonOutlined sx={ { fontSize: '1em', marginRight: '5px' } }/>
						{ user.followers } followers, { user.following } following
					</Grid>
					<Grid item>
						<LocationOnOutlined sx={ { fontSize: '1em', marginRight: '5px' } }/> { user.location }
					</Grid>
				</Grid>
				{ /* Repos */ }
				<Grid item xs={ 7 }>
				
				</Grid>
				{ /*  */ }
				<Grid item xs={ 2 }>
				
				</Grid>
			</Grid>
		</Container>;
		
	} else {
		return <h3 className={ 'text-center' }>Redirecting ...</h3>;
	}
};

export default Profile;
