import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Input, FormBtn } from "../../Components/Form";
import { List, ListItem } from "../../Components/List";
import { SaveBtn } from "../../Components/SaveBtn"
import { Nav } from "../../Components/Nav";

class Search extends Components {

  state={
    articles: [],
    articleSearch: "",
    topic: "",
    startYear: Date.now,
    endYear: Date.now
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
    this.setState({articleSearch: `?topic={this.state.topic}&startYear={this.state.startYear}&endYear={this.state.endYear}`});
    API.scrapeArticles(this.state.articleSearch)
    .then(res => this.setState({articles: res.data}))
    .catch(err => console.log(err));
  };

  render() {
    
  }
}

export default Search;
