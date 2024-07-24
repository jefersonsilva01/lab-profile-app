import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./HomePage.css"

class HomePage extends Component {

  render() {
    return (
      <div id="home-page">
        <h2>IronProfile</h2>
        <p>
          Today we will createa an app <br />
          with authorization, adding <br />
          some cool styles!
        </p>

        <Link to={"/signup"}>Sign up</Link>
        <Link to={"/login"}>Log in</Link>
      </div>
    )
  }
}

export default HomePage;