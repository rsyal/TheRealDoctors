import React, { Component } from "react";
import bloggerApi from "../../Utils/bloggerApi";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
// import { Col, Row, Container } from "../../Components/Grid";

import { GoogleLogin, GoogleLogout } from "react-google-login";
import config from "./config.json";
import "./Login.css";
// import { fromPrefixLen } from "ip";

class Login extends Component {
  state = {
    isAuthenticated: false,
    user: null,
    token: "",
    currentUser: {}
  };

  logout = () => {
    this.setState({ isAuthenticated: false, token: "", currentUser: null });
    this.props.history.push("/");
  };

  onFailure = error => {
    alert(error);
  };

  googleResponse = response => {
    console.log('response ', response);
    const tokenBlob = new Blob(
      [JSON.stringify({ access_token: response.accessToken }, null, 2)],
      { type: "application/json" }
    );
    console.log("tokenBlob ", tokenBlob);

    const options = {
      method: "POST",
      body: tokenBlob,
      mode: "cors",
      cache: "default"
    };

    fetch("http://localhost:3002/api/v1/auth/google", options).then(r => {
      console.log("r ", r);
      const token = r.headers.get("x-auth-token");
      console.log("token ", token);
      r.json().then(currentUser => {
        // update blogger with user info
        bloggerApi.getBlogger({
          query: {
            email: currentUser.email
          }
        }).then(blogger => bloggerApi.updateBlogger(blogger._id, currentUser)
          .then(res => console.log(res._id)));

        if (token) {
          this.setState({ isAuthenticated: true, currentUser, token });
          this.setUserInfo(currentUser);
        }
        this.props.history.push("/Summary");
      });
    });
  };

  setUserInfo = user => {
    // window.sessionStorage.setItem("userDisplayName", user.displayName);
    // window.sessionStorage.setItem("userEmail", user.email);
    // window.sessionStorage.setItem("userId", user.id);
    // window.sessionStorage.setItem("googleId", googleProvider.id);
    // window.sessionStorage.setItem("accessToken", googleProvider.token);
    sessionStorage.setItem("currentUser", JSON.stringify(user));
  };

  getUserInfo = () => {
    // window.sessionStorage.getItem("userDisplayName");
    // window.sessionStorage.getItem("userEmail");
    // window.sessionStorage.getItem("userId");
    // window.sessionStorage.getItem("googleId");
    // window.sessionStorage.getItem("accessToken");
    JSON.parse(sessionStorage.getItem("currentUser"));
  };

  render() {
    let content = !!this.state.isAuthenticated ? (
      <ul className="navbar-nav ml-auto">
        {/* Welcome {this.state.currentUser.email}  */}
        <li className="nav-item">
          <NavLink className="nav-link" to="/About">
            About
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/Summary">
            Blogger Summary
          </NavLink>
        </li>
        <li className="nav-item login-wrapper">
          <GoogleLogout
            className="google-logout logout-button"
            buttonText="Logout"
            onLogoutSuccess={this.logout}
          />
        </li>
      </ul>
    ) : (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <NavLink className="nav-link" to="/About">
            About
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/Signup">
            Sign Up to Write
          </NavLink>
        </li>
        <li className="nav-item login-wrapper">
          <GoogleLogin
            className="login-button"
            clientId={config.GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={this.googleResponse}
            onFailure={this.onFailure}
          />
        </li>
      </ul>
    );

    return (
      <div className="collapse navbar-collapse" id="navbarColor02">
        {content}
      </div>
    );
  }
}

export default withRouter(Login);
// export default Login;
