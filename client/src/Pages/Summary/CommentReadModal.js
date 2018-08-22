import React from "react";
import Button from '../../Components/Button';
import ReactModal from 'react-modal';
import CommentRead from './CommentRead';
import { withRouter } from "react-router-dom";

const readStyles = {
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

class CommentReadModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      blogContext: props.blogContext
    };
  }

  openModal = () => {
    this.setState({isOpen: true});
  }

  afterOpenModal = () => {

  }

  onRequestClose = () => {

  }

  closeModal = () => {
    this.setState({isOpen: false});
  }

  render () {
    return (
      <div>
        <Button onClick={this.openModal} className="btn btn-secondary btn-sm mr-1 mb-1" btntext="Read comments" />
        <ReactModal isOpen={this.state.isOpen} style={readStyles} contentLabel="Comments posted by reader including general public" >
         <CommentRead blogContext={this.state.blogContext} />      
         <Button onClick={this.closeModal} className="btn btn-secondary btn-sm mt-3 mr-3" btntext="close" />
        </ReactModal>
      </div>
    );
  }
};

export default withRouter(CommentReadModal);