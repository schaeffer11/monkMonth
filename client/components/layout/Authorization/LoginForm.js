import React, { Component } from 'react'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Redirect } from 'react-router-dom'

// Material UI
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import FormHelperText from '@material-ui/core/FormHelperText'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import { login } from '../../../redux/actions/user'
import API from '../../../lib/api-store'



@autobind class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isVerifying: false,
      isInvalid: false,
      from: null,
    }

    this.userEmail = React.createRef()
    this.userPassword = React.createRef()
  }

  async attemptLogin(e) {
    e.preventDefault()
    const { loginAction } = this.props
    const user = {
      email: this.userEmail.current.value.toLowerCase(),
      password: this.userPassword.current.value,
    }
    this.setState({ isVerifying: true, isInvalid: false })
    
    try {
      const userObj = await API.auth(user)
      console.log('userObj')
      console.log(userObj)
      this.setState({ isInvalid: false }, () => loginAction(userObj))
    } catch(error) {
      console.log(error)
      this.setState({ isVerifying: false, isInvalid: true })
    }

    // API.auth(user)
    //   .then((userObj) => {
    //     this.setState({ isInvalid: false }, () => loginAction(userObj))
    //   })
    //   .catch(() => {
    //     this.setState({ isVerifying: false, isInvalid: true })
    //   })
  }

  render() {
    const { isVerifying, isInvalid } = this.state
    const { user } = this.props


    console.log('fromfromfrom', this.state.from)


    if (user !== null) {
      return <Redirect to="/" />
    }
    return (
      <Container component="main" maxWidth="xs">

        <form onSubmit={this.attemptLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '100px' }}>
          <Avatar style={{ margin: '1em' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h3">
            Sign in
          </Typography>
          {isInvalid && <FormHelperText id="login-error" error>Invalid Login Information</FormHelperText>}
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={this.userEmail}
            disabled={isVerifying}
            error={isInvalid}
            label="Email Address"
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
            fullWidth
            required
          />

          <TextField
            variant="outlined"
            margin="normal"
            inputRef={this.userPassword}
            disabled={isVerifying}
            error={isInvalid}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            required
            fullWidth
          />

          <Button
            type="submit"
            disabled={isVerifying}
            variant="contained"
            fullWidth
            color="primary"
          >
            { isVerifying ? 'Verifying... ' : 'Login' }
            {' '}
            { !isVerifying && <FontAwesomeIcon icon="sign-in-alt" /> }
          </Button>
        </form>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  loginAction: user => dispatch(login(user)),
})
export default connect(null, mapDispatchToProps)(LoginForm)
