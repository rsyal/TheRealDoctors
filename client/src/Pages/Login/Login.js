import React, { Component } from "react";
// import blogApi from "../../Utils/blogApi";
import { withRouter } from "react-router-dom";
// import { Col, Row, Container } from "../../Components/Grid";

import { GoogleLogin, GoogleLogout } from 'react-google-login';
import config from './config.json';
import './Login.css';
// import { fromPrefixLen } from "ip";

class Login extends Component {
  state = { isAuthenticated: false, user: null, token: "" };

  logout = () => {
		this.setState({isAuthenticated: false, token: '', user: null});
		this.props.history.push('/')
  };

  onFailure = error => {
    alert(error);
  };

  googleResponse = response => {
    const tokenBlob = new Blob(
      [JSON.stringify({ access_token: response.accessToken }, null, 2)],
      { type: "application/json" }
    );
    console.log('tokenBlob ', tokenBlob);

    const options = {
      method: "POST",
      body: tokenBlob,
      mode: "cors",
      cache: "default"
    };

    fetch("http://localhost:3002/api/v1/auth/google", options)
    .then(r => {
      console.log("r ", r)

      const token = r.headers.get("x-auth-token");
      console.log('token ', token);

      if (r.status !== 401) {
        r.json().then(user => {
          if (token) {
            this.setState({ isAuthenticated: true, user, token });
            this.setUserInfo(user);
          }
          this.props.history.push("/Summary");
        });
      }
    });
  };

  setUserInfo = (user) => {
    window.sessionStorage.setItem("userName", user.display_name);
    window.sessionStorage.setItem("userEmail", user.email);
    window.sessionStorage.setItem("userId", user.id);
  }

  getUserInfo = () => {
    window.sessionStorage.getItem("userName");
    window.sessionStorage.getItem("userEmail");
    window.sessionStorage.getItem("userId");
  }

  render() {
    let content = !!this.state.isAuthenticated ? (
        <span className="text-light paddingRight-20">
          Welcome {this.state.user.email} 
          <GoogleLogout
            className="google-logout"
            buttonText="Logout"
            onLogoutSuccess={this.logout}
          />
        </span>
    ) : (
        <GoogleLogin
          clientId={config.GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={this.googleResponse}
          onFailure={this.onFailure}
        />
    );

	return (
		<div>
			{content}
		</div>);
  }
}

export default withRouter(Login);
