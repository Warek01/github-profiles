import * as React from 'react'
import { Box, Grid, Paper, Typography } from '@mui/material'

import { GitHubRepo } from '../../types'

type RepoInfoProps = {
	repo: GitHubRepo
}

const RepoInfo: React.FC<RepoInfoProps> = ({ repo }) => {
	return <>
		<Grid item sx={ { margin: '3vh 0', textAlign: 'center' } }>
			{ repo.name }
		</Grid>
		<Grid item>
			{ repo.description }
		</Grid>
	</>
}

export default RepoInfo
