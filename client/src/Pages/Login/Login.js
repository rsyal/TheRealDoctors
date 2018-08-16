import React, { Component } from "react";
// import blogApi from "../../Utils/blogApi";
import { withRouter } from "react-router-dom";
// import { Col, Row, Container } from "../../Components/Grid";

import { GoogleLogin, GoogleLogout } from 'react-google-login';
import config from './config.json';
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
    const options = {
      method: "POST",
      body: tokenBlob,
      mode: "cors",
      cache: "default"
    };
    fetch("http://localhost:3002/api/v1/auth/google", options).then(r => {
      const token = r.headers.get("x-auth-token");
      r.json().then(user => {
        if (token) {
          this.setState({ isAuthenticated: true, user, token });
        }

        this.props.history.push("/Summary");
      });
    });
  };

  render() {
    let content = !!this.state.isAuthenticated ? (
      <div>
        <span className="text-light">
          Welcome {this.state.user.email}
          <GoogleLogout
            className="google-logout"
            buttonText="Logout"
            onLogoutSuccess={this.logout}
          />
        </span>
      </div>
    ) : (
      <div>
        <GoogleLogin
          clientId={config.GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={this.googleResponse}
          onFailure={this.onFailure}
        />
      </div>
    );

	return (
		<div>
			{content}
		</div>);
  }
}

export default withRouter(Login);
