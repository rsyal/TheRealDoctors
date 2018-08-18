import React from "react";
import ReactModal from 'react-modal';

const Modal = ({ handleClose, show, children, btnColor, btnText }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <ReactModal 
           isOpen={show}
           contentLabel="Minimal Modal Example"
        > {children}
        <button onClick={handleClose} className={btnColor}>{btnText}</button>
        </ReactModal>
      </div>
  );
}

export default Modal;