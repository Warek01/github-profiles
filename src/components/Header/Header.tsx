import React from 'react'
import { Container, Button, Grid, Box, Collapse } from '@mui/material'
import { Logout, Loop } from '@mui/icons-material'
import { grey } from '@mui/material/colors'

import ThemeSwitch from './ThemeSwitch'

type HeaderProps = {
  logOut: () => void
  loggedIn: boolean
  updateUserProfile: () => void
}

const Header: React.FC<HeaderProps> = ({ logOut, loggedIn, updateUserProfile }) => {
  return (
    <Box sx={{ height: '8vh', borderBottom: '1px solid', borderColor: grey[400] }}>
      <Container sx={{ height: '100%' }}>
        <Grid container sx={{ height: '100%' }} display="flex" justifyContent="space-between" alignItems="center">
          <ThemeSwitch />
          <Collapse in={loggedIn}>
            <Button
              sx={{ marginRight: '10px' }}
              onClick={logOut}
              variant="contained"
              size="small"
              startIcon={<Logout />}>
              log out
            </Button>
            <Button onClick={updateUserProfile} variant="contained" size="small" startIcon={<Loop />}>
              Refresh
            </Button>
          </Collapse>
        </Grid>
      </Container>
    </Box>
  )
}

export default Header
