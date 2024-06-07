// import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import { isUserLoggedIn } from './auth'

export const ProtactedRoute = ()=>  {
  const {isTokenExpired} = isUserLoggedIn()
  const loggedin = isTokenExpired
  console.log(loggedin)
    if(loggedin) return < Navigate to={"../login"}/>
    return <Outlet/>
}
