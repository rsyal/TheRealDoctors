import React from "react";
import Modal from '../../Components/Modal';
import BlogPost from './BlogPost';

class BlogModal extends React.Component {

    state = {
      show: false
    };
    
  handleOpenModal = () => {
    this.setState({ show: true });
  };
  
  handleCloseModal = () => {
    this.setState({ show: false });
  };
  
  render () {
    return (
      <div>
        <Modal show={this.state.show} handleClose={this.handleCloseModal} btnText="Add blog">
         <BlogPost />
        </Modal>
        <button onClick={this.handleOpenModal}>Add</button>
      </div>
    );
  }
};

export default BlogModal;