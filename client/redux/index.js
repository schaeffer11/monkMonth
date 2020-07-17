import { combineReducers } from 'redux-immutable'
// import { Map, fromJS } from 'immutable'

import user from './reducers/user'

const appReducer = combineReducers({
  user,
})

const rootReducer = (state, action) => {
  // We remove persisted state so we need to ensure a state exists for the following:
  if (state) {
    if (action.type === 'LOGOUT') {
      state = undefined
    }
  }
  return appReducer(state, action)
}


export default rootReducer
