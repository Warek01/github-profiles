import * as React from 'react'
import { Paper, Stack } from '@mui/material'

import Repo from './Repo'

import { customScrollbar } from '../../Themes'

import { UserProfile, GitHubRepo } from '../../types'

type RepoSectionProps = {
	user: UserProfile
	isAuth: boolean
	setShowedRepo: (repo: GitHubRepo | null) => void
}

const RepoSection: React.FC<RepoSectionProps> = ({ user, isAuth, setShowedRepo }) => {
	const repos: JSX.Element[] = user.repos.map(r => <Repo key={ r.id } repo={ r }
	                                                       setShowedRepo={ setShowedRepo } />)
	
	return <Stack
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
			{ user.name.split(' ')[0] }'s repositories
		</Paper>
		{ repos }
	</Stack>
}

export default RepoSection

