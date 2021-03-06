import React, { Component } from "react";
import blogApi from "../../Utils/blogApi";
// import bloggerApi from "../../Utils/bloggerApi";
import { Link } from "react-router-dom";
import Jumbotron from "../../Components/Jumbotron/Jumbotron";
import { Col, Row, Container } from "../../Components/Grid";
import Card from "../../Components/Card";
import "./Home.css";
const dateformat = require("dateformat");

class Home extends Component {
  state = {
    isAuthenticated: false,
    blogs: [
      {
        comments: [{}]
      }
    ],
    topic: "",
    content: "",
    imageSrc: "",
    created_dt: "",
    currentUser: undefined
  };

  componentWillMount() {
    const userInfo = this.getUserInfo();
    if (userInfo) {
      this.setState({ currentUser: userInfo });
      this.setState({ isAuthenticated: true });
    } else {
      this.setState({ isAuthenticated: false });
    }
  }

  componentDidMount() {
    this.loadBlogs();
  }

  setUserInfo = user => {
    sessionStorage.setItem("currentUser", JSON.stringify(user));
  };

  getUserInfo = () => {
    return JSON.parse(sessionStorage.getItem("currentUser"));
  };

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

  render() {
    return (
      <div>
        <Jumbotron />
        <Container>
          <Row>
            <Col size="md-12">
              <div
                id="blogs"
                className="mx-auto card-deck d-flex justify-content-center align-items-stretch"
              >
                {!this.state.blogs.length ? (
                  <h1 className="text-center"> No recent blogs</h1>
                ) : (
                  this.state.blogs.map(blog => {
                    console.log(blog);
                    return (
                      <Link to={"/blogs/" + blog._id} key={blog._id}>
                        <div className="hovereffect">
                          <Card
                            key={blog._id}
                            topic={blog.topic}
                            content={blog.content}
                            src={blog.imageSrc}
                            alt={blog.topic}
                            date={blog.created_dt}
                          />
                          <div className="overlay">
                            <h3>
                              Posted on:{" "}
                              {dateformat(blog.created_dt, "mmmm dS, yyyy")}
                            </h3>
                            <Link
                              to={"./blogs/" + blog._id}
                              key={blog._id}
                              className="info"
                            >
                              Read
                            </Link>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
