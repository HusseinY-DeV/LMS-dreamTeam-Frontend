import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Login from './Login'
import Dashboard from './Dashboard'
import Admins from './Admins'
import Classes from './Classes'
import Sections from './Sections'
import Students from './Students'
import Reports from './Reports'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <ProtectedRoute exact path="/" render={props => <Dashboard {...props} />} />
          <ProtectedRoute path="/dashboard" render={props => <Dashboard {...props} />} />
          <ProtectedRoute path="/admins" render={props => <Admins {...props} />} />
          <ProtectedRoute path="/classes" render={props => <Classes {...props} />} />
          <ProtectedRoute path="/sections" render={props => <Sections {...props} />} />
          <ProtectedRoute path="/students" render={props => <Students {...props} />} />
          <ProtectedRoute path="/reports" render={props => <Reports {...props} />} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
