import React, { FC } from 'react'
import { AppBar, Button, Link, Toolbar } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import LoginIcon from '@mui/icons-material/Login'

const CreateAccountAppBar: FC = () => {
  return (
    <AppBar>
      <Toolbar>
        <Button variant={'outlined'}>
          <Link sx={{ color: 'white' }} to={'/login'} component={RouterLink}>
            log in instead <LoginIcon />
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export { CreateAccountAppBar }
