import React, { Component } from "react";
import AuthService from './auth/auth-service';
import { Link } from "react-router-dom";
import './Login.css'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: ""
    };
    this.service = new AuthService();
  }

  login = e => {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.service.login(username, password)
      .then(response => {
        this.setState({
          username: "",
          password: ""
        });
        this.props.getUser(response)
      })
      .catch(error => console.log(error));
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.login}>
          <div id="login-input">
            <h2>Login</h2>

            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              autoComplete="on"
              required
              value={this.state.username}
              onChange={this.handleChange} />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              required
              value={this.state.password}
              onChange={this.handleChange}
              autoComplete="current-password"
            />

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