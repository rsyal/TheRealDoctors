import React from "react";
import ReactModal from 'react-modal';

const Modal = ({ handleClose, show, children, btnColor, btntext }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <ReactModal 
           isOpen={show}
           contentLabel="Minimal Modal Example"
        > {children}
        <button onClick={handleClose} className={btnColor}>{btntext}</button>
        </ReactModal>
      </div>
  );
}

export default Modal;