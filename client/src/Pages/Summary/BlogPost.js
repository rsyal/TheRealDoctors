import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import bloggerApi from "../../Utils/bloggerApi";
import blogApi from "../../Utils/blogApi";
import { Col, Row, Container } from "../../Components/Grid";
import { Input, TextArea, FormBtn } from "../../Components/Form";

class BlogPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      blogs: props.blogsContext,
      topic: '',
      content: '',
      imageSrc: '',
      created_dt: ''
    };
  }

  getUserInfo = () => {
    return JSON.parse(sessionStorage.getItem("currentUser"));
  };

  // load both blogger and blogs that belong to the blogger
  refreshBlogger = (bloggerId) => {
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
  refreshBlogs = (bloggerId) => {
    blogApi
      .getBlogs(bloggerId)
      .then(res => {
        const blogs = res.data;  
        this.setState({blogs: res.data});
        console.log("blogs by refreshBlogs in BlogPost ", blogs);
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
    let bloggerId = this.state.blogs[0].blogger;
   // this.state.blogs.forEach(blog => bloggerId = blog.blogger);
    if (this.state.topic && this.state.content) {
      blogApi
        .saveBlog({
          blogger: bloggerId,
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
