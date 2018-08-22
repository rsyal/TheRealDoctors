import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SummaryComment from "../../Components/SummaryComment";
import { Col, Row, Container } from "../../Components/Grid";
//import { List, ListItem } from "../../Components/List";

class CommentRead extends Component {

  constructor(props) {
    super(props);
    this.state = {     
      _id: props.blogContext._id,
        topic: props.blogContext.topic,
        content: props.blogContext.content,
        imageSrc: props.blogContext.imageSrc,
        created_dt: props.blogContext.created_dt,
        comments: props.blogContext.comments
    }
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <h2 className="mt-3 mb-4">Comments written by readers</h2>
            {/* <List> */}
              <div className="px-3 py-3"><h3>{this.state.topic}</h3></div>
              {!this.state.comments && this.state.comments.length === 0 ? (
                <p>No comments</p>
              ) : (
                this.state.comments.map(comment => {
                  return (
                    <Row>
                      <Col size="md-12">
                        <SummaryComment
                          key={comment._id}
                          title={comment.title}
                          content={comment.content}
                          date={comment.created_dt}
                        />
                      </Col>
                    </Row>
                  );           
                })
            )}
            {/* </List> */}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(CommentRead);