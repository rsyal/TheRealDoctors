import React, { Component } from "react";
import blogApi from "../../Utils/blogApi";
// import  Link  from "react-router-dom";
// import { Input, FormBtn } from "../../Components/Form";
// import { List, ListItem } from "../../Components/List";
// import  SaveBtn  from "../../Components/SaveBtn";
// import  Jumbotron  from "../../Components/Jumbotron";
// import  Card  from "../../Components/Card";
import { Col, Row, Container } from "../../Components/Grid";

class Home extends Component {
  state = {
    blogs: []
  };

  componentDidMount() {
    this.loadBlogs();
  }

  loadBlogs = () => {
    blogApi
      .getBlogs()
      .then(res => this.setState({ blogs: res.data }))
      .catch(err => console.log(err));
  };

  render() {
    return (
        <Container fluid>
          <Row>
            <Col size="md-12">
              <h2>Recent blogs</h2>
            </Col>
          </Row>
          <Row>
            <Col size="xs-12">
              {!this.state.blogs.length ? (
                <h1 className="text-center">No recent blogs</h1>
              ) : (
                this.state.blogs.map(blog => {
                  return (
                    "Hello World"
                    // <Card
                    //   title={blog.title}
                    //   content={blog.content}
                    //   imageSrc={blog.imageSrc}
                    //   createdDt={blog.created_dt}
                    // />
                  );
                })
              )}
            </Col>
          </Row> 
        </Container>
    );
  }
}

export default Home;
