import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import blogApi from "../../Utils/blogApi";
import { Col, Row, Container } from "../../Components/Grid";
import { Input, TextArea, FormBtn } from "../../Components/Form";

class BlogPost extends Component {

  state = {
    topic: '',
    content: '',
    imageSrc: '',
    created_dt: '',
    comments: []
  }

  getUserInfo = () => {
    return JSON.parse(sessionStorage.getItem("currentUser"));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.topic && this.state.content) {
      blogApi
        .saveBlog({
          bloggerId: this.getUserInfo().currentUser.bloggerId,
          topic: this.state.topic,
          content: this.state.content,
          imageSrc: this.state.imageSrc,
          created_at: this.state.created_at
        })
        .then(dbBlogger => {
          console.log(dbBlogger.data);
          // update Blog with Blogger._id
          const blogId = dbBlogger.data.blogs[dbBlogger.data.blogs.length - 1];
          console.log("blog id ", blogId);
          blogApi
            .updateBlog(blogId, { blogger: dbBlogger.data._id })
            .then(dbBlog => console.log(dbBlog))
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
            <h2 className="mt-3">Write your blog post below</h2>
            <form>
              <Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="Topic (required)"
              />
              <TextArea
                value={this.state.content}
                onChange={this.handleInputChange}
                name="content"
                placeholder="Content (required)"
              />
              <Input
                value={this.state.imageSrc}
                onChange={this.handleInputChange}
                name="imageSrc"
                placeholder="Enter image URL"
              />
              <FormBtn
                disabled={!(this.state.topic && this.state.content)}
                onClick={this.handleFormSubmit}
              >
                Save
              </FormBtn>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(BlogPost);
