import React, { Component } from "react";
import blogApi from "../../Utils/blogApi";
import  Link  from "react-router-dom";
import { Input, FormBtn } from "../../Components/Form";
import { List, ListItem } from "../../Components/List";
import  SaveBtn  from "../../Components/SaveBtn";
import { Col, Row, Container } from "../../Components/Grid";
import  Nav  from "../../Components/Nav";
import  Jumbotron  from "../../Components/Jumbotron";
import  Card  from "../../Components/Card";
import  Footer  from "../../Components/Footer";

class About extends Component {
  // state = {
  //   blogs: []
  // };

  // componentDidMount() {
  //   this.loadBlogs();
  // }
  //     .then(res => this.setState({ blogs: res.data }))
  //     .catch(err => console.log(err));
  // };

  render() {
    return (
      <div>
        {/* <Nav /> */}
        <Container>
          <Row>
            <Col size="md-12">
              <h2>ABout us</h2>
            </Col>
          </Row>
          <Row>
            <Col size="xs-12 md-5">IMAGE GOES HERE</Col>
            <Col size="xs-12 md-7">
              “Just Google it!" is becoming our standard response to unanswered
              questions in life. However, when we enter key words in a search
              engine such as Google, we end up with thousands of websites - many
              of which are barely relevant to what we are looking for or are
              rife with inaccuracies. Identifying websites with the most
              accurate information is a critical skill that is necessary for
              navigating our way in this jungle. When it comes to medical
              information, inaccurate or irrelevant information could
              potentially have a major detrimental impact on our well-being.
              Educational websites only had 50.2% accurate medical information.
              The majority of the books found by the search engine either
              provided outdated or irrelevant information, which may have also
              contributed to the low accuracy rate of educational websites.
              Blogs and websites of individuals also had very low rates of
              medical accuracy (25.7% and 30.3%). We created The Real Doctors
              because of a gap in correct medical information. Instead of
              placing the burden of discriminating between accurate and
              inaccurate information on patients, they can come to our website
              which guarantees that the information is written by board
              certified doctors. All the information is open to the public, but
              it can only be written by doctors who are highly trained.
            </Col>
          </Row>
        </Container>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default About;
