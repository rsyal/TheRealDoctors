import React, { Component } from "react";
import bloggerApi from "../../Utils/bloggerApi";
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
    password: "",
    first_name: "",
    last_name: "",
    specialty: "",
    identification_id: ""
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
      this.state.first_name &&
      this.state.last_name &&
      this.state.specialty &&
      this.state.email &&
      this.state.password
    ) {
      bloggerApi
        .saveBlogger({
          email: this.state.email,
          password: this.state.password,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          specialty: this.state.specialty,
          identification_id: this.state.identification_id
        })
        .then(bloggerData => console.log(bloggerData.data))
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
                  value={this.state.first_name}
                  onChange={this.handleInputChange}
                  name="first_name"
                  placeholder="First name"
                />
                <Input
                  value={this.state.last_name}
                  onChange={this.handleInputChange}
                  name="last_name"
                  placeholder="Last name"
                />
                <Input
                  value={this.state.identification_id}
                  onChange={this.handleInputChange}
                  name="identification_id"
                  placeholder="Identification ID"
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
                <Input
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  name="password"
                  type="password"
                  placeholder="Google password"
                />
                <FormBtn
                  disabled={
                    !(
                      this.state.first_name &&
                      this.state.last_name &&
                      this.state.specialty &&
                      this.state.email &&
                      this.state.password
                    )
                  }
                  onClick={this.handleFormSubmit}
                >
                  Submit
                </FormBtn>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Signup;
