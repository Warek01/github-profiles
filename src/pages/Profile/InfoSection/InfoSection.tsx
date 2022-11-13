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
  PlaylistAdd,
} from '@mui/icons-material'

import LangInfo from './LangInfo'
import { UserProfileContext } from 'context/user-profile'

const InfoSection: React.FC = () => {
  const avatarSize = React.useMemo(
    () => ({
      width: {
        lg: '128px',
        md: '128px',
        sm: '96px',
        xs: '64px',
      },
      height: {
        lg: '128px',
        md: '128px',
        sm: '96px',
        xs: '64px',
      },
    }),
    []
  )

  const { userProfile } = React.useContext(UserProfileContext)
  const isAuth = !!userProfile!.authToken

  if (!userProfile) return <></>

  return (
    <Grid item container={true} display="flex" flexDirection="column">
      <Grid item display="flex" justifyContent="center">
        <Tooltip title={userProfile!.login}>
          <Avatar src={userProfile!.avatar_url ?? ''} alt={userProfile!.login} sx={{ ...avatarSize, margin: '3vh 0' }}>
            {userProfile!.login[0]}
          </Avatar>
        </Tooltip>
      </Grid>
      <Grid item>
        <Typography component="span">
          <AccountBoxOutlined sx={{ fontSize: '1em', marginRight: '5px' }} />
          {userProfile.name ?? ''} <Link href={`https://github.com/${userProfile.login}`}>@{userProfile.login}</Link>
        </Typography>
      </Grid>
      <Grid item>
        <Collapse in={!!userProfile.bio}>
          <Typography>
            <InfoOutlined sx={{ fontSize: '1em', marginRight: '5px' }} />
            {userProfile.bio ?? ''}
          </Typography>
        </Collapse>
      </Grid>
      <Grid item>
        <PersonOutlined sx={{ fontSize: '1em', marginRight: '5px' }} />
        {userProfile.followers} followers, {userProfile.following} following
      </Grid>
      <Grid item>
        <Collapse in={!!userProfile.location}>
          <LocationOnOutlined sx={{ fontSize: '1em', marginRight: '5px' }} />
          {userProfile.location}
        </Collapse>
      </Grid>
      <Grid item>
        <Collapse in={isAuth}>
          <PaidOutlined sx={{ fontSize: '1em', marginRight: '5px' }} />
          Plan: {userProfile.plan?.name}
        </Collapse>
      </Grid>
      <Grid item>
        <Collapse in={isAuth && !!userProfile.twitter_username}>
          <Twitter sx={{ fontSize: '1em', marginRight: '5px' }} />
          {userProfile.twitter_username}
        </Collapse>
      </Grid>
      <Grid item>
        <GitHub sx={{ fontSize: '1em', marginRight: '5px' }} />
        {userProfile.public_repos ?? 0} public repos
      </Grid>
      <Grid item>
        <PlaylistAdd sx={{ fontSize: '1em', marginRight: '5px' }} />
        {userProfile.public_gists ?? 0} public gists
      </Grid>
      <Grid item sx={{ marginTop: '10px' }}>
        <LangInfo />
      </Grid>
    </Grid>
  )
}

export default InfoSection
