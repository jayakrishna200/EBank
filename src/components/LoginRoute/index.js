import './index.css'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import {Component} from 'react'

class LoginRoute extends Component {
  state = {userid: '', pin: '', showError: false}

  onSubmitForm = event => {
    event.preventDefault()
  }

  onChangeUserId = event => {
    this.setState({userid: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  onSubmitLoginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitLoginFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  onClickLoginButton = async () => {
    const {userid, pin} = this.state
    const data = {user_id: userid, pin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    }
    const response = await fetch(url, options)
    const responseData = await response.json()
    if (response.ok) {
      this.onSubmitLoginSuccess(responseData.jwt_token)
    } else {
      this.onSubmitLoginFailure(responseData.error_msg)
    }
  }

  renderUserIdInputContainer = () => {
    const {userid} = this.state
    return (
      <div className="input-container">
        <label className="label-element" htmlFor="userid">
          User ID
        </label>
        <input
          type="text"
          className="input-element"
          id="userid"
          placeholder="Enter User ID"
          onChange={this.onChangeUserId}
          value={userid}
        />
      </div>
    )
  }

  renderUserPinContainer = () => {
    const {pin} = this.state

    return (
      <div className="input-container">
        <label className="label-element" htmlFor="pin">
          PIN
        </label>
        <input
          type="password"
          className="input-element"
          id="pin"
          placeholder="Enter PIN"
          onChange={this.onChangePin}
          value={pin}
        />
      </div>
    )
  }

  render() {
    const {showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-main-bg">
        <div className="login-page-cont">
          <div className="login-image-cont">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="website-login-image"
            />
          </div>
          <form className="login-details-cont" onSubmit={this.onSubmitForm}>
            <h1 className="login-heading">Welcome Back!</h1>
            {this.renderUserIdInputContainer()}
            {this.renderUserPinContainer()}

            <button
              className="login-btn"
              type="submit"
              onClick={this.onClickLoginButton}
            >
              Login
            </button>
            {showError && <p className="error-msg">{errorMsg} </p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginRoute
