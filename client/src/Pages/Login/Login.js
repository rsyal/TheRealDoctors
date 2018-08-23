import React, { Component } from "react";
import bloggerApi from "../../Utils/bloggerApi";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import config from "./config.json";
import "./Login.css";

class Login extends Component {
  state = {
    isAuthenticated: false,
    token: undefined,
    currentUser: undefined
  };

  callbackURL = () => {
    let callbackURL = undefined;
    if (config.ENVIRONMENT === "heroku_production") {
      callbackURL = config.HEROKU_PRODUCTION_SERVER;
    } else if (config.ENVIRONMENT === "development") {
      callbackURL = "http://localhost:3002/api/v1/auth/google";
    }
    return callbackURL;
  };
  
  componentDidMount() {
    const userInfo = this.getUserInfo();
    if (userInfo) {
      this.setState({currentUser: userInfo});  
      this.setState({isAuthenticated: true});
    } else {
      this.setState({isAuthenticated: false});
    }
  }

  setUserInfo = user => {
    sessionStorage.setItem("currentUser", JSON.stringify(user));
  };

  getUserInfo = () => {
    return JSON.parse(sessionStorage.getItem("currentUser"));
  };

  logout = () => {
    this.setState({ isAuthenticated: false, token: "", currentUser: null });
    sessionStorage.clear();
    this.props.history.push("/");
  };

  onFailure = error => {
    console.log(error);
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

    fetch(this.callbackURL(),options).then(r => {
    console.log("r ", r);
      const token = r.headers.get("x-auth-token");
      console.log("token ", token);
      r.json().then(currentUser => {
        console.log('Login.js currentUser ', currentUser);
        // update blogger with user info
        bloggerApi.getBlogger({
          query: {
            email: currentUser.email
          }
        }).then(blogger => bloggerApi.updateBlogger(blogger.data[0]._id, {user: currentUser._id}))
          .then(res => {
            currentUser.bloggerId = res.data._id;
            console.log('Login fetch bloggerId in currentUser ', currentUser.bloggerId);         
            })

        if (token) {
          this.setState({ isAuthenticated: true, currentUser, token });
          this.setUserInfo(currentUser);
        }
        this.props.history.push("/");
      });
    });
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
