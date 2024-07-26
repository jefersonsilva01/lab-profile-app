import React, { Component } from "react";
import AuthService from './auth/auth-service';
import './Signup.css';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      campus: '',
      course: ''
    };
    this.service = new AuthService();
  }

  signup = e => {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const campus = this.state.campus;
    const course = this.state.course;

    this.service.signup(username, password, campus, course)
      .then(response => {
        this.setState({
          username: '',
          password: '',
          campus: '',
          course: ''
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
      <form onSubmit={this.signup}>
        <div id="signup-input">
          <h2>Sign up</h2>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            type="text"
            autoComplete="on"
            required
            value={this.state.username}
            onChange={e => this.handleChange(e)}
          />

          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={this.state.password}
            onChange={e => this.handleChange(e)}
          />

          <label htmlFor="campus">Campus</label>
          <select
            name="campus"
            id="campus"
            required
            value={this.state.campus}
            onChange={e => this.handleChange(e)}
          >
            <option value=""></option>
            <option value="Madrid">Madrid</option>
            <option value="Barcelona">Barcelona</option>
            <option value="Miami">Miami</option>
            <option value="Paris">Paris</option>
            <option value="Berlin">Berlin</option>
            <option value="Amsterdam">Amsterdam</option>
            <option value="México">México</option>
            <option value="Sao Paulo">Sao Paulo</option>
            <option value="Lisbon">Lisbon</option>
            <option value="Remote">Remote</option>
          </select>

          <label htmlFor="course">Course</label>
          <select
            name="course"
            id="course"
            required
            value={this.state.course}
            onChange={e => this.handleChange(e)}
          >
            <option value=""></option>
            <option value="Web Dev">Web Dev</option>
            <option value="UX/UI">UX/UI</option>
            <option value="Data Analytics">Data Analytics</option>
            <option value="Cyber Security">Cyber Security</option>
          </select>
        </div>

        <div id="signup-hero">
          <h2>Hello!!</h2>
          <p>Welcome to IronProfile!</p>

          <p>
            If you signup, you agree with all our <br />
            terms and conditions where we can <br />
            do whatever we want with the data!
          </p>

          <button type="submit">Create the Account</button>
        </div>
      </form>
    )
  }
}

export default Signup;