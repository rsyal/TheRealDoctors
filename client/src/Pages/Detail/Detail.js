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
    newCommentTitle: "",
    newCommentBody: ""
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
    const sessionValues = JSON.parse(sessionStorage.getItem("currentUser"));
    const currentUser = {
      _id: sessionValues._id,
      displayName: sessionValues.displayName,
      email: sessionValues.email,
      googleId: sessionValues.googleId,
      accessToken: sessionValues.accessToken
    };
    console.log("currentUser: ", currentUser);
    this.setState({ currentUser: currentUser });
  };

  handleTitleInputChange = event => {
    const title = event.target.value;

    this.setState({ newCommentTitle: title });
  };

  handleContentInputChange = event => {
    const content = event.target.value;

    this.setState({ newCommentBody: content });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state);

    if (this.state.newCommentTitle && this.state.newCommentBody) {
      this.setState({
        comments: this.state.blog.comments.concat([
          {
            title: this.state.newCommentTitle,
            content: this.state.newCommentBody
          }
        ])
      });

      // console.log(this.state);

      blogApi
        // .updateBlog({
        //   comments: [
        //     {
        //       title: this.state.blog.comments.title,
        //       content: this.state.blog.comments.content
        //     }
        //   ]
        // })

        .updateBlog(this.state.blog._id, {
          //     {
          title: this.state.newCommentTitle,
          content: this.state.newCommentBody
        })
        .then(dbComments => {
          console.log(dbComments.data);
        })
        .catch(err => console.log(err));
    }
  };

  handleTitleChange = event => {
    event.preventDefault();
    console.log(this.state);
    if (this.state.blog.comments.title && this.state.blog.comments.content) {
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
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    console.log(this.state);

    return (
      <Container>
        <Row>
          <Col size="md-12">
            <h1 className="topic-style">{this.state.blog.topic}</h1>
            <h2>By {this.state.currentUser.displayName}</h2>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <img
              className="float-left mr-3 mb-3"
              src={this.state.blog.imageSrc}
              width="463px"
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
                value={this.state.blog.comments.title}
                onChange={this.handleTitleInputChange}
                name="title"
                placeholder="Subject (required)"
              />
              <TextArea
                value={this.state.blog.comments.content}
                onChange={this.handleContentInputChange}
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
              {!this.state.blog.comments || !this.state.blog.comments.length ? (
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
