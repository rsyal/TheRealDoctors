import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import blogApi from "../../Utils/blogApi";
import { Col, Row, Container } from "../../Components/Grid";
import { Input, TextArea, FormBtn } from "../../Components/Form";

class BlogEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {   
      blog: props.blogContext,  
      _id: props.blogContext._id,
        topic: props.blogContext.topic,
        content: props.blogContext.content,
        imageSrc: props.blogContext.imageSrc,
        created_dt: props.blogContext.created_dt
    }
  };

    // load blogs for the given blogger and comments for each blogs
    refreshBlogs = (bloggerId) => {
      blogApi
        .getBlogs(bloggerId)
        .then(res => {
          const blogs = res.data;  
          this.setState({blogs: res.data});
          console.log("blogs by refreshBlogs in BlogEdit ", blogs);
        })
        .catch(err => console.log(err));
    };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    //event.preventDefault();
    let bloggerId = this.state.blog.blogger;
    if (this.state.topic && this.state.content) {
      blogApi
        .updateBlog(this.state._id, {
          topic: this.state.topic,
          content: this.state.content,
          imageSrc: this.state.mageSrc,
          created_at: this.state.created_at,
        })
        .then(res => this.refreshBlogs(bloggerId))
        .catch(err => console.log(err));
    }

    //this.props.history.push("/");
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <h2 className="mt-3">Edit and save</h2>
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

export default withRouter(BlogEdit);
