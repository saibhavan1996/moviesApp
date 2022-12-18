import {Component} from 'react'
import Cookies from 'js-cookie'

import {withRouter, Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: '', isFailed: false}

  getUserName = event => {
    this.setState({username: event.target.value})
  }

  getUserPassword = event => {
    this.setState({password: event.target.value})
  }

  submitUserEnteredDetails = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.getSuccessAuth(data.jwt_token)
      console.log(data.jwt_token)
    } else {
      this.getErrorMsg(data.error_msg)
    }
  }

  getErrorMsg = errorMsg => {
    const {isFailed} = this.state
    this.setState({isFailed: !isFailed, errorMsg})
  }

  getSuccessAuth = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  render() {
    const {username, password, errorMsg, isFailed} = this.state

    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <img
          src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660479354/Group_7399_nn7x3u.png"
          className="logo-image"
          alt="login website logo"
        />

        <form
          className="login-form-container"
          onSubmit={this.submitUserEnteredDetails}
        >
          <h1 className="login-heading">Login</h1>
          <div className="input-container">
            <label className="label" htmlFor="userName">
              USERNAME
            </label>
            <input
              value={username}
              type="text"
              onChange={this.getUserName}
              className="input-bar"
              id="userName"
            />
          </div>
          <div className="input-container">
            <label className="label" htmlFor="password">
              PASSWORD
            </label>
            <input
              value={password}
              type="password"
              onChange={this.getUserPassword}
              className="input-bar"
              id="password"
            />
            {isFailed && <p className="error-msg">{errorMsg}</p>}
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    )
  }
}
export default withRouter(LoginForm)
