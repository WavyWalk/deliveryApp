import React, { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from '../../pages/home/HomePage'
import { Login } from '../../user/components/Login/Login'
import { CreateAccount } from '../../user/components/CreateAccount/CreateAccount'
import { SenderDashboard } from '../../user/components/senderdashboard/SenderDashboard'
import { CreateShipmentOrder } from '../../shipmentorder/components/CreateShipmentOrder/CreateShipmentOrder'
import { SenderShipmentOrderOverview } from '../../shipmentorder/components/sender/SenderShipmentOrderOverview/SenderShipmentOrderOverview'
import { SenderShipmentOrderList } from '../../shipmentorder/components/sender/SenderShipmentOrderList/SenderShipmentOrderList'
import { DelivererShipmentOrderList } from '../../shipmentorder/components/deliverer/DelivererShipmentOrderLIst/DelivererShipmentOrderLIst'
import { DelivererDashboard } from '../../user/components/delivererdashboard/DelivererDashboard'
import { DelivererShipmentOrderOverview } from '../../shipmentorder/components/deliverer/DelivererShipmentOrderOverview/DelivererShipmentOrderOverview'
import { LinearProgress, Typography } from '@mui/material'
import { sessionState } from '../../user/SessionState'

const App: FC = () => {
  const session = sessionState.use()

  if (!session.userFetched || session.isLoading) {
    return <LinearProgress />
  }

  if (session.isCurrentUserGuest()) {
    return (
      <Routes>
        <Route path={'/signUp'} element={<CreateAccount />} />
        <Route path={'/login'} element={<Login />} />
        <Route path="*" element={<Navigate replace to="/signUp" />} />
      </Routes>
    )
  }

  return (
    <>
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'/404'} element={<Typography>Not found</Typography>} />
        <Route path={'/403'} element={<Typography>Unauthorized</Typography>} />
        <Route path={'/signUp'} element={<CreateAccount />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/sender'} element={<SenderDashboard />}>
          <Route path={'/sender'} element={<SenderShipmentOrderList />} />
          <Route
            path={'/sender/createShipment'}
            element={<CreateShipmentOrder />}
          />
          <Route
            path={'/sender/shipments/:shipmentOrderId'}
            element={<SenderShipmentOrderOverview />}
          />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Route>
        <Route path={'/deliverer'} element={<DelivererDashboard />}>
          <Route path={'/deliverer'} element={<DelivererShipmentOrderList />} />
          <Route
            path={'/deliverer/shipments/:shipmentOrderId'}
            element={<DelivererShipmentOrderOverview />}
          />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </>
  )
}

export { App }
