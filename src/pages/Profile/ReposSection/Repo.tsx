import * as React from 'react'
import { Paper, Link, Box, Typography, Tooltip } from '@mui/material'

import GitHubRepo from '../../../types/GitHubRepo'

type RepoProps = {
	repo: GitHubRepo
	setShowedRepo: (repo: GitHubRepo | null) => void
};

const Repo: React.FC<RepoProps> = ({ repo, setShowedRepo }) => {
	const description = repo.description ? (repo.description.length > 30 ? `${ repo.description.slice(0, 30) }...` : repo.description) : ''
	
	return (
		<Paper
			sx={ {
				maxHeight: 'none',
				height: 'auto',
				padding: '10px',
				cursor: 'pointer'
			} }
			onClick={ () => setShowedRepo(repo) }
		>
			<Box mx={ 1 } sx={ {
				height: 'auto',
				'&>:not(:first-of-type)': {
					marginLeft: '1ch'
				}
			} }>
				<Tooltip title='Repository'>
					<Typography component='span'>
						<Link href={ repo.html_url }>
							{ repo.name }
						</Link>
					</Typography>
				</Tooltip>
				<Tooltip title='Description'>
					<Typography component='span'>
						{ description }
					</Typography>
				</Tooltip>
			</Box>
		</Paper>
	)
}

export default Repo
