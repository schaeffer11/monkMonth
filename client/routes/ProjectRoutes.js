import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PrivateRoute from './CustomRoute/PrivateRoute'
import Home from '../components/layout/Home/Home'

const ProjectRoutes = ({ project, user }) => (
  <React.Fragment>
    <PrivateRoute path="/" component={Home} /> 
  </React.Fragment>
)

const mapStateToProps = state => ({
  user: state.get('user'),
})

export default withRouter(connect(mapStateToProps)(ProjectRoutes))