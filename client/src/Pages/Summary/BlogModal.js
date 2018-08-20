import React from "react";
import Modal from '../../Components/Modal';
import BlogPost from './BlogPost';
import Button from '../../Components/Button';
import './Summary.css';

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
        <Modal show={this.state.show} handleClose={this.handleCloseModal} btntext="Close">
         <BlogPost />
        </Modal>
        {/* <button onClick={this.handleOpenModal} className="btn btn-success subHeader">Add blog</button> */}
        <Button onClick={this.handleOpenModal} className="btn btn-success subHeader" btntext="Add blog" />
      </div>
    );
  }
};

export default BlogModal;