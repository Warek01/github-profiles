import * as React from 'react'
import { Container, Grid } from '@mui/material'

import RepoInfoSection from './RepoInfoSection'
import InfoSection from './InfoSection'
import ReposSection from './ReposSection'

import { GitHubRepo } from '../../types'

import { snackbarContext } from '../../App'

const Profile: React.FC = () => {
	const snackbar = React.useContext(snackbarContext)
	
	const [showedRepo, setShowedRepo] = React.useState<GitHubRepo | undefined>(undefined)
	
	React.useEffect(() => {
		return () => {
			// Hide snackbar before unmounting
			snackbar.hide()
		}
	}, [])
	
	return (
		<Container>
			<Grid container spacing={ 0 } sx={ { height: '92vh' } }>
				<Grid item xs={ 3 }>
					<InfoSection />
				</Grid>
				<Grid item xs={ 6 } display='flex' alignItems='center' justifyContent='stretch'>
					<ReposSection setShowedRepo={ setShowedRepo } />
				</Grid>
				<Grid item xs={ 3 }>
					<RepoInfoSection repo={ showedRepo } />
				</Grid>
			</Grid>
		</Container>
	)
}

export default Profile
