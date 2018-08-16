import React, { Component } from "react";
import blogApi from "../../Utils/blogApi";
// import bloggerApi from "../../Utils/bloggerApi";
//import Link from "react-router-dom";
// import { Input, FormBtn } from "../../Components/Form";
//import { List, ListItem } from "../../Components/List";
// import  SaveBtn  from "../../Components/SaveBtn";
//import Jumbotron from "../../Components/Jumbotron/Jumbotron";
// import  Card  from "../../Components/Card";
import { Col, Row, Container } from "../../Components/Grid";
import Card from "../../Components/Card";

class Summary extends Component {
  state = {
    blogs: [],
    topic: "",
    content: "",
    imageSrc: "",
    created_dt: ""
  };

  componentDidMount() {
    this.loadBlogs();
  }

  loadBlogs = () => {
    blogApi
      .getBlogs()
      .then(res =>
        this.setState({
          blogs: res.data,
          topic: "",
          content: "",
          imageSrc: "",
          created_dt: ""
        })
      )
      .catch(err => console.log(err));
  };

  // DO THIS ONCE WE HAVE BLOGGERS FIGURED OUT
  // loadBloggers = () => {
  //   bloggerApi.getBloggers()
  //   .then( res =>
  //   this.setState({

  //   }))
  // }

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <h2>Welcome, Dr. DOCTOR</h2>
          </Col>
        </Row>
        <Row>
          <Col size="md-3">
          </Col>
          <Col size="md-7">

            {!this.state.blogs.length ? (
              <h1 className="text-center">You haven't posted and blogs</h1>
            ) : (
              this.state.blogs.map(blog => {
                console.log(blog);
                return (
                  <Card
                    key={blog._id}
                    topic={blog.topic}
                    content={blog.content}
                    src={blog.imageSrc}
                    alt={blog.topic}
                    created_dt={blog.created_dt}
                  />
                );
              })
            )}
          </Col>
          <Col size="md-2">
            <button>Edit</button><br />
            <button>Delete</button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Summary;
