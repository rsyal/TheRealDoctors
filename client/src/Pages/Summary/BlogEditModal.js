import React from "react";
import ReactModal from 'react-modal';
import { withRouter } from "react-router-dom";
//import BlogPost from './BlogPost';
import Button from '../../Components/Button';
import BlogEdit from './BlogEdit';
import './Summary.css';

const editStyles = {
  // content : {
  //   top           : '50%',
  //   left          : '50%',
  //   right         : 'auto',
  //   bottom        : 'auto',
  //   marginRight   : '-50%',
  //   transform     : 'translate(-50%, -50%)',
  //   overlay       : {
  //     backgroundColor: 'gray'
  //   }
  // }
};
ReactModal.setAppElement('#root');
class BlogEditModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      blog: props.blogContext
    };
  }

  openModal = () => {
    this.setState({isOpen: true});
  }

  closeModal = () => {
    this.setState({isOpen: false});
  }

  // handleOpenModal = () => {
  //   this.setState({ show: true });
  // };
  
  // handleCloseModal = () => {
  //   this.setState({ show: false });
  // };
  
  // render () {
  //   return (
  //     <div>
  //       <Modal show={this.state.show} handleClose={this.handleCloseModal} btntext="Close"  >
  //        <BlogEdit blogContextDown={this.state.blogContext} transferStateEdit={this.transferStateValues}  />
  //       </Modal>
  //       <Button onClick={this.handleOpenModal} className="btn btn-secondary btn-sm mr-1 mb-1" btntext="Edit blog" />
  //     </div>
  //   );
  // }

  render () {
    return (
      <div>
        <Button onClick={this.openModal} className="btn btn-secondary btn-sm mr-1 mb-1" btntext="Edit blog" />
        <ReactModal isOpen={this.state.isOpen} style={editStyles} contentLabel="Blog posted by licensed doctor" >
         <BlogEdit blogContext={this.state.blog} />      
         <Button onClick={this.closeModal} className="btn btn-secondary btn-sm mt-3 mr-3" btntext="close" />
        </ReactModal>
      </div>
    );
  }
};

export default withRouter(BlogEditModal);