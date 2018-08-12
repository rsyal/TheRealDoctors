import React, { Component } from "react";
import blogApi from "../../Utils/blogApi";
// import bloggerApi from "../../Utils/bloggerApi";
import { Link } from "react-router-dom";
// import { Input, FormBtn } from "../../Components/Form";
// import { List, ListItem } from "../../Components/List";
// import  SaveBtn  from "../../Components/SaveBtn";
import Jumbotron from "../../Components/Jumbotron/Jumbotron";
import { Col, Row, Container } from "../../Components/Grid";
import Card from "../../Components/Card";
import "./Home.css";

class Home extends Component {
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
      <div>
        <Jumbotron />

        <Container>
          <Row>
            <Col size="xs-12">
              <div className="card-deck d-flex justify-content-center align-items-stretch">
                {!this.state.blogs.length ? (
                  <h1 className="text-center">No recent blogs</h1>
                ) : (
                  this.state.blogs.map(blog => {
                    console.log(blog);
                    return (
                      <Link to={"/blogs/" + blog._id}>
                        <Card
                          key={blog._id}
                          topic={blog.topic}
                          content={blog.content}
                          src={blog.imageSrc}
                          alt={blog.topic}
                          created_dt={blog.created_dt}
                        />
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
