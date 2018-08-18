import React, { Component } from "react";
// import blogApi from "../../Utils/blogApi";
import bloggerApi from "../../Utils/bloggerApi";
import { List, ListItem } from "../../Components/List";
import { Col, Row, Container } from "../../Components/Grid";
import BlogModal from "./BlogModal";
import { BlogViewEditModal } from "./BlogViewEditModal";
import './Summary.css';
const dateformat = require('dateformat');

class Summary extends Component {
  state = {
    blogger: {
        blogs: [{}]
    },
    blogs: [{
        comments: []
    }],
    currentUser: {
      _id: '',
      displayName: '',
      email: '',
      googleId: '',
      accessToken: ''
    }
  };

  componentDidMount() {
      this.getCurrentUser();
      this.loadBlogger(this.state.currentUser.email);
      this.loadBlogs(this.state.blogger._id);
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

  // load both blogger and blogs that belong to the blogger
  loadBlogger = (email) => {
    bloggerApi
      .getBloggers({email: email})
      .then(res => {
        const blogs = res.data[0].blogs;
        this.setState({blogs: blogs});
        this.setState({blogger: res.data[0]});
      })
      .catch(err => console.log(err));
  };

  // load blogs for the given blogger and comments for each blogs
  loadBlogs = (bloggerId) => {
    bloggerApi
      .getBlogger(bloggerId)
      .then(res => this.setState({blogs: res.data}))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container>
        <Row >
          <Col size="sm-12">
            <h2 className='header'>{this.state.currentUser.displayName}'s Dashboard</h2>
          </Col>
        </Row>
        <Row >
          <Col size="sm-12">
            <BlogModal text="Add blog"/>
          </Col>
        </Row>
        <Row>
          
            {!this.state.blogs || !this.state.blogs.length ? (
              <h3 className="textCenter">You haven't posted any blogs</h3>
            ) : (
              <List>
              {this.state.blogger.blogs.map(blog => {
                console.log(blog);
                return (
                  <div>
                    <ListItem key={blog._id}>
                    <Row>
                      <Col size="sm-3">
                        <img src={blog.imageSrc} alt={blog.topic} />
                      </Col>
                      <Col size="sm-9">
                        <label><strong>{blog.topic}</strong> {dateformat(blog.created_dt, "mmmm dS, yyyy")}</label>                     
                        <label style={{float:"right"}}>
                          <button>View/Edit</button>
                          {/* <BlogViewEditModal blogContext={blog} /> */}
                          <button>Delete</button>
                        </label>
                        <div><p style={{width:"100%"}} >{blog.content}</p></div>
                      </Col>
                    </Row>
                    </ListItem>
                  </div>
                )
              })}
               </List>
            )}

           
        </Row>
      </Container>
    );
  }
}

export default Summary;
