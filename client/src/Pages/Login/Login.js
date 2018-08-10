import React, { Component } from "react";
// import blogApi from "../../Utils/blogApi";
// import  Link  from "react-router-dom";
// import { Input, FormBtn } from "../../Components/Form";
// import { List, ListItem } from "../../Components/List";
// import  SaveBtn  from "../../Components/SaveBtn";
// import  Jumbotron  from "../../Components/Jumbotron";
// import  Card  from "../../Components/Card";
import { Col, Row, Container } from "../../Components/Grid";

import { GoogleLogin, GoogleLogout } from 'react-google-login';
import config from './config.json';

class Login extends Component {
  state =  { isAuthenticated: false, user: null, token: ''};

  logout = () => {
    this.setState({isAuthenticated: false, token: '', user: null})
  };

  onFailure = (error) => {
    alert(error);
  };

  googleResponse = (response) => {
    const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
    const options = {
        method: 'POST',
        body: tokenBlob,
        mode: 'cors',
        cache: 'default'
    };
    fetch('http://localhost:3002/api/v1/auth/google', options).then(r => {
        const token = r.headers.get('x-auth-token');
        r.json().then(user => {
            if (token) {
                this.setState({isAuthenticated: true, user, token})
            }
        });
    })
  };

  render() {
        let content = !!this.state.isAuthenticated ?
                (
                    <div>
                        <span>Authenticated!
                            {this.state.user.email} </span>                  
                            <GoogleLogout
                                className="google-logout"
                                buttonText="Logout"
                                onLogoutSuccess={this.logout}
                            />            
                    </div>
                ) :
                (
                    <GoogleLogin
                            clientId={config.GOOGLE_CLIENT_ID}
                            buttonText="Login"
                            onSuccess={this.googleResponse}
                            onFailure={this.onFailure}
                        />
                );

        return (
            <Container>
                <Row>
                    <Col size="xs-12">{content}
                    </Col>
                </Row>
            </Container>);
    }
};

export default Login;
