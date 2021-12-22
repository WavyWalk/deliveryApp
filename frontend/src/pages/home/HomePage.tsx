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
        {session.loading && <LinearProgress/>}
        {session.isCurrentUserGuest() && <Navigate to={'/signUp'}/>}
        {session.isCurrentUserSender() && <h1>sender</h1> }
        {session.isCurrentUserDeliveryAgent() && <h1>delivery</h1>}
      </main>
    </>
  )
}

export { HomePage }
