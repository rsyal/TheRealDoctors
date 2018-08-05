import React, { Component } from "react";
import blogApi from "../../Utils/blogApi";
// import  Link  from "react-router-dom";
// import { List, ListItem } from "../../Components/List";
// import  SaveBtn  from "../../Components/SaveBtn";
// import  Jumbotron  from "../../Components/Jumbotron";
// import  Card  from "../../Components/Card";
import { Col, Row, Container } from "../../Components/Grid";
import { Input, TextArea, FormBtn } from "../../Components/Form";

class DoctorPost extends Component {
  state = {
    topic: "",
    content: "",
    imageSrc: "",
    created_dt: ""
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
          topic: this.state.topic,
          content: this.state.content,
          imageSrc: this.state.imageSrc,
          created_at: this.state.created_at
        })
        .then(blogData => console.log(blogData.data))
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
                placeholder="Title (required)"
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
                Post blog
              </FormBtn>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default DoctorPost;
