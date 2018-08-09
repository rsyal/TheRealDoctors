import React, { Component } from "react";
import bloggerApi from "../../Utils/bloggerApi";
import PropTypes from 'prop-types';
import SignupFormMui from "../../Components/SignupFormMui";
// import  Link  from "react-router-dom";
// import { List, ListItem } from "../../Components/List";
// import  SaveBtn  from "../../Components/SaveBtn";
// import  Jumbotron  from "../../Components/Jumbotron";
// import  Card  from "../../Components/Card";
//import { Col, Row, Container } from "../../Components/Grid";
//import { Input, FormBtn } from "../../Components/Form";

class Signup extends Component {
  state = {
    errors: {},
    blogger: {
      email: "",
      //password: "",
      firstName: "",
      lastName: "",
      specialty: "",
      nomNumber: ""
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    const blogger = this.state.blogger;
    blogger[name] = value;
    this.setState({blogger});
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (
      this.state.blogger.firstName &&
      this.state.blogger.lastName &&
      this.state.blogger.specialty &&
      this.state.blogger.email &&
      this.state.blogger.npmNUmber
    ) {
      bloggerApi
        .saveBlogger({
          email: this.state.blogger.email,
          // //password: this.state.password,
          firstName: this.state.blogger.firstName,
          lastName: this.state.blogger.lastName,
          specialty: this.state.blogger.specialty,
          npmNumber: this.state.blogger.npmNumber
        })
        .then(bloggerData => {
          console.log(bloggerData.data);
          this.setState({errors: {}});
          // redirect user after singup to login page or home page
          this.props.history.push('/');
        })
        .catch(err => {
          console.log(err);
          const errors = err;
          errors.summary = err.message;
          this.setState({errors});
        });
    }
  };

  render() {
    return (
     <SignupFormMui 
        onClick={this.handleFormSubmit}
        onChange={this.handleInputChange}
        errors={this.state.errors}
        blogger={this.state.blogger}
        // firstName={this.state.firstName}
        // lastName={this.state.lastName}
        // email={this.state.email}
        // specialty={this.state.specialty}
        // npmNumber={this.state.npmNumber}
      />
    );
  }
}

Signup.contextTypes = {
  router: PropTypes.object.isRequired
};

export default Signup;
