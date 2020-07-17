import API from '../../lib/api-store'

export const login = user => ({ type: 'LOGIN', user })
export const logout = () => ({ type: 'LOGOUT' })