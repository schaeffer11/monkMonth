import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter, Switch, Route } from 'react-router-dom'
import autobind from 'autobind-decorator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import API from '../lib/api-store'
import { logout } from '../redux/actions/user'

import ApplicationHeader from './common/Header/ApplicationHeader'


@autobind class ProductHeader extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  handleLogout() {
    const { logoutAction } = this.props
    API.logout().then((r) => {
      logoutAction()
    })
  }

  render() {
    const { user } = this.props
    
    return (
      <Route exact path="/">
          <ApplicationHeader />
      </Route>
    )
  }
}

const mapStateToProps = state => ({
  user: state.get('user'),
})

const mapDispatchToProps = dispatch => ({
  logoutAction: user => dispatch(logout(user)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductHeader))
