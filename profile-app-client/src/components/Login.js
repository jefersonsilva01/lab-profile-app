import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Login.css'

class Login extends Component {

  login(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={e => { this.login(e) }}>
          <div id="login-input">
            <h2>Login</h2>
            <label htmlFor="username">Username</label>
            <input type="text" />

            <label htmlFor="password">Password</label>
            <input type="password" />

            <p>
              If you don't have an account yet, you <br />
              can create your account  <Link to={'/signup'}>here.</Link>
            </p>
          </div>
          <div id="login-hero">
            <h2>Hello!!</h2>
            <p>
              Awesome to have at <br />
              IronProfile again!
            </p>

            <p>
              If you signup, you agree with all our <br />
              terms and conditions where we can <br />
              do whatever we want with the data!
            </p>

            <button type="submit">Log in</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Login;