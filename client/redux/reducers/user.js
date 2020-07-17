import { fromJS } from 'immutable'

const initialState = null

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return fromJS(action.user)
    default:
      return state
  }
}

export default user
