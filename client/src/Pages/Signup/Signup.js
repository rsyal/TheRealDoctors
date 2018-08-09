import React, { Component } from "react";
import bloggerApi from "../../Utils/bloggerApi";
import verificationApi from "../../Utils/verificationApi";
// import  Link  from "react-router-dom";
// import { List, ListItem } from "../../Components/List";
// import  SaveBtn  from "../../Components/SaveBtn";
// import  Jumbotron  from "../../Components/Jumbotron";
// import  Card  from "../../Components/Card";
import { Col, Row, Container } from "../../Components/Grid";
import { Input, FormBtn } from "../../Components/Form";


class Signup extends Component {
  state = {
    email: "",
    //password: "",
    firstName: "",
    lastName: "",
    specialty: "",
    npmNumber: "",
    verificationCompleted: false,
    verificationMessage: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (
      this.state.firstName &&
      this.state.lastName &&
      this.state.specialty &&
      this.state.email &&
      this.state.npmNumber
    ) {
      verificationApi.verifyBlogger(this.state.npmNumber)
      .then(res => {
        console.log(res);
        if (res.length===1) {
          this.setState({verificationCompleted: true});
          this.setState({verificationMessage: "Verification completed"})
          bloggerApi
            .saveBlogger({
              email: this.state.email,
              // password: this.state.password,
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              specialty: this.state.specialty,
              npmNumber: this.state.npmNumber
            })
            .then(bloggerData => {
              console.log(bloggerData.data);
              this.props.history.push('/');
            })
            .catch(err => console.log(err));
        }
        else {
          this.setState({verificationCompleted: true});
          this.setState({verificationMessage: "Verification is pending"});
        }

    })
  }};

  handleFormSubmitWithoutVerification = event => {
    event.preventDefault();
    if (
      this.state.firstName &&
      this.state.lastName &&
      this.state.specialty &&
      this.state.email &&
      this.state.npmNumber
    ) {
        bloggerApi
          .saveBlogger({
            email: this.state.email,
            // password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            specialty: this.state.specialty,
            npmNumber: this.state.npmNumber
          })
          .then(bloggerData => {
            console.log(bloggerData.data);
            this.props.history.push('/');
          })
          .catch(err => console.log(err));
        }
  };

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col size="md-12">
              <h2 className="mt-3">Sign up to write for us</h2>
            </Col>
          </Row>
          <Row>
            <Col size="md-12">
              <form>
                <Input
                  value={this.state.firstName}
                  onChange={this.handleInputChange}
                  name="firstName"
                  placeholder="First name"
                />
                <Input
                  value={this.state.lastName}
                  onChange={this.handleInputChange}
                  name="lastName"
                  placeholder="Last name"
                />
                <Input
                  value={this.state.npmNumber}
                  onChange={this.handleInputChange}
                  name="npmNumber"
                  placeholder="npmNumber"
                />
                <Input
                  value={this.state.specialty}
                  onChange={this.handleInputChange}
                  name="specialty"
                  placeholder="Specialty"
                />
                <Input
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  name="email"
                  placeholder="Google email"
                />
                {/* <Input
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  name="password"
                  type="password"
                  placeholder="Google password"
                /> */}
                <FormBtn
                  disabled={
                    !(
                      this.state.firstName &&
                      this.state.lastName &&
                      this.state.specialty &&
                      this.state.email &&
                      this.state.npmNumber
                    )
                  }
                  onClick={this.handleFormSubmitWithoutVerification}
                >
                  Submit
                </FormBtn>
              </form>
            </Col>
          </Row> 
          <div className="container">        
            <Row>
              <Col size="md-12">
              {this.state.verificationCompleted ? (
                <p>{this.state.verificationMessage}</p>
              ) : (
                  <p> </p>
              )}
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}

export default Signup;
