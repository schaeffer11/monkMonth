

const reconnect = async user => {
  try{
    const cognitoUser = await Auth.currentAuthenticatedUser()
    setTokenCookies(cognitoUser)
    console.log('reconnecting user ..............')
    console.log('cognito user: ', cognitoUser)
    console.log('user in state: ', user)
    return getUserData()
  } catch(error){
    return Promise.reject(error.message)
  }
}

const auth = async ({ email, password }) => {
  const cognitoUser = await Auth.signIn(email, password)
  
  if (cognitoUser.code) {
    return Promise.reject(cognitoUser.message)
  }

  setTokenCookies(cognitoUser)
  return getUserData()
}

const logout = async () => {
  const cognitoObject = Auth.signOut()
  clearTokenCookies()
  return await cognitoObject
}
// const logout = () => fetch('/auth/logout', {
//   method: 'POST',
//   headers: {
//     'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
//   },
//   credentials: 'include',
// }).then(handleErrors)



export default {
  auth,
  logout,
  reconnect,
}
