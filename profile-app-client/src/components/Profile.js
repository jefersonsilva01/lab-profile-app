import React, { Component } from 'react';
import AuthService from './auth/auth-service';
import "./Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profileUser: null
    };
    this.service = new AuthService();
  }

  componentDidMount() {
    this.setState({
      profileUser: {
        ...this.props.loggedInUser
      }
    })
  }

  updatePhoto = () => {
    const id = this.state.profileUser._id;

    this.service.user(id)
      .then(response => {
        this.setState({ profileUser: { ...response } })
      })
      .catch(error => console.log(error))
  }

  logout = () => {
    this.service.logout()
      .then(() => {
        this.setState({ profileUser: null });
        this.props.getUser(null);
      })
  }

  handleChange = e => {
    const uploadImage = new FormData();

    uploadImage.append("image", e.target.files[0]);

    this.service.uploadImage(uploadImage)
      .then(response => {
        if (response.secure_url) {
          const id = this.state.profileUser._id;
          const image = response.secure_url;

          this.service.userUpdate(id, image)
            .then(() => console.log("ok"))
            .catch(error => console.log(error));
        }
      })
      .catch(error => console.log(error))
  }

  render() {
    if (this.state.profileUser) {
      return (
        <div id="profile">
          <div id="profile-info">
            <h2>Profile</h2>

            <label>Username</label>
            <p>{this.state.profileUser.username}</p>

            <label>Campus</label>
            <p>{this.state.profileUser.campus}</p>

            <label>Course</label>
            <p>{this.state.profileUser.course}</p>

            <button onClick={this.logout} id="btn-logout">Logout</button>
          </div>

          <div id="profile-image">
            <form onSubmit={this.updatePhoto}>
              <label htmlFor="file">
                {
                  this.state.profileUser.image
                    ? <img src={this.state.profileUser.image} alt="cover" />
                    : <img src="./assets/pngwing.com.png" alt="cover" />
                }
              </label>

              <input onChange={this.handleChange} style={{ visibility: "hidden" }} type="file" name="image" value={undefined} id="file" />

              <button id="btn-image" type='submit'>Edit Photo</button>
            </form>
          </div>
        </div>
      )
    }
  }
}

export default Profile