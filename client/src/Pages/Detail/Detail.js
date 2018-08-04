import React, { Component } from "react";
import blogApi from "../../Utils/blogApi";
import  Link  from "react-router-dom";
import { Input, FormBtn } from "../../Components/Form";
import { List, ListItem } from "../../Components/List";
import  SaveBtn  from "../../Components/SaveBtn";
import  {Col, Row, Container } from "../../Components/Grid";
import  Nav  from "../../Components/Nav";
import  Jumbotron  from "../../Components/Jumbotron";
import  Card  from "../../Components/Card";
import  Footer  from "../../Components/Footer";

class Detail extends Component {
  state = {
    blog: {}
  };

  componentDidMount() {
    blogApi
      .getBlog(this.props.match.params.id)
      .then(res => {
        this.setState({ blog: res.data });
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        {/* <Nav /> */}
        <Container>
          <Row>
            <Col size="md-12">
              <h2>{this.state.blog.title}</h2>
              <h3 />
            </Col>
          </Row>
          <Row>
            <Col size="xs-12">              
              <h3>Hello World</h3>

                    {/* // //   title={blog.title}
                    // //   content={blog.content}
                    // //   imageSrc={blog.imageSrc}
                    // //   createdDt={blog.created_dt} */}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Detail;
