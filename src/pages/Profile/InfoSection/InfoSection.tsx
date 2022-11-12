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

import { userContext } from '../../../App'

const InfoSection: React.FC = () => {
  const user = React.useContext(userContext)

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

  const profile = user.profile!
  const isAuth = !!profile.authToken

  return (
    <Grid item container={true} display="flex" flexDirection="column">
      <Grid item display="flex" justifyContent="center">
        <Tooltip title={profile.login}>
          <Avatar src={profile.avatar_url ?? ''} alt={profile.login} sx={{ ...avatarSize, margin: '3vh 0' }}>
            {profile.login[0]}
          </Avatar>
        </Tooltip>
      </Grid>
      <Grid item>
        <Typography component="span">
          <AccountBoxOutlined sx={{ fontSize: '1em', marginRight: '5px' }} />
          {profile.name ?? ''} <Link href={`https://github.com/${profile.login}`}>@{profile.login}</Link>
        </Typography>
      </Grid>
      <Grid item>
        <Collapse in={!!profile.bio}>
          <Typography>
            <InfoOutlined sx={{ fontSize: '1em', marginRight: '5px' }} />
            {profile.bio ?? ''}
          </Typography>
        </Collapse>
      </Grid>
      <Grid item>
        <PersonOutlined sx={{ fontSize: '1em', marginRight: '5px' }} />
        {profile.followers} followers, {profile.following} following
      </Grid>
      <Grid item>
        <Collapse in={!!profile.location}>
          <LocationOnOutlined sx={{ fontSize: '1em', marginRight: '5px' }} />
          {profile.location}
        </Collapse>
      </Grid>
      <Grid item>
        <Collapse in={isAuth}>
          <PaidOutlined sx={{ fontSize: '1em', marginRight: '5px' }} />
          Plan: {profile.plan?.name}
        </Collapse>
      </Grid>
      <Grid item>
        <Collapse in={isAuth && !!profile.twitter_username}>
          <Twitter sx={{ fontSize: '1em', marginRight: '5px' }} />
          {profile.twitter_username}
        </Collapse>
      </Grid>
      <Grid item>
        <GitHub sx={{ fontSize: '1em', marginRight: '5px' }} />
        {profile.public_repos ?? 0} public repos
      </Grid>
      <Grid item>
        <PlaylistAdd sx={{ fontSize: '1em', marginRight: '5px' }} />
        {profile.public_gists ?? 0} public gists
      </Grid>
      <Grid item sx={{ marginTop: '10px' }}>
        <LangInfo />
      </Grid>
    </Grid>
  )
}

export default InfoSection
