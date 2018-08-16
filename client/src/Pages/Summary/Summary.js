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
    blog: {
        comments: []
    }
  };

  componentDidMount() {
    this.loadBlogger();
    this.loadBlogsByBlogger();
  }

  loadBlogger = () => {
    bloggerApi
      .getBlogger()
      .then(res => this.setState({blogger: res.data}))
      .catch(err => console.log(err));
  };

  loadBlogsByBlogger = () => {
    blogApi
      .getBlogs()
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
          <Col size="md-12">
            {!this.state.blogger.blogs.length ? (
              <h1 className="text-center">You haven't posted any blogs yet</h1>
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
        </Row>
      </Container>
    );
  }
}

export default Summary;
