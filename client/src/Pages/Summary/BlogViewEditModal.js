import React from "react";
import Modal from '../../Components/Modal';
import BlogPost from './BlogPost';
import Button from '../../Components/Button';
import BlogViewEdit from './BlogViewEdit';
import './Summary.css';
import { checkPropTypes } from "../../../node_modules/@types/prop-types";

class BlogViewEditModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      blogContext: props.blogContext
    };
  }

  // state = {
  //   show: false
  // }

  handleOpenModal = () => {
    this.setState({ show: true });
  };
  
  handleCloseModal = () => {
    this.setState({ show: false });
  };
  
  render () {
    return (
      <div>
        <Modal show={this.state.show} handleClose={this.handleCloseModal} btnText="Close">
         <BlogViewEdit blogContextDown={this.state.blogContext} />
        </Modal>
        {/* <button onClick={this.handleOpenModal} className="btn btn-success subHeader">Add blog</button> */}
        <Button onClick={this.handleOpenModal} className="btn subHeader" btnText="View/Edit" />
      </div>
    );
  }
};

export default BlogViewEditModal;