import * as React from 'react'
import { Paper, Stack } from '@mui/material'

import Repo from './Repo'

import { customScrollbar } from '../../../themes'

import { GitHubRepo } from '../../../types'

import { userContext } from '../../../App'

type RepoSectionProps = {
	setShowedRepo: (repo: GitHubRepo | null) => void
}

const ReposSection: React.FC<RepoSectionProps> = ({ setShowedRepo }) => {
	const user = React.useContext(userContext)
	
	const profile = user.profile!
	
	const repos: JSX.Element[] = profile.repos.map(r => (
			<Repo key={ r.id } repo={ r } setShowedRepo={ setShowedRepo } />
		)
	)
	
	return (
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
				{ profile.name ? profile.name!.split(' ')[0] : profile.login }'s repositories
			</Paper>
			{ repos }
		</Stack>
	)
}

export default ReposSection

