import React, { Component } from "react";
import blogApi from "../../Utils/blogApi";
// import commentApi from "../../Utils/commentApi";
import { Link } from "react-router-dom";
// import { Input, FormBtn } from "../../Components/Form";
// import { List, ListItem } from "../../Components/List";
// import  SaveBtn  from "../../Components/SaveBtn";
// import  Jumbotron  from "../../Components/Jumbotron";
import { Col, Row, Container } from "../../Components/Grid";
// import Comment from "../../Components/Comment";

class Detail extends Component {
  state = {
    blog: {
      blogger: {}
    }
  };

  // Retrieve a blog with all comments
  componentDidMount() {
    blogApi
      .getBlog(this.props.match.params.id)
      .then(res => {
        console.log(res.data);
        return this.setState({ blog: res.data });     
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <h1>{this.state.blog.topic}</h1>
            <h2>By {this.state.blog.blogger.fullName}</h2>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <img src={this.state.blog.imageSrc} alt="yah, we need alt text here" />
          </Col>
        </Row>
        <Row>
          <Col size="xs-12">
            <p>{this.state.blog.content}</p>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Link to="/">← Back to Blogs</Link>
          </Col>
        </Row>
        <Row>
          <h3>Comment below:</h3>
        </Row>
        <Row>
          <Col size="md-12" />
        </Row>
      </Container>
    );
  }
}

export default Detail;
