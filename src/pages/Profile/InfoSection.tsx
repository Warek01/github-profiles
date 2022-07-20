import * as React from 'react'
import { Grid, Tooltip, Avatar, Typography, Link, Collapse } from '@mui/material'
import {
	AccountBoxOutlined,
	InfoOutlined,
	PersonOutlined,
	LocationOnOutlined,
	PaidOutlined,
	Twitter,
	GitHub,
	PlaylistAdd
} from '@mui/icons-material'

import { UserProfile } from '../../types'

type InfoSectionProps = {
	user: UserProfile
	isAuth: boolean
}

const InfoSection: React.FC<InfoSectionProps> = ({ user, isAuth }) => {
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
	
	return <Grid item container={ true } display={ 'flex' } flexDirection={ 'column' }>
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
		<Grid item>
			<GitHub sx={ { fontSize: '1em', marginRight: '5px' } } />
			{ user.public_repos || 0 } public repos
		</Grid>
		<Grid item>
			<PlaylistAdd sx={ { fontSize: '1em', marginRight: '5px' } } />
			{ user.public_gists || 0 } public gists
		</Grid>
	</Grid>
}

export default InfoSection
