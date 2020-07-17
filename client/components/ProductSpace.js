import React from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import PrivateRoute from '../routes/CustomRoute/PrivateRoute'
import Home from './layout/Home/Home' 
import LoginForm from '../components/layout/Authorization/LoginForm'

 const ProductSpace = ({ user }) => {
  return (
    <div className="product-space">
    	<Switch>
        <PrivateRoute exact path="/" user={user} component={Home} />
      </Switch>
      <Route
        exact
        path="/login"
        render={props => <LoginForm {...props} user={user} />}
      />
    </div>
)}

const mapStateToProps = state => ({
  user: state.get('user'),
})

export default withRouter(connect(mapStateToProps)(ProductSpace))
