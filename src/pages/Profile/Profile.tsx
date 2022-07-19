import * as React from 'react'
import { Container, Grid, Avatar, Stack, Collapse, Link, Paper, Typography, Tooltip } from '@mui/material'
import {
	LocationOnOutlined,
	PersonOutlined,
	InfoOutlined,
	AccountBoxOutlined,
	PaidOutlined,
	Twitter
} from '@mui/icons-material'

import Repo from './Repo'
import RepoInfo from './RepoInfo'

import { UserProfile, GitHubRepo } from '../../types'

import { customScrollbar } from '../../Themes'

type ProfileProps = {
	userProfile: UserProfile
}

const Profile: React.FC<ProfileProps> = ({ userProfile }) => {
	console.log(userProfile)
	
	const avatarSize = React.useMemo(() => {
		return {
			width: {
				lg: '128px',
				md: '128px',
				sm: '96px',
				xs: '64px'
			}, height: {
				lg: '128px',
				md: '128px',
				sm: '96px',
				xs: '64px'
			}
		}
	}, [])
	
	const [showedRepo, setShowedRepo] = React.useState<GitHubRepo | null>(null)
	
	const user = userProfile
	const isAuth = !!user.authToken
	
	const repos: JSX.Element[] = userProfile.repos.map(r => <Repo key={ r.id } repo={ r }
	                                                              setShowedRepo={ setShowedRepo } />)
	
	return <Container>
		<Grid container spacing={ 0 } sx={ { height: '92vh' } }>
			{ /* Main Profile */ }
			<Grid
				item
				container={ true }
				xs={ 3 }
				display={ 'flex' }
				flexDirection={ 'column' }
			>
				<Grid item display={ 'flex' } justifyContent={ 'center' }>
					<Tooltip title={ user.login }>
						<Avatar
							src={ user.avatar_url || '' }
							alt={ user.login }
							sx={ { ...avatarSize, margin: '3vh 0' } }
						>
							{ user.login[0] }
						</Avatar>
					</Tooltip>
				</Grid>
				<Grid item>
					<Typography component={ 'span' }>
						<AccountBoxOutlined sx={ { fontSize: '1em', marginRight: '5px' } } />
						{ user.name } <Link href={ `https://github.com/${ user.login }` }>@{ user.login }</Link>
					</Typography>
				</Grid>
				<Grid item>
					<Collapse in={ !!user.bio }>
						<Typography>
							<InfoOutlined sx={ { fontSize: '1em', marginRight: '5px' } } />
							{ user.bio }
						</Typography>
					</Collapse>
				</Grid>
				<Grid item>
					<PersonOutlined sx={ { fontSize: '1em', marginRight: '5px' } } />
					{ user.followers } followers, { user.following } following
				</Grid>
				<Grid item>
					<Collapse in={ !!user.location }>
						<LocationOnOutlined sx={ { fontSize: '1em', marginRight: '5px' } } />
						{ user.location }
					</Collapse>
				</Grid>
				<Grid item>
					<Collapse in={ isAuth }>
						<PaidOutlined sx={ { fontSize: '1em', marginRight: '5px' } } />
						Plan: { user.plan?.name }
					</Collapse>
				</Grid>
				<Grid item>
					<Collapse in={ isAuth && !!user.twitter_username }>
						<Twitter sx={ { fontSize: '1em', marginRight: '5px' } } />
						{ user.twitter_username }
					</Collapse>
				</Grid>
			</Grid>
			{ /* Repos */ }
			<Grid item xs={ 7 } display={ 'flex' } alignItems={ 'center' } justifyContent={ 'stretch' }>
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
						{ user.name.split(' ')[0] }'s repositories
					</Paper>
					{ repos }
				</Stack>
			</Grid>
			{ /* Additional info */ }
			<Grid item xs={ 2 }>
				{ showedRepo ? <RepoInfo repo={ showedRepo } /> : null }
			</Grid>
		</Grid>
	</Container>
}

export default Profile
