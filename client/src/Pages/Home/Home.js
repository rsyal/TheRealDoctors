import React, { Component } from "react";
import blog_api from "../../utils/Blog_api";
import { Link } from "react-router-dom";
import { Input, FormBtn } from "../../Components/Form";
import { List, ListItem } from "../../Components/List";
import { SaveBtn } from "../../Components/SaveBtn"
import { Nav } from "../../Components/Nav";

class Search extends Components {

  state={
    blogs: []
  };

  handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    // When the form is submitted, prevent its default behavior, get articles update the articles state
    event.preventDefault();
    blog_api.getBlogs()
    .then(res => this.setState({blogs: res.data}))
    .catch(err => console.log(err));
  };

  render() {
    
  }
}

export default Search;
