import React from "react";
import Modal from '../../Components/Modal';
//import blogApi from "../../Utils/blogApi";
import { withRouter } from "react-router-dom";
//import BlogPost from './BlogPost';
import Button from '../../Components/Button';
import BlogEdit from './BlogEdit';
import './Summary.css';

class BlogViewEditModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      blogContext: props.blogContext
    };
  }

  handleOpenModal = () => {
    this.setState({ show: true });
  };
  
  handleCloseModal = () => {
    this.setState({ show: false });
  };

  transferStateValues = ({ blogEditContext }) => {
    this.props.callbackFromSummary(blogEditContext);
  }
  
  render () {
    return (
      <div>
        <Modal show={this.state.show} handleClose={this.handleCloseModal} btntext="Close"  >
         <BlogEdit blogContextDown={this.state.blogContext} transferStateEdit={this.transferStateValues}  />
        </Modal>
        <Button onClick={this.handleOpenModal} className="btn btn-secondary btn-sm mr-1 mb-1" btntext="Edit blog" />
      </div>
    );
  }
};

export default withRouter(BlogViewEditModal);