import React from 'react'
import {Navigate, Outlet} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"

function PrivateRoute() {
  const dispatch = useDispatch()
  const { currentUser, error, loading } = useSelector((state) => state.user);

  return (
    <>
    {currentUser ? <Outlet/> :<Navigate to={'/sign-in'}/>}
    </>
  )
}

export default PrivateRoute