import React, { Component } from "react";
import blogApi from "../../Utils/blogApi";
import bloggerApi from "../../Utils/bloggerApi";
import { withRouter } from "react-router-dom";
import { List, ListItem } from "../../Components/List";
import { Col, Row, Container } from "../../Components/Grid";
import Button from '../../Components/Button';
import BlogModal from "./BlogModal";
import BlogEditModal from "./BlogEditModal";
import PanelEdit from "../../Components/SummaryBlog"
import SummaryBlog from "../../Components/SummaryBlog";
import CommentReadModal from "./CommentReadModal";
import './Summary.css';
const dateformat = require('dateformat');

class Summary extends Component {
  state = {
    blogger: {
        blogs: [{
          comments: [{}]
        }]
    },
    blogs: [{
        blogger: '',
        comments: [{}]
    }],
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

  componentDidMount() {
    if (this.state.currentUser) {
      this.loadBlogger(this.state.currentUser.bloggerId);
      this.loadBlogs(this.state.blogger._id);
      this.state.blogs.forEach(blog => blog.blogger = this.state.currentUser.bloggerId );
      console.log(this.state.blogger);
      console.log(this.state.blogs);
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

  handleDeleteBlog = (id) => {
    if (this.state.blogs) {
      blogApi
        .deleteBlog(id)
        .then(res => this.refreshBlogs())
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
            <BlogModal blogsContext= {this.state.blogs} text="Add blog"/>
          </Col>
        </Row>
        <Row>          
          {!this.state.blogs || !this.state.blogs.length ? (
            <h3 className="textCenter">You haven't posted any blogs</h3>
          ) : (
            <List>
            {this.state.blogs.map(blog => {
              return (
                <div key={blog._id}>
                  <ListItem key={blog._id}>
                  <Row>
                    <Col size="sm-3">
                      <img
                        className="card-img-top"
                        src={blog.imageSrc}
                        alt={blog.topic}
                        height="190px"
                      />
                    </Col>
                    <Col size="sm-7">
                      <label><strong>{blog.topic}</strong> {dateformat(blog.created_dt, "mmmm dS, yyyy")}</label>                                       
                      <div><p style={{width:"100%"}} >{blog.content}</p></div>
                    </Col>
                    <Col size="sm-2">
                    <span>
                    <label style={{float:"right", dispaly:"in-line"}}>
                        <CommentReadModal blogContext={blog}/>
                        <BlogEditModal blogContext={blog} />                    
                        <Button onClick={() => this.handleDeleteBlog(blog._id)} className="btn btn-sm btn-secondary" btntext="Delete blog"></Button>
                      </label></span>
                      {/* <div><p style={{width:"100%"}} >{blog.content}</p></div> */}
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
