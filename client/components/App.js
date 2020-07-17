import React from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'

import CssBaseline from '@material-ui/core/CssBaseline'

import ProductSpace from './ProductSpace'
import ProductHeader from './ProductHeader'

const App = (match) => (
  <div id="outer-container">
    <CssBaseline />
    {/* Baseline for material-ui styling*/}
    <Router>
      <React.Fragment>
        <ProductHeader />
        <ProductSpace />
      </React.Fragment>
    </Router>
  </div>
)

export default withRouter(App)
