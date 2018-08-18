import React, { Component } from "react";
import axios from "axios";
import authApi from "../../Utils/authApi";
// import blogApi from "../../Utils/blogApi";
//import { withRouter } from "react-router-dom";
// import { Col, Row, Container } from "../../Components/Grid";

import { GoogleLogin, GoogleLogout } from 'react-google-login';
import config from './config.json';
import './Login.css';
// import { fromPrefixLen } from "ip";

class Login extends Component {
  state = { 
    isAuthenticated: false, 
    user: null, 
    token: "",
    currentUser: {}
     };

  logout = () => {
		this.setState({isAuthenticated: false, token: '', currentUser: null});
		this.props.history.push('/')
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
      r.json().then(currentUser => {
        if (token) {
          this.setState({ isAuthenticated: true, currentUser, token });
          this.setUserInfo(currentUser);
        }
        this.props.history.push("/Summary");
      });
    });
  };

  // googleResponse = response => {
  //   console.log('response ', response);
  //   const data = response.accessToken;

  //   const options = {
  //     method: "POST",
  //     url: '/api/v1/auth/google',
  //     data: response.accessToken
  //   };
  //   authApi.postAuth({
  //     data: response.accessToken 
  //   }).then(r => {
  //     console.log(r);
  //   })

  // }


  setUserInfo = (user) => {
    // window.sessionStorage.setItem("userDisplayName", user.displayName);
    // window.sessionStorage.setItem("userEmail", user.email);
    // window.sessionStorage.setItem("userId", user.id);
    // window.sessionStorage.setItem("googleId", googleProvider.id);
    // window.sessionStorage.setItem("accessToken", googleProvider.token);
    sessionStorage.setItem("currentUser", JSON.stringify(user));
  }

  getUserInfo = () => {
    // window.sessionStorage.getItem("userDisplayName");
    // window.sessionStorage.getItem("userEmail");
    // window.sessionStorage.getItem("userId");
    // window.sessionStorage.getItem("googleId");
    // window.sessionStorage.getItem("accessToken");
    JSON.parse(sessionStorage.getItem('currentUser'))}
  

  render() {
    let content = !!this.state.isAuthenticated ? (
        <span className="text-light paddingRight-20">
          Welcome {this.state.currentUser.email} 
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

// export default withRouter(Login);
export default Login;
