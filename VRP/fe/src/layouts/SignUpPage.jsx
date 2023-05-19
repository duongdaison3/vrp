import React, { Component } from "react";
import "./../css/LoginScreen.css";

class SignUpPage extends Component {
  state = {
    username: "",
    displayname: "",
    password: "",
    confirm_password: "",
    fail_message: "",
    loading: false,
  }

  handleUserNameChange = (event) => {
    const newValue = event.target.value;
    this.setState({
      username: newValue,
      fail_message: "",
    });
  };

  handleDisplayNameChange = (event) => {
    const newValue = event.target.value;
    this.setState({
      displayname: newValue,
      fail_message: "",
    });
  };

  handlePasswordChange = (event) => {
    const newValue = event.target.value;
    this.setState({
      password: newValue,
      fail_message: "",
    })
  }

  handleConfirmPasswordChange = (event) => {
    const newValue = event.target.value;
    this.setState({
      confirm_password: newValue,
      fail_message: "",
    })
  }

  handleSubmit = (event) => {
    // eslint-disable-next-line
    var emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    event.preventDefault();
    if (!this.state.username || !this.state.displayname || !this.state.password || !this.state.confirm_password) {
      this.setState({
        fail_message: "Please fill it all"
      });
      return;
    }
    if (this.state.password !== this.state.confirm_password) {
      this.setState({
        fail_message: "Password and Confirm password must be the same"
      });
      return;
    }
    if (!emailRegex.test(this.state.username)) {
      this.setState({
        fail_message: "Invalid email address"
      });
      return;
    }
    if (this.state.password.length < 6) {
      this.setState({
        fail_message: "Password must be at least 6 characters"
      });
      return;
    }
    this.setState({
      loading: true,
    })
    fetch('http://localhost:3001/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email: this.state.username,
        name: this.state.displayname,
        password: this.state.password,
      }),
    })
      .then((response) => {
        // response.json() only when server reponse with json
        // response.text() only when server response with string
        return response.json();
      })
      .then((data) => {
        if (data.token) {
          this.setState({
            loading: false,
          });
          window.location.href = `/`;
        }
        else {
          this.setState({
            fail_message: data.message,
            loading: false,
          })
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          fail_message: error.message,
          loading: false,
        })
      });
  }

  render() {
    return (
      <div className="login-dark">
        <form method="post">
          <h2 className="sr-only">Sign Up Form</h2>
          <div className="illustration">
            {/* <i className="icon ion-ios-locked-outline" ></i> */}
            <span>Sign</span>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.displayname}
              onChange={this.handleDisplayNameChange}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.username}
              onChange={this.handleUserNameChange}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              name="confirmpassword"
              placeholder="Confirm Password"
              value={this.state.confirm_password}
              onChange={this.handleConfirmPasswordChange}
            />
          </div>
          {(!this.state.fail_message) ? <div></div> : <div className="alert alert-danger">{this.state.fail_message}</div>}
          <div className="form-group">
            <button className="btn btn-primary btn-block" onClick={this.handleSubmit} >
              Sign up
            </button>
          </div>
          {/* <a href="#" className="forgot">Forgot your email or password?</a> */}
        </form>
      </div>
    );
  }
}

export default SignUpPage;
