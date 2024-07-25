import React, { Component } from "react";
import './Signup.css'

class Signup extends Component {

  signup(e) {
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={e => { this.signup(e) }}>
        <div id="signup-input">
          <h2>Sign up</h2>
          <label htmlFor="username">Username</label>
          <input type="text" />

          <label htmlFor="password">Password</label>
          <input type="password" />

          <label htmlFor="campus">Campus</label>
          <select name="campus" id="campus">
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
          <select name="course" id="course">
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