import * as React from 'react';
import { UserProfile } from '../../types';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Avatar, Stack, Collapse, Link, Paper } from '@mui/material';
import { LocationOnOutlined, PersonOutlined, InfoOutlined } from '@mui/icons-material';

import GitHubRepo from '../../types/GitHubRepo';
import { customScrollbar } from '../../Theme';

import Repo from './Repo';

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
		
		const repos: JSX.Element[] = userRepos.map(r => <Repo props={ r }/>);
		
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
							sx={ { width: '128px', height: '128px', margin: '3vh 0' } }
						>
							{ user.login[0] }
						</Avatar>
					</Grid>
					<Grid item>
						{ user.name } <Link href={ `https://github.com/${ user.login }` }>@{ user.login }</Link>
					</Grid>
					<Grid item>
						<Collapse in={ !!user.bio }>
							<InfoOutlined sx={ { fontSize: '1em', marginRight: '5px' } }/>
							{ user.bio }
						</Collapse>
					</Grid>
					<Grid item>
						<PersonOutlined sx={ { fontSize: '1em', marginRight: '5px' } }/>
						{ user.followers } followers, { user.following } following
					</Grid>
					<Grid item>
						<Collapse in={ !!user.location }>
							<LocationOnOutlined sx={ { fontSize: '1em', marginRight: '5px' } }/>
							{ user.location }
						</Collapse>
					</Grid>
				</Grid>
				{ /* Repos */ }
				<Grid item xs={ 7 } display={ 'flex' } alignItems={ 'center' } justifyContent={ 'stretch' }>
					<Stack
						spacing={ 2 }
						sx={ {
							...customScrollbar,
							width: '100%',
							height: '86vh',
							overflow: 'auto',
							padding: '10px'
						} }
					>
						<Paper sx={ { textAlign: 'center' } } elevation={ 2 }>
							{ user.login }'s repositories
						</Paper>
						{ repos }
					</Stack>
				</Grid>
				{ /* Additional info */ }
				<Grid item xs={ 2 }>
					Additional info
				</Grid>
			</Grid>
		</Container>;
		
	} else {
		return <h3 className={ 'text-center' }>Redirecting ...</h3>;
	}
};

export default Profile;
