import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

function PrivateRoute() {
    const {userInfo} = useSelector(state => state.auth)
  return (
    <div>
        {userInfo ? <Outlet /> : <Navigate to= '/login' replace />}
    </div>
  )
}

export default PrivateRoute