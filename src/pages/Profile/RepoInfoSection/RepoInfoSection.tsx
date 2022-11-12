import * as React from 'react'
import { Grid, Paper } from '@mui/material'
import {
  InfoOutlined,
  SdCardOutlined,
  Terminal,
  RemoveRedEyeOutlined,
  AccessTime,
  ForkRight,
  Topic,
} from '@mui/icons-material'
import { green, red } from '@mui/material/colors'
import dateFormat from 'dateformat'

import { GitHubRepo } from '../../../types'

import { convertKB } from '../../../utils'

import { RoundBgText, StartIconText } from '../../../components'

type RepoInfoProps = {
  repo?: GitHubRepo
}

const RepoInfoSection: React.FC<RepoInfoProps> = ({ repo }) => {
  if (!repo) return <></>

  return (
    <Paper sx={{ width: '90%', margin: '3vh 0 0 10%', padding: '10px' }}>
      <Grid item sx={{ textAlign: 'center', color: 'primary.main' }}>
        {repo.name}
      </Grid>
      <Grid item>
        <RoundBgText
          text={repo.private ? 'Private' : 'Public'}
          bg={repo.private ? red[500] : green[300]}
          tooltip="Visibility"
        />
        <RoundBgText
          text={repo.license?.key ?? 'No license'}
          bg={!repo.license ? red[500] : green[300]}
          tooltip="License"
        />
      </Grid>
      <Grid item>
        <StartIconText
          condition={!!repo.description}
          text={repo.description}
          icon={<InfoOutlined fontSize="small" sx={{ marginRight: '5px' }} />}
          tooltip="Description"
        />
      </Grid>
      <Grid item>
        <StartIconText
          condition={!!repo.language}
          text={repo.language}
          icon={<Terminal fontSize="small" sx={{ marginRight: '5px' }} />}
          tooltip="Language"
        />
      </Grid>
      <Grid item>
        <StartIconText
          condition={!!repo.created_at}
          text={dateFormat(repo.created_at, 'dd/mm/yyyy hh:mm')}
          icon={<AccessTime fontSize="inherit" sx={{ marginRight: '5px' }} />}
          tooltip="Creation date"
        />
      </Grid>
      <Grid item>
        <StartIconText
          condition={!!repo.size}
          text={convertKB(repo.size)}
          icon={<SdCardOutlined fontSize="small" sx={{ marginRight: '5px' }} />}
          tooltip="Size"
        />
      </Grid>
      <Grid item>
        <StartIconText
          condition={!!repo.watchers_count}
          text={convertKB(repo.watchers_count)}
          icon={<RemoveRedEyeOutlined fontSize="inherit" sx={{ marginRight: '5px' }} />}
          tooltip="Watchers count"
        />
      </Grid>
      <Grid item>
        <StartIconText
          condition={!Number.isNaN(repo.forks)}
          text={`${repo.forks}, allowed: ${repo.allow_forking.toString()}`}
          icon={<ForkRight fontSize="inherit" sx={{ marginRight: '5px' }} />}
          tooltip="Forks count"
        />
      </Grid>
      <Grid item>
        <StartIconText
          condition={!!repo.topics}
          text={repo.topics.join(', ') || 'None'}
          icon={<Topic fontSize="inherit" sx={{ marginRight: '5px' }} />}
          tooltip="Topics"
        />
      </Grid>
    </Paper>
  )
}

export default RepoInfoSection
