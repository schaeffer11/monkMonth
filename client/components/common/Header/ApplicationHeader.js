import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import autobind from 'autobind-decorator'
import API from '../../../lib/api-store'
import { logout } from '../../../redux/actions/user'

import './ApplicationHeader.scss'

@autobind class ProductHeader extends Component {
  handleLogout() {
    const { logoutAction } = this.props
    API.logout().then((r) => {
      logoutAction()
    })
  }

  render() {
    return (
      <div className="product-header">
          Monk Month <span style={{}}>version 0.0 </span>
      </div>
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
