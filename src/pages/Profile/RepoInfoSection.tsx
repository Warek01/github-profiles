import * as React from 'react'
import { Collapse, Grid, Paper, Typography, Tooltip, Box } from '@mui/material'
import {
	InfoOutlined,
	SdCardOutlined,
	Terminal,
	RemoveRedEyeOutlined,
	AccessTime,
	ForkRight,
	Topic
} from '@mui/icons-material'
import { teal, green, red } from '@mui/material/colors'
import dateFormat from 'dateformat'

import { GitHubRepo } from '../../types'

import { convertKB } from '../../utils'

type RepoInfoProps = {
	repo: GitHubRepo | null
}

const RepoInfoSection: React.FC<RepoInfoProps> = ({ repo }) => {
	if (repo) {
		
		return <Paper sx={ { width: '90%', margin: '3vh 0 0 10%', padding: '10px' } }>
			<Grid item sx={ { textAlign: 'center', color: 'primary.main' } }>
				{ repo.name }
			</Grid>
			<Grid item>
				<Typography sx={ {
					backgroundColor: repo.private ? red[500] : green[300],
					padding: '.25em .5em',
					borderRadius: '1em',
					fontSize: '.75em',
					cursor: 'default',
					margin: '0 5px'
				} } component={ 'span' }>
					{ repo.private ? 'Private' : 'Public' }
				</Typography>
				<Typography sx={ {
					backgroundColor: !repo.license ? red[500] : green[300],
					padding: '.25em .5em',
					borderRadius: '1em',
					fontSize: '.75em',
					cursor: 'default',
					margin: '0 5px'
				} } component={ 'span' }>
					{ !repo.license ? 'No license' : repo.license.key }
				</Typography>
			</Grid>
			<Grid item>
				<Collapse in={ !!repo.description }>
					<Tooltip title={ 'Description' }>
						<Typography>
							<InfoOutlined fontSize={ 'small' } sx={ { marginRight: '5px' } } />
							{ repo.description }
						</Typography>
					</Tooltip>
				</Collapse>
			</Grid>
			<Grid item>
				<Collapse in={ !!repo.language }>
					<Tooltip title={ 'Language' }>
						<Terminal fontSize={ 'small' } sx={ { marginRight: '5px' } } />
					</Tooltip>
					<Tooltip title={ 'Language' }>
						<Typography component={ 'span' } sx={ { color: teal[400] } }>
							{ repo.language }
						</Typography>
					</Tooltip>
				</Collapse>
			</Grid>
			<Grid item>
				<Tooltip title={ 'Created at' }>
					<AccessTime fontSize={ 'inherit' } sx={ { marginRight: '5px' } } />
				</Tooltip>
				<Tooltip title={ 'Created at' }>
					<span>
						{ dateFormat(repo.created_at, 'dd/mm/yyyy hh:mm') }
					</span>
				</Tooltip>
			</Grid>
			<Grid item>
				<Tooltip title={ 'Size' }>
					<SdCardOutlined fontSize={ 'small' } sx={ { marginRight: '5px' } } />
				</Tooltip>
				<Tooltip title={ 'Size' }>
					<span>
						{ convertKB(repo.size) }
					</span>
				</Tooltip>
			</Grid>
			<Grid item>
				<Tooltip title={ 'Watchers' }>
					<RemoveRedEyeOutlined fontSize={ 'inherit' } sx={ { marginRight: '5px' } } />
				</Tooltip>
				<Tooltip title={ 'Watchers' }>
					<span>
						{ repo.watchers_count }
					</span>
				</Tooltip>
			</Grid>
			<Grid item>
				<Tooltip title={ 'Forks' }>
					<ForkRight fontSize={ 'inherit' } sx={ { marginRight: '5px' } } />
				</Tooltip>
				<Tooltip title={ 'Forks' }>
					<span>
						{ repo.forks }, allowed: { repo.allow_forking.toString() }
					</span>
				</Tooltip>
			</Grid>
			<Grid item>
				<Tooltip title={ 'Topics' }>
					<Topic fontSize={ 'inherit' } sx={ { marginRight: '5px' } } />
				</Tooltip>
				<Tooltip title={ 'Topics' }>
					<span>
						{ repo.topics.join(', ') || 'None' }
					</span>
				</Tooltip>
			</Grid>
		</Paper>
	} else {
		return <></>
	}
}

export default RepoInfoSection
