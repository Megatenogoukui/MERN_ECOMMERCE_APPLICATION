import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

function AdminRoute() {
    const {userInfo} = useSelector(state => state.auth)
  return (
    <div>
        {userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to= '/login' replace />}
    </div>
  )
}

export default AdminRoute