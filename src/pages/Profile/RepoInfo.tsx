import * as React from 'react'
import { Collapse, Grid } from '@mui/material'

import { GitHubRepo } from '../../types'

type RepoInfoProps = {
	repo: GitHubRepo | null
}

const RepoInfo: React.FC<RepoInfoProps> = ({ repo }) => {
	return !!repo ? <>
		<Grid item sx={ { margin: '3vh 0', textAlign: 'center' } }>
			{ repo!.name }
		</Grid>
		<Grid item>
			{ repo!.description }
		</Grid>
	</> : <></>
}

export default RepoInfo
