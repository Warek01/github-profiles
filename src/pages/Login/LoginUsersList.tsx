import * as React from 'react'
import { IconButton, Button, Grid, Paper, Box, Stack } from '@mui/material'
import { Delete, DoDisturbOutlined } from '@mui/icons-material'

import { customScrollbar } from '../../themes'

type PrevUsersProps = {
  logFromUser: (userName: string) => void
  registeredUsers: string[]
  removeRegisteredUser: (name: string) => void
  maxHeight: string
  customWidth: object
  margin: string
}

const LoginUsersList: React.FC<PrevUsersProps> = ({
  logFromUser,
  registeredUsers,
  removeRegisteredUser,
  maxHeight = '400px',
  customWidth = {},
  margin = '0',
}) => {
  const [deletedUser, setDeletedUser] = React.useState<string>('')

  const users: JSX.Element[] = registeredUsers.map(login => (
    <Paper key={login} sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 10px' }}>
      <Button onClick={() => logFromUser(login)}>{login}</Button>
      <IconButton
        color="primary"
        onClick={() => {
          setDeletedUser(login)
          removeRegisteredUser(login)
        }}>
        <Delete />
      </IconButton>
    </Paper>
  ))

  const noUsersElement: JSX.Element = (
    <Box p={0} m={0}>
      <Paper sx={{ width: '50%', margin: '16px auto 0 auto' }}>
        <DoDisturbOutlined sx={{ fontSize: '1em', marginRight: '3px' }} />
        None
      </Paper>
    </Box>
  )

  return (
    <Grid container justifyContent="center" sx={{ margin, maxHeight }}>
      <Box p={1} sx={{ overflow: 'auto', maxHeight, ...customWidth, ...customScrollbar }}>
        <Stack spacing={2} sx={{ textAlign: 'center' }}>
          <Paper elevation={2}>Previous users</Paper>
          {!!users.length ? users : noUsersElement}
        </Stack>
      </Box>
    </Grid>
  )
}

export default LoginUsersList
