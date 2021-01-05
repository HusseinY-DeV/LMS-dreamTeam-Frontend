import React from 'react'
import { Redirect } from 'react-router-dom'

const ProtectedRoute = props => {
  const isAuthentcated = true;

  return (
    isAuthentcated ?
      <props.render /> :
      <Redirect to={{ pathname: '/login' }} />
  )
}

export default ProtectedRoute;