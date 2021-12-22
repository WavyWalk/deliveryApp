import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../../pages/home/HomePage'
import { Login } from '../../user/components/Login'
import { CreateAccount } from '../../user/components/CreateAccount'
import { SenderDashboard } from '../../layouts/senderdashboard/SenderDashboard'
import { CreateShipmentOrder } from '../../shipmentorder/components/createshipmentorder/CreateShipmentOrder'

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'/signUp'} element={<CreateAccount />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/sender'} element={<SenderDashboard />}>
          <Route
            path={'/sender/createShipment'}
            element={<CreateShipmentOrder />}
          />
        </Route>
      </Routes>
    </>
  )
}

export { App }
