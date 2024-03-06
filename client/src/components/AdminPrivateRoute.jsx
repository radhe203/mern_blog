import React from 'react'
import {Navigate, Outlet} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"

function AdminPrivateRoute() {
  const dispatch = useDispatch()
  const { currentUser} = useSelector((state) => state.user);

  return (
    <>
    {currentUser && currentUser.isAdmin ? <Outlet/> :<Navigate to={'/sign-in'}/>}
    </>
  )
}

export default AdminPrivateRoute