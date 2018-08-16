import React, { Component } from "react";
import blogApi from "../../Utils/blogApi";
import bloggerApi from "../../Utils/bloggerApi";
// import bloggerApi from "../../Utils/bloggerApi";
//import Link from "react-router-dom";
// import { Input, FormBtn } from "../../Components/Form";
//import { List, ListItem } from "../../Components/List";
// import  SaveBtn  from "../../Components/SaveBtn";
//import Jumbotron from "../../Components/Jumbotron/Jumbotron";
// import  Card  from "../../Components/Card";
import { Col, Row, Container } from "../../Components/Grid";
import Card from "../../Components/Card";
import Modal from "../../Components/Modal";

class Summary extends Component {
  state = {
    blogger: {
        blogs: []
    },
    blogs: {
        comments: []
    }
  };

  componentDidMount() {
    const currentUserEmail = sessionStorage.getItem("userEmail");
    this.loadBlogger(currentUserEmail);
    this.loadBlogsByBlogger(this.state.blogger._id);
  }

  // load both blogger and blogs that belong to the blogger
  loadBlogger = (currentUserEmail) => {
    bloggerApi
      .getBloggers(currentUserEmail)
      .then(res => this.setState({blogger: res.data}))
      .catch(err => console.log(err));
  };

  // load blogs for the given blogger and comments for each blogs
  loadBlogsByBlogger = (bloggerId) => {
    blogApi
      .getBlogs(bloggerId)
      .then(res => this.setState({blogs: res.data}))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <h2>Welcome, Dr. {this.state.blogger.fullName}</h2>
            <Modal />
          </Col>
        </Row>
        <Row>
          <Col size="md-3">
          </Col>
          <Col size="md-7">

            {!this.state.blogs.length ? (
              <h1 className="text-center">You haven't posted and blogs</h1>
            ) : (
              this.state.blogger.blogs.map(blog => {
                console.log(blog);
                return (
                  <Row>
                    <Col size="md-3">
                      <Card
                        key={blog._id}
                        topic={blog.topic}
                        content={blog.content}
                        src={blog.imageSrc}
                        alt={blog.topic}
                        created_dt={blog.created_dt}
                      />
                    </Col>
                    <Col size="md-7">
                      <label>{this.state.blog.topic}</label>
                      <textarea>{this.state.blog.content} </textarea>
                    </Col>
                    <Col size="md-2">
                      <label>{this.state.blog.date}</label>
                      <button>Edit </button>
                      <button>Delete</button>
                    </Col>
                  </Row>
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
