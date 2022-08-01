import * as React from 'react'
import { Container, Grid } from '@mui/material'

import RepoInfoSection from './RepoInfoSection'
import InfoSection from './InfoSection'
import ReposSection from './ReposSection'

import { GitHubRepo } from '../../types'

import { snackbarContext, userContext } from '../../App'

const Profile: React.FC = () => {
	const snackbar = React.useContext(snackbarContext)
	const user = React.useContext(userContext)
	
	const profile = user.profile!
	const isAuth = !!profile.authToken
	
	const [showedRepo, setShowedRepo] = React.useState<GitHubRepo | null>(null)
	
	React.useEffect(() => {
		snackbar.showThenHide(`Loaded in ${ profile.elapsedMs } ms`, 1500)
		
		return () => {
			// Hide snackbar before unmounting
			snackbar.hide()
		}
	}, [])
	
	return (
		<Container>
			<Grid container spacing={ 0 } sx={ { height: '92vh' } }>
				<Grid item xs={ 3 }>
					<InfoSection user={ profile } isAuth={ isAuth } />
				</Grid>
				<Grid item xs={ 6 } display='flex' alignItems='center' justifyContent='stretch'>
					<ReposSection user={ profile } isAuth={ isAuth } setShowedRepo={ setShowedRepo } />
				</Grid>
				<Grid item xs={ 3 }>
					<RepoInfoSection repo={ showedRepo } />
				</Grid>
			</Grid>
		</Container>
	)
}

export default Profile
