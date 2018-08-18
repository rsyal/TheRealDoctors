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
    currentUser: {},
    blog: {
      blogger: {
        user: {}
      },
      comments: [
        {
          title: "",
          content: "",
          created_dt: ""
        }
      ] 
    },
    newComment: {}
  };

  // Retrieve a blog with all comments
  componentDidMount() {
    this.getCurrentUser();
    blogApi
      .getBlog(this.props.match.params.id)
      .then(res => {
        console.log(res.data);
        return this.setState({ blog: res.data });
      })
      .catch(err => console.log(err));
  }

  getCurrentUser = () => {
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

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.newComment.title && this.state.newComment.content) {
      blogApi
        .updateBlog({
          comments: [
            {
              title: this.state.blog.comments.title,
              content: this.state.blog.comments.content
            }
          ]
        })
        .then(dbComments => {
          console.log(dbComments.data);
          // update Blog with Blogger._id
          const commentId =   
          dbComments.data.blogs.comments[
              dbComments.data.blogs.comments.length - 1
            ];
          console.log("comment id ", commentId);
          blogApi
            .updateBlog(commentId, { comments: dbComments.data._id })
            .then(dbComments => console.log(dbComments))
            .catch(err => console.log(err));

          this.props.history.push("/");
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <h1 className="topic-style">{this.state.blog.topic}</h1>
            <h5 className="author-style">Written by: </h5>
            <h2>By {this.state.currentUser.displayName}</h2>
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
                // disabled={!(this.state.title && this.state.content)}
                onClick={this.handleFormSubmit}
              >
                Post Comment
              </FormBtn>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <div className="comment-deck">
              {!this.state.blog.comments ||!this.state.blog.comments.length ? (
                <h1 className="text-center">
                  There are no comments to this post yet.
                </h1>
              ) : (
                this.state.blog.comments.map(comment => {
                  console.log(comment);
                  return (
                    <Comment
                      key={comment._id}
                      title={comment.title}
                      content={comment.content}
                      date={comment.created_dt}
                    />
                  );
                })
              )}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
