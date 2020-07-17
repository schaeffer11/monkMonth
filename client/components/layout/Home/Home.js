import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import './Home.scss'

@autobind class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    console.log('render home')

    return (
      <div className='home'>
        i am home
      </div>
    )
  }
}

export default withRouter(Home)
