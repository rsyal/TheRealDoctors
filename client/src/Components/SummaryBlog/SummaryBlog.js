import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import blogApi from "../../Utils/blogApi";
import { Input, TextArea, FormBtn } from "../../Components/Form";
const dateformat = require("dateformat");

// component called on editing blog
class SummaryBlog extends Component {

  constructor(props) {
    super(props);
    this.state = {     
      _id: props.blogContext._id,
        topic: props.blogContext.topic,
        content: props.blogContext.content,
        imageSrc: props.blogContext.imageSrc,
        created_dt: props.blogContext.created_dt,
        collapsableId: props.collapsableId,
        comments: props.blogContext.comments
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  loadBlog = id => {
    blogApi
      .getBlogById(id)
      .then(res => {
        console.log('SummaryBlog loadBlog ', res.data)
        this.setState({
              topic: res.data.topic,
              content: res.data.content,
              imageSrc: res.data.imageSrc,
              created_dt: res.data.created_dt
        });        
      })
      .catch(err => console.log(err));
  }

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

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.topic && this.state.content) {
      blogApi
        .updateBlog(this.state._id, {
          topic: this.state.topic,
          content: this.state.content,
          imageSrc: this.state.mageSrc,
          created_dt: this.state.created_dt,
        })
        .then(res => this.loadBlog(this.state._id))
        .catch(err => console.log(err));
    }

    this.props.history.push("/Summary");
  };

  handleCancel = id => {

  }

  render() {
    return(
  <div className="panel panel-default">
    {/* <div className="panel-heading">
      <h4 className="panel-title">
        <a
          data-toggle="collapse"
          data-target="#collapsable"
          href="#collapsable"
          className="collapsed"
        >
          Add a comment
        </a>
      </h4>
    </div> */}
    <div className="panel-collapse collapse" id="collapsable" >
      <div class="panel-body">
        <form>
          <Input
            value={this.state.topic}
            onChange={this.handleInputChange}
            name="topic"
          />
          <TextArea
            value={this.state.content}
            onChange={this.handleInputChange}
            name="content"
          />
          <Input      
            value={this.state.imageSrc}
            onChange={this.handleInputChange}
            name="imageSrc"
          />         
          <FormBtn className="btn btn-success mr-1"
            disabled={!(this.state.topic && this.state.content)}
            onClick={this.handleCancel}
          >
            Cancel
          </FormBtn>
          <FormBtn className="btn btn-success mr-1"
            disabled={!(this.state.topic && this.state.content)}
            onClick={this.handleFormSubmit}
          >
            Save
          </FormBtn>
        </form>
      </div>
    </div>
    </div>
    )
  }
}

export default withRouter(SummaryBlog);