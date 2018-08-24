import React, { Component } from "react";
// import blogApi from "../../Utils/blogApi";
// import  Link  from "react-router-dom";
// import { Input, FormBtn } from "../../Components/Form";
// import { List, ListItem } from "../../Components/List";
// import  SaveBtn  from "../../Components/SaveBtn";
// import  Jumbotron  from "../../Components/Jumbotron";
// import  Card  from "../../Components/Card";
import { Col, Row, Container } from "../../Components/Grid";
import "./About.css";

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
      <Container>
        <Row className="about-us">
          <Col size="md-12">
            <h1 className="mt-3 text-center about-title">
              <strong>WELCOME</strong>
            </h1>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <h4 className="text-center about-description">
              We are a group of doctors <br />
              who want to disseminate accurate information.
            </h4>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <img
              src="/assests/images/doctorsLookingDown.jpeg"
              alt="I mean it really"
              className="rounded mt-3 mb-3 text-center"
            />
          </Col>
        </Row>
        <div className="about-body">
          <Row>
            <Col size="xs-12">
              <h5 className="about-text">
                <strong>“Just Google it!"</strong> is becoming our standard
                response to unanswered questions in life. However, when we enter
                key words in a search engine such as Google, we end up with
                thousands of websites - many of which are barely relevant to
                what we are looking for or are rife with inaccuracies.
                Identifying websites with the most accurate information is a
                critical skill that is necessary for navigating our way in this
                jungle. <br />
                <br />
                When it comes to medical information, inaccurate or irrelevant
                information could potentially have a major detrimental impact on
                our well-being. Educational websites only had 50.2% accurate
                medical information. The majority of the books found by the
                search engine either provided outdated or irrelevant
                information, which may have also contributed to the low accuracy
                rate of educational websites. Blogs and websites of individuals
                also had very low rates of medical accuracy (25.7% and 30.3%).{" "}
                <br /> <br />
                We created The Real Doctors because of a gap in correct medical
                information. Instead of placing the burden of discriminating
                between accurate and inaccurate information on patients, they
                can come to our website which guarantees that the information is
                written by board certified doctors. All the information is open
                to the public, but it can only be written by doctors who are
                highly trained.
              </h5>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}

export default About;
