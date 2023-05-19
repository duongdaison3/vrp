import React, { Component } from "react";
import { authenticationService } from '../services/authentication.service';
import "./../css/LoginScreen.css";
//import "SignUpPage";
class LoginPage extends Component {
  constructor(props) {
    super(props);

    // redirect to home if already logged in
    if (authenticationService.currentUserValue) {
      window.location.href = '/'
    }
  }

  state = {
    username: "",
    password: "",
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

  handlePasswordChange = (event) => {
    const newValue = event.target.value;
    this.setState({
      password: newValue,
      fail_message: "",
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.username || !this.state.password) {
      this.setState({
        fail_message: "Please fill it all"
      });
      return;
    }
    this.setState({
      loading: true,
      fail_message: "",
    });

    authenticationService.login(this.state.username, this.state.password)
      .then(
        user => {
          window.location.href = '/';
        },
        error => {
          console.log(error);
          this.setState({
            loading: false,
            fail_message: error.message,
          })
        }
      )

  }

  render() {
    return (
      <div className="login-dark">
        <form onSubmit={this.handleSubmit}>
          <h2 className="sr-only">Login Form</h2>
          <div className="illustration">
            {/* <i className="icon ion-ios-locked-outline" ></i> */}
            <span>Login</span>
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
          {(!this.state.fail_message) ? <div></div> : <div className="alert alert-danger">{this.state.fail_message}</div>}
          {
            (!this.state.loading)
              ?
              <div className="form-group">
                <button className="btn btn-primary btn-block" onClick={this.handleSubmit}>
                  Log In
              </button>
              </div>
              :
              <div className="d-flex justify-content-around row">
                <div className="spinner-border " role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
          }


          <p className="forgot">
            If you don't have an account, please sign up.
          </p>
        </form>
      </div>
    );
  }
}

export default LoginPage;
