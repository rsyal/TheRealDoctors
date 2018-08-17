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
import BlogModal from "./BlogModal";

class Summary extends Component {
  state = {
    blogger: {
        blogs: []
    },
    blogs: {
        comments: []
    },
    currentUser: {
      _id: '',
      displayName: '',
      email: '',
      googleId: '',
      accessToken: ''
    }
  };

  componentDidMount() {
      this.setCurrentUser();
      this.loadBlogger();
    //this.loadBlogsByBlogger(this.state.blogger._id);
  }

  setCurrentUser = () => {
    const sessionValues = JSON.parse(sessionStorage.getItem('currentUser'));
    const currentUser = {
      _id: sessionValues._id,
      displayName: sessionValues.displayName,
      email: sessionValues.email,
      googleId: sessionValues.googleId,
      accessToken: sessionValues.accessToken
    };
    console.log('currentUser: ', currentUser);
     this.setState({currentUser: currentUser});
  }

  // load both blogger and blogs that belong to the blogger
  loadBlogger = () => {
    bloggerApi
      .getBloggers(this.state.currentUser.email)
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
            <h2>{this.state.currentUser.displayName}'s Dashboard</h2>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <BlogModal />
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
