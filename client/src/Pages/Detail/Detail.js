import React, { Component } from "react";
import blogApi from "../../Utils/blogApi";
import bloggerApi from "../../Utils/bloggerApi";
import commentApi from "../../Utils/commentApi";
import { Link } from "react-router-dom";
import { Input, FormBtn, TextArea } from "../../Components/Form";
import { Col, Row, Container } from "../../Components/Grid";
import Comment from "../../Components/Comment/Comment";
import "./Detail.css";

class Detail extends Component {
  state = {
    blog: {
      blogger: {},
      comments: [
        {
          _id: "",
          title: "",
          content: "",
          created_dt: ""
        }
      ]
    },
    newCommentTitle: "",
    newCommentBody: "",
    isAuthenticated: false,
    currentUser: undefined
  };

  componentWillMount() {
    const userInfo = this.getUserInfo();
    if (userInfo) {
      this.setState({currentUser: userInfo});  
      this.setState({isAuthenticated: true});
    } else {
      this.setState({isAuthenticated: false});
    }
  }

  // Retrieve a blog with all comments
  componentDidMount() {
    blogApi
      .getBlogById(this.props.match.params.id)
      .then(res => {
        console.log(res.data);
        return this.setState({ blog: res.data });
      })
      .catch(err => console.log(err));
  }

  setUserInfo = user => {
    sessionStorage.setItem("currentUser", JSON.stringify(user));
  };

  getUserInfo = () => {
    return JSON.parse(sessionStorage.getItem("currentUser"));
  };

   // load both blogger and blogs that belong to the blogger
   loadBlogger = (bloggerId) => {
    bloggerApi
      .getBlogger({query: {_id: bloggerId}})
      .then(res => {
        const blogger = res.data[0];   
        const blogs = res.data[0].blogs;   
        this.setState({blogger: res.data[0]});
        console.log("blogs in Summary ", blogs);
        console.log("blogger in Summary ", blogger);
      })
      .catch(err => console.log(err));
  };

  // load blogs for the given blogger and comments for each blogs
  loadBlogs = (bloggerId) => {
    blogApi
      .getBlogs(bloggerId)
      .then(res => {
        const blogs = res.data;  
        this.setState({blogs: res.data});
        console.log("blogs by loadBlogs in Summary ", blogs);
      })
      .catch(err => console.log(err));
  };

  // load blogs for the given blogger and comments for each blogs
  refreshBlogs = () => {
    blogApi
      .getBlogs()
      .then(res => {
        const blogs = res.data;  
        this.setState({blogs: res.data});
        console.log("blogs by refreshBlogs in Summary ", blogs);
      })
      .catch(err => console.log(err));
  };
  refreshBlog = (id) => {
    blogApi
      .getBlogById(id)
      .then(res => {
        const blog = res.data;  
        this.setState({blog: res.data});
        console.log("blog by refreshBlog in Detail ", blog);
      })
      .catch(err => console.log(err));
  };

  // load blogs for the given blogger and comments for each blogs
  refreshBlogById = id => {
    blogApi
      .getBlogs()
      .then(res => {
        const blogs = res.data;  
        this.setState({blogs: res.data});
        console.log("blogs by refreshBlogs in Summary ", blogs);
      })
      .catch(err => console.log(err));
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

      commentApi
        .saveComment({
          blogId: this.state.blog._id,
          title: this.state.newCommentTitle,
          content: this.state.newCommentBody
        })
        .then(dbComment => {
          console.log(dbComment.data);
          this.refreshBlog(this.state.blog._id);
        })
        // .then(dbComment => this.refreshBlog(dbComment.blog))
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
            {/* <h2>By {this.state.currentUser.displayName}</h2> */}
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
            <p className="blog-content">{this.state.blog.content}</p>
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
            <br />
          </Col>
        </Row>
        {/* Collapsible comment form */}
        <Row>
          <Col size="md-12">
            <div className="panel panel-default" id="panel2">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <a
                    data-toggle="collapse"
                    data-target="#collapseComment"
                    href="#collapseComment"
                    className="collapsed"
                  >
                    Add a comment
                  </a>
                </h4>
              </div>
              <div id="collapseComment" className="panel-collapse collapse">
                <div class="panel-body">
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
                </div>
              </div>
            </div>
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
                    <Row>
                      <Col size="md-2" />
                      <Col size="md-8">
                        <Comment
                          className="comment-card"
                          key={comment._id}
                          title={comment.title}
                          content={comment.content}
                          date={comment.created_dt}
                        />
                      </Col>
                      <Col size="md-2" />
                    </Row>
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
