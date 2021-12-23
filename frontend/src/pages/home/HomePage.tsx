import React, { useEffect } from 'react'
import { sessionState } from '../../user/SessionState'
import { LinearProgress } from '@mui/material'
import { Navigate } from 'react-router-dom'

const HomePage = () => {
  const session = sessionState.use()

  useEffect(() => {
    void session.fetchCurrentUser()
  }, [])

  return (
    <>
      <main>
        {session.isLoading && <LinearProgress />}
        {session.isCurrentUserGuest() && <Navigate to={'/signUp'} />}
        {session.isCurrentUserSender() && <Navigate to={'/sender'} />}
        {session.isCurrentUserDeliveryAgent() && <Navigate to={'/deliverer'} />}
      </main>
    </>
  )
}

export { HomePage }
