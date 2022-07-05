import * as React from 'react';
import { Paper, Link, Box, Button, IconButton, Typography, Tooltip, Zoom } from '@mui/material';
import { PublicOutlined, ShieldOutlined, DownloadOutlined, ContentCopy } from '@mui/icons-material';
import { teal } from '@mui/material/colors';

import GitHubRepo from '../../types/GitHubRepo';

type RepoProps = {
	props: GitHubRepo;
};

const Repo: React.FC<RepoProps> = ({ props }) => {
	const description = props.description ? (props.description.length > 40 ? `${ props.description.slice(0, 40) }...` : props.description) : '';
	
	return <Paper
		sx={ {
			minHeight: '100px',
			padding: '10px'
		} }
	>
		<Box mx={ 1 } sx={ {
			'&>:not(:first-of-type)': {
				marginLeft: '1ch'
			}
		} }>
			<Tooltip title={ 'Repository' } enterDelay={ 1000 } placement={ 'top' } TransitionComponent={ Zoom }>
				<Link href={ props.html_url }>
					{ props.name }
				</Link>
			</Tooltip>
			<Tooltip title={ 'Language' } enterDelay={ 1000 } placement={ 'top' } TransitionComponent={ Zoom }>
				<Typography component={ 'span' } sx={ { color: teal[400] } }>
					{ props.language }
				</Typography>
			</Tooltip>
			<Tooltip title={ 'Repo size' } enterDelay={ 1000 } placement={ 'top' } TransitionComponent={ Zoom }>
				<Typography component={ 'span' }>
					({ props.size } KB)
				</Typography>
			</Tooltip>
			<Tooltip title={ 'Description' } enterDelay={ 1000 } placement={ 'top' } TransitionComponent={ Zoom }>
				<Typography component={ 'span' }>
					{ description }
				</Typography>
			</Tooltip>
		</Box>
		<Box mx={ 1 }>
			<Tooltip title={ 'Copy git url' } placement={ 'top' } TransitionComponent={ Zoom }>
				<IconButton onClick={ () => navigator.clipboard.writeText(props.git_url) } size={ 'small' }>
					<ContentCopy/>
				</IconButton>
			</Tooltip>
		</Box>
	</Paper>;
};

export default Repo;

