////////////////////////
// Webpack Entrypoint //
////////////////////////

import React from 'react'
import { render } from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPowerOff, faBars, faTint, faArrowDown, faChevronCircleRight, faChevronCircleLeft, faQuestionCircle, faSpinner, faDownload, faEllipsisH, faCheck, faTimes, faTimesCircle, faEye, faPlay, faTrash, faUser, faHome, faCog, faHeart, faShareAlt, faChartBar, faSignInAlt, faClone, faUsers, faPencilAlt, faExclamationTriangle, faPlus, faFilePdf, faFileArchive, faFile, faFileWord} from '@fortawesome/free-solid-svg-icons'
import { createBrowserHistory } from 'history'
import { routerMiddleware, connectRouter, ConnectedRouter } from 'connected-react-router/immutable'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { Map } from 'immutable'
import { MuiThemeProvider } from '@material-ui/core/styles'

import { loadState, saveState } from './lib/local-storage'
import API from './lib/api-store'


import rootReducer from './redux/index'
import App from './components/App'

import theme from './style/MuiTheme'
import './style/main.scss'
import 'react-table/react-table.css'

//////////////////
// Font-awesome //
//////////////////



library.add(faPowerOff, faBars, faTint, faArrowDown, faSpinner, faChevronCircleRight, faChevronCircleLeft, faQuestionCircle, faPlay, faDownload, faEllipsisH, faTimes, faTimesCircle, faCheck, faEye, faTrash, faUser, faHome, faCog, faHeart, faShareAlt, faChartBar, faClone, faUsers, faPencilAlt, faSignInAlt, faExclamationTriangle, faPlus, faFilePdf, faFileArchive, faFile, faFileWord)


// TODO - fix local storage or add redux persist npm package
const localStorageKey = 'welcomeToTheMachine'
const persistedState = loadState(localStorageKey, new Map())
// const persistedState = Map()

const history = createBrowserHistory()
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  connectRouter(history)(rootReducer),
  persistedState,
  composeEnhancer(
    applyMiddleware(
      routerMiddleware(history),
      thunk,
    ),
  ),
)

const state = store.getState().toJS()
console.log('gettting state from store')
console.log(state)
store.subscribe(() => {
  saveState(localStorageKey, store.getState())
})

//////////////////
// React Render //
//////////////////

// TODO - reconnect session to user if need be
const start = () => {
  document.getElementById('app').classList.remove('isLoading', 'isRestoring')
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('app'),
  )
}

if (state.user) {
  console.log('i have a user')
  document.getElementById('app').className = 'isLoading isRestoring'
  API.reconnect(state.user)
    .then((r) => {
      store.dispatch({ type: 'LOGIN', user: r })
      start()
    })
    .catch((error) => {
      console.log('error', error)
      store.dispatch({ type: 'LOGOUT' })
      start()
    })
} else {
  console.log('no user found in state...')
  start()
}