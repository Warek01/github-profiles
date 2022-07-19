import * as React from 'react'
import { Paper, Link, Box, Button, IconButton, Typography, Tooltip, Zoom } from '@mui/material'
import { teal } from '@mui/material/colors'
import { RemoveRedEyeOutlined } from '@mui/icons-material'

import GitHubRepo from '../../types/GitHubRepo'

type RepoProps = {
	repo: GitHubRepo
	setShowedRepo: (repo: GitHubRepo | null) => void
};

const Repo: React.FC<RepoProps> = ({ repo, setShowedRepo }) => {
	// const description = repo.description ? (repo.description.length > 50 ? `${ repo.description.slice(0, 50) }...` : repo.description) : '';
	
	return <Paper
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
			<Tooltip title={ 'Repository' }>
				<Typography component={ 'span' }>
					<Link href={ repo.html_url }>
						{ repo.name }
					</Link>
				</Typography>
			</Tooltip>
			<Tooltip title={ 'Language' }>
				<Typography component={ 'span' } sx={ { color: teal[400] } }>
					{ repo.language }
				</Typography>
			</Tooltip>
			<Tooltip title={ 'Repo size' }>
				<Typography component={ 'span' }>
					({ repo.size } KB)
				</Typography>
			</Tooltip>
			<Tooltip title={ 'Description' }>
				<Typography component={ 'span' }>
					{ repo.description }
				</Typography>
			</Tooltip>
			<Tooltip title={ 'Watchers' }>
				<Typography component={ 'span' } sx={ { display: 'inline-flex', alignItems: 'center' } }>
					{ repo.watchers_count }
					<RemoveRedEyeOutlined fontSize={ 'inherit' } />
				</Typography>
			</Tooltip>
		</Box>
	</Paper>
}

export default Repo

