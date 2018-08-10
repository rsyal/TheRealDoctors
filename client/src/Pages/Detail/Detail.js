import React, { Component } from "react";
import blogApi from "../../Utils/blogApi";
import commentApi from "../../Utils/commentApi";
import { Link } from "react-router-dom";
import { Input, FormBtn } from "../../Components/Form";
// import { List, ListItem } from "../../Components/List";
// import  SaveBtn  from "../../Components/SaveBtn";
// import  Jumbotron  from "../../Components/Jumbotron";
import { Col, Row, Container } from "../../Components/Grid";
import Card from "../../Components/Card";
// import Comment from "../../Components/Comment";

class Detail extends Component {
  state = {
    blog: {}
  };

  // Retrieve all blogs
  componentDidMount() {
    blogApi
      .getBlog(this.props.match.params.id)
      .then(res => {
        this.setState({ blog: res.data });
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }

  // Retrieve all comments
  // componentDidMount() {
  //   commentApi
  //     .getComments(this.props.match.params.id)
  //     .then(res => {
  //       this.setState({ comment: res.data });
  //       console.log(res.data);
  //     })
  //     .catch(err => console.log(err));
  // }

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <h1>{this.state.blog.topic}</h1>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <img src={this.state.blog.imageSrc} />
          </Col>
        </Row>
        <Row>
          <Col size="xs-12">
            <p>{this.state.blog.content}</p>
            {/* <Card
              title={this.state.blog.topic}
              imageSrc={this.state.blog.imageSrc}
              createdDt={this.state.blog.created_dt}
              content={this.state.blog.content}
            /> */}
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
