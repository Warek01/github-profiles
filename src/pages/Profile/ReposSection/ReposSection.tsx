import * as React from 'react'
import { Paper, Stack } from '@mui/material'

import Repo from './Repo'
import { customScrollbar } from '../../../themes'
import { GitHubRepo } from '../../../types'
import { UserProfileContext } from '../../../context/user-profile'

type RepoSectionProps = {
  setShowedRepo: (repo: GitHubRepo | undefined) => void
}

const ReposSection: React.FC<RepoSectionProps> = ({ setShowedRepo }) => {
  const { userProfile } = React.useContext(UserProfileContext)

  const repos: JSX.Element[] = userProfile!.repos.map(r => <Repo key={r.id} repo={r} setShowedRepo={setShowedRepo} />)

  return (
    <Stack
      spacing={2}
      sx={{
        ...customScrollbar,
        width: '100%',
        height: '86vh',
        overflow: 'auto',
        padding: '10px',
      }}>
      <Paper sx={{ textAlign: 'center' }} elevation={2}>
        {userProfile!.name ? userProfile!.name!.split(' ')[0] : userProfile!.login}'s repositories
      </Paper>
      {repos}
    </Stack>
  )
}

export default ReposSection
