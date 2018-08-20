import React, { Component } from "react";
import blogApi from "../../Utils/blogApi";
import bloggerApi from "../../Utils/bloggerApi";
import { withRouter } from "react-router-dom";
import { List, ListItem } from "../../Components/List";
import { Col, Row, Container } from "../../Components/Grid";
import Button from '../../Components/Button';
import BlogModal from "./BlogModal";
import BlogViewEditModal from "./BlogViewEditModal";
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
    isAuthenticated: false,
    currentUser: undefined
  };

  componentWillMount() {
    const userInfo = this.getUserInfo();
    if (userInfo) {
      this.setState({currentUser: userInfo});  
      this.setState({isAuthenticated: true});
      this.loadBlogger(userInfo.bloggerId);
    } else {
      this.setState({isAuthenticated: false});
      this.loadBlogger(userInfo.bloggerId);
    }
  }

  componentDidMount() {
    if (this.state.currentUser) {
      this.loadBlogger(this.state.currentUser.bloggerId);
      //this.loadBlogs(this.state.blogger._id);
    }
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
        const blogs = res.data[0].blogs;       
        this.setState({blogs: blogs});
        this.setState({blogger: res.data[0]});
        console.log("blogs in Summary ", blogs);
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

  hardReload = (blogEditContext) => {
    this.setState({blogContext: blogEditContext});   
  }

  handleDeleteBlog = (id) => {
    if (this.state.blogs) {
      blogApi
        .deleteBlog(id)
        // .then(blogDeleted => {
        //   this.setState({blogger: blogDeleted.data});})
        .then(res => this.loadBlogger())
        .catch(err => console.log(err));
    }

    this.props.history.push("/Summary");
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
                //console.log(blog);
                return (
                  <div key={blog._id}>
                    <ListItem key={blog._id}>
                    <Row>
                      <Col size="sm-3">
                        {/* <img src={blog.imageSrc} alt={blog.topic} /> */}
                        <img
                          className="card-img-top"
                          src={blog.imageSrc}
                          alt={blog.topic}
                          height="190px"
                        />
                      </Col>
                      <Col size="sm-9">
                        <span><label><strong>{blog.topic}</strong> {dateformat(blog.created_dt, "mmmm dS, yyyy")}</label>                     
                        <label style={{float:"right", dispaly:"in-line"}}>
                          <BlogViewEditModal blogContext={blog} callbackFromSummary= {this.hardReload} />
                          <Button onClick={() => this.handleDeleteBlog(blog._id)} className="btn btn-sm btn-secondary" btntext="Delete"></Button>
                        </label></span>
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

export default withRouter(Summary);
