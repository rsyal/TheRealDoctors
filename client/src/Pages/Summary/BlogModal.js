import React from "react";
import Modal from '../../Components/Modal';
import ReactModal from 'react-modal';
import BlogPost from './BlogPost';
import Button from '../../Components/Button';
import './Summary.css';

const postStyles = {
  content : {
    top           : '50%',
    left          : '50%',
    right         : 'auto',
    bottom        : 'auto',
    marginRight   : '-50%',
    transform     : 'translate(-50%, -50%)',
    overlay       : {
      backgroundColor: 'gray'
    }
  }
};

ReactModal.setAppElement('#root');
class BlogModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      blogs: props.blogsContext
    };
  }

  handleOpenModal = () => {
    this.setState({ show: true });
  };
  
  handleCloseModal = () => {
    this.setState({ show: false });
  };
  
  render () {
    return (
      <div>
        <Modal show={this.state.show} style={postStyles} handleClose={this.handleCloseModal} btntext="Close">
         <BlogPost blogsContext={this.state.blogs} />
        </Modal>
        {/* <button onClick={this.handleOpenModal} className="btn btn-success subHeader">Add blog</button> */}
        <Button onClick={this.handleOpenModal} className="btn btn-success subHeader" btntext="Add blog" />
      </div>
    );
  }
};

export default BlogModal;