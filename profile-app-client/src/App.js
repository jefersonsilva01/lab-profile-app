import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import HomePage from './components/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import AuthService from './components/auth/auth-service';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service.verify()
        .then(response => {
          this.setState({
            loggedInUser: response
          })
        })
        .catch(err => {
          this.setState({
            loggedInUser: false
          })
        })
    }
  }

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  render() {
    this.fetchUser()
    if (this.state.loggedInUser) {
      return (
        <div className="App" >
          <Switch>
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="App" >
          <Switch>
            <Route
              exact path="/"
              render={() => <HomePage
                userInSession={this.state.loggedInUser}
                getUser={this.getTheUser} />} />

            <Route
              exact path="/login"
              render={() => <Login getUser={this.getTheUser} />} />

            <Route
              exact path="/signup"
              render={() => <Signup getUser={this.getTheUser} />} />
          </Switch>
        </div>
      );
    }
  }
}

export default App;
