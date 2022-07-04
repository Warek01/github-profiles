import * as React from 'react';
import { Paper } from '@mui/material';
import { PublicOutlined, ShieldOutlined } from '@mui/icons-material';

import GitHubRepo from '../../types/GitHubRepo';

type RepoProps = {
	props: GitHubRepo;
};

const Repo: React.FC<RepoProps> = ({ props }) => {
	const visibilityIcon = props.visibility === 'public' ? <PublicOutlined color={ 'success' } fontSize={ 'small' }/> :
		<ShieldOutlined color={ 'error' } fontSize={ 'small' }/>;
	
	return <Paper
		key={ props.id }
		sx={ {
			minHeight: '100px',
			padding: '10px'
		} }
	>
		{ props.name } { visibilityIcon }
	</Paper>;
};

export default Repo;
