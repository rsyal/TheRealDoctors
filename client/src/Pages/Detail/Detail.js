import React, { Component } from "react";
import blogApi from "../../Utils/blogApi";
import { Link } from "react-router-dom";
// import { Input, FormBtn } from "../../Components/Form";
// import { List, ListItem } from "../../Components/List";
// import  SaveBtn  from "../../Components/SaveBtn";
// import  Jumbotron  from "../../Components/Jumbotron";
import { Col, Row, Container } from "../../Components/Grid";
import Card from "../../Components/Card";

class Detail extends Component {
  state = {
    blog: {}
  };

  componentDidMount() {
    blogApi
      .getBlog(this.props.match.params.id)
      .then(res => {
        this.setState({ blog: res });
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <h2>{this.state.blog.title}</h2>
          </Col>
        </Row>
        <Row>
          <Col size="xs-12">
            <h1 className="text-center">{this.state.blog.title}</h1>
            <h3>Hello World</h3>
            <Card
              title={this.state.blog.title}
              imageSrc={this.state.blog.imageSrc}
              createdDt={this.state.blog.created_dt}
              content={this.state.blog.content}
            />
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Blogs</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
