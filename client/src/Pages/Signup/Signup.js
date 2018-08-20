import React, { Component } from "react";
import bloggerApi from "../../Utils/bloggerApi";
import verificationApi from "../../Utils/verificationApi";
import { Link } from "react-router-dom";
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
    npiNumber: "",
    verificationMessage: false,
    errorMessage: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.setState({ verificationMessage: false });
    this.setState({ errorMessage: "" });
    if (
      this.state.firstName &&
      this.state.lastName &&
      this.state.specialty &&
      this.state.email &&
      this.state.npiNumber
    ) {
      verificationApi
        .verifyBlogger(this.state.npiNumber)
        .then(res => {
          console.log(res);
          console.log("verification results: ", res.data.data);
          if (res.data.data) {
            this.setState({
              verificationMessage: "Verification completed and verified"
            });
            bloggerApi
              .saveBlogger({
                email: this.state.email,
                // password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                specialty: this.state.specialty,
                npiNumber: this.state.npiNumber
              })
              .then(bloggerData => {
                console.log(bloggerData.data);
                this.props.history.push("/");
              })
              .catch(error => {
                console.log(error);
                console.log(error.message, error.statusCode);
                this.setState({ errorMessage: error.message });
              });
          } else {
            this.setState({ verificationMessage: "Verification is pending" });
          }
        })
        .catch(error => {
          console.log(error);
          console.log(error.message, error.statusCode);
          this.setState({ errorMessage: error.message });
        });
    }
  };

  handleFormSubmitWithoutVerification = event => {
    event.preventDefault();
    if (
      this.state.firstName &&
      this.state.lastName &&
      this.state.specialty &&
      this.state.email &&
      this.state.npiNumber
    ) {
      bloggerApi
        .saveBlogger({
          email: this.state.email,
          // password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          specialty: this.state.specialty,
          npiNumber: this.state.npiNumber
        })
        .then(bloggerData => {
          console.log(bloggerData.data);
          this.props.history.push("/");
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
              <p className="text-muted">
                Our mission is to preserve the credibility of all content posted
                to The Real Doctors. Please provide the following information
                including your National Provider Identifier (NPI) number to
                complete the registration process.
              </p>
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
                  value={this.state.npiNumber}
                  onChange={this.handleInputChange}
                  name="npiNumber"
                  placeholder="NPI Number"
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
                      this.state.npiNumber
                    )
                  }
                  onClick={this.handleFormSubmit}
                >
                  Submit
                </FormBtn>
              </form>
            </Col>
          </Row>
          <div className="container">
            <Row>
              <Col size="md-12">
                {this.state.verificationMessage && !this.state.errorMessage ? (
                  <p>{this.state.verificationMessage}</p>
                ) : this.state.errorMessage ? (
                  <p>
                    Verification pending...
                    {this.state.errorMessage}
                    <br />
                    <strong>
                      Please check values that you entered before submission
                    </strong>
                    <br />
                    Or return to <Link to={"/"}>main page</Link>
                  </p>
                ) : (
                  <p>Verification pending...</p>
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
