import React, { Component } from "react";
import blogApi from "../../Utils/blogApi";
// import commentApi from "../../Utils/commentApi";
import { Link } from "react-router-dom";
import { Input, FormBtn, TextArea } from "../../Components/Form";
// import { List, ListItem } from "../../Components/List";
// import  SaveBtn  from "../../Components/SaveBtn";
// import  Jumbotron  from "../../Components/Jumbotron";
import { Col, Row, Container } from "../../Components/Grid";
import Comment from "../../Components/Comment/Comment";
import "./Detail.css";

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
            <h1 className="topic-style">{this.state.blog.topic}</h1>
            <h5 className="author-style">Written by: </h5>
            <h2>By {this.state.blog.blogger.fullName}</h2>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <img
              className="float-left mr-3 mb-3 image-style"
              src={this.state.blog.imageSrc}
              alt={this.state.blog.topic}
            />
            <p>{this.state.blog.content}</p>
          </Col>
        </Row>
        {/* <Row>
          <Col size="xs-12">
            <p>{this.state.blog.content}</p>
          </Col>
        </Row> */}
        <Row>
          <Col size="md-12">
            <Link to="/">← Back to Blogs</Link>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <h3>Comment below:</h3>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Subject (required)"
              />
              <TextArea
                value={this.state.content}
                onChange={this.handleInputChange}
                name="content"
                placeholder="Comment (required)"
              />
              <FormBtn
                disabled={!(this.state.title && this.state.content)}
                onClick={this.handleFormSubmit}
              >
                Post Comment
              </FormBtn>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            {/* <div className="comment-deck">
              {!this.state.blogs.length ? (
                <h1 className="text-center">
                  There are no comments to this post yet.
                </h1>
              ) : (
                this.state.comments.map(comment => {
                  console.log(comment);
                  return (
                    <Comment
                      key={comment._id}
                      title={comment.title}
                      content={comment.content}
                      created_dt={comment.created_dt}
                    />
                  );
                })
              )}
            </div> */}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
