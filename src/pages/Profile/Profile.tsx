import * as React from 'react'
import { Container, Grid, Stack, Paper } from '@mui/material'

import RepoInfo from './RepoInfo'
import InfoSection from './InfoSection'
import RepoSection from './RepoSection'

import { UserProfile, GitHubRepo } from '../../types'

type ProfileProps = {
	user: UserProfile
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
	const isAuth = !!user.authToken
	
	const [showedRepo, setShowedRepo] = React.useState<GitHubRepo | null>(null)
	
	return <Container>
		<Grid container spacing={ 0 } sx={ { height: '92vh' } }>
			<Grid item xs={ 3 }>
				<InfoSection user={ user } isAuth={ isAuth } />
			</Grid>
			<Grid item xs={ 7 } display={ 'flex' } alignItems={ 'center' } justifyContent={ 'stretch' }>
				<RepoSection user={ user } isAuth={ isAuth } setShowedRepo={ setShowedRepo } />
			</Grid>
			<Grid item xs={ 2 }>
				<RepoInfo repo={ showedRepo } />
			</Grid>
		</Grid>
	</Container>
}

export default Profile
