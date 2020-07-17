import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: PassedComponent, user, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (user) {
        return <PassedComponent {...rest} {...props} />
      }
      return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    }}
  />
)

export default PrivateRoute
